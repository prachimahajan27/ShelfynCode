const statusLabels = {
  safe: 'SAFE',
  expiring: 'EXPIRING SOON',
  expired: 'EXPIRED',
};

function StatusIcon({ status }) {
  if (status === 'expired') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (status === 'expiring') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 7.8v4.8l3 1.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.7 12.2l2.1 2.1 4.5-4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductArt({ color }) {
  return (
    <div className={`product-card__art product-card__art--${color}`}>
      <div className={`product-card__shape product-card__shape--${color}`} />
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className={`product-card__badge product-card__badge--${product.status}`}>
        {statusLabels[product.status]}
      </div>

      <ProductArt color={product.color} />

      <div className="product-card__body">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
      </div>

      <div className={`product-card__footer product-card__footer--${product.status}`}>
        <div className="product-card__note">
          <StatusIcon status={product.status} />
          <span>{product.note}</span>
        </div>
        {product.showDot && <span className="product-card__status-dot" />}
      </div>
    </article>
  );
}

export default ProductCard;
