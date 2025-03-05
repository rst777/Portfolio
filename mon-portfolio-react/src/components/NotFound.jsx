// src/components/NotFound.jsx
import React from 'react';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <Link to="/" className="back-home-button">Retour à l'accueil</Link>
    </div>
  );
};

export default NotFound;
