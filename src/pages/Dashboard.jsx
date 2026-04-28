import { useState } from "react";
import Navbar from '../components/layout/Navbar';
import ProductCard from '../components/shelf/ProductCard';
import AddCard from '../components/shelf/AddCard';
import ShelfFiltersPanel from '../components/shelf/ShelfFiltersPanel';
import SummaryCard from '../components/summary/SummaryCard';
import { FilterIcon, CloseIcon, PlusIcon } from '../components/icons';
import useShelfStats from '../hooks/useShelfStats';
import { deleteProduct, toggleFavorite } from "../api/productApi";
import { sortProductsByExpiry } from '../utils/productSort';

const SUMMARY_CARDS = [
  { key: 'total', label: 'Total Products', tone: 'safe' },
  { key: 'expiringSoon', label: 'Expiring Soon', tone: 'warning' },
  { key: 'expired', label: 'Expired', tone: 'danger' },
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
            onFilterChange={(filterValue) => {
              onFilterChange(filterValue);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Dashboard({
  products = [],
  activePage,
  onNavigate,
  onOpenModal,
  refreshProducts,
}) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const stats = useShelfStats(products);

  const handleFavorite = async (id) => {
    try {
      await toggleFavorite(id);
      await refreshProducts?.();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      await refreshProducts?.();
    } catch (err) {
      console.error(err);
    }
  };

  const visibleProducts = activeFilter === 'all'
    ? products
    : products.filter((product) => product.category === activeFilter);
  const sortedProducts = sortProductsByExpiry(visibleProducts);

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
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onToggleFavorite={handleFavorite}
                    onDelete={handleDelete}
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
