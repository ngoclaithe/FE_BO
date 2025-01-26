import React from 'react';
import { Navigate } from 'react-router-dom';
import { Header } from './Header';

export const Layout = ({ children }) => {
  const role = sessionStorage.getItem('role');
  // const token = sessionStorage.getItem('token');

  // if (!token) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-16 min-h-screen">
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};