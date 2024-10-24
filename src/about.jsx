//imports
import React from "react";
import { motion } from "framer-motion";
import "./style.css";

//main about content
const About = () => (
  <div className="background">
    <motion.h1 
      className="aboutHeading"
      initial={{opacity: 0, y: 50}}
      whileInView={{opacity:1, y:0}}
      viewport={{once: false}}
      transition={{duration: 1.5}}
    >About</motion.h1>
    <motion.p 
      className="personalDescription"
      initial={{opacity: 0, y: 50}}
      whileInView={{opacity:1, y:0}}
      viewport={{once: false}}
      transi8tion={{duration: 1.5}}
      >
      My name is Darron Li and I am an aspiring software engineer. I am
      currently studying at Washington State University, pursuing a bachelor's
      in computer science.
    </motion.p>
  </div>
);

//export about so we can use it in our app
export default About;
