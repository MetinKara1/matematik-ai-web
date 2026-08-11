'use client';

import { useState, useEffect } from 'react';
import { usersAPI } from '../../../lib/api';

function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await usersAPI.getAll({ page: currentPage, pageSize });
      // Response format: { Data: [], Page: 1, PageSize: 20, TotalCount: 0, TotalPages: 0, HasMore: false }
      const usersData = response.Data || response.data || (Array.isArray(response) ? response : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
      setTotalCount(response.TotalCount || response.totalCount || usersData.length);
      setTotalPages(response.TotalPages || response.totalPages || Math.ceil((response.TotalCount || usersData.length) / pageSize) || 1);
      setHasMore(response.HasMore !== undefined ? response.HasMore : (response.hasMore !== undefined ? response.hasMore : false));
    } catch (err) {
      const errorMessage = err.message || 'Kullanıcılar yüklenirken bir hata oluştu';
      setError(errorMessage);
      console.error('Users API Error:', err);
      
      // If it's a 401 error, check if we should logout
      if (errorMessage.includes('Yetkilendirme') || errorMessage.includes('401')) {
        // Check if token exists
        const token = localStorage.getItem('authToken');
        if (!token) {
          // No token, redirect to login
          window.location.href = '/malcolmX/login';
        }
        // Otherwise, just show the error
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      await usersAPI.delete(id);
      setUsers(users.filter(user => user.Id !== id));
    } catch (err) {
      alert(err.message || 'Kullanıcı silinirken bir hata oluştu');
    }
  };

  const filteredUsers = users.filter(user =>
    (user.DisplayName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.Email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.PhoneNumber || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            placeholder="Kullanıcı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="page-actions">
          <button className="btn-primary">Yeni Kullanıcı</button>
        </div>
      </div>

      <div className="table-count-info">
        <span>Toplam: <strong>{searchTerm ? filteredUsers.length : totalCount}</strong> kullanıcı</span>
        {searchTerm && filteredUsers.length !== users.length && (
          <span className="filtered-info">({users.length} kayıttan {filteredUsers.length} tanesi gösteriliyor)</span>
        )}
        {!searchTerm && (
          <span className="filtered-info">(Sayfa {currentPage} / {totalPages})</span>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>İsim</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Kayıt Tarihi</th>
              <th>Çözülen Soru</th>
              <th>Abonelik</th>
              <th>Geri Bildirim</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const formatDate = (dateString) => {
                  if (!dateString) return '-';
                  const date = new Date(dateString);
                  return date.toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                };

                return (
                  <tr key={user.Id}>
                    <td>{user.Id ? user.Id.substring(0, 8) + '...' : '-'}</td>
                    <td>{user.DisplayName || '-'}</td>
                    <td>{user.Email || '-'}</td>
                    <td>{user.PhoneNumber || '-'}</td>
                    <td>{formatDate(user.CreatedAt)}</td>
                    <td>{user.SolvedQuestionsCount || 0}</td>
                    <td>{user.SubscriptionsCount || 0}</td>
                    <td>{user.FeedbacksCount || 0}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon" title="Düzenle">✏️</button>
                        <button className="btn-icon" title="Sil" onClick={() => handleDelete(user.Id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  Kullanıcı bulunamadı
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-card-view">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const formatDate = (dateString) => {
              if (!dateString) return '-';
              const date = new Date(dateString);
              return date.toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              });
            };

            return (
              <div key={user.Id} className="mobile-card">
                <div className="mobile-card-header">
                  <div className="mobile-card-title">{user.DisplayName || 'İsimsiz Kullanıcı'}</div>
                  <div className="mobile-card-actions">
                    <button className="btn-icon" title="Düzenle">✏️</button>
                    <button className="btn-icon" title="Sil" onClick={() => handleDelete(user.Id)}>🗑️</button>
                  </div>
                </div>
                <div className="mobile-card-body">
                  <div className="mobile-card-row">
                    <div className="mobile-card-label">Email</div>
                    <div className="mobile-card-value">{user.Email || '-'}</div>
                  </div>
                  <div className="mobile-card-row">
                    <div className="mobile-card-label">Telefon</div>
                    <div className="mobile-card-value">{user.PhoneNumber || '-'}</div>
                  </div>
                  <div className="mobile-card-row">
                    <div className="mobile-card-label">Kayıt Tarihi</div>
                    <div className="mobile-card-value">{formatDate(user.CreatedAt)}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div className="mobile-card-row" style={{ flex: '1', minWidth: '80px' }}>
                      <div className="mobile-card-label">Çözülen Soru</div>
                      <div className="mobile-card-value" style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{user.SolvedQuestionsCount || 0}</div>
                    </div>
                    <div className="mobile-card-row" style={{ flex: '1', minWidth: '80px' }}>
                      <div className="mobile-card-label">Abonelik</div>
                      <div className="mobile-card-value" style={{ fontWeight: 600, color: 'var(--secondary-color)' }}>{user.SubscriptionsCount || 0}</div>
                    </div>
                    <div className="mobile-card-row" style={{ flex: '1', minWidth: '80px' }}>
                      <div className="mobile-card-label">Geri Bildirim</div>
                      <div className="mobile-card-value" style={{ fontWeight: 600 }}>{user.FeedbacksCount || 0}</div>
                    </div>
                  </div>
                  <div className="mobile-card-row">
                    <div className="mobile-card-label">ID</div>
                    <div className="mobile-card-value" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{user.Id ? user.Id.substring(0, 8) + '...' : '-'}</div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            Kullanıcı bulunamadı
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
          Sayfa {currentPage} / {totalPages || 1} {!searchTerm && `(Toplam: ${totalCount})`}
        </span>
        <button 
          className="pagination-btn" 
          disabled={!hasMore && currentPage >= totalPages || loading}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Sonraki
        </button>
      </div>
    </div>
  );
}

export default Users;

