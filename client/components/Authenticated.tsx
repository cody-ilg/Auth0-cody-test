import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Custom hook to check if the user is authenticated
const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated;
};

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function IfAuthenticated({ children }: AuthWrapperProps) {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <>{children}</> : null;
}

export function IfNotAuthenticated({ children }: AuthWrapperProps) {
  const isNotAuthenticated = !useIsAuthenticated();
  return isNotAuthenticated ? <>{children}</> : null;
}
