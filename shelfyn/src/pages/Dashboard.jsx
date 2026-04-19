import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import ProductCard from '../components/shelf/ProductCard';
import AddCard from '../components/shelf/AddCard';
import ShelfFiltersPanel from '../components/shelf/ShelfFiltersPanel';
import SummaryCard from '../components/summary/SummaryCard';
import { PlusIcon, FilterIcon, CloseIcon } from '../components/icons';
import { mockProducts } from '../data/mockProducts';
import useShelfStats from '../hooks/useShelfStats';

const SUMMARY_CARDS = [
  { key: 'total', label: 'Total Products', tone: 'safe' },
  { key: 'expiringSoon', label: 'Expiring Soon', tone: 'warning' },
  { key: 'expired', label: 'Expired', tone: 'danger' },
];

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="page-container hero-section__inner">
        <div className="hero-card">
          <h1>Shelfyn</h1>
          <p>Too pretty to expire.</p>
          <button type="button" className="hero-card__button">
            <PlusIcon />
            <span>Start My Vanity</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function DashboardSummary({ stats }) {
  return (
    <section className="dashboard-summary">
      <div className="page-container dashboard-summary__inner">
        <div className="dashboard-summary__left" />
        <div className="dashboard-summary__right">
          {SUMMARY_CARDS.map(({ key, label, tone }) => (
            <SummaryCard key={key} label={label} value={stats[key]} tone={tone} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FiltersDrawer({ onClose }) {
  return (
    <div className="filters-drawer" role="dialog" aria-modal="true">
      <button
        type="button"
        className="filters-drawer__backdrop"
        aria-label="Close filters"
        onClick={onClose}
      />
      <div className="filters-drawer__panel">
        <div className="filters-drawer__header">
          <button
            type="button"
            className="filters-drawer__close"
            aria-label="Close filters"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="filters-drawer__content">
          <ShelfFiltersPanel />
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [products] = useState(mockProducts);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const stats = useShelfStats(products);

  return (
    <div className="dashboard-shell">
      <Navbar />

      <main className="dashboard-page">
        <HeroSection />

        <DashboardSummary stats={stats} />

        <section className="shelf-layout">
          <div className="page-container shelf-layout__inner">
            <aside className="shelf-sidebar">
              <ShelfFiltersPanel />
            </aside>

            <div className="shelf-content">
              <button
                type="button"
                className="filters-trigger"
                onClick={() => setIsFiltersOpen(true)}
              >
                <FilterIcon />
                <span>Filters</span>
              </button>

              <div className="shelf-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                <AddCard />
              </div>
            </div>
          </div>
        </section>
      </main>

      {isFiltersOpen && <FiltersDrawer onClose={() => setIsFiltersOpen(false)} />}

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

export default Dashboard;
