import Navbar from '../components/layout/Navbar';
import ProductCard from '../components/shelf/ProductCard';
import { PlusIcon } from '../components/icons';

function VanityHero({ onOpenModal }) {
  return (
    <section className="hero-section">
      <div className="page-container hero-section__inner">
        <div className="hero-card">
          <h1>My Vanity ✨</h1>
          <p>Your everyday essentials, all in one place</p>
          <button type="button" className="hero-card__button" onClick={onOpenModal}>
            <PlusIcon />
            <span>Add to Vanity</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function VanityEmptyState({ onAddClick }) {
  return (
    <div className="van__empty">
      <span className="van__empty-emoji">💄</span>
      <h3 className="van__empty-title">Your vanity is empty</h3>
      <p className="van__empty-desc">
        Star your favourite safe products on the Dashboard to curate your personal vanity.
      </p>
      <button type="button" className="hero-card__button van__empty-btn" onClick={onAddClick}>
        <PlusIcon />
        <span>Add Products</span>
      </button>
    </div>
  );
}

function Vanity({ activePage, onNavigate, products = [], onToggleFavorite, onOpenModal }) {
  // Only show safe + favorited products
  const vanityProducts = products.filter(
    (p) => p.isFavorite && p.status === 'safe'
  );

  function handleAddClick() {
    onOpenModal?.();
  }

  return (
    <div className="dashboard-shell">
      <Navbar activePage={activePage} onNavigate={onNavigate} onOpenModal={onOpenModal} />

      <main className="dashboard-page">
        <VanityHero onOpenModal={onOpenModal} />

        <section className="van__section">
          <div className="page-container van__inner">

            {/* Sidebar label */}
            <aside className="van__sidebar">
              <h2 className="van__sidebar-title">
                My<span>Picks</span>
              </h2>
              <p className="van__sidebar-desc">
                Only your starred, safe-to-use products live here.
              </p>
              <div className="van__sidebar-count">
                <span className="van__count-num">{vanityProducts.length}</span>
                <span className="van__count-label">essentials</span>
              </div>
            </aside>

            {/* Grid or empty state */}
            <div className="van__content">
              {vanityProducts.length === 0 ? (
                <VanityEmptyState onAddClick={handleAddClick} />
              ) : (
                <div className="van__grid">
                  {vanityProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onToggleFavorite={onToggleFavorite}
                      vanityMode
                    />
                  ))}
                </div>
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

export default Vanity;
