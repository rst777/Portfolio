import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterForm.css';

const RegisterForm = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
	  console.log('Statut de la réponse:', response.status, 'OK:', response.ok);
      const data = await response.json();
	  console.log('Données reçues:', data);
      if (response.ok) {
        console.log('Inscription réussie:', data);
        navigate('/login'); // Rediriger vers la page de connexion
      } else {
        console.error('Échec de l\'inscription:', data);
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
    <div className="register-form-container">
    <form className="register-form" onSubmit={handleRegister}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Prénom"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Nom"
        required
      />
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
      <button type="submit">S'inscrire</button>
    </form>
    </div>
  );
};

export default RegisterForm;
