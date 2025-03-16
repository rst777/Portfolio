// Navigation.jsx


import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Composant de navigation.
 *
 * @param {Object} props
 * @param {boolean} props.user - Indique si l'utilisateur est connecté.
 * @param {function} props.onLogout - Fonction pour gérer la déconnexion.
 * @returns {JSX.Element} Composant de navigation.
 */

const Navigation = ({ user, onLogout }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/presentation">Présentation</Link></li>
        <li><Link to="/propos">À propos</Link></li>
        {user ? (
          <>
            <li><Link to="/dons">Faire un don</Link></li>
            <li><button onClick={onLogout}>Déconnexion</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Connexion</Link></li>
            <li><Link to="/register">S'inscrire</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

