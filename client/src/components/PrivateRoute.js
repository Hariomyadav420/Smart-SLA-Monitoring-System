import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, user }) => {
  // Agar user logged in nahi hai, toh use login page par bhej do
  if (!user) {
    return <Navigate to="/" />;
  }

  // Agar logged in hai, toh page dikhao
  return children;
};

export default PrivateRoute;