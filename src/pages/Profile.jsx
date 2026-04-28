import { useEffect, useMemo } from 'react';
import Navbar from '../components/layout/Navbar';
import { AvatarIcon } from '../components/icons';
import { sortProductsByExpiry } from '../utils/productSort';

const MOCK_USER = {
  name: 'Aanya Sharma',
  handle: '@aanya',
  joinedYear: 2024,
};

function ProfileStatCard({ value, label, tone }) {
  return (
    <div className="summary-card summary-card--safe prf__stat">
      <span className={`summary-card__dot summary-card__dot--${tone ?? 'safe'}`} />
      <span className="summary-card__value">{value}</span>
      <span className="summary-card__label">{label}</span>
    </div>
  );
}

function Profile({ activePage, onNavigate, products = [], onOpenModal, refreshProducts }) {
  useEffect(() => {
    refreshProducts?.();
  }, []);

  const sortedProducts = useMemo(() => sortProductsByExpiry(products), [products]);
  const total = sortedProducts.length;
  const favorites = sortedProducts.filter((product) => product.isFavorite).length;
  const expired = sortedProducts.filter((product) => product.status === 'expired').length;
  const safe = sortedProducts.filter((product) => product.status === 'safe').length;
  const expiring = sortedProducts.filter((product) => product.status === 'expiring').length;
  const categoryBreakdown = Object.entries(
    sortedProducts.reduce((acc, product) => {
      const key = product.category || 'Others';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((left, right) => right[1] - left[1])
    .slice(0, 4);

  const collectionPreview = sortedProducts.slice(0, 3);

  return (
    <div className="dashboard-shell">
      <Navbar
        activePage={activePage}
        onNavigate={onNavigate}
        onOpenModal={onOpenModal}
      />

      <main className="dashboard-page">
        <section className="hero-section prf__hero">
          <div className="page-container hero-section__inner">
            <div className="hero-card prf__card">
              <div className="prf__avatar">
                <AvatarIcon />
              </div>
              <h1 className="prf__name">{MOCK_USER.name}</h1>
              <p className="prf__handle">{MOCK_USER.handle}</p>
              <p className="prf__since">Shelfyn member since {MOCK_USER.joinedYear}</p>
            </div>
          </div>
        </section>

        <section className="dashboard-summary">
          <div className="page-container dashboard-summary__inner">
            <div className="dashboard-summary__left">
              <h2 className="prf__section-title">Your Collection</h2>
              {collectionPreview.length > 0 ? (
                collectionPreview.map((product) => (
                  <p key={product.id}>
                    {product.name} • {product.category}
                  </p>
                ))
              ) : (
                <p>No products added yet.</p>
              )}
            </div>
            <div className="dashboard-summary__right">
              <ProfileStatCard value={total} label="Total Products" tone="safe" />
              <ProfileStatCard value={favorites} label="In My Vanity" tone="safe" />
              <ProfileStatCard value={safe} label="Safe to Use" tone="safe" />
              <ProfileStatCard value={expired} label="Expired" tone="danger" />
            </div>
          </div>
        </section>

        <section className="shelf-layout">
          <div className="page-container prf__info-grid">
            <div className="prf__info-card">
              <h3 className="prf__info-title">Account</h3>
              <div className="prf__info-row">
                <span className="prf__info-label">Name</span>
                <span className="prf__info-value">{MOCK_USER.name}</span>
              </div>
              <div className="prf__info-row">
                <span className="prf__info-label">Handle</span>
                <span className="prf__info-value">{MOCK_USER.handle}</span>
              </div>
              <div className="prf__info-row">
                <span className="prf__info-label">Member since</span>
                <span className="prf__info-value">{MOCK_USER.joinedYear}</span>
              </div>
            </div>

            <div className="prf__info-card">
              <h3 className="prf__info-title">Collection Breakdown</h3>
              {categoryBreakdown.length > 0 ? (
                categoryBreakdown.map(([label, value], index) => {
                  const tones = ['safe', 'warning', 'danger', 'safe'];
                  return (
                    <div key={label} className="prf__info-row">
                      <span className="prf__info-label">
                        <span className={`summary-card__dot prf__inline-dot summary-card__dot--${tones[index]}`} />
                        {label}
                      </span>
                      <span className="prf__info-value">{value}</span>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="prf__info-row">
                    <span className="prf__info-label">
                      <span className="summary-card__dot prf__inline-dot summary-card__dot--safe" />
                      Safe products
                    </span>
                    <span className="prf__info-value">{safe}</span>
                  </div>
                  <div className="prf__info-row">
                    <span className="prf__info-label">
                      <span className="summary-card__dot prf__inline-dot summary-card__dot--warning" />
                      Expiring soon
                    </span>
                    <span className="prf__info-value">{expiring}</span>
                  </div>
                  <div className="prf__info-row">
                    <span className="prf__info-label">
                      <span className="summary-card__dot prf__inline-dot summary-card__dot--danger" />
                      Expired products
                    </span>
                    <span className="prf__info-value">{expired}</span>
                  </div>
                  <div className="prf__info-row">
                    <span className="prf__info-label">
                      <span className="summary-card__dot prf__inline-dot summary-card__dot--safe" />
                      Vanity favourites
                    </span>
                    <span className="prf__info-value">{favorites}</span>
                  </div>
                </>
              )}
            </div>
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

export default Profile;
