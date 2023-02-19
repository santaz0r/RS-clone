import React from 'react';

import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks';
import { getCurrentUserData, getIsLogin } from '../../../store/users';

function ProtectedAdminRoute({ children }: { children: React.ReactElement }) {
  const isLogin = useAppSelector(getIsLogin());
  const { role } = useAppSelector(getCurrentUserData());
  const isAdmin = role === 'admin';
  if (!isLogin || !isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedAdminRoute;
