// src/components/Cookies.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cookies.css';
import '../styles/Responsive.css';

// This component displays the Cookies Policy page in French
const Cookies = () => {
  return (
    <div className="cookies-policy">
      {/* Title and update date */}
      <h1>Politique de cookies</h1>
      <p>Dernière mise à jour : 10 mai 2025</p>
      {/* What is a cookie */}
      <h2>Qu'est-ce qu'un cookie ?</h2>
      <p>
        Un cookie est un petit fichier texte qui est enregistré sur votre appareil lorsque vous visitez notre site. Il permet de reconnaître votre appareil lors de vos prochaines visites.
      </p>
      {/* Why we use cookies */}
      <h2>Pourquoi utilisons-nous des cookies ?</h2>
      <p>
        Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser l'utilisation de notre site et personnaliser le contenu que nous vous proposons.
      </p>
      {/* Types of cookies */}
      <h2>Types de cookies que nous utilisons</h2>
      <ul>
        <li><strong>Cookies de session :</strong> Ces cookies sont temporaires et sont supprimés lorsque vous fermez votre navigateur.</li>
        <li><strong>Cookies persistants :</strong> Ces cookies restent sur votre appareil pendant une période déterminée ou jusqu'à ce que vous les supprimiez.</li>
        <li><strong>Cookies tiers :</strong> Ces cookies sont placés par des tiers, tels que des réseaux sociaux ou des services d'analyse.</li>
      </ul>
      {/* How to manage cookies */}
      <h2>Comment gérer les cookies ?</h2>
      <p>
        Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur. Vous pouvez choisir de bloquer tous les cookies ou d'être averti lorsque des cookies sont envoyés. Veuillez noter que si vous bloquez les cookies, certaines fonctionnalités de notre site peuvent ne pas fonctionner correctement.
      </p>
      {/* Consent */}
      <h2>Consentement</h2>
      <p>
        En utilisant notre site, vous consentez à l'utilisation de cookies conformément à cette politique. Vous pouvez retirer votre consentement à tout moment en modifiant vos paramètres de cookies dans votre navigateur.
      </p>
      {/* Policy changes */}
      <h2>Modifications de la politique</h2>
      <p>
        Nous pouvons mettre à jour cette politique de cookies à tout moment. Les modifications seront publiées sur cette page.
      </p>
      {/* Contact */}
      <h2>Contact</h2>
      <p>
        Pour toute question concernant cette politique de cookies, veuillez nous contacter à : contact@undonpourmamaison.fr
      </p>
      {/* Back to home button */}
      <Link to="/" className="back-home-button">Retour à l'accueil</Link>
    </div>
  );
}
export default Cookies;
