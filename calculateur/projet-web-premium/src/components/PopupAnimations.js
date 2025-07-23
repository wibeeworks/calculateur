import React from 'react';
import './PopupAnimations.css'; // Assuming you have a CSS file for animations

export const showPopup = (message) => {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add('fade-out');
  }, 3000); // Popup will disappear after 3 seconds

  popup.addEventListener('animationend', () => {
    popup.remove();
  });
};

export const showSuccessPopup = (message) => {
  showPopup(message);
};

export const showErrorPopup = (message) => {
  showPopup(message);
};