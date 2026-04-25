import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { addProduct } from "../../api/productApi";

const CATEGORIES = ['Skincare', 'Makeup', 'Lip Product', 'Eye Makeup', 'Moisturizer', 'Fragrance', 'Hair Care', 'Body Care', 'Tools'];

function SparkleIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" width="36" height="36">
      <path
        d="M20 4 L22.5 17.5 L36 20 L22.5 22.5 L20 36 L17.5 22.5 L4 20 L17.5 17.5 Z"
        fill="#cb5e96"
        opacity="0.9"
      />
      <path
        d="M30 8 L31.2 13.8 L37 15 L31.2 16.2 L30 22 L28.8 16.2 L23 15 L28.8 13.8 Z"
        fill="#dd6f9f"
        opacity="0.7"
      />
    </svg>
  );
}

function ModalLeftPanel() {
  return (
    <div className="apm__left">
      <div className="apm__left-icon">
        <SparkleIcon />
      </div>
      <h2 className="apm__left-title">Elevate Your Ritual</h2>
      <p className="apm__left-desc">
        Shelfyn: Too pretty to expire. Adding a new essential to your vanity collection.
      </p>
    </div>
  );
}

function FormField({ label, optional, children }) {
  return (
    <div className="apm__field">
      <label className="apm__label">
        {label}
        {optional && <span className="apm__label-optional"> optional</span>}
      </label>
      {children}
    </div>
  );
}

function AddProductModal({ onClose, onAddProduct }) {
  const [form, setForm] = useState({
    name: '',
    category: 'Skincare',
    price: '',
    openingDate: '',
    expiryDate: '',
    unknownExpiry: false,
  });
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const newProduct = {
      name: form.name,
      category: form.category,
      price: form.price ? Number(form.price) : null,
      openingDate: form.openingDate || null,
      expiryDate: form.expiryDate || null,
      favorite: false
    };

    await addProduct(newProduct);

    onAddProduct();   // refresh products
    onClose();        // close modal

  } catch (err) {
    console.error(err);
  }
};

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Clear expiry date when checkbox is toggled on
      ...(name === 'unknownExpiry' && checked ? { expiryDate: '' } : {}),
    }));
  }

  // Maps category → card art color
  const CATEGORY_COLOR = {
    'Skincare':    'serum',
    'Moisturizer': 'cream',
    'Makeup':      'gold',
    'Lip Product': 'gold',
    'Eye Makeup':  'charcoal',
    'Fragrance':   'serum',
    'Hair Care':   'cream',
    'Body Care':   'cream',
    'Tools':       'charcoal',
  };

  function computeStatus(expiryDate, unknownExpiry) {
    if (unknownExpiry || !expiryDate) return 'safe';
    const msLeft = new Date(expiryDate) - new Date();
    const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24));
    if (daysLeft < 0)  return 'expired';
    if (daysLeft <= 30) return 'expiring';
    return 'safe';
  }

  function buildNote(expiryDate, unknownExpiry) {
    if (unknownExpiry || !expiryDate) return 'No expiry set';
    const msLeft = new Date(expiryDate) - new Date();
    const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24));
    if (daysLeft < 0)  return 'Discard';
    if (daysLeft === 0) return 'Expires today';
    return `${daysLeft} days left`;
  }

  

  const modal = (
    <div className="apm__overlay" role="dialog" aria-modal="true" aria-label="Add Product">
      {/* Backdrop — click outside closes */}
      <button type="button" className="apm__backdrop" aria-label="Close modal" onClick={onClose} />

      <div className="apm__card">
        <ModalLeftPanel />

        <div className="apm__right">
          {/* Header */}
          <div className="apm__header">
            <div>
              <h2 className="apm__title">Add Product</h2>
              <p className="apm__subtitle">Capture the details of your latest find</p>
            </div>
            <button type="button" className="apm__close" aria-label="Close" onClick={onClose}>
              ×
            </button>
          </div>

          {/* Form */}
          <form className="apm__form" onSubmit={handleSubmit}>
            <FormField label="PRODUCT NAME">
              <input
                className="apm__input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Midnight Recovery Oil"
                autoComplete="off"
              />
            </FormField>

            <div className="apm__row">
              <FormField label="CATEGORY">
                <div className="apm__select-wrap">
                  <select
                    className="apm__select"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <span className="apm__select-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </FormField>

              <FormField label="PRICE (₹)" optional>
                <input
                  className="apm__input"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  min="0"
                />
              </FormField>
            </div>

            <div className="apm__row">
              <FormField label="OPENING DATE">
                <input
                  className="apm__input"
                  type="date"
                  name="openingDate"
                  value={form.openingDate}
                  onChange={handleChange}
                />
              </FormField>

              <FormField label="EXPIRY DATE">
                <input
                  className="apm__input"
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleChange}
                  disabled={form.unknownExpiry}
                />
              </FormField>
            </div>

            <label className="apm__checkbox-label">
              <input
                type="checkbox"
                name="unknownExpiry"
                checked={form.unknownExpiry}
                onChange={handleChange}
                className="apm__checkbox"
              />
              <span className="apm__checkbox-custom" aria-hidden="true" />
              <span>I don't know the expiry date</span>
            </label>

            <button type="submit" className="apm__submit">
              Save to Vanity
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

export default AddProductModal;
