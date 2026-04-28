import Navbar from '../components/layout/Navbar';
import ProductCard from '../components/shelf/ProductCard';
import AddCard from '../components/shelf/AddCard';
import { PlusIcon } from '../components/icons';
import { deleteProduct, toggleFavorite } from '../api/productApi';
import { sortProductsByExpiry } from '../utils/productSort';

function VanityHero({ onOpenModal, showButton }) {
  return (
    <section className="hero-section">
      <div className="page-container hero-section__inner">
        <div className="hero-card">
          <h1>My Vanity ✨</h1>
          <p>Your everyday essentials, all in one place</p>
          {showButton && (
            <button type="button" className="hero-card__button" onClick={onOpenModal}>
              <PlusIcon />
              <span>Add to Vanity</span>
            </button>
          )}
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
        <span>Start My Vanity</span>
      </button>
    </div>
  );
}

function Vanity({ activePage, onNavigate, products = [], onOpenModal, refreshProducts }) {
  const vanityProducts = sortProductsByExpiry(
    products.filter((product) => product.isFavorite && product.status === 'safe')
  );

  function handleAddClick() {
    onOpenModal?.();
  }

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

  return (
    <div className="dashboard-shell">
      <Navbar activePage={activePage} onNavigate={onNavigate} onOpenModal={onOpenModal} />

      <main className="dashboard-page">
        <VanityHero onOpenModal={onOpenModal} showButton={vanityProducts.length > 0} />

        <section className="van__section">
          <div className="page-container van__inner">
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

            <div className="van__content">
              {vanityProducts.length === 0 ? (
                <VanityEmptyState onAddClick={handleAddClick} />
              ) : (
                <div className="van__grid">
                  {vanityProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onToggleFavorite={handleFavorite}
                      onDelete={handleDelete}
                      vanityMode
                    />
                  ))}
                  <AddCard onClick={onOpenModal} />
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
