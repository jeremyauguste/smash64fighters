import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="back-btn" onClick={() => navigate('/')}>
      <span className="back-arrows">◄◄</span>
      <span className="back-label">BACK</span>
    </button>
  );
}

export default BackButton;
