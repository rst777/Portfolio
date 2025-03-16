import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>À propos</h4>
          <ul>
            <li><Link to="/about">Qui sommes-nous</Link></li>
            <li><Link to="/how-it-works">Comment ça marche</Link></li>
            <li><Link to="/contact">Contactez-nous</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Ressources</h4>
          <ul>
            <li><Link to="/help">Centre d'aide</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/press">Presse</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Légal</h4>
          <ul>
            <li><Link to="/terms">Conditions d'utilisation</Link></li>
            <li><Link to="/privacy">Politique de confidentialité</Link></li>
            <li><Link to="/cookies">Politique de cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Un Don Pour Ma Maison. Tous droits réservés.</p>
      </div>
      <div className="social-icons">
        {/* Ajoutez ici vos icônes de réseaux sociaux */}
      </div>
    </footer>
  );
};

export default Footer;
