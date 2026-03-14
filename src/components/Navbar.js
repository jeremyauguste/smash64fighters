import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      <span className="navbar-brand">SSB64</span>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/characters">Characters</NavLink></li>
        <li><NavLink to="/stages">Stages</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
      </ul>
      <button className="theme-toggle" onClick={onToggleTheme}>
        {theme === 'dark' ? 'LIGHT' : 'DARK'}
      </button>
    </nav>
  );
}

export default Navbar;
