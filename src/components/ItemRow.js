import React from 'react';
import './ItemRow.css';

function ItemRow({ item, isOpen, onToggle }) {
  return (
    <div className={`item-row${isOpen ? ' item-row--open' : ''}`} onClick={onToggle}>
      <div className="item-row-header">
        <span className="item-name">{item.name}</span>
        <span className="item-info-btn">INFO</span>
      </div>
      <div className={`item-row-detail-wrapper${isOpen ? ' item-row-detail-wrapper--open' : ''}`}>
        <div className="item-row-detail">
          <p className="item-description">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemRow;
