import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  const { authState } = useContext(AuthContext);

  return authState.token && roles.includes(authState.role) ? (
    <Route {...rest} element={Component} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;