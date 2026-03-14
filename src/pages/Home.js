import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const pages = [
  { label: 'CHARACTERS', path: '/characters' },
  { label: 'STAGES',     path: '/stages' },
  { label: 'ITEMS',      path: '/items' },
  { label: 'ABOUT',      path: '/about' },
];

function ModeButton({ label, path }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="mode-btn"
      onClick={() => navigate(path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`mode-circle${hovered ? ' mode-circle--hover' : ''}`} />
      <span className="mode-label">{label}</span>
    </div>
  );
}

function Home() {
  return (
    <div className="home-select">
      <div className="home-header-div">
        <h2 className="home-header">Super Smash Bros.</h2>
      </div>
      <div className="home-select-group">
        <div className="home-select-grid">
          <h1 className="home-select-title">PAGE<br />SELECT</h1>
          <div className="home-select-buttons">
            {pages.map(p => (
              <ModeButton key={p.path} label={p.label} path={p.path} />
            ))}
          </div>
        </div>
        <div className="home-info">
          <p>A community reference guide for the original <strong>Super Smash Bros. 64</strong>. Browse all 12 fighters with tier rankings, move sets, and photo galleries. Explore all 9 stages and the full item roster. Create an account to leave comments, give kudos, and build your profile.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
