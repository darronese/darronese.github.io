import React from 'react';

const HomePage = () => (
  <div>
    <h1 className="landHeading">Darron Li</h1>
    <p className="landDescrip">Welcome to my webpage!</p>
    <div className="centerContainer">
      <a href="mailto:darron198@hotmail.com" target="_blank" className="contactsLink" title="Goes to email!" rel="noopener noreferrer">
        <i className="fa-solid fa-envelope"></i> Email
      </a>
      <br />
      <a href="https://github.com/darronese" target="_blank" className="contactsLink" title="Goes to github!" rel="noopener noreferrer">
        <i className="fa-brands fa-github"></i> Github
      </a>
      <br />
      <a href="https://www.linkedin.com/in/darronese/" target="_blank" className="contactsLink" title="Goes to linkedin!" rel="noopener noreferrer">
        <i className="fa-brands fa-linkedin-in"></i> LinkedIn
      </a>
    </div>
  </div>
);

export default HomePage;
