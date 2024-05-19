import React from 'react';

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
      <h2>Sidebar</h2>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="contacts.html">Contacts</a></li>
        <li><a href="resume.html">Resume</a></li>
        <li><a href="projects.html">Projects</a></li>
      </ul>
    </div>
  );
};

export default SideBar;
