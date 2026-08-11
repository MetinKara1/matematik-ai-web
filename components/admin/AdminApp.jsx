'use client';

import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import SolvedQuestions from './pages/SolvedQuestions';
import Subscribers from './pages/Subscribers';
import Users from './pages/Users';
import Layout from './layout/Layout';

export default function AdminApp() {
  const [ready, setReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem('authToken')));
    setReady(true);
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (!ready) return <div className="admin-loading">Yükleniyor...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/malcolmX/login" element={isAuthenticated ? <Navigate to="/malcolmX/dashboard" replace /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/malcolmX" element={isAuthenticated ? <Layout onLogout={logout} /> : <Navigate to="/malcolmX/login" replace />}>
          <Route index element={<Navigate to="/malcolmX/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="solved-questions" element={<SolvedQuestions />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
