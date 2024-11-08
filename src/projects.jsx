//Imports
import React, { useState } from "react";
import { motion } from "framer-motion";
import GameCarousel from "./gameCarousel";

//projects
const Projects = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <motion.h1
        className="projectsHeading"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Projects
      </motion.h1>
        <div className="gameContainer">
          <h2 className="gameHeading">Dark Ship</h2>
          <p className="gameDescrip">
            Dark Ship is a 2-D game loosely inspired by "Dead by Daylight" using
            SFML 2.6.1 and C/C++!
          </p>
          {/* Carousel Integration */}
          <div className="pictures">
            <GameCarousel />
          </div>
      </div>
    </div>
  );
};

//export as projects so we can edit it in app
export default Projects;
