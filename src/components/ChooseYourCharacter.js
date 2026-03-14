import React, { useState, useEffect } from 'react';
import './ChooseYourCharacter.css';
import ImageGallery from './ImageGallery';
import AttackList from './AttackList';
import BackButton from './BackButton';
import CommentSection from './CommentSection';

const fighters = [
  {
    name: 'Luigi',
    universe: 'Super Mario',
    type: 'All-Around',
    tier: 'E',
    image: '/charIcons/luigi.webp',
    images: [
      { src: '/charGallery/Luigi_-_Super_Smash_Bros.webp', alt: 'Luigi' },
      { src: '/charGallery/SSB64_Luigi.webp', alt: 'Luigi in-game' },
      { src: '/charGallery/200px-Taunts-SSB-Luigi.gif', alt: 'Luigi taunt' },
    ],
    attacks: [
      { category: 'Ground', moves: [
        { name: 'Jab', damage: '2+2+4' },
        { name: 'Forward Tilt', damage: 9 },
        { name: 'Up Tilt', damage: 8 },
        { name: 'Down Tilt', damage: 6 },
        { name: 'Dash Attack', damage: 7 },
        { name: 'Forward Smash', damage: 18 },
        { name: 'Up Smash', damage: 13 },
        { name: 'Down Smash', damage: 10 },
      ]},
      { category: 'Aerial', moves: [
        { name: 'Neutral Air', damage: 10 },
        { name: 'Forward Air', damage: 7 },
        { name: 'Back Air', damage: 13 },
        { name: 'Up Air', damage: 10 },
        { name: 'Down Air', damage: 14 },
      ]},
      { category: 'Special', moves: [
        { name: 'Neutral Special — Fireball', damage: 6 },
        { name: 'Up Special — Super Jump Punch', damage: 1 },
        { name: 'Down Special — Luigi Cyclone', damage: '3×5' },
      ]},
      { category: 'Throw', moves: [
        { name: 'Forward Throw', damage: 7 },
        { name: 'Back Throw', damage: 10 },
        { name: 'Up Throw', damage: 7 },
        { name: 'Down Throw', damage: 6 },
      ]},
    ],
    accent: '#4caf50',
    accentLight: '#2e7d32',
    bg: '#388e3c',
    description:
      'Luigi is Mario\'s taller, floatier brother. He struggles with poor traction and a weaker recovery, but his forward smash delivers surprising knockback. Often considered a meme pick in competitive play, he still has a dedicated fanbase.',
  },
  {
    name: 'Mario',
    universe: 'Super Mario',
    type: 'All-Around',
    tier: 'B',
    image: '/charIcons/mario.webp',
    images: [
      { src: '/charGallery/Mario_-_Super_Smash_Bros.webp', alt: 'Mario' },
      { src: '/charGallery/SSB64_Mario.gif', alt: 'Mario in-game' },
      { src: '/charGallery/200px-Taunts-SSB-Mario.gif', alt: 'Mario taunt' },
    ],
    attacks: [
      { category: 'Ground', moves: [
        { name: 'Jab', damage: '2+2+5' },
        { name: 'Forward Tilt', damage: 10 },
        { name: 'Up Tilt', damage: 9 },
        { name: 'Down Tilt', damage: 6 },
        { name: 'Dash Attack', damage: 8 },
        { name: 'Forward Smash', damage: 14 },
        { name: 'Up Smash', damage: 14 },
        { name: 'Down Smash', damage: 13 },
      ]},
      { category: 'Aerial', moves: [
        { name: 'Neutral Air', damage: 12 },
        { name: 'Forward Air', damage: 14 },
        { name: 'Back Air', damage: 10 },
        { name: 'Up Air', damage: 11 },
        { name: 'Down Air', damage: 15 },
      ]},
      { category: 'Special', moves: [
        { name: 'Neutral Special — Fireball', damage: 8 },
        { name: 'Up Special — Super Jump Punch', damage: 12 },
        { name: 'Down Special — Mario Tornado', damage: '3×4+5' },
      ]},
      { category: 'Throw', moves: [
        { name: 'Forward Throw', damage: 7 },
        { name: 'Back Throw', damage: 10 },
        { name: 'Up Throw', damage: 9 },
        { name: 'Down Throw', damage: 6 },
      ]},
    ],
    accent: '#f44336',
    accentLight: '#b71c1c',
    bg: '#c62828',
    description:
      'Mario is the quintessential balanced fighter. He has solid aerials, a reliable recovery, and a versatile move set that makes him a great starting point for new players. His down-air meteor smash and Mario Tornado give him useful tools in any matchup.',
  },
  {
    name: 'Donkey Kong',
    universe: 'Donkey Kong',
    type: 'Heavyweight',
    tier: 'C',
    image: '/charIcons/donkeykong.webp',
    images: [
      { src: '/charGallery/Donkeykong_-_Super_Smash_Bros.webp', alt: 'Donkey Kong' },
      { src: '/charGallery/SSB64_DK.webp', alt: 'Donkey Kong in-game' },
      { src: '/charGallery/200px-Taunts-SSB-DonkeyKong.gif', alt: 'Donkey Kong taunt' },
    ],
    attacks: [
      { category: 'Ground', moves: [
        { name: 'Jab', damage: 5 },
        { name: 'Forward Tilt', damage: 14 },
        { name: 'Up Tilt', damage: 10 },
        { name: 'Down Tilt', damage: 8 },
        { name: 'Dash Attack', damage: 12 },
        { name: 'Forward Smash', damage: 27 },
        { name: 'Up Smash', damage: 19 },
        { name: 'Down Smash', damage: 15 },
      ]},
      { category: 'Aerial', moves: [
        { name: 'Neutral Air', damage: 14 },
        { name: 'Forward Air', damage: 18 },
        { name: 'Back Air', damage: 14 },
        { name: 'Up Air', damage: 12 },
        { name: 'Down Air', damage: 16 },
      ]},
      { category: 'Special', moves: [
        { name: 'Neutral Special — Giant Punch', damage: 37 },
        { name: 'Up Special — Spinning Kong', damage: '4×5' },
        { name: 'Down Special — Hand Slap', damage: 10 },
      ]},
      { category: 'Throw', moves: [
        { name: 'Forward Throw', damage: 10 },
        { name: 'Back Throw', damage: 12 },
        { name: 'Up Throw', damage: 10 },
        { name: 'Down Throw', damage: 8 },
      ]},
    ],
    accent: '#ff8f00',
    accentLight: '#e65100',
    bg: '#e65100',
    description:
      'Donkey Kong is the heaviest fighter in the game. He hits like a freight train and has the best grab game in Smash 64 — his cargo throw chains are legendary. His size and slow speed make him a big target, but landing a hit always threatens a KO.',
  },
  {
    name: 'Link',
    universe: 'The Legend of Zelda',
    type: 'All-Around',
    tier: 'D',
    image: '/charIcons/link.webp',
    images: [
      { src: '/charGallery/Link_-_Super_Smash_Bros.webp', alt: 'Link' },
      { src: '/charGallery/Ssb64link.jpg', alt: 'Link in-game' },
      { src: '/charGallery/Alt-link.webp', alt: 'Link alt' },
      { src: '/charGallery/250px-SSB64_Congratulations_Link.png', alt: 'Link congratulations' },
    ],
    attacks: [
      { category: 'Ground', moves: [
        { name: 'Jab', damage: '3+3+8' },
        { name: 'Forward Tilt', damage: 12 },
        { name: 'Up Tilt', damage: 9 },
        { name: 'Down Tilt', damage: 10 },
        { name: 'Dash Attack', damage: 10 },
        { name: 'Forward Smash', damage: 20 },
        { name: 'Up Smash', damage: 16 },
        { name: 'Down Smash', damage: 18 },
      ]},
      { category: 'Aerial', moves: [
        { name: 'Neutral Air', damage: 14 },
        { name: 'Forward Air', damage: 18 },
        { name: 'Back Air', damage: 15 },
        { name: 'Up Air', damage: 12 },
        { name: 'Down Air', damage: 22 },
      ]},
      { category: 'Special', moves: [
        { name: 'Neutral Special — Boomerang', damage: 6 },
        { name: 'Up Special — Spin Attack', damage: 22 },
        { name: 'Down Special — Bomb', damage: 5 },
      ]},
      { category: 'Throw', moves: [
        { name: 'Forward Throw', damage: 6 },
        { name: 'Back Throw', damage: 10 },
        { name: 'Up Throw', damage: 7 },
        { name: 'Down Throw', damage: 5 },
      ]},
    ],
    accent: '#8bc34a',
    accentLight: '#558b2f',
    bg: '#558b2f',
    description:
      'Link is a heavy all-rounder armed with a sword, boomerang, bombs, and bow. His projectiles let him control space, but his slow movement and poor recovery hold him back in competitive play. A fun character with a rich toolkit.',
  },
  {
    name: 'Samus',
    universe: 'Metroid',
    type: 'Zoner',
    tier: 'D',
    image: '/charIcons/samus.webp',
    images: [
      { src: '/charGallery/Samus_-_Super_Smash_Bros.webp', alt: 'Samus' },
      { src: '/charGallery/SSB64_Samus.webp', alt: 'Samus in-game' },
      { src: '/charGallery/200px-Taunts-SSB-Samus.gif', alt: 'Samus taunt' },
      { src: '/charGallery/200px-Ssb64samus.jpg', alt: 'Samus gameplay' },
    ],
    attacks: [
      { category: 'Ground', moves: [
        { name: 'Jab', damage: '3+2+4' },
        { name: 'Forward Tilt', damage: 11 },
        { name: 'Up Tilt', damage: 8 },
        { name: 'Down Tilt', damage: 9 },
        { name: 'Dash Attack', damage: 8 },
        { name: 'Forward Smash', damage: 23 },
        { name: 'Up Smash', damage: 16 },
        { name: 'Down Smash', damage: 16 },
      ]},
      { category: 'Aerial', moves: [
        { name: 'Neutral Air', damage: 12 },
        { name: 'Forward Air', damage: 15 },
        { name: 'Back Air', damage: 15 },
        { name: 'Up Air', damage: 13 },
        { name: 'Down Air', damage: 14 },
      ]},
      { category: 'Special', moves: [
        { name: 'Neutral Special — Charge Shot', damage: '5–25' },
        { name: 'Up Special — Screw Attack', damage: '2×6' },
        { name: 'Down Special — Bomb', damage: 4 },
      ]},
      { category: 'Throw', moves: [
        { name: 'Forward Throw', damage: 9 },
        { name: 'Back Throw', damage: 12 },
        { name: 'Up Throw', damage: 8 },
        { name: 'Down Throw', damage: 7 },
      ]},
    ],
    accent: '#ff7043',
    accentLight: '#bf360c',
    bg: '#bf360c',
    description:
      'Samus is a long-range zoner who excels at keeping opponents out with her charge shot and missiles. Her tether recovery is risky, and getting inside her space can be difficult to avoid. She rewards patient, defensive play.',
  },
  {
    name: 'Falcon',
    universe: 'F-Zero',
    type: 'Rushdown',
    tier: 'A',
    image: '/charIcons/captainfalcon.webp',
    images: [
      { src: '/charGallery/Captain_Falcon_SSB.png', alt: 'Captain Falcon' },
      { src: '/charGallery/SSB64_Falcon.webp', alt: 'Captain Falcon in-game' },
      { src: '/charGallery/200px-Taunts-SSB-CaptainFalcon.gif', alt: 'Captain Falcon taunt' },
    ],
    attacks: [
      { category: 'Ground', moves: [
        { name: 'Jab', damage: '4+5' },
        { name: 'Forward Tilt', damage: 12 },
        { name: 'Up Tilt', damage: 9 },
        { name: 'Down Tilt', damage: 8 },
        { name: 'Dash Attack', damage: 10 },
        { name: 'Forward Smash', damage: 20 },
        { name: 'Up Smash', damage: 18 },
        { name: 'Down Smash', damage: 15 },
      ]},
      { category: 'Aerial', moves: [
        { name: 'Neutral Air', damage: 14 },
        { name: 'Forward Air', damage: 18 },
        { name: 'Back Air', damage: 16 },
        { name: 'Up Air', damage: 11 },
        { name: 'Down Air', damage: 14 },
      ]},
      { category: 'Special', moves: [
        { name: 'Neutral Special — Falcon Punch', damage: 26 },
        { name: 'Up Special — Falcon Dive', damage: 16 },
        { name: 'Down Special — Falcon Kick', damage: 12 },
      ]},
      { category: 'Throw', moves: [
        { name: 'Forward Throw', damage: 8 },
        { name: 'Back Throw', damage: 11 },
        { name: 'Up Throw', damage: 10 },
        { name: 'Down Throw', damage: 7 },
      ]},
    ],
    accent: '#42a5f5',
    accentLight: '#1565c0',
    bg: '#1565c0',
    description:
      'Captain Falcon is one of the fastest and most exciting fighters in the game. His Falcon Punch and Knee of Justice are iconic finishing moves. His speed, power, and combo potential make him a top-tier threat in skilled hands.',
  },
  {
    name: 'Ness',
    universe: 'EarthBound',
    type: 'Zoner',
    tier: 'D',
    image: '/charIcons/ness.webp',
    images: [
      { src: '/charGallery/Ness_SSB.png', alt: 'Ness' },
      { src: '/charGallery/Ness_ssb.PNG.webp', alt: 'Ness render' },
      { src: '/charGallery/225px-Ness.png', alt: 'Ness art' },
      { src: '/charGallery/SSB64_Ness.gif', alt: 'Ness in-game' },
      { src: '/charGallery/Taunts-SSB-Ness.gif', alt: 'Ness taunt' },
      { src: '/charGallery/175px-NESS_SSB_Air_Attacks.PNG', alt: 'Ness air attacks' },
    ],
    attacks: [
      { category: 'Ground', moves: [
        { name: 'Jab', damage: '3+4' },
        { name: 'Forward Tilt', damage: 11 },
        { name: 'Up Tilt', damage: 8 },
        { name: 'Down Tilt', damage: 6 },
        { name: 'Dash Attack', damage: 9 },
        { name: 'Forward Smash', damage: 18 },
        { name: 'Up Smash', damage: 22 },
        { name: 'Down Smash', damage: 12 },
      ]},
      { category: 'Aerial', moves: [
        { name: 'Neutral Air', damage: 12 },
        { name: 'Forward Air', damage: 16 },
        { name: 'Back Air', damage: 14 },
        { name: 'Up Air', damage: 12 },
        { name: 'Down Air', damage: 14 },
      ]},
      { category: 'Special', moves: [
        { name: 'Neutral Special — PK Flash', damage: '5–30' },
        { name: 'Up Special — PK Thunder', damage: 10 },
        { name: 'Down Special — PSI Magnet', damage: 0 },
      ]},
      { category: 'Throw', moves: [
        { name: 'Forward Throw', damage: 7 },
        { name: 'Back Throw', damage: 10 },
        { name: 'Up Throw', damage: 10 },
        { name: 'Down Throw', damage: 8 },
      ]},
    ],
    accent: '#7986cb',
    accentLight: '#3949ab',
    bg: '#283593',
    description:
      'Ness is a PK-powered fighter with strong smash attacks and a unique yo-yo move set. His recovery — PK Thunder — is one of the most unique and risky in the game. A quirky character with a high skill ceiling.',
  },
  {
    name: 'Yoshi',
    universe: 'Super Mario',
    type: 'All-Around',
    tier: 'C',
    image: '/charIcons/yoshi.webp',
    images: [
      { src: '/charGallery/Yoshi_-_Super_Smash_Bros.webp', alt: 'Yoshi' },
      { src: '/charGallery/SSB64_Yoshi.webp', alt: 'Yoshi in-game' },
      { src: '/charGallery/200px-Taunts-SSB-Yoshi.gif', alt: 'Yoshi taunt' },
    ],
    attacks: [
      { category: 'Ground', moves: [
        { name: 'Jab', damage: '3+5' },
        { name: 'Forward Tilt', damage: 11 },
        { name: 'Up Tilt', damage: 9 },
        { name: 'Down Tilt', damage: 7 },
        { name: 'Dash Attack', damage: 8 },
        { name: 'Forward Smash', damage: 16 },
        { name: 'Up Smash', damage: 16 },
        { name: 'Down Smash', damage: 14 },
      ]},
      { category: 'Aerial', moves: [
        { name: 'Neutral Air', damage: 14 },
        { name: 'Forward Air', damage: 14 },
        { name: 'Back Air', damage: 12 },
        { name: 'Up Air', damage: 10 },
        { name: 'Down Air', damage: 16 },
      ]},
      { category: 'Special', moves: [
        { name: 'Neutral Special — Egg Lay', damage: 12 },
        { name: 'Up Special — Egg Throw', damage: 6 },
        { name: 'Down Special — Yoshi Bomb', damage: 14 },
      ]},
      { category: 'Throw', moves: [
        { name: 'Forward Throw', damage: 7 },
        { name: 'Back Throw', damage: 10 },
        { name: 'Up Throw', damage: 9 },
        { name: 'Down Throw', damage: 6 },
      ]},
    ],
    accent: '#66bb6a',
    accentLight: '#388e3c',
    bg: '#2e7d32',
    description:
      'Yoshi is a mid-weight fighter with a powerful egg throw projectile and a double jump that can\'t be interrupted. His armor on the double jump is a unique defensive tool. Egg Lay and Yoshi Bomb add to his unusual playstyle.',
  },
  {
    name: 'Kirby',
    universe: 'Kirby',
    type: 'All-Around',
    tier: 'A',
    image: '/charIcons/kirby.webp',
    images: [
      { src: '/charGallery/Kirby_-_Super_Smash_Bros.webp', alt: 'Kirby' },
      { src: '/charGallery/SSB64_Kirby.gif', alt: 'Kirby in-game' },
      { src: '/charGallery/200px-Taunts-SSB-Kirby.gif', alt: 'Kirby taunt' },
    ],
    attacks: [
      { category: 'Ground', moves: [
        { name: 'Jab', damage: '2+2+4' },
        { name: 'Forward Tilt', damage: 10 },
        { name: 'Up Tilt', damage: 8 },
        { name: 'Down Tilt', damage: 6 },
        { name: 'Dash Attack', damage: 8 },
        { name: 'Forward Smash', damage: 18 },
        { name: 'Up Smash', damage: 24 },
        { name: 'Down Smash', damage: 14 },
      ]},
      { category: 'Aerial', moves: [
        { name: 'Neutral Air', damage: 10 },
        { name: 'Forward Air', damage: 16 },
        { name: 'Back Air', damage: 14 },
        { name: 'Up Air', damage: 14 },
        { name: 'Down Air', damage: 16 },
      ]},
      { category: 'Special', moves: [
        { name: 'Neutral Special — Inhale / Copy', damage: 0 },
        { name: 'Up Special — Final Cutter', damage: 12 },
        { name: 'Down Special — Stone', damage: 24 },
      ]},
      { category: 'Throw', moves: [
        { name: 'Forward Throw', damage: 7 },
        { name: 'Back Throw', damage: 11 },
        { name: 'Up Throw', damage: 10 },
        { name: 'Down Throw', damage: 8 },
      ]},
    ],
    accent: '#f06292',
    accentLight: '#ad1457',
    bg: '#ad1457',
    description:
      'Kirby is considered the best character in Smash 64 by many in the community. His multiple jumps give him exceptional survivability, and his down-tilt and up-tilt combos are devastating at low percentages. A top-tier pick for competitive play.',
  },
  {
    name: 'Fox',
    universe: 'Star Fox',
    type: 'Rushdown',
    tier: 'S',
    image: '/charIcons/fox.webp',
    images: [
      { src: '/charGallery/Fox_SSB.png', alt: 'Fox' },
      { src: '/charGallery/Fox_SSB_Intro.webp', alt: 'Fox intro' },
      { src: '/charGallery/SSB64_Fox.gif', alt: 'Fox in-game' },
      { src: '/charGallery/Fox_Palette_(SSB).png', alt: 'Fox palettes' },
    ],
    attacks: [
      { category: 'Ground', moves: [
        { name: 'Jab', damage: '2+2+2+3' },
        { name: 'Forward Tilt', damage: 10 },
        { name: 'Up Tilt', damage: 8 },
        { name: 'Down Tilt', damage: 6 },
        { name: 'Dash Attack', damage: 7 },
        { name: 'Forward Smash', damage: 16 },
        { name: 'Up Smash', damage: 17 },
        { name: 'Down Smash', damage: 14 },
      ]},
      { category: 'Aerial', moves: [
        { name: 'Neutral Air', damage: 14 },
        { name: 'Forward Air', damage: 16 },
        { name: 'Back Air', damage: 14 },
        { name: 'Up Air', damage: 11 },
        { name: 'Down Air', damage: 14 },
      ]},
      { category: 'Special', moves: [
        { name: 'Neutral Special — Blaster', damage: 3 },
        { name: 'Up Special — Fire Fox', damage: 22 },
        { name: 'Down Special — Reflector', damage: 7 },
      ]},
      { category: 'Throw', moves: [
        { name: 'Forward Throw', damage: 6 },
        { name: 'Back Throw', damage: 9 },
        { name: 'Up Throw', damage: 7 },
        { name: 'Down Throw', damage: 5 },
      ]},
    ],
    accent: '#ffa726',
    accentLight: '#e65100',
    bg: '#e65100',
    description:
      'Fox is a lightning-fast rushdown fighter with one of the best move sets in the game. His shine (reflector) sets up powerful combos, and his blaster lets him apply pressure at range. Widely considered one of the top two characters in the game.',
  },
  {
    name: 'Pikachu',
    universe: 'Pokémon',
    type: 'Rushdown',
    tier: 'S',
    image: '/charIcons/pikachu.webp',
    images: [
      { src: '/charGallery/Pikachu_-_Super_Smash_Bros.webp', alt: 'Pikachu' },
      { src: '/charGallery/SSB64_Pikachu.gif', alt: 'Pikachu in-game' },
      { src: '/charGallery/Taunts-SSB-Pikachu.gif', alt: 'Pikachu taunt' },
      { src: '/charGallery/Pikachu_Palette_(SSB).png', alt: 'Pikachu palettes' },
    ],
    attacks: [
      { category: 'Ground', moves: [
        { name: 'Jab', damage: '2+3' },
        { name: 'Forward Tilt', damage: 9 },
        { name: 'Up Tilt', damage: 8 },
        { name: 'Down Tilt', damage: 5 },
        { name: 'Dash Attack', damage: 7 },
        { name: 'Forward Smash', damage: 13 },
        { name: 'Up Smash', damage: 15 },
        { name: 'Down Smash', damage: 10 },
      ]},
      { category: 'Aerial', moves: [
        { name: 'Neutral Air', damage: 12 },
        { name: 'Forward Air', damage: 16 },
        { name: 'Back Air', damage: 14 },
        { name: 'Up Air', damage: 11 },
        { name: 'Down Air', damage: 10 },
      ]},
      { category: 'Special', moves: [
        { name: 'Neutral Special — Thunder Jolt', damage: 6 },
        { name: 'Up Special — Quick Attack', damage: '4+4' },
        { name: 'Down Special — Thunder', damage: 20 },
      ]},
      { category: 'Throw', moves: [
        { name: 'Forward Throw', damage: 8 },
        { name: 'Back Throw', damage: 9 },
        { name: 'Up Throw', damage: 7 },
        { name: 'Down Throw', damage: 6 },
      ]},
    ],
    accent: '#ffee58',
    accentLight: '#f9a825',
    bg: '#f9a825',
    description:
      'Pikachu is arguably the best character in Smash 64. Tiny hitbox, incredible speed, and a Thunder move that covers vertical recovery make it nearly impossible to KO. Its combo game off down-throw is suffocating at any percentage.',
  },
  {
    name: 'Jigglypuff',
    universe: 'Pokémon',
    type: 'Zoner',
    tier: 'B',
    image: '/charIcons/jigglypuff.webp',
    images: [
      { src: '/charGallery/Jigglypuff_SSB.png', alt: 'Jigglypuff' },
      { src: '/charGallery/SSB64_Jiggly.gif', alt: 'Jigglypuff in-game' },
      { src: '/charGallery/200px-Taunts-SSB-Jigglypuff.gif', alt: 'Jigglypuff taunt' },
      { src: '/charGallery/Jigglypuff_Palette_(SSB).png', alt: 'Jigglypuff palettes' },
    ],
    attacks: [
      { category: 'Ground', moves: [
        { name: 'Jab', damage: '3+4' },
        { name: 'Forward Tilt', damage: 10 },
        { name: 'Up Tilt', damage: 8 },
        { name: 'Down Tilt', damage: 8 },
        { name: 'Dash Attack', damage: 7 },
        { name: 'Forward Smash', damage: 16 },
        { name: 'Up Smash', damage: 15 },
        { name: 'Down Smash', damage: 12 },
      ]},
      { category: 'Aerial', moves: [
        { name: 'Neutral Air', damage: 12 },
        { name: 'Forward Air', damage: 15 },
        { name: 'Back Air', damage: 16 },
        { name: 'Up Air', damage: 11 },
        { name: 'Down Air', damage: 14 },
      ]},
      { category: 'Special', moves: [
        { name: 'Neutral Special — Rollout', damage: '4–21' },
        { name: 'Up Special — Sing', damage: 0 },
        { name: 'Down Special — Rest', damage: 30 },
      ]},
      { category: 'Throw', moves: [
        { name: 'Forward Throw', damage: 7 },
        { name: 'Back Throw', damage: 10 },
        { name: 'Up Throw', damage: 8 },
        { name: 'Down Throw', damage: 6 },
      ]},
    ],
    accent: '#f48fb1',
    accentLight: '#c2185b',
    bg: '#880e4f',
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
  const [displayedIndex, setDisplayedIndex] = useState(null);
  const [animatingOut, setAnimatingOut] = useState(false);

  const current = displayedIndex !== null ? fighters[displayedIndex] : null;

  function handleSelect(index) {
    if (index === selected) return;
    setSelected(index);
    setAnimatingOut(true);
    setTimeout(() => {
      setDisplayedIndex(index);
      setAnimatingOut(false);
    }, 150);
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
    <div className="cyc-wrapper">
      <div className="cyc-top-bar">
        <h1 className="cyc-title">Characters</h1>
        <BackButton />
      </div>

      {/* Static switcher — always visible */}
      <div className="cyc-switcher">
        {fighters.map((fighter, index) => (
          <button
            key={fighter.name}
            className={`cyc-square ${selected === index ? 'cyc-square--active' : ''}`}
            onClick={() => handleSelect(index)}
            title={fighter.name}
          >
            <img src={fighter.image} alt={fighter.name} className="cyc-square-img" />
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
      <div className={`cyc-content${animatingOut ? ' cyc-fade--out' : ' cyc-fade--in'}`}>
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

      {current && (
        <div className={`cyc-gallery${animatingOut ? ' cyc-fade--out' : ' cyc-fade--in'}`}>
          <ImageGallery images={current.images} />
        </div>
      )}

      {current && (
        <div className={`cyc-attacks${animatingOut ? ' cyc-fade--out' : ' cyc-fade--in'}`}>
          <h2 className="cyc-attacks-title">Attacks</h2>
          <AttackList attacks={current.attacks} />
        </div>
      )}

      {current && (
        <CommentSection pageType="character" pageId={current.name} />
      )}
    </div>
  );
}

export default ChooseYourCharacter;
