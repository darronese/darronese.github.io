//Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './app';


//Creates a side bar and renders it within react
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
