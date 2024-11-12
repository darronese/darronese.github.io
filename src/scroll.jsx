import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

//top scroll progress bar to make it look cool
const ScrollProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ transform: `scaleX(${progress})` }}
      ></div>
    </div>
  );
};

export default ScrollProgressBar;
