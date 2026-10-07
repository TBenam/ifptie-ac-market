import React from 'react';
import { MOCK_PRODUCTS } from '../../mock/data';
import { ProductCard } from '../common/ProductCard';
import { Award, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const BestSellersSection: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useStore();
  const bestSellers = MOCK_PRODUCTS.filter(p => p.isBestSeller);

  return (
    <section style={{ marginBottom: '36px' }}>
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
            backgroundColor: 'var(--color-primary-subtle)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Les meilleures ventes
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }} className="desktop-only">
              Produits plébiscités avec avis vérifiés
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
        {bestSellers.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} ctaText="Acheter" />
        ))}
      </div>
    </section>
  );
};
