import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = () => {
  const { user } = useAuth();
  console.log('PrivateRoute - état de l\'utilisateur:', user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
