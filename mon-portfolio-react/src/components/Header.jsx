import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Header.css';
import '../styles/Logo.css';


const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <img src="/assets/images/logo.png" alt="Logo du site" className="logo" />
      <h1>Bienvenue</h1>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/presentation">Présentation</Link></li>
          <li><Link to="/propos">À propos</Link></li>
          {user ? (
            <>
              <li><Link to="/dons">Faire un don</Link></li>
              <li><button onClick={handleLogout}>Déconnexion</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Connexion</Link></li>
              <li><Link to="/register">S'inscrire</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
