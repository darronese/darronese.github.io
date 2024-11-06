//imports
import React from "react";
import { motion } from "framer-motion";
import "./style.css";

//main about content
const Skills = () => (
  <div className="background">
  <motion.h2
  className="skillsHeading"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
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
  <li>-Proficient in C/C++, Python, Javascript, Html, CSS</li>
  <li>
  -Experience with modern front-end libraries like React and TailwindCSS
  </li>
  <li>
  -Knowledge of software devlopment tools such as Github, Webpack and
  source control (Git)
  </li>
  <li>
  -Proficient in understanding of algorithms, data structures, and
  object-oriented programming
  </li>
  </motion.ul>
  </div>
);

//export about so we can use it in our app
export default Skills;
