import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/api';

export const useCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Normalise la structure des données
    const normalizeCampaign = (data, type) => ({
        _id: data._id || Math.random().toString(36).substr(2, 9),
        title: data.title || 'Campagne sans nom',
        description: data.description || 'Description non disponible',
        image: data.image || '/assets/images/default-campaign.jpg',
        raisedAmount: data.raisedAmount || data.amount || 0,
        targetAmount: data.targetAmount || data.goal || 1000,
        startDate: data.startDate || new Date().toISOString(),
        endDate: data.endDate || '',
        type: type,
        status: data.status || 'active'
    });

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('authToken');

                if (!token) {
                    throw new Error('Authentification requise - Connectez-vous');
                }

                const fetchEndpoint = async (endpoint) => {
                    try {
                        const response = await fetch(`${API_URL}/${endpoint}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(`Erreur ${response.status}: ${errorData.message || endpoint}`);
                        }

                        const data = await response.json();
                        return Array.isArray(data) ? data : [];
                    } catch (error) {
                        console.error(`Échec de ${endpoint}:`, error);
                        return [];
                    }
                };

                // Chargement parallèle avec gestion d'erreur individuelle
                const [donations, projects] = await Promise.allSettled([
                    fetchEndpoint('campaigns'),
                    fetchEndpoint('projects')
                ]);

                // Fusion et normalisation des données
                const combinedData = [
                    ...(donations.value?.map(d => normalizeCampaign(d, 'donation')) || []),
                    ...(projects.value?.map(p => normalizeCampaign(p, 'project')) || [])
                ];

                // Trie par date de création décroissante
                combinedData.sort((a, b) =>
                    new Date(b.startDate) - new Date(a.startDate)
                );

                setCampaigns(combinedData);

                // Gestion des erreurs globales
                if (combinedData.length === 0) {
                    throw new Error('Aucune donnée disponible');
                }

            } catch (error) {
                console.error('Erreur useCampaigns:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    return { campaigns, error, isLoading };
};
