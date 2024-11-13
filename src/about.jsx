//imports
import React from "react";
import { motion } from "framer-motion";
import "./style.css";

//main about content
const About = () => (
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
  text-5xl
  sm:text-7xl
  md:text-9xl
  lg:text-[10em]
  xl:text-[12em]
"
        //animation to have it appear and be clickable
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        About
      </motion.h1>
      <motion.p
        className="
    text-center
    font-garamond
    text-[#4b3b42]
    mt-8
    sm:mt-6
    md:mt-8
    w-4/5
    mx-auto
    p-6
    bg-[#f7ebdf]
    border-2
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
        Hi! I’m Darron Li, a passionate and dedicated software engineer
        currently pursuing a Bachelor of Science in Computer Science at
        Washington State University. My enthusiasm for learning drives me to
        explore and create new technologies and programs. A great example is my
        personal portfolio website, developed using HTML, CSS with TailwindCSS,
        and JavaScript with the React framework. Additionally, I created "Dark
        Ship," an interactive game built with C/C++ using the SFML library for
        graphics. Currently, I am working on "Magic Music," a music theory
        generator developed in Python utilizing the music21 library. Beyond my
        technological pursuits, I am also an accomplished musician with mastery
        of the guitar and piano, which has enhanced my creativity and
        discipline.
      </motion.p>
    </div>
  </div>
);

//export about so we can use it in our app
export default About;
