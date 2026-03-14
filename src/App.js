import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Stages from './pages/Stages';
import About from './pages/About';
import Items from './pages/Items';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isChars = location.pathname === '/characters';
  const isStages = location.pathname === '/stages';
  const isAbout = location.pathname === '/about';
  const isItems = location.pathname === '/items';
  const showMenuBg = isHome || isAbout;
  const showCharsBg = isChars || isStages;
  const [bgReady, setBgReady] = useState(false);

  useEffect(() => {
    setBgReady(true);
  }, []);

  return (
    <>
      <div className={`home-bg${bgReady && showMenuBg ? ' bg-active' : ''}`} />
      <div className={`chars-bg${bgReady && showCharsBg ? ' bg-active' : ''}`} />
      <div className={`items-bg${bgReady && isItems ? ' bg-active' : ''}`}>
        <div className="items-bg-silhouette" />
      </div>
      <div key={location.pathname} className="page-transition">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/stages" element={<Stages />} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </div>
    </>
  );
}

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.classList.toggle('theme-light', theme === 'light');
  }, [theme]);

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
