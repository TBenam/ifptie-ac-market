import React from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  CheckCircle, 
  ArrowRight, 
  ShoppingBag, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { 
    orders, 
    activeTrackingNumber, 
    setActiveTrackingNumber, 
    setActiveView 
  } = useStore();

  // Retrieve the latest order if available, or fallback to the exact requested example:
  // Commande #IFM-10482, Total: 24 500 FCFA, Paiement: Paiement à la livraison, Livraison: Yaoundé
  const latestOrder = orders.find(o => o.trackingNumber === activeTrackingNumber) || orders[0];

  const orderNumber = latestOrder ? latestOrder.trackingNumber : 'IFM-10482';
  const orderTotal = latestOrder ? latestOrder.total : 24500;
  const paymentMethodText = latestOrder 
    ? (latestOrder.paymentMethod === 'cash_on_delivery' ? 'Paiement à la livraison' : 'Mobile Money')
    : 'Paiement à la livraison';
  const deliveryCity = latestOrder ? latestOrder.city : 'Yaoundé';
  const deliveryNeighborhood = latestOrder?.neighborhood || 'Bastos';

  const handleTrackOrder = () => {
    setActiveTrackingNumber(orderNumber);
    setActiveView('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueShopping = () => {
    setActiveView('storefront');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppSupport = () => {
    const message = encodeURIComponent(
      `Bonjour IFPTIE Market, je viens de passer la commande #${orderNumber} (${formatFCFA(orderTotal)}) à destination de ${deliveryCity}. Pouvez-vous me confirmer la prise en charge ?`
    );
    window.open(`https://wa.me/237699000000?text=${message}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#fcfbf7', minHeight: '90vh', padding: '36px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
        
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginBottom: '24px'
        }}>
          <span onClick={() => setActiveView('storefront')} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>
            Accueil
          </span>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>Confirmation de commande</span>
        </div>

        {/* Main Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1.5px solid var(--border-subtle)',
          padding: 'clamp(24px, 5vw, 44px)',
          boxShadow: '0 8px 30px rgba(11, 87, 56, 0.08)',
          textAlign: 'center'
        }}>
          {/* =========================================================================
              1. LARGE SUCCESS ILLUSTRATION / ICON
              ========================================================================= */}
          <div style={{
            position: 'relative',
            width: '100px',
            height: '100px',
            margin: '0 auto 24px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Pulsing ring */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              transform: 'scale(1.25)'
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              transform: 'scale(1.1)'
            }} />
            {/* Core Icon */}
            <div style={{
              position: 'relative',
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981 0%, #0b5738 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(11, 87, 56, 0.3)'
            }}>
              <CheckCircle2 size={46} strokeWidth={2.4} color="#ffffff" />
            </div>
          </div>

          {/* Exact Headline Requested */}
          <h1 style={{
            fontFamily: 'var(--font-family-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.35rem)',
            fontWeight: 900,
            color: 'var(--color-primary-dark)',
            margin: '0 0 12px 0',
            letterSpacing: '-0.5px'
          }}>
            Commande confirmée ! 🎉
          </h1>

          {/* Exact Message Requested */}
          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            lineHeight: 1.55,
            color: '#475569',
            maxWidth: '560px',
            margin: '0 auto 28px auto'
          }}>
            Merci pour votre commande. Notre équipe va vous contacter pour confirmer les détails de la livraison.
          </p>

          {/* =========================================================================
              2. ORDER SUMMARY DETAILS BLOCK
              Show:
              Commande #IFM-10482
              Total: 24 500 FCFA
              Paiement: Paiement à la livraison
              Livraison: Yaoundé
              ========================================================================= */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1.5px solid #e2e8f0',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '16px',
              paddingBottom: '14px',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                Détails de la commande enregistrée :
              </span>
              <span style={{
                backgroundColor: 'var(--color-yellow)',
                color: '#78350f',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '999px'
              }}>
                🇨🇲 Cameroun Express
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px'
            }}>
              {/* Commande # */}
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '2px', fontWeight: 700 }}>
                  Numéro de Commande
                </span>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '1.15rem',
                  fontWeight: 900,
                  color: 'var(--color-primary-dark)'
                }}>
                  #{orderNumber}
                </span>
              </div>

              {/* Total */}
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '2px', fontWeight: 700 }}>
                  Total à payer
                </span>
                <span style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#b45309'
                }}>
                  {formatFCFA(orderTotal)}
                </span>
              </div>

              {/* Paiement */}
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '2px', fontWeight: 700 }}>
                  Mode de paiement
                </span>
                <span style={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: '#15803d',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <ShieldCheck size={16} />
                  {paymentMethodText}
                </span>
              </div>

              {/* Livraison */}
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '2px', fontWeight: 700 }}>
                  Ville de livraison
                </span>
                <span style={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <MapPin size={16} color="var(--color-primary)" />
                  {deliveryCity} ({deliveryNeighborhood})
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              3. SIMPLE ORDER PROGRESS
              Commande reçue → Confirmée → En livraison → Livrée
              ========================================================================= */}
          <div style={{
            marginBottom: '36px',
            padding: '20px 16px',
            backgroundColor: '#ffffff',
            border: '1px solid #fed7aa',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 2px 10px rgba(245, 158, 11, 0.08)'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#92400e', marginBottom: '18px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} color="#d97706" />
              <span>STATUT DE VOTRE COMMANDE EN TEMPS RÉEL :</span>
            </div>

            {/* Progress Stepper requested: Commande reçue → Confirmée → En livraison → Livrée */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px',
              position: 'relative'
            }}>
              {/* Step 1: Commande reçue (Done) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                }}>
                  <CheckCircle size={18} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                  Commande reçue
                </span>
                <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
                  ✓ Reçue
                </span>
              </div>

              {/* Step 2: Confirmée (Active / In progress) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-yellow)',
                  color: '#78350f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  boxShadow: '0 0 12px rgba(245, 158, 11, 0.5)'
                }}>
                  <CheckCircle2 size={18} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#92400e', lineHeight: 1.2 }}>
                  Confirmée
                </span>
                <span style={{ fontSize: '0.65rem', color: '#b45309', fontWeight: 800, marginTop: '2px' }}>
                  Étape en cours
                </span>
              </div>

              {/* Step 3: En livraison (Upcoming) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', opacity: 0.55 }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#e2e8f0',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}>
                  <Truck size={18} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', lineHeight: 1.2 }}>
                  En livraison
                </span>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '2px' }}>
                  Sous 24h
                </span>
              </div>

              {/* Step 4: Livrée (Upcoming) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', opacity: 0.55 }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#e2e8f0',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}>
                  <Package size={18} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', lineHeight: 1.2 }}>
                  Livrée
                </span>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '2px' }}>
                  Paiement
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              4. ACTION BUTTONS: CTA "Suivre ma commande" & SECONDARY "Continuer mes achats"
              ========================================================================= */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '28px'
          }}>
            {/* Primary CTA exact: "Suivre ma commande" */}
            <button
              onClick={handleTrackOrder}
              className="btn btn-yellow btn-lg"
              style={{
                width: '100%',
                padding: '16px 24px',
                fontSize: '1.05rem',
                fontWeight: 900,
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Truck size={20} />
              <span>Suivre ma commande</span>
              <ArrowRight size={18} />
            </button>

            {/* Secondary CTA exact: "Continuer mes achats" */}
            <button
              onClick={handleContinueShopping}
              style={{
                width: '100%',
                padding: '13px 20px',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                backgroundColor: 'var(--color-primary-subtle)',
                border: '1.5px solid var(--color-primary)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <ShoppingBag size={17} />
              <span>Continuer mes achats</span>
            </button>
          </div>

          {/* =========================================================================
              5. WHATSAPP SUPPORT CTA
              ========================================================================= */}
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1.5px solid #bbf7d0',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#25d366',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <MessageCircle size={22} fill="#ffffff" />
              </div>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#166534', display: 'block' }}>
                  Une question sur votre livraison ?
                </strong>
                <span style={{ fontSize: '0.78rem', color: '#15803d' }}>
                  Notre service client WhatsApp est disponible 7j/7 pour vous assister.
                </span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppSupport}
              className="btn btn-whatsapp btn-sm"
              style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}
            >
              <MessageCircle size={15} />
              <span>Assistance WhatsApp</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
