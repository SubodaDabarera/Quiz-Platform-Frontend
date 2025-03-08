import useAuth from "../hooks/useAuth";
import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

function ProtectedRoute ({ children, allowedRoles }: ProtectedRouteProps) {
  const { checkUser, getToken } = useAuth();
  const { token } = getToken();

  const hasRequiredRole = allowedRoles.some(role => checkUser(role));

  if (!token) {
    alert("To do this operation, Please login!")
    return <Navigate to={'/dashboard'} />
  }

  if (!hasRequiredRole) {
    alert("You are not allowed to this operation!")
    return <Navigate to={'/dashboard'} />
  }

  return <>{children}</>
}

export default ProtectedRoute ;
