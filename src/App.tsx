import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { ProductDetailModal } from './components/storefront/ProductDetailModal';
import { ToastContainer } from './components/common/ToastContainer';

// Mobile-specific components
import { MobileCategoriesScroll } from './components/mobile/MobileCategoriesScroll';

// Storefront sections
import { HeroSection } from './components/storefront/HeroSection';
import { CategorySection } from './components/storefront/CategorySection';
import { TrendingSection } from './components/storefront/TrendingSection';
import { PromoBannerSection } from './components/storefront/PromoBannerSection';
import { BestSellersSection } from './components/storefront/BestSellersSection';
import { NewArrivalsSection } from './components/storefront/NewArrivalsSection';
import { ProductCatalog } from './components/storefront/ProductCatalog';
import { SocialProofSection } from './components/storefront/SocialProofSection';
import { FinalCtaSection } from './components/storefront/FinalCtaSection';

// Directory, Listing, Promotion, Trending, Product Detail & Cart Views
import { CategoryBrowseView } from './components/categories/CategoryBrowseView';
import { ProductListingView } from './components/listing/ProductListingView';
import { PromotionsView } from './components/promotions/PromotionsView';
import { TrendingView } from './components/trending/TrendingView';
import { ProductDetailView } from './components/product/ProductDetailView';
import { CartView } from './components/cart/CartView';

// Views
import { CheckoutView } from './components/checkout/CheckoutView';
import { OrderConfirmationView } from './components/checkout/OrderConfirmationView';
import { OrderTrackingView } from './components/tracking/OrderTrackingView';
import { CourierDashboard } from './components/courier/CourierDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

export function App() {
  const { activeView, setActiveView } = useStore();

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setActiveView('admin');
      } else if (window.location.hash === '#courier') {
        setActiveView('courier');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [setActiveView]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 1. Universal Top Header (Mobile sticky bar + search & Desktop navigation) */}
      <Navbar />

      {/* 2. Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeView === 'storefront' && (
          <div className="container" style={{ paddingTop: '16px' }}>
            {/* SHEIN-STYLE AUTO-SLIDING COMMERCIAL HERO BANNER */}
            <HeroSection />

            {/* MOBILE CATEGORIES: Horizontally scrollable cards */}
            <div className="mobile-only">
              <MobileCategoriesScroll />
            </div>

            {/* DESKTOP CATEGORIES: 8-card grid */}
            <div className="desktop-only">
              <CategorySection />
            </div>

            {/* "🔥 Tendances": 2-col mobile grid with "Acheter" button */}
            <TrendingSection />

            {/* "⚡ Offres flash": Strong promo banner with countdown */}
            <PromoBannerSection />

            {/* "Les meilleures ventes": 2-col mobile grid */}
            <BestSellersSection />

            {/* "Nouveautés": 2-col mobile grid */}
            <NewArrivalsSection />

            {/* Avis clients au Cameroun (Mobile swipeable cards) */}
            <SocialProofSection />

            {/* Catalogue complet avec recherche & filtres */}
            <ProductCatalog />

            {/* Final CTA */}
            <FinalCtaSection />
          </div>
        )}

        {/* Categories Directory View */}
        {activeView === 'categories' && <CategoryBrowseView />}

        {/* Product Listing / Search Results View */}
        {activeView === 'listing' && <ProductListingView />}

        {/* Dedicated Promotions & Deals View */}
        {activeView === 'promotions' && <PromotionsView />}

        {/* Dedicated Trending & Best-Sellers View */}
        {activeView === 'trending' && <TrendingView />}

        {/* Dedicated High-Conversion Product Detail View */}
        {activeView === 'product-detail' && <ProductDetailView />}

        {/* Dedicated Full Shopping Cart View */}
        {activeView === 'cart' && <CartView />}

        {/* Ecosystem Views */}
        {activeView === 'checkout' && <CheckoutView />}
        {activeView === 'order-confirmation' && <OrderConfirmationView />}
        {activeView === 'tracking' && <OrderTrackingView />}
        {activeView === 'courier' && <CourierDashboard />}
        {activeView === 'admin' && <AdminDashboard />}
      </main>

      {/* 3. Universal Footer (hidden in courier & admin modes) */}
      {activeView !== 'courier' && activeView !== 'admin' && <Footer />}

      {/* 4. Sticky Mobile Bottom Navigation (Accueil, Catégories, Recherche, Commandes, Panier) */}
      {activeView !== 'courier' && activeView !== 'admin' && <BottomNav />}

      {/* 5. Slide-out Cart Drawer */}
      <CartDrawer />

      {/* 6. Quick View Product Modal */}
      <ProductDetailModal />

      {/* 7. Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;
