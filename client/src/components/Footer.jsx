import { assets } from "../assets/assets";
import React from "react";
import { motion } from "framer-motion";

const Footer = ({ isDark }) => {
  return (
    <motion.div
      className={`mt-20 ${isDark ? "text-white" : ""}`}
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="text-center">
        <img
          src={isDark ? assets.logo_dark : assets.logo}
          className="mx-auto mb-2 w-36"
          width={144}
          alt=""
        />
        <div className="flex items-center gap-2 mx-auto w-max">
          <img
            src={isDark ? assets.mail_icon_dark : assets.mail_icon}
            alt=""
            width={24}
            className="w-6"
          />{" "}
          sathtikbose@gmail.com
        </div>
      </div>
      <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6">
        <p>&copy; 2025 Sathtik Bose. All right reserved.</p>
        <ul className="flex items-center justify-center gap-10 mt-4 sm:mt-0">
          <li>
            <a target="_blank" href="https://github.com/SathtikBose">
              Github
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.linkedin.com/in/sathtik-bose/">
              LinkedIn
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.coursera.org/user/8163beed191329b856da3634dacb82b9"
            >
              Coursera
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.udemy.com/user/sathtik-bose/">
              Udemy
            </a>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Footer;
