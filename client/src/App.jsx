import { useEffect, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Work from "./components/Work";
import Certificates from "./components/Certificates";

import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [isDark, setIsdark] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("bg-[#11001f]");
    } else {
      document.documentElement.classList.remove("bg-[#11001f]");
    }
  }, [isDark]);

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route
          path="/"
          element={
            <>
              <Navbar isDark={isDark} setIsdark={setIsdark} />
              <Header isDark={isDark} />
              <About isDark={isDark} />
              <Services isDark={isDark} />
              <Work isDark={isDark} />
              <Certificates isDark={isDark} />
              <Contact isDark={isDark} />
              <Footer isDark={isDark} />
            </>
          }
        />
      </Routes>
    </>
  );
}
