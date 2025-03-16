import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterForm.css';
import DynamicImage from './DynamicImage';
import registerImage from '/assets/images/register-image.jpg';


const RegisterForm = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Message de succès
  const [errorMessage, setErrorMessage] = useState(''); // Message d'erreur
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // Réinitialiser le message de succès
    setErrorMessage(''); // Réinitialiser le message d'erreur

    try {
      const response = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Afficher le message de succès
        setTimeout(() => {
          navigate('/login'); // Rediriger vers la page de connexion après un délai
        }, 2000);
      } else {
        setErrorMessage(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className="register-page">
    <DynamicImage src={registerImage} alt="Register" />
    <div className="register-form-container">
        <form className="register-form" onSubmit={handleRegister}>
          <h2>Créer un compte</h2>
          {message && <div className="success-message">{message}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
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
    </div>
  );
};

export default RegisterForm;
