import { assets, infoList, toolsData } from "../assets/assets";
import React from "react";
import { motion } from "framer-motion";

const About = ({ isDark }) => {
  return (
    <motion.div
      id="about"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`w-full px-[12%] py-10 ${isDark ? "text-white" : ""}`}
    >
      <h4 className="text-center mb-2 text-lg font-ovo">Introduction</h4>
      <h2 className="text-center text-5xl font-ovo">About me</h2>
      <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        <div className="w-64 sm:w-80 rounded-3xl max-w-none">
          <img
            src={assets.user_image}
            alt="user "
            width={256}
            className="w-full rounded-3xl"
          />
        </div>
        <div className="flex-1">
          <p className="mb-10 max-w-2xl font-outfit">
            I'm a BCA student and aspiring Full Stack Developer passionate about
            how websites work. Skilled in React and Node.js, I love building
            projects, learning new tech, and sharing knowledge. My goal is to
            grow into a senior developer and work with teams to build impactful
            web applications.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            {infoList.map(({ icon, iconDark, title, description }, index) => (
              // dark mode
              // darkmode shadow - darkmode
              <li
                key={index}
                className={`border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer  hover:-translate-y-1 duration-500 ${
                  isDark
                    ? "hover:bg-[#2a004a] hover:shadow-[4px_4px_0_rgba(0,0,0,0)]"
                    : "hover:shadow-[4px_4px_0_rgba(0,0,0,0.25)] hover:bg-[#fcf4ff]"
                } `}
              >
                <img
                  src={isDark ? iconDark : icon}
                  alt="title"
                  width={28}
                  className="w-7 mt-3"
                />
                <h3
                  className={`my-4 font-semibold ${
                    isDark ? "text-white" : "text-gray-700"
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? "text-white" : "text-gray-600"
                  }`}
                >
                  {description}
                </p>
              </li>
            ))}
          </ul>
          <h4
            className={`my-6 ${
              isDark ? "text-white" : "text-gray-700"
            } font-ovo`}
          >
            Tools I use
          </h4>

          <ul className="flex items-center gap-3 sm:gap-5">
            {toolsData.map((tool, index) => (
              <li
                key={index}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500"
              >
                <img src={tool} alt="tool" width={20} className="w-5 sm:w-7" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
