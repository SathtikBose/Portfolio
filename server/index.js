const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Load env vars immediately

const multer = require("multer");

const connectDB = require("./config/db");
const cloudinary = require("./config/cloudinary");
const Project = require("./models/Project");
const Certificate = require("./models/Certificate");

connectDB();

const app = express();

const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Admin Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (
    email === process.env.admin_email &&
    password === process.env.admin_password
  ) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
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

// Add new project (Unprotected)
app.post("/api/projects", upload.single("image"), async (req, res) => {
  try {
    const { title, description, liveLink, projectType } = req.body;
    
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
      projectType: projectType || "Website",
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete project (Unprotected)
app.delete("/api/projects/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if(!project) return res.status(404).json({message: "Project not found"});
        await Project.findByIdAndDelete(req.params.id);
        res.json({message: "Project deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// --- Certificate Routes ---

// Get all certificates
app.get("/api/certificates", async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new certificate (Unprotected)
app.post("/api/certificates", upload.single("image"), async (req, res) => {
  try {
    const { title, description, platform, liveLink } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "portfolio_certificates",
    });

    const certificate = new Certificate({
      title,
      description,
      image: result.secure_url,
      platform,
      liveLink,
    });

    const savedCert = await certificate.save();
    res.status(201).json(savedCert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete certificate (Unprotected)
app.delete("/api/certificates/:id", async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if(!certificate) return res.status(404).json({message: "Certificate not found"});
        await Certificate.findByIdAndDelete(req.params.id);
        res.json({message: "Certificate deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Root route for health check
app.get("/", (req, res) => {
  res.send("Server running perfectly");
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
