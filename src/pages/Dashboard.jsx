import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import SummaryCard from '../components/SummaryCard';
import { mockProducts } from '../data/mockProducts';

function SparkLogo() {
  return (
    <div className="spark-logo" aria-hidden="true">
      <span className="spark-logo__mark">*</span>
      <span className="spark-logo__text">_RK</span>
    </div>
  );
}

function CategoryIcon({ type }) {
  if (type === 'skincare') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M8 9.5h8M9.5 14.5h5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 4.5a6.2 6.2 0 0 0-6.2 6.2c0 4.3 3.7 8.8 6.2 8.8s6.2-4.5 6.2-8.8A6.2 6.2 0 0 0 12 4.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="9.2" cy="10.2" r="1" fill="currentColor" />
      <circle cx="14.8" cy="9.5" r="1" fill="currentColor" />
      <circle cx="12.3" cy="13.6" r="1" fill="currentColor" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="5" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="5" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="5" y="14" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 5.2v13.6M5.2 12h13.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Dashboard() {
  const [products] = useState(mockProducts);

  const totalProducts = products.length;
  const expiringSoon = products.filter((product) => product.status === 'expiring').length;
  const expired = products.filter((product) => product.status === 'expired').length;

  return (
    <div className="dashboard-shell">
      <Navbar />

      <main className="dashboard-page">
        <section className="hero-section">
          <div className="hero-card">
            <h1>Shelfyn</h1>
            <p>Too pretty to expire.</p>
            <button type="button" className="hero-card__button">
              <PlusIcon />
              <span>Start My Vanity</span>
            </button>
          </div>
        </section>

        <section className="dashboard-summary">
          <div className="dashboard-summary__left">
            <SparkLogo />
            <p>Your shelf deserves better</p>
          </div>

          <div className="dashboard-summary__right">
            <SummaryCard label="Total Products" value={totalProducts} tone="safe" />
            <SummaryCard label="Expiring Soon" value={expiringSoon} tone="warning" />
            <SummaryCard label="Expired" value={expired} tone="danger" />
          </div>
        </section>

        <section className="shelf-layout">
          <aside className="shelf-sidebar">
            <h2>
              Your
              <span>Shelf</span>
            </h2>
            <p>Keep your collection fresh and loved. Keep track of every drop.</p>

            <button type="button" className="shelf-sidebar__filter is-active">
              <GridIcon />
              <span>All Items</span>
            </button>

            <button type="button" className="shelf-sidebar__filter">
              <CategoryIcon type="skincare" />
              <span>Skincare</span>
            </button>

            <button type="button" className="shelf-sidebar__filter">
              <CategoryIcon type="makeup" />
              <span>Makeup</span>
            </button>
          </aside>

          <div className="shelf-content">
            <div className="shelf-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

              <button type="button" className="add-card">
                <span className="add-card__icon">
                  <PlusIcon />
                </span>
                <strong>Add New Product</strong>
                <span>Keep your collection organized</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
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
      </footer>
    </div>
  );
}

export default Dashboard;
