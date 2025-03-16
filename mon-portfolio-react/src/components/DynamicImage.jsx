//src/components/DynamicImage.jsx

import React, { useEffect, useRef, useState } from 'react';
import '../styles/DynamicImage.css';

const DynamicImage = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={imageRef}
      className={`dynamic-image-container ${isVisible ? 'visible' : ''}`}
    >
      <img src={src} alt={alt} className="dynamic-image" />
    </div>
  );
};

export default DynamicImage;
