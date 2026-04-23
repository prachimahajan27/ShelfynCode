import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Insights from './pages/Insights';
import Vanity from './pages/Vanity';
import Profile from './pages/Profile';
import { mockProducts } from './data/mockProducts';

function App() {
  const [activePage, setActivePage]     = useState('Dashboard');
  const [products, setProducts]         = useState(mockProducts);
  const [isModalOpen, setIsModalOpen]   = useState(false);

  function handleToggleFavorite(id) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)),
    );
  }

  function handleAddProduct(newProduct) {
    setProducts((prev) => [...prev, newProduct]);
  }

  // Shared props every page receives
  const sharedProps = {
    activePage,
    onNavigate:        setActivePage,
    products,
    onToggleFavorite:  handleToggleFavorite,
    onAddProduct:      handleAddProduct,
    onOpenModal:       () => setIsModalOpen(true),
  };

  if (activePage === 'Insights') return <Insights activePage={activePage} onNavigate={setActivePage} products={products} />;
  if (activePage === 'Vanity')   return <Vanity   {...sharedProps} />;
  if (activePage === 'Profile')  return <Profile  {...sharedProps} />;
  return <Dashboard {...sharedProps} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />;
}

export default App;
