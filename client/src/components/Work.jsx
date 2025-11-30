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
          `${import.meta.env.VITE_API_URL}/api/projects`
        );
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(workData);
      }
    };
    fetchProjects();
  }, []);

  const mainProjects = projects.slice(0, 4);
  const extraProjects = projects.slice(4);

  return (
    <motion.div
      id="work"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`w-full px-[12%] py-10 ${isDark ? "text-white" : ""}`}
    >
      <h4 className="text-center mb-2 text-lg font-ovo">My portfolio</h4>
      <h2 className="text-center text-5xl font-ovo">My latest work</h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-outfit">
        Welcome to my Fullstack web development portfolio ! Explore a collection
        of projects showcasing ny expertise in Fullstack Web development.
      </p>
      <div className="my-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
        {mainProjects.map((project, index) => (
          <a
            href={project.liveLink || project.link}
            target="_blank"
            key={index}
          >
            <div
              className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group"
              style={{
                backgroundImage: `url(${project.image || project.bgImage})`,
              }}
            >
              <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
                <div className="">
                  <h2 className="font-semibold text-black">{project.title}</h2>
                  <p className="text-sm text-gray-700">{project.description}</p>
                </div>
                <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                  <a href={project.liveLink || project.link} target="_blank">
                    <img
                      src={assets.send_icon}
                      alt="send icon"
                      width={20}
                      className="w-5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </a>
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
            <div className="my-5 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
              {extraProjects.map((project, index) => (
                <a
                  href={project.liveLink || project.link}
                  target="_blank"
                  key={index + 4}
                >
                  <div
                    className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group "
                    style={{
                      backgroundImage: `url(${
                        project.image || project.bgImage
                      })`,
                    }}
                  >
                    <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
                      <div className="">
                        <h2 className="font-semibold text-black">
                          {project.title}
                        </h2>
                        <p className="text-sm text-gray-700">
                          {project.description}
                        </p>
                      </div>
                      <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                        <a
                          href={project.liveLink || project.link}
                          target="_blank"
                        >
                          <img
                            src={assets.send_icon}
                            alt="send icon"
                            width={20}
                            className="w-5"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </a>
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
