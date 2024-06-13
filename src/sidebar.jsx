//Imports
import React from 'react';
import { FaUser, FaEnvelope, FaFileAlt, FaProjectDiagram, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
        <Link to="/" title="Goes to home page">
          <SideBarIcon icon={<FaHome size="28" />} text="Home" />
        </Link>
      </li>
      <li>
        <Link to="/about">
          <SideBarIcon icon={<FaUser size="28" />} text="About" />
        </Link>
      </li>
      <li>
        <Link to="/resume">
          <SideBarIcon icon={<FaFileAlt size="28" />} text="Resume" />
        </Link>
      </li>
      <li>
        <Link to="/projects">
          <SideBarIcon icon={<FaProjectDiagram size="28" />} text="Projects" />
        </Link>
      </li>
    </ul>
  </div>
);

const Footer = () => (
  <div className="sidebarFormat">
    <SideBar />
  </div>
);

//Exports
export default Footer;