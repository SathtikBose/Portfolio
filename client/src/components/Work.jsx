import { assets, workData } from "../assets/assets";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Work = ({ isDark }) => {
  const [projects, setProjects] = useState([]);
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects`,
        );
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(workData);
      }
    };
    fetchProjects();
  }, []);

  const mainProjects = Array.isArray(projects) ? projects.slice(0, 4) : [];
  const extraProjects = Array.isArray(projects) ? projects.slice(4) : [];

  return (
    <motion.div
      id="work"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`w-full px-[12%] py-10 ${isDark ? "text-white" : ""}`}
    >
      <h4 className="mb-2 text-lg text-center font-ovo">My portfolio</h4>
      <h2 className="text-5xl text-center font-ovo">My latest work</h2>
      <p className="max-w-2xl mx-auto mt-5 mb-12 text-center font-outfit">
        Welcome to my Fullstack development portfolio ! Explore a collection of
        projects showcasing ny expertise in Fullstack development.
      </p>
      <div className="flex flex-wrap justify-center gap-5 my-10 sm:justify-start">
        {mainProjects.map((project, index) => (
          <div
            key={index}
            className={`w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.33%-1.25rem)] xl:w-[calc(25%-1.25rem)] border border-gray-400 rounded-xl overflow-hidden flex flex-col group hover:-translate-y-1 duration-500 ${
              isDark
                ? "bg-[#2a004a] hover:shadow-[4px_4px_0_#000]"
                : "bg-white hover:bg-[#fcf4ff] hover:shadow-[4px_4px_0_rgba(0,0,0,0.1)]"
            }`}
          >
            {/* Image section - Landscape aspect */}
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src={project.image || project.bgImage}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <p className="text-[9px] uppercase tracking-wider bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-gray-700 font-bold">
                  {project.projectType || "Website"}
                </p>
              </div>
            </div>

            {/* Content section - Compact */}
            <div className="flex flex-col flex-grow p-4">
              <h3
                className={`text-base font-semibold truncate ${isDark ? "text-white" : "text-black"}`}
              >
                {project.title}
              </h3>
              <p
                className={`text-xs mt-1 line-clamp-2 h-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                {project.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <a
                  href={project.liveLink || project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <button className="w-full py-2 bg-lime-300 text-black rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-lime-400 transition-colors duration-300 shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                    View Project
                    <img src={assets.send_icon} alt="" className="w-3" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {showMoreProjects && extraProjects.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap justify-center gap-5 my-5 sm:justify-start">
              {extraProjects.map((project, index) => (
                <div
                  key={index + 4}
                  className={`w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.33%-1.25rem)] xl:w-[calc(25%-1.25rem)] border border-gray-400 rounded-xl overflow-hidden flex flex-col group hover:-translate-y-1 duration-500 ${
                    isDark
                      ? "bg-[#2a004a] hover:shadow-[4px_4px_0_#000]"
                      : "bg-white hover:bg-[#fcf4ff] hover:shadow-[4px_4px_0_rgba(0,0,0,0.1)]"
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={project.image || project.bgImage}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2">
                      <p className="text-[9px] uppercase tracking-wider bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-gray-700 font-bold">
                        {project.projectType || "Website"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow p-4">
                    <h3
                      className={`text-base font-semibold truncate ${isDark ? "text-white" : "text-black"}`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-xs mt-1 line-clamp-2 h-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <a
                        href={project.liveLink || project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <button className="w-full py-2 bg-lime-300 text-black rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-lime-400 transition-colors duration-300 shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                          Demo
                          <img src={assets.send_icon} alt="" className="w-3" />
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setShowMoreProjects((prev) => !prev)}
        className={`w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] ${
          isDark
            ? " border-white text-white hover:bg-[#000]"
            : "border-gray-700 hover:bg-[#fcf4ff]"
        }  rounded-full py-3 px-10 mx-auto my-20  duration-500`}
      >
        {showMoreProjects ? "Show Less" : "Show More"}
        <img
          src={isDark ? assets.right_arrow_bold_dark : assets.right_arrow_bold}
          alt="Right arrow"
          width={16}
          className={`w-4 transition-transform duration-300 ${
            showMoreProjects ? "rotate-90" : ""
          }`}
        />
      </button>
    </motion.div>
  );
};

export default Work;
