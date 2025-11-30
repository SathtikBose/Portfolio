import { assets } from "../assets/assets";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = ({ isDark }) => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "91feafec-62df-43b0-9473-00f98a7ffb7e");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <motion.div
      id="contact"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`w-full px-[12%] py-10 ${
        isDark ? "text-white" : "bg-[url('/footer-bg-color.png')]"
      }  bg-no-repeat bg-center bg-[lenght:90%_auto]`}
    >
      <h4 className="text-center mb-2 text-lg font-ovo">Connect with me </h4>
      <h2 className="text-center text-5xl font-ovo">Get in touch</h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-outfit">
        I'd love to hear from you ! If you have any query, comments , or
        feedback, please use the form below.
      </p>
      <form
        className="max-2-2xl mx-auto flex flex-col gap-8"
        onSubmit={onSubmit}
      >
        <div className="flex gap-6 flex-wrap">
          <input
            type="text"
            placeholder="Enter you name"
            required
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white placeholder:text-black text-black"
            name="name"
          />
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white placeholder:text-black text-black"
            name="email"
          />
        </div>
        <textarea
          rows={6}
          placeholder="Enter your message"
          required
          className={
            "w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md  placeholder:text-black bg-white mb-6 text-black"
          }
          name="message"
        ></textarea>
        <button
          type="submit"
          className={`py-3 px-8 w-max flex items-center justify-between gap-2 ${
            isDark
              ? " text-white border border-white hover:bg-[#2a004a]"
              : "bg-black/80 text-white hover:bg-black"
          } rounded-full mx-auto  duration-500`}
        >
          Submit{" "}
          <img
            src={!isDark ? assets.right_arrow_white : assets.right_arrow}
            alt=""
            width={16}
            className="w-4"
          />
        </button>
        <p className={`mt-4 ${isDark ? "text-white" : "text-gray-700"}`}>
          {result}
        </p>
      </form>
    </motion.div>
  );
};

export default Contact;
