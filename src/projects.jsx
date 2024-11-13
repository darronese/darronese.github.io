// Imports
import React, { useState } from "react";
import { motion } from "framer-motion";
import GameCarousel from "./gameCarousel";

// Projects Component
const Projects = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <div>
        <motion.h1
          className="
            text-center
            font-oswald
            font-semibold
            mt-8
            text-[#4b3b42]
            leading-[1.25em]
            sm:text-[6em]
            md:text-[7em]
            lg:text-[8em]
            xl:text-[9em]
            2xl:text-[10em]
          "
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Projects
        </motion.h1>

        {/* Wrap both projects in a container */}
        {/* Projects Container */}
        <div className="container mx-auto px-4">
          <div
            className="
            flex
            flex-col
            sm:flex-row
            flex-wrap
            justify-center
            items-start
            gap-16
          "
          >
            {/* Project 1: Dark Ship */}
            <div
              className="
              flex-1
              min-w-[300px]
              max-w-[600px]
              p-6
              border-4
              border-[#4b3b42]
              rounded-lg
              bg-[#f7ebdf]
              shadow-lg
              flex
              flex-col
              justify-between
            "
            >
              <div>
                <h2
                  className="
                  font-oswald
                  font-semibold
                  text-[#4b3b42]
                  mb-4
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  text-center
                "
                >
                  Dark Ship
                </h2>
                <p
                  className="
                  font-garamond
                  text-[#4b3b42]
                  mb-6
                  text-lg
                  sm:text-xl
                  md:text-2xl
                  text-center
                "
                >
                  Dark Ship is a 2-D game loosely inspired by "Dead by Daylight"
                  using SFML 2.6.1 and C/C++!
                </p>
                {/* Carousel Integration */}
                <div className="mb-6">
                  <GameCarousel />
                </div>
              </div>
              <a
                href="https://github.com/darronese/Dark-Ship"
                target="_blank"
                className="
                font-garamond
                text-[#9c8481]
                text-[1.75em]
                text-center
                hover:text-blue-500
                transition-colors
                duration-300
              "
                title="View Repository"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i> Repository
              </a>
            </div>
            {/* Project 2: Magic Music */}
            <div
              className="
              flex-1
              min-w-[300px]
              max-w-[600px]
              p-6
              border-4
              border-[#4b3b42]
              rounded-lg
              bg-[#f7ebdf]
              shadow-lg
              flex
              flex-col
              justify-between
            "
            >
              <div>
                <h2
                  className="
                  font-oswald
                  font-semibold
                  text-[#4b3b42]
                  mb-4
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  text-center
                "
                >
                  Magic Music
                </h2>
                <p
                  className="
                  font-garamond
                  text-[#4b3b42]
                  mb-6
                  text-lg
                  sm:text-xl
                  md:text-2xl
                  text-center
                "
                >
                Magic Music is an innovative music theory generator that uses
                Python and the music21 library to generate music theory!
                </p>
                <p className="
    text-center
    ">
                  ***WIP***
                </p>
                {/* Carousel Integration Here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export as Projects so we can edit it in app
export default Projects;
