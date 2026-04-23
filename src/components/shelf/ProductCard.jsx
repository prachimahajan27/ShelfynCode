import { StatusIcon, StarIcon } from '../icons';

const STATUS_LABELS = {
  safe: 'SAFE',
  expiring: 'EXPIRING SOON',
  expired: 'EXPIRED',
};

function ProductArt({ color }) {
  return (
    <div className={`product-card__art product-card__art--${color}`}>
      <div className={`product-card__shape product-card__shape--${color}`} />
    </div>
  );
}

function ProductCard({ product, onToggleFavorite, vanityMode = false }) {
  const { name, category, status, note, color, showDot, isFavorite } = product;

  return (
    <article className={`product-card${vanityMode ? ' product-card--vanity' : ''}`}>
      <div className={`product-card__badge product-card__badge--${status}`}>
        {STATUS_LABELS[status]}
      </div>

      {/* Star / favorite toggle — only shown when handler is provided */}
      {onToggleFavorite && (
        <button
          type="button"
          className={`product-card__star${isFavorite ? ' is-active' : ''}`}
          aria-label={isFavorite ? 'Remove from Vanity' : 'Add to Vanity'}
          onClick={() => onToggleFavorite(product.id)}
        >
          <StarIcon filled={isFavorite} />
        </button>
      )}

      <ProductArt color={color} />

      <div className="product-card__body">
        <h3>{name}</h3>
        <p>{category}</p>
      </div>

      <div className={`product-card__footer product-card__footer--${status}`}>
        <div className="product-card__note">
          <StatusIcon status={status} />
          {/* vanityMode hides the "days left" note text for a cleaner look */}
          {!vanityMode && <span>{note}</span>}
        </div>
        {showDot && !vanityMode && <span className="product-card__status-dot" />}
      </div>
    </article>
  );
}

export default ProductCard;

