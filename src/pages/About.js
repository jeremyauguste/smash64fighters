import React from 'react';
import './About.css';
import BackButton from '../components/BackButton';

function About() {
  return (
    <main className="about">
      <div className="about-top-bar">
        <h1>About This Site</h1>
        <BackButton />
      </div>

      <section className="about-section">
        <h2>Purpose</h2>
        <p>
          This site exists as a dedicated reference guide for the original <strong>Super Smash
          Bros. 64</strong> roster. Whether you're a newcomer picking your first main or a
          veteran brushing up on frame data, the goal is to put every fighter's key information
          in one clean, accessible place.
        </p>
        <p>
          Smash 64 has maintained an active competitive community for over two decades. This
          guide aims to honor that legacy by giving each of the 12 original fighters the
          spotlight they deserve.
        </p>
      </section>

      <section className="about-section">
        <h2>How It Was Built</h2>
        <p>
          This site was built with <strong>React</strong>, bootstrapped using{' '}
          <strong>Create React App</strong>, and uses <strong>React Router</strong> for
          client-side navigation between pages.
        </p>
        <ul className="about-tech-list">
          <li><span className="tech-label">Framework</span> React 19</li>
          <li><span className="tech-label">Routing</span> React Router v7</li>
          <li><span className="tech-label">Styling</span> Plain CSS</li>
          <li><span className="tech-label">Tooling</span> Create React App</li>
        </ul>
        <p>
          No external UI libraries or component kits were used — every element is hand-crafted
          to keep the project lightweight and easy to extend.
        </p>
      </section>

      <section className="about-section">
        <h2>Content & Data</h2>
        <p>
          Character information, tier placements, and playstyle classifications are based on
          long-standing community consensus from the Smash 64 competitive scene. Tier lists
          are inherently opinionated and subject to change as the metagame evolves.
        </p>
      </section>
    </main>
  );
}

export default About;
