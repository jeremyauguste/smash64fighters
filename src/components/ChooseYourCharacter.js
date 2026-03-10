import React, { useState } from 'react';
import './ChooseYourCharacter.css';

const fighters = [
  {
    name: 'Luigi',
    universe: 'Super Mario',
    type: 'All-Around',
    tier: 'E',
    image: null,
    description:
      'Luigi is Mario\'s taller, floatier brother. He struggles with poor traction and a weaker recovery, but his forward smash delivers surprising knockback. Often considered a meme pick in competitive play, he still has a dedicated fanbase.',
  },
  {
    name: 'Mario',
    universe: 'Super Mario',
    type: 'All-Around',
    tier: 'B',
    image: null,
    description:
      'Mario is the quintessential balanced fighter. He has solid aerials, a reliable recovery, and a versatile move set that makes him a great starting point for new players. His down-air meteor smash and cape reflector give him useful tools in any matchup.',
  },
  {
    name: 'Donkey Kong',
    universe: 'Donkey Kong',
    type: 'Heavyweight',
    tier: 'C',
    image: null,
    description:
      'Donkey Kong is the heaviest fighter in the game. He hits like a freight train and has the best grab game in Smash 64 — his cargo throw chains are legendary. His size and slow speed make him a big target, but landing a hit always threatens a KO.',
  },
  {
    name: 'Link',
    universe: 'The Legend of Zelda',
    type: 'All-Around',
    tier: 'D',
    image: null,
    description:
      'Link is a heavy all-rounder armed with a sword, boomerang, bombs, and bow. His projectiles let him control space, but his slow movement and poor recovery hold him back in competitive play. A fun character with a rich toolkit.',
  },
  {
    name: 'Samus',
    universe: 'Metroid',
    type: 'Zoner',
    tier: 'D',
    image: null,
    description:
      'Samus is a long-range zoner who excels at keeping opponents out with her charge shot and missiles. Her tether recovery is risky, and getting inside her space can be difficult to avoid. She rewards patient, defensive play.',
  },
  {
    name: 'Falcon',
    universe: 'F-Zero',
    type: 'Rushdown',
    tier: 'A',
    image: null,
    description:
      'Captain Falcon is one of the fastest and most exciting fighters in the game. His Falcon Punch and Knee of Justice are iconic finishing moves. His speed, power, and combo potential make him a top-tier threat in skilled hands.',
  },
  {
    name: 'Ness',
    universe: 'EarthBound',
    type: 'Zoner',
    tier: 'D',
    image: null,
    description:
      'Ness is a PK-powered fighter with strong smash attacks and a unique yo-yo move set. His recovery — PK Thunder — is one of the most unique and risky in the game. A quirky character with a high skill ceiling.',
  },
  {
    name: 'Yoshi',
    universe: 'Super Mario',
    type: 'All-Around',
    tier: 'C',
    image: null,
    description:
      'Yoshi is a mid-weight fighter with a powerful egg throw projectile and a double jump that can\'t be interrupted. His armor on the double jump is a unique defensive tool. Egg Roll and egg lay add to his unusual playstyle.',
  },
  {
    name: 'Kirby',
    universe: 'Kirby',
    type: 'All-Around',
    tier: 'A',
    image: null,
    description:
      'Kirby is considered the best character in Smash 64 by many in the community. His multiple jumps give him exceptional survivability, and his down-tilt and up-tilt combos are devastating at low percentages. A top-tier pick for competitive play.',
  },
  {
    name: 'Fox',
    universe: 'Star Fox',
    type: 'Rushdown',
    tier: 'S',
    image: null,
    description:
      'Fox is a lightning-fast rushdown fighter with one of the best move sets in the game. His shine (reflector) sets up powerful combos, and his blaster lets him apply pressure at range. Widely considered one of the top two characters in the game.',
  },
  {
    name: 'Pikachu',
    universe: 'Pokémon',
    type: 'Rushdown',
    tier: 'S',
    image: null,
    description:
      'Pikachu is arguably the best character in Smash 64. Tiny hitbox, incredible speed, and a Thunder move that covers vertical recovery make it nearly impossible to KO. Its combo game off down-throw is suffocating at any percentage.',
  },
  {
    name: 'Jigglypuff',
    universe: 'Pokémon',
    type: 'Zoner',
    tier: 'B',
    image: null,
    description:
      'Jigglypuff is a floaty, aerial-focused fighter with one of the most powerful rest moves in the game. Its five jumps make it incredibly hard to edgeguard, and its sing can catch careless opponents off guard. A deceptively strong character in the right hands.',
  },
];

const tierColor = {
  S: '#ff4444',
  A: '#ff9900',
  B: '#ffe600',
  C: '#66cc33',
  D: '#3399ff',
  E: '#9966cc',
};

function ChooseYourCharacter() {
  const [selected, setSelected] = useState(null);

  const current = selected !== null ? fighters[selected] : null;

  return (
    <div className="cyc-wrapper">
      <h1 className="cyc-title">Characters</h1>

      {/* Static switcher — always visible */}
      <div className="cyc-switcher">
        {fighters.map((fighter, index) => (
          <button
            key={fighter.name}
            className={`cyc-square ${selected === index ? 'cyc-square--active' : ''}`}
            onClick={() => setSelected(index)}
            title={fighter.name}
          >
            <span className="cyc-square-name">{fighter.name}</span>
            <span
              className="cyc-square-tier"
              style={{ backgroundColor: tierColor[fighter.tier] }}
            >
              {fighter.tier}
            </span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="cyc-content">
        {current ? (
          <>
            <div className="cyc-image-area">
              {current.image ? (
                <img src={current.image} alt={current.name} className="cyc-image" />
              ) : (
                <div className="cyc-image-placeholder">
                  <span>{current.name}</span>
                </div>
              )}
            </div>
            <div className="cyc-info">
              <div className="cyc-info-header">
                <h2>{current.name}</h2>
                <span
                  className="cyc-tier-badge"
                  style={{ backgroundColor: tierColor[current.tier] }}
                >
                  Tier {current.tier}
                </span>
              </div>
              <p className="cyc-universe">{current.universe} &mdash; {current.type}</p>
              <p className="cyc-description">{current.description}</p>
            </div>
          </>
        ) : (
          <p className="cyc-prompt">Select a fighter above to learn more.</p>
        )}
      </div>
    </div>
  );
}

export default ChooseYourCharacter;
