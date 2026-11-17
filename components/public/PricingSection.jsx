'use client';

import {
  PRICING_PLANS,
  FAIR_SOLVE_GUARANTEE,
  APP_STORE_URL
} from '../../lib/pricing.mjs';

export default function PricingSection() {
  return (
    <section className="matai-pricing-section" id="pricing" aria-label="MatAI Pro Abonelik Planları">
      <div className="container">
        <div className="pricing-header-center">
          <span className="pricing-tag">FİYATLANDIRMA & PRO PLANLAR</span>
          <h2 className="pricing-main-heading">
            Matematik Başarınız İçin Doğru Planı Seçin
          </h2>
          <p className="pricing-sub-heading">
            İster her ay yenilenen esnek paket, ister tüm dönem için yıllık indirimli plan. Gizli ücret veya taahhüt yok.
          </p>
        </div>

        <div className="pricing-cards-grid">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`matai-pricing-card ${plan.highlighted ? 'highlighted-plan' : ''}`}
            >
              {plan.badge && (
                <div className="pricing-plan-badge">{plan.badge}</div>
              )}

              <div className="plan-name-block">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="plan-price-block">
                <span className="plan-price-amount">{plan.price}</span>
                <span className="plan-price-period">/ {plan.period}</span>
              </div>

              <a
                href={plan.ctaHref}
                target={plan.ctaHref.startsWith('http') ? '_blank' : '_self'}
                rel={plan.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`plan-cta-button ${plan.highlighted ? 'cta-primary' : 'cta-secondary'}`}
              >
                {plan.ctaText}
              </a>

              <div className="plan-features-list">
                <div className="features-group-title">Dahil Olan Özellikler:</div>
                <ul>
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="feature-item included">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                  {plan.limitations &&
                    plan.limitations.map((limit, idx) => (
                      <li key={idx} className="feature-item excluded">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        <span>{limit}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Fair Solve Guarantee Box */}
        <div className="fair-solve-guarantee-card">
          <div className="guarantee-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div className="guarantee-text">
            <h4>{FAIR_SOLVE_GUARANTEE.title}</h4>
            <p>{FAIR_SOLVE_GUARANTEE.description}</p>
            <small>{FAIR_SOLVE_GUARANTEE.privacyNote}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
