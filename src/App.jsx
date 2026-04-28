import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Insights from './pages/Insights';
import Vanity from './pages/Vanity';
import Profile from './pages/Profile';
import AddProductModal from './components/shelf/AddProductModal';
import { getProducts } from "./api/productApi";

const CATEGORY_COLOR = {
  Skincare: 'serum',
  Moisturizer: 'cream',
  Makeup: 'gold',
  'Lip Product': 'gold',
  'Eye Makeup': 'charcoal',
  Fragrance: 'serum',
  'Hair Care': 'cream',
  'Body Care': 'cream',
  Tools: 'charcoal',
};

function normalizeStatus(expiryDate, rawStatus) {
  if (rawStatus) {
    const status = String(rawStatus).toLowerCase();
    if (status === 'safe' || status === 'expiring' || status === 'expired') {
      return status;
    }
  }

  if (!expiryDate) return 'safe';

  const today = new Date();
  const expiry = new Date(expiryDate);
  const msLeft = expiry - today;
  const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) return 'expired';
  if (daysLeft <= 30) return 'expiring';
  return 'safe';
}

function buildNote(expiryDate, status) {
  if (!expiryDate) return 'No expiry set';
  if (status === 'expired') return 'Discard';

  const today = new Date();
  const expiry = new Date(expiryDate);
  const msLeft = expiry - today;
  const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24));

  if (daysLeft <= 0) return 'Expires today';
  return `${daysLeft} days left`;
}

function normalizeProduct(product) {
  const status = normalizeStatus(product.expiryDate, product.status);

  return {
    ...product,
    status,
    note: product.note ?? buildNote(product.expiryDate, status),
    color: product.color ?? CATEGORY_COLOR[product.category] ?? 'serum',
    showDot: product.showDot ?? true,
    isFavorite: product.isFavorite ?? product.favorite ?? false,
  };
}

function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      const items = Array.isArray(res.data) ? res.data : [];
      setProducts(items.map(normalizeProduct));
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const sharedProps = {
    activePage,
    onNavigate: setActivePage,
    onOpenModal: () => setIsModalOpen(true),
    products,
    refreshProducts: fetchProducts,
  };

  let currentPage;
  if (activePage === 'Insights') {
    currentPage = <Insights {...sharedProps} />;
  } else if (activePage === 'Vanity') {
    currentPage = <Vanity {...sharedProps} />;
  } else if (activePage === 'Profile') {
    currentPage = <Profile {...sharedProps} />;
  } else {
    currentPage = <Dashboard {...sharedProps} />;
  }

  return (
    <>
      {currentPage}
      {isModalOpen && (
        <AddProductModal
          onClose={() => setIsModalOpen(false)}
          onAddProduct={fetchProducts}
        />
      )}
    </>
  );
}

export default App;
