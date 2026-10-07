import type { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { formatFCFA, getDiscountPercentage } from '../../utils/formatters';
import { ShoppingBag, Heart, Star, Zap, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  ctaText?: string;
  onCtaClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  ctaText = 'Acheter maintenant',
  onCtaClick 
}) => {
  const { addToCart, wishlist, toggleWishlist, setSelectedProduct, setActiveView, setIsCartOpen } = useStore();
  const isWishlisted = wishlist.includes(product.id);
  const discount = getDiscountPercentage(product.price, product.originalPrice);

  const handleWhatsAppQuick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Bonjour IFPTIE Market ! 👋\nJe souhaite acheter directement ce produit :\n*${product.name}*\nPrix : *${formatFCFA(product.price)}*\nLivraison au Cameroun.\nMerci !`;
    window.open(`https://wa.me/237699000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCtaClick) {
      onCtaClick(product);
    } else {
      addToCart(product, 1);
      // Open cart drawer immediately for fast conversion
      setIsCartOpen(true);
    }
  };

  return (
    <div 
      className="product-card"
      onClick={() => {
        setSelectedProduct(product);
        setActiveView('product-detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      style={{ cursor: 'pointer' }}
    >
      {/* Badges container */}
      <div className="product-badges">
        {discount && (
          <span className="badge badge-promo">
            -{discount}%
          </span>
        )}
        {product.isFlashDeal && (
          <span className="badge badge-yellow">
            <Zap size={11} /> Flash
          </span>
        )}
        {product.isDiscreetPackaging && (
          <span className="badge badge-discreet">
            🔒 Discret
          </span>
        )}
        <span className={product.origin === 'local' ? 'badge badge-origin-local' : 'badge badge-origin-china'}>
          {product.origin === 'local' ? '🇨🇲 Cameroun' : 'Chine Direct'}
        </span>
      </div>

      {/* Wishlist Button */}
      <button 
        className="product-wishlist-btn"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        title="Ajouter aux favoris"
      >
        <Heart size={16} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : 'currentColor'} />
      </button>

      {/* Product Image */}
      <div className="product-image-container">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          loading="lazy"
        />
      </div>

      {/* Information */}
      <div className="product-info">
        <span className="product-category-label">
          {product.categoryLabel}
        </span>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="product-rating">
          <Star size={13} fill="currentColor" />
          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{product.rating}</span>
          <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>({product.reviewsCount})</span>
        </div>

        {/* Delivery & Reassurance Note */}
        <div style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '4px'
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: 'var(--color-primary-dark)',
            backgroundColor: 'var(--color-primary-subtle)',
            padding: '2px 7px',
            borderRadius: '6px'
          }}>
            ⚡ {product.deliveryDays}
          </span>
          <span className="badge-cod" style={{
            fontSize: '0.625rem',
            padding: '2px 6px',
            borderRadius: '5px'
          }}>
            💵 Cash à la livraison
          </span>
        </div>

        {/* Price Row (current price in FCFA + crossed out old price + discount percentage tag) */}
        <div className="product-price-row">
          <span className="price-main">{formatFCFA(product.price)}</span>
          {product.originalPrice && (
            <span className="price-strike">{formatFCFA(product.originalPrice)}</span>
          )}
          {discount && (
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#dc2626',
              backgroundColor: '#fee2e2',
              padding: '2px 6px',
              borderRadius: '4px',
              marginLeft: 'auto'
            }}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Action Button: "Acheter maintenant" */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', marginTop: '6px' }}>
          <button 
            className="btn btn-yellow btn-sm"
            onClick={handleBuyNow}
            style={{ width: '100%', gap: '6px', fontWeight: 800 }}
          >
            <ShoppingBag size={15} />
            <span>{ctaText}</span>
          </button>

          <button
            className="btn btn-whatsapp btn-sm"
            onClick={handleWhatsAppQuick}
            style={{ padding: '6px 10px' }}
            title="Commander directement via WhatsApp"
          >
            <MessageCircle size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
