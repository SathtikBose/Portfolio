import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', liveLink: '' });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('liveLink', form.liveLink);
    formData.append('image', image);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      toast.success('Project Added');
      fetchProjects();
      setForm({ title: '', description: '', liveLink: '' });
      setImage(null);
    } catch (error) {
      toast.error('Error adding project');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
        withCredentials: true,
      });
      toast.success('Project Deleted');
      fetchProjects();
    } catch (error) {
      toast.error('Error deleting project');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, { withCredentials: true });
      navigate('/admin');
    } catch (error) {
      console.error('Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded font-bold">
            Logout
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              className="p-2 rounded bg-gray-700 border border-gray-600"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="liveLink"
              placeholder="Live Link"
              className="p-2 rounded bg-gray-700 border border-gray-600"
              value={form.liveLink}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="p-2 rounded bg-gray-700 border border-gray-600 md:col-span-2"
              value={form.description}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              className="p-2 rounded bg-gray-700 border border-gray-600 md:col-span-2"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit" className="mt-4 bg-green-600 hover:bg-green-500 px-6 py-2 rounded font-bold">
            Add Project
          </button>
        </form>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Existing Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project._id} className="flex items-center justify-between bg-gray-700 p-4 rounded">
                <div className="flex items-center space-x-4">
                  <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-sm text-gray-300">{project.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
