import React, { useContext } from 'react';
import { RouteProps, Navigate } from 'react-router-dom';
import AccountContext from '../context/AccountContext';

const PrivateRoute: React.FC<RouteProps> = ({ element }) => {
  const accountContext = useContext(AccountContext);

  if (!accountContext) return <Navigate to='/login' />;

  const { currentSession, loading } = accountContext;

  if (loading) return <div>Loading...</div>;

  return currentSession ? element : <Navigate to='/login' />;
};

export default PrivateRoute;
