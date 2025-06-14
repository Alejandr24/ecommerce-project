"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const parts = storedToken.split('.');
      if (parts.length === 3) {
        const payload = parts[1];
        const decodedPayload = base64UrlDecode(payload);
        const decoded = JSON.parse(decodedPayload);
        setUser({ username: decoded.username, role: decoded.role });
        setToken(storedToken); 
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/login', credentials);
      localStorage.setItem('token', data.token);

      const decoded = JSON.parse(atob(data.token.split('.')[1]));
      setUser({ username: decoded.username, role: decoded.role });
      setToken(data.token); 

      router.push('/');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };


  const register = async (newUser) => {
    try {
      await axios.post('http://localhost:3001/api/auth/register', newUser);
      await login({ username: newUser.username, password: newUser.password });
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

export const useAuth = () => useContext(AuthContext);
