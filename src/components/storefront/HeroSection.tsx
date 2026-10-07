import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { 
  ArrowRight, 
  Flame, 
  Truck, 
  Smartphone, 
  CheckCircle, 
  Banknote,
  Zap,
  ChevronLeft,
  ChevronRight,
  Sun,
  Utensils,
  Sparkles,
  Heart
} from 'lucide-react';

interface SlideData {
  id: string;
  category: string;
  eyebrow: string;
  title: string;
  highlightText: string;
  description: string;
  badge: string;
  priceTag: string;
  ctaText: string;
  bgGradient: string;
  accentColor: string;
  imageUrl: string;
  imageAlt: string;
  productTitle: string;
  productBadge: string;
  productPrice: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 'solar-banner',
    category: 'solar',
    eyebrow: 'ARRIVAGE DIRECT • SPÉCIAL ANTI-DÉLESTAGE 🇨🇲',
    title: 'Zéro Coupure d\'Énergie.',
    highlightText: 'Kits Solaires Prêts à l\'Emploi.',
    description: 'Ne subissez plus les délestages à Douala, Yaoundé ou en région. Alimentez téléviseur, éclairage, ventilateurs et rechargez vos téléphones sans bruit.',
    badge: 'JUSQU\'À -35%',
    priceTag: 'Dès 48 500 FCFA',
    ctaText: 'Découvrir les Kits Solaires',
    bgGradient: 'linear-gradient(130deg, #073b26 0%, #0c5637 55%, #13774d 100%)',
    accentColor: 'var(--color-yellow)',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=900&auto=format&fit=crop&q=80',
    imageAlt: 'Kit Solaire Hybride Cameroun',
    productTitle: 'Kit Solaire Hybride 500W + Batterie',
    productBadge: '⚡ Flash Deal',
    productPrice: '48 500 FCFA'
  },
  {
    id: 'kitchen-banner',
    category: 'home-kitchen',
    eyebrow: 'QUALITÉ INOX • ARRIVAGE DIRECT USINE',
    title: 'Cuisinez Vite & Bien.',
    highlightText: 'Électroménager Express & Malin.',
    description: 'Robots hachoirs multifonctions 3L inox, Air Fryers sans huile et blenders broyeurs haute puissance. Préparez vos plats préférés en quelques secondes.',
    badge: 'TOP VENTES 2026',
    priceTag: 'Dès 19 500 FCFA',
    ctaText: 'Équiper ma Cuisine',
    bgGradient: 'linear-gradient(130deg, #6c230d 0%, #902e11 50%, #b83d16 100%)',
    accentColor: '#fcd34d',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=900&auto=format&fit=crop&q=80',
    imageAlt: 'Robot Cuiseur et Électroménager',
    productTitle: 'Robot Cuiseur Hachoir Inox 3L Pro',
    productBadge: 'Top Arrivage',
    productPrice: '19 500 FCFA'
  },
  {
    id: 'tech-banner',
    category: 'tech',
    eyebrow: 'VENTE FLASH 24H • STOCK TRÈS LIMITÉ',
    title: 'Restez Connecté Partout.',
    highlightText: 'Power Banks 30 000 mAh & High-Tech.',
    description: 'Batteries externes ultra-robustes 22.5W avec lampe torche intégrée, écouteurs sans fil réduction de bruit et accessoires indispensables au Cameroun.',
    badge: '-40% AUJOURD\'HUI',
    priceTag: 'Dès 18 500 FCFA',
    ctaText: 'Profiter de la Vente Flash',
    bgGradient: 'linear-gradient(130deg, #111e47 0%, #1e3a8a 55%, #0284c7 100%)',
    accentColor: '#38bdf8',
    imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=900&auto=format&fit=crop&q=80',
    imageAlt: 'Power Bank Haute Capacité',
    productTitle: 'Power Bank 30 000 mAh Fast Charge 22.5W',
    productBadge: '🔥 Vente Flash',
    productPrice: '18 500 FCFA'
  },
  {
    id: 'beauty-banner',
    category: 'beauty',
    eyebrow: '100% NATUREL • MADE IN CAMEROON 🇨🇲',
    title: 'L\'Excellence du Terroir.',
    highlightText: 'Pur Beurre de Karité Bio de Kribi.',
    description: 'Soin nourrissant ancestral pour la peau et les cheveux crépus ou frisés. Pressé à froid, 100% pur, sans additifs chimiques ni conservateurs.',
    badge: '🇨🇲 TERROIR BIO',
    priceTag: 'Dès 4 500 FCFA',
    ctaText: 'Commander mes Soins Bio',
    bgGradient: 'linear-gradient(130deg, #164e28 0%, #1b6334 50%, #78480b 100%)',
    accentColor: '#fef08a',
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-25f0a82b8813?w=900&auto=format&fit=crop&q=80',
    imageAlt: 'Beurre de Karité Bio de Kribi',
    productTitle: 'Beurre de Karité Pur Bio Kribi 250g',
    productBadge: '🇨🇲 Local Certifié',
    productPrice: '4 500 FCFA'
  }
];

