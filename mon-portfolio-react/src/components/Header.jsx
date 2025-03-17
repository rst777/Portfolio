import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Header.css';
import '../styles/Responsive.css';
import '../styles/Logo.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

      {/* Bouton Hamburger */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Menu Responsive */}
      <div className={`nav-right ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/propos" onClick={toggleMenu}>À propos</Link></li>
          <li><Link to="/dons" onClick={toggleMenu}>Faire un don</Link></li>
          {user ? (
            <li><button onClick={handleLogout} className="logout-button">Déconnexion</button></li>
          ) : (
            <>
              <li><Link to="/login" onClick={toggleMenu} className="logout-button">Connexion</Link></li>
              <li><Link to="/register" onClick={toggleMenu} className="register-button">S'inscrire</Link></li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
