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
          This site is a community reference guide for the original <strong>Super Smash
          Bros. 64</strong>. Whether you're a newcomer picking your first main or a veteran
          brushing up on move data, the goal is to put everything you need in one clean,
          accessible place.
        </p>
        <p>
          Smash 64 has maintained an active competitive scene for over two decades. This
          guide honors that legacy by covering all 12 fighters, all 9 stages, and the full
          item roster — and giving the community a place to discuss them.
        </p>
      </section>

      <section className="about-section">
        <h2>What's Inside</h2>
        <ul className="about-tech-list">
          <li><span className="tech-label">Characters</span> All 12 fighters with tier rankings, playstyle breakdowns, move sets, and a photo gallery</li>
          <li><span className="tech-label">Stages</span> All 9 stages with franchise origins and descriptions</li>
          <li><span className="tech-label">Items</span> The full item roster with descriptions and effects</li>
          <li><span className="tech-label">Community</span> User accounts, per-page comment sections, kudos, and public profiles</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>How It Was Built</h2>
        <p>
          Built with <strong>React</strong> and <strong>React Router</strong> for client-side
          navigation, with <strong>Supabase</strong> powering user authentication, comment
          storage, and the kudos system.
        </p>
        <ul className="about-tech-list">
          <li><span className="tech-label">Framework</span> React 19</li>
          <li><span className="tech-label">Routing</span> React Router v7</li>
          <li><span className="tech-label">Backend</span> Supabase (auth + database)</li>
          <li><span className="tech-label">Styling</span> Plain CSS</li>
          <li><span className="tech-label">Tooling</span> Create React App</li>
          <li><span className="tech-label">Testing</span> Jest + React Testing Library</li>
        </ul>
        <p>
          No external UI libraries were used — every component is hand-crafted to keep the
          project lightweight and consistent with the site's visual style.
        </p>
      </section>

      <section className="about-section">
        <h2>Content & Data</h2>
        <p>
          Character stats, tier placements, and move data are based on long-standing community
          consensus from the Smash 64 competitive scene. Tier lists are inherently opinionated
          and reflect the current metagame understanding — they may evolve over time.
        </p>
        <p>
          Stage and item descriptions are written for this site. All game assets belong to
          Nintendo.
        </p>
      </section>
    </main>
  );
}

export default About;
