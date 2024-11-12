//imports
import React from "react";
import { motion } from "framer-motion";

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
          target="_blank"
          rel="noopener noreferrer"
          className="resumeLink"
        >
          <i className="fa-brands fa-google-drive"></i> Download
        </a>
      </div>
    </div>
  </div>
);

export default Resume;
