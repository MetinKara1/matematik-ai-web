'use client';

import { useCallback, useEffect, useState } from 'react';
import { oneTimePurchasesAPI } from '../../../lib/api';

const read = (item, name) => item?.[name] ?? item?.[name.charAt(0).toLowerCase() + name.slice(1)];

const formatDate = (value) => value
  ? new Date(value).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })
  : '-';

const shortId = (value) => value ? `${value.slice(0, 10)}…` : '-';

const statusDetails = (status) => {
  if (status === 'Refunded') return { label: 'İade Edildi', className: 'inactive' };
  if (status === 'RefundReversed') return { label: 'İade Geri Alındı', className: 'new' };
  return { label: 'Tamamlandı', className: 'active' };
};

export default function OneTimePurchases() {
  const [purchases, setPurchases] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [environment, setEnvironment] = useState('PRODUCTION');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalCount: 0, totalPages: 1, hasMore: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const pageSize = 20;

  const loadPurchases = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await oneTimePurchasesAPI.getAll({
        page,
        pageSize,
        environment,
        ...(status ? { status } : {}),
        ...(search ? { search } : {}),
      });
      const data = response.Data || response.data || [];
      setPurchases(Array.isArray(data) ? data : []);
      setPagination({
        totalCount: response.TotalCount ?? response.totalCount ?? data.length,
        totalPages: response.TotalPages ?? response.totalPages ?? 1,
        hasMore: response.HasMore ?? response.hasMore ?? false,
      });
    } catch (err) {
      setError(err.message || 'Satın alımlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  }, [environment, page, search, status]);

  useEffect(() => { loadPurchases(); }, [loadPurchases]);

  const applySearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  return (
    <div className="page-container">
      <form className="page-header" onSubmit={applySearch}>
        <div className="search-box">
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Kullanıcı, e-posta, ürün veya işlem ID ara..."
          />
        </div>
        <div className="purchase-filters">
          <select value={environment} onChange={(event) => { setPage(1); setEnvironment(event.target.value); }}>
            <option value="PRODUCTION">Production</option>
            <option value="SANDBOX">Sandbox</option>
          </select>
          <select value={status} onChange={(event) => { setPage(1); setStatus(event.target.value); }}>
            <option value="">Tüm durumlar</option>
            <option value="active">Tamamlananlar</option>
            <option value="refunded">İade edilenler</option>
          </select>
          <button className="btn-primary" type="submit">Ara</button>
        </div>
      </form>

      <div className="table-count-info">
        <span>Toplam: <strong>{pagination.totalCount}</strong> tek seferlik satın alma</span>
        <span className="filtered-info">(Sayfa {page} / {pagination.totalPages || 1})</span>
      </div>

      {error && <div className="admin-error-state">{error}</div>}
      {loading && <div className="admin-loading-state">Yükleniyor...</div>}

      {!loading && !error && (
        <>
          <div className="table-container">
            <table className="data-table purchase-table">
              <thead>
                <tr>
                  <th>Kullanıcı</th>
                  <th>Ürün</th>
                  <th>Satın Alınan</th>
                  <th>Mevcut Bakiye</th>
                  <th>Mağaza</th>
                  <th>İşlem ID</th>
                  <th>Tarih</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => {
                  const purchaseStatus = statusDetails(read(purchase, 'Status'));
                  return (
                    <tr key={read(purchase, 'Id')}>
                      <td><strong>{read(purchase, 'UserDisplayName') || '-'}</strong><br /><small>{read(purchase, 'UserEmail')}</small></td>
                      <td><span className="product-id">{read(purchase, 'StoreProductId') || '-'}</span></td>
                      <td><strong>{read(purchase, 'CreditsPurchased')}</strong> hak</td>
                      <td>
                        <span title="Satın alınmış bakiye">{read(purchase, 'PurchasedBalance')} satın alınmış</span><br />
                        <small>{read(purchase, 'BonusBalance')} bonus · {read(purchase, 'DebtBalance')} borç</small>
                      </td>
                      <td>{read(purchase, 'Store') || '-'}<br /><small>{read(purchase, 'Environment')}</small></td>
                      <td><code title={read(purchase, 'StoreTransactionId')}>{shortId(read(purchase, 'StoreTransactionId'))}</code></td>
                      <td>{formatDate(read(purchase, 'PurchasedAt'))}</td>
                      <td><span className={`status-badge ${purchaseStatus.className}`}>{purchaseStatus.label}</span></td>
                    </tr>
                  );
                })}
                {purchases.length === 0 && <tr><td colSpan="8" className="empty-table-cell">Satın alma bulunamadı</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="mobile-card-view">
            {purchases.map((purchase) => {
              const purchaseStatus = statusDetails(read(purchase, 'Status'));
              return (
                <div className="mobile-card" key={read(purchase, 'Id')}>
                  <div className="mobile-card-header">
                    <div><div className="mobile-card-title">{read(purchase, 'UserDisplayName') || 'İsimsiz Kullanıcı'}</div><small>{read(purchase, 'UserEmail')}</small></div>
                    <span className={`status-badge ${purchaseStatus.className}`}>{purchaseStatus.label}</span>
                  </div>
                  <div className="mobile-card-body">
                    <div className="mobile-card-row"><div className="mobile-card-label">Ürün</div><div className="mobile-card-value product-id">{read(purchase, 'StoreProductId') || '-'}</div></div>
                    <div className="purchase-balance-grid">
                      <div><strong>{read(purchase, 'CreditsPurchased')}</strong><small>Satın alınan</small></div>
                      <div><strong>{read(purchase, 'PurchasedBalance')}</strong><small>Kalan satın alınmış</small></div>
                      <div><strong>{read(purchase, 'BonusBalance')}</strong><small>Bonus</small></div>
                      <div><strong>{read(purchase, 'DebtBalance')}</strong><small>Borç</small></div>
                    </div>
                    <div className="mobile-card-row"><div className="mobile-card-label">Mağaza / Ortam</div><div className="mobile-card-value">{read(purchase, 'Store') || '-'} · {read(purchase, 'Environment')}</div></div>
                    <div className="mobile-card-row"><div className="mobile-card-label">İşlem ID</div><div className="mobile-card-value"><code>{read(purchase, 'StoreTransactionId') || '-'}</code></div></div>
                    <div className="mobile-card-row"><div className="mobile-card-label">Satın Alma Tarihi</div><div className="mobile-card-value">{formatDate(read(purchase, 'PurchasedAt'))}</div></div>
                    {read(purchase, 'RefundedAt') && <div className="mobile-card-row"><div className="mobile-card-label">İade Tarihi</div><div className="mobile-card-value">{formatDate(read(purchase, 'RefundedAt'))}</div></div>}
                  </div>
                </div>
              );
            })}
            {purchases.length === 0 && <div className="empty-table-cell">Satın alma bulunamadı</div>}
          </div>
        </>
      )}

      <div className="pagination">
        <button className="pagination-btn" disabled={page === 1 || loading} onClick={() => setPage((value) => Math.max(1, value - 1))}>Önceki</button>
        <span className="pagination-info">Sayfa {page} / {pagination.totalPages || 1}</span>
        <button className="pagination-btn" disabled={!pagination.hasMore || loading} onClick={() => setPage((value) => value + 1)}>Sonraki</button>
      </div>
    </div>
  );
}
