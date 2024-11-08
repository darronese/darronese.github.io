import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const BouncingMusicNotes = ({ x, delay, duration }) => {
  return (
    <motion.img
      src={'./halfNote.png'} // Ensure this path is correct
      alt="Bouncing Music Note Icon"
      className="music-note"
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: '-100vh', opacity: 1 }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      }}
      style={{
        position: "absolute",
        left: x,
        width: "50px",
        height: "50px",
        pointerEvents: "none", // Prevents the note from blocking clicks
        zIndex: 1,
      }}
    />
  );
};

BouncingMusicNotes.propTypes = {
  x: PropTypes.string.isRequired, // Percentage string (e.g., '50%')
  delay: PropTypes.number.isRequired, // Delay in seconds
  duration: PropTypes.number.isRequired, // Duration in seconds
};

export default BouncingMusicNotes;
