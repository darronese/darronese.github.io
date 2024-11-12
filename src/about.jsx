//imports
import React from "react";
import { motion } from "framer-motion";
import "./style.css";

//main about content
const About = () => (
  <div className="aboutSection">
    <div className="background">
      <motion.h1
        className="aboutHeading"
        //animation to have it appear and be clickable
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        About
      </motion.h1>
      <motion.p
        className="aboutDescription"
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
        generator developed in Python utilizing the music21 library. This
        project aims to assist musicians like myself in understanding and
        applying music theory concepts more effectively. Beyond my technological
        pursuits, I am also an accomplished musician with mastery of the guitar
        and piano, which has enhanced my creativity and discipline.
      </motion.p>
    </div>
  </div>
);

//export about so we can use it in our app
export default About;
