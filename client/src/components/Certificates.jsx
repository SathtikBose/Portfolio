import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { assets } from "../assets/assets";

const Certificates = ({ isDark }) => {
  const [certificates, setCertificates] = useState([]);
  const [showMoreCertificates, setShowMoreCertificates] = useState(false);

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

  const mainCertificates = Array.isArray(certificates)
    ? certificates.slice(0, 4)
    : [];

  const extraCertificates = Array.isArray(certificates)
    ? certificates.slice(4)
    : [];

  const CertificateCard = ({ cert, index }) => (
    <div
      key={index}
      className={`w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.33%-1.25rem)] xl:w-[calc(25%-1.25rem)] border border-gray-400 rounded-xl overflow-hidden flex flex-col group hover:-translate-y-1 duration-500 ${
        isDark
          ? "bg-[#2a004a] hover:shadow-[4px_4px_0_#000]"
          : "bg-white hover:bg-[#fcf4ff] hover:shadow-[4px_4px_0_rgba(0,0,0,0.1)]"
      }`}
    >
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={cert.image}
          alt={cert.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-2 left-2">
          <p className="text-[9px] uppercase tracking-wider bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-gray-700 font-bold">
            {cert.platform || "Certificate"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        <h3
          className={`text-base font-semibold truncate ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {cert.title}
        </h3>

        <p
          className={`text-xs mt-1 line-clamp-2 h-8 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {cert.description}
        </p>

        <div className="mt-4">
          {cert.liveLink ? (
            <a
              href={cert.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <button className="w-full py-2 bg-lime-300 text-black rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-lime-400 transition-colors duration-300 shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                View Certificate
                <img src={assets.send_icon} alt="" className="w-3" />
              </button>
            </a>
          ) : (
            <button
              disabled
              className="w-full py-2 text-xs font-bold text-gray-500 bg-gray-300 rounded-lg cursor-not-allowed"
            >
              No Link Available
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      id="certificates"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`w-full px-[12%] py-10 ${isDark ? "text-white" : ""}`}
    >
      <h4 className="mb-2 text-lg text-center font-ovo">My Achievements</h4>
      <h2 className="text-5xl text-center font-ovo">Certifications</h2>

      <p className="max-w-2xl mx-auto mt-5 mb-12 text-center font-outfit">
        A collection of professional certifications and courses I have completed
        to enhance my technical skills.
      </p>

      {/* Main Certificates */}
      <div className="flex flex-wrap justify-center gap-5 sm:justify-start">
        {mainCertificates.map((cert, index) => (
          <CertificateCard cert={cert} index={index} key={index} />
        ))}
      </div>

      {/* Extra Certificates */}
      <AnimatePresence>
        {showMoreCertificates && extraCertificates.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap justify-center gap-5 mt-5 sm:justify-start">
              {extraCertificates.map((cert, index) => (
                <CertificateCard
                  cert={cert}
                  index={index + 4}
                  key={index + 4}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show More Button */}
      {extraCertificates.length > 0 && (
        <button
          type="button"
          onClick={() => setShowMoreCertificates((prev) => !prev)}
          className={`w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] ${
            isDark
              ? "border-white text-white hover:bg-[#000]"
              : "border-gray-700 hover:bg-[#fcf4ff]"
          } rounded-full py-3 px-10 mx-auto my-20 duration-500`}
        >
          {showMoreCertificates ? "Show Less" : "Show More"}

          <img
            src={
              isDark ? assets.right_arrow_bold_dark : assets.right_arrow_bold
            }
            alt="Arrow"
            width={16}
            className={`w-4 transition-transform duration-300 ${
              showMoreCertificates ? "rotate-90" : ""
            }`}
          />
        </button>
      )}
    </motion.div>
  );
};

export default Certificates;
