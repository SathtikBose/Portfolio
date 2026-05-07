import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#11001f] text-white font-outfit">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <h1 className="text-[150px] md:text-[200px] font-ovo leading-none select-none opacity-20">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.img
            src={assets.rocket}
            alt="Rocket"
            className="w-24 md:w-32"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-3xl md:text-4xl font-ovo mb-4">
          Houston, We Have a Problem
        </h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          The page you're looking for has drifted off into deep space. Let's get
          you back to safe harbor.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-10 py-3 border border-white rounded-full bg-white text-black hover:bg-transparent hover:text-white transition-all duration-300 font-ovo"
        >
          Return Home
          <img src={assets.right_arrow_bold} alt="" className="w-4" />
        </Link>
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFound;
