// About.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import './style.css'; // Import your CSS

const About = () => (
  <div className="background">
    <Helmet>
      <title>About Darron</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Oswald:wght@200..700&display=swap" rel="stylesheet" />
    </Helmet>
    <h1 className="aboutHeading">About</h1>
    <p className="aboutDescription">
      My name is Darron Li and I am an aspiring software engineer. I am currently
      studying at Washington State University, pursuing a bachelor's in computer science
      and a bachelor's in finance.
    </p>
  </div>
);

export default About;
