import React from 'react';

import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks';
import { getIsLogin } from '../../../store/users';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const isLogin = useAppSelector(getIsLogin());
  if (!isLogin) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
