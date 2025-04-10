import React from 'react';
import { useLocation } from 'react-router-dom';
import './BackgroundWrapper.css'; 

const BackgroundWrapper = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/'; // O '/login' si esa es tu ruta de login
  const isDashboardPage = location.pathname === '/dashboard';

  let backgroundClass = '';
  if (isLoginPage) {
    backgroundClass = 'login-background';
  } else if (isDashboardPage) {
    backgroundClass = 'dashboard-background';
  }

  return <div className={`app-container ${backgroundClass}`}>{children}</div>;
};

export default BackgroundWrapper;