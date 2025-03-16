// src/components/NotFound.jsx

import { Link } from 'react-router-dom';
import React from 'react';
import '../styles/NotFound.css';
import '../styles/Responsive.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <Link to="/" className="back-home-button">Retour à l'accueil</Link>
    </div>
  );
};

export default NotFound;
