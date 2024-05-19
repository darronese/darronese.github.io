import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import SideBar from './sidebar.jsx';

const App = () => {
  return (
    <div>
      <SideBar />
      <header className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg"></header>
    </div>
  );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
