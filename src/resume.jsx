//imports
import React from "react";
import { motion } from "framer-motion";

const Resume = () => (
  <div
  >
    <div>
      <motion.h1
        className="
  text-center
  font-oswald
  font-semibold
  mt-8
  text-[#4b3b42]
  leading-[1.25em]
  text-5xl
  sm:text-7xl
  md:text-9xl
  lg:text-[10em]
  xl:text-[12em]
  "
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Resume
      </motion.h1>
      <img
        src="/resume.png"
        className="
  mt-[5vh]
  block
  mx-auto
  border-[5px]
  border-[#4b3b42]
  w-[35vw]
  max-w-md
  h-auto
  "
        alt="My resume"
      />{" "}
      <div
        className="
  flex flex-col items-center w-full mt-4
  "
      >
        <a
          href="https://drive.google.com/drive/u/0/folders/1c2qjx02dvd33weYW3Kl--AZ2PDeWdgob"
          target="_blank"
          rel="noopener noreferrer"
          className="
  font-garamond
  text-[#9c8481]
  m-20
  inline-block
  text-[1.75rem]
  text-center
  hover:text-blue-500
  "
        >
          <i className="fa-brands fa-google-drive"></i> Download
        </a>
      </div>
    </div>
  </div>
);

export default Resume;
