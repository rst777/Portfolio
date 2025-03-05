import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(''); // Nouvel état pour le message de statut
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(''); // Réinitialiser le statut à chaque tentative

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok && data.token) {
        login(data.token);
        setStatus('Connexion réussie !');
        setTimeout(() => {
          const destination = location.state?.from || '/';
          navigate(destination);
        }, 1500); // Rediriger après 1.5 secondes pour que l'utilisateur puisse voir le message
      } else {
        setStatus('Erreur : ' + (data.message || 'Échec de la connexion'));
      }
    } catch (error) {
      setStatus('Erreur de connexion au serveur');
    }
  };

  return (
	<div className="login-page">
		<div className="login-form-container">
		<form className="login-form" onSubmit={handleSubmit}>
			<h2>Connexion</h2>
			{status && <div className={status.includes('réussie') ? 'success' : 'error'}>{status}</div>}
			<input
			type="email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			placeholder="Email"
			required
			/>
			<input
			type="password"
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			placeholder="Mot de passe"
			required
			/>
			<button type="submit">Se connecter</button>
		</form>
		</div>
	</div>
  );

};

export default LoginForm;
