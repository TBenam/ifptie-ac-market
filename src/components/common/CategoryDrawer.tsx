import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_HOMEPAGE_CATEGORIES } from '../../mock/data';
import { 
  Menu, 
  X, 
  Search, 
  ChevronRight, 
  Flame, 
  Sparkles, 
  TrendingUp, 
  PackageCheck, 
  MessageCircle, 
  Truck, 
  ShieldCheck,
  Zap,
  Sun,
  Utensils,
  Smartphone,
  Heart,
  Lock,
  Car,
  Dumbbell,
  Wrench,
  ShoppingBag
} from 'lucide-react';

// Helper icon mapping for category IDs
const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'solar':
      return <Sun size={20} color="#f59e0b" />;
    case 'home-kitchen':
      return <Utensils size={20} color="#ea580c" />;
    case 'tech':
      return <Smartphone size={20} color="#3b82f6" />;
    case 'beauty':
      return <Heart size={20} color="#ec4899" />;
    case 'intimacy':
      return <Lock size={20} color="#8b5cf6" />;
    case 'automotive':
      return <Car size={20} color="#0284c7" />;
    case 'sport':
      return <Dumbbell size={20} color="#10b981" />;
    case 'tools':
      return <Wrench size={20} color="#64748b" />;
    default:
      return <ShoppingBag size={20} color="var(--color-primary)" />;
  }
};

