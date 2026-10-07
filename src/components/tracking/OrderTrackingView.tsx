import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import { 
  Search, 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Phone, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  AlertCircle,
  ArrowLeft,
  Check,
  UserCheck
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { orders, activeTrackingNumber, setActiveTrackingNumber, setActiveView } = useStore();
  
  // Search state
  const [orderNumberInput, setOrderNumberInput] = useState(activeTrackingNumber || 'IFM-10482');
  const [phoneInput, setPhoneInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Sync if activeTrackingNumber changes in store
  useEffect(() => {
    if (activeTrackingNumber) {
      setOrderNumberInput(activeTrackingNumber);
    }
  }, [activeTrackingNumber]);

  // Find matching order
  const cleanNum = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const cleanPhone = (str: string) => str.replace(/[^0-9]/g, '');

  const matchedOrder = orders.find((o) => {
    const targetNum = cleanNum(orderNumberInput);
    const targetPhone = cleanPhone(phoneInput);

    const matchesNum = targetNum ? cleanNum(o.trackingNumber).includes(targetNum) : false;
    const matchesPhone = targetPhone ? cleanPhone(o.customerPhone).includes(targetPhone) : false;

    if (targetNum && targetPhone) {
      return matchesNum || matchesPhone;
    }
    if (targetNum) return matchesNum;
    if (targetPhone) return matchesPhone;
    return false;
  }) || orders.find(o => cleanNum(o.trackingNumber) === cleanNum(activeTrackingNumber || 'IFM-10482')) || orders[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    if (matchedOrder) {
      setActiveTrackingNumber(matchedOrder.trackingNumber);
    }
  };

  const handleSelectQuickOrder = (num: string) => {
    setOrderNumberInput(num);
    setActiveTrackingNumber(num);
    const found = orders.find(o => cleanNum(o.trackingNumber) === cleanNum(num));
    if (found && found.customerPhone) {
      setPhoneInput(found.customerPhone);
    }
  };

  // Timeline configuration: 5 steps as specified
  // 1. Commande reçue
  // 2. Commande confirmée
  // 3. Préparée
  // 4. En livraison
  // 5. Livrée
  const timelineSteps = [
    {
      id: 'received',
      title: 'Commande reçue',
      description: 'Commande enregistrée dans le système IFPTIE',
      time: 'Aujourd\'hui 11:20'
    },
    {
      id: 'confirmed',
      title: 'Commande confirmée',
      description: 'Appel de validation client effectué avec succès',
      time: 'Aujourd\'hui 11:45'
    },
    {
      id: 'prepared',
      title: 'Préparée',
      description: 'Colis emballé & scellé au centre logistique',
      time: 'Aujourd\'hui 13:10'
    },
    {
      id: 'in_transit',
      title: 'En livraison',
      description: 'En cours d\'acheminement par notre livreur express',
      time: 'En cours (estimée ~35 min)'
    },
    {
      id: 'delivered',
      title: 'Livrée',
      description: 'Paiement à la livraison & remise en main propre',
      time: 'En attente de réception'
    }
  ];

  // Helper to determine step state
  // returns: 'completed' | 'current' | 'pending'
  const getStepState = (stepIndex: number, status: string) => {
    let activeIndex = 3; // default: 'in_transit' is step index 3

    switch (status) {
      case 'received':
        activeIndex = 0;
        break;
      case 'confirmed':
        activeIndex = 1;
        break;
      case 'preparing':
        activeIndex = 2;
        break;
      case 'in_transit':
        activeIndex = 3;
        break;
      case 'delivered':
        activeIndex = 4;
        break;
      default:
        activeIndex = 3;
    }

    if (stepIndex < activeIndex) return 'completed';
    if (stepIndex === activeIndex) return 'current';
    return 'pending';
  };

  const courierName = matchedOrder?.courierName || 'Arsène Mbida';
  const courierPhone = matchedOrder?.courierPhone || '+237 671 23 45 67';
  const cleanCourierPhone = courierPhone.replace(/[^0-9]/g, '');
  const estimatedDeliveryTime = matchedOrder?.estimatedDeliveryDate || 'Aujourd\'hui entre 14h30 et 16h00';
  const trackingNumber = matchedOrder?.trackingNumber || 'IFM-10482';

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Top Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0b5738 0%, #073b26 100%)',
        color: '#ffffff',
        padding: '24px 16px 36px',
        boxShadow: '0 4px 12px rgba(11, 87, 56, 0.15)'
      }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Breadcrumb / Return */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <button
              onClick={() => setActiveView('storefront')}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={15} />
              Retour boutique
            </button>

            <span style={{ fontSize: '0.75rem', color: '#a7f3d0', fontWeight: 600, letterSpacing: '0.5px' }}>
              SERVICE LIVRAISON EXPRESS CAMEROUN
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#f59e0b',
              color: '#073b26',
              marginBottom: '12px',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)'
            }}>
              <Truck size={26} />
            </div>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.3px' }}>
              Suivre ma commande
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#e2e8f0', margin: 0, opacity: 0.9 }}>
              Consultez en direct la progression et le livreur assigné à votre colis.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '720px', margin: '-20px auto 0', padding: '0 16px' }}>
        {/* Search & Order Access Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={18} color="#0b5738" />
            <span>Accéder à votre commande</span>
          </div>

          <form onSubmit={handleSearchSubmit} style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '12px' }}>
              {/* Numéro de commande */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Numéro de commande
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.875rem', fontWeight: 700 }}>
                    #
                  </span>
                  <input
                    type="text"
                    value={orderNumberInput}
                    onChange={(e) => setOrderNumberInput(e.target.value)}
                    placeholder="Ex: IFM-10482"
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 30px',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Téléphone
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="Ex: 677 88 99 00"
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 36px',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Exemples rapides :</span>
                <button
                  type="button"
                  onClick={() => handleSelectQuickOrder('IFM-10482')}
                  style={{
                    border: orderNumberInput === 'IFM-10482' ? '1px solid #0b5738' : '1px solid #cbd5e1',
                    background: orderNumberInput === 'IFM-10482' ? '#ecfdf5' : '#f8fafc',
                    color: orderNumberInput === 'IFM-10482' ? '#0b5738' : '#334155',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🚚 #IFM-10482
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectQuickOrder('IFP-CMR-8492')}
                  style={{
                    border: orderNumberInput === 'IFP-CMR-8492' ? '1px solid #0b5738' : '1px solid #cbd5e1',
                    background: orderNumberInput === 'IFP-CMR-8492' ? '#ecfdf5' : '#f8fafc',
                    color: orderNumberInput === 'IFP-CMR-8492' ? '#0b5738' : '#334155',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ✓ #IFP-CMR-8492
                </button>
              </div>

              <button
                type="submit"
                style={{
                  background: '#0b5738',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '11px 20px',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginLeft: 'auto'
                }}
              >
                <Search size={16} />
                Rechercher
              </button>
            </div>
          </form>
        </div>

        {/* ORDER RESULT MAIN CARD */}
        {matchedOrder ? (
          <div style={{ display: 'grid', gap: '20px' }}>
            
            {/* Status & Order ID banner */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f1f5f9'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Commande
                  </span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0b5738', fontFamily: 'monospace', letterSpacing: '-0.5px' }}>
                    #{trackingNumber}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '2px' }}>
                    Passée le {matchedOrder.createdAt || 'Aujourd\'hui'}
                  </div>
                </div>

                {/* Main Status Badge */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#fef3c7',
                    border: '1.5px solid #f59e0b',
                    color: '#92400e',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    fontSize: '0.9375rem',
                    fontWeight: 800,
                    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.2)'
                  }}>
                    <span style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#d97706',
                      display: 'inline-block',
                      animation: 'pulse 1.5s infinite'
                    }} />
                    <span>🚚 En livraison</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#0b5738', fontWeight: 600, marginTop: '4px' }}>
                    Paiement à la livraison
                  </div>
                </div>
              </div>

              {/* TIMELINE SECTION */}
              <div style={{ paddingTop: '20px' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Progression de votre commande</span>
                  <span style={{ fontSize: '0.75rem', color: '#0b5738', fontWeight: 700 }}>
                    Étape 4 sur 5
                  </span>
                </div>

                {/* Vertical Timeline optimized for mobile & desktop */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
                  {timelineSteps.map((step, idx) => {
                    const stepState = getStepState(idx, matchedOrder.orderStatus);
                    const isCompleted = stepState === 'completed';
                    const isCurrent = stepState === 'current';
                    const isPending = stepState === 'pending';
                    const isLast = idx === timelineSteps.length - 1;

                    return (
                      <div key={step.id} style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', paddingBottom: isLast ? '0' : '20px' }}>
                        {/* Connecting Line */}
                        {!isLast && (
                          <div style={{
                            position: 'absolute',
                            left: '15px',
                            top: '32px',
                            bottom: '0',
                            width: '2px',
                            backgroundColor: isCompleted ? '#0b5738' : '#e2e8f0',
                            zIndex: 1
                          }} />
                        )}

                        {/* Step Marker */}
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem',
                          fontWeight: 800,
                          flexShrink: 0,
                          zIndex: 2,
                          backgroundColor: isCompleted 
                            ? '#0b5738' 
                            : isCurrent 
                              ? '#f59e0b' 
                              : '#ffffff',
                          color: isCompleted || isCurrent ? '#ffffff' : '#94a3b8',
                          border: isCompleted 
                            ? '2px solid #0b5738' 
                            : isCurrent 
                              ? '2px solid #f59e0b' 
                              : '2px solid #cbd5e1',
                          boxShadow: isCurrent ? '0 0 0 4px rgba(245, 158, 11, 0.25)' : 'none'
                        }}>
                          {isCompleted ? (
                            <Check size={18} strokeWidth={3} />
                          ) : isCurrent ? (
                            <span style={{ fontSize: '1.2rem', lineHeight: '1' }}>●</span>
                          ) : (
                            <span style={{ fontSize: '1rem', lineHeight: '1' }}>○</span>
                          )}
                        </div>

                        {/* Step Content */}
                        <div style={{ marginLeft: '14px', flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                            <div style={{
                              fontSize: '0.9375rem',
                              fontWeight: isCurrent ? 800 : 700,
                              color: isCurrent ? '#073b26' : isCompleted ? '#1e293b' : '#64748b'
                            }}>
                              {step.title}
                              {isCurrent && (
                                <span style={{
                                  marginLeft: '8px',
                                  fontSize: '0.6875rem',
                                  backgroundColor: '#fef3c7',
                                  color: '#b45309',
                                  padding: '2px 8px',
                                  borderRadius: '999px',
                                  fontWeight: 800,
                                  textTransform: 'uppercase'
                                }}>
                                  En cours
                                </span>
                              )}
                            </div>
                            <span style={{ fontSize: '0.75rem', color: isCurrent ? '#d97706' : '#94a3b8', fontWeight: 600 }}>
                              {step.time}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '2px' }}>
                            {step.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* LIVREUR ASSIGNÉ CARD */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#ecfdf5',
                    color: '#0b5738',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#1e293b' }}>
                      Livreur assigné
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#0b5738', fontWeight: 600 }}>
                      Coursier vérifié IFPTIE Express
                    </span>
                  </div>
                </div>

                {/* Delivery Badge */}
                <span style={{
                  fontSize: '0.75rem',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontWeight: 600
                }}>
                  🏍️ Moto Express
                </span>
              </div>

              {/* Courier info box */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #e2e8f0',
                display: 'grid',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                      Nom du livreur
                    </div>
                    <div style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0f172a' }}>
                      {courierName}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                      Téléphone
                    </div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0b5738' }}>
                      {courierPhone}
                    </div>
                  </div>
                </div>

                {/* Estimated delivery time */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fde68a',
                  padding: '10px 14px',
                  borderRadius: '8px'
                }}>
                  <Clock size={16} color="#d97706" />
                  <div style={{ fontSize: '0.8125rem', color: '#92400e' }}>
                    <span style={{ fontWeight: 700 }}>Heure estimée : </span>
                    <span>{estimatedDeliveryTime}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Appeler & WhatsApp */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))',
                gap: '12px'
              }}>
                {/* Button 1: Appeler le livreur */}
                <a
                  href={`tel:${courierPhone}`}
                  style={{
                    backgroundColor: '#0b5738',
                    color: '#ffffff',
                    padding: '13px 18px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(11, 87, 56, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Phone size={18} />
                  <span>Appeler le livreur</span>
                </a>

                {/* Button 2: Contacter sur WhatsApp */}
                <a
                  href={`https://wa.me/${cleanCourierPhone}?text=${encodeURIComponent(`Bonjour ${courierName}, je suis le client de la commande IFPTIE Market #${trackingNumber}. Où en êtes-vous s'il vous plaît ?`)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                    padding: '13px 18px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Contacter sur WhatsApp</span>
                </a>
              </div>
            </div>

            {/* ORDER SUMMARY (Products, Delivery Location, Total) */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 16px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={18} color="#0b5738" />
                <span>Récapitulatif de la commande</span>
              </h3>

              {/* Products List */}
              <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Produits commandés ({matchedOrder.items.length})
                </span>

                {matchedOrder.items.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #f1f5f9'
                  }}>
                    <img
                      src={item.image}
                      alt={item.productName}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        flexShrink: 0
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: '#1e293b',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {item.productName}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                        Quantité : <strong style={{ color: '#0f172a' }}>{item.quantity}</strong>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0b5738' }}>
                        {formatFCFA(item.price * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                          {formatFCFA(item.price)} / unité
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Location Section */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '14px 16px',
                border: '1px solid #e2e8f0',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <MapPin size={14} color="#0b5738" />
                  <span>Adresse de livraison</span>
                </div>

                <div style={{ display: 'grid', gap: '4px' }}>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
                    {matchedOrder.customerName} • {matchedOrder.customerPhone}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#334155' }}>
                    <strong>{matchedOrder.city}</strong>, quartier <strong>{matchedOrder.neighborhood}</strong>
                  </div>
                  {matchedOrder.addressNote && (
                    <div style={{ fontSize: '0.8125rem', color: '#64748b', fontStyle: 'italic', marginTop: '2px' }}>
                      📍 Repère : « {matchedOrder.addressNote} »
                    </div>
                  )}
                  {matchedOrder.deliveryInstructions && (
                    <div style={{ fontSize: '0.75rem', color: '#0b5738', marginTop: '4px', backgroundColor: '#ecfdf5', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
                      Instructions : {matchedOrder.deliveryInstructions}
                    </div>
                  )}
                </div>
              </div>

              {/* Total Calculation breakdown */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'grid', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#64748b' }}>
                  <span>Sous-total articles :</span>
                  <span>{formatFCFA(matchedOrder.subtotal || matchedOrder.total)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#64748b' }}>
                  <span>Frais de livraison :</span>
                  <span style={{ color: '#0b5738', fontWeight: 600 }}>
                    {matchedOrder.deliveryFee ? formatFCFA(matchedOrder.deliveryFee) : 'Gratuit'}
                  </span>
                </div>

                {matchedOrder.discount ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#e11d48' }}>
                    <span>Réduction promo :</span>
                    <span>-{formatFCFA(matchedOrder.discount)}</span>
                  </div>
                ) : null}

                {/* Grand Total */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '2px dashed #e2e8f0',
                  marginTop: '4px'
                }}>
                  <div>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', display: 'block' }}>
                      Montant Total à Payer :
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#0b5738', fontWeight: 600 }}>
                      {matchedOrder.paymentMethod === 'cash_on_delivery' ? '💵 Espèces à la livraison' : '📱 Mobile Money à réception'}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0b5738' }}>
                    {formatFCFA(matchedOrder.total)}
                  </div>
                </div>
              </div>
            </div>

            {/* Reassurance Banner */}
            <div style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '12px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <ShieldCheck size={24} color="#0b5738" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.8125rem', color: '#064e3b' }}>
                <strong>Garantie Sérénité IFPTIE :</strong> Vous vérifiez le contenu de votre colis avec le livreur avant tout règlement en espèces ou par Mobile Money.
              </div>
            </div>

          </div>
        ) : (
          /* Empty / Not Found State */
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '40px 20px',
            textAlign: 'center',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <AlertCircle size={44} color="#f59e0b" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              Aucune commande trouvée
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '440px', margin: '0 auto 20px' }}>
              Veuillez vérifier votre numéro de commande (ex: <strong>IFM-10482</strong>) ou le numéro de téléphone utilisé lors de l'achat.
            </p>
            <button
              onClick={() => handleSelectQuickOrder('IFM-10482')}
              style={{
                backgroundColor: '#0b5738',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Afficher la commande exemple #IFM-10482
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
