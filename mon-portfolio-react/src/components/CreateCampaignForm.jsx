import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Assurez-vous d'avoir ce hook
import '../styles/CreateCampaignForm.css';

const CreateCampaignForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement

  const { getToken } = useAuth();
  const navigate = useNavigate();

  // Réinitialisation du formulaire après succès
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTargetAmount('');
    setImage(null);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    // Validation des champs requis
    if (!title || !description || !targetAmount) {
      setErrorMessage("Veuillez remplir tous les champs requis.");
      setIsLoading(false);
      return;
    }

    // Validation du montant cible
    if (isNaN(parseFloat(targetAmount)) || parseFloat(targetAmount) <= 0) {
      setErrorMessage("Le montant cible doit être un nombre positif.");
      setIsLoading(false);
      return;
    }

    // Vérification du token d'authentification
    const token = getToken();
    if (!token) {
      setErrorMessage("Erreur : Vous n'êtes pas authentifié. Veuillez vous connecter.");
      setIsLoading(false);
      return;
    }

    // Préparation des données du formulaire
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('targetAmount', targetAmount);
    if (image) {
      formData.append('image', image);
    }

    try {
      // Envoi de la requête POST à l'API
      const response = await fetch('http://localhost:4000/api/campaigns', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Ajout du token dans l'en-tête
        },
        body: formData,
      });

      if (response.ok) {
        // Succès : afficher un message et réinitialiser le formulaire
        setSuccessMessage("Campagne créée avec succès !");
        resetForm();
        setTimeout(() => navigate('/'), 2000); // Redirection après 2 secondes
      } else {
        // Gestion des erreurs côté serveur
        const errorData = await response.json();
        console.error('Erreur lors de la création de la campagne :', errorData);
        setErrorMessage(errorData.message || "Une erreur s'est produite lors de la création de la campagne.");
      }
    } catch (error) {
      // Gestion des erreurs côté client (réseau ou autre)
      console.error('Erreur réseau ou autre :', error);
      setErrorMessage("Impossible de créer la campagne. Vérifiez votre connexion ou contactez l'administrateur.");
    } finally {
      // Désactiver l'indicateur de chargement
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-campaign-form">
      {/* Affichage des messages d'erreur et de succès */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Champs du formulaire */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la campagne"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description de la campagne"
        required
      />
      <input
        type="number"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        placeholder="Montant cible"
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />

      {/* Bouton de soumission */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Création en cours...' : 'Créer la campagne'}
      </button>
    </form>
  );
};

export default CreateCampaignForm;
