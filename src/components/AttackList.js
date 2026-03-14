import React from 'react';
import './AttackList.css';

const STANDARD_CONTROLS = {
  'Jab':            'A',
  'Forward Tilt':   '← / → + A',
  'Up Tilt':        '↑ + A',
  'Down Tilt':      '↓ + A',
  'Dash Attack':    'Dash + A',
  'Forward Smash':  '← / → + A',
  'Up Smash':       '↑ + A',
  'Down Smash':     '↓ + A',
  'Neutral Air':    'A',
  'Forward Air':    '→ + A',
  'Back Air':       '← + A',
  'Up Air':         '↑ + A',
  'Down Air':       '↓ + A',
  'Forward Throw':  '→ + A',
  'Back Throw':     '← + A',
  'Up Throw':       '↑ + A',
  'Down Throw':     '↓ + A',
};

function getControl(moveName) {
  if (moveName.startsWith('Neutral Special')) return 'B';
  if (moveName.startsWith('Side Special'))    return '← / → + B';
  if (moveName.startsWith('Up Special'))      return '↑ + B';
  if (moveName.startsWith('Down Special'))    return '↓ + B';
  return STANDARD_CONTROLS[moveName] || '';
}

function AttackList({ attacks }) {
  return (
    <div className="attack-list">
      {attacks.map(group => (
        <div key={group.category} className="attack-group">
          <h3 className="attack-group-title">{group.category}</h3>
          <table className="attack-table">
            <thead>
              <tr>
                <th>Move</th>
                <th>Control</th>
                <th>Damage</th>
              </tr>
            </thead>
            <tbody>
              {group.moves.map(move => (
                <tr key={move.name}>
                  <td>{move.name}</td>
                  <td className="attack-control">{getControl(move.name)}</td>
                  <td className="attack-damage">{move.damage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default AttackList;
