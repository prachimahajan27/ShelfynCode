import { AvatarIcon, PlusIcon } from '../icons';

const NAV_ITEMS = ['Dashboard', 'Vanity', 'Insights', 'Profile'];

function Navbar() {
  return (
    <header className="navbar">
      <div className="page-container navbar__inner">
        <div className="navbar__brand">Shelfyn</div>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item}
              type="button"
              className={`navbar__link${index === 0 ? ' is-active' : ''}`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="navbar__actions">
          <button type="button" className="navbar__add">
            <PlusIcon />
            <span>Add Product</span>
          </button>

          <button type="button" className="navbar__avatar" aria-label="Profile">
            <AvatarIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
