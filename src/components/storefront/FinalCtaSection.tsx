import React from 'react';
import { useStore } from '../../store/useStore';
import { ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useStore();

  const handleSeeAll = () => {
    setSelectedCategory('all');
    setActiveView('storefront');
    const el = document.getElementById('catalog-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{
      marginBottom: '64px',
      background: 'linear-gradient(135deg, #073b26 0%, #0b5738 60%, #12724b 100%)',
      borderRadius: 'var(--radius-xl)',
      padding: '54px 36px',
      color: '#ffffff',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 16px 36px -8px rgba(11, 87, 56, 0.28)'
    }}>
      {/* Decorative radial circles */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '14px',
          letterSpacing: '-0.4px',
          lineHeight: 1.2
        }}>
          Une envie ? Trouvez-la sur <span style={{ color: 'var(--color-yellow)' }}>IFPTIE Market.</span>
        </h2>

        <p style={{
          fontSize: '1.05rem',
          color: '#d1fae5',
          lineHeight: 1.55,
          marginBottom: '32px'
        }}>
          Plus de 300 références en stock immédiat au Cameroun. Énergie solaire, électroménager, tech et bien-être avec paiement à la livraison.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {/* Button: "Voir tous les produits" */}
          <button
            onClick={handleSeeAll}
            className="btn btn-yellow btn-lg"
            style={{
              borderRadius: 'var(--radius-sm)',
              padding: '14px 32px',
              fontSize: '1.05rem',
              fontWeight: 800,
              boxShadow: '0 6px 18px rgba(245, 158, 11, 0.35)'
            }}
          >
            <ShoppingBag size={20} />
            Voir tous les produits
            <ArrowRight size={20} />
          </button>

          {/* Secondary WhatsApp direct advice button */}
          <a
            href="https://wa.me/237699000000?text=Bonjour%20IFPTIE%20Market,%20je%20recherche%20un%20produit%20particulier"
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp btn-lg"
            style={{
              borderRadius: 'var(--radius-sm)',
              padding: '14px 26px',
              fontSize: '1.02rem',
              fontWeight: 700
            }}
          >
            <MessageCircle size={20} />
            Demander par WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
