/*
TO-DO LIST
- Add more details to the about
- Animate the home page
- Better the scrolling: I want when the user is scrolling to the about section for the skills to
  appear only when the personal statement has ended
- Add picture of myself to about section
- Finish game project and add that within my projects

*/
// Imports
import React, { useRef } from "react";
import Footer from "./sidebar";
import HomePage from "./homepage";
import About from "./about.jsx";
import Resume from "./resume.jsx";
import Projects from "./projects.jsx";
import Skills from "./skills.jsx";
//animations from parallax library
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
//animations from framer-motion
import { motion } from "framer-motion";
//styles
import "./style.css";

//main app
const App = () => {
  //creates a reference to the parallax component
  const parallaxRef = useRef(null);

  //from parallaxRef, it allows us to create a dynamic way of scrolling
  const scrollTo = (page) => {
    if (parallaxRef.current) {
      parallaxRef.current.scrollTo(page);
    }
  };

  //main app render, has 4 sections,
  //planning on updating to 5 with a skills section
  //returns a wrapper like that wraps every webpage together inside one dynamic page!
  return (
    <div>
      <Footer scrollTo={scrollTo} /> {/* Pass scrollTo function */}
      <Parallax ref={parallaxRef} pages={4}>
        <ParallaxLayer offset={0} speed={0.5} factor={1}>
          <div className="parallax-section">
            <HomePage />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5} factor={1}>
          <div className="parallax-section">
            <About />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.5} factor={1}>
          <div className="parallax-section">
            <Skills />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0.5} factor={1}>
          <div className="parallax-section">
            <Resume />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={4} speed={0.5} factor={1}>
          <div className="parallax-section">
            <Projects />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default App;
