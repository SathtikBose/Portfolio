import { assets, serviceData } from "../assets/assets";
import React from "react";
import { motion } from "framer-motion";

const Services = ({ isDark }) => {
  return (
    <motion.div
      id="services"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`w-full px-[12%] py-10 ${isDark ? "text-white" : ""}`}
    >
      <h4 className="text-center mb-2 text-lg font-ovo">What I offer</h4>
      <h2 className="text-center text-5xl font-ovo">My Services</h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-outfit">
        I offer full-stack development across web, mobile, and AI-enabled
        platforms. From frontend architecture to backend APIs and AI integrations,
        I build practical, scalable products that deliver real-world value.
      </p>
      <div className="my-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
        {serviceData.map(({ icon, title, description, link }, index) => (
          // dark mode hover:bg-[#2a004a]
          // hover:shadow-[4px_4px_0_rgba(0,0,0,0)] darkmode
          <div
            key={index}
            className={`border border-gray-400 rounded-lg px-8 py-12 cursor-pointer  hover:-translate-y-1 duration-500 ${
              isDark
                ? "hover:bg-[#2a004a] hover:shadow-[4px_4px_0_rgba(0,0,0,0)]"
                : "hover:shadow-[4px_4px_0_rgba(0,0,0,0.25)] hover:bg-[#fcf4ff]"
            }`}
          >
            <img src={icon} alt="" width={40} className="w-10" />
            <h3
              className={`text-lg my-4 ${
                isDark ? "text-white" : "text-gray-700"
              }  `}
            >
              {title}
            </h3>
            <p
              className={`text-sm my-4 ${
                isDark ? "text-white" : "text-gray-700"
              }  `}
            >
              {description}
            </p>
            <a
              href={link}
              target="_blank"
              className={`flex items-center gap-2 text-sm mt-5 ${
                isDark ? "text-white" : ""
              }`}
            >
              Read more{" "}
              <img
                src={isDark ? assets.right_arrow_white : assets.right_arrow}
                alt=""
                width={16}
                className="w-4"
              />
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Services;
