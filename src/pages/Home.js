import React from 'react';
import './Home.css';

function Home() {
  return (
    <main className="home">
      <section className="home-hero">
        <h1>Super Smash Bros. 64</h1>
        <p className="home-tagline">The original battle royale — 12 fighters, one legendary stage.</p>
      </section>

      <section className="home-about-game">
        <h2>About the Game</h2>
        <p>
          Released in 1999 for the Nintendo 64, <strong>Super Smash Bros.</strong> introduced
          a fresh take on the fighting genre. Instead of depleting an opponent's health bar,
          players must launch their rivals off the stage using damage percentages and powerful
          knockback attacks. The higher the percentage, the farther you fly.
        </p>
        <p>
          The original roster features 12 iconic Nintendo characters — from Mario and Pikachu
          to Samus and Jigglypuff — each with a distinct playstyle, weight class, and move set
          that continues to be studied and celebrated by competitive players today.
        </p>
      </section>

      <section className="home-about-site">
        <h2>About This Site</h2>
        <p>
          This site is a character reference guide for <em>Super Smash Bros. 64</em>. Use the
          <strong> Characters</strong> page to explore every fighter in the original roster —
          browse stats, learn about move sets, and dive into the lore behind each Nintendo icon.
        </p>
      </section>
    </main>
  );
}

export default Home;
