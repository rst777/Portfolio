import React from 'react';
import { useCampaigns } from '../hooks/useCampaigns';
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { campaigns, error } = useCampaigns();

  const actions = [
    {
      id: 1, // Ajout d'un identifiant unique pour chaque action
      image: '/assets/images/action1.jpg',
      alt: 'Aide pour recolter des dons',
      text: 'Merci pour votre soutien !'
    },
    {
      id: 2, // Ajout d'un identifiant unique pour chaque action
      image: '/assets/images/action2.jpg',
      alt: 'Don pour un apport',
      text: 'Votre générosité fait la différence !'
    },
    {
      id: 3, // Ajout d'un identifiant unique pour chaque action
      image: '/assets/images/action3.jpg',
      alt: 'Récolte de fonds',
      text: 'Ensemble, nous pouvons faire plus !'
    },
    {
      id: 4, // Ajout d'un identifiant unique pour chaque action
      image: '/assets/images/action4.jpg',
      alt: 'Action 4',
      text: 'Un autre message de remerciement !'
    },
    {
      id: 5, // Ajout d'un identifiant unique pour chaque action
      image: '/assets/images/action5.jpg',
      alt: 'Action 5',
      text: 'Encore un autre message !'
    },
    {
      id: 6, // Ajout d'un identifiant unique pour chaque action
      image: '/assets/images/action6.jpg',
      alt: 'Action 6',
      text: 'Merci pour votre aide !'
    }
  ];

  console.log('Campagnes :', campaigns); // Ajout d'un log pour le débogage

  return (
    <main>
      <section className="intro">
        <h2>Notre Mission</h2>
        <p>Nous aidons les personnes dans le besoin en collectant des dons pour des causes importantes.</p>
      </section>

      <section className="assets-images">
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

        <Link to="/create-campaign" className="create-campaign-button">Créer une nouvelle campagne</Link>
        {error ? (
          <p>Erreur : {error}</p>
        ) : campaigns.length > 0 ? (
          <ul>
            {campaigns.map((campaign) => (
              <li key={campaign._id} className="campaign-card">
                <Link to={`/campaign/${campaign._id}`}>
                <img src="assets/images/action4.jpg" alt={campaign.title} />
                <div className="card-content">
                  <h3>{campaign.title}</h3>
                  <p>{campaign.description}</p>
                  <p className="amount">Montant collecté : {campaign.raisedAmount ? `${campaign.raisedAmount} €` : 'Non spécifié'}</p>
                </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chargement des campagnes...</p>
        )}
      </section>

      <section className="call-to-action">

        <h2>Envie d’aider ?</h2>
        <p>Rejoignez-nous en faisant un don ou en partageant notre cause !</p>
        <a href="/dons" className="donate-button">Faire un don</a>
      </section>
    </main>
  );
};

export default HomePage;
