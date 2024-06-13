//imports
import React from 'react';

const Resume = () => (
  <div className="background">
    <h1 className="resumeHeading">Resume</h1>
    <img src="/Resume.png" className="resumePicture" alt="My resume" /> {/* Direct path */}
  <div className="centerContainer">
    <a href="/Resume.pdf" className="resumeLink" download>
      Download
    </a>
  </div>
  </div>
);

export default Resume;
