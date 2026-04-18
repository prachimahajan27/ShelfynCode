function SummaryCard({ label, value, tone }) {
  return (
    <div className={`summary-card summary-card--${tone}`}>
      <span className="summary-card__dot" />
      <span className="summary-card__value">{value}</span>
      <span className="summary-card__label">{label}</span>
    </div>
  );
}

export default SummaryCard;
