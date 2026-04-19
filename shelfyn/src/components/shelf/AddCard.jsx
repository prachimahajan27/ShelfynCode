import { PlusIcon } from '../icons';

function AddCard() {
  return (
    <button type="button" className="add-card">
      <span className="add-card__icon">
        <PlusIcon />
      </span>
      <strong>Add New Product</strong>
      <span>Keep your collection organized</span>
    </button>
  );
}

export default AddCard;
