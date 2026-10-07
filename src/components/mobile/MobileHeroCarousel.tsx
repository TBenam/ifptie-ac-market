import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_PRODUCTS } from '../../mock/data';
import { formatFCFA } from '../../utils/formatters';
import { ArrowRight, Zap, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

export const MobileHeroCarousel: React.FC = () => {
  const { addToCart, setIsCartOpen, setSelectedProduct } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const slides = [
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-solar-01') || MOCK_PRODUCTS[0],
      headline: 'Kits Énergie Solaire Anti-Délestage',
      tagline: 'Autonomie 14h + Ports USB recharge rapide',
      badge: 'PROMO -25%'
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-tech-01') || MOCK_PRODUCTS[1],
      headline: 'Power Bank Robuste 30 000 mAh 22.5W',
      tagline: 'Rechargez 7 fois votre téléphone partout',
      badge: 'TOP VENTE CHINE'
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-home-01') || MOCK_PRODUCTS[2],
      headline: 'Robot Cuiseur & Hachoir Inox 3L',
      tagline: 'Hache viandes, condiments et pistache en 8s',
      badge: 'ARRIVAGE FRAIS'
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-beauty-01') || MOCK_PRODUCTS[3],
      headline: 'Beurre de Karité Pur Bio de Kribi',
      tagline: 'Soin naturel cheveux & peau 100% camerounais',
      badge: '🇨🇲 TERROIR LOCAL'
    }
  ];

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      // Swiped left
      setCurrentSlide(prev => (prev + 1) % slides.length);
    } else if (diff < -50) {
      // Swiped right
      setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    }
    touchStartX.current = null;
  };

  const activeSlide = slides[currentSlide];

  const handleDirectBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(activeSlide.product, 1);
    setIsCartOpen(true);
  };

  return (
    <div 
      className="mobile-only"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        marginBottom: '20px',
        position: 'relative'
      }}
    >
      <div 
        onClick={() => setSelectedProduct(activeSlide.product)}
        style={{
          background: 'linear-gradient(135deg, #073b26 0%, #0b5738 65%, #0f764a 100%)',
          borderRadius: 'var(--radius-lg)',
          color: '#ffffff',
          padding: '16px',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
      >
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{
            backgroundColor: 'var(--color-yellow)',
            color: '#0f172a',
            fontSize: '0.68rem',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)',
            letterSpacing: '0.3px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Zap size={11} />
            {activeSlide.badge}
          </span>

          <span style={{ fontSize: '0.68rem', color: '#a7f3d0', fontWeight: 600 }}>
            Paiement à la livraison
          </span>
        </div>

        {/* Priority: Product visual + Short headline + Price/offer */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px', alignItems: 'center' }}>
          <div>
            {/* Short headline */}
            <h2 style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '6px'
            }}>
              {activeSlide.headline}
            </h2>

            <p style={{
              fontSize: '0.75rem',
              color: '#d1fae5',
              lineHeight: 1.3,
              marginBottom: '10px'
            }}>
              {activeSlide.tagline}
            </p>

            {/* Price / Offer */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
              <span style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--color-yellow)'
              }}>
                {formatFCFA(activeSlide.product.price)}
              </span>
              {activeSlide.product.originalPrice && (
                <span style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'line-through'
                }}>
                  {formatFCFA(activeSlide.product.originalPrice)}
                </span>
              )}
            </div>

            {/* Thumb-friendly CTA button */}
            <button
              onClick={handleDirectBuy}
              className="btn btn-yellow btn-sm"
              style={{
                borderRadius: 'var(--radius-sm)',
                padding: '8px 14px',
                fontSize: '0.85rem',
                fontWeight: 800,
                boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ShoppingCart size={15} />
              <span>Acheter</span>
            </button>
          </div>

          {/* Product Visual Container */}
          <div style={{
            position: 'relative',
            width: '100%',
            paddingTop: '95%',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            boxShadow: '0 6px 14px rgba(0,0,0,0.15)'
          }}>
            <img
              src={activeSlide.product.images[0]}
              alt={activeSlide.headline}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '8px'
              }}
            />
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '12px'
        }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              style={{
                width: currentSlide === idx ? '18px' : '6px',
                height: '6px',
                borderRadius: '999px',
                backgroundColor: currentSlide === idx ? 'var(--color-yellow)' : 'rgba(255,255,255,0.3)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
