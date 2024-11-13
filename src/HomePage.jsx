// HomePage.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import BouncingMusicNotes from "./musicNotes.jsx";
import { v4 as uuidv4 } from "uuid";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      //stagger the animations to make it appear one at a time
      staggerChildren: 0.3,
    },
  },
};

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

  //generate 30 notes with unique IDs and random positions/delays/durations
  const notes = useMemo(
    () =>
      Array.from({ length: numberOfNotes }, () => ({
        id: uuidv4(),
        //random horizontal position as percentage (0-100%)
        x: Math.random() * 100,
        //random delay up to 10 seconds
        delay: Math.random() * 10,
        //random duration between 5-10 seconds
        duration: Math.random() * 5 + 5,
      })),
    [numberOfNotes],
  );

  return (
    <div
      className="
        relative
        z-20
        overflow-hidden
        w-full
        min-h-screen
        bg-[#d7bea8]
        flex
        flex-col
        items-center
        justify-center
      "
    >
      {notes.map((note) => (
        <BouncingMusicNotes
          key={note.id}
          //position as percentage for responsiveness
          x={`${note.x}%`}
          delay={note.delay}
          duration={note.duration}
        />
      ))}

      <motion.div
        className="relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ zIndex: 2, position: "relative" }}
      >
        <motion.h1
          className="
    text-center 
    font-oswald 
    font-semibold 
    mt-8 text-[#4b3b42] 
    leading-[1.25em] 
    text-[5em]
    sm:text-[6em]
    md:text-[7em]
    lg:text-[8em]
    xl:text-[9em]
    2xl:text-[10em]
    "
          variants={childVariants}
        >
          Darron Li
        </motion.h1>
        <motion.p
          className="
    text-center
    font-garamond
    text-[#4b3b42]
    leading-[1.5em]
    mt-8
    text-lg
    sm:text-xl
    md:text-2xl
    lg:text-3x1
    xl:text-4xl
    "
          variants={childVariants}
        >
          Welcome to my webpage!
        </motion.p>
        <motion.div
          className="flex flex-col items-center mt-4"
          variants={childVariants}
        >
          <a
            href="mailto:darronese@outlook.com"
            target="_blank"
            className="
    text-center
    font-bold
    font-garamond
    mt-2
    text-[#9c8481]
    hover:text-blue-500
    text-lg
    sm:text-xl
    md:text-2xl
    lg:text-3xl
    "
            title="Goes to email!"
            rel="noopener noreferrer"
          >
            <i className="fa-solid fa-envelope"></i> Email
          </a>
          <br />
          <a
            href="https://github.com/darronese"
            target="_blank"
            className="
    text-center
    font-bold
    font-garamond
    mt-2
    text-[#9c8481]
    hover:text-blue-500
    text-lg
    sm:text-xl
    md:text-2xl
    lg:text-3xl
"
            title="Goes to github!"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github"></i> Github
          </a>
          <br />
          <a
            href="https://www.linkedin.com/in/darronese/"
            target="_blank"
            className="
    text-center
    font-bold
    font-garamond
    mt-2
    text-[#9c8481]
    hover:text-blue-500
    text-lg
    sm:text-xl
    md:text-2xl
    lg:text-3xl
"
            title="Goes to linkedin!"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin-in"></i> LinkedIn
          </a>
    <br></br>
          <a
            href="https://github.com/darronese/darronese.github.io"
            target="_blank"
            className="
    text-center
    font-bold
    font-garamond
    mt-2
    text-[#9c8481]
    hover:text-blue-500
    text-lg
    sm:text-xl
    md:text-2xl
    lg:text-3xl
"
            title="Goes to repository!"
            rel="noopener noreferrer"
          >
            <i className="fa-solid fa-code"></i> Repository
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
