import React from 'react';
import LoadingToRedirect from '../LoadingToRedirect';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    return <LoadingToRedirect />;
  }

  const user = JSON.parse(userStr);

  const accessToken = user.accessToken;
  if (!accessToken) {
    return <LoadingToRedirect />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
