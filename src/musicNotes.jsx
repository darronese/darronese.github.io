import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const BouncingMusicNotes = ({ x, delay, duration }) => {
  return (
    <motion.img
      src={'./halfNote.png'}
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
        zIndex: 1,
      }}
    />
  );
};

export default BouncingMusicNotes;
