import React from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_HOMEPAGE_CATEGORIES } from '../../mock/data';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const CategorySection: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useStore();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setActiveView('storefront');
    const el = document.getElementById('catalog-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{ marginBottom: '48px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
            Shoppez par catégorie
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Sélection de premier choix disponible en stock immédiat au Cameroun
          </p>
        </div>

        <button
          onClick={() => handleCategoryClick('all')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-primary)',
            fontSize: '0.875rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>Voir tout le catalogue</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Grid of 8 attractive category cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        {MOCK_HOMEPAGE_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--color-primary-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            {/* Category Image Box */}
            <div style={{
              position: 'relative',
              width: '100%',
              paddingTop: '60%',
              backgroundColor: '#f8fafc',
              overflow: 'hidden'
            }}>
              <img
                src={cat.image}
                alt={cat.title}
                loading="lazy"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 60%)'
              }} />

              {/* Badge */}
              <span
                className="badge"
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: cat.isDiscreet ? '#7c3aed' : 'var(--color-yellow)',
                  color: cat.isDiscreet ? '#ffffff' : '#0f172a',
                  fontSize: '0.68rem',
                  fontWeight: 800
                }}
              >
                {cat.badge}
              </span>

              {/* Total items badge bottom */}
              <span style={{
                position: 'absolute',
                bottom: '8px',
                right: '10px',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 700,
                backgroundColor: 'rgba(0,0,0,0.45)',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {cat.itemCount}
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                marginBottom: '4px'
              }}>
                {cat.title}
              </h3>
              <p style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                lineHeight: 1.35,
                margin: 0
              }}>
                {cat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
