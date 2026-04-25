import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { assets } from "../assets/assets";

const Certificates = ({ isDark }) => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/certificates`,
        );
        setCertificates(res.data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <motion.div
      id="certificates"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`w-full px-[12%] py-10 ${isDark ? "text-white" : ""}`}
    >
      <h4 className="text-center mb-2 text-lg font-ovo">My Achievements</h4>
      <h2 className="text-center text-5xl font-ovo">Certifications</h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-outfit">
        A collection of professional certifications and courses I have completed
        to enhance my technical skills.
      </p>

      <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
        {Array.isArray(certificates) &&
          certificates.map((cert, index) => (
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
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  <p className="text-[9px] uppercase tracking-wider bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-gray-700 font-bold">
                    {cert.platform || "Certificate"}
                  </p>
                </div>
              </div>

              {/* Content section - Compact */}
              <div className="p-4 flex flex-col flex-grow">
                <h3
                  className={`text-base font-semibold truncate ${isDark ? "text-white" : "text-black"}`}
                >
                  {cert.title}
                </h3>
                <p
                  className={`text-xs mt-1 line-clamp-2 h-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {cert.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  {cert.liveLink ? (
                    <a
                      href={cert.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <button className="w-full py-2 bg-lime-300 text-black rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-lime-400 transition-colors duration-300 shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                        View Course
                        <img src={assets.send_icon} alt="" className="w-3" />
                      </button>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2 bg-gray-300 text-gray-500 rounded-lg text-xs font-bold cursor-not-allowed"
                    >
                      No Link Available
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export default Certificates;
