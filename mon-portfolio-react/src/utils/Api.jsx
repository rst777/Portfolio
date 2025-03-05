export const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem('authToken'); // Récupérer le token du localStorage

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error('Erreur lors de l’appel API');
  }
  return response.json();
};
