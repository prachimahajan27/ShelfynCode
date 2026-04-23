import Navbar from '../components/layout/Navbar';
import { AvatarIcon } from '../components/icons';

// Mock user — replace with real auth later
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

function Profile({ activePage, onNavigate, products, onOpenModal }) {
  const total     = products.length;
  const favorites = products.filter((p) => p.isFavorite).length;
  const expired   = products.filter((p) => p.status === 'expired').length;
  const safe      = products.filter((p) => p.status === 'safe').length;

  return (
    <div className="dashboard-shell">
      <Navbar
        activePage={activePage}
        onNavigate={onNavigate}
        onOpenModal={onOpenModal}
      />

      <main className="dashboard-page">
        {/* Profile hero — reuses hero-section colours */}
        <section className="hero-section prf__hero">
          <div className="page-container hero-section__inner">
            <div className="hero-card prf__card">
              {/* Avatar circle */}
              <div className="prf__avatar">
                <AvatarIcon />
              </div>
              <h1 className="prf__name">{MOCK_USER.name}</h1>
              <p className="prf__handle">{MOCK_USER.handle}</p>
              <p className="prf__since">Shelfyn member since {MOCK_USER.joinedYear}</p>
            </div>
          </div>
        </section>

        {/* Stats strip — reuses dashboard-summary layout */}
        <section className="dashboard-summary">
          <div className="page-container dashboard-summary__inner">
            <div className="dashboard-summary__left">
              <h2 className="prf__section-title">Your Collection</h2>
            </div>
            <div className="dashboard-summary__right">
              <ProfileStatCard value={total}     label="Total Products" tone="safe"    />
              <ProfileStatCard value={favorites} label="In My Vanity"   tone="safe"    />
              <ProfileStatCard value={safe}      label="Safe to Use"    tone="safe"    />
              <ProfileStatCard value={expired}   label="Expired"        tone="danger"  />
            </div>
          </div>
        </section>

        {/* Info section */}
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
              {[
                { label: 'Safe products',     value: safe,      tone: 'safe'    },
                { label: 'Expiring soon',     value: products.filter(p => p.status === 'expiring').length, tone: 'warning' },
                { label: 'Expired products',  value: expired,   tone: 'danger'  },
                { label: 'Vanity favourites', value: favorites, tone: 'safe'    },
              ].map(({ label, value, tone }) => (
                <div key={label} className="prf__info-row">
                  <span className="prf__info-label">
                    <span className={`summary-card__dot prf__inline-dot summary-card__dot--${tone}`} />
                    {label}
                  </span>
                  <span className="prf__info-value">{value}</span>
                </div>
              ))}
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
