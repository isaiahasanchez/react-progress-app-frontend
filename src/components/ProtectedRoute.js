import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

// takes in children so this component can wrap around any react element
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If the user is not logged in, redirect to the login page The replace prop prevents the user from going back to the protected page they tried to access by replacing the current entry in the history stack. It enhances the security.
    return <Navigate to='/login' replace />;
  }

  // If the user is logged in, render the children components
  return children;
};

export default ProtectedRoute;
