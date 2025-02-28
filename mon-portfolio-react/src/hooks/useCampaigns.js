// src/hooks/useCampaigns.js
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${API_URL}/donation-campaigns`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des campagnes');
        }
        const data = await response.json();
        console.log('Campagnes récupérées :', data); // Ajout d'un log pour le débogage
        setCampaigns(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des campagnes', error); // Ajout d'un log pour le débogage
        setError('Erreur lors du chargement des campagnes');
      }
    };

    fetchCampaigns();
  }, []);

  return { campaigns, error };
};
