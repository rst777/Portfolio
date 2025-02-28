import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      <img src="/assets/images/logo.png" alt="Logo du site" className="logo" />
      <h1>Bienvenue</h1>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/presentation">Présentation</Link></li>
          <li><Link to="/propos">À propos</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
