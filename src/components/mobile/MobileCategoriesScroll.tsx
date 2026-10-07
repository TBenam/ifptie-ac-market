import React from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_HOMEPAGE_CATEGORIES } from '../../mock/data';

export const MobileCategoriesScroll: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setActiveView } = useStore();

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setActiveView('storefront');
    const el = document.getElementById('catalog-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="mobile-categories" style={{ marginBottom: '24px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Catégories populaires
        </h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700 }}>
          Glisser ➔
        </span>
      </div>

      {/* Horizontally scrollable category cards */}
      <div 
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {MOCK_HOMEPAGE_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              style={{
                flex: '0 0 110px',
                scrollSnapAlign: 'start',
                backgroundColor: isSelected ? 'var(--color-primary)' : '#ffffff',
                color: isSelected ? '#ffffff' : 'var(--text-main)',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xs)',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 6px'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-secondary)',
                marginBottom: '6px',
                border: isSelected ? '2px solid rgba(255,255,255,0.4)' : '1px solid var(--border-subtle)'
              }}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                lineHeight: 1.2,
                height: '2.4em',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {cat.title}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
