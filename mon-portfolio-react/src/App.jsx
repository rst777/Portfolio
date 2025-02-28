import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import DonationForm from './components/DonationForm';
import AboutPage from './components/AboutPage';
import CampaignDetails from './components/CampaignDetails';

import './styles/App.css';
import './styles/style.css';
import './styles/index.css';

function App() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/donation-campaigns');
        const data = await response.json();
        console.log('Campagnes récupérées :', data);
        setCampaigns(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des campagnes', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <router>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage campaigns={campaigns} />} />
        <Route path="/dons" element={<DonationForm campaigns={campaigns} />} />
        <Route path="/propos" element={<AboutPage />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
      </Routes>
      <Footer />
    </div>
    </router>
  );
}

export default App;
