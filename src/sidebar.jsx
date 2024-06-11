//Imports
import React from 'react';
//Importing icons from font awesome
import { FaUser, FaEnvelope, FaFileAlt, FaProjectDiagram, FaHome } from 'react-icons/fa';


//Sidebar icon
const SideBarIcon = ({ icon, text }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);

//Main sidebar function
//Main idea was from fireship's discord-like sidebar tutorial
const SideBar = () => (
  <div className="sidebarFormat">
    <ul className="flex">
      <li>
        <a href="index.html" title="Goes to home page">
          <SideBarIcon icon={<FaHome size="28" />} text="Home" />
        </a>
      </li>
      <li>
        <a href="about.html" title="Goes to about page">
          <SideBarIcon icon={<FaUser size="28" />} text="About" />
        </a>
      </li>
      <li>
        <a href="resume.html">
          <SideBarIcon icon={<FaFileAlt size="28" />} text="Resume" />
        </a>
      </li>
      <li>
        <a href="projects.html">
          <SideBarIcon icon={<FaProjectDiagram size="28" />} text="Projects" />
        </a>
      </li>
    </ul>
  </div>
);

//Poots it in the footer
const Footer = () => (
  <div className="sidebarFormat">
    <SideBar />
  </div>
);

//Exports
export default Footer;
