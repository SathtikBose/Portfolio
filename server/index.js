const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Load env vars immediately

const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

const connectDB = require("./config/db");
const cloudinary = require("./config/cloudinary");
const Project = require("./models/Project");

connectDB();

const app = express();

// Security Middleware
app.use(helmet()); // Set security headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS Config
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Admin Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (
    email === process.env.admin_email &&
    password === process.env.admin_password
  ) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Check Auth
app.get("/api/check-auth", verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

// Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
});

// Get all projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new project (Protected)
app.post("/api/projects", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, description, liveLink } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload to Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "portfolio_projects",
    });

    const project = new Project({
      title,
      description,
      image: result.secure_url,
      liveLink,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete project (Protected)
app.delete("/api/projects/:id", verifyToken, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if(!project) return res.status(404).json({message: "Project not found"});

        // Optional: Delete image from cloudinary if needed (requires public_id storage)
        
        await Project.findByIdAndDelete(req.params.id);
        res.json({message: "Project deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Root route for health check
app.get("/", (req, res) => {
  res.send("Server running perfectly");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
