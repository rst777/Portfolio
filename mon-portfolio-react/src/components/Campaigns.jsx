// src/components/Campaigns.jsx
import React from 'react';
import '../styles/Campaigns.css';
import { useCampaigns } from '../hooks/useCampaigns';

const Campaigns = ({ onCampaignSelect }) => {
  const { campaigns, error } = useCampaigns();

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <section id="campaigns">
      <h2>Campagnes de dons</h2>
      <ul id="campaignList">
        {campaigns.map((campaign) => (
          <li key={campaign._id}>
            {campaign.title} - {campaign.raisedAmount}€ / {campaign.targetAmount}€
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Campaigns;
