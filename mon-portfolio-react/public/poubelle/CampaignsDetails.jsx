// src/components/CampaignDetails.jsx
import React from 'react';
import '../styles/CampaignDetails.css';

const CampaignDetails = ({ campaign }) => {
  return (
    <div className="campaign-details">
      <h2>{campaign.title}</h2>
      <p className="campaign-description">{campaign.description}</p>
      <div className="campaign-stats">
        <h3>Statistiques</h3>
        <p>
          Montant collecté : <strong>{campaign.raisedAmount} €</strong>
        </p>
        <p>
          Objectif : <strong>{campaign.targetAmount} €</strong>
        </p>
        <ProgressBar current={campaign.raisedAmount} target={campaign.targetAmount} />
      </div>
      <div className="campaign-info">
        <h3>Informations</h3>
        <p>
          Créé par : <strong>{campaign.creator}</strong>
        </p>
        <p>
          Date de début : <strong>{campaign.startDate}</strong>
        </p>
        <p>
          Date de fin : <strong>{campaign.endDate}</strong>
        </p>
      </div>
    </div>
  );
};

export default CampaignDetails;
