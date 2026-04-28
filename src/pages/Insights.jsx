import { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { getStats } from '../api/productApi';

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

const STAT_CONFIG = [
  { key: 'total', label: 'Total Products', tone: 'safe' },
  { key: 'expiringSoon', label: 'Expiring Soon', tone: 'warning' },
  { key: 'expired', label: 'Expired', tone: 'danger' },
  { key: 'safe', label: 'Safe Products', tone: 'safe' },
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

function ValuePanel({ value }) {
  const {
    totalCollection = 0,
    percentageChange = 0,
    expiredValue = 0,
    savedValue = 0,
  } = value ?? {};

  return (
    <div className="ins__value-panel">
      <p className="ins__panel-eyebrow">Total Collection Value</p>
      <div className="ins__value-row">
        <span className="ins__value-big">₹{totalCollection.toLocaleString()}</span>
        <span className="ins__value-change">+{percentageChange}%</span>
      </div>

      <div className="ins__value-breakdown">
        <div className="ins__breakdown-item">
          <span className="ins__breakdown-label">Expired Value</span>
          <span className="ins__breakdown-amount ins__breakdown-amount--danger">
            -₹{expiredValue.toLocaleString()}
          </span>
        </div>
        <div className="ins__breakdown-item">
          <span className="ins__breakdown-label">Saved Value</span>
          <span className="ins__breakdown-amount ins__breakdown-amount--safe">
            +₹{savedValue.toLocaleString()}
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

function Insights({ activePage, onNavigate, products = [], onOpenModal }) {
  const [stats, setStats] = useState({
    total: 0,
    safe: 0,
    expiringSoon: 0,
    expired: 0,
  });
  const [value, setValue] = useState({
    totalCollection: 0,
    percentageChange: 0,
    expiredValue: 0,
    savedValue: 0,
  });
  const [spendingByCategory, setSpendingByCategory] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const pricedProducts = products.filter((product) => Number.isFinite(Number(product.price)));
    const totalCollection = pricedProducts.reduce((sum, product) => sum + Number(product.price || 0), 0);
    const expiredValue = pricedProducts
      .filter((product) => product.status === 'expired')
      .reduce((sum, product) => sum + Number(product.price || 0), 0);
    const savedValue = Math.max(totalCollection - expiredValue, 0);

    const categoryTotals = pricedProducts.reduce((acc, product) => {
      const key = product.category || 'Others';
      acc[key] = (acc[key] || 0) + Number(product.price || 0);
      return acc;
    }, {});

    const maxCategoryAmount = Math.max(...Object.values(categoryTotals), 0);
    const derivedCategories = Object.entries(categoryTotals).map(([label, amount]) => ({
      label,
      amount,
      percent: maxCategoryAmount > 0 ? Math.round((amount / maxCategoryAmount) * 100) : 0,
    }));

    const expiringThisWeek = products.filter((product) => {
      if (!product.expiryDate) return false;
      const msLeft = new Date(product.expiryDate) - new Date();
      const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24));
      return daysLeft >= 0 && daysLeft <= 7;
    }).length;

    const favoriteCount = products.filter((product) => product.isFavorite).length;
    const topCategory = derivedCategories.length > 0
      ? derivedCategories.reduce((top, current) => (current.amount > top.amount ? current : top))
      : null;

    setValue({
      totalCollection,
      percentageChange: 0,
      expiredValue,
      savedValue,
    });
    setSpendingByCategory(derivedCategories);
    setInsights([
      {
        id: 1,
        icon: 'warning',
        message: `${expiringThisWeek} products are expiring this week`,
        tone: 'warning',
      },
      {
        id: 2,
        icon: 'loss',
        message: `You have ₹${expiredValue.toLocaleString()} worth of expired products`,
        tone: 'danger',
      },
      {
        id: 3,
        icon: 'focus',
        message: topCategory
          ? `Your collection is ${topCategory.label.toLowerCase()}-focused`
          : `${favoriteCount} products are saved in your vanity`,
        tone: 'safe',
      },
    ]);
  }, [products]);

  const fetchStats = async () => {
    try {
      const res = await getStats();
      setStats((prev) => ({
        ...prev,
        ...res.data,
        expiringSoon: res.data?.expiringSoon ?? res.data?.expiring ?? prev.expiringSoon,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-shell">
      <Navbar activePage={activePage} onNavigate={onNavigate} onOpenModal={onOpenModal} />

      <main className="ins__page">
        <section className="ins__header">
          <div className="page-container ins__header-inner">
            <h1 className="ins__page-title">Your Beauty Insights</h1>
            <p className="ins__page-subtitle">Track your collection, not your stress</p>
          </div>
        </section>

        <section className="ins__stats-strip">
          <div className="page-container">
            <div className="ins__stats-grid">
              {STAT_CONFIG.map(({ key, label, tone }) => (
                <InsightStatCard key={key} value={stats[key] ?? 0} label={label} tone={tone} />
              ))}
            </div>
          </div>
        </section>

        <section className="ins__split-section">
          <div className="page-container ins__split-inner">
            <ValuePanel value={value} />
            <CategoryPanel categories={spendingByCategory} />
          </div>
        </section>

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
