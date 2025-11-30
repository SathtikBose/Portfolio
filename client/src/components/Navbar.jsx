import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";

const Navbar = ({ isDark, setIsdark }) => {
  const [isScroll, setIsScroll] = useState(false);
  const sideMenuRef = useRef();
  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };
  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  });

  return (
    <>
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]">
        <img
          src={assets.header_bg_color}
          alt=""
          width={400}
          className={`w-full ${isDark && "hidden"} `}
        />
      </div>
      <nav
        className={`w-full fixed z-50 px-5 lg:px-8 xl:px[8%] py-4 flex items-center justify-between ${
          isScroll
            ? ` ${
                isDark ? `${isDark ? "text-white" : ""}` : "bg-white"
              } bg-opacity-50 backdrop-blur-lg shadow-sm`
            : `${isDark ? "text-white" : ""}`
        }`}
      >
        <a href="#top">
          <img
            src={!isDark ? assets.logo : assets.logo_dark}
            className="w-28 cursor-pointer mr-14"
            width={112}
            alt=""
          />
        </a>
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${
            isScroll
              ? ""
              : `${
                  !isDark
                    ? "bg-white"
                    : "bg-[#11001f] border border-white text-white"
                } shadow-sm `
          } `}
        >
          <li>
            <a href="#top" className="font-ovo">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="font-ovo">
              About me
            </a>
          </li>
          <li>
            <a href="#services" className="font-ovo">
              Services
            </a>
          </li>
          <li>
            <a href="#work" className="font-ovo">
              My Work
            </a>
          </li>
          <li>
            <a href="#contact" className="font-ovo">
              Contact me
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsdark((cur) => !cur)}>
            <img
              src={isDark ? assets.sun_icon : assets.moon_icon}
              alt=""
              className="w-6"
            />
          </button>
          <a
            href="#contact"
            className={`hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-ovo `}
          >
            Contact{" "}
            <img
              src={isDark ? assets.arrow_icon_dark : assets.arrow_icon}
              className="w-3"
              alt=""
            />
          </a>
          <button className="block md:hidden ml-3">
            <img
              src={isDark ? assets.menu_white : assets.menu_black}
              alt=""
              className="w-6"
              onClick={openMenu}
            />
          </button>
        </div>
        {/* mobile menu */}

        <ul
          ref={sideMenuRef}
          className={`md:hidden flex flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen ${
            isDark ? "bg-[#2a004a]" : "bg-rose-50"
          } transition duration-500`}
        >
          <div className=" absolute right-6 top-6" onClick={closeMenu}>
            <img
              src={isDark ? assets.close_white : assets.close_black}
              alt=""
              className="w-5 cursor-pointer"
            />
          </div>

          <li>
            <a href="#top" className="font-ovo" onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="font-ovo" onClick={closeMenu}>
              About me
            </a>
          </li>
          <li>
            <a href="#services" className="font-ovo" onClick={closeMenu}>
              Services
            </a>
          </li>
          <li>
            <a href="#work" className="font-ovo" onClick={closeMenu}>
              My Work
            </a>
          </li>
          <li>
            <a href="#contact" className="font-ovo" onClick={closeMenu}>
              Contact me
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
