import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/CampaignDetails.css';

const CampaignDetails = () => {
  const { id } = useParams(); // Récupère l'ID de la campagne depuis l'URL
  const [campaign, setCampaign] = useState(null); // État pour stocker les détails de la campagne
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Récupère le token d'authentification depuis le localStorage

        const response = await fetch(`http://localhost:4000/api/campaigns/${id}`, {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [id]);

  const shareCampaign = () => {
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: `Découvrez la campagne "${campaign.title}" et aidez-nous à atteindre notre objectif !`,
        url: window.location.href,
      })
        .then(() => {
          console.log('Campagne partagée avec succès');
        })
        .catch((error) => {
          console.error('Erreur lors du partage', error);
        });
    } else {
      const shareUrl = encodeURIComponent(window.location.href);
      const shareText = encodeURIComponent(`Découvrez la campagne "${campaign.title}" et aidez-nous à atteindre notre objectif !`);

      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
      const linkedinUrl = `https://www.linkedin.com/sharing/share?url=${shareUrl}`;
      const whatsappUrl = `https://wa.me/?text=${shareText}%20${shareUrl}`;
      const emailUrl = `mailto:?subject=Découvrez cette campagne&body=${shareText}%0A%0A${shareUrl}`;

      // Afficher les options dans une fenêtre modale
      const modal = document.getElementById('share-modal');
      if (modal) {
        modal.style.display = 'block';
      }

      // Contenu de la fenêtre modale
      const modalContent = `
        <h2>Partager cette campagne</h2>
        <a href="${facebookUrl}" target="_blank">Partager sur Facebook</a><br><br>
        <a href="${twitterUrl}" target="_blank">Partager sur Twitter</a><br><br>
        <a href="${linkedinUrl}" target="_blank">Partager sur LinkedIn</a><br><br>
        <a href="${whatsappUrl}" target="_blank">Partager sur WhatsApp</a><br><br>
        <a href="${emailUrl}">Partager par email</a>
      `;

      // Ajouter le contenu à la fenêtre modale
      const modalBody = document.getElementById('share-modal-content');
      if (modalBody) {
        modalBody.innerHTML = modalContent;
      }
    }
  };
  // Affichage en cas d'erreur
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Affichage pendant le chargement
  if (isLoading) {
    return <div className="loading-spinner">Chargement des détails de la campagne...</div>;
  }

  return (
    <div className="campaign-details">
      {/* Affiche l'image de la campagne */}
      {campaign.image && (
        <img
          src={`http://localhost:4000/uploads/${campaign.image}`}
          alt={campaign.title}
          className="campaign-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/images/default-campaign.jpg';
          }}
        />
      )}
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
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(campaign.raisedAmount / campaign.targetAmount) * 100}%` }}
          >
            <span className="progress-bar-text">
              {((campaign.raisedAmount / campaign.targetAmount) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="campaign-info">
        <h3>Informations</h3>
        <p>
          Créé par : <strong>{campaign.creatorName || 'Anonyme'}</strong>
        </p>
        <p>
          Date de début :{' '}
          <strong>{new Date(campaign.startDate).toLocaleDateString()}</strong>
        </p>
        <p>
          Date de fin :{' '}
          <strong>{new Date(campaign.endDate).toLocaleDateString()}</strong>
        </p>
      </div>

      {/* Actions possibles */}
      <div className="campaign-actions">
        <Link to="/dons" className="donate-button">
          Faire un don
        </Link>
        <button className="share-button" onClick={shareCampaign}>
          Partager
        </button>
      </div>
    </div>
  );
};

export default CampaignDetails;
