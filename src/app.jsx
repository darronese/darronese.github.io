// Imports
import React from "react";
import Footer from "./sidebar";
import HomePage from "./homepage";
import About from "./about.jsx";
import Resume from "./resume.jsx";
import Projects from "./projects.jsx";
import "./style.css";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";

//Route things so i can use links
const App = () => (
  <div>
      <Parallax pages={4}>
        <ParallaxLayer>
          <section id="home">
            <HomePage />
          </section>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5}>
          <section id="about">
            <About />
          </section>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.5}>
          <section id="resume">
            <Resume />
          </section>
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0.5}>
          <section id="projects">
            <Projects />
          </section>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 0.0, end: 5 }}>
          <Footer />
        </ParallaxLayer>
      </Parallax>
  </div>
);

export default App;
