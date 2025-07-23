import React from 'react';
import { useEffect } from 'react';
import './ResultAnimations.css'; // Assuming you have a CSS file for animations

const ResultAnimations = ({ isVisible }) => {
  useEffect(() => {
    if (isVisible) {
      const resultElement = document.getElementById('result-animation');
      resultElement.classList.add('fade-in');

      const timeout = setTimeout(() => {
        resultElement.classList.remove('fade-in');
      }, 3000); // Duration of the animation

      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  return (
    <div id="result-animation" className={`result-animation ${isVisible ? 'visible' : ''}`}>
      <h2>Résultat Estimé</h2>
      <p>Voici votre estimation détaillée.</p>
    </div>
  );
};

export default ResultAnimations;