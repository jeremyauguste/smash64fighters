import React, { useState } from 'react';
import './Items.css';
import BackButton from '../components/BackButton';
import ItemRow from '../components/ItemRow';

const items = [
  {
    name: 'Beam Sword',
    image: '/items/beamsword.webp',
    description: 'A lightsaber-like sword that extends the reach of the holder\'s attacks. Swinging it deals consistent sword damage. One of the most common weapons in the game.',
  },
  {
    name: 'Home-Run Bat',
    image: '/items/homerunbat.webp',
    description: 'A powerful baseball bat. Regular swings deal moderate damage, but a smash attack unleashes enormous knockback — one of the strongest launches in the game.',
  },
  {
    name: 'Hammer',
    image: '/items/hammer.webp',
    description: 'Forces the holder to repeatedly swing it overhead while walking forward. Deals heavy damage with each hit. The hammer head can randomly fly off, leaving a useless handle.',
  },
  {
    name: 'Fan',
    image: '/items/fan.webp',
    description: 'A rapid-hitting weapon that deals small amounts of damage per swing but builds up quickly. One of the weakest weapons in the game, though its speed makes it useful for racking up percent.',
  },
  {
    name: 'Motion-Sensor Bomb',
    image: '/items/motionsensorbomb.webp',
    description: 'A proximity mine that sticks to any surface it lands on. Detonates when a fighter walks near it, dealing heavy damage and knockback in a radius.',
  },
  {
    name: 'Bob-omb',
    image: '/items/bobomb.webp',
    description: 'Explodes on contact when thrown at an opponent or when it lands after being tossed. The blast deals heavy damage and knockback to anyone caught in the explosion radius.',
  },
  {
    name: 'Bumper',
    image: '/items/bumper.webp',
    description: 'A floating bumper that can be placed on any surface. Any fighter that touches it is launched away. Can be angled to send opponents in specific directions.',
  },
  {
    name: 'Shell',
    images: ['/items/greenshell.webp', '/items/redshell.webp'],
    description: 'A Koopa shell that slides along the ground when thrown, hitting any fighter in its path. Bounces off walls and can travel the full length of a stage.',
  },
  {
    name: 'Poké Ball',
    image: '/items/pokeball.webp',
    description: 'Releases one of a specific pool of Pokémon including Charizard, Snorlax, Mewtwo, Mew, Electrode, Chansey, and others. Some attack opponents, some are harmless, and Goldeen does nothing at all.',
  },
  {
    name: 'Ray Gun',
    image: '/items/raygun.webp',
    description: 'A futuristic laser pistol that fires rapid energy blasts. Each shot deals moderate damage. Has limited ammo and will disappear after the clip is exhausted.',
  },
  {
    name: 'Fire Flower',
    image: '/items/fireflower.webp',
    description: 'Shoots a continuous stream of fire when the attack button is held. Deals rapid multi-hit damage to any opponent caught in the flames. Has limited fuel.',
  },
  {
    name: 'Star Rod',
    image: '/items/starwand.webp',
    description: 'Fires star-shaped projectiles with each swing and also deals sword-like damage up close. One of the more versatile weapons, effective at both range and close quarters.',
  },
  {
    name: 'Maxim Tomato',
    image: '/items/maximtomato.webp',
    description: 'A large red tomato from the Kirby series. Recovers 50% of the holder\'s damage when picked up, making it one of the most valuable recovery items on the field.',
  },
  {
    name: 'Heart Container',
    image: '/items/heartcontainer.webp',
    description: 'A heart-shaped container from The Legend of Zelda. Fully restores the holder\'s damage percentage to 0%, making it the most powerful recovery item in the game.',
  },
  {
    name: 'Star',
    image: '/items/star.webp',
    description: 'The Super Star from Super Mario Bros. Grants temporary invincibility, making the holder immune to all damage and knockback. Contact with invincible fighters launches opponents.',
  },
];

function Items() {
  const [openIndex, setOpenIndex] = useState(null);
  const [displayedIndex, setDisplayedIndex] = useState(null);
  const [leftAnimatingOut, setLeftAnimatingOut] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  function handleToggle(index) {
    const newIndex = openIndex === index ? null : index;
    setHasInteracted(true);
    setOpenIndex(newIndex);
    setLeftAnimatingOut(true);
    setTimeout(() => {
      setDisplayedIndex(newIndex);
      setLeftAnimatingOut(false);
    }, 250);
  }

  const activeItem = displayedIndex !== null ? items[displayedIndex] : null;

  return (
    <div className="items-wrapper">
      <div className="items-top-bar">
        <h1 className="items-title">Items</h1>
        <BackButton />
      </div>

      <div className="items-layout">
        <div className="items-empty">
          <div className={`${hasInteracted ? 'items-left-content' : ''}${leftAnimatingOut ? ' items-left-content--out' : ''}`}>
            {activeItem ? (
              activeItem.images ? (
                <div className="items-active-images">
                  {activeItem.images.map((src, i) => (
                    <img key={i} src={src} alt={activeItem.name} className="items-active-image" />
                  ))}
                </div>
              ) : (
                <img src={activeItem.image} alt={activeItem.name} className="items-active-image" />
              )
            ) : (
              <div className="items-info">
                <h2 className="items-info-title">Items</h2>
                <p className="items-info-body">
                  Super Smash Bros. 64 features 15 items that can appear during matches. Each item has unique properties — some are weapons, some are thrown projectiles, and others provide recovery or special effects.
                </p>
                <p className="items-info-body">
                  Select an item from the list to learn what it does.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="items-panel">
          <div className="items-panel-header">
            <span className="items-panel-label"><span className="items-panel-arrow">◄</span> Items</span>
          </div>
          <div className="items-list">
            {items.map((item, index) => (
              <ItemRow
                key={item.name}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items;
