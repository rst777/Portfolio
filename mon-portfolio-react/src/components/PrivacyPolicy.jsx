// src/components/PrivacyPolicy.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PrivacyPolicy.css';
import '../styles/Responsive.css';

// This component displays the Privacy Policy in French
const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h1>Politique de confidentialité</h1>
      <p>Dernière mise à jour : 10 mai 2025</p>
      <h2>Introduction</h2>
      <p>
        Cette Politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations lorsque vous utilisez notre site "Un Don Pour Ma Maison".
      </p>

      <h2>1. Collecte des informations</h2>
      <p>
        Nous pouvons collecter des informations personnelles telles que votre nom, adresse e-mail, et toute autre information que vous nous fournissez volontairement via nos formulaires de contact ou d'inscription.
      </p>

      <h2>2. Utilisation des informations</h2>
      <p>
        Vos informations sont utilisées uniquement pour répondre à vos demandes, améliorer notre site, et vous contacter si nécessaire. Nous ne vendons ni ne partageons vos données à des tiers sans votre consentement.
      </p>

      <h2>3. Cookies</h2>
      <p>
        Nous utilisons des cookies pour améliorer votre expérience de navigation sur notre site. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
      </p>

      <h2>4. Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures de sécurité pour protéger vos informations personnelles contre tout accès non autorisé.
      </p>

      <h2>5. Vos droits</h2>
      <p>
        Vous avez le droit d'accéder, de corriger ou de supprimer vos informations personnelles. Pour exercer ces droits, contactez-nous à l'adresse suivante : contact@undonpourmamaison.fr
      </p>

      <h2>6. Modifications de la politique</h2>
      <p>
        Nous pouvons mettre à jour cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à : contact@undonpourmamaison.fr
      </p>
	  {/* Back to home button */}
      <Link to="/" className="back-home-button">Retour à l'accueil</Link>
    </div>
  );
};
export default PrivacyPolicy;
