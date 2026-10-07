import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA, getDiscountPercentage } from '../../utils/formatters';
import { DiscreetNotice } from '../common/DiscreetNotice';
import { 
  X, 
  ShoppingCart, 
  MessageCircle, 
  Star, 
  Truck, 
  ShieldCheck, 
  Check, 
  Plus, 
  Minus,
  Heart
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, wishlist, toggleWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedProduct) return null;

  const discount = getDiscountPercentage(selectedProduct.price, selectedProduct.originalPrice);
  const isWishlisted = wishlist.includes(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
  };

  const handleWhatsAppOrder = () => {
    const message = `Bonjour IFPTIE Market ! 👋\nJe souhaite commander immédiatement le produit suivant :\n\n📦 *${selectedProduct.name}*\n🔢 Quantité : *${quantity}*\n💰 Total : *${formatFCFA(selectedProduct.price * quantity)}*\n\nJe réside au Cameroun. Merci de me contacter pour la livraison !`;
    window.open(`https://wa.me/237699000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', padding: '24px' }}>
          {/* Images Gallery */}
          <div>
            <div style={{
              width: '100%',
              paddingTop: '85%',
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              backgroundColor: '#f8fafc',
              border: '1px solid var(--border-subtle)',
              marginBottom: '12px'
            }}>
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '16px'
                }}
              />
            </div>

            {selectedProduct.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: 'var(--radius-sm)',
                      border: activeImageIndex === idx ? '2px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      padding: '2px',
                      background: '#fff'
                    }}
                  >
                    <img src={img} alt="Aperçu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Buy Form */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Badges row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className={selectedProduct.origin === 'local' ? 'badge badge-origin-local' : 'badge badge-origin-china'}>
                {selectedProduct.originLabel}
              </span>
              {discount && <span className="badge badge-promo">-{discount}% Économie</span>}
              {selectedProduct.isDiscreetPackaging && <span className="badge badge-discreet">🔒 Emballage Discret Garanti</span>}
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '10px' }}>
              {selectedProduct.name}
            </h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--color-yellow-hover)' }}>
                <Star size={15} fill="currentColor" />
                <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{selectedProduct.rating}</span>
              </div>
              <span style={{ color: 'var(--text-light)', fontSize: '0.8125rem' }}>• {selectedProduct.reviewsCount} avis clients vérifiés</span>
              <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8125rem', marginLeft: 'auto' }}>
                ✓ En Stock ({selectedProduct.stockCount} dispos)
              </span>
            </div>

            {/* Discreet Notice if relevant */}
            {selectedProduct.isDiscreetPackaging && <DiscreetNotice />}

            {/* Price Box */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px'
            }}>
              <span style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--color-primary-dark)'
              }}>
                {formatFCFA(selectedProduct.price)}
              </span>
              {selectedProduct.originalPrice && (
                <span style={{
                  fontSize: '1rem',
                  color: 'var(--text-light)',
                  textDecoration: 'line-through'
                }}>
                  {formatFCFA(selectedProduct.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
              {selectedProduct.fullDescription}
            </p>

            {/* Key Features */}
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '8px' }}>Points Forts :</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedProduct.features.map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-main)' }}>
                    <Check size={15} color="var(--color-primary)" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Quantité :</span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1.5px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ border: 'none', background: '#f8fafc', padding: '6px 12px', cursor: 'pointer' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ padding: '0 14px', fontWeight: 700 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ border: 'none', background: '#f8fafc', padding: '6px 12px', cursor: 'pointer' }}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="btn btn-outline btn-sm"
                style={{ marginLeft: 'auto', gap: '6px' }}
              >
                <Heart size={16} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : 'currentColor'} />
                <span>{isWishlisted ? 'Sauvegardé' : 'Favori'}</span>
              </button>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="btn btn-yellow btn-lg btn-full"
                onClick={handleAddToCart}
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <ShoppingCart size={20} />
                Ajouter au Panier ({formatFCFA(selectedProduct.price * quantity)})
              </button>

              <button
                className="btn btn-whatsapp btn-full"
                onClick={handleWhatsAppOrder}
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <MessageCircle size={20} />
                Commander directement par WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
