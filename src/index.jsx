//Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import Footer from './sidebar.jsx';

//Creates a side bar and renders it within react
const App = () => (
  <div>
    <Footer />
  </div>
);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
