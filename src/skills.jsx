//imports
import React from "react";
import { motion } from "framer-motion";
import "./style.css";

//main about content
const Skills = () => (
  <div>
    <div>
      <motion.h2
        className="
  text-center
  font-oswald
  font-semibold
  mt-8
  text-[#4b3b42]
  leading-[1.25em]
    text-[5em]
    sm:text-[6em]
    md:text-[7em]
    lg:text-[8em]
    xl:text-[9em]
    2xl:text-[10em]
  "
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Skills
      </motion.h2>
      <motion.ul
        className="
    text-center
    font-garamond
    text-[#4b3b42]
    mt-4
    sm:mt-6
    md:mt-3
    w-4/5
    mx-auto
    p-6
    bg-[#f7ebdf]
    border-5
    border-[#4b3b42]
    rounded-[8px]
    leading-[1.5em]
    text-base
    sm:text-lg
    md:text-xl
    lg:text-2xl
    xl:text-3xl
  "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <li className="mb-4">
          - Proficient in C/C++, Python, Javascript, Html, CSS, Lua
        </li>
        <li className="mb-4">
          - Experienced with modern front-end technologies, such as React,
          TailwindCSS, Framer Motion,
        </li>
        <li className="mb-4">
          - Knowledgeable of software devlopment tools such as Git/Github, NPM,
          CMake/Make, Pytest
        </li>
        <li className="mb-4">
          - Strong understanding of algorithms, data structures, and
          object-oriented programming
        </li>
      </motion.ul>
    </div>
  </div>
);

export default Skills;
