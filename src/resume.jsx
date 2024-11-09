//imports
import React from "react";
import { motion } from "framer-motion";

//resume page that contains my resume
const Resume = () => (
  <div className="resumeSection">
    <div className="background">
      <motion.h1
        className="resumeHeading"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Resume
      </motion.h1>
      <img src="/resume.png" className="resumePicture" alt="My resume" />{" "}
      <div className="centerContainer">
        <a
          href="https://drive.google.com/drive/u/0/folders/1c2qjx02dvd33weYW3Kl--AZ2PDeWdgob"
          className="resumeLink"
          download
        >
          Download
        </a>
      </div>
    </div>
  </div>
);

//export it as resume so we can include it in our app
export default Resume;
