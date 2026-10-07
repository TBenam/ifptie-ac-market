import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_PRODUCTS } from '../../mock/data';
import { ProductCard } from '../common/ProductCard';
import { Zap, Clock } from 'lucide-react';

export const PromoBannerSection: React.FC = () => {
  const promoProducts = MOCK_PRODUCTS.filter(p => p.isFlashDeal || (p.originalPrice && p.originalPrice > p.price));

  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 34,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="promo-section" style={{
      marginBottom: '36px',
      backgroundColor: '#fefce8',
      border: '2px solid #fde047',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 14px',
      boxShadow: '0 6px 18px -3px rgba(245, 158, 11, 0.15)'
    }}>
      {/* Visually Strong Promotional Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '16px',
        paddingBottom: '14px',
        borderBottom: '2px dashed #facc15'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-yellow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(11, 87, 56, 0.2)'
          }}>
            <Zap size={22} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-primary-dark)',
                margin: 0
              }}>
                ⚡ Offres flash
              </h2>
              <span className="badge badge-promo" style={{ fontSize: '0.65rem', padding: '3px 6px' }}>
                -40%
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#78350f', margin: 0, fontWeight: 500 }}>
              Stocks limités au dépôt de Douala
            </p>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'var(--color-primary-dark)',
          color: '#ffffff',
          padding: '6px 12px',
          borderRadius: 'var(--radius-sm)',
          boxShadow: '0 2px 8px rgba(11, 87, 56, 0.2)'
        }}>
          <Clock size={15} color="var(--color-yellow)" />
          <div style={{ display: 'flex', gap: '3px', fontFamily: 'monospace', fontWeight: 800, fontSize: '0.85rem' }}>
            <span style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', padding: '1px 5px', borderRadius: '3px' }}>
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            :
            <span style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', padding: '1px 5px', borderRadius: '3px' }}>
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            :
            <span style={{ background: 'var(--color-yellow)', color: '#0f172a', padding: '1px 5px', borderRadius: '3px' }}>
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>

      {/* 2-column Product Grid on Mobile, 4 on Desktop */}
      <div className="product-grid-2col">
        {promoProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} ctaText="Acheter" />
        ))}
      </div>

      {/* Direct link to dedicated Promotions Page */}
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <button
          onClick={() => {
            const { setActiveView } = useStore.getState();
            setActiveView('promotions');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '999px',
            fontWeight: 800,
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(11, 87, 56, 0.2)'
          }}
        >
          <span>🔥 Découvrir toutes les promotions (-50%, Packs, Offres Flash)</span>
          <span>&rarr;</span>
        </button>
      </div>
    </section>
  );
};
