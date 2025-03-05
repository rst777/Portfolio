/* src/hooks/useAuth.jsx */

import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getToken = () => {
    return localStorage.getItem('authToken');
  }
  const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décoder le payload du JWT
    return decodedToken.exp * 1000 < Date.now(); // Vérifier si la date d'expiration est passée
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !isTokenExpired(token)) {
      setUser({ token });
    } else {
      logout(); // Déconnecter si le token est expiré ou invalide
    }
  }, []);

  const setToken = (token) => {
    localStorage.setItem('authToken', token);
  }

  const login = (token) => {
    console.log('Login appelé avec token:', token);
    setToken(token);
    console.log('Token stocké dans localStorage:', localStorage.getItem('authToken'));
    setUser({ token });
    console.log('User state après login:', { token });
  };


  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
