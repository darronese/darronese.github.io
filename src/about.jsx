//imports
import React from 'react';
import './style.css';

//main about content
const About = () => (
  <div className="background">
    <h1 className="aboutHeading">About</h1>
      <p className="personalDescription">
      My name is Darron Li and I am an aspiring software engineer. I am currently
      studying at Washington State University, pursuing a bachelor's in computer science.
      </p>
    <h2 className="skillsHeading">Skills</h2>
      <ul className="skillsList">
        <li>Proficient in C/C++, Python, Javascript, Html, CSS</li>
        <li>Experience with modern front-end libraries like React and TailwindCSS</li>
        <li>Knowledge of software devlopment tools such as Github, Webpack and source control (Git)</li>
        <li>Proficient in understanding of algorithms, data structures, and object-oriented programming</li>
      </ul>
  </div>
);

//export about so we can use it in our app 
export default About;
