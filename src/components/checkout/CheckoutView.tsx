import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import { MOCK_PRODUCTS } from '../../mock/data';
import type { PaymentMethod, Order } from '../../types';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Truck, 
  Phone, 
  MapPin, 
  User, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  MessageCircle, 
  CheckCircle2, 
  ArrowLeft,
  Lock,
  ChevronRight,
  Package,
  Zap,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    getCartSubtotal, 
    createOrder, 
    clearCart,
    setActiveView, 
    setActiveTrackingNumber,
    addToast,
    addToCart
  } = useStore();

  // If cart is empty, allow one-click demo product loading
  const subtotal = getCartSubtotal();

  // Dynamic delivery calculation by Cameroon city
  const [city, setCity] = useState<string>('Douala');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [addressNote, setAddressNote] = useState<string>('');
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>('');

  // Customer info state
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [isWhatsappSame, setIsWhatsappSame] = useState<boolean>(true);
  const [whatsappPhone, setWhatsappPhone] = useState<string>('');

  // Payment state
  const [paymentOption, setPaymentOption] = useState<'cod' | 'momo'>('cod');
  const [momoProvider, setMomoProvider] = useState<'mtn' | 'orange'>('mtn');
  const [momoPhone, setMomoPhone] = useState<string>('');

  // Dynamic delivery fee calculation
  const deliveryFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (city === 'Douala' || city === 'Yaoundé') {
      return subtotal >= 25000 ? 0 : 1500;
    }
    if (city === 'Bafoussam' || city === 'Kribi' || city === 'Limbe') {
      return 2500;
    }
    if (city === 'Garoua' || city === 'Maroua' || city === 'Ngaoundéré') {
      return 3500;
    }
    return 3000; // Autre ville
  }, [city, subtotal]);

  // Total discounts calculation
  const totalOriginalPrice = cart.reduce((acc, item) => {
    const orig = item.product.originalPrice || item.product.price;
    return acc + (orig * item.quantity);
  }, 0);

  const discount = Math.max(0, totalOriginalPrice - subtotal);
  const finalTotal = subtotal + deliveryFee;

  // Order submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      addToast('Votre panier est vide. Veuillez ajouter un article.', 'warning');
      return;
    }

    if (!customerName.trim()) {
      alert('Veuillez entrer votre prénom et nom.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 8) {
      alert('Veuillez entrer un numéro de téléphone valide au Cameroun.');
      return;
    }

    if (!neighborhood.trim()) {
      alert('Veuillez préciser votre quartier de livraison.');
      return;
    }

    if (paymentOption === 'momo' && !momoPhone.trim() && !customerPhone.trim()) {
      alert('Veuillez renseigner votre numéro Mobile Money.');
      return;
    }

    setIsSubmitting(true);

    const trackingNumber = `IFP-CMR-${Math.floor(1000 + Math.random() * 9000)}`;
    const chosenPaymentMethod: PaymentMethod = paymentOption === 'cod' 
      ? 'cash_on_delivery' 
      : momoProvider === 'orange' ? 'orange_money' : 'mtn_momo';

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      trackingNumber,
      customerName,
      customerPhone: customerPhone.startsWith('+237') ? customerPhone : `+237 ${customerPhone}`,
      whatsappPhone: isWhatsappSame ? customerPhone : whatsappPhone,
      city,
      neighborhood,
      addressNote,
      deliveryInstructions,
      items: cart.map(i => ({
        productId: i.product.id,
        productName: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.images[0]
      })),
      subtotal,
      deliveryFee,
      discount,
      total: finalTotal,
      paymentMethod: chosenPaymentMethod,
      momoProvider: paymentOption === 'momo' ? momoProvider : undefined,
      momoPhone: paymentOption === 'momo' ? (momoPhone || customerPhone) : undefined,
      paymentStatus: paymentOption === 'cod' ? 'pay_on_delivery' : 'pending',
      orderStatus: 'confirmed',
      createdAt: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      estimatedDeliveryDate: city === 'Douala' || city === 'Yaoundé' ? 'Demain par coursier dédié (24h)' : 'Sous 48h par agence sécurisée',
      isDiscreetPackaging: cart.some(i => i.product.isDiscreetPackaging)
    };

    // Save in store
    createOrder(newOrder);
    setActiveTrackingNumber(trackingNumber);
    clearCart();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 110,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti effect', err);
    }

    addToast(`🎉 Commande confirmée avec succès ! N° ${trackingNumber}`, 'success');

    // Route directly to order confirmation page
    setTimeout(() => {
      setActiveView('order-confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  // Helper to add demo item if cart is empty
  const handleAddDemoItem = () => {
    const demo = MOCK_PRODUCTS.find(p => p.id === 'prod-solar-03') || MOCK_PRODUCTS[0];
    addToCart(demo, 1);
    addToast('Lampe Solaire 100W ajoutée pour tester la commande !', 'success');
  };

  return (
    <div style={{ backgroundColor: '#fcfbf7', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* 1. TOP BREADCRUMB & SECURITY BANNER */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '12px 0',
        fontSize: '0.8rem'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
            <span onClick={() => setActiveView('storefront')} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>
              Accueil
            </span>
            <ChevronRight size={13} />
            <span onClick={() => setActiveView('cart')} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>
              Panier
            </span>
            <ChevronRight size={13} />
            <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>Finaliser la commande</span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#15803d',
            fontWeight: 700,
            fontSize: '0.78rem'
          }}>
            <ShieldCheck size={16} color="#16a34a" />
            <span>Commande express 100% sécurisée • Aucun compte requis</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '28px' }}>
        {/* Exact Title Requested */}
        <div style={{ marginBottom: '24px', borderBottom: '2px solid #fed7aa', paddingBottom: '14px' }}>
          <h1 style={{
            fontFamily: 'var(--font-family-heading)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
            fontWeight: 900,
            color: 'var(--text-main)',
            margin: '0 0 4px 0'
          }}>
            Finalisez votre commande
          </h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
            Remplissez simplement vos coordonnées de livraison ci-dessous. <strong>Aucune création de compte requise.</strong>
          </p>
        </div>

        {/* Empty Cart Notice & Quick Demo Loader */}
        {cart.length === 0 && (
          <div style={{
            backgroundColor: '#fffbeb',
            border: '1.5px solid #fde68a',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Info size={22} color="#b45309" />
              <div>
                <strong style={{ color: '#92400e', display: 'block', fontSize: '0.9rem' }}>
                  Votre panier est actuellement vide
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#78350f' }}>
                  Ajoutez un article pour tester le processus de finalisation de commande.
                </span>
              </div>
            </div>
            <button
              onClick={handleAddDemoItem}
              className="btn btn-primary btn-sm"
              style={{ padding: '8px 16px' }}
            >
              Ajouter la Lampe Solaire (14 900 FCFA)
            </button>
          </div>
        )}

        {/* Main One-Page Form Container */}
        <form onSubmit={handleSubmitOrder}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'start'
          }}>
            {/* =========================================================================
                LEFT COLUMN: SECTIONS 1, 2, 3
                ========================================================================= */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* ---------------------------------------------------------------------
                  SECTION 1 — INFORMATIONS CLIENT
                  --------------------------------------------------------------------- */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-subtle)',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '18px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '0.9rem'
                  }}>
                    1
                  </div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                    SECTION 1 — INFORMATIONS CLIENT
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Field: Prénom et nom */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                      Prénom et nom <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jean-Paul Mbianda"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>

                  {/* Field: Numéro de téléphone (Primary contact) */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                        Numéro de téléphone (Contact principal) <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                        Le coursier vous appellera sur ce numéro
                      </span>
                    </div>

                    <div style={{ display: 'flex', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1.5px solid #cbd5e1' }}>
                      <span style={{
                        backgroundColor: '#f1f5f9',
                        padding: '12px 14px',
                        fontSize: '0.95rem',
                        fontWeight: 800,
                        color: 'var(--text-main)',
                        borderRight: '1.5px solid #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        🇨🇲 +237
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="6XX XX XX XX"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          border: 'none',
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Field: WhatsApp */}
                  <div>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginBottom: isWhatsappSame ? 0 : '8px'
                    }}>
                      <input
                        type="checkbox"
                        checked={isWhatsappSame}
                        onChange={(e) => setIsWhatsappSame(e.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                      />
                      <span>Mon numéro WhatsApp est identique à mon numéro de téléphone</span>
                    </label>

                    {!isWhatsappSame && (
                      <div style={{ marginTop: '8px' }}>
                        <input
                          type="tel"
                          placeholder="Numéro WhatsApp (ex: +237 690 00 00 00)"
                          value={whatsappPhone}
                          onChange={(e) => setWhatsappPhone(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1.5px solid #cbd5e1',
                            fontSize: '0.9rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------------------------
                  SECTION 2 — LIVRAISON
                  --------------------------------------------------------------------- */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-subtle)',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '18px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '0.9rem'
                  }}>
                    2
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                      SECTION 2 — LIVRAISON
                    </h2>
                    <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700 }}>
                      Frais de livraison calculés dynamiquement selon votre ville
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Field: Ville */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                      Ville de destination <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        backgroundColor: '#ffffff',
                        outline: 'none'
                      }}
                    >
                      <option value="Douala">Douala (Livraison 24h par coursier)</option>
                      <option value="Yaoundé">Yaoundé (Livraison 24h par coursier)</option>
                      <option value="Bafoussam">Bafoussam (Expédition 48h agence)</option>
                      <option value="Kribi">Kribi (Expédition 48h agence)</option>
                      <option value="Limbe">Limbe (Expédition 48h agence)</option>
                      <option value="Bamenda">Bamenda (Expédition 48h agence)</option>
                      <option value="Garoua">Garoua (Expédition 72h agence sécurisée)</option>
                      <option value="Maroua">Maroua (Expédition 72h agence sécurisée)</option>
                      <option value="Ngaoundéré">Ngaoundéré (Expédition 72h agence)</option>
                      <option value="Bertoua">Bertoua (Expédition 48h agence)</option>
                      <option value="Autre ville">Autre ville au Cameroun</option>
                    </select>

                    {/* Dynamic delivery fee pill */}
                    <div style={{
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.78rem',
                      color: deliveryFee === 0 ? '#16a34a' : 'var(--color-primary)'
                    }}>
                      <Truck size={14} />
                      <span>
                        Frais pour {city} : <strong>{deliveryFee === 0 ? 'GRATUIT (Offre > 25 000 FCFA)' : formatFCFA(deliveryFee)}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Field: Quartier */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                      Quartier <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={city === 'Douala' ? "Ex: Akwa, Bonamoussadi, Deido, Makepe..." : city === 'Yaoundé' ? "Ex: Bastos, Omnisports, Mendong, Essos..." : "Précisez votre quartier"}
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Field: Adresse / Point de repère */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                      Adresse / Point de repère précis <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Face pharmacie du Rond-Point, 2e portail noir à droite"
                      value={addressNote}
                      onChange={(e) => setAddressNote(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                    <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                      Les points de repères facilitent grandement l'arrivée rapide du livreur.
                    </span>
                  </div>

                  {/* Field: Instructions de livraison */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                      Instructions de livraison (Optionnel)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ex: M'appeler 30 minutes avant de passer, ou livrer de préférence après 15h."
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.9rem',
                        outline: 'none',
                        resize: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------------------------
                  SECTION 3 — PAIEMENT
                  --------------------------------------------------------------------- */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-subtle)',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '18px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '0.9rem'
                  }}>
                    3
                  </div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                    SECTION 3 — PAIEMENT
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Option 1: Paiement à la livraison */}
                  <div
                    onClick={() => setPaymentOption('cod')}
                    style={{
                      border: paymentOption === 'cod' ? '2px solid var(--color-primary)' : '1.5px solid #e2e8f0',
                      backgroundColor: paymentOption === 'cod' ? 'var(--color-primary-subtle)' : '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentOption === 'cod'}
                      onChange={() => setPaymentOption('cod')}
                      style={{ marginTop: '4px', width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                          Paiement à la livraison (Espèces)
                        </span>
                        <span style={{
                          backgroundColor: '#dcfce7',
                          color: '#15803d',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '3px'
                        }}>
                          RECOMMANDE
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>
                        Réglez directement en espèces au coursier après ouverture et vérification de votre colis.
                      </p>
                    </div>
                  </div>

                  {/* Option 2: Mobile Money */}
                  <div
                    onClick={() => setPaymentOption('momo')}
                    style={{
                      border: paymentOption === 'momo' ? '2px solid var(--color-primary)' : '1.5px solid #e2e8f0',
                      backgroundColor: paymentOption === 'momo' ? 'var(--color-primary-subtle)' : '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentOption === 'momo'}
                      onChange={() => setPaymentOption('momo')}
                      style={{ marginTop: '4px', width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                    />
                    <div style={{ width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                          Mobile Money
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          (MTN MoMo & Orange Money)
                        </span>
                      </div>
                      <p style={{ margin: '0 0 10px 0', fontSize: '0.8rem', color: '#64748b' }}>
                        Payez directement depuis votre compte mobile money lors de la livraison.
                      </p>

                      {/* If Mobile Money selected: Show MTN MoMo & Orange Money selector */}
                      {paymentOption === 'momo' && (
                        <div style={{
                          marginTop: '12px',
                          paddingTop: '12px',
                          borderTop: '1px solid #cbd5e1'
                        }}>
                          <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '8px' }}>
                            Sélectionnez votre opérateur :
                          </span>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                            {/* MTN Mobile Money */}
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setMomoProvider('mtn');
                              }}
                              style={{
                                border: momoProvider === 'mtn' ? '2px solid #ca8a04' : '1px solid #e2e8f0',
                                backgroundColor: momoProvider === 'mtn' ? '#fef9c3' : '#ffffff',
                                padding: '10px',
                                borderRadius: '6px',
                                textAlign: 'center',
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                color: '#854d0e',
                                cursor: 'pointer'
                              }}
                            >
                              🟡 MTN Mobile Money
                            </div>

                            {/* Orange Money */}
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setMomoProvider('orange');
                              }}
                              style={{
                                border: momoProvider === 'orange' ? '2px solid #ea580c' : '1px solid #e2e8f0',
                                backgroundColor: momoProvider === 'orange' ? '#ffedd5' : '#ffffff',
                                padding: '10px',
                                borderRadius: '6px',
                                textAlign: 'center',
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                color: '#9a3412',
                                cursor: 'pointer'
                              }}
                            >
                              🟠 Orange Money
                            </div>
                          </div>

                          {/* Relevant phone number field for Mobile Money */}
                          <div onClick={(e) => e.stopPropagation()}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                              Numéro de compte {momoProvider === 'mtn' ? 'MTN MoMo' : 'Orange Money'} :
                            </label>
                            <input
                              type="tel"
                              placeholder="Ex: 6XX XX XX XX (ou laissez vide si identique)"
                              value={momoPhone}
                              onChange={(e) => setMomoPhone(e.target.value)}
                              style={{
                                width: '100%',
                                padding: '10px 12px',
                                borderRadius: '4px',
                                border: '1.5px solid #cbd5e1',
                                fontSize: '0.85rem',
                                outline: 'none'
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* =========================================================================
                RIGHT COLUMN: SECTION 4 — RÉCAPITULATIF & PRIMARY CTA
                ========================================================================= */}
            <div style={{ position: 'sticky', top: '80px' }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-subtle)',
                padding: '24px',
                boxShadow: '0 4px 18px rgba(0,0,0,0.06)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '0.9rem'
                  }}>
                    4
                  </div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                    SECTION 4 — RÉCAPITULATIF
                  </h2>
                </div>

                {/* Products in Cart Summary */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  marginBottom: '18px',
                  paddingRight: '4px'
                }}>
                  {cart.map(item => (
                    <div 
                      key={item.product.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        borderBottom: '1px solid #f1f5f9',
                        paddingBottom: '10px'
                      }}
                    >
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{
                          fontSize: '0.825rem',
                          fontWeight: 700,
                          margin: '0 0 2px 0',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {item.product.name}
                        </h4>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          Quantité : <strong>{item.quantity}</strong> • {formatFCFA(item.product.price)} / unité
                        </div>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--color-primary-dark)' }}>
                        {formatFCFA(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal, Delivery, Discount, Total breakdown */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  fontSize: '0.9rem',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '14px',
                  marginBottom: '20px'
                }}>
                  {/* Subtotal */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>Sous-total</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{formatFCFA(subtotal)}</span>
                  </div>

                  {/* Delivery fee (Dynamic) */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>Frais de livraison ({city})</span>
                    {deliveryFee === 0 ? (
                      <span style={{ color: '#16a34a', fontWeight: 800 }}>GRATUIT</span>
                    ) : (
                      <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{formatFCFA(deliveryFee)}</span>
                    )}
                  </div>

                  {/* Discount */}
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                      <span>Réduction appliquée</span>
                      <span style={{ fontWeight: 800 }}>-{formatFCFA(discount)}</span>
                    </div>
                  )}

                  {/* TOTAL */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    borderTop: '2px dashed #cbd5e1',
                    paddingTop: '12px',
                    marginTop: '4px'
                  }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-main)' }}>
                      TOTAL
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-family-heading)',
                      fontSize: '1.45rem',
                      fontWeight: 900,
                      color: '#b45309'
                    }}>
                      {formatFCFA(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* =========================================================================
                    PRIMARY CTA: "CONFIRMER MA COMMANDE"
                    ========================================================================= */}
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="btn btn-yellow"
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 6px 20px rgba(245, 158, 11, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                    border: '2px solid #d97706',
                    marginBottom: '16px',
                    opacity: cart.length === 0 ? 0.6 : 1
                  }}
                >
                  <Zap size={20} fill="#78350f" />
                  <span>CONFIRMER MA COMMANDE</span>
                </button>

                {/* Exact Trust Message requested */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#475569',
                    lineHeight: 1.4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <Lock size={13} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <span>Vos informations sont utilisées uniquement pour traiter votre commande.</span>
                  </div>
                </div>

                {/* Small assurance list */}
                <div style={{ marginTop: '16px', fontSize: '0.75rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#16a34a" />
                    <span>Vérification physique du colis autorisée avant tout paiement</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#16a34a" />
                    <span>Assistance téléphonique et suivi en direct du coursier</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              MOBILE: STICKY TOTAL + CONFIRMATION CTA
              Single-column, minimal friction, sticky button at the bottom.
              ========================================================================= */}
          <div 
            className="mobile-only"
            style={{
              position: 'fixed',
              bottom: '56px', // Above bottom nav
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              borderTop: '2px solid var(--color-yellow)',
              boxShadow: '0 -4px 16px rgba(0,0,0,0.14)',
              padding: '10px 14px',
              zIndex: 840,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1 }}>Total net :</span>
              <span style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: '1.25rem',
                fontWeight: 900,
                color: '#b45309',
                lineHeight: 1.2
              }}>
                {formatFCFA(finalTotal)}
              </span>
              <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 800 }}>
                {paymentOption === 'cod' ? '💵 Espèces à la livraison' : '📱 Mobile Money'}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="btn btn-yellow"
              style={{
                padding: '12px 18px',
                fontSize: '0.9rem',
                fontWeight: 900,
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <Zap size={16} fill="#78350f" />
              <span>CONFIRMER MA COMMANDE</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
