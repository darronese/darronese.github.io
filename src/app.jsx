/*
 * Switch to applying styling conditions within .jsx files and not style.jsx
 */
// Imports
import React, { useRef, useState, useEffect } from "react";
import Footer from "./sidebar";
import HomePage from "./homepage";
import About from "./about.jsx";
import Resume from "./resume.jsx";
import Projects from "./projects.jsx";
import Skills from "./skills.jsx";
//animations from parallax library
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
//animations from framer-motion
import ScrollProgressBar from "./scroll.jsx";
//animations for background
//styles
import "./style.css";

//main app
const App = () => {
  //creates a reference to the parallax component
  const parallaxRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (parallaxRef.current && parallaxRef.current.container.current) {
      const container = parallaxRef.current.container.current;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
    }
  };
  useEffect(() => {
    if (parallaxRef.current && parallaxRef.current.container.current) {
      const container = parallaxRef.current.container.current;
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  //from parallaxRef, it allows us to create a dynamic way of scrolling
  const scrollTo = (page) => {
    if (parallaxRef.current) {
      parallaxRef.current.scrollTo(page);
    }
  };
  //returns a wrapper like that wraps every webpage together inside one dynamic page!
  return (
    <div>
      <Footer scrollTo={scrollTo} />
      <ScrollProgressBar progress={scrollProgress} />
      <Parallax ref={parallaxRef} pages={5}>
        <ParallaxLayer offset={0} speed={0.5} factor={1} style={{backgroundColor: '#d7bea8'}}>
            <HomePage />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5} factor={1} style={{backgroundColor: '#d7bea8'}}>
            <About />
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.5} factor={1} style={{backgroundColor: '#d7bea8'}}>
            <Skills />
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0.5} factor={1} style={{backgroundColor: '#d7bea8'}}>
            <Resume />
        </ParallaxLayer>

        <ParallaxLayer offset={4} speed={0.5} factor={1} style={{backgroundColor: '#d7bea8'}}>
            <Projects />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default App;
