import React from 'react';
import { MOCK_PRODUCTS } from '../../mock/data';
import { ProductCard } from '../common/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const NewArrivalsSection: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useStore();
  const newArrivals = MOCK_PRODUCTS.filter(p => p.isNewArrival);

  return (
    <section id="new-arrivals-section" style={{ marginBottom: '36px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: '#e0f2fe',
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Nouveautés
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }} className="desktop-only">
              Derniers containers déchargés à Douala
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedCategory('all');
            setActiveView('storefront');
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-primary)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>Voir tout</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 2-column product grid on mobile, 4 on desktop */}
      <div className="product-grid-2col">
        {newArrivals.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} ctaText="Acheter" />
        ))}
      </div>
    </section>
  );
};
