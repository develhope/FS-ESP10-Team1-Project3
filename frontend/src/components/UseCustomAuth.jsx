import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useCustomAuth = () => {
  const { isAuthenticated: isAuth0Authenticated, user: auth0User } = useAuth0();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(isAuth0Authenticated || !!token);
      setUser(auth0User || JSON.parse(localStorage.getItem('userInfo')));
    };

    checkAuthentication();
  }, [isAuth0Authenticated, auth0User]);

  return { isAuthenticated, user };
};