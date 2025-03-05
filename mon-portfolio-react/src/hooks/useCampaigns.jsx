// src/hooks/useCampaigns.jsx
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/api';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log("Token envoyé :", token); // Pour vérifier le token côté client
        const response = await fetch(`${API_URL}/donation-campaigns`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des campagnes');
        }
        const data = await response.json();
        console.log('Campagnes récupérées :', data);
        setCampaigns(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des campagnes', error);
        setError('Erreur lors du chargement des campagnes');
      }
    };


    fetchCampaigns();
  }, []);

  return { campaigns, error };
};
