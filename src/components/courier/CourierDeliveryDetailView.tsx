import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import type { CourierTask } from '../../types';
import { CourierFailedDeliveryModal } from './CourierFailedDeliveryModal';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Phone, 
  MessageCircle, 
  Package, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Banknote, 
  Check, 
  Camera, 
  FileText, 
  Share2, 
  ExternalLink,
  ShieldCheck,
  Bike,
  Compass,
  X
} from 'lucide-react';

interface CourierDeliveryDetailViewProps {
  task?: CourierTask;
  onBack: () => void;
}

export const CourierDeliveryDetailView: React.FC<CourierDeliveryDetailViewProps> = ({ 
  task: propTask, 
  onBack 
}) => {
  const { courierTasks, orders, updateCourierTaskStatus, addToast } = useStore();

  // Find task or fallback to #IFM-10482
  const currentTask = propTask || courierTasks.find(t => t.trackingNumber === 'IFM-10482') || courierTasks[0];
  
  // Find associated order details for rich items list and instructions
  const relatedOrder = orders.find(
    o => o.trackingNumber === currentTask.trackingNumber || o.id === currentTask.orderId
  );

  // States
  const [taskStatus, setTaskStatus] = useState<CourierTask['status']>(currentTask.status);
  const [clientContacted, setClientContacted] = useState(false);
  const [clientContactedTime, setClientContactedTime] = useState<string | null>(null);

  // Delivery confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [proofPhotoTaken, setProofPhotoTaken] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(true);

  // Failure modal state
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [failureReason, setFailureReason] = useState('Client injoignable après 3 appels');

  const cleanPhone = currentTask.customerPhone.replace(/[^0-9]/g, '');
  const cleanWhatsApp = (relatedOrder?.whatsappPhone || currentTask.customerPhone).replace(/[^0-9]/g, '');

  // Handlers
  const handleJeSuisEnRoute = () => {
    setTaskStatus('in_route');
    updateCourierTaskStatus(currentTask.id, 'in_route', false);
    addToast(`🛵 Vous êtes en route pour #${currentTask.trackingNumber} !`, 'info');
  };

  const handleClientContacte = () => {
    const timeNow = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setClientContacted(true);
    setClientContactedTime(timeNow);
    addToast(`📞 Client notifié contacté à ${timeNow}`, 'success');
  };

  const handleConfirmLivraison = () => {
    setTaskStatus('delivered');
    updateCourierTaskStatus(currentTask.id, 'delivered', paymentConfirmed);
    setShowConfirmModal(false);
    addToast(`🎉 Commande #${currentTask.trackingNumber} marquée LIVRÉE avec succès !`, 'success');
  };

  const handleConfirmFailure = () => {
    setTaskStatus('failed');
    updateCourierTaskStatus(currentTask.id, 'failed', false);
    setShowFailureModal(false);
    addToast(`⚠️ Échec enregistré : ${failureReason}`, 'warning');
  };

  const openGoogleMaps = () => {
    const fullQuery = encodeURIComponent(
      `${currentTask.neighborhood}, ${currentTask.city}, Cameroun`
    );
    window.open(`https://www.google.com/maps/search/?api=1&query=${fullQuery}`, '_blank');
  };

  // Status mapping
  const getStatusDisplay = (status: CourierTask['status']) => {
    switch (status) {
      case 'assigned':
        return { label: 'À LIVRER', bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8', icon: '📦' };
      case 'in_route':
        return { label: 'EN COURS DE LIVRAISON', bg: '#fffbeb', border: '#fde68a', text: '#b45309', icon: '🛵' };
      case 'delivered':
        return { label: 'LIVRÉE', bg: '#ecfdf5', border: '#a7f3d0', text: '#047857', icon: '✓' };
      case 'failed':
        return { label: 'ÉCHEC DE LIVRAISON', bg: '#fef2f2', border: '#fecaca', text: '#b91c1c', icon: '⚠️' };
      default:
        return { label: 'À LIVRER', bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8', icon: '📦' };
    }
  };

  const statusInfo = getStatusDisplay(taskStatus);

  // Products from related order or fallback
  const items = relatedOrder?.items || [
    {
      productId: 'p1',
      productName: currentTask.itemsSummary || 'Lampe Solaire LED Rechargeable 100W IP67',
      price: currentTask.totalToCollect - (currentTask.deliveryFee || 0),
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=200&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      paddingBottom: '120px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      
      {/* 1. HEADER */}
      <div style={{
        backgroundColor: '#073b26',
        color: '#ffffff',
        padding: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={onBack}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '10px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={18} />
            <span>Retour</span>
          </button>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.6875rem', color: '#a7f3d0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Détail livraison
            </span>
            <div style={{ fontFamily: 'monospace', fontSize: '1.1875rem', fontWeight: 900, letterSpacing: '-0.3px' }}>
              Commande #{currentTask.trackingNumber}
            </div>
          </div>

          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#f59e0b',
            color: '#073b26',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.75rem'
          }}>
            #IFM
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '16px' }}>

        {/* 2. STATUS CARD */}
        <div style={{
          backgroundColor: statusInfo.bg,
          border: `2px solid ${statusInfo.border}`,
          borderRadius: '16px',
          padding: '16px 20px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: statusInfo.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              STATUT DE LA COURSE
            </span>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: statusInfo.text, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{statusInfo.icon}</span>
              <span>{statusInfo.label}</span>
            </div>
          </div>

          {clientContacted && (
            <div style={{
              backgroundColor: '#dcfce7',
              color: '#15803d',
              padding: '6px 12px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Check size={14} strokeWidth={3} />
              <span>Contacté {clientContactedTime}</span>
            </div>
          )}
        </div>

        {/* 3. CLIENT SECTION */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          marginBottom: '16px'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            CLIENT
          </span>

          <div style={{ marginTop: '8px', marginBottom: '16px' }}>
            <div style={{ fontSize: '1.3125rem', fontWeight: 900, color: '#0f172a' }}>
              {currentTask.customerName}
            </div>
            <div style={{ fontSize: '0.9375rem', color: '#0b5738', fontWeight: 700, marginTop: '2px' }}>
              {currentTask.customerPhone}
            </div>
          </div>

          {/* Large Communication Touch Targets: Phone & WhatsApp */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {/* Call button */}
            <a
              href={`tel:${currentTask.customerPhone}`}
              onClick={handleClientContacte}
              style={{
                backgroundColor: '#0b5738',
                color: '#ffffff',
                padding: '14px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.9375rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 10px rgba(11, 87, 56, 0.25)'
              }}
            >
              <Phone size={20} />
              <span>Appeler</span>
            </a>

            {/* WhatsApp button */}
            <a
              href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                `Bonjour ${currentTask.customerName}, c'est Jean votre coursier IFPTIE Market. Je suis en route avec votre commande #${currentTask.trackingNumber} pour ${currentTask.neighborhood}. Pouvez-vous me confirmer que vous êtes disponible ?`
              )}`}
              target="_blank"
              rel="noreferrer"
              onClick={handleClientContacte}
              style={{
                backgroundColor: '#25D366',
                color: '#ffffff',
                padding: '14px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.9375rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 10px rgba(37, 211, 102, 0.25)'
              }}
            >
              <MessageCircle size={20} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 4. ADDRESS SECTION */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <MapPin size={18} color="#0b5738" />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              ADRESSE DE LIVRAISON
            </span>
          </div>

          <div style={{ display: 'grid', gap: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>Ville :</span>
              <strong style={{ color: '#0f172a' }}>{currentTask.city}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>Quartier :</span>
              <strong style={{ color: '#0f172a' }}>{currentTask.neighborhood}</strong>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '8px', marginTop: '4px' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                Adresse détaillée :
              </span>
              <div style={{ fontSize: '0.9375rem', color: '#1e293b', fontWeight: 600, marginTop: '2px' }}>
                {relatedOrder?.neighborhood || currentTask.neighborhood}, Rue 1.042
              </div>
            </div>

            {/* Landmark */}
            <div style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '10px',
              padding: '12px 14px',
              marginTop: '6px'
            }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase' }}>
                📍 Point de repère client :
              </span>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#78350f', marginTop: '2px' }}>
                {relatedOrder?.addressNote || currentTask.notes || 'Portail vert avec sonnette, face Ambassade de Belgique'}
              </div>
            </div>
          </div>

          {/* 5. LARGE CTA: "OUVRIR DANS GOOGLE MAPS" */}
          <button
            onClick={openGoogleMaps}
            style={{
              width: '100%',
              backgroundColor: '#1d4ed8',
              color: '#ffffff',
              border: 'none',
              borderRadius: '14px',
              padding: '16px',
              fontSize: '1rem',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 14px rgba(29, 78, 216, 0.3)',
              transition: 'transform 0.15s ease'
            }}
          >
            <Compass size={22} />
            <span>OUVRIR DANS GOOGLE MAPS</span>
          </button>
        </div>

        {/* 6. ORDER SECTION (Products, Quantity, Total order) */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              COMMANDE & ARTICLES ({items.length})
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0b5738' }}>
              Colis vérifié
            </span>
          </div>

          {/* Products list */}
          <div style={{ display: 'grid', gap: '10px', marginBottom: '16px' }}>
            {items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#f8fafc',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #f1f5f9'
                }}
              >
                <img
                  src={item.image}
                  alt={item.productName}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.productName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                    Quantité : <strong style={{ color: '#0b5738' }}>{item.quantity}</strong>
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontWeight: 800, fontSize: '0.9375rem', color: '#1e293b' }}>
                  {formatFCFA(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
            <span>Total commande :</span>
            <strong style={{ color: '#0f172a', fontSize: '1.05rem' }}>{formatFCFA(currentTask.totalToCollect)}</strong>
          </div>
        </div>

        {/* 7. COLLECTION SECTION */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '2px solid #0b5738',
          boxShadow: '0 4px 15px rgba(11, 87, 56, 0.08)',
          marginBottom: '24px',
          background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Banknote size={20} color="#0b5738" />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              ENCAISSEMENT
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#475569' }}>
                Montant à encaisser
              </span>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#073b26', letterSpacing: '-0.5px', marginTop: '2px' }}>
                {formatFCFA(currentTask.totalToCollect)}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{
                backgroundColor: '#ecfdf5',
                color: '#065f46',
                border: '1px solid #a7f3d0',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 800,
                display: 'inline-block'
              }}>
                {currentTask.paymentMethod === 'cash_on_delivery' ? '💵 Espèces à la livraison' : '📱 Mobile Money à réception'}
              </span>
              <div style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '4px' }}>
                Frais de livraison : {currentTask.deliveryFee ? formatFCFA(currentTask.deliveryFee) : 'Inclus'}
              </div>
            </div>
          </div>
        </div>

        {/* 8. DELIVERY ACTIONS (Large Touch Targets) */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
            ACTIONS LIVREUR
          </div>

          <div style={{ display: 'grid', gap: '10px' }}>
            
            {/* 1. "Je suis en route" */}
            <button
              onClick={handleJeSuisEnRoute}
              style={{
                backgroundColor: taskStatus === 'in_route' ? '#fef3c7' : '#ffffff',
                color: taskStatus === 'in_route' ? '#92400e' : '#1e293b',
                border: taskStatus === 'in_route' ? '2px solid #f59e0b' : '1.5px solid #cbd5e1',
                borderRadius: '14px',
                padding: '16px',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Bike size={22} color={taskStatus === 'in_route' ? '#d97706' : '#64748b'} />
                <span>Je suis en route</span>
              </div>
              {taskStatus === 'in_route' && (
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#b45309', backgroundColor: '#ffffff', padding: '4px 8px', borderRadius: '999px' }}>
                  ACTIF
                </span>
              )}
            </button>

            {/* 2. "Client contacté" */}
            <button
              onClick={handleClientContacte}
              style={{
                backgroundColor: clientContacted ? '#dcfce7' : '#ffffff',
                color: clientContacted ? '#166534' : '#1e293b',
                border: clientContacted ? '2px solid #22c55e' : '1.5px solid #cbd5e1',
                borderRadius: '14px',
                padding: '16px',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={22} color={clientContacted ? '#16a34a' : '#64748b'} />
                <span>Client contacté</span>
              </div>
              {clientContacted && (
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803d', backgroundColor: '#ffffff', padding: '4px 8px', borderRadius: '999px' }}>
                  ✓ {clientContactedTime}
                </span>
              )}
            </button>

            {/* 3. "Livré" (Primary Success Action) */}
            <button
              onClick={() => setShowConfirmModal(true)}
              style={{
                backgroundColor: '#0b5738',
                color: '#ffffff',
                border: 'none',
                borderRadius: '14px',
                padding: '18px',
                fontSize: '1.0625rem',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                letterSpacing: '0.3px',
                boxShadow: '0 4px 14px rgba(11, 87, 56, 0.35)'
              }}
            >
              <CheckCircle2 size={24} />
              <span>LIVRÉ (ENCAISSER {formatFCFA(currentTask.totalToCollect)})</span>
            </button>

            {/* 4. "Échec de livraison" */}
            <button
              onClick={() => setShowFailureModal(true)}
              style={{
                backgroundColor: '#fff1f2',
                color: '#b91c1c',
                border: '1.5px solid #fecaca',
                borderRadius: '14px',
                padding: '14px',
                fontSize: '0.9375rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <AlertCircle size={18} />
              <span>Échec de livraison</span>
            </button>
          </div>
        </div>

      </div>

      {/* CONFIRMATION MODAL WHEN MARKING AS DELIVERED */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '0',
          backdropFilter: 'blur(3px)'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            width: '100%',
            maxWidth: '600px',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '24px 20px 32px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 -6px 25px rgba(0,0,0,0.2)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#ecfdf5',
                  color: '#065f46',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  marginBottom: '6px'
                }}>
                  <Check size={14} strokeWidth={3} />
                  <span>Validation de fin de course</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Confirmer que cette commande a été livrée ?
                </h3>
              </div>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 16px' }}>
              Commande #{currentTask.trackingNumber} remise à <strong>{currentTask.customerName}</strong> ({currentTask.neighborhood}).
            </p>

            {/* Optional 1: Payment Confirmation */}
            <div style={{
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              padding: '14px',
              border: '1.5px solid #86efac',
              marginBottom: '16px'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={paymentConfirmed}
                  onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: '#0b5738', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#064e3b' }}>
                    Paiement encaissé ({formatFCFA(currentTask.totalToCollect)})
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#15803d' }}>
                    Espèces reçues ou transaction Mobile Money validée sur place.
                  </div>
                </div>
              </label>
            </div>

            {/* Optional 2: Delivery note */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Note de livraison (optionnelle) :
              </label>
              <input
                type="text"
                placeholder="Ex: Remis en main propre, portail ouvert, tout est ok"
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.875rem',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Optional 3: Proof of delivery */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Preuve de livraison (optionnelle) :
              </label>
              <button
                type="button"
                onClick={() => setProofPhotoTaken(!proofPhotoTaken)}
                style={{
                  width: '100%',
                  backgroundColor: proofPhotoTaken ? '#ecfdf5' : '#f8fafc',
                  border: proofPhotoTaken ? '2px solid #10b981' : '1.5px dashed #cbd5e1',
                  borderRadius: '10px',
                  padding: '14px',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: proofPhotoTaken ? '#047857' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Camera size={18} />
                <span>{proofPhotoTaken ? '✓ Photo du colis enregistrée' : 'Prendre une photo du colis remis'}</span>
              </button>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'grid', gap: '10px' }}>
              <button
                onClick={handleConfirmLivraison}
                style={{
                  width: '100%',
                  backgroundColor: '#0b5738',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '16px',
                  fontSize: '1rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(11, 87, 56, 0.3)'
                }}
              >
                <CheckCircle2 size={20} />
                <span>CONFIRMER LA LIVRAISON</span>
              </button>

              <button
                onClick={() => setShowConfirmModal(false)}
                style={{
                  width: '100%',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAILED DELIVERY WORKFLOW MODAL */}
      <CourierFailedDeliveryModal
        task={currentTask}
        isOpen={showFailureModal}
        onClose={() => setShowFailureModal(false)}
        onSubmitFailure={(reason, comment, action) => {
          setTaskStatus('failed');
          updateCourierTaskStatus(currentTask.id, 'failed', false);
          setShowFailureModal(false);
          addToast(`⚠️ Échec enregistré : ${reason} → Action : ${action}`, 'warning');
        }}
      />

    </div>
  );
};
