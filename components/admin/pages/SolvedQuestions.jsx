'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { solvedQuestionsAPI } from '../../../lib/api';

function SolvedQuestions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [questions, setQuestions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, [currentPage]);

  const loadQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await solvedQuestionsAPI.getAll({ page: currentPage, pageSize });
      // Response format: { Data: [], Page: 1, PageSize: 20, TotalCount: 0, TotalPages: 0, HasMore: false }
      const questionsData = response.Data || response.data || (Array.isArray(response) ? response : []);
      setQuestions(Array.isArray(questionsData) ? questionsData : []);
      setTotalCount(response.TotalCount || response.totalCount || questionsData.length);
      setTotalPages(response.TotalPages || response.totalPages || Math.ceil((response.TotalCount || questionsData.length) / pageSize) || 1);
      setHasMore(response.HasMore !== undefined ? response.HasMore : (response.hasMore !== undefined ? response.hasMore : false));
    } catch (err) {
      const errorMessage = err.message || 'Sorular yüklenirken bir hata oluştu';
      setError(errorMessage);
      console.error('Solved Questions API Error:', err);
      
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
    if (!window.confirm('Bu soruyu silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      await solvedQuestionsAPI.delete(id);
      setQuestions(questions.filter(q => q.Id !== id));
    } catch (err) {
      alert(err.message || 'Soru silinirken bir hata oluştu');
    }
  };

  const filteredQuestions = questions.filter(q =>
    (q.Question || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.UserId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.Solution || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '-';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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
            placeholder="Soru ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="page-actions">
          <button className="btn-primary">İstatistikler</button>
        </div>
      </div>

      <div className="table-count-info">
        <span>Toplam: <strong>{searchTerm ? filteredQuestions.length : totalCount}</strong> çözülen soru</span>
        {searchTerm && filteredQuestions.length !== questions.length && (
          <span className="filtered-info">({questions.length} kayıttan {filteredQuestions.length} tanesi gösteriliyor)</span>
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
              <th>Tarih</th>
              <th>Soru</th>
              <th>Kullanıcı ID</th>
              <th>Tip</th>
              <th>Görsel</th>
              <th>Çözüm</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => (
                <tr key={q.Id}>
                  <td>{q.Id ? q.Id.substring(0, 8) : '-'}</td>
                  <td>{formatDate(q.CreatedAt)}</td>
                  <td className="question-text" title={q.Question || '-'}>
                    {truncateText(q.Question, 80)}
                  </td>
                  <td>{q.UserId ? q.UserId.substring(0, 8) : '-'}</td>
                  <td>
                    <span className="status-badge" style={{ 
                      backgroundColor: q.Type === 'image' ? '#3b82f620' : '#6b728020',
                      color: q.Type === 'image' ? '#3b82f6' : '#6b7280'
                    }}>
                      {q.Type || '-'}
                    </span>
                  </td>
                  <td>
                    {q.Type === 'image' && q.ImageUri ? (
                      <img 
                        src={q.ImageUri} 
                        alt="Soru görseli" 
                        style={{ 
                          maxWidth: '80px', 
                          maxHeight: '60px', 
                          objectFit: 'contain',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          const newWindow = window.open();
                          newWindow.document.write(`<img src="${q.ImageUri}" style="max-width: 100%; height: auto;" />`);
                        }}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="question-text" title={q.Solution || '-'}>
                    {truncateText(q.Solution, 60)}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon" 
                        title="Detay" 
                        onClick={() => navigate(`/solution/${q.Id}`)}
                      >
                        👁️
                      </button>
                      <button className="btn-icon" title="Sil" onClick={() => handleDelete(q.Id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  Soru bulunamadı
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-card-view">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div key={q.Id} className="mobile-card">
              <div className="mobile-card-header">
                <div className="mobile-card-title">Soru #{q.Id ? q.Id.substring(0, 8) : '-'}</div>
                <div className="mobile-card-actions">
                  <button 
                    className="btn-icon" 
                    title="Detay" 
                    onClick={() => navigate(`/solution/${q.Id}`)}
                  >
                    👁️
                  </button>
                  <button className="btn-icon" title="Sil" onClick={() => handleDelete(q.Id)}>🗑️</button>
                </div>
              </div>
              <div className="mobile-card-body">
                {q.Type === 'image' && q.ImageUri && (
                  <div className="mobile-card-row">
                    <img 
                      src={q.ImageUri} 
                      alt="Soru görseli" 
                      style={{ 
                        width: '100%',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        marginTop: '0.5rem',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        const newWindow = window.open();
                        newWindow.document.write(`<img src="${q.ImageUri}" style="max-width: 100%; height: auto;" />`);
                      }}
                    />
                  </div>
                )}
                <div className="mobile-card-row">
                  <div className="mobile-card-label">Soru</div>
                  <div className="mobile-card-value" style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {truncateText(q.Question, 150)}
                  </div>
                </div>
                <div className="mobile-card-row">
                  <div className="mobile-card-label">Çözüm</div>
                  <div className="mobile-card-value" style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {truncateText(q.Solution, 150)}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div className="mobile-card-row" style={{ flex: '1', minWidth: '100px' }}>
                    <div className="mobile-card-label">Tip</div>
                    <div className="mobile-card-value">
                      <span className="status-badge" style={{ 
                        backgroundColor: q.Type === 'image' ? '#3b82f620' : '#6b728020',
                        color: q.Type === 'image' ? '#3b82f6' : '#6b7280'
                      }}>
                        {q.Type || '-'}
                      </span>
                    </div>
                  </div>
                  <div className="mobile-card-row" style={{ flex: '1', minWidth: '140px' }}>
                    <div className="mobile-card-label">Tarih</div>
                    <div className="mobile-card-value">{formatDate(q.CreatedAt)}</div>
                  </div>
                </div>
                <div className="mobile-card-row">
                  <div className="mobile-card-label">Kullanıcı ID</div>
                  <div className="mobile-card-value" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{q.UserId ? q.UserId.substring(0, 8) : '-'}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            Soru bulunamadı
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

export default SolvedQuestions;

