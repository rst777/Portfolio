import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import DonationForm from './components/DonationForm';
import AboutPage from './components/AboutPage';
import CampaignDetails from './components/CampaignDetails';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import RegisterForm from './components/RegisterForm';
import CreateCampaignForm from './components/CreateCampaignForm';


import './styles/Responsive.css';
import './styles/App.css';
import './styles/Global.css';
import './styles/Index.css';

function AppContent() {
  const [campaigns, setCampaigns] = useState([]);
  const { getToken } = useAuth(); // Utilisez useAuth ici

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = getToken(); // Obtenez le token
        const response = await fetch('http://localhost:4000/api/donation-campaigns', {
          headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token aux headers
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Campagnes récupérées :', data);
          setCampaigns(data);
        } else {
          console.error('Erreur lors de la récupération des campagnes', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des campagnes', error);
      }
    };

    setTimeout(() => {
      fetchCampaigns();
    }, 1000); // Attendre 1 seconde avant de faire la requête
  }, [getToken]); // Ajoutez getToken comme dépendance


  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage campaigns={campaigns} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/propos" element={<AboutPage />} />
          <Route path="/register" element={<RegisterForm />} />
          {/* Routes protégées */}
          <Route element={<PrivateRoute />}>
            <Route path="/dons" element={<DonationForm campaigns={campaigns} />} />
            <Route path="/campaign/:id" element={<CampaignDetails />} />
            <Route path="/create-campaign" element={<CreateCampaignForm />} />
          </Route>
          <Route path="*" element={<NotFound />} /> {/* Route pour gérer les 404 */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
