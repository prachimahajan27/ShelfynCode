import { Trash2 } from 'lucide-react';
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

function ProductCard({ product, onToggleFavorite, onDelete, vanityMode = false }) {
  const { name, category, status, note, color, showDot, isFavorite } = product;

  return (
    <article className={`product-card${vanityMode ? ' product-card--vanity' : ''}`}>
      <div className={`product-card__badge product-card__badge--${status}`}>
        {STATUS_LABELS[status]}
      </div>

      {(onDelete || onToggleFavorite) && (
        <div className="product-card__actions">
          {onDelete && (
            <button
              type="button"
              className="product-card__delete"
              aria-label="Delete item"
              onClick={() => onDelete(product.id)}
            >
              <Trash2 size={19} strokeWidth={1.9} />
            </button>
          )}

          {onToggleFavorite && (
            <button
              type="button"
              className={`product-card__star${isFavorite ? ' is-active' : ''}`}
              aria-label="Mark as favorite"
              onClick={() => onToggleFavorite(product.id)}
            >
              <StarIcon filled={false} />
            </button>
          )}
        </div>
      )}

      <ProductArt color={color} />

      <div className="product-card__body">
        <h3>{name}</h3>
        <p>{category}</p>
      </div>

      <div className={`product-card__footer product-card__footer--${status}`}>
        <div className="product-card__note">
          <StatusIcon status={status} />
          {!vanityMode && <span>{note}</span>}
        </div>
        {showDot && !vanityMode && <span className="product-card__status-dot" />}
      </div>
    </article>
  );
}

export default ProductCard;
