import React from 'react';
import { useStore } from '../../store/useStore';
import { Home, Search, PackageCheck, ShoppingCart } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeView, setActiveView, getCartCount } = useStore();
  const cartCount = getCartCount();

  const handleSearchClick = () => {
    if (activeView !== 'storefront') {
      setActiveView('storefront');
    }
    setTimeout(() => {
      const input = document.getElementById('mobile-search-input') as HTMLInputElement | null;
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  return (
    <nav className="mobile-bottom-nav">
      {/* 1. Accueil */}
      <button 
        className={`mobile-nav-item ${activeView === 'storefront' ? 'active' : ''}`}
        onClick={() => {
          setActiveView('storefront');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <Home />
        <span>Accueil</span>
      </button>

      {/* 3. Recherche */}
      <button 
        className="mobile-nav-item"
        onClick={handleSearchClick}
      >
        <Search />
        <span>Recherche</span>
      </button>

      {/* 4. Commandes */}
      <button 
        className={`mobile-nav-item ${activeView === 'tracking' ? 'active' : ''}`}
        onClick={() => setActiveView('tracking')}
      >
        <PackageCheck />
        <span>Commandes</span>
      </button>

      {/* 5. Panier */}
      <button 
        className={`mobile-nav-item ${activeView === 'cart' ? 'active' : ''}`}
        onClick={() => {
          setActiveView('cart');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <ShoppingCart />
        <span>Panier</span>
        {cartCount > 0 && <span className="mobile-nav-badge">{cartCount}</span>}
      </button>
    </nav>
  );
};
