"use client";

import { useEffect, useState } from "react";
import MathContent from "../MathContent";
import { solvedQuestionsAPI } from "../../../lib/api";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleString("tr-TR", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "-";
const truncateText = (text, length = 100) =>
  !text ? "-" : text.length <= length ? text : `${text.slice(0, length)}…`;

function SolutionDetail({ question, onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div
      className="solution-detail-backdrop"
      onMouseDown={onClose}
      role="presentation"
    >
      <section
        className="solution-detail-panel"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="solution-detail-title"
      >
        <div className="solution-detail-handle" aria-hidden="true" />
        <header className="solution-detail-header">
          <div>
            <span className="solution-detail-eyebrow">Çözüm kaydı</span>
            <h2 id="solution-detail-title">Matematik çözümü</h2>
            <p>
              {formatDate(question.CreatedAt)} · {question.Type || "metin"} · #
              {question.Id?.slice(0, 8)}
            </p>
          </div>
          <button
            className="solution-detail-close"
            onClick={onClose}
            aria-label="Detayı kapat"
          >
            ×
          </button>
        </header>

        <div className="solution-detail-scroll">
          {question.ImageUri && (
            <figure className="solution-detail-image">
              <img src={question.ImageUri} alt="Çözülen matematik sorusu" />
            </figure>
          )}
          {(question.Question || question.Expression) && (
            <section className="solution-detail-section question">
              <div className="solution-section-heading">
                <span>01</span>
                <h3>Soru</h3>
              </div>
              <MathContent>
                {question.Question || question.Expression}
              </MathContent>
            </section>
          )}
          {question.Solution && (
            <section className="solution-detail-section answer">
              <div className="solution-section-heading">
                <span>02</span>
                <h3>Sonuç</h3>
              </div>
              <MathContent>{question.Solution}</MathContent>
            </section>
          )}
          {Array.isArray(question.Steps) && question.Steps.length > 0 && (
            <section className="solution-detail-section steps">
              <div className="solution-section-heading">
                <span>03</span>
                <h3>Çözüm adımları</h3>
              </div>
              <div className="admin-solution-steps">
                {question.Steps.map((step, index) => (
                  <article
                    className="admin-solution-step"
                    key={`${question.Id}-step-${index}`}
                  >
                    <span className="admin-step-number">{index + 1}</span>
                    <MathContent>{step}</MathContent>
                  </article>
                ))}
              </div>
            </section>
          )}
          <footer className="solution-detail-meta">
            <div>
              <span>Kayıt ID</span>
              <code>{question.Id || "-"}</code>
            </div>
            <div>
              <span>Kullanıcı ID</span>
              <code>{question.UserId || "Anonim"}</code>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default function SolvedQuestions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    let active = true;
    const loadQuestions = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await solvedQuestionsAPI.getAll({
          page: currentPage,
          pageSize,
        });
        if (!active) return;
        const data =
          response.Data ||
          response.data ||
          (Array.isArray(response) ? response : []);
        setQuestions(Array.isArray(data) ? data : []);
        setTotalCount(
          response.TotalCount ?? response.totalCount ?? data.length,
        );
        setTotalPages(response.TotalPages ?? response.totalPages ?? 1);
        setHasMore(response.HasMore ?? response.hasMore ?? false);
      } catch (err) {
        if (active)
          setError(err.message || "Sorular yüklenirken bir hata oluştu");
      } finally {
        if (active) setLoading(false);
      }
    };
    loadQuestions();
    return () => {
      active = false;
    };
  }, [currentPage]);

  const handleDelete = async (event, id) => {
    event.stopPropagation();
    if (!window.confirm("Bu soruyu silmek istediğinize emin misiniz?")) return;
    try {
      await solvedQuestionsAPI.delete(id);
      setQuestions((items) => items.filter((question) => question.Id !== id));
      setSelectedQuestion((selected) =>
        selected?.Id === id ? null : selected,
      );
    } catch (err) {
      window.alert(err.message || "Soru silinirken bir hata oluştu");
    }
  };

  const query = searchTerm.toLowerCase();
  const filteredQuestions = questions.filter(
    (question) =>
      (question.Question || "").toLowerCase().includes(query) ||
      (question.UserId || "").toLowerCase().includes(query) ||
      (question.Solution || "").toLowerCase().includes(query),
  );

  return (
    <div className="page-container solved-questions-page">
      <div className="admin-page-intro">
        <div>
          <span className="admin-eyebrow">MatAI kayıtları</span>
          <h2>Çözülmüş sorular</h2>
          <p>
            Soruya tıklayarak matematiksel çözümü ve tüm adımları inceleyin.
          </p>
        </div>
        <div className="admin-intro-count">
          <strong>{totalCount}</strong>
          <span>toplam çözüm</span>
        </div>
      </div>
      <div className="page-header">
        <div className="search-box admin-search-box">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Soru, çözüm veya kullanıcı ID ara..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="admin-loading-state">Çözümler yükleniyor…</div>
      )}
      {error && <div className="admin-error-state">{error}</div>}

      {!loading && !error && (
        <>
          <div className="table-container solved-table-container">
            <table className="data-table solved-table">
              <thead>
                <tr>
                  <th>Soru</th>
                  <th>Tür</th>
                  <th>Kullanıcı</th>
                  <th>Tarih</th>
                  <th aria-label="İşlemler" />
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((question) => (
                  <tr
                    key={question.Id}
                    onClick={() => setSelectedQuestion(question)}
                    tabIndex="0"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") setSelectedQuestion(question);
                    }}
                  >
                    <td>
                      <div className="solved-question-summary">
                        {question.ImageUri && (
                          <img src={question.ImageUri} alt="" />
                        )}
                        <div>
                          <strong>
                            {truncateText(
                              question.Question || question.Expression,
                              115,
                            )}
                          </strong>
                          <span>{truncateText(question.Solution, 90)}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`question-type-badge ${question.Type === "image" ? "image" : ""}`}
                      >
                        {question.Type === "image" ? "Görsel" : "Metin"}
                      </span>
                    </td>
                    <td>
                      <code>
                        {question.UserId
                          ? `${question.UserId.slice(0, 8)}…`
                          : "Anonim"}
                      </code>
                    </td>
                    <td>{formatDate(question.CreatedAt)}</td>
                    <td>
                      <div className="row-actions">
                        <button
                          className="open-solution-button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedQuestion(question);
                          }}
                        >
                          İncele <span>→</span>
                        </button>
                        <button
                          className="delete-row-button"
                          title="Sil"
                          onClick={(event) => handleDelete(event, question.Id)}
                        >
                          ⌫
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredQuestions.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty-table-cell">
                      Soru bulunamadı
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mobile-card-view solved-mobile-list">
            {filteredQuestions.map((question) => (
              <article
                className="mobile-card solved-mobile-card"
                key={question.Id}
                onClick={() => setSelectedQuestion(question)}
              >
                <div className="solved-mobile-top">
                  <span
                    className={`question-type-badge ${question.Type === "image" ? "image" : ""}`}
                  >
                    {question.Type === "image" ? "Görsel" : "Metin"}
                  </span>
                  <time>{formatDate(question.CreatedAt)}</time>
                </div>
                {question.ImageUri && (
                  <img
                    className="solved-mobile-image"
                    src={question.ImageUri}
                    alt="Soru önizlemesi"
                  />
                )}
                <h3>
                  {truncateText(question.Question || question.Expression, 140)}
                </h3>
                <p>{truncateText(question.Solution, 120)}</p>
                <div className="solved-mobile-footer">
                  <code>
                    {question.UserId
                      ? `${question.UserId.slice(0, 8)}…`
                      : "Anonim"}
                  </code>
                  <button
                    className="open-solution-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedQuestion(question);
                    }}
                  >
                    Çözümü aç →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1 || loading}
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
        >
          Önceki
        </button>
        <span className="pagination-info">
          Sayfa {currentPage} / {totalPages || 1}
        </span>
        <button
          className="pagination-btn"
          disabled={!hasMore || loading}
          onClick={() => setCurrentPage((page) => page + 1)}
        >
          Sonraki
        </button>
      </div>
      {selectedQuestion && (
        <SolutionDetail
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
        />
      )}
    </div>
  );
}
