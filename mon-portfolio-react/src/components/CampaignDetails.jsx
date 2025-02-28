import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/donation-campaigns/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des détails de la campagne');
        }
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        setError('Erreur lors du chargement des détails de la campagne');
      }
    };

    fetchCampaignDetails();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!campaign) {
    return <p>Chargement des détails de la campagne...</p>;
  }

  return (
    <div>
      <h2>{campaign.title}</h2>
      <p>{campaign.description}</p>
      <p>Montant collecté : {campaign.raisedAmount} €</p>
      <p>Objectif : {campaign.targetAmount} €</p>
      <p>Créé par : {campaign.creatorName}</p>
      <p>Date de début : {new Date(campaign.startDate).toLocaleDateString()}</p>
      <p>Date de fin : {new Date(campaign.endDate).toLocaleDateString()}</p>
      {/* Ajoutez d'autres détails selon vos besoins */}
    </div>
  );
};

export default CampaignDetails;
