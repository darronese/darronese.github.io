//imports
import React from "react";

//resume page that contains my resume
//update it so it links to a google drive link where they cna download insteads of a direct link
const Resume = () => (
  <div className="background">
    <h1 className="resumeHeading">Resume</h1>
    <a href="/resume.png" className="resumePicture" alt="My resume" />{" "}
    {/* Direct path */}
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
