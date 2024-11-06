//imports
import React from "react";

//resume page that contains my resume
const Resume = () => (
  <div className="background">
    <h1 className="resumeHeading">Resume</h1>
    <img src="/resume.png" className="resumePicture" alt="My resume" />{" "}
    <div className="centerContainer">
      <a
        href="https://drive.google.com/drive/u/0/folders/1c2qjx02dvd33weYW3Kl--AZ2PDeWdgob"
        className="resumeLink"
        download
      >
        Download
      </a>
    </div>
  </div>
);

//export it as resume so we can include it in our app
export default Resume;
