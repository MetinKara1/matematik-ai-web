'use client';

import { useState, useEffect } from 'react';
import { dashboardAPI } from '../../../lib/api';
const logo = '/assets/MatAI-logo.png';

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [userDistribution, setUserDistribution] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [versionInfo, setVersionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const [statsData, weeklyData, distributionData, activityData, versionData] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getWeeklyActivity(),
        dashboardAPI.getUserDistribution(),
        dashboardAPI.getRecentActivity(),
        dashboardAPI.checkVersion().catch(err => {
          // Version check is optional, don't fail the whole dashboard if it fails
          console.warn('Version check failed:', err);
          return null;
        }),
      ]);

      // Set version info if available
      if (versionData) {
        setVersionInfo(versionData);
      }

      // Stats formatı: { totalUsers, activeSubscribers, solvedQuestions, feedbacks }
      setStats([
        { label: 'Toplam Kullanıcı', value: formatNumber(statsData.totalUsers || 0), change: `+${statsData.usersChange || 0}%`, icon: '👥', color: '#6366f1' },
        { label: 'Aktif Aboneler', value: formatNumber(statsData.activeSubscribers || 0), change: `+${statsData.subscribersChange || 0}%`, icon: '⭐', color: '#8b5cf6' },
        { label: 'Çözülen Sorular', value: formatNumber(statsData.solvedQuestions || 0), change: `+${statsData.questionsChange || 0}%`, icon: '✅', color: '#10b981' },
        { label: 'Geri Bildirimler', value: formatNumber(statsData.feedbacks || 0), change: `+${statsData.feedbackChange || 0}%`, icon: '💬', color: '#f59e0b' },
      ]);

      // Weekly activity formatı: [{ day, value }]
      setChartData(weeklyData || []);

      // User distribution formatı: [{ label, value, percentage, color }]
      setUserDistribution(distributionData || []);

      // Recent activity formatı: [{ type, text, time }]
      setRecentActivity(activityData || []);
    } catch (err) {
      setError(err.message || 'Veriler yüklenirken bir hata oluştu');
      // Fallback to mock data on error
      setStats([
        { label: 'Toplam Kullanıcı', value: '0', change: '+0%', icon: '👥', color: '#6366f1' },
        { label: 'Aktif Aboneler', value: '0', change: '+0%', icon: '⭐', color: '#8b5cf6' },
        { label: 'Çözülen Sorular', value: '0', change: '+0%', icon: '✅', color: '#10b981' },
        { label: 'Geri Bildirimler', value: '0', change: '+0%', icon: '💬', color: '#f59e0b' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('tr-TR').format(num);
  };

  const maxValue = chartData.length > 0 ? Math.max(...chartData.map(d => d.value || 0)) : 1;

  const getActivityIcon = (type) => {
    const icons = {
      question: '✅',
      user: '👤',
      subscription: '⭐',
      feedback: '💬',
    };
    return icons[type] || '📌';
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div style={{ textAlign: 'center', padding: '2rem' }}>Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--danger-color)' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <img src={logo} alt="MatAI Logo" className="dashboard-logo" />
        <h2 className="dashboard-title">Dashboard</h2>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change positive">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Haftalık Aktivite</h3>
          <div className="bar-chart">
            {chartData.map((item, index) => (
              <div key={index} className="bar-item">
                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{
                      height: `${(item.value / maxValue) * 100}%`,
                      backgroundColor: '#6366f1',
                    }}
                  ></div>
                </div>
                <div className="bar-label">{item.day}</div>
                <div className="bar-value">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Kullanıcı Dağılımı</h3>
          <div className="pie-chart">
            <svg viewBox="0 0 200 200" className="pie-svg">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="40"
              />
              {userDistribution.map((item, index) => {
                const percentage = item.percentage || 0;
                const circumference = 2 * Math.PI * 80;
                const offset = userDistribution.slice(0, index).reduce((sum, i) => sum + (i.percentage || 0), 0);
                const dashArray = `${(circumference * percentage) / 100} ${circumference}`;
                const dashOffset = -(circumference * offset) / 100;
                
                return (
                  <circle
                    key={index}
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke={item.color || '#6366f1'}
                    strokeWidth="40"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    transform="rotate(-90 100 100)"
                  />
                );
              })}
            </svg>
            <div className="pie-legend">
              {userDistribution.map((item, index) => (
                <div key={index} className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: item.color || '#6366f1' }}></span>
                  <span>{item.label} ({item.percentage || 0}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <div className="activity-card">
          <h3>Son Aktiviteler</h3>
          <div className="activity-list">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                  <div className="activity-content">
                    <div className="activity-text">{activity.text}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                Henüz aktivite yok
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

