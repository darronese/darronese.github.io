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
      <div className="projectsFlexContainer">
        <div className="gameContainer">
          <h2 className="headingForProjects">Dark Ship</h2>
          <p className="descripForProjects">
            Dark Ship is a 2-D game loosely inspired by "Dead by Daylight" using
            SFML 2.6.1 and C/C++!
          </p>
          {/* Carousel Integration */}
          <div className="pictures">
            <GameCarousel />
          </div>
          <a
            href="https://github.com/darronese/Dark-Ship"
            target="_blank"
            className="contactsLink"
            title="Goes to email!"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github"></i> Repository 
          </a>
        </div>
        <div className="musicContainer">
          <h2 className="headingForProjects">Magic Music</h2>
          <p className="descripForProjects">
            Magic Music is a innovative music theory generator that uses Python
            and the music21 library to generate music theory!
          </p>
          {/* Carousel Integration */}
          <div className="pictures">
            <p className="projectsDescrip">***WIP***</p>
          </div>
        </div>
      </div>
    </div>
  );
};

//export as projects so we can edit it in app
export default Projects;
