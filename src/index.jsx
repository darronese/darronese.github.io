//Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import Footer from './sidebar.jsx';
//animation import
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";


//Creates a side bar and renders it within react
const App = () => (
  <div>
    <Footer/>
  </div>
);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
