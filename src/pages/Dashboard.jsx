import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import ProductCard from '../components/shelf/ProductCard';
import AddCard from '../components/shelf/AddCard';
import AddProductModal from '../components/shelf/AddProductModal';
import ShelfFiltersPanel from '../components/shelf/ShelfFiltersPanel';
import SummaryCard from '../components/summary/SummaryCard';
import { FilterIcon, CloseIcon, PlusIcon } from '../components/icons';
import useShelfStats from '../hooks/useShelfStats';

const SUMMARY_CARDS = [
  { key: 'total',        label: 'Total Products', tone: 'safe'    },
  { key: 'expiringSoon', label: 'Expiring Soon',  tone: 'warning' },
  { key: 'expired',      label: 'Expired',        tone: 'danger'  },
];

function HeroSection({ onOpenModal }) {
  return (
    <section className="hero-section">
      <div className="page-container hero-section__inner">
        <div className="hero-card">
          <h1>Shelfyn</h1>
          <p>Too pretty to expire.</p>
          <button type="button" className="hero-card__button" onClick={onOpenModal}>
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

function FiltersDrawer({ onClose, activeFilter, onFilterChange }) {
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
          <ShelfFiltersPanel
            activeFilter={activeFilter}
            onFilterChange={(f) => { onFilterChange(f); onClose(); }}
          />
        </div>
      </div>
    </div>
  );
}

function Dashboard({ activePage, onNavigate, products, onToggleFavorite, onAddProduct, onOpenModal, isModalOpen, setIsModalOpen }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilter,  setActiveFilter]  = useState('all');
  const stats = useShelfStats(products);

  // Apply category filter — 'all' shows everything
  const visibleProducts = activeFilter === 'all'
    ? products
    : products.filter((p) => p.category === activeFilter);

  return (
    <div className="dashboard-shell">
      <Navbar
        activePage={activePage}
        onNavigate={onNavigate}
        onOpenModal={onOpenModal}
      />

      <main className="dashboard-page">
        <HeroSection onOpenModal={onOpenModal} />

        <DashboardSummary stats={stats} />

        <section className="shelf-layout">
          <div className="page-container shelf-layout__inner">
            <aside className="shelf-sidebar">
              <ShelfFiltersPanel
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
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
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
                <AddCard onClick={onOpenModal} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {isFiltersOpen && (
        <FiltersDrawer
          onClose={() => setIsFiltersOpen(false)}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      )}
      {isModalOpen && (
        <AddProductModal
          onClose={() => setIsModalOpen(false)}
          onAddProduct={onAddProduct}
        />
      )}

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

