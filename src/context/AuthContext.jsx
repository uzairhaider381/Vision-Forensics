import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading] = useState(false);

  const login = (email, _password) => {
    // Mock login logic
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      isAdmin: email === 'admin@vision.pro',
      credits: 10
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const register = (email, _password, name) => {
    // Mock register logic
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      isAdmin: false,
      credits: 5
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
