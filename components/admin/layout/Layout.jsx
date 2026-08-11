'use client';

import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

function Layout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/malcolmX/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/malcolmX/users', label: 'Kullanıcılar', icon: '👥' },
    { path: '/malcolmX/subscribers', label: 'Aboneler', icon: '⭐' },
    { path: '/malcolmX/solved-questions', label: 'Çözülen Sorular', icon: '✅' },
    { path: '/malcolmX/feedback', label: 'Geri Bildirimler', icon: '💬' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>AI Math Solver</h2>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      <div className="main-content">
        <header className="header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <h1 className="page-title">
            {menuItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="header-actions">
            <div className="user-info">Admin</div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
}

export default Layout;

