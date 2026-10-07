import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_PRODUCTS } from '../../mock/data';
import { formatFCFA } from '../../utils/formatters';
import type { Product } from '../../types';
import { 
  Flame, 
  TrendingUp, 
  Award, 
  Sparkles, 
  MapPin, 
  ShoppingCart, 
  MessageCircle, 
  Eye, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  ChevronRight,
  Package,
  Heart
} from 'lucide-react';

export const TrendingView: React.FC = () => {
  const { 
    addToCart, 
    setIsCartOpen, 
    setSelectedProduct, 
    addToast,
    setActiveView,
    wishlist,
    toggleWishlist
  } = useStore();

  // Active City for "Produits populaires près de chez vous"
  const [selectedCity, setSelectedCity] = useState<'all' | 'douala' | 'yaounde' | 'bafoussam' | 'garoua' | 'kribi'>('all');

  // Active ranking tab for quick scroll
  const [activeTab, setActiveTab] = useState<'all' | 'top_week' | 'best_sellers' | 'rising' | 'local'>('all');

  // Simulated live social purchase ticker
  const recentPurchases = useMemo(() => [
    { name: 'Brice M.', city: 'Douala (Akwa)', product: 'Kit Énergie Solaire Hybride 500W', time: 'il y a 3 min' },
    { name: 'Carine N.', city: 'Yaoundé (Bastos)', product: 'Robot Cuiseur & Hachoir Inox 3L', time: 'il y a 7 min' },
    { name: 'Francis K.', city: 'Bafoussam', product: 'Visseuse Sans Fil Pro 21V', time: 'il y a 12 min' },
    { name: 'Amina D.', city: 'Garoua', product: 'Power Bank Solaire 20 000 mAh', time: 'il y a 15 min' },
    { name: 'Nathalie T.', city: 'Douala (Deido)', product: 'Mini Climatiseur USB', time: 'il y a 18 min' },
  ], []);

  const [currentTickerIdx, setCurrentTickerIdx] = useState(0);

  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setCurrentTickerIdx(prev => (prev + 1) % recentPurchases.length);
    }, 4000);
    return () => clearInterval(tickerInterval);
  }, [recentPurchases.length]);

  // Products Categorization for Rankings
  // 1. Top produits de la semaine (Ranked 1 to 5 with rank badges)
  const topWeekProducts: (Product & { rank: number; weeklySales: number; viewsToday: number })[] = useMemo(() => {
    const rankIds = [
      'prod-solar-01', // #1
      'prod-tech-01',  // #2
      'prod-home-01',  // #3
      'bundle-01',     // #4
      'prod-auto-01',  // #5
      'promo-50-01'    // #6
    ];

    return rankIds
      .map((id, index) => {
        const prod = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[index];
        return {
          ...prod,
          rank: index + 1,
          weeklySales: 168 - (index * 24),
          viewsToday: 1850 - (index * 220),
          trendBadge: (index === 0 ? 'tendance' : index === 1 ? 'bestseller' : 'populaire') as Product['trendBadge']
        };
      })
      .filter(Boolean);
  }, []);

  // 2. Les plus vendus (All-time champions)
  const bestSellersProducts = useMemo(() => {
    return MOCK_PRODUCTS
      .filter(p => p.isBestSeller || (p.soldCount && p.soldCount >= 60))
      .slice(0, 8);
  }, []);

  // 3. Les nouveautés qui montent (Rising virals)
  const risingProducts = useMemo(() => {
    return MOCK_PRODUCTS
      .filter(p => p.isNewArrival || p.isHalfPricePromo || p.id === 'promo-50-01' || p.id === 'promo-50-03' || p.id === 'prod-tech-02' || p.id === 'deal-best-02')
      .slice(0, 8);
  }, []);

  // 4. Produits populaires près de chez vous
  const cityFilteredProducts = useMemo(() => {
    if (selectedCity === 'douala') {
      return MOCK_PRODUCTS.filter(p => p.category === 'home-kitchen' || p.category === 'tech' || p.id === 'prod-auto-01').slice(0, 6);
    }
    if (selectedCity === 'yaounde') {
      return MOCK_PRODUCTS.filter(p => p.category === 'solar' || p.category === 'tools' || p.isBundle).slice(0, 6);
    }
    if (selectedCity === 'bafoussam') {
      return MOCK_PRODUCTS.filter(p => p.category === 'solar' || p.category === 'tools' || p.id === 'bundle-02').slice(0, 6);
    }
    if (selectedCity === 'garoua') {
      return MOCK_PRODUCTS.filter(p => p.category === 'solar' || p.id === 'deal-best-01' || p.id === 'deal-best-02').slice(0, 6);
    }
    if (selectedCity === 'kribi') {
      return MOCK_PRODUCTS.filter(p => p.category === 'beauty' || p.category === 'intimacy' || p.id === 'deal-best-03').slice(0, 6);
    }
    // 'all'
    return MOCK_PRODUCTS.filter(p => p.isTrending || p.isBestSeller).slice(0, 8);
  }, [selectedCity]);

  const handleBuyNow = (product: Product) => {
    addToCart(product, 1);
    addToast(`🔥 "${product.name.slice(0, 28)}..." ajouté au panier !`, 'success');
    setIsCartOpen(true);
  };

  const handleWhatsAppOrder = (product: Product) => {
    const message = encodeURIComponent(
      `Bonjour IFPTIE Market, je souhaite commander ce produit Tendance : ${product.name} au prix de ${formatFCFA(product.price)} avec livraison express.`
    );
    window.open(`https://wa.me/237699000000?text=${message}`, '_blank');
  };

  // Helper for Product Badge Style
  const getBadgeConfig = (type?: string, defaultBadge?: string) => {
    const badge = type || defaultBadge || 'tendance';
    switch (badge) {
      case 'bestseller':
        return {
          label: 'Best-seller',
          bg: '#0b5738',
          text: '#ffffff',
          icon: <Award size={12} fill="#ffffff" />
        };
      case 'nouveau':
        return {
          label: 'Nouveau',
          bg: '#0284c7',
          text: '#ffffff',
          icon: <Sparkles size={12} fill="#ffffff" />
        };
      case 'populaire':
        return {
          label: 'Populaire',
          bg: '#7c3aed',
          text: '#ffffff',
          icon: <Users size={12} />
        };
      case 'tendance':
      default:
        return {
          label: '🔥 Tendance',
          bg: '#ea580c',
          text: '#ffffff',
          icon: <Flame size={12} fill="#ffffff" />
        };
    }
  };

  // Render Trending Card
  const renderTrendingCard = (
    product: Product, 
    options?: { 
      rankNumber?: number; 
      badgeType?: 'tendance' | 'bestseller' | 'nouveau' | 'populaire';
      weeklySales?: number;
      viewsCount?: number;
      cityTag?: string;
    }
  ) => {
    const badge = getBadgeConfig(options?.badgeType || product.trendBadge, product.isBestSeller ? 'bestseller' : product.isNewArrival ? 'nouveau' : 'tendance');
    const isWished = wishlist.includes(product.id);

    return (
      <div 
        key={product.id}
        className="card trending-card-interactive"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: options?.rankNumber && options.rankNumber <= 3 ? '2px solid #f59e0b' : '1px solid var(--border-subtle)',
          boxShadow: options?.rankNumber && options.rankNumber <= 3 ? '0 8px 24px rgba(245, 158, 11, 0.14)' : 'var(--shadow-card)',
          overflow: 'hidden',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
      >
        {/* Top Image Box */}
        <div style={{ position: 'relative', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
          {/* Main Image */}
          <div 
            style={{ 
              position: 'relative', 
              aspectRatio: '1/1', 
              cursor: 'pointer',
              overflow: 'hidden' 
            }}
            onClick={() => setSelectedProduct(product)}
          >
            <img 
              src={product.images[0]} 
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />

            {/* TOP LEFT: RANK NUMBER (#1, #2, #3, ...) OR TREND LABEL */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              zIndex: 2
            }}>
              {/* Rank Badge if specified */}
              {options?.rankNumber && (
                <div style={{
                  backgroundColor: options.rankNumber === 1 
                    ? '#f59e0b' 
                    : options.rankNumber === 2 
                    ? '#64748b' 
                    : options.rankNumber === 3 
                    ? '#b45309' 
                    : '#0f172a',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.8rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                  letterSpacing: '0.5px'
                }}>
                  <span>{options.rankNumber === 1 ? '🥇 #1' : options.rankNumber === 2 ? '🥈 #2' : options.rankNumber === 3 ? '🥉 #3' : `#${options.rankNumber}`}</span>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.9 }}>TOP</span>
                </div>
              )}

              {/* Standard Trend Label requested by user */}
              <span style={{
                backgroundColor: badge.bg,
                color: badge.text,
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '4px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                letterSpacing: '0.3px'
              }}>
                {badge.icon}
                <span>{badge.label}</span>
              </span>

              {/* Discount pill if available */}
              {product.originalPrice && product.originalPrice > product.price && (
                <span style={{
                  backgroundColor: 'var(--color-yellow)',
                  color: '#78350f',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  padding: '2px 6px',
                  borderRadius: '3px',
                  width: 'fit-content'
                }}>
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* TOP RIGHT: Action Icons (Wishlist & Quick View) */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              zIndex: 2
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                  addToast(isWished ? 'Retiré de vos favoris' : 'Ajouté à vos favoris !', 'info');
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isWished ? '#ef4444' : '#64748b',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
                }}
                title="Favoris"
              >
                <Heart size={15} fill={isWished ? '#ef4444' : 'none'} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(product);
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary-dark)',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
                }}
                title="Aperçu rapide"
              >
                <Eye size={15} />
              </button>
            </div>

            {/* BOTTOM IMAGE STRIP: Social proof interest */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(4px)',
              color: '#ffffff',
              padding: '5px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fde047' }}>
                <TrendingUp size={12} />
                <span>{options?.weeklySales ? `${options.weeklySales} vendus cette semaine` : `${product.soldCount || 48} vendus récemment`}</span>
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.68rem' }}>
                {options?.viewsCount ? `${options.viewsCount} vues` : '🔥 Forte demande'}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div style={{
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          <div>
            {/* Category & City Tag */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '4px',
              fontSize: '0.72rem'
            }}>
              <span style={{
                fontWeight: 700,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.4px'
              }}>
                {product.categoryLabel}
              </span>

              {options?.cityTag && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  color: '#b45309',
                  fontWeight: 700,
                  backgroundColor: '#fffbeb',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  <MapPin size={11} />
                  <span>{options.cityTag}</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h3 
              onClick={() => setSelectedProduct(product)}
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                lineHeight: 1.35,
                color: 'var(--text-main)',
                margin: '0 0 6px 0',
                cursor: 'pointer',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: '2.7em'
              }}
              title={product.name}
            >
              {product.name}
            </h3>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', color: 'var(--color-yellow)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({product.reviewsCount} avis)</span>
            </div>
          </div>

          {/* Pricing & Stock block */}
          <div>
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '8px 10px',
              borderRadius: '6px',
              border: '1px solid #f1f5f9',
              marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: 'var(--color-primary-dark)',
                  lineHeight: 1
                }}>
                  {formatFCFA(product.price)}
                </span>
                {product.originalPrice && (
                  <span style={{
                    fontSize: '0.8rem',
                    textDecoration: 'line-through',
                    color: '#94a3b8'
                  }}>
                    {formatFCFA(product.originalPrice)}
                  </span>
                )}
              </div>

              <div style={{ 
                fontSize: '0.7rem', 
                color: '#16a34a', 
                fontWeight: 700, 
                marginTop: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={12} />
                <span>Paiement à la livraison • En stock</span>
              </div>
            </div>

            {/* Actions: "Acheter maintenant" & WhatsApp */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                onClick={() => handleBuyNow(product)}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontWeight: 800,
                  fontSize: '0.825rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <ShoppingCart size={15} />
                <span>Acheter maintenant</span>
              </button>

              <button
                onClick={() => handleWhatsAppOrder(product)}
                style={{
                  width: '100%',
                  backgroundColor: '#f0fdf4',
                  color: '#15803d',
                  border: '1px solid #bbf7d0',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <MessageCircle size={13} color="#16a34a" />
                <span>Commander WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#fcfbf7', minHeight: '100vh', paddingBottom: '70px' }}>
      {/* =========================================================================
          1. HERO SECTION: "🔥 Les produits dont tout le monde parle"
          ========================================================================= */}
      <section style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 45%, #064e3b 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        padding: '38px 0 46px 0',
        borderBottom: '4px solid #f59e0b'
      }}>
        {/* Ambient background glows */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '5%',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.3) 0%, rgba(234, 88, 12, 0) 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: '8%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(16, 185, 129, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb navigation */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontSize: '0.8rem', 
            marginBottom: '16px',
            color: '#94a3b8'
          }}>
            <span 
              onClick={() => setActiveView('storefront')} 
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Accueil
            </span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--color-yellow)', fontWeight: 700 }}>
              Tendances & Best-Sellers
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'center'
          }}>
            {/* Left Hero Content */}
            <div>
              {/* Virality Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(234, 88, 12, 0.2)',
                border: '1.5px solid #ea580c',
                color: '#fdba74',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 800,
                marginBottom: '16px',
                boxShadow: '0 2px 10px rgba(234, 88, 12, 0.25)'
              }}>
                <Flame size={16} color="#f97316" fill="#f97316" />
                <span>TENDANCES VIRALES • ARBITRAGE DU MARCHÉ CAMEROUNAIS</span>
              </div>

              {/* Exact Hero Title Requested */}
              <h1 style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(2rem, 4.2vw, 3rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '14px',
                letterSpacing: '-0.5px'
              }}>
                🔥 Les produits dont tout le monde parle
              </h1>

              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                lineHeight: 1.55,
                color: '#cbd5e1',
                maxWidth: '560px',
                marginBottom: '24px'
              }}>
                Découvrez les équipements et pépites du moment plébiscités par des milliers de clients à Douala, Yaoundé et dans tout le Cameroun.
              </p>

              {/* Social Buzz Stats */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#f1f5f9'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '6px 12px',
                  borderRadius: '6px'
                }}>
                  <TrendingUp size={16} color="var(--color-yellow)" />
                  <span>+1 420 commandes cette semaine</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '6px 12px',
                  borderRadius: '6px'
                }}>
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                  <span>4.8/5 satisfaction client</span>
                </div>
              </div>
            </div>

            {/* Right Hero: Live Social-Commerce Purchase Ticker Card */}
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(245, 158, 11, 0.4)',
              borderRadius: 'var(--radius-lg)',
              padding: '22px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
              maxWidth: '430px',
              justifySelf: 'end',
              width: '100%'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
                paddingBottom: '10px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontSize: '0.8rem', fontWeight: 800 }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    display: 'inline-block',
                    boxShadow: '0 0 8px #22c55e'
                  }} />
                  <span>ACTIVITÉ D'ACHAT EN DIRECT</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Cameroun 🇨🇲</span>
              </div>

              {/* Animated Live Ticker */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '12px 14px',
                borderLeft: '4px solid var(--color-yellow)',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                  Achat vérifié • {recentPurchases[currentTickerIdx].time}
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff', marginBottom: '4px' }}>
                  {recentPurchases[currentTickerIdx].name} ({recentPurchases[currentTickerIdx].city})
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-yellow)', fontWeight: 700 }}>
                  a commandé : {recentPurchases[currentTickerIdx].product}
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                ⚡ <strong>Livraison express assurée :</strong> Tous nos produits tendance sont prêts à partir depuis les entrepôts de Douala et Yaoundé.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. STICKY QUICK-NAVIGATION TABS / JUMP ANCHORS
          ========================================================================= */}
      <section style={{
        position: 'sticky',
        top: '60px',
        zIndex: 800,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-subtle)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        padding: '10px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none'
        }}>
          <button
            onClick={() => {
              setActiveTab('all');
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'all' ? 'var(--color-primary)' : '#f1f5f9',
              color: activeTab === 'all' ? '#ffffff' : '#334155',
              fontWeight: 700,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <span>Toutes les tendances</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('top_week');
              document.getElementById('ranking-top-week')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'top_week' ? '#ea580c' : '#fff7ed',
              color: activeTab === 'top_week' ? '#ffffff' : '#c2410c',
              fontWeight: 800,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Flame size={14} />
            <span>1. Top produits de la semaine</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('best_sellers');
              document.getElementById('ranking-best-sellers')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'best_sellers' ? '#0b5738' : '#ecfdf5',
              color: activeTab === 'best_sellers' ? '#ffffff' : '#047857',
              fontWeight: 800,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Award size={14} />
            <span>2. Les plus vendus</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('rising');
              document.getElementById('ranking-rising')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'rising' ? '#0284c7' : '#f0f9ff',
              color: activeTab === 'rising' ? '#ffffff' : '#0369a1',
              fontWeight: 800,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={14} />
            <span>3. Les nouveautés qui montent</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('local');
              document.getElementById('ranking-local')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'local' ? '#7c3aed' : '#f5f3ff',
              color: activeTab === 'local' ? '#ffffff' : '#6d28d9',
              fontWeight: 800,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <MapPin size={14} />
            <span>4. Populaires près de chez vous</span>
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: '28px' }}>

        {/* =========================================================================
            SECTION 1: "Top produits de la semaine" (Ranked #1, #2, #3, ...)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'top_week') && (
          <section id="ranking-top-week" style={{ marginBottom: '52px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #fed7aa'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    backgroundColor: '#ffedd5',
                    padding: '6px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Flame size={20} color="#ea580c" />
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
                    fontWeight: 900,
                    margin: 0,
                    color: 'var(--text-main)'
                  }}>
                    1. Top produits de la semaine
                  </h2>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  Classement officiel basé sur les commandes enregistrées au Cameroun ces 7 derniers jours.
                </p>
              </div>

              <div style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                color: '#b45309',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 800
              }}>
                🏆 MIS À JOUR CHAQUE LUNDI
              </div>
            </div>

            {/* Product Grid with Top Rank Badges */}
            <div className="product-grid">
              {topWeekProducts.map((product) => renderTrendingCard(product, {
                rankNumber: product.rank,
                weeklySales: product.weeklySales,
                viewsCount: product.viewsToday,
                badgeType: product.rank === 1 ? 'tendance' : product.rank === 2 ? 'bestseller' : 'populaire'
              }))}
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 2: "Les plus vendus" (Best-sellers champions)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'best_sellers') && (
          <section id="ranking-best-sellers" style={{ marginBottom: '52px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #a7f3d0'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    backgroundColor: '#d1fae5',
                    padding: '6px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Award size={20} color="#059669" />
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
                    fontWeight: 900,
                    margin: 0,
                    color: 'var(--color-primary-dark)'
                  }}>
                    2. Les plus vendus
                  </h2>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  Nos valeurs sûres : les articles les plus commandés et les mieux notés par notre communauté.
                </p>
              </div>

              <div style={{
                backgroundColor: '#ecfdf5',
                color: '#047857',
                border: '1px solid #a7f3d0',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 800
              }}>
                VALEURS SÛRES VÉRIFIÉES
              </div>
            </div>

            <div className="product-grid">
              {bestSellersProducts.map((product) => renderTrendingCard(product, {
                badgeType: 'bestseller'
              }))}
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 3: "Les nouveautés qui montent" (Rising Stars / Viral Hits)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'rising') && (
          <section id="ranking-rising" style={{ marginBottom: '52px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #bae6fd'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    backgroundColor: '#e0f2fe',
                    padding: '6px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Sparkles size={20} color="#0284c7" />
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
                    fontWeight: 900,
                    margin: 0,
                    color: '#0369a1'
                  }}>
                    3. Les nouveautés qui montent
                  </h2>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  Arrivages récents qui créent le buzz sur TikTok, WhatsApp et auprès des premiers acheteurs.
                </p>
              </div>

              <div style={{
                backgroundColor: '#f0f9ff',
                color: '#0284c7',
                border: '1px solid #bae6fd',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 800
              }}>
                🚀 CROISSANCE RAPIDE
              </div>
            </div>

            <div className="product-grid">
              {risingProducts.map((product) => renderTrendingCard(product, {
                badgeType: 'nouveau'
              }))}
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 4: "Produits populaires près de chez vous" (City Filtering)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'local') && (
          <section id="ranking-local" style={{ marginBottom: '52px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '2px solid #ddd6fe'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    backgroundColor: '#ede9fe',
                    padding: '6px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin size={20} color="#7c3aed" />
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
                    fontWeight: 900,
                    margin: 0,
                    color: '#5b21b6'
                  }}>
                    4. Produits populaires près de chez vous
                  </h2>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  Filtrez les tendances d'achat par grande ville et région du Cameroun.
                </p>
              </div>
            </div>

            {/* City Selector Pills */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflowX: 'auto',
              marginBottom: '20px',
              paddingBottom: '4px',
              scrollbarWidth: 'none'
            }}>
              {[
                { id: 'all', label: 'Toutes les villes 🇨🇲' },
                { id: 'douala', label: '📍 Douala (Littoral)' },
                { id: 'yaounde', label: '📍 Yaoundé (Centre)' },
                { id: 'bafoussam', label: '📍 Bafoussam (Ouest)' },
                { id: 'garoua', label: '📍 Garoua (Nord)' },
                { id: 'kribi', label: '📍 Kribi (Sud)' }
              ].map(city => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city.id as any)}
                  style={{
                    backgroundColor: selectedCity === city.id ? '#7c3aed' : '#ffffff',
                    color: selectedCity === city.id ? '#ffffff' : '#475569',
                    border: selectedCity === city.id ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedCity === city.id ? '0 2px 8px rgba(124, 58, 237, 0.25)' : 'none'
                  }}
                >
                  {city.label}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {cityFilteredProducts.map((product) => renderTrendingCard(product, {
                badgeType: 'populaire',
                cityTag: selectedCity === 'douala' ? 'Douala' : selectedCity === 'yaounde' ? 'Yaoundé' : selectedCity === 'bafoussam' ? 'Bafoussam' : selectedCity === 'garoua' ? 'Garoua' : selectedCity === 'kribi' ? 'Kribi' : 'Cameroun'
              }))}
            </div>
          </section>
        )}

        {/* =========================================================================
            5. SOCIAL COMMERCE VIRALITY CALLOUT
            ========================================================================= */}
        <section style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid #fed7aa',
          padding: '28px',
          boxShadow: '0 6px 22px rgba(245, 158, 11, 0.1)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ffedd5',
              color: '#c2410c',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 800,
              marginBottom: '10px'
            }}>
              <Flame size={14} color="#ea580c" />
              VOUS CHERCHEZ UN ARTICLE VU SUR TIKTOK OU LES RÉSEAUX ?
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-main)' }}>
              Vous avez repéré un produit viral non listé ?
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Envoyez-nous la photo ou la vidéo sur WhatsApp. Notre équipe de sourcing en Chine et au Cameroun vous le trouve en moins de 24 heures au meilleur prix !
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifySelf: 'end', width: '100%', maxWidth: '300px' }}>
            <a
              href="https://wa.me/237699000000?text=Bonjour%20IFPTIE%20Market,%20j'ai%20vu%20un%20produit%20sur%20les%20r%C3%A9seaux%20sociaux%20que%20je%20recherche"
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{
                width: '100%',
                padding: '12px 18px',
                fontWeight: 800,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <MessageCircle size={18} />
              <span>Demander un sourcing WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setActiveView('promotions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-outline"
              style={{
                width: '100%',
                padding: '10px 18px',
                fontWeight: 700,
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <span>Voir aussi les promotions 🔥</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
