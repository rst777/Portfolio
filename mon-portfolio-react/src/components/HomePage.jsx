// src/components/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { useCampaigns } from '../hooks/useCampaigns';
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';
import '../styles/Responsive.css';

const HomePage = () => {
  const { campaigns, error, isLoading } = useCampaigns();
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const opacity = Math.max(1 - scrollY / 300, 0); // Ajustez 300 pour la vitesse de disparition
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const actions = [
    {
      id: 1,
      image: '/assets/images/action1.jpg',
      alt: 'Aide pour recolter des dons',
      text: 'Merci pour votre soutien !'
    },
    {
      id: 2,
      image: '/assets/images/action2.jpg',
      alt: 'Don pour un apport',
      text: 'Votre générosité fait la différence !'
    },
    {
      id: 3,
      image: '/assets/images/action3.jpg',
      alt: 'Récolte de fonds',
      text: 'Ensemble, nous pouvons faire plus !'
    },
    {
      id: 4,
      image: '/assets/images/action4.jpg',
      alt: 'Action 4',
      text: 'Un autre message de remerciement !'
    },
    {
      id: 5,
      image: '/assets/images/action5.jpg',
      alt: 'Action 5',
      text: 'Encore un autre message !'
    },
    {
      id: 6,
      image: '/assets/images/action6.jpg',
      alt: 'Action 6',
      text: 'Merci pour votre aide !'
    }
  ];

  return (
    <main className="home-page">
      <section className="hero" style={{ opacity: scrollOpacity, transition: 'opacity 0.3s ease-out' }}>
        <img src="/assets/images/header-image.jpg" alt="Notre communauté" className="hero-image" />
        <div className="hero-content">
          <h1>Bienvenue sur notre plateforme de dons</h1>
          <p>Ensemble, nous pouvons faire la différence</p>
        </div>
      </section>

      <section className="mission">
        <h2>Notre Mission</h2>
        <p>Nous aidons les personnes dans le besoin en collectant des dons pour des causes importantes.</p>
      </section>

      <section className="actions">
        <h2>Nos Actions</h2>
        <div className="gallery">
          {actions.map((action) => (
            <div key={action.id} className="gallery-item">
              <img src={action.image} alt={action.alt} />
              <p>{action.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="campaigns">
  <h2>Nos Campagnes</h2>
  <div className="campaigns-header">
    <p>Découvrez nos campagnes en cours et apportez votre soutien.</p>
    <Link to="/create-campaign" className="create-campaign-button">Créer une nouvelle campagne</Link>
  </div>
  {isLoading ? (
    <p>Chargement des campagnes...</p>
  ) : error ? (
    <p>Erreur : {error}</p>
  ) : campaigns.length > 0 ? (
    <ul className="campaign-list">
      {campaigns.map((campaign) => (
        <li key={campaign._id} className="campaign-card">
          <Link to={`/campaign/${campaign._id}`}>
            {/* Affiche l'image de la campagne */}
            <img
              src={campaign.image ? `http://localhost:4000/uploads/${campaign.image}` : '/assets/images/default-campaign.jpg'}
              alt={campaign.title}
              onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/default-campaign.jpg'; }}
            />
            <div className="card-content">
              <h3>{campaign.title}</h3>
              <p>{campaign.description?.substring(0, 100)}...</p>
              <p className="amount">Montant collecté : {campaign.raisedAmount} €</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <div className="no-campaigns">
      <p>Aucune campagne disponible pour le moment</p>
      <Link to="/create-campaign">Soyez le premier à créer une campagne !</Link>
    </div>
  )}
</section>

      <section className="call-to-action">
        <h2>Envie d'aider ?</h2>
        <p>Rejoignez-nous en faisant un don ou en partageant notre cause !</p>
        <Link to="/dons" className="donate-button">Faire un don</Link>
      </section>
    </main>
  );
};

export default HomePage;
