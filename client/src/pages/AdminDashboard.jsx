import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    liveLink: "",
    projectType: "Website",
  });
  const [certForm, setCertForm] = useState({
    title: "",
    description: "",
    platform: "",
    liveLink: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    fetchCertificates();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/projects`,
      );
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/certificates`,
      );
      setCertificates(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(projectForm).forEach((key) =>
      formData.append(key, projectForm[key]),
    );
    formData.append("image", image);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      toast.success("Project Added");
      fetchProjects();
      setProjectForm({
        title: "",
        description: "",
        liveLink: "",
        projectType: "Website",
      });
      setImage(null);
    } catch (error) {
      toast.error("Error adding project");
    }
  };

  const handleCertSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(certForm).forEach((key) => formData.append(key, certForm[key]));
    formData.append("image", image);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/certificates`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      toast.success("Certificate Added");
      fetchCertificates();
      setCertForm({ title: "", description: "", platform: "", liveLink: "" });
      setImage(null);
    } catch (error) {
      toast.error("Error adding certificate");
    }
  };

  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/${type}/${id}`, {
        withCredentials: true,
      });
      toast.success(
        `${type === "projects" ? "Project" : "Certificate"} Deleted`,
      );
      type === "projects" ? fetchProjects() : fetchCertificates();
    } catch (error) {
      toast.error("Error deleting item");
    }
  };

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-outfit">
      <ToastContainer />
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-4 py-2 rounded-md transition ${activeTab === "projects" ? "bg-lime-500 text-black font-bold" : "text-gray-400 hover:text-white"}`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab("certificates")}
                className={`px-4 py-2 rounded-md transition ${activeTab === "certificates" ? "bg-lime-500 text-black font-bold" : "text-gray-400 hover:text-white"}`}
              >
                Certificates
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md font-bold transition"
            >
              Logout
            </button>
          </div>
        </div>

        {activeTab === "projects" ? (
          <div>
            <form
              onSubmit={handleProjectSubmit}
              className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-12 border border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-lime-500 rounded-full"></span>
                Add New Project
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Project Title</label>
                  <input
                    type="text"
                    placeholder="E.g. Portfolio Website"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-lime-500 outline-none"
                    value={projectForm.title}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Project Type</label>
                  <select
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-lime-500 outline-none"
                    value={projectForm.projectType}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        projectType: e.target.value,
                      })
                    }
                  >
                    <option value="Website">Website</option>
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Tool">Tool</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-gray-400">
                    Live Link (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-lime-500 outline-none"
                    value={projectForm.liveLink}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        liveLink: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-gray-400">Description</label>
                  <textarea
                    placeholder="Briefly describe the project..."
                    className="w-full p-3 h-32 rounded-lg bg-gray-700 border border-gray-600 focus:border-lime-500 outline-none"
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-gray-400">
                    Project Screenshot
                  </label>
                  <input
                    type="file"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lime-500 file:text-black hover:file:bg-lime-400"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 bg-lime-500 hover:bg-lime-400 text-black px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
              >
                Add Project
              </button>
            </form>

            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-lime-500 rounded-full"></span>
                Existing Projects ({projects.length})
              </h2>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition"
                  >
                    <div className="flex items-center space-x-6">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                      <div>
                        <span className="text-[10px] px-2 py-1 bg-lime-500/20 text-lime-400 rounded uppercase font-bold tracking-tighter">
                          {project.projectType}
                        </span>
                        <h3 className="font-bold text-lg">{project.title}</h3>
                        <p className="text-sm text-gray-400 max-w-md line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(project._id, "projects")}
                      className="bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <form
              onSubmit={handleCertSubmit}
              className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-12 border border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-lime-500 rounded-full"></span>
                Add New Certificate
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Certificate Title
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. React Developer"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-lime-500 outline-none"
                    value={certForm.title}
                    onChange={(e) =>
                      setCertForm({ ...certForm, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Platform</label>
                  <input
                    type="text"
                    placeholder="E.g. Udemy, Meta, Google"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-lime-500 outline-none"
                    value={certForm.platform}
                    onChange={(e) =>
                      setCertForm({ ...certForm, platform: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-gray-400">
                    Credential Link (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-lime-500 outline-none"
                    value={certForm.liveLink}
                    onChange={(e) =>
                      setCertForm({ ...certForm, liveLink: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-gray-400">
                    Description (Seen on Hover)
                  </label>
                  <textarea
                    placeholder="What did you learn in this certification?"
                    className="w-full p-3 h-32 rounded-lg bg-gray-700 border border-gray-600 focus:border-lime-500 outline-none"
                    value={certForm.description}
                    onChange={(e) =>
                      setCertForm({ ...certForm, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-gray-400">
                    Certificate Image (PNG/JPG)
                  </label>
                  <input
                    type="file"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lime-500 file:text-black hover:file:bg-lime-400"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 bg-lime-500 hover:bg-lime-400 text-black px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
              >
                Add Certificate
              </button>
            </form>

            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-lime-500 rounded-full"></span>
                Existing Certificates ({certificates.length})
              </h2>
              <div className="grid gap-4">
                {certificates.map((cert) => (
                  <div
                    key={cert._id}
                    className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition"
                  >
                    <div className="flex items-center space-x-6">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                      <div>
                        <span className="text-[10px] px-2 py-1 bg-lime-500/20 text-lime-400 rounded uppercase font-bold tracking-tighter">
                          {cert.platform}
                        </span>
                        <h3 className="font-bold text-lg">{cert.title}</h3>
                        <p className="text-sm text-gray-400 max-w-md line-clamp-1">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(cert._id, "certificates")}
                      className="bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
