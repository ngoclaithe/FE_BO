import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import PrivateRoute from './PrivateRoute'; 
import TradePage from '../pages/TradePage';
import AdminDashboard from '../pages/AdminDashboard'; 
import { useAuth } from '../context/AuthContext';
import AboutPage from '../pages/AboutPage';
import WalletPage from '../pages/WalletPage';
const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate('/');
  }, [navigate, logout]);

  return null;
};

export const routes = [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/LoginPage',
    element: <LoginPage />,
  },
  {
    path: '/HomePage',
    element: (
      <PrivateRoute allowedRoles={['guest']}>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: '/page-aboutus',
    element: (
      <PrivateRoute allowedRoles={['guest','admin']}>
        <AboutPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/wallet',
    element: (
      <PrivateRoute allowedRoles={['guest']}>
        <WalletPage />
      </PrivateRoute>
    ),
  },  
  {
    path: '/trade',
    element: (
      <PrivateRoute allowedRoles={['guest']}>
        <TradePage />
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/dashboard', 
    element: (
      <PrivateRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];