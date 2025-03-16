// src/components/CreateCampaignForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/CreateCampaignForm.css';
import '../styles/Responsive.css';
import backgroundImage from '/assets/images/create-background.jpg';


const CreateCampaignForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    startDate: '',
    endDate: '',
    image: null
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { getToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    // Validation...

    try {
      const token = getToken();
      if (!token) throw new Error("Vous n'êtes pas authentifié. Veuillez vous connecter.");

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch('http://localhost:4000/api/campaigns', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Une erreur s'est produite lors de la création de la campagne.");

      setMessage("Campagne créée avec succès !");
      navigate('/campaigns');
    } catch (error) {
      setMessage(error.message || "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-campaign-container" style={{backgroundImage: `url(${backgroundImage})`}}>
      <h2 className="form-title">Créer une nouvelle campagne</h2>
      {message && <p className={`message ${message.includes("succès") ? "success" : "error"}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="modern-form">
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titre de la campagne"
            required
            className="modern-input"
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description de la campagne"
            required
            className="modern-textarea"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            placeholder="Objectif (€)"
            required
            className="modern-input"
          />
        </div>
        <div className="form-group date-inputs">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="modern-input"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="modern-input"
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept=".jpg,.jpeg,.png"
            className="modern-file-input"
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={isLoading} className="modern-button primary">
            {isLoading ? "Création en cours..." : "Créer la campagne"}
          </button>
          <button type="button" onClick={() => navigate('/campaigns')} className="modern-button secondary">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaignForm;
