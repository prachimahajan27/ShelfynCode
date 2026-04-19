import { GridIcon, CategoryIcon } from '../icons';

const FILTER_ITEMS = [
  { id: 'all', label: 'All Items', iconType: 'grid', defaultActive: true },
  { id: 'skincare', label: 'Skincare', iconType: 'skincare' },
  { id: 'makeup', label: 'Makeup', iconType: 'makeup' },
];

function FilterButton({ item, isActive }) {
  const icon =
    item.iconType === 'grid' ? (
      <GridIcon />
    ) : (
      <CategoryIcon type={item.iconType} />
    );

  return (
    <button
      type="button"
      className={`shelf-sidebar__filter${isActive ? ' is-active' : ''}`}
    >
      {icon}
      <span>{item.label}</span>
    </button>
  );
}

function ShelfFiltersPanel() {
  return (
    <>
      <h2>
        Your
        <span>Shelf</span>
      </h2>
      <p>Keep your collection fresh and loved. Keep track of every drop.</p>

      {FILTER_ITEMS.map((item) => (
        <FilterButton key={item.id} item={item} isActive={item.defaultActive} />
      ))}
    </>
  );
}

export default ShelfFiltersPanel;
