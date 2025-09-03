import React, { createContext, useState, useEffect, useContext } from 'react';
import { influencerService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar se já existe um usuário logado (ao iniciar a aplicação)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (email, senha) => {
    try {
      setError(null);
      const data = await influencerService.login({ email, senha });
      
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      setCurrentUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
      throw err;
    }
  };

  // Registro
  const register = async (userData) => {
    try {
      setError(null);
      const newUser = await influencerService.register(userData);
      return newUser;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar');
      throw err;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  // Verificar se está autenticado
  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      logout, 
      register, 
      isAuthenticated,
      loading,
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar a autenticação
export const useAuth = () => useContext(AuthContext);