export const HeroSection: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-play interval like SHEIN
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleSlideClick = (slide: SlideData) => {
    setSelectedCategory(slide.category);
    setActiveView('storefront');
    setTimeout(() => {
      const el = document.getElementById('catalog-section') || document.getElementById('categories-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section 
      style={{ marginBottom: '32px' }}
      aria-label="Bannières promotionnelles"
    >
      {/* =========================================================================
          1. SHEIN-STYLE AUTO-SLIDING HERO BANNER CAROUSEL
          ========================================================================= */}
      <div 
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 10px 28px -6px rgba(0, 0, 0, 0.22)',
          userSelect: 'none'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* SLIDES WRAPPER */}
        <div 
          style={{
            display: 'flex',
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
            width: '100%'
          }}
        >
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                minWidth: '100%',
                background: slide.bgGradient,
                color: '#ffffff',
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 1.35fr) minmax(240px, 1fr)',
                alignItems: 'center',
                gap: '24px',
                padding: 'clamp(24px, 4.5vw, 44px) clamp(20px, 4vw, 48px)',
                minHeight: 'clamp(340px, 40vw, 420px)'
              }}
              className="hero-slide-grid"
            >
              {/* Background ambient lighting accent */}
              <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '450px',
                height: '450px',
                background: `radial-gradient(circle, rgba(255, 255, 255, 0.14) 0%, transparent 65%)`,
                borderRadius: '50%',
                pointerEvents: 'none'
              }} />

              {/* LEFT TEXT CONTENT */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                {/* Eyebrow badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  border: '1.5px solid rgba(255, 255, 255, 0.35)',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: slide.accentColor,
                  marginBottom: '16px',
                  letterSpacing: '0.4px',
                  backdropFilter: 'blur(4px)'
                }}>
                  <Flame size={15} />
                  <span>{slide.eyebrow}</span>
                </div>

                {/* Main Headline */}
                <h1 style={{
                  fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: '#ffffff',
                  marginBottom: '12px',
                  letterSpacing: '-0.5px'
                }}>
                  {slide.title} <br />
                  <span style={{ color: slide.accentColor }}>{slide.highlightText}</span>
                </h1>

                {/* Subtitle / Description */}
                <p style={{
                  fontSize: 'clamp(0.875rem, 1.2vw, 1.02rem)',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.92)',
                  marginBottom: '24px',
                  maxWidth: '520px'
                }}>
                  {slide.description}
                </p>

                {/* CTA Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleSlideClick(slide)}
                    className="btn btn-yellow btn-md"
                    style={{
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 24px',
                      fontSize: '0.98rem',
                      fontWeight: 800,
                      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Zap size={18} />
                    <span>{slide.ctaText}</span>
                    <ArrowRight size={18} />
                  </button>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#ffffff'
                  }}>
                    <span>{slide.priceTag}</span>
                    <span style={{ 
                      backgroundColor: slide.accentColor, 
                      color: '#0f172a', 
                      fontSize: '0.68rem', 
                      fontWeight: 900,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {slide.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT COMMERCIAL SHOWCASE CARD */}
              <div 
                onClick={() => handleSlideClick(slide)}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.28)',
                  maxWidth: '320px',
                  width: '100%',
                  color: 'var(--text-main)',
                  transition: 'transform 0.25s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <div style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    height: '180px',
                    backgroundColor: '#f1f5f9'
                  }}>
                    <img
                      src={slide.imageUrl}
                      alt={slide.imageAlt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      loading="eager"
                    />
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      backgroundColor: 'var(--color-yellow)',
                      color: '#0f172a',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                    }}>
                      {slide.productBadge}
                    </div>

                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '3px 7px',
                      borderRadius: '4px',
                      backdropFilter: 'blur(3px)'
                    }}>
                      🇨🇲 Expédition 24h
                    </div>
                  </div>

                  <div style={{ padding: '10px 4px 2px' }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      lineHeight: 1.25,
                      color: 'var(--text-main)',
                      marginBottom: '6px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {slide.productTitle}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontSize: '1.05rem',
                        fontWeight: 800,
                        color: 'var(--color-primary-dark)'
                      }}>
                        {slide.productPrice}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        Voir l'offre &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PREVIOUS SLIDE ARROW BUTTON */}
        <button
          onClick={handlePrev}
          aria-label="Image précédente"
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            color: '#ffffff',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            backdropFilter: 'blur(4px)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* NEXT SLIDE ARROW BUTTON */}
        <button
          onClick={handleNext}
          aria-label="Image suivante"
          style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            color: '#ffffff',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            backdropFilter: 'blur(4px)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* SHEIN-STYLE BOTTOM PAGINATION PILLS */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          padding: '6px 14px',
          borderRadius: '999px',
          backdropFilter: 'blur(4px)'
        }}>
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Aller à la diapositive ${idx + 1}`}
              style={{
                width: currentSlide === idx ? '32px' : '9px',
                height: '9px',
                borderRadius: '999px',
                backgroundColor: currentSlide === idx ? 'var(--color-yellow)' : 'rgba(255, 255, 255, 0.55)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                padding: 0
              }}
            />
          ))}
        </div>

        {/* SLIDE COUNTER BADGE */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '18px',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          color: '#ffffff',
          fontSize: '0.75rem',
          fontWeight: 800,
          padding: '4px 10px',
          borderRadius: '999px',
          zIndex: 10,
          letterSpacing: '0.6px',
          backdropFilter: 'blur(4px)'
        }}>
          0{currentSlide + 1} / 0{HERO_SLIDES.length}
        </div>
      </div>

      {/* =========================================================================
          2. TRUST REASSURANCE PILLS (Cameroun Service & Quality)
          ========================================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px',
        marginTop: '18px'
      }}>
        {/* Trust 1: Cash on Delivery */}
        <div 
          className="reassurance-pill"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            border: '1px solid #a7f3d0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 4px 12px rgba(11,87,56,0.06)'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#ecfdf5',
            color: '#065f46',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Banknote size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                Paiement à la livraison
              </span>
              <span className="badge-cod" style={{ fontSize: '0.625rem', padding: '1px 5px', borderRadius: '4px' }}>
                CASH
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Inspectez votre colis avant de payer
            </div>
          </div>
        </div>

        {/* Trust 2: Mobile Money */}
        <div 
          className="reassurance-pill"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-primary-subtle)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Smartphone size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-main)' }}>
              Mobile Money
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Orange Money (#150#) & MTN MoMo (*126#)
            </div>
          </div>
        </div>

        {/* Trust 3: Livraison express Cameroun */}
        <div 
          className="reassurance-pill"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#e0f2fe',
            color: '#0369a1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Truck size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-main)' }}>
              Livraison 24h & Régions
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Douala & Yaoundé en 24h • 48h toutes agences
            </div>
          </div>
        </div>

        {/* Trust 4: Produits sélectionnés */}
        <div 
          className="reassurance-pill"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#ede9fe',
            color: '#7c3aed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-main)' }}>
              Garantie & Contrôle
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Produits testés & SAV réactif WhatsApp
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
