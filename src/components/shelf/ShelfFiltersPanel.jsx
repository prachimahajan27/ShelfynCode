import { GridIcon, CategoryIcon } from '../icons';

export const FILTER_ITEMS = [
  { id: 'all',        label: 'All Items',   iconType: 'grid'     },
  { id: 'Skincare',   label: 'Skincare',    iconType: 'skincare' },
  { id: 'Makeup',     label: 'Makeup',      iconType: 'makeup'   },
  { id: 'Lip Product',label: 'Lip Product', iconType: 'makeup'   },
  { id: 'Eye Makeup', label: 'Eye Makeup',  iconType: 'makeup'   },
  { id: 'Moisturizer',label: 'Moisturizer', iconType: 'skincare' },
];

function FilterButton({ item, isActive, onClick }) {
  const icon =
    item.iconType === 'grid' ? <GridIcon /> : <CategoryIcon type={item.iconType} />;

  return (
    <button
      type="button"
      className={`shelf-sidebar__filter${isActive ? ' is-active' : ''}`}
      onClick={onClick}
    >
      {icon}
      <span>{item.label}</span>
    </button>
  );
}

function ShelfFiltersPanel({ activeFilter = 'all', onFilterChange }) {
  return (
    <>
      <h2>
        Your
        <span>Shelf</span>
      </h2>
      <p>Keep your collection fresh and loved. Keep track of every drop.</p>

      {FILTER_ITEMS.map((item) => (
        <FilterButton
          key={item.id}
          item={item}
          isActive={activeFilter === item.id}
          onClick={() => onFilterChange?.(item.id)}
        />
      ))}
    </>
  );
}

export default ShelfFiltersPanel;
