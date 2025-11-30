import { assets } from "../assets/assets";
import React from "react";
import { motion } from "framer-motion";

const Header = ({ isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 ${
        isDark ? " text-white" : ""
      }`}
    >
      <div>
        <img
          src={assets.profile_img}
          alt=""
          className="rounded-full w-32"
          width={128}
        />
      </div>
      <h3
        className={`flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo ] `}
      >
        Hi ! I'm Sathtik Bose{" "}
        <img
          src={assets.hand_icon}
          alt=""
          className="rounded-full w-6"
          width={24}
        />
      </h3>
      <h1 className="text-3xl sm:text-6xl lg:text-[66px] fone-Ovo">
        Fullstack web developer based in India.
      </h1>
      <p className="max-w-2xl mx-auto font-outfit">
        I am a fullstack web developer from Jharkhand . India with 1 year of
        experience in multiple frontend and backend projects
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <a
          href="#contact"
          className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2"
        >
          contact me{" "}
          <img
            src={assets.right_arrow_white}
            alt=""
            className="   w-4"
            width={16}
          />
        </a>
        <a
          href="/Sathtik_Bose_Resume.pdf"
          className={`px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 ${
            isDark ? "bg-white text-black border border-white " : ""
          }`}
        >
          my resume{" "}
          <img
            src={assets.download_icon}
            alt=""
            className="   w-4"
            width={16}
          />
        </a>
      </div>
    </motion.div>
  );
};

export default Header;
