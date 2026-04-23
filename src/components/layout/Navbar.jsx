import { AvatarIcon, PlusIcon } from '../icons';

// 'Profile' removed — represented by the avatar icon on the right instead
const NAV_ITEMS = ['Dashboard', 'Vanity', 'Insights'];

function Navbar({ activePage = 'Dashboard', onNavigate, onOpenModal }) {
  return (
    <header className="navbar">
      <div className="page-container navbar__inner">
        <div className="navbar__brand">Shelfyn</div>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className={`navbar__link${activePage === item ? ' is-active' : ''}`}
              onClick={() => onNavigate?.(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__add"
            onClick={onOpenModal}
          >
            <PlusIcon />
            <span>Add Product</span>
          </button>

          {/* Avatar navigates to Profile page */}
          <button
            type="button"
            className={`navbar__avatar${activePage === 'Profile' ? ' is-active' : ''}`}
            aria-label="Profile"
            onClick={() => onNavigate?.('Profile')}
          >
            <AvatarIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