export const CategoryDrawer: React.FC = () => {
  const { 
    isCategoryDrawerOpen, 
    setIsCategoryDrawerOpen, 
    selectedCategory, 
    setSelectedCategory, 
    setActiveView 
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCategoryDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCategoryDrawerOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCategoryDrawerOpen) {
        setIsCategoryDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCategoryDrawerOpen, setIsCategoryDrawerOpen]);

  if (!isCategoryDrawerOpen) return null;

  const filteredCategories = MOCK_HOMEPAGE_CATEGORIES.filter(cat => 
    cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setActiveView('storefront');
    setIsCategoryDrawerOpen(false);

    // Scroll to catalog section smoothly
    setTimeout(() => {
      const catalogEl = document.getElementById('catalog-section') || document.getElementById('categories-section');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    }, 150);
  };

  const handleViewAll = () => {
    setSelectedCategory('all');
    setActiveView('storefront');
    setIsCategoryDrawerOpen(false);
    setTimeout(() => {
      const catalogEl = document.getElementById('catalog-section');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        animation: 'fadeIn 0.2s ease-out'
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Menu des catégories"
    >
      {/* 1. BACKDROP OVERLAY */}
      <div 
        onClick={() => setIsCategoryDrawerOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(7, 37, 25, 0.65)',
          backdropFilter: 'blur(3px)',
          transition: 'opacity 0.25s ease'
        }}
      />

      {/* 2. LEFT SLIDE-OUT DRAWER CONTAINER */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 'min(360px, 86vw)',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '8px 0 32px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001,
          animation: 'slideInLeft 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* DRAWER TOP HEADER */}
        <div style={{
          backgroundColor: 'var(--color-primary-dark)',
          color: '#ffffff',
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-yellow)'
            }}>
              <Menu size={22} />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.1
              }}>
                Rayons & Catégories
              </div>
              <div style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: '#86efac',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                IFPTIE Market Cameroun 🇨🇲
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCategoryDrawerOpen(false)}
            aria-label="Fermer le menu"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
          >
            <X size={20} />
          </button>
        </div>

        {/* SEARCH WITHIN CATEGORIES */}
        <div style={{
          padding: '12px 18px',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search 
              size={17} 
              color="var(--text-muted)" 
              style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} 
            />
            <input
              type="text"
              placeholder="Filtrer une catégorie (solaire, tech...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 38px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem',
                outline: 'none',
                backgroundColor: '#ffffff',
                color: 'var(--text-main)'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-light)',
                  padding: '4px'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* QUICK SHORTCUTS STRIP */}
        <div style={{
          padding: '10px 18px',
          backgroundColor: '#fef3c7',
          borderBottom: '1px solid #fde68a',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => {
              setActiveView('promotions');
              setIsCategoryDrawerOpen(false);
            }}
            style={{
              padding: '5px 10px',
              backgroundColor: '#ea580c',
              color: '#ffffff',
              borderRadius: '999px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Flame size={13} />
            Promos Flash
          </button>

          <button
            onClick={() => {
              setActiveView('trending');
              setIsCategoryDrawerOpen(false);
            }}
            style={{
              padding: '5px 10px',
              backgroundColor: '#0b5738',
              color: '#ffffff',
              borderRadius: '999px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <TrendingUp size={13} />
            Tendances
          </button>

          <button
            onClick={() => {
              setActiveView('tracking');
              setIsCategoryDrawerOpen(false);
            }}
            style={{
              padding: '5px 10px',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Truck size={13} />
            Suivi Colis
          </button>
        </div>

        {/* DRAWER SCROLLABLE CATEGORIES LIST */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {/* Option: "Tous les produits" */}
          <button
            onClick={handleViewAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: 'var(--radius-sm)',
              border: selectedCategory === 'all' ? '1.5px solid var(--color-primary)' : '1px solid transparent',
              backgroundColor: selectedCategory === 'all' ? 'var(--color-primary-subtle)' : 'transparent',
              color: selectedCategory === 'all' ? 'var(--color-primary-dark)' : 'var(--text-main)',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'background-color 0.15s'
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== 'all') e.currentTarget.style.backgroundColor = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== 'all') e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#ecfdf5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)'
              }}>
                <Sparkles size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Tous les Rayons</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Catalogue complet IFPTIE</div>
              </div>
            </div>
            <ChevronRight size={16} color="var(--text-light)" />
          </button>

          <div style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: 'var(--text-muted)',
            padding: '12px 14px 6px',
            borderTop: '1px solid var(--border-subtle)',
            marginTop: '4px'
          }}>
            Catégories ({filteredCategories.length})
          </div>

          {filteredCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid transparent',
                  backgroundColor: isSelected ? 'var(--color-primary-subtle)' : 'transparent',
                  color: isSelected ? 'var(--color-primary-dark)' : 'var(--text-main)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {getCategoryIcon(cat.id)}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      <span>{cat.title}</span>
                    </div>
                    <div style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {cat.description}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, marginLeft: '8px' }}>
                  {cat.badge && (
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: cat.badge.includes('Local') ? '#dcfce7' : cat.badge.includes('Discret') ? '#ede9fe' : '#fef3c7',
                      color: cat.badge.includes('Local') ? '#166534' : cat.badge.includes('Discret') ? '#6b21a8' : '#92400e'
                    }}>
                      {cat.badge}
                    </span>
                  )}
                  <ChevronRight size={16} color="var(--text-light)" />
                </div>
              </button>
            );
          })}
        </div>

        {/* DRAWER FOOTER ASSISTANCE & COMMITMENT */}
        <div style={{
          padding: '16px 18px',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: '#f8fafc'
        }}>
          <a
            href="https://wa.me/237699000000?text=Bonjour%20IFPTIE%20Market,%20j'ai%20besoin%20d'aide%20pour%20choisir%20un%20produit"
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp btn-sm"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: '0.85rem',
              marginBottom: '10px'
            }}
          >
            <MessageCircle size={17} />
            <span>Conseiller WhatsApp direct (+237)</span>
          </a>

          <button
            onClick={() => {
              setActiveView('admin');
              setIsCategoryDrawerOpen(false);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '9px 12px',
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-main)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: '12px'
            }}
          >
            <ShieldCheck size={16} color="var(--color-primary)" />
            <span>🔐 Espace Administration (Gestionnaire)</span>
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            lineHeight: 1.3
          }}>
            <ShieldCheck size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <span>Paiement à la livraison à Douala & Yaoundé. Expédition sécurisée dans toutes les régions.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
