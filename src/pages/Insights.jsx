import Navbar from '../components/layout/Navbar';
import { mockInsightsData } from '../data/mockInsights';

// ─── Icon components ──────────────────────────────────────────────────────────

function WarningInsightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="15.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function LossInsightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
      <path d="M12 4v16M6 14l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FocusInsightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function ShelfIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="18" height="18">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const INSIGHT_ICONS = {
  warning: WarningInsightIcon,
  loss: LossInsightIcon,
  focus: FocusInsightIcon,
};

// ─── Summary strip ─────────────────────────────────────────────────────────────

const STAT_CONFIG = [
  { key: 'total',        label: 'Total Products',  tone: 'safe'    },
  { key: 'expiringSoon', label: 'Expiring Soon',    tone: 'warning' },
  { key: 'expired',      label: 'Expired',          tone: 'danger'  },
  { key: 'safe',         label: 'Safe Products',    tone: 'safe'    },
];

function InsightStatCard({ value, label, tone }) {
  return (
    <div className="ins__stat-card">
      <div className={`ins__stat-dot ins__stat-dot--${tone}`} />
      <div className="ins__stat-body">
        <span className="ins__stat-value">{value}</span>
        <span className="ins__stat-label">{label}</span>
      </div>
    </div>
  );
}

// ─── Value + Category split ─────────────────────────────────────────────────

function ValuePanel({ value }) {
  return (
    <div className="ins__value-panel">
      <p className="ins__panel-eyebrow">Total Collection Value</p>
      <div className="ins__value-row">
        <span className="ins__value-big">₹{value.totalCollection.toLocaleString()}</span>
        <span className="ins__value-change">+{value.percentageChange}%</span>
      </div>

      <div className="ins__value-breakdown">
        <div className="ins__breakdown-item">
          <span className="ins__breakdown-label">Expired Value</span>
          <span className="ins__breakdown-amount ins__breakdown-amount--danger">
            −₹{value.expiredValue.toLocaleString()}
          </span>
        </div>
        <div className="ins__breakdown-item">
          <span className="ins__breakdown-label">Saved Value</span>
          <span className="ins__breakdown-amount ins__breakdown-amount--safe">
            +₹{value.savedValue.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function CategoryBar({ label, amount, percent }) {
  return (
    <div className="ins__cat-item">
      <div className="ins__cat-header">
        <span className="ins__cat-label">{label}</span>
        <span className="ins__cat-amount">₹{amount.toLocaleString()}</span>
      </div>
      <div className="ins__bar-track">
        <div className="ins__bar-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function CategoryPanel({ categories }) {
  return (
    <div className="ins__category-panel">
      <p className="ins__panel-eyebrow">Spending by Category</p>
      <div className="ins__cat-list">
        {categories.map((cat) => (
          <CategoryBar key={cat.label} {...cat} />
        ))}
      </div>
    </div>
  );
}

// ─── Smart Insight cards ────────────────────────────────────────────────────

function InsightCard({ icon, message, tone }) {
  const Icon = INSIGHT_ICONS[icon] ?? WarningInsightIcon;
  return (
    <div className={`ins__insight-card ins__insight-card--${tone}`}>
      <div className={`ins__insight-icon ins__insight-icon--${tone}`}>
        <Icon />
      </div>
      <p className="ins__insight-msg">{message}</p>
    </div>
  );
}

// ─── Bottom banner ──────────────────────────────────────────────────────────

function InsightsBanner() {
  return (
    <div className="ins__banner">
      <div className="ins__banner-content">
        <h3 className="ins__banner-title">Organize your shelf by expiry date</h3>
        <p className="ins__banner-desc">
          Keep your vanity fresh. Sort, track, and never lose a product to expiry again.
        </p>
        <button type="button" className="ins__banner-btn">
          <ShelfIcon />
          <span>Reorganize Shelf</span>
        </button>
      </div>
    </div>
  );
}

// ─── Page root ──────────────────────────────────────────────────────────────

function Insights({ activePage, onNavigate }) {
  const { stats, value, spendingByCategory, insights } = mockInsightsData;

  return (
    <div className="dashboard-shell">
      <Navbar activePage={activePage} onNavigate={onNavigate} />

      <main className="ins__page">
        {/* Header */}
        <section className="ins__header">
          <div className="page-container ins__header-inner">
            <h1 className="ins__page-title">Your Beauty Insights</h1>
            <p className="ins__page-subtitle">Track your collection, not your stress</p>
          </div>
        </section>

        {/* Summary strip */}
        <section className="ins__stats-strip">
          <div className="page-container">
            <div className="ins__stats-grid">
              {STAT_CONFIG.map(({ key, label, tone }) => (
                <InsightStatCard key={key} value={stats[key]} label={label} tone={tone} />
              ))}
            </div>
          </div>
        </section>

        {/* Value + Category */}
        <section className="ins__split-section">
          <div className="page-container ins__split-inner">
            <ValuePanel value={value} />
            <CategoryPanel categories={spendingByCategory} />
          </div>
        </section>

        {/* Smart Insights */}
        <section className="ins__insights-section">
          <div className="page-container">
            <h2 className="ins__section-title">Smart Insights</h2>
            <div className="ins__insights-grid">
              {insights.map((item) => (
                <InsightCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom banner */}
        <section className="ins__banner-section">
          <div className="page-container">
            <InsightsBanner />
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <div className="page-container dashboard-footer__inner">
          <div>
            <h3>Shelfyn</h3>
            <p>&copy; 2024 Shelfyn Luminous Vanity. All rights reserved.</p>
          </div>
          <div className="dashboard-footer__links">
            <span>Sustainability</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Stockists</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Insights;
