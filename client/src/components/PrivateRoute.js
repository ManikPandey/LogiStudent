import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // If the user is logged in, show the page they are trying to access.
  // Otherwise, redirect them to the login page.
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;