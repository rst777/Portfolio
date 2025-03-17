import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:4000/api';

export const useCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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

    const fetchCampaigns = useCallback(async () => {
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

            const [donations, projects] = await Promise.allSettled([
                fetchEndpoint('campaigns'),
                fetchEndpoint('projects')
            ]);

            const combinedData = [
                ...(donations.value?.map(d => normalizeCampaign(d, 'donation')) || []),
                ...(projects.value?.map(p => normalizeCampaign(p, 'project')) || [])
            ];

            combinedData.sort((a, b) =>
                new Date(b.startDate) - new Date(a.startDate)
            );

            setCampaigns(combinedData);

            if (combinedData.length === 0) {
                throw new Error('Aucune donnée disponible');
            }

        } catch (error) {
            console.error('Erreur useCampaigns:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addCampaign = useCallback(async (newCampaignData) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Authentification requise - Connectez-vous');
            }

            // Vérifiez si newCampaignData est une instance de FormData
            let isFormData = newCampaignData instanceof FormData;

            const response = await fetch(`${API_URL}/campaigns`, {
                method: 'POST',
                headers: isFormData
                    ? { Authorization: `Bearer ${token}` } // Pas de Content-Type pour FormData
                    : {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                body: isFormData ? newCampaignData : JSON.stringify(newCampaignData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erreur ${response.status}: ${errorData.message || 'Erreur lors de la création de la campagne'}`);
            }

            const createdCampaign = await response.json();
            const normalizedCampaign = normalizeCampaign(createdCampaign, 'donation');

            setCampaigns(prevCampaigns => [normalizedCampaign, ...prevCampaigns]);

            return normalizedCampaign;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la campagne:', error);
            setError(error.message);
            throw error;
        }
    }, []);

    useEffect(() => {
        fetchCampaigns();
    }, [fetchCampaigns]);

    return { campaigns, error, isLoading, addCampaign, refetchCampaigns: fetchCampaigns };
};
