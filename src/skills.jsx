//imports
import React from "react";
import { motion } from "framer-motion";
import "./style.css";

//main about content
const Skills = () => (
  <div className="skillsSection">
    <div className="background">
      <motion.h2
        className="skillsHeading"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Skills
      </motion.h2>
      <motion.ul
        className="skillsList"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <li>- Proficient in C/C++, Python, Javascript, Html, CSS, Lua</li>
        <li>
          - Experienced with modern front-end technologies, such as React, TailwindCSS, Framer Motion,
        </li>
        <li>
          - Knowledgeable of software devlopment tools such as Git/Github, NPM, CMake/Make, Pytest
        </li>
        <li>
          - Strong understanding of algorithms, data structures, and
          object-oriented programming
        </li>
      </motion.ul>
    </div>
  </div>
);

export default Skills;
