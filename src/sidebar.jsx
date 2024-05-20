import React from 'react';
import { FaUser, FaEnvelope, FaFileAlt, FaProjectDiagram, FaHome } from 'react-icons/fa';

const SideBarIcon = ({ icon, text }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);

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
        <a href="contacts.html" title="Goes to contacts page">
          <SideBarIcon icon={<FaEnvelope size="28" />} text="Contacts" />
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

const Footer = () => (
  <div className="sidebarFormat">
    <SideBar />
  </div>
);

export default Footer;
