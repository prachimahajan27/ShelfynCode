import { StatusIcon } from '../icons';

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

function ProductCard({ product }) {
  const { name, category, status, note, color, showDot } = product;

  return (
    <article className="product-card">
      <div className={`product-card__badge product-card__badge--${status}`}>
        {STATUS_LABELS[status]}
      </div>

      <ProductArt color={color} />

      <div className="product-card__body">
        <h3>{name}</h3>
        <p>{category}</p>
      </div>

      <div className={`product-card__footer product-card__footer--${status}`}>
        <div className="product-card__note">
          <StatusIcon status={status} />
          <span>{note}</span>
        </div>
        {showDot && <span className="product-card__status-dot" />}
      </div>
    </article>
  );
}

export default ProductCard;
