import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  MapPin, 
  MessageCircle, 
  Clock, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Phone, 
  Mail,
  HelpCircle,
  FileText
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <footer style={{
      backgroundColor: '#073b26',
      color: '#ffffff',
      padding: '54px 0 28px',
      marginTop: 'auto',
      borderTop: '4px solid var(--color-yellow)'
    }}>
      <div className="container">
        {/* Main Footer 4 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          marginBottom: '40px'
        }}>
          {/* 1. Brand & Customer Service */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img 
                src="/logo.jpg" 
                alt="IFPTIE Market" 
                style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#fff', padding: '2px' }} 
              />
              <span style={{ fontFamily: 'var(--font-family-heading)', fontSize: '1.45rem', fontWeight: 800 }}>
                IFPTIE <span style={{ color: 'var(--color-yellow)' }}>MARKET</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#a7f3d0', lineHeight: 1.6, marginBottom: '20px' }}>
              Le grand marché en ligne au Cameroun. Énergie solaire, maison, outillage, auto et nouveautés import direct usine.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fef3c7' }}>
                <Clock size={16} color="var(--color-yellow)" />
                <span>Service client 7j / 7 (07h30 - 21h00)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#86efac' }}>
                <MessageCircle size={16} />
                <a href="https://wa.me/237699000000" style={{ fontWeight: 700, color: '#86efac' }}>
                  WhatsApp : +237 699 00 00 00
                </a>
              </div>
            </div>
          </div>

          {/* 2. Engagements & Garanties (Catégories déplacées vers le menu latéral gauche) */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--color-yellow)" />
              <span>Nos Engagements & SAV</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>✅ Produits 100% Vérifiés</strong>
                Chaque article est contrôlé et testé avant son emballage et sa remise au coursier.
              </div>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>🔄 Droit de retour sous 48h</strong>
                Échange ou remplacement sans tracasserie en cas de défaut ou de non-conformité.
              </div>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>🤝 Paiement à la réception</strong>
                Inspectez physiquement votre colis avant tout paiement en cash ou Mobile Money.
              </div>
            </div>
          </div>

          {/* 3. Delivery Information & Hubs */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={18} color="var(--color-yellow)" />
              <span>Livraison & Hubs</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={16} color="var(--color-yellow)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong style={{ color: '#fff' }}>Douala (24h) :</strong> Hub central Akwa & Bonamoussadi. Remise en main propre par coursier.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={16} color="var(--color-yellow)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong style={{ color: '#fff' }}>Yaoundé (24h) :</strong> Hub Bastos & Centre-ville.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Truck size={16} color="var(--color-yellow)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong style={{ color: '#fff' }}>Régions (48h) :</strong> Bafoussam, Kribi, Garoua, Bamenda, Maroua via agences de voyage partenaires sécurisées.
                </div>
              </div>
            </div>
          </div>

          {/* 4. Payment Methods & Socials */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={18} color="var(--color-yellow)" />
              <span>Moyens de Paiement</span>
            </h4>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              <span style={{ backgroundColor: '#ffffff', color: '#ff7900', padding: '6px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                Orange Money (#150#)
              </span>
              <span style={{ backgroundColor: '#ffffff', color: '#854d0e', padding: '6px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                MTN MoMo (*126#)
              </span>
              <span style={{ backgroundColor: '#ffffff', color: '#0b5738', padding: '6px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                Cash à la livraison
              </span>
            </div>

            {/* Social Links */}
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
              Suivez-nous :
            </h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 800
                }}
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 800
                }}
                title="Instagram"
              >
                ig
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 800
                }}
                title="TikTok"
              >
                tk
              </a>
              <a
                href="https://wa.me/237699000000"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-whatsapp)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
                title="WhatsApp Direct"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links & Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.8rem',
          color: '#94a3b8'
        }}>
          <div>
            © 2026 IFPTIE Market Cameroun. Tous droits réservés.
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#legal" style={{ color: '#cbd5e1' }}>Conditions Générales de Vente (CGV)</a>
            <a href="#privacy" style={{ color: '#cbd5e1' }}>Politique de Confidentialité</a>
            <a href="#mentions" style={{ color: '#cbd5e1' }}>Mentions Légales</a>
            <a href="#shipping" style={{ color: '#cbd5e1' }}>Politique de Retour & SAV</a>
            <button 
              onClick={() => {
                setActiveView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '4px',
                padding: '2px 8px',
                color: 'var(--color-yellow)',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.78rem'
              }}
            >
              🔐 Espace Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
