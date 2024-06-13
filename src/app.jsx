// Imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './sidebar';
import HomePage from './homepage';
import About from './about';
import Resume from './resume';
import Projects from './projects';
import './style.css';

//Route things so i can use links
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
