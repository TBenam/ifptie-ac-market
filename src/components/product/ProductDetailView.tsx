import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_PRODUCTS } from '../../mock/data';
import { formatFCFA } from '../../utils/formatters';
import type { Product } from '../../types';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ShoppingCart, 
  MessageCircle, 
  Heart, 
  Share2, 
  ChevronRight, 
  Package, 
  RotateCcw, 
  Clock, 
  Zap, 
  Play, 
  ChevronDown, 
  ChevronUp,
  Maximize2,
  Check,
  AlertCircle
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct,
    addToCart, 
    setIsCartOpen, 
    setActiveView, 
    addToast,
    wishlist,
    toggleWishlist
  } = useStore();

  // If no product is currently selected, default to the requested example product: "Lampe solaire LED rechargeable"
  const defaultProduct = MOCK_PRODUCTS.find(p => p.id === 'prod-solar-03') || MOCK_PRODUCTS[0];
  const product: Product = selectedProduct || defaultProduct;

  // Gallery state
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Quantity state
  const [quantity, setQuantity] = useState(1);

  // Active tab below fold
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'included' | 'delivery' | 'reviews' | 'faq'>('desc');

  // FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const isWished = wishlist.includes(product.id);

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Actions
  const handleBuyNow = () => {
    addToCart(product, quantity);
    addToast(`⚡ Commande de ${quantity}x "${product.name.slice(0, 25)}..." en cours !`, 'success');
    // Direct to checkout
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`🛒 ${quantity}x "${product.name.slice(0, 25)}..." ajouté au panier !`, 'success');
    setIsCartOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Bonjour IFPTIE Market, je souhaite commander immédiatement :\n- Produit : ${product.name}\n- Quantité : ${quantity}\n- Prix unitaire : ${formatFCFA(product.price)}\n- Total : ${formatFCFA(product.price * quantity)}\n\nPaiement prévu à la livraison. Pouvez-vous me livrer ?`
    );
    window.open(`https://wa.me/237699000000?text=${message}`, '_blank');
  };

  // Zoom lens handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* 1. BREADCRUMBS */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '12px 0',
        fontSize: '0.8rem'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-muted)',
          flexWrap: 'wrap'
        }}>
          <span 
            onClick={() => setActiveView('storefront')} 
            style={{ cursor: 'pointer', color: 'var(--color-primary)', fontWeight: 600 }}
          >
            Accueil
          </span>
          <ChevronRight size={13} />
          <span 
            onClick={() => setActiveView('categories')} 
            style={{ cursor: 'pointer', color: 'var(--color-primary)', fontWeight: 600 }}
          >
            {product.categoryLabel}
          </span>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--text-main)', fontWeight: 700, maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.name}
          </span>
        </div>
      </div>

      {/* 2. MAIN TWO-COLUMN PRODUCT SECTION */}
      <section className="container" style={{ paddingTop: '28px', paddingBottom: '40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* =========================================================================
              LEFT COLUMN: LARGE PRODUCT GALLERY
              ========================================================================= */}
          <div>
            {/* Main Display Area */}
            <div 
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-subtle)',
                backgroundColor: '#f8fafc',
                aspectRatio: '1/1',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                cursor: isVideoActive ? 'default' : 'crosshair'
              }}
              onMouseEnter={() => !isVideoActive && setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              {/* Badges Overlays */}
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                {discountPercent > 0 && (
                  <span style={{
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 6px rgba(220, 38, 38, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Zap size={13} fill="#ffffff" />
                    PROMO -{discountPercent}%
                  </span>
                )}

                <span style={{
                  backgroundColor: 'var(--color-primary-dark)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  {product.origin === 'local' ? '🇨🇲 Origine Cameroun' : '🇨🇳 Import Direct Chine'}
                </span>
              </div>

              {/* Wishlist & Share in top right */}
              <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <button
                  onClick={() => {
                    toggleWishlist(product.id);
                    addToast(isWished ? 'Retiré de vos favoris' : 'Ajouté à vos favoris !', 'info');
                  }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isWished ? '#ef4444' : '#64748b',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  title="Ajouter aux favoris"
                >
                  <Heart size={18} fill={isWished ? '#ef4444' : 'none'} />
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    addToast('Lien du produit copié dans le presse-papier !', 'info');
                  }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  title="Partager le produit"
                >
                  <Share2 size={16} />
                </button>
              </div>

              {/* Media Content: Image with Zoom Lens OR Interactive Video Player */}
              {isVideoActive ? (
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#0f172a',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-yellow)',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)'
                  }}>
                    <Play size={28} fill="#0f172a" style={{ marginLeft: '4px' }} />
                  </div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 800 }}>
                    Démonstration Vidéo Réelle du Produit
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', maxWidth: '340px' }}>
                    Test d'allumage automatique dans l'obscurité et test d'étanchéité sous forte pluie tropicale.
                  </p>
                  <button
                    onClick={() => setIsVideoActive(false)}
                    style={{
                      marginTop: '18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Retour aux photos
                  </button>
                </div>
              ) : (
                <>
                  <img 
                    src={product.images[activeImageIdx] || product.images[0]} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transform: isZoomed ? 'scale(1.75)' : 'scale(1)',
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transition: isZoomed ? 'none' : 'transform 0.3s ease'
                    }}
                  />

                  {/* Zoom indicator cue */}
                  {!isZoomed && (
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.75)',
                      color: '#ffffff',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      pointerEvents: 'none'
                    }}>
                      <Maximize2 size={12} />
                      <span>Survolez pour zoomer</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Thumbnails & Video Selector */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '14px',
              overflowX: 'auto',
              paddingBottom: '4px'
            }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIdx(idx);
                    setIsVideoActive(false);
                  }}
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: !isVideoActive && activeImageIdx === idx ? '2.5px solid var(--color-primary)' : '1.5px solid var(--border-subtle)',
                    padding: 0,
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    opacity: !isVideoActive && activeImageIdx === idx ? 1 : 0.75,
                    transition: 'all 0.2s',
                    flexShrink: 0
                  }}
                >
                  <img 
                    src={img} 
                    alt={`Vue ${idx + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}

              {/* Optional Video Thumbnail */}
              <button
                onClick={() => setIsVideoActive(true)}
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  border: isVideoActive ? '2.5px solid var(--color-yellow)' : '1.5px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  opacity: isVideoActive ? 1 : 0.85
                }}
                title="Regarder la démonstration vidéo"
              >
                <Play size={20} color="var(--color-yellow)" fill="var(--color-yellow)" />
                <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>VIDÉO</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: PURCHASE DECISION & SPECIFICATIONS SUMMARY
              ========================================================================= */}
          <div>
            {/* Category & Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {product.categoryLabel}
              </span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                Réf: IFP-{product.id.slice(-6).toUpperCase()}
              </span>
            </div>

            {/* Product Name */}
            <h1 style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)',
              fontWeight: 900,
              lineHeight: 1.25,
              color: 'var(--text-main)',
              margin: '0 0 12px 0'
            }}>
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px',
              paddingBottom: '14px',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', color: 'var(--color-yellow)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={17} fill="currentColor" />
                ))}
              </div>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                {product.rating} / 5
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                ({product.reviewsCount} avis vérifiés au Cameroun)
              </span>
            </div>

            {/* Price Box with Savings */}
            <div style={{
              backgroundColor: '#fefce8',
              border: '1.5px solid #fde047',
              borderRadius: 'var(--radius-md)',
              padding: '16px 18px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                  fontWeight: 900,
                  color: '#b45309',
                  lineHeight: 1
                }}>
                  {formatFCFA(product.price)}
                </span>

                {product.originalPrice && (
                  <span style={{
                    fontSize: '1.05rem',
                    textDecoration: 'line-through',
                    color: '#94a3b8',
                    fontWeight: 600
                  }}>
                    {formatFCFA(product.originalPrice)}
                  </span>
                )}

                {discountPercent > 0 && (
                  <span style={{
                    backgroundColor: 'var(--color-yellow)',
                    color: '#78350f',
                    fontSize: '0.825rem',
                    fontWeight: 900,
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}>
                    ÉCONOMISEZ {discountPercent}%
                  </span>
                )}
              </div>

              {product.originalPrice && (
                <div style={{
                  fontSize: '0.8rem',
                  color: '#15803d',
                  fontWeight: 700,
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <CheckCircle2 size={14} color="#16a34a" />
                  <span>Vous économisez {formatFCFA(product.originalPrice - product.price)} sur le prix conseillé !</span>
                </div>
              )}
            </div>

            {/* Short Benefit-focused Description */}
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.55,
              color: '#334155',
              marginBottom: '20px'
            }}>
              {product.shortDescription}
            </p>

            {/* Availability Status & Delivery Estimate */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '14px',
              backgroundColor: '#f8fafc',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '22px'
            }}>
              {/* Availability */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#16a34a',
                  display: 'inline-block',
                  boxShadow: '0 0 6px #16a34a'
                }} />
                <span style={{ color: '#15803d' }}>
                  En stock immédiat au dépôt de Douala & Yaoundé
                </span>
                <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>
                  ({product.stockCount} unités restantes)
                </span>
              </div>

              {/* Delivery Estimate */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#1e293b' }}>
                <Truck size={17} color="var(--color-primary)" />
                <span>
                  <strong>Livraison estimée :</strong> Demain chez vous à Douala & Yaoundé (48h autres villes)
                </span>
              </div>
            </div>

            {/* Quantity Selector + CTAs */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Quantité :
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden'
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: 'none',
                      backgroundColor: '#f1f5f9',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{
                    width: '44px',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '0.95rem'
                  }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: 'none',
                      backgroundColor: '#f1f5f9',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>

                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Total : <strong>{formatFCFA(product.price * quantity)}</strong>
                </span>
              </div>

              {/* =========================================================================
                  CRITICAL: PRIMARY YELLOW CTA ("ACHETER MAINTENANT") - MUST BE VERY PROMINENT
                  ========================================================================= */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={handleBuyNow}
                  className="btn btn-yellow"
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    fontSize: '1.15rem',
                    fontWeight: 900,
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 8px 24px rgba(245, 158, 11, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    border: '2px solid #d97706'
                  }}
                >
                  <Zap size={22} fill="#78350f" />
                  <span>ACHETER MAINTENANT</span>
                </button>

                {/* Secondary CTA: "Ajouter au panier" */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={handleAddToCart}
                    style={{
                      backgroundColor: 'var(--color-primary-subtle)',
                      color: 'var(--color-primary-dark)',
                      border: '1.5px solid var(--color-primary)',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <ShoppingCart size={17} />
                    <span>Ajouter au panier</span>
                  </button>

                  {/* WhatsApp Direct Order */}
                  <button
                    onClick={handleWhatsAppOrder}
                    className="btn btn-whatsapp"
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <MessageCircle size={17} />
                    <span>Commander WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div style={{
              marginBottom: '20px',
              padding: '12px 14px',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Moyens de paiement acceptés à la livraison :
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  💵 Espèces à la livraison
                </span>
                <span style={{ backgroundColor: '#ffedd5', color: '#c2410c', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                  🟠 Orange Money
                </span>
                <span style={{ backgroundColor: '#fef9c3', color: '#854d0e', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                  🟡 MTN Mobile Money
                </span>
              </div>
            </div>

            {/* Trust Indicators Requested by User */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              fontSize: '0.825rem',
              fontWeight: 700,
              color: '#166534'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#16a34a" />
                <span>Paiement à la livraison</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#16a34a" />
                <span>Mobile Money disponible</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#16a34a" />
                <span>Livraison partout au Cameroun</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#16a34a" />
                <span>Produit vérifié & garanti</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. BELOW THE FOLD: TABS & IN-DEPTH INFORMATION
          ========================================================================= */}
      <section style={{ backgroundColor: '#f8fafc', borderTop: '1px solid var(--border-subtle)', padding: '40px 0' }}>
        <div className="container">
          {/* Tabs Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '2px solid #e2e8f0',
            overflowX: 'auto',
            marginBottom: '28px',
            scrollbarWidth: 'none'
          }}>
            {[
              { id: 'desc', label: 'Description complète' },
              { id: 'specs', label: 'Spécifications techniques' },
              { id: 'included', label: 'Ce qui est inclus' },
              { id: 'delivery', label: 'Livraison & Retours' },
              { id: 'reviews', label: `Avis clients (${product.reviewsCount})` },
              { id: 'faq', label: 'Questions fréquentes (FAQ)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '12px 18px',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                  backgroundColor: 'transparent',
                  color: activeTab === tab.id ? 'var(--color-primary)' : '#64748b',
                  fontWeight: activeTab === tab.id ? 800 : 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Product Description */}
          {activeTab === 'desc' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '30px',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '14px', color: 'var(--color-primary-dark)' }}>
                Présentation détaillée du produit
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#334155', marginBottom: '20px' }}>
                {product.fullDescription}
              </p>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '12px' }}>
                Points forts & Bénéfices au quotidien :
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {product.features.map((feat, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    backgroundColor: '#f8fafc',
                    padding: '12px 14px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Specifications Table */}
          {activeTab === 'specs' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '30px',
              border: '1px solid var(--border-subtle)'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: 'var(--color-primary-dark)' }}>
                Fiche technique & Caractéristiques
              </h3>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                {(product.specifications || [
                  { label: 'Puissance', value: '100 Watts LED' },
                  { label: 'Panneau solaire', value: 'Monocristallin 6V' },
                  { label: 'Batterie', value: 'Lithium Li-ion 2400 mAh' },
                  { label: 'Autonomie', value: '10 à 14 heures' },
                  { label: 'Étanchéité', value: 'Norme IP67' }
                ]).map((spec, idx) => (
                  <div key={idx} style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(140px, 1fr) 2fr',
                    padding: '12px 18px',
                    backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '0.875rem'
                  }}>
                    <span style={{ fontWeight: 700, color: '#475569' }}>{spec.label}</span>
                    <span style={{ color: '#0f172a', fontWeight: 600 }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: What's Included */}
          {activeTab === 'included' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '30px',
              border: '1px solid var(--border-subtle)'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '14px', color: 'var(--color-primary-dark)' }}>
                Contenu de la boîte à la livraison
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '20px' }}>
                Tout le nécessaire est inclus pour une utilisation et un montage immédiats sans outils complexes.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                {(product.whatsIncluded || [
                  '1x Produit complet avec accessoires de série',
                  '1x Kit de fixation murale',
                  '1x Télécommande avec piles',
                  '1x Manuel en français'
                ]).map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px',
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fde68a',
                    borderRadius: '8px'
                  }}>
                    <Package size={20} color="#b45309" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#78350f' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Delivery & Returns */}
          {activeTab === 'delivery' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '30px',
              border: '1px solid var(--border-subtle)'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: 'var(--color-primary-dark)' }}>
                Expédition & Politique de Retour au Cameroun
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '8px' }}>
                    <Truck size={18} />
                    <span>Livraison à Douala & Yaoundé</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    Livraison en 24h chrono à domicile ou sur votre lieu de travail par nos coursiers dédiés IFPTIE Express. Vous pouvez ouvrir le colis et tester le produit devant le coursier avant de payer.
                  </p>
                </div>

                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '8px' }}>
                    <Package size={18} />
                    <span>Expédition dans toutes les Régions</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    Expédition sous 48h vers Bafoussam, Bamenda, Garoua, Maroua, Bertoua, Ngaoundéré, Kribi, Limbe, etc., via agences de transport fiables et sécurisées.
                  </p>
                </div>

                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '8px' }}>
                    <RotateCcw size={18} />
                    <span>Garantie échange & Retours</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    En cas de dysfonctionnement ou de non-conformité, notre service client local organise l'échange sans frais ou le remboursement immédiat.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Reviews */}
          {activeTab === 'reviews' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '30px',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'var(--color-primary-dark)' }}>
                    Avis clients vérifiés ({product.reviewsCount})
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
                    Retours réels d'acheteurs ayant réceptionné leur colis au Cameroun.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary-dark)' }}>{product.rating}</span>
                  <div>
                    <div style={{ display: 'flex', color: 'var(--color-yellow)' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>98% recommandent ce produit</span>
                  </div>
                </div>
              </div>

              {/* Sample Reviews */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  {
                    author: 'Jean-Pierre E.',
                    city: 'Yaoundé (Omnisports)',
                    rating: 5,
                    date: 'Il y a 3 jours',
                    comment: 'Excellente lampe ! Installée au-dessus de mon portail, elle éclaire toute ma concession. Le détecteur est très réactif et la télécommande très pratique pour basculer les modes.',
                    verified: true
                  },
                  {
                    author: 'Mireille K.',
                    city: 'Douala (Bonamoussadi)',
                    rating: 5,
                    date: 'Il y a 6 jours',
                    comment: 'Livrée en moins de 24h par le coursier d\'IFPTIE. J\'ai payé par Orange Money après avoir vérifié le produit. Très rassurant pour un achat en ligne au Cameroun.',
                    verified: true
                  },
                  {
                    author: 'Alain T.',
                    city: 'Bafoussam',
                    rating: 4,
                    date: 'Il y a 2 semaines',
                    comment: 'Produit très solide. La batterie tient largement toute la nuit même quand il a plu toute la journée. Très satisfait de mon achat.',
                    verified: true
                  }
                ].map((rev, idx) => (
                  <div key={idx} style={{
                    borderBottom: '1px solid #e2e8f0',
                    paddingBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{rev.author}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({rev.city})</span>
                        {rev.verified && (
                          <span style={{
                            backgroundColor: '#dcfce7',
                            color: '#15803d',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '3px'
                          }}>
                            ✓ Achat vérifié
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{rev.date}</span>
                    </div>

                    <div style={{ display: 'flex', color: 'var(--color-yellow)', marginBottom: '8px' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>

                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 6: FAQ Accordions */}
          {activeTab === 'faq' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '30px',
              border: '1px solid var(--border-subtle)'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: 'var(--color-primary-dark)' }}>
                Foire aux questions sur ce produit
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(product.faq || [
                  { question: 'Est-ce que la lampe fonctionne en saison des pluies ?', answer: 'Oui, elle recharge également par temps couvert grâce à son capteur solaire monocristallin haute sensibilité.' },
                  { question: 'Comment payer ?', answer: 'Vous payez directement en espèces ou par Mobile Money au coursier lors de la livraison de votre commande.' }
                ]).map((faqItem, idx) => (
                  <div key={idx} style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}>
                    <button
                      onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: openFaqIdx === idx ? '#f8fafc' : '#ffffff',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: 'var(--text-main)',
                        textAlign: 'left'
                      }}
                    >
                      <span>{faqItem.question}</span>
                      {openFaqIdx === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {openFaqIdx === idx && (
                      <div style={{
                        padding: '14px 18px',
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        color: '#475569',
                        borderTop: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff'
                      }}>
                        {faqItem.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          4. MOBILE STICKY PURCHASE BAR
          Price + "Acheter maintenant" button fixed at the bottom so checkout action
          is NEVER buried on mobile.
          ========================================================================= */}
      <div 
        className="mobile-only"
        style={{
          position: 'fixed',
          bottom: '56px', // Above sticky BottomNav
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderTop: '2px solid var(--color-yellow)',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.12)',
          padding: '10px 14px',
          zIndex: 840,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1 }}>Prix promo :</span>
          <span style={{
            fontFamily: 'var(--font-family-heading)',
            fontSize: '1.2rem',
            fontWeight: 900,
            color: '#b45309',
            lineHeight: 1.2
          }}>
            {formatFCFA(product.price * quantity)}
          </span>
          {discountPercent > 0 && (
            <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 800 }}>
              -{discountPercent}% • En stock
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleAddToCart}
            style={{
              backgroundColor: '#f1f5f9',
              color: 'var(--color-primary-dark)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Ajouter au panier"
          >
            <ShoppingCart size={18} />
          </button>

          <button
            onClick={handleBuyNow}
            className="btn btn-yellow"
            style={{
              padding: '11px 18px',
              fontSize: '0.9rem',
              fontWeight: 900,
              borderRadius: 'var(--radius-sm)',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Zap size={16} fill="#78350f" />
            <span>ACHETER MAINTENANT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
