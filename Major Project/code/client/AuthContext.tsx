import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthContextType } from '../types';
import axios from 'axios';
import { env } from '../config';


const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signOut: () => { },
  setUser: () => { },
  setIsAuthenticated: () => { }
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

useEffect(() => {
  const checkAuth = async () => {
    try {
      const { data } = await axios.get(
        `${env.backend_api}/user/verify_user`,
        { withCredentials: true }
      );

      if (data?.success) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
    }
  };

  checkAuth();
}, []);

  const signOut = async () => {
    await axios.get(
      `${env.backend_api}/user/signout`,
      { withCredentials: true }
    )
      .catch(err => err)

    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      signOut, 
      setUser,
      setIsAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};