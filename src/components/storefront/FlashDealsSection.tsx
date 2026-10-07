import React, { useState, useEffect } from 'react';
import type { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { Zap, Clock } from 'lucide-react';

interface FlashDealsProps {
  products: Product[];
}

export const FlashDealsSection: React.FC<FlashDealsProps> = ({ products }) => {
  const flashProducts = products.filter(p => p.isFlashDeal);

  // Dynamic countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19
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

  if (flashProducts.length === 0) return null;

  return (
    <section style={{
      backgroundColor: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      border: '1.5px solid #fed7aa',
      boxShadow: 'var(--shadow-sm)',
      marginBottom: '32px'
    }}>
      {/* Header with Title and Countdown */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #ffedd5'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: '#ef4444',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 2s infinite'
          }}>
            <Zap size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#9a3412', display: 'flex', alignItems: 'center', gap: '8px' }}>
              VENTES FLASH DU JOUR
              <span className="badge badge-promo" style={{ fontSize: '0.75rem' }}>Jusqu'à -40%</span>
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Stocks limités au dépôt de Douala - Prix valables jusqu'à épuisement
            </p>
          </div>
        </div>

        {/* Countdown Box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#fff7ed',
          border: '1px solid #fed7aa',
          padding: '8px 16px',
          borderRadius: 'var(--radius-sm)'
        }}>
          <Clock size={16} color="#ea580c" />
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#9a3412' }}>Se termine dans :</span>
          <div style={{ display: 'flex', gap: '4px', fontFamily: 'monospace', fontWeight: 800, fontSize: '0.9375rem' }}>
            <span style={{ background: '#ea580c', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            :
            <span style={{ background: '#ea580c', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            :
            <span style={{ background: '#ea580c', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Flash products */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '18px'
      }}>
        {flashProducts.map((product) => (
          <div key={product.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <ProductCard product={product} />
            {product.soldCount && product.totalStock && (
              <div style={{
                marginTop: '8px',
                padding: '0 4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#ea580c'
                }}>
                  <span>⚡ Déjà vendu : {product.soldCount}</span>
                  <span>Reste : {product.totalStock - product.soldCount}</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#fde68a',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${Math.min(100, (product.soldCount / product.totalStock) * 100)}%`,
                    height: '100%',
                    backgroundColor: '#ea580c'
                  }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
