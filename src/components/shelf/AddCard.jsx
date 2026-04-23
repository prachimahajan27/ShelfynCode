import { PlusIcon } from '../icons';

function AddCard({ onClick }) {
  return (
    <button type="button" className="add-card" onClick={onClick}>
      <span className="add-card__icon">
        <PlusIcon />
      </span>
      <strong>Add New Product</strong>
      <span>Keep your collection organized</span>
    </button>
  );
}

export default AddCard;
