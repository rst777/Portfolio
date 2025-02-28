// src/components/CampaignSelector.jsx
import React from 'react';
import '../styles/CampaignSelector.css';

const CampaignSelector = ({ campaigns, onCampaignSelect }) => {
  return (
    <select id="campaignId" name="campaignId" onChange={(e) => onCampaignSelect(e.target.value)}>
      <option value="">Sélectionner une campagne</option>
      {campaigns.map((campaign) => (
        <option key={campaign._id} value={campaign._id}>
          {campaign.title}
        </option>
      ))}
    </select>
  );
};

export default CampaignSelector;
