//Imports
import React from 'react';
import { FaUser, FaEnvelope, FaBolt, FaFileAlt, FaProjectDiagram, FaHome } from 'react-icons/fa';

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
//onclick allows us to scroll to a certain section based on the parallax page
//links wasn't working so i did onclick
const SideBar = ({scrollTo}) => (
  <div className="sidebarFormat">
    <ul className="flex">
      <li onClick={() => scrollTo(0)}>
          <SideBarIcon icon={<FaHome size="28" />} text="Home" />
      </li>
      <li onClick={() => scrollTo(1)}>
          <SideBarIcon icon={<FaUser size="28" />} text="About" />
      </li>
      <li onClick={() => scrollTo(2)}>
          <SideBarIcon icon={<FaBolt size="28" />} text="Skills" />
      </li>
      <li onClick={() => scrollTo(3)}>
          <SideBarIcon icon={<FaFileAlt size="28" />} text="Resume" />
      </li>
      <li onClick={() => scrollTo(4)}>
          <SideBarIcon icon={<FaProjectDiagram size="28" />} text="Projects" />
      </li>
    </ul>
  </div>
);

//allows us to scroll dynamically
const Footer = ({scrollTo}) => (
  <div className="sidebarFormat">
    <SideBar scrollTo={scrollTo} />
  </div>
);

//Exports
export default Footer;
