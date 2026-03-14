import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ImageGallery.css';

const INTERVAL_MS = 4000;

function ImageGallery({ images }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % images.length);
    }, INTERVAL_MS);
  }, [images.length]);

  // Reset to first image when the character changes
  useEffect(() => {
    setCurrent(0);
  }, [images]);

  // Start auto-advance (only if more than one image)
  useEffect(() => {
    if (images.length <= 1) return;
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval, images.length]);

  function handleSelect(index) {
    setCurrent(index);
    if (images.length > 1) startInterval();
  }

  function handlePrev() {
    const index = (current - 1 + images.length) % images.length;
    handleSelect(index);
  }

  function handleNext() {
    const index = (current + 1) % images.length;
    handleSelect(index);
  }

  const safeIndex = Math.min(current, images.length - 1);

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img
          src={images[safeIndex].src}
          alt={images[safeIndex].alt}
          className="gallery-main-img"
        />
      </div>
      {images.length > 1 && (
        <>
          <div className="gallery-thumbs">
            {images.map((image, index) => (
              <button
                key={index}
                className={`gallery-thumb ${safeIndex === index ? 'gallery-thumb--active' : ''}`}
                onClick={() => handleSelect(index)}
              >
                <img src={image.src} alt={image.alt} className="gallery-thumb-img" />
              </button>
            ))}
          </div>
          <div className="gallery-nav">
            <button className="gallery-nav-btn" onClick={handlePrev}>
              <span className="gallery-nav-arrows">◄◄</span>
              <span className="gallery-nav-label">PREV</span>
            </button>
            <button className="gallery-nav-btn" onClick={handleNext}>
              <span className="gallery-nav-label">NEXT</span>
              <span className="gallery-nav-arrows">►►</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ImageGallery;
