'use client';

import { useState, useEffect } from 'react';
import { feedbackAPI } from '../../../lib/api';

function Feedback() {
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    loadFeedbacks();
  }, [currentPage]);

  const loadFeedbacks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await feedbackAPI.getAll({ page: currentPage, pageSize });
      // Response format: { Data: [], Page: 1, PageSize: 20, TotalCount: 0, TotalPages: 0, HasMore: false }
      const feedbacksData = response.Data || response.data || (Array.isArray(response) ? response : []);
      setFeedbacks(Array.isArray(feedbacksData) ? feedbacksData : []);
      setTotalCount(response.TotalCount || response.totalCount || 0);
      setTotalPages(response.TotalPages || response.totalPages || 0);
      setHasMore(response.HasMore || response.hasMore || false);
    } catch (err) {
      const errorMessage = err.message || 'Geri bildirimler yüklenirken bir hata oluştu';
      setError(errorMessage);
      console.error('Feedback API Error:', err);
      
      // If it's a 401 error, check if we should logout
      if (errorMessage.includes('Yetkilendirme') || errorMessage.includes('401')) {
        const token = localStorage.getItem('authToken');
        if (!token) {
          window.location.href = '/malcolmX/login';
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu geri bildirimi silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      await feedbackAPI.delete(id);
      setFeedbacks(feedbacks.filter(f => (f.Id || f.id) !== id));
      // Reload to refresh pagination
      loadFeedbacks();
    } catch (err) {
      alert(err.message || 'Geri bildirim silinirken bir hata oluştu');
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await feedbackAPI.markAsRead(id);
      setFeedbacks(feedbacks.map(f => {
        const feedbackId = f.Id || f.id;
        if (feedbackId === id) {
          return { ...f, Status: 'Okundu', IsRead: true, status: 'Okundu', isRead: true };
        }
        return f;
      }));
    } catch (err) {
      alert(err.message || 'Geri bildirim okundu olarak işaretlenirken bir hata oluştu');
    }
  };

  const filteredFeedbacks = feedbacks.filter(f => {
    const user = f.UserDisplayName || f.UserName || f.user || f.userName || '';
    const message = f.Message || f.Text || f.message || f.text || '';
    const email = f.UserEmail || f.Email || f.email || f.userEmail || '';
    return (
      user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  const renderStars = (rating) => {
    const numRating = typeof rating === 'number' ? rating : parseInt(rating) || 0;
    return '⭐'.repeat(numRating) + '☆'.repeat(5 - numRating);
  };

  if (loading) {
    return (
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--danger-color)' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="search-box">
          <input
            type="text"
            placeholder="Geri bildirim ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="page-actions">
          <button className="btn-primary">Filtrele</button>
        </div>
      </div>

      <div className="table-count-info">
        <span>Toplam: <strong>{totalCount > 0 ? totalCount : filteredFeedbacks.length}</strong> geri bildirim</span>
        {searchTerm && filteredFeedbacks.length !== feedbacks.length && (
          <span className="filtered-info">({feedbacks.length} kayıttan {filteredFeedbacks.length} tanesi gösteriliyor)</span>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Kullanıcı</th>
              <th>Email</th>
              <th>Mesaj</th>
              <th>Puan</th>
              <th>Tarih</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((f) => {
                const feedbackId = f.Id || f.id;
                const isRead = f.IsRead !== undefined ? f.IsRead : (f.isRead !== undefined ? f.isRead : false);
                const status = f.Status || f.status || (isRead ? 'Okundu' : 'Yeni');
                const isNew = status === 'Yeni' || status === 'new' || !isRead;
                
                return (
                  <tr key={feedbackId}>
                    <td>{feedbackId ? (typeof feedbackId === 'string' ? feedbackId.substring(0, 8) : feedbackId) : '-'}</td>
                    <td>{f.UserDisplayName || f.UserName || f.user || f.userName || '-'}</td>
                    <td>{f.UserEmail || f.Email || f.email || f.userEmail || '-'}</td>
                    <td className="feedback-message">{f.Message || f.Text || f.message || f.text || f.FeedbackText || '-'}</td>
                    <td>
                      <span className="rating">{f.Emoji}</span>
                    </td>
                    <td>{formatDate(f.CreatedAt || f.createdAt || f.Created_At || f.date || f.created_at)}</td>
                    <td>
                      <span className={`status-badge ${isNew ? 'new' : 'read'}`}>
                        {f.TopicType}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {isNew && (
                          <button className="btn-icon" title="Okundu İşaretle" onClick={() => handleMarkAsRead(feedbackId)}>✓</button>
                        )}
                        <button className="btn-icon" title="Yanıtla">💬</button>
                        <button className="btn-icon" title="Sil" onClick={() => handleDelete(feedbackId)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  Geri bildirim bulunamadı
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-card-view">
        {filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((f) => {
            const feedbackId = f.Id || f.id;
            const isRead = f.IsRead !== undefined ? f.IsRead : (f.isRead !== undefined ? f.isRead : false);
            const status = f.Status || f.status || (isRead ? 'Okundu' : 'Yeni');
            const isNew = status === 'Yeni' || status === 'new' || !isRead;
            
            return (
              <div key={feedbackId} className="mobile-card">
                <div className="mobile-card-header">
                  <div className="mobile-card-title">{f.UserDisplayName || f.UserName || f.user || f.userName || 'İsimsiz Kullanıcı'}</div>
                  <div className="mobile-card-actions">
                    {isNew && (
                      <button className="btn-icon" title="Okundu İşaretle" onClick={() => handleMarkAsRead(feedbackId)}>✓</button>
                    )}
                    <button className="btn-icon" title="Yanıtla">💬</button>
                    <button className="btn-icon" title="Sil" onClick={() => handleDelete(feedbackId)}>🗑️</button>
                  </div>
                </div>
                <div className="mobile-card-body">
                  <div className="mobile-card-row">
                    <div className="mobile-card-label">Email</div>
                    <div className="mobile-card-value">{f.UserEmail || f.Email || f.email || f.userEmail || '-'}</div>
                  </div>
                  <div className="mobile-card-row">
                    <div className="mobile-card-label">Mesaj</div>
                    <div className="mobile-card-value" style={{ lineHeight: '1.5' }}>
                      {f.Message || f.Text || f.message || f.text || f.FeedbackText || '-'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="mobile-card-row" style={{ flex: '1', minWidth: '80px' }}>
                      <div className="mobile-card-label">Puan</div>
                      <div className="mobile-card-value" style={{ fontSize: '1.25rem' }}>
                        <span className="rating">{f.Emoji}</span>
                      </div>
                    </div>
                    <div className="mobile-card-row" style={{ flex: '1', minWidth: '120px' }}>
                      <div className="mobile-card-label">Durum</div>
                      <div className="mobile-card-value">
                        <span className={`status-badge ${isNew ? 'new' : 'read'}`}>
                          {f.TopicType}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mobile-card-row">
                    <div className="mobile-card-label">Tarih</div>
                    <div className="mobile-card-value">{formatDate(f.CreatedAt || f.createdAt || f.Created_At || f.date || f.created_at)}</div>
                  </div>
                  <div className="mobile-card-row">
                    <div className="mobile-card-label">ID</div>
                    <div className="mobile-card-value" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {feedbackId ? (typeof feedbackId === 'string' ? feedbackId.substring(0, 8) : feedbackId) : '-'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            Geri bildirim bulunamadı
          </div>
        )}
      </div>

      <div className="pagination">
        <button 
          className="pagination-btn" 
          disabled={currentPage === 1 || loading}
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        >
          Önceki
        </button>
        <span className="pagination-info">
          Sayfa {currentPage} / {totalPages || 1} (Toplam: {totalCount})
        </span>
        <button 
          className="pagination-btn" 
          disabled={!hasMore || currentPage >= totalPages || loading}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Sonraki
        </button>
      </div>
    </div>
  );
}

export default Feedback;

