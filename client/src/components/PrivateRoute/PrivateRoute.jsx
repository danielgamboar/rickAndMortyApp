import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
