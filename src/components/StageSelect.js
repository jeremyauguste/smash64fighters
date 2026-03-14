import React, { useState, useEffect } from 'react';
import './StageSelect.css';
import BackButton from './BackButton';
import CommentSection from './CommentSection';

const stages = [
  {
    name: 'Peach\'s Castle',
    franchise: 'Super Mario',
    icon: '/stageIcons/peach.webp',
    image: '/bigStage/bigpeach.webp',
    source: '/stageDescription/mariosource.webp',
    sourceClass: 'ss-source-mario',
    bg: '#c2185b',
    description:
      'A rooftop battle above Peach\'s Castle, complete with bumpers floating in the center of the stage. The bumpers bounce fighters unpredictably, making it a chaotic and fun stage for newcomers and veterans alike.',
  },
  {
    name: 'Congo Jungle',
    franchise: 'Donkey Kong',
    icon: '/stageIcons/jungle.webp',
    image: '/bigStage/bigjungle.webp',
    source: '/stageDescription/donkeykongsource.webp',
    sourceClass: 'ss-source-dk',
    bg: '#1b5e20',
    description:
      'Set in the treetops of DK\'s jungle, this stage features a barrel cannon in the center that launches any fighter who falls into it. The barrel\'s trajectory rotates, so timing your exit is key.',
  },
  {
    name: 'Hyrule Castle',
    franchise: 'The Legend of Zelda',
    icon: '/stageIcons/hyrule.webp',
    image: '/bigStage/bighyrule.webp',
    source: '/stageDescription/zeldasource.webp',
    sourceClass: 'ss-source-zelda',
    bg: '#558b2f',
    description:
      'Fought across the ramparts of Hyrule Castle, this stage features a tornado that sweeps across the ground periodically, launching fighters skyward. One of the largest stages in the game, it favors zoners and long-range fighters.',
  },
  {
    name: 'Planet Zebes',
    franchise: 'Metroid',
    icon: '/stageIcons/zebes.webp',
    image: '/bigStage/bigzebes.webp',
    source: '/stageDescription/metroidsource.webp',
    sourceClass: 'ss-source-metroid',
    bg: '#4a148c',
    description:
      'A cavernous stage from the depths of Zebes. Lava rises from the bottom at regular intervals, threatening fighters who get caught below the main platform. A high-risk stage that punishes poor positioning.',
  },
  {
    name: 'Mushroom Kingdom',
    franchise: 'Super Mario',
    icon: '/stageIcons/mushroom.webp',
    image: '/bigStage/bigmushroom.webp',
    source: '/stageDescription/mariosource.webp',
    sourceClass: 'ss-source-mario',
    bg: '#e65100',
    description:
      'A hidden stage modeled after World 1-1 from the original Super Mario Bros. Pipes, POW blocks, and Koopa shells populate the stage. Unlocked by completing a specific 1P Game challenge, it is a fan-favorite nostalgia pick.',
  },
  {
    name: 'Yoshi\'s Island',
    franchise: 'Yoshi',
    icon: '/stageIcons/yoshi.webp',
    image: '/bigStage/bigyoshi.webp',
    source: '/stageDescription/yoshisource.webp',
    sourceClass: 'ss-source-yoshi',
    bg: '#0277bd',
    description:
      'A bright and colorful stage set on floating platforms above Yoshi\'s Island. Moving cloud platforms and a cameo from the Super Star Easter egg make it a memorable stage. The layout favors aerial combat.',
  },
  {
    name: 'Dream Land',
    franchise: 'Kirby',
    icon: '/stageIcons/kirby.webp',
    image: '/bigStage/bigkirby.webp',
    source: '/stageDescription/kirbysource.webp',
    sourceClass: 'ss-source-kirby',
    bg: '#ad1457',
    description:
      'A classic stage set under the stars of Dream Land. Gusts of wind blow from Whispy Woods and from the right side of the stage, pushing fighters toward the blast zones. Simple in layout but deceptively dynamic.',
  },
  {
    name: 'Sector Z',
    franchise: 'Star Fox',
    icon: '/stageIcons/sector.webp',
    image: '/bigStage/bigsector.webp',
    source: '/stageDescription/starfoxsource.webp',
    sourceClass: 'ss-source-starfox',
    bg: '#0d47a1',
    description:
      'Fought on the deck of the Great Fox as it soars through space. An Arwing periodically flies across the stage and fires at fighters. The massive, flat layout makes it one of the largest and most open stages in the game.',
  },
  {
    name: 'Saffron City',
    franchise: 'Pokémon',
    icon: '/stageIcons/saffron.webp',
    image: '/bigStage/bigsaffron.webp',
    source: '/stageDescription/pokemonsource.webp',
    sourceClass: 'ss-source-pokemon',
    bg: '#b71c1c',
    description:
      'A rooftop stage set in Saffron City, Kanto. Pokémon periodically emerge from a door on the left building — some harmless, some dangerous. Chansey heals, Porygon does nothing, but Venusaur and Electrode can ruin your day.',
  },
];

function StageSelect() {
  // null = info square selected (default)
  const [selected, setSelected] = useState(null);
  const [displayedIndex, setDisplayedIndex] = useState(null);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [sourceAnimatingOut, setSourceAnimatingOut] = useState(false);

  const current = displayedIndex !== null ? stages[displayedIndex] : null;

  function handleSelect(index) {
    if (index === selected) return;
    const currentSource = displayedIndex !== null ? stages[displayedIndex].source : null;
    const newSource = index !== null ? stages[index].source : null;
    const sourceChanges = newSource !== currentSource;

    setSelected(index);
    setAnimatingOut(true);
    if (sourceChanges) setSourceAnimatingOut(true);
    setTimeout(() => {
      setDisplayedIndex(index);
      setAnimatingOut(false);
      setSourceAnimatingOut(false);
    }, 200);
  }

  useEffect(() => {
    if (current) {
      document.body.style.setProperty('--char-bg', current.bg);
    } else {
      document.body.style.removeProperty('--char-bg');
    }
    return () => {
      document.body.style.removeProperty('--char-bg');
    };
  }, [current]);

  return (
    <div className="ss-wrapper">
      <div className="ss-top-bar">
        <h1 className="ss-title">Stages</h1>
        <BackButton />
      </div>

      <div className="ss-switcher">
        {stages.map((stage, index) => (
          <button
            key={stage.name}
            className={`ss-square ${selected === index ? 'ss-square--active' : ''}`}
            onClick={() => handleSelect(index)}
            title={stage.name}
          >
            {stage.icon && (
              <img src={stage.icon} alt={stage.name} className="ss-square-img" />
            )}
            <span className="ss-square-name">{stage.name}</span>
          </button>
        ))}

        {/* Info square — last slot, selected by default */}
        <button
          className={`ss-square ss-square--info ${selected === null ? 'ss-square--active' : ''}`}
          onClick={() => handleSelect(null)}
          title="About"
        >
          <img src="/stageIcons/random.webp" alt="Random" className="ss-square-img" />
        </button>
      </div>

      <div className="ss-content">
        {current && (
          <div className="ss-image-area">
            <div className="ss-stage-bg" />
            <img src={current.image} alt={current.name} className={`ss-image${animatingOut ? ' ss-fade--out' : ' ss-fade--in'}`} />
          </div>
        )}
        <div className="ss-info">
          {current ? (
            <>
              <img src="/stageDescription/descriptionbg.webp" alt="" className="ss-info-bg" />
              <div
                className={`ss-info-source ${current.sourceClass}${sourceAnimatingOut ? ' ss-fade--out' : ' ss-fade--in'}`}
                style={{ WebkitMaskImage: `url(${current.source})`, maskImage: `url(${current.source})` }}
              />
              <div className={`ss-info-overlay${animatingOut ? ' ss-fade--out' : ' ss-fade--in'}`}>
                <div className="ss-info-text">
                  <h2 className="ss-stage-name">{current.name}</h2>
                  <p className="ss-franchise">{current.franchise}</p>
                  <p className="ss-description">{current.description}</p>
                </div>
              </div>
            </>
          ) : (
            <div className={`ss-info-panel-text${animatingOut ? ' ss-fade--out' : ' ss-fade--in'}`}>
              <h2 className="ss-info-panel-title">Stage Select</h2>
              <p className="ss-info-panel-body">
                Super Smash Bros. 64 features 9 unique stages drawn from across Nintendo's most iconic franchises.
                Each stage has its own hazards, layout, and personality.
                Select a stage above to learn more about it.
              </p>
            </div>
          )}
        </div>
      </div>

      {current && (
        <CommentSection pageType="stage" pageId={current.name} />
      )}
    </div>
  );
}

export default StageSelect;
