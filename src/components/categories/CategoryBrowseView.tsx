import React from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_HOMEPAGE_CATEGORIES } from '../../mock/data';
import { 
  ArrowRight, 
  Flame, 
  Sparkles, 
  Layers, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const CategoryBrowseView: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useStore();

  const handleSelectCategory = (catId: string) => {
    if (catId === 'deals') {
      setActiveView('promotions');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (catId === 'trending') {
      setActiveView('trending');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectedCategory(catId);
    setActiveView('storefront');
    setTimeout(() => {
      const el = document.getElementById('catalog-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const momentTrendingCategories = MOCK_HOMEPAGE_CATEGORIES.filter(c => c.isMomentTrending);

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      {/* 1. PAGE TITLE & SUBTITLE */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '28px',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Layers size={22} color="var(--color-primary)" />
            <h1 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              color: 'var(--color-primary-dark)',
              margin: 0,
              letterSpacing: '-0.4px'
            }}>
              Catégories
            </h1>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
            Explorez l'ensemble des rayons disponibles en stock immédiat au Cameroun
          </p>
        </div>

        <span className="badge badge-express" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
          🇨🇲 11 Rayons Thématiques
        </span>
      </div>

      {/* 2. SPECIAL HIGHLIGHTED SECTION: "🔥 Les catégories du moment" */}
      <section style={{
        marginBottom: '36px',
        backgroundColor: '#fffbeb',
        border: '1.5px solid #fde68a',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 16px',
        boxShadow: '0 4px 14px rgba(245, 158, 11, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: '#ea580c',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(234, 88, 12, 0.3)'
          }}>
            <Flame size={20} />
          </div>
          <div>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#9a3412',
              margin: 0
            }}>
              🔥 Les catégories du moment
            </h2>
            <p style={{ fontSize: '0.75rem', color: '#b45309', margin: 0 }}>
              Forte demande et arrivages containers prioritaires à Douala & Yaoundé
            </p>
          </div>
        </div>

        {/* 2-column mobile grid, 4-column desktop grid for highlighted moment categories */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px'
        }}>
          {momentTrendingCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #fed7aa',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px',
                transition: 'all 0.2s',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 14px rgba(245, 158, 11, 0.2)';
                e.currentTarget.style.borderColor = '#f59e0b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#fed7aa';
              }}
            >
              <img
                src={cat.image}
                alt={cat.title}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: 'var(--radius-sm)',
                  objectFit: 'cover',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span className="badge badge-yellow" style={{ fontSize: '0.62rem', padding: '2px 6px', marginBottom: '4px' }}>
                  {cat.badge}
                </span>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  lineHeight: 1.2
                }} className="text-truncate">
                  {cat.title}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {cat.itemCount}
                </div>
              </div>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-subtle)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VISUAL CATEGORY DIRECTORY (11 CATEGORIES) */}
      <section>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Tous les rayons ({MOCK_HOMEPAGE_CATEGORIES.length})
          </h2>
        </div>

        {/* 2-column mobile grid, 3 or 4 columns desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '14px'
        }}>
          {MOCK_HOMEPAGE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-xs)',
                transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'var(--color-primary-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              {/* Category Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '55%',
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

                {/* Badge if discreet */}
                {cat.isDiscreet && (
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: '#7c3aed',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    🔒 Colis Discret
                  </span>
                )}

                {/* Badge general */}
                {!cat.isDiscreet && cat.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    color: 'var(--color-primary-dark)',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {cat.badge}
                  </span>
                )}
              </div>

              {/* Information Row: Name + Product Count + Arrow */}
              <div style={{
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                flex: 1
              }}>
                <div>
                  <h3 style={{
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    lineHeight: 1.25,
                    marginBottom: '2px'
                  }}>
                    {cat.title}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {cat.itemCount}
                  </div>
                </div>

                {/* Arrow Icon requested */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-subtle)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
