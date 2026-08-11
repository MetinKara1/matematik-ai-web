'use client';

import { useState, useEffect } from 'react';
import { subscribersAPI } from '../../../lib/api';

function Subscribers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    loadSubscribers();
  }, [currentPage]);

  const loadSubscribers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await subscribersAPI.getAll({ page: currentPage, pageSize });
      // Response format: { Data: [], Page: 1, PageSize: 20, TotalCount: 0, TotalPages: 0, HasMore: false }
      const subscribersData = response.Data || response.data || (Array.isArray(response) ? response : []);
      setSubscribers(Array.isArray(subscribersData) ? subscribersData : []);
      setTotalCount(response.TotalCount || response.totalCount || subscribersData.length);
      setTotalPages(response.TotalPages || response.totalPages || Math.ceil((response.TotalCount || subscribersData.length) / pageSize) || 1);
      setHasMore(response.HasMore !== undefined ? response.HasMore : (response.hasMore !== undefined ? response.hasMore : false));
    } catch (err) {
      setError(err.message || 'Aboneler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Bu aboneliği iptal etmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      await subscribersAPI.cancel(id);
      loadSubscribers();
    } catch (err) {
      alert(err.message || 'Abonelik iptal edilirken bir hata oluştu');
    }
  };

  const filteredSubscribers = subscribers.filter(sub =>
    (sub.UserDisplayName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sub.UserEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sub.ProductId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sub.TransactionId || '').toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Abone ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="page-actions">
          <button className="btn-primary">Yeni Abonelik</button>
        </div>
      </div>

      <div className="table-count-info">
        <span>Toplam: <strong>{searchTerm ? filteredSubscribers.length : totalCount}</strong> abonelik</span>
        {searchTerm && filteredSubscribers.length !== subscribers.length && (
          <span className="filtered-info">({subscribers.length} kayıttan {filteredSubscribers.length} tanesi gösteriliyor)</span>
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
              <th>Kullanıcı</th>
              <th>Email</th>
              <th>Abonelik Tipi</th>
              <th>Platform</th>
              <th>Başlangıç</th>
              <th>Bitiş</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.length > 0 ? (
              filteredSubscribers.map((sub) => {
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

                const isActive = sub.Status === 'Active' && !sub.CancelledAt;
                const isCancelled = sub.CancelledAt !== null;
                const isExpired = sub.ExpiresDate && new Date(sub.ExpiresDate) < new Date();

                return (
                  <tr key={sub.Id}>
                    <td>{sub.Id ? sub.Id.substring(0, 8) + '...' : '-'}</td>
                    <td>{sub.UserDisplayName || '-'}</td>
                    <td>{sub.UserEmail || '-'}</td>
                    <td>
                      <span className={`plan-badge ${sub.SubscriptionType ? 'premium' : 'pro'}`}>
                        {sub.SubscriptionType || '-'}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        backgroundColor: sub.Platform === 'ios' ? '#007AFF20' : '#34A85320',
                        color: sub.Platform === 'ios' ? '#007AFF' : '#34A853'
                      }}>
                        {sub.Platform || '-'}
                      </span>
                    </td>
                    <td>{formatDate(sub.StartDate)}</td>
                    <td>{formatDate(sub.EndDate || sub.ExpiresDate)}</td>
                    <td>
                      <span className={`status-badge ${isActive ? 'active' : (isCancelled ? 'inactive' : 'inactive')}`}>
                        {isActive ? 'Aktif' : (isCancelled ? 'İptal Edildi' : (isExpired ? 'Süresi Dolmuş' : sub.Status || 'Pasif'))}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon" title="Detay">👁️</button>
                        {isActive && (
                          <button className="btn-icon" title="İptal Et" onClick={() => handleCancel(sub.Id)}>❌</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  Abone bulunamadı
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-card-view">
        {filteredSubscribers.length > 0 ? (
          filteredSubscribers.map((sub) => {
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

            const isActive = sub.Status === 'Active' && !sub.CancelledAt;
            const isCancelled = sub.CancelledAt !== null;
            const isExpired = sub.ExpiresDate && new Date(sub.ExpiresDate) < new Date();

            return (
              <div key={sub.Id} className="mobile-card">
                <div className="mobile-card-header">
                  <div className="mobile-card-title">{sub.UserDisplayName || 'İsimsiz Kullanıcı'}</div>
                  <div className="mobile-card-actions">
                    <button className="btn-icon" title="Detay">👁️</button>
                    {isActive && (
                      <button className="btn-icon" title="İptal Et" onClick={() => handleCancel(sub.Id)}>❌</button>
                    )}
                  </div>
                </div>
                <div className="mobile-card-body">
                  <div className="mobile-card-row">
                    <div className="mobile-card-label">Email</div>
                    <div className="mobile-card-value">{sub.UserEmail || '-'}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div className="mobile-card-row" style={{ flex: '1', minWidth: '120px' }}>
                      <div className="mobile-card-label">Abonelik Tipi</div>
                      <div className="mobile-card-value">
                        <span className={`plan-badge ${sub.SubscriptionType ? 'premium' : 'pro'}`}>
                          {sub.SubscriptionType || '-'}
                        </span>
                      </div>
                    </div>
                    <div className="mobile-card-row" style={{ flex: '1', minWidth: '100px' }}>
                      <div className="mobile-card-label">Platform</div>
                      <div className="mobile-card-value">
                        <span style={{ 
                          textTransform: 'uppercase',
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: sub.Platform === 'ios' ? '#007AFF20' : '#34A85320',
                          color: sub.Platform === 'ios' ? '#007AFF' : '#34A853'
                        }}>
                          {sub.Platform || '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mobile-card-row">
                    <div className="mobile-card-label">Durum</div>
                    <div className="mobile-card-value">
                      <span className={`status-badge ${isActive ? 'active' : (isCancelled ? 'inactive' : 'inactive')}`}>
                        {isActive ? 'Aktif' : (isCancelled ? 'İptal Edildi' : (isExpired ? 'Süresi Dolmuş' : sub.Status || 'Pasif'))}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div className="mobile-card-row" style={{ flex: '1', minWidth: '140px' }}>
                      <div className="mobile-card-label">Başlangıç</div>
                      <div className="mobile-card-value">{formatDate(sub.StartDate)}</div>
                    </div>
                    <div className="mobile-card-row" style={{ flex: '1', minWidth: '140px' }}>
                      <div className="mobile-card-label">Bitiş</div>
                      <div className="mobile-card-value">{formatDate(sub.EndDate || sub.ExpiresDate)}</div>
                    </div>
                  </div>
                  <div className="mobile-card-row">
                    <div className="mobile-card-label">ID</div>
                    <div className="mobile-card-value" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{sub.Id ? sub.Id.substring(0, 8) + '...' : '-'}</div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            Abone bulunamadı
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

export default Subscribers;

