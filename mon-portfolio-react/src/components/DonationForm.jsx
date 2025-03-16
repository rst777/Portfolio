import React, { useState, useEffect } from 'react';
import '../styles/DonationForm.css';
import '../styles/Responsive.css';

const DonationForm = ({ campaigns = [] }) => {
  const [formData, setFormData] = useState({
    campaignId: '',
    amount: '',
    donorName: '',
    donorEmail: '',
  });

  const [message, setMessage] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    if (formData.campaignId) {
      const campaign = campaigns.find(c => c._id === formData.campaignId);
      setSelectedCampaign(campaign);
    } else {
      setSelectedCampaign(null);
    }
  }, [formData.campaignId, campaigns]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation améliorée
    if (!/^\d+(\.\d{1,2})?$/.test(formData.amount)) {
      setMessage('Format invalide. Utilisez un nombre avec maximum 2 décimales.');
      return;
    }

    const amount = parseFloat(formData.amount);

    if (amount > 1000000) {
      setMessage('Le montant maximum par don est de 1 000 000 €');
      return;
    }

    if (!formData.campaignId || formData.amount <= 0 || !formData.donorName || !formData.donorEmail) {
      setMessage('Veuillez remplir tous les champs correctement.');
      return;
    }

    try {
      // Récupérer le token depuis le localStorage
      const token = localStorage.getItem('authToken');

      const response = await fetch('http://localhost:4000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Votre don a été effectué avec succès !');
        setFormData({
          campaignId: '',
          amount: '',
          donorName: '',
          donorEmail: '',
        });
      } else {
        const errorData = await response.json();
        setMessage(`Erreur : ${errorData.error || 'Erreur lors du don. Essayez à nouveau.'}`);
      }
    } catch (error) {
      setMessage('Erreur de connexion avec le serveur. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="donation-container">
      <form id="donation-form" onSubmit={handleSubmit}>
        <h2>Faire un Don</h2>
        <div id="message">{message}</div>

        <label htmlFor="campaignId">Choisir une campagne :</label>
        <select id="campaignId" name="campaignId" value={formData.campaignId} onChange={handleChange}>
          <option value="">Sélectionner une campagne</option>
          {campaigns.map((campaign) => (
            <option key={campaign._id} value={campaign._id}>
              {campaign.title}
            </option>
          ))}
        </select>

        {selectedCampaign && (
          <div className="selected-campaign-info">
            <img
              src={`http://localhost:4000/uploads/${selectedCampaign.image}`}
              alt={selectedCampaign.title}
              onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/default-campaign.jpg'; }}
            />
            <h3>{selectedCampaign.title}</h3>
            <p>{selectedCampaign.description}</p>
          </div>
        )}

        <label htmlFor="amount">Montant du Don (€) :</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Entrez le montant"
          min="1"
          max="1000000"
          step="0.01"
          onInput={(e) => {
            if (e.target.value.length > 10) e.target.value = e.target.value.slice(0,10);
            if (parseFloat(e.target.value) > 1000000) e.target.value = 1000000;
          }}
        />
        <label htmlFor="donorName">Nom du Donateur :</label>
        <input type="text" id="donorName" name="donorName" value={formData.donorName} onChange={handleChange} placeholder="Votre nom" />
        <label htmlFor="donorEmail">Email du Donateur :</label>
        <input type="email" id="donorEmail" name="donorEmail" value={formData.donorEmail} onChange={handleChange} placeholder="Votre email" />
        <button type="submit">Faire un Don</button>
      </form>
    </div>
  );
};

export default DonationForm;
