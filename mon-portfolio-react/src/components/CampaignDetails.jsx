import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CampaignDetails = () => {
  const { id } = useParams(); // Récupère l'ID de la campagne depuis l'URL
  const [campaign, setCampaign] = useState(null); // État pour stocker les détails de la campagne
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Récupère le token d'authentification depuis le localStorage

        const response = await fetch(`http://localhost:4000/api/donation-campaigns/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des détails de la campagne');
        }

        const data = await response.json();
        setCampaign(data); // Met à jour l'état avec les détails de la campagne
      } catch (error) {
        setError('Erreur lors du chargement des détails de la campagne');
      }
    };

    fetchCampaignDetails();
  }, [id]);

  // Affichage en cas d'erreur
  if (error) {
    return <p>{error}</p>;
  }

  // Affichage pendant le chargement
  if (!campaign) {
    return <p>Chargement des détails de la campagne...</p>;
  }

  // Affichage des détails de la campagne
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
