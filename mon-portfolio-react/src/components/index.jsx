// src/components/Main.jsx
import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/api';

const Main = ({ campaigns, onCampaignSelect, selectedCampaign }) => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    campaignId: selectedCampaign,
    amount: '',
    donorName: '',
    donorEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.amount <= 0) {
      setMessage('Le montant du don doit être positif.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Votre don a été effectué avec succès !');
      } else {
        setMessage('Erreur lors du don. Essayez à nouveau.');
      }
    } catch (error) {
      setMessage('Erreur de connexion avec le serveur. Veuillez réessayer plus tard.');
    }
  };

  return (
    <main>
      <section id="campaigns">
        <h2>Campagnes de dons</h2>
        <ul id="campaignList">
          {campaigns.map((campaign) => (
            <li key={campaign._id}>
              {campaign.title} - {campaign.raisedAmount}€ / {campaign.targetAmount}€
            </li>
          ))}
        </ul>
      </section>
      <section id="donationForm">
        <h2>Faire un Don</h2>
        <div id="message">{message}</div>
        <form id="donation-form" onSubmit={handleSubmit}>
          <label htmlFor="campaignId">Choisir une campagne :</label>
          <select id="campaignId" name="campaignId" value={formData.campaignId} onChange={(e) => { handleChange(e); onCampaignSelect(e.target.value); }}>
            <option value="">Sélectionner une campagne</option>
            {campaigns.map((campaign) => (
              <option key={campaign._id} value={campaign._id}>
                {campaign.title}
              </option>
            ))}
          </select>
          <label htmlFor="amount">Montant du Don (€) :</label>
          <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} placeholder="Entrez le montant" min="1" />
          <label htmlFor="donorName">Nom du Donateur :</label>
          <input type="text" id="donorName" name="donorName" value={formData.donorName} onChange={handleChange} placeholder="Votre nom" />
          <label htmlFor="donorEmail">Email du Donateur :</label>
          <input type="email" id="donorEmail" name="donorEmail" value={formData.donorEmail} onChange={handleChange} placeholder="Votre email" />
          <button type="submit">Faire un Don</button>
        </form>
      </section>
    </main>
  );
};

export default Main;
