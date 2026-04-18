const navItems = ['Dashboard', 'Vanity', 'Insights', 'Profile'];

function AvatarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M6.8 18.2c1.1-2.7 3.1-4.1 5.2-4.1s4.1 1.4 5.2 4.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
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

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">Shelfyn</div>

      <nav className="navbar__links" aria-label="Primary">
        {navItems.map((item, index) => (
          <button
            key={item}
            type="button"
            className={`navbar__link ${index === 0 ? 'is-active' : ''}`}
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
    </header>
  );
}

export default Navbar;
