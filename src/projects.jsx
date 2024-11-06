//Imports
import React from 'react';
import { motion } from "framer-motion";

//projects
const Projects = () => (
  <div>
  <motion.h1 className="projectsHeading"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >Projects</motion.h1>
  <body className="projectsDescrip">
  *WIP*
  </body>
  </div>
);

//export as projects so we can edit it in app
export default Projects;
