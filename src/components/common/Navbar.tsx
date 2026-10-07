import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { AppView } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import { 
  Search, 
  ShoppingCart, 
  User, 
  MessageCircle, 
  MapPin, 
  X,
  ChevronDown,
  Flame,
  Sparkles,
  TrendingUp,
  Grid,
  Menu,
  Tag
} from 'lucide-react';
import { MOCK_HOMEPAGE_CATEGORIES, MOCK_PRODUCTS } from '../../mock/data';
import { CategoryDrawer } from './CategoryDrawer';

export const Navbar: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    setIsCartOpen, 
    getCartSubtotal, 
    getCartCount,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setSelectedProduct,
    isCategoryDrawerOpen,
    setIsCategoryDrawerOpen
  } = useStore();

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const cartCount = getCartCount();
  const subtotal = getCartSubtotal();

  const handleNavClick = (view: AppView, category?: string, scrollId?: string) => {
    setActiveView(view);
    if (category) setSelectedCategory(category);
    if (scrollId) {
      setTimeout(() => {
        const el = document.getElementById(scrollId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const focusMobileSearch = () => {
    const input = document.getElementById('mobile-search-input') as HTMLInputElement | null;
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 850,
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(11, 87, 56, 0.08)',
      width: '100%'
    }}>
      {/* =========================================================================
          A. MOBILE TOP HEADER (Sticky: Logo, Search Icon, Cart Icon)
          ========================================================================= */}
      <div className="mobile-only" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-subtle)' }}>
        {/* Sticky row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          gap: '10px'
        }}>
          {/* Left: 3-bar hamburger menu + Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* 3 horizontal bars button (hamburger for categories) */}
            <button
              onClick={() => setIsCategoryDrawerOpen(true)}
              aria-label="Ouvrir le menu des catégories"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-primary-subtle)',
                border: '1.5px solid rgba(11, 87, 56, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary-dark)',
                cursor: 'pointer',
                flexShrink: 0
              }}
              title="Menu Catégories"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <div 
              onClick={() => handleNavClick('storefront', 'all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              <img 
                src="/logo.jpg" 
                alt="IFPTIE Market" 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  objectFit: 'contain',
                  border: '1px solid var(--border-subtle)'
                }}
              />
              <div>
                <div style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  lineHeight: 1
                }}>
                  IFPTIE <span style={{ color: 'var(--color-yellow-hover)' }}>MARKET</span>
                </div>
                <div style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase'
                }}>
                  Cameroun 🇨🇲
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Icons: Search Icon & Cart Icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Search Icon */}
            <button
              onClick={focusMobileSearch}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                cursor: 'pointer'
              }}
              title="Rechercher"
            >
              <Search size={20} />
            </button>

            {/* Cart Icon with Item Count */}
            <button
              onClick={() => {
                setActiveView('cart');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                position: 'relative',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-primary-subtle)',
                border: '1.5px solid rgba(11, 87, 56, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                cursor: 'pointer'
              }}
              title="Panier"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  backgroundColor: 'var(--color-yellow)',
                  color: '#0f172a',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Below Sticky Header: Large Mobile Search Bar */}
        <div style={{ padding: '0 14px 10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 'var(--radius-sm)',
            border: '2px solid var(--color-primary)',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(11, 87, 56, 0.08)'
          }}>
            <div style={{ padding: '0 12px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}>
              <Search size={18} />
            </div>

            <input
              id="mobile-search-input"
              type="text"
              placeholder="Que recherchez-vous ?"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeView !== 'storefront') setActiveView('storefront');
              }}
              style={{
                border: 'none',
                outline: 'none',
                padding: '10px 0',
                width: '100%',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--text-main)'
              }}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: '0 10px',
                  cursor: 'pointer',
                  color: 'var(--text-light)'
                }}
              >
                <X size={16} />
              </button>
            )}

            <button
              onClick={() => {
                if (!searchQuery.trim()) setSearchQuery('lampe solaire');
                setActiveView('listing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                border: 'none',
                padding: '10px 14px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              OK
            </button>
          </div>
        </div>

        {/* Mobile Promo Banner Strip */}
        <div 
          onClick={() => {
            setActiveView('promotions');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            backgroundColor: '#fff7ed',
            borderTop: '1px solid #fed7aa',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: '#c2410c',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Flame size={14} color="#ea580c" />
            <span>🔥 Bons plans : jusqu'à -50% & Packs</span>
          </span>
          <span style={{ 
            backgroundColor: 'var(--color-yellow)', 
            color: '#78350f', 
            padding: '2px 8px', 
            borderRadius: '999px',
            fontSize: '0.68rem',
            fontWeight: 900
          }}>
            PROFITER &rarr;
          </span>
        </div>
      </div>

      {/* =========================================================================
          B. DESKTOP FULL HEADER (Sticky for Desktop Viewports)
          ========================================================================= */}
      <div className="desktop-only">
        {/* 1. TOP TICKER / INFO BAR */}
        <div style={{
          backgroundColor: 'var(--color-primary-dark)',
          color: '#ffffff',
          fontSize: '0.75rem',
          padding: '6px 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div className="container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={13} color="var(--color-yellow)" />
                <strong>Cameroun :</strong> Livraison Express à Douala & Yaoundé (24h) • Expédition toutes régions
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a 
                href="https://wa.me/237699000000" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#86efac',
                  fontWeight: 600
                }}
              >
                <MessageCircle size={13} />
                Service Client WhatsApp : +237 699 00 00 00
              </a>

              {/* Ecosystem Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 255, 255, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                <button
                  onClick={() => setActiveView('storefront')}
                  style={{
                    background: activeView === 'storefront' ? '#ffffff' : 'transparent',
                    color: activeView === 'storefront' ? 'var(--color-primary-dark)' : '#ffffff',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Boutique
                </button>
                <button
                  onClick={() => {
                    if (!searchQuery) setSearchQuery('lampe solaire');
                    setActiveView('listing');
                  }}
                  style={{
                    background: activeView === 'listing' ? '#ffffff' : 'transparent',
                    color: activeView === 'listing' ? 'var(--color-primary-dark)' : '#ffffff',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Recherche
                </button>
                <button
                  onClick={() => {
                    setActiveView('promotions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    background: activeView === 'promotions' ? 'var(--color-yellow)' : '#ea580c',
                    color: activeView === 'promotions' ? '#78350f' : '#ffffff',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Promos 🔥
                </button>
                <button
                  onClick={() => {
                    const defaultProd = MOCK_PRODUCTS.find(p => p.id === 'prod-solar-03') || MOCK_PRODUCTS[0];
                    setSelectedProduct(defaultProd);
                    setActiveView('product-detail');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    background: activeView === 'product-detail' ? '#ffffff' : 'transparent',
                    color: activeView === 'product-detail' ? 'var(--color-primary-dark)' : '#ffffff',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Fiche Produit
                </button>
                <button
                  onClick={() => {
                    setActiveView('order-confirmation');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    background: activeView === 'order-confirmation' ? '#ffffff' : 'transparent',
                    color: activeView === 'order-confirmation' ? 'var(--color-primary-dark)' : '#ffffff',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Confirmation 🎉
                </button>
                <button
                  onClick={() => setActiveView('tracking')}
                  style={{
                    background: activeView === 'tracking' ? '#ffffff' : 'transparent',
                    color: activeView === 'tracking' ? 'var(--color-primary-dark)' : '#ffffff',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Suivi Colis
                </button>
                <button
                  onClick={() => setActiveView('courier')}
                  style={{
                    background: activeView === 'courier' ? '#f59e0b' : 'transparent',
                    color: activeView === 'courier' ? '#000' : '#ffffff',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Coursier
                </button>
                <button
                  onClick={() => setActiveView('admin')}
                  style={{
                    background: activeView === 'admin' ? '#10b981' : 'transparent',
                    color: activeView === 'admin' ? '#ffffff' : '#ffffff',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cockpit Admin
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MAIN HEADER BAR */}
        <div style={{ padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}>
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('storefront', 'all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                userSelect: 'none',
                flexShrink: 0
              }}
            >
              <img 
                src="/logo.jpg" 
                alt="IFPTIE Market" 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  objectFit: 'contain',
                  border: '1.5px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-xs)'
                }}
              />
              <div>
                <div style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.05
                }}>
                  IFPTIE <span style={{ color: 'var(--color-yellow-hover)' }}>MARKET</span>
                </div>
                <div style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase'
                }}>
                  Marketplace Cameroun • Solaire, Maison & Tech
                </div>
              </div>
            </div>

            {/* Large Search Bar */}
            <div style={{ flex: 1, maxWidth: '620px', position: 'relative' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 'var(--radius-sm)',
                border: '2px solid var(--color-primary)',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 6px rgba(11, 87, 56, 0.08)'
              }}>
                <div style={{ padding: '0 14px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}>
                  <Search size={20} />
                </div>

                <input
                  type="text"
                  placeholder="Que recherchez-vous ?"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeView !== 'storefront') setActiveView('storefront');
                  }}
                  style={{
                    border: 'none',
                    outline: 'none',
                    padding: '11px 0',
                    width: '100%',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--text-main)'
                  }}
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      padding: '0 10px',
                      cursor: 'pointer',
                      color: 'var(--text-light)'
                    }}
                  >
                    <X size={16} />
                  </button>
                )}

                <button
                  onClick={() => {
                    if (!searchQuery.trim()) setSearchQuery('lampe solaire');
                    setActiveView('listing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '11px 22px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Rechercher</span>
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              <a
                href="https://wa.me/237699000000?text=Bonjour%20IFPTIE%20Market,%20je%20souhaite%20commander"
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-sm"
                style={{ padding: '8px 14px', borderRadius: 'var(--radius-sm)' }}
                title="Assistance WhatsApp directe"
              >
                <MessageCircle size={17} />
                <span>WhatsApp Direct</span>
              </a>

              <button
                onClick={() => setActiveView('admin')}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  color: 'var(--text-main)',
                  fontSize: '0.8125rem',
                  fontWeight: 600
                }}
                title="Mon Compte / Connexion"
              >
                <User size={18} color="var(--color-primary)" />
                <span>Compte</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('cart');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: activeView === 'cart' ? 'var(--color-primary)' : 'var(--color-primary-subtle)',
                  color: activeView === 'cart' ? '#ffffff' : 'var(--text-main)',
                  border: '1.5px solid rgba(11, 87, 56, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 14px',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                title="Voir le panier"
              >
                <div style={{ position: 'relative', display: 'flex' }}>
                  <ShoppingCart size={22} color="var(--color-primary)" />
                  {cartCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      backgroundColor: 'var(--color-yellow)',
                      color: '#0f172a',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                    }}>
                      {cartCount}
                    </span>
                  )}
                </div>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1 }}>Panier</span>
                  <span style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    color: 'var(--color-primary-dark)',
                    lineHeight: 1.2
                  }}>
                    {formatFCFA(subtotal)}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 3. MAIN NAVIGATION BAR */}
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div className="container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 0' }}>
              {/* 3 Horizontal Bars Hamburger Menu for Left Categories Drawer */}
              <button
                onClick={() => setIsCategoryDrawerOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: 'var(--color-primary)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(11, 87, 56, 0.22)',
                  marginRight: '6px'
                }}
                title="Toutes les catégories (Menu gauche)"
              >
                <Menu size={18} />
                <span>Toutes les catégories</span>
                <ChevronDown size={15} />
              </button>

              <button
                onClick={() => handleNavClick('storefront', 'all')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: selectedCategory === 'all' && activeView === 'storefront' ? 'var(--color-primary-subtle)' : 'transparent',
                  color: selectedCategory === 'all' && activeView === 'storefront' ? 'var(--color-primary)' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Accueil
              </button>

              <button
                onClick={() => {
                  setActiveView('categories');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: activeView === 'categories' ? 'var(--color-primary-subtle)' : 'transparent',
                  color: activeView === 'categories' ? 'var(--color-primary)' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                <Grid size={16} color="var(--color-primary)" />
                <span>Catégories</span>
              </button>



              <button
                onClick={() => {
                  setActiveView('promotions');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: activeView === 'promotions' ? '1.5px solid #fed7aa' : 'none',
                  background: activeView === 'promotions' ? '#fff7ed' : 'transparent',
                  color: '#ea580c',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                <Flame size={16} color="#ea580c" />
                <span>Promotions 🔥</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('trending');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: activeView === 'trending' ? '1.5px solid rgba(11, 87, 56, 0.25)' : 'none',
                  background: activeView === 'trending' ? 'var(--color-primary-subtle)' : 'transparent',
                  color: activeView === 'trending' ? 'var(--color-primary)' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                <TrendingUp size={16} color="var(--color-primary)" />
                <span>Tendances</span>
              </button>

              <button
                onClick={() => handleNavClick('storefront', 'all', 'new-arrivals-section')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={16} color="var(--color-yellow-hover)" />
                <span>Nouveautés</span>
              </button>
            </nav>

            <div style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Tag size={15} color="var(--color-yellow-hover)" />
              <span>Paiement à la livraison garanti à Douala & Yaoundé</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Left Category Drawer */}
      <CategoryDrawer />
    </header>
  );
};
