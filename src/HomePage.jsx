//imports
import React from "react";
import { motion } from "framer-motion";

//homepage
const HomePage = () => (
  //combined contacts page with the home page
  <div>
  <motion.h1
  className="landHeading"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
  >
  Darron Li
  </motion.h1>
  <p className="landDescrip">Welcome to my webpage!</p>
  <div className="centerContainer">
  <a
  href="mailto:darron198@hotmail.com"
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
  </div>
  </div>
);

//export it so we can use it in our apps
export default HomePage;
