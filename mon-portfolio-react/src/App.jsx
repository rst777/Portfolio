// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
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
import PrivacyPolicy from './components/PrivacyPolicy';
import Cookies from './components/Cookies';
import Terms from './components/Terms';

import './styles/Responsive.css';
import './styles/App.css';
import './styles/Global.css';
import './styles/HomePage.css';

function AppContent() {
  const [campaigns, setCampaigns] = useState([]);
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const token = getToken();
        const response = await fetch('http://localhost:4000/api/campaigns', {
          headers: {
            'Authorization': `Bearer ${token}`
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
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      fetchCampaigns();
    }, 1000);
  }, [getToken]);

  return (
  <>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage campaigns={campaigns} isLoading={isLoading} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/propos" element={<AboutPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/terms" element={<Terms />} />

          {/* Routes protégées */}
          <Route element={<PrivateRoute />}>
            <Route path="/dons" element={<DonationForm campaigns={campaigns} isLoading={isLoading} />} />
            <Route path="/campaign/:id" element={<CampaignDetails />} />
            <Route path="/create-campaign" element={<CreateCampaignForm />} />
            <Route path="/campaigns" element={<HomePage campaigns={campaigns} isLoading={isLoading} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
