import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Header.css';
import '../styles/Responsive.css';
import '../styles/Logo.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="gofundme-header">
      <div className="nav-left">
        <Link to="/">Accueil</Link>
        <Link to="/presentation">Présentation</Link>
      </div>

      <div className="logo-container">
      <Link to="/">
        <img src="/assets/images/logo.png" alt="Logo du site" className="logo" />
        <span className="site-title">
          <span className="animated-text">Un Don Pour Ma Maison</span>
    </span>
  </Link>
</div>
        <div className="nav-right">
        <Link to="/propos">À propos</Link>
        <Link to="/dons">Faire un don</Link>
        {user ? (
          <button onClick={handleLogout} className="logout-button">Déconnexion</button>
        ) : (
          <>
            <Link to="/login" className="logout-button">Connexion</Link>
            <Link to="/register" className="register-button">S'inscrire</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
