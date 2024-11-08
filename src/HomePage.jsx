// HomePage.jsx
import React, { useMemo } from "react"; // Import useMemo instead of useState
import { motion } from "framer-motion";
import BouncingMusicNotes from "./musicNotes.jsx"; // Ensure the correct path
import { v4 as uuidv4 } from "uuid";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Stagger the animations of child components
    },
  },
};

// Variants for staggered child animations (optional)
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const HomePage = () => {
  const numberOfNotes = 30;

  // Generate 30 notes with unique IDs and random positions/delays/durations
  const notes = useMemo(
    () =>
      Array.from({ length: numberOfNotes }, () => ({
        id: uuidv4(),
        x: Math.random() * 100, // Random horizontal position as percentage (0-100%)
        delay: Math.random() * 10, // Random delay up to 10 seconds
        duration: Math.random() * 5 + 5, // Random duration between 5-10 seconds
      })),
    [numberOfNotes],
  );

  return (
    <div
      className="homePage"
    >
      {/* Render all 30 music notes */}
      {notes.map((note) => (
        <BouncingMusicNotes
          key={note.id}
          x={`${note.x}%`} // Position as percentage for responsiveness
          delay={note.delay}
          duration={note.duration}
        />
      ))}

      <motion.div
        className="contentContainer"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ zIndex: 2, position: "relative" }}
      >
        <motion.h1 className="landHeading" variants={childVariants}>
          Darron Li
        </motion.h1>
        <motion.p className="landDescrip" variants={childVariants}>
          Welcome to my webpage!
        </motion.p>
        <motion.div className="centerContainer" variants={childVariants}>
          <a
            href="mailto:darronese@outlook.com"
            target="_blank"
            className="contactsLink"
            title="Goes to email!"
            rel="noopener noreferrer"
          >
            <i className="fa-solid fa-envelope"></i> Email
          </a>
          <br />
          <a
            href="https://github.com/darronese"
            target="_blank"
            className="contactsLink"
            title="Goes to github!"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github"></i> Github
          </a>
          <br />
          <a
            href="https://www.linkedin.com/in/darronese/"
            target="_blank"
            className="contactsLink"
            title="Goes to linkedin!"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin-in"></i> LinkedIn
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
