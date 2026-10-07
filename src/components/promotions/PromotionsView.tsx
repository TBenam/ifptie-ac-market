import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import type { Product } from '../../types';
import { 
  Flame, 
  Zap, 
  Percent, 
  Package, 
  Timer, 
  ShoppingCart, 
  MessageCircle, 
  Eye, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  ChevronRight
} from 'lucide-react';

import { MOCK_PRODUCTS } from '../../mock/data';

export const PromotionsView: React.FC = () => {
  const { 
    addToCart, 
    setIsCartOpen, 
    setSelectedProduct, 
    addToast,
    setActiveView 
  } = useStore();

  // Active section filter or tab
  const [activeTab, setActiveTab] = useState<'all' | 'flash' | 'half_price' | 'best_value' | 'bundles'>('all');

  // Global countdown timer (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 11, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const allProducts = MOCK_PRODUCTS;

  // Filter products by section
  const flashDeals = useMemo(() => {
    return allProducts.filter(p => p.isFlashDeal || p.dealExpiresHours);
  }, [allProducts]);

  const halfPriceDeals = useMemo(() => {
    return allProducts.filter(p => {
      if (p.isHalfPricePromo) return true;
      if (p.originalPrice) {
        const discount = ((p.originalPrice - p.price) / p.originalPrice) * 100;
        return discount >= 45;
      }
      return false;
    });
  }, [allProducts]);

  const bestValueDeals = useMemo(() => {
    return allProducts.filter(p => p.isBestValueDeal || (!p.isBundle && !p.isHalfPricePromo && p.price <= 18500 && p.originalPrice));
  }, [allProducts]);

  const bundleDeals = useMemo(() => {
    return allProducts.filter(p => p.isBundle);
  }, [allProducts]);

  const handleBuyNow = (product: Product) => {
    addToCart(product, 1);
    addToast(`🔥 "${product.name.slice(0, 30)}..." ajouté au panier !`, 'success');
    setIsCartOpen(true);
  };

  const handleWhatsAppOrder = (product: Product) => {
    const message = encodeURIComponent(
      `Bonjour IFPTIE Market, je souhaite commander l'offre promo : ${product.name} au prix spécial de ${formatFCFA(product.price)} avec paiement à la livraison.`
    );
    window.open(`https://wa.me/237699000000?text=${message}`, '_blank');
  };

  // Reusable Promo Card
  const renderPromoCard = (product: Product, options?: { showBundleDetails?: boolean; urgentStock?: boolean }) => {
    const discountPercent = product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    const remainingStock = product.stockCount || 5;
    const totalStock = product.totalStock || (remainingStock + 40);
    const soldStock = product.soldCount || (totalStock - remainingStock);
    const percentSold = Math.min(100, Math.round((soldStock / totalStock) * 100));

    return (
      <div 
        key={product.id}
        className="card promo-card-interactive"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid #fed7aa',
          boxShadow: '0 4px 15px rgba(245, 158, 11, 0.08)',
          overflow: 'hidden',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
      >
        {/* Top Badges & Urgency */}
        <div style={{ position: 'relative', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
          {/* Main Image */}
          <div 
            style={{ 
              position: 'relative', 
              aspectRatio: '1/1', 
              cursor: 'pointer',
              overflow: 'hidden'
            }}
            onClick={() => setSelectedProduct(product)}
          >
            <img 
              src={product.images[0]} 
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />

            {/* Top-Left: PROMO BADGE + DISCOUNT % */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              zIndex: 2
            }}>
              <span style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 900,
                letterSpacing: '0.5px',
                padding: '3px 8px',
                borderRadius: '4px',
                boxShadow: '0 2px 6px rgba(220, 38, 38, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Flame size={12} fill="#ffffff" />
                PROMO
              </span>

              {discountPercent > 0 && (
                <span style={{
                  backgroundColor: 'var(--color-yellow)',
                  color: '#78350f',
                  fontSize: '0.8rem',
                  fontWeight: 900,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  boxShadow: '0 2px 6px rgba(245, 158, 11, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px'
                }}>
                  -{discountPercent}%
                </span>
              )}
            </div>

            {/* Top-Right: Quick View Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
              }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary-dark)',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                transition: 'background-color 0.2s',
                zIndex: 2
              }}
              title="Aperçu rapide"
            >
              <Eye size={16} />
            </button>

            {/* Bottom Floating Bar on Image: Countdown Timer if applicable */}
            {(product.isFlashDeal || product.dealExpiresHours) && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.88)',
                backdropFilter: 'blur(4px)',
                color: '#ffffff',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-yellow)' }}>
                  <Timer size={13} />
                  <span>Offre expire dans :</span>
                </span>
                <span style={{ 
                  fontFamily: 'monospace', 
                  color: '#ffffff', 
                  backgroundColor: 'rgba(245, 158, 11, 0.25)', 
                  border: '1px solid var(--color-yellow)',
                  padding: '1px 6px', 
                  borderRadius: '3px',
                  fontWeight: 800 
                }}>
                  {String((product.dealExpiresHours || 6) - 1).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div style={{ 
          padding: '14px', 
          display: 'flex', 
          flexDirection: 'column', 
          flex: 1, 
          justifyContent: 'space-between',
          gap: '10px' 
        }}>
          {/* Category & Title */}
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '4px' 
            }}>
              <span style={{ 
                fontSize: '0.72rem', 
                fontWeight: 700, 
                color: 'var(--color-primary)', 
                textTransform: 'uppercase',
                letterSpacing: '0.5px' 
              }}>
                {product.categoryLabel}
              </span>

              <span style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: '#64748b',
                backgroundColor: '#f1f5f9',
                padding: '2px 6px',
                borderRadius: '3px'
              }}>
                {product.origin === 'local' ? '🇨🇲 Cameroun' : '🇨🇳 Import Direct'}
              </span>
            </div>

            <h3 
              onClick={() => setSelectedProduct(product)}
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                lineHeight: 1.35,
                color: 'var(--text-main)',
                margin: 0,
                cursor: 'pointer',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: '2.7em'
              }}
              title={product.name}
            >
              {product.name}
            </h3>

            {/* Bundle Items Accordion/Preview if applicable */}
            {options?.showBundleDetails && product.bundleItems && (
              <div style={{
                marginTop: '8px',
                backgroundColor: '#fefce8',
                border: '1px dashed #fde047',
                borderRadius: '6px',
                padding: '8px 10px',
                fontSize: '0.75rem'
              }}>
                <div style={{ 
                  fontWeight: 800, 
                  color: '#854d0e', 
                  marginBottom: '4px',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px' 
                }}>
                  <Package size={13} color="#ca8a04" />
                  <span>Contenu du pack complet ({product.bundleItems.length} articles) :</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '16px', color: '#713f12', lineHeight: 1.3 }}>
                  {product.bundleItems.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '2px' }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Pricing block */}
          <div style={{
            backgroundColor: '#fdfbf7',
            padding: '8px 10px',
            borderRadius: '6px',
            border: '1px solid #fed7aa'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: '1.25rem',
                fontWeight: 900,
                color: '#b45309', // Dark amber/red commercial
                lineHeight: 1
              }}>
                {formatFCFA(product.price)}
              </span>

              {product.originalPrice && (
                <span style={{
                  fontSize: '0.82rem',
                  textDecoration: 'line-through',
                  color: '#94a3b8',
                  fontWeight: 500
                }}>
                  {formatFCFA(product.originalPrice)}
                </span>
              )}
            </div>

            {product.originalPrice && (
              <div style={{ 
                fontSize: '0.72rem', 
                color: '#15803d', 
                fontWeight: 700, 
                marginTop: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <CheckCircle2 size={12} color="#16a34a" />
                <span>Vous économisez : {formatFCFA(product.originalPrice - product.price)}</span>
              </div>
            )}
          </div>

          {/* Remaining Quantity & Progress Bar */}
          <div style={{ marginTop: '2px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.72rem',
              fontWeight: 700,
              marginBottom: '4px'
            }}>
              <span style={{ 
                color: remainingStock <= 8 ? '#dc2626' : '#854d0e',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}>
                <Flame size={12} color={remainingStock <= 8 ? '#dc2626' : '#d97706'} />
                {remainingStock <= 8 ? `Plus que ${remainingStock} restants !` : `Stock limité : ${remainingStock} unités`}
              </span>
              <span style={{ color: '#64748b' }}>
                {soldStock} déjà vendus
              </span>
            </div>

            {/* Visual stock bar */}
            <div style={{
              height: '6px',
              backgroundColor: '#e2e8f0',
              borderRadius: '999px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${percentSold}%`,
                height: '100%',
                backgroundColor: remainingStock <= 8 ? '#ef4444' : 'var(--color-yellow)',
                borderRadius: '999px',
                transition: 'width 0.5s ease-in-out'
              }} />
            </div>
          </div>

          {/* Primary CTA: "Acheter maintenant" & WhatsApp */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
            <button
              onClick={() => handleBuyNow(product)}
              className="btn"
              style={{
                width: '100%',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                border: 'none',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 800,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(11, 87, 56, 0.2)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ShoppingCart size={16} />
              <span>Acheter maintenant</span>
            </button>

            <button
              onClick={() => handleWhatsAppOrder(product)}
              style={{
                width: '100%',
                backgroundColor: '#f0fdf4',
                color: '#15803d',
                border: '1px solid #bbf7d0',
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <MessageCircle size={14} color="#16a34a" />
              <span>Commander par WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#fcfbf7', minHeight: '100vh', paddingBottom: '70px' }}>
      {/* =========================================================================
          1. ENERGETIC COMMERCIAL HERO SECTION
          ========================================================================= */}
      <section style={{
        background: 'linear-gradient(135deg, #063d27 0%, #0b5738 55%, #14532d 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        padding: '36px 0 44px 0',
        borderBottom: '4px solid var(--color-yellow)'
      }}>
        {/* Background decorative glow & circles */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0) 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '10%',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb / Category indicator */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontSize: '0.8rem', 
            marginBottom: '16px',
            color: '#a7f3d0'
          }}>
            <span 
              onClick={() => setActiveView('storefront')} 
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Accueil
            </span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--color-yellow)', fontWeight: 700 }}>
              Promotions & Bons Plans
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'center'
          }}>
            {/* Left Hero Content */}
            <div>
              {/* Urgency Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                border: '1.5px solid var(--color-yellow)',
                color: 'var(--color-yellow)',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 800,
                marginBottom: '16px',
                boxShadow: '0 2px 12px rgba(245, 158, 11, 0.25)'
              }}>
                <Flame size={16} fill="var(--color-yellow)" />
                <span>VENTES PRIVILÈGES IFPTIE MARKET • STOCK LIMITÉ</span>
              </div>

              {/* Exact Hero Title Requested */}
              <h1 style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '14px',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}>
                🔥 Les bons plans du moment
              </h1>

              {/* Exact Hero Subtitle Requested */}
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: 1.5,
                color: '#e2e8f0',
                maxWidth: '560px',
                marginBottom: '22px'
              }}>
                Profitez de nos meilleures offres avant qu'elles disparaissent.
              </p>

              {/* Trust Indicators */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                fontSize: '0.78rem',
                color: '#f8fafc',
                fontWeight: 600
              }}>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '4px 10px',
                  borderRadius: '4px'
                }}>
                  <CreditCard size={14} color="var(--color-yellow)" />
                  Paiement à la livraison
                </span>

                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '4px 10px',
                  borderRadius: '4px'
                }}>
                  <Truck size={14} color="#86efac" />
                  Livraison Express 24h Douala & Yaoundé
                </span>

                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '4px 10px',
                  borderRadius: '4px'
                }}>
                  <ShieldCheck size={14} color="var(--color-yellow)" />
                  Garantie testé & vérifié
                </span>
              </div>
            </div>

            {/* Right Hero: Live Urgency Countdown Box */}
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '2px solid var(--color-yellow)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
              maxWidth: '440px',
              justifySelf: 'end',
              width: '100%'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-yellow)',
                fontWeight: 800,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '10px'
              }}>
                <Timer size={18} />
                <span>Compte à rebours offres du jour</span>
              </div>

              <h4 style={{ 
                color: '#ffffff', 
                fontSize: '1.05rem', 
                fontWeight: 700, 
                marginBottom: '14px',
                lineHeight: 1.3
              }}>
                Les réductions flash expirent ce soir à minuit :
              </h4>

              {/* Countdown Digits */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                marginBottom: '16px'
              }}>
                {/* Hours */}
                <div style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: '8px',
                  padding: '10px 6px',
                  textAlign: 'center'
                }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    color: 'var(--color-yellow)',
                    display: 'block',
                    lineHeight: 1
                  }}>
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>
                    Heures
                  </span>
                </div>

                {/* Minutes */}
                <div style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: '8px',
                  padding: '10px 6px',
                  textAlign: 'center'
                }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    color: 'var(--color-yellow)',
                    display: 'block',
                    lineHeight: 1
                  }}>
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>
                    Minutes
                  </span>
                </div>

                {/* Seconds */}
                <div style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: '8px',
                  padding: '10px 6px',
                  textAlign: 'center'
                }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    color: '#ef4444',
                    display: 'block',
                    lineHeight: 1
                  }}>
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>
                    Secondes
                  </span>
                </div>
              </div>

              {/* Progress Callout */}
              <div style={{
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                borderLeft: '3px solid var(--color-yellow)',
                padding: '8px 12px',
                borderRadius: '0 6px 6px 0',
                fontSize: '0.78rem',
                color: '#fef08a'
              }}>
                ⚡ <strong>Conseil :</strong> Les stocks s'écoulent rapidement. Premier commandé, premier livré avec coursier dédié !
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. STICKY QUICK-NAVIGATION TABS / ANCHORS
          ========================================================================= */}
      <section style={{
        position: 'sticky',
        top: '60px',
        zIndex: 800,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #fed7aa',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        padding: '10px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none'
        }}>
          <button
            onClick={() => {
              setActiveTab('all');
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'all' ? 'var(--color-primary)' : '#f1f5f9',
              color: activeTab === 'all' ? '#ffffff' : '#334155',
              fontWeight: 700,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            <span>Toutes les offres ({allProducts.filter(p => p.originalPrice).length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('flash');
              document.getElementById('section-flash')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'flash' ? '#d97706' : '#fffbeb',
              color: activeTab === 'flash' ? '#ffffff' : '#b45309',
              fontWeight: 800,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: activeTab === 'flash' ? '0 2px 6px rgba(217, 119, 6, 0.3)' : 'none'
            }}
          >
            <Zap size={14} />
            <span>⚡ Offres flash</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('half_price');
              document.getElementById('section-half-price')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'half_price' ? '#dc2626' : '#fef2f2',
              color: activeTab === 'half_price' ? '#ffffff' : '#b91c1c',
              fontWeight: 800,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Flame size={14} />
            <span>🔥 Jusqu'à -50%</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('best_value');
              document.getElementById('section-best-value')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'best_value' ? '#0b5738' : '#ecfdf5',
              color: activeTab === 'best_value' ? '#ffffff' : '#047857',
              fontWeight: 800,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={14} />
            <span>💥 Meilleures affaires</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('bundles');
              document.getElementById('section-bundles')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'bundles' ? '#7c2d12' : '#fff7ed',
              color: activeTab === 'bundles' ? '#ffffff' : '#c2410c',
              fontWeight: 800,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Package size={14} />
            <span>🛍️ Packs & offres</span>
          </button>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="container" style={{ marginTop: '28px' }}>

        {/* =========================================================================
            SECTION 1: "⚡ Offres flash"
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'flash') && (
          <section id="section-flash" style={{ marginBottom: '48px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #fed7aa'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    backgroundColor: 'var(--color-yellow)',
                    padding: '6px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Zap size={20} color="#78350f" />
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
                    fontWeight: 900,
                    margin: 0,
                    color: 'var(--text-main)'
                  }}>
                    ⚡ Offres flash
                  </h2>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  Ventes à durée ultra limitée avec compte à rebours et stocks restreints.
                </p>
              </div>

              {/* Urgency Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                color: '#b45309',
                fontWeight: 700
              }}>
                <Timer size={14} />
                <span>Réactualisation automatique à 00h00</span>
              </div>
            </div>

            {/* Product Grid (4 col desktop, 2 col mobile) */}
            <div className="product-grid">
              {flashDeals.map(p => renderPromoCard(p, { urgentStock: true }))}
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 2: "🔥 Jusqu'à -50%"
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'half_price') && (
          <section id="section-half-price" style={{ marginBottom: '48px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #fca5a5'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    backgroundColor: '#fee2e2',
                    padding: '6px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Flame size={20} color="#dc2626" />
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
                    fontWeight: 900,
                    margin: 0,
                    color: '#991b1b'
                  }}>
                    🔥 Jusqu'à -50%
                  </h2>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  Les réductions les plus massives du catalogue. Moitié prix pour une durée limitée !
                </p>
              </div>

              <div style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 800
              }}>
                MAXIMUM D'ÉCONOMIES
              </div>
            </div>

            <div className="product-grid">
              {halfPriceDeals.map(p => renderPromoCard(p))}
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 3: "💥 Meilleures affaires"
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'best_value') && (
          <section id="section-best-value" style={{ marginBottom: '48px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #a7f3d0'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    backgroundColor: '#d1fae5',
                    padding: '6px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Sparkles size={20} color="#059669" />
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
                    fontWeight: 900,
                    margin: 0,
                    color: 'var(--color-primary-dark)'
                  }}>
                    💥 Meilleures affaires
                  </h2>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  Rapport qualité/prix exceptionnel sélectionné et approuvé par notre équipe locale.
                </p>
              </div>

              <div style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <CheckCircle2 size={15} color="var(--color-primary)" />
                <span>Moins de 20 000 FCFA</span>
              </div>
            </div>

            <div className="product-grid">
              {bestValueDeals.map(p => renderPromoCard(p))}
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 4: "🛍️ Packs & offres"
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'bundles') && (
          <section id="section-bundles" style={{ marginBottom: '48px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #fed7aa'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    backgroundColor: '#ffedd5',
                    padding: '6px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Package size={20} color="#ea580c" />
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
                    fontWeight: 900,
                    margin: 0,
                    color: '#9a3412'
                  }}>
                    🛍️ Packs & offres
                  </h2>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  Kits complets prêts à l'emploi : achetez ensemble et économisez jusqu'à 35 000 FCFA !
                </p>
              </div>

              <div style={{
                backgroundColor: '#fff7ed',
                border: '1px solid #ffedd5',
                color: '#c2410c',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 800
              }}>
                ÉCONOMIE GROUPÉE GARANTIE
              </div>
            </div>

            {/* Bundle Grid */}
            <div className="product-grid">
              {bundleDeals.map(p => renderPromoCard(p, { showBundleDetails: true }))}
            </div>
          </section>
        )}

        {/* =========================================================================
            5. PROMO CALLOUT / WHATSAPP ASSISTANCE BANNER
            ========================================================================= */}
        <section style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--color-yellow)',
          padding: '28px',
          boxShadow: '0 4px 20px rgba(245, 158, 11, 0.12)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'center',
          marginTop: '20px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 800,
              marginBottom: '10px'
            }}>
              <Flame size={14} color="#d97706" />
              COMMANDE GROUPÉE OU VILLE EN PROVINCE ?
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-main)' }}>
              Vous souhaitez négocier un lot ou commander hors Douala / Yaoundé ?
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Notre équipe commerciale répond instantanément sur WhatsApp pour organiser votre livraison express partout au Cameroun (Bafoussam, Bamenda, Garoua, Bertoua, Maroua, Kribi, Limbe...).
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifySelf: 'end', width: '100%', maxWidth: '300px' }}>
            <a
              href="https://wa.me/237699000000?text=Bonjour%20IFPTIE%20Market,%20je%20souhaite%20profiter%20des%20promotions%20du%20moment"
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{
                width: '100%',
                padding: '12px 18px',
                fontWeight: 800,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <MessageCircle size={18} />
              <span>Assistance WhatsApp 24/7</span>
            </a>

            <button
              onClick={() => {
                setActiveView('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-outline"
              style={{
                width: '100%',
                padding: '10px 18px',
                fontWeight: 700,
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <span>Voir tout le catalogue</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
