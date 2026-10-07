import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import type { Order, OrderStatus } from '../../types';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Truck,
  Bike,
  Phone,
  MessageSquare,
  Printer,
  UserCheck,
  AlertCircle,
  XCircle,
  Calendar,
  MapPin,
  CreditCard,
  DollarSign,
  FileText,
  Send,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  Package,
  Layers,
  ShieldCheck,
  User,
  Trash2,
  X
} from 'lucide-react';

interface AdminOrderDetailViewProps {
  orderId?: string;
  onBack: () => void;
  onSelectOrderTracking?: (trackingNum: string) => void;
}

interface InternalNote {
  id: string;
  author: string;
  role: string;
  timestamp: string;
  content: string;
  badge?: string;
}

export const AdminOrderDetailView: React.FC<AdminOrderDetailViewProps> = ({
  orderId = 'ord-10482',
  onBack,
  onSelectOrderTracking
}) => {
  const { orders, updateOrderStatus, setActiveTrackingNumber, setActiveView, addToast } = useStore();

  // Find order or fallback to IFM-10482
  const targetOrder: Order = orders.find(o => o.id === orderId || o.trackingNumber === 'IFM-10482') || {
    id: 'ord-10482',
    trackingNumber: 'IFM-10482',
    customerName: 'Carine Etoa',
    customerPhone: '+237 677 88 99 00',
    whatsappPhone: '+237 677 88 99 00',
    city: 'Yaoundé',
    neighborhood: 'Bastos (Face Ambassade de Belgique)',
    addressNote: 'Rue 1.042, Portail vert avec interphone',
    deliveryInstructions: 'Appeler dès l\'arrivée au carrefour Bastos. Ne pas klaxonner.',
    items: [
      {
        productId: 'prod-solar-03',
        productName: 'Lampe Solaire LED Rechargeable 100W IP67 avec Détecteur',
        price: 14900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=200&auto=format&fit=crop&q=80'
      },
      {
        productId: 'prod-tech-02',
        productName: 'Écouteurs Sans Fil TWS Bluetooth 5.3 avec Boîtier Powerbank',
        price: 9600,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 24500,
    deliveryFee: 1500,
    discount: 5000,
    total: 24500,
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'pay_on_delivery',
    orderStatus: 'in_transit',
    createdAt: '20 Sept 2026, 13:45',
    estimatedDeliveryDate: 'Aujourd\'hui avant 16h30',
    courierName: 'Arsène Mbida (Moto Express #01)',
    courierPhone: '+237 671 23 45 67'
  };

  // Local state for interactive action management
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(targetOrder.orderStatus || 'in_transit');
  const [courierAssigned, setCourierAssigned] = useState<string>(targetOrder.courierName || 'Arsène Mbida (Moto Express #01)');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Internal notes list
  const [notes, setNotes] = useState<InternalNote[]>([
    {
      id: 'note-1',
      author: 'Jean-Marc (Dispatch)',
      role: 'Opérateur Service Client',
      timestamp: '20 Sept 2026, 13:50',
      content: 'Appel de confirmation réussi. Cliente a confirmé sa présence à Bastos jusqu\'à 17h00. Colis inspecté au dépôt de Mvan.',
      badge: 'Appel client'
    },
    {
      id: 'note-2',
      author: 'Arsène Mbida',
      role: 'Coursier Moto #01',
      timestamp: '20 Sept 2026, 14:15',
      content: 'Colis récupéré au centre logistique. En route vers Bastos. Prévision d\'arrivée 15h30.',
      badge: 'Terrain'
    }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  // Timeline steps: Created -> Confirmed -> Prepared -> Assigned -> Out for delivery -> Delivered
  const timelineSteps = [
    { key: 'created', label: 'Created', desc: 'Passée sur le site', time: '13:45', status: 'done' },
    { key: 'confirmed', label: 'Confirmed', desc: 'Validée par téléphone', time: '13:52', status: 'done' },
    { key: 'prepared', label: 'Prepared', desc: 'Emballée au dépôt Mvan', time: '14:05', status: 'done' },
    { key: 'assigned', label: 'Assigned', desc: 'Prise en charge coursier', time: '14:15', status: 'done' },
    { key: 'in_transit', label: 'Out for delivery', desc: 'En route vers Bastos', time: 'En cours', status: currentStatus === 'delivered' ? 'done' : 'active' },
    { key: 'delivered', label: 'Delivered', desc: 'En attente de remise', time: currentStatus === 'delivered' ? 'Livré' : 'Est. 15h30', status: currentStatus === 'delivered' ? 'done' : 'pending' }
  ];

  // SKU enrichment helper for order items
  const itemsWithSku = targetOrder.items.map((item, idx) => ({
    ...item,
    sku: idx === 0 ? 'SKU-SOL-100W-CMR' : 'SKU-TECH-TWS53-PRO',
    unitPrice: idx === 0 ? 14900 : 9600,
    discountAmount: idx === 0 ? 3000 : 2000,
    subtotalRow: item.price * item.quantity
  }));

  // Calculations for Financial card
  const grossSubtotal = itemsWithSku.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);
  const totalDiscount = targetOrder.discount || 5000;
  const deliveryFee = targetOrder.deliveryFee || 1500;
  const grandTotal = targetOrder.total || 24500;
  // Estimated margin (approx. 40% margin on electronics / solar)
  const estimatedCost = 14700;
  const estimatedMargin = grandTotal - estimatedCost;
  const marginPercentage = ((estimatedMargin / grandTotal) * 100).toFixed(1);

  // Actions handlers
  const handleConfirmOrder = () => {
    setCurrentStatus('confirmed');
    updateOrderStatus(targetOrder.id, 'confirmed');
    addToast('✓ Commande confirmée avec succès auprès de la cliente !', 'success');
  };

  const handleCancelOrder = () => {
    if (window.confirm('Voulez-vous vraiment annuler cette commande ?')) {
      setCurrentStatus('cancelled');
      updateOrderStatus(targetOrder.id, 'cancelled');
      addToast('✕ La commande a été annulée.', 'warning');
    }
  };

  const handleAssignCourier = (courier: string) => {
    setCourierAssigned(courier);
    setShowAssignModal(false);
    addToast(`🛵 Livreur ${courier} assigné à la commande #${targetOrder.trackingNumber}`, 'success');
  };

  const handleStatusChange = (status: OrderStatus) => {
    setCurrentStatus(status);
    updateOrderStatus(targetOrder.id, status);
    setShowStatusModal(false);
    addToast(`Statut mis à jour : ${status}`, 'success');
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(targetOrder.customerPhone);
    setCopiedPhone(true);
    addToast('Numéro de téléphone copié dans le presse-papier', 'info');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const newEntry: InternalNote = {
      id: `note-${Date.now()}`,
      author: 'Admin IFPTIE (Moi)',
      role: 'Gestionnaire Commandes',
      timestamp: 'À l\'instant',
      content: newNoteText.trim(),
      badge: 'Note interne'
    };
    setNotes([newEntry, ...notes]);
    setNewNoteText('');
    addToast('Note interne enregistrée dans l\'historique', 'success');
  };

  const handlePrintInvoice = () => {
    addToast(`🖨️ Impression du bordereau et de la facture #${targetOrder.trackingNumber} lancée !`, 'info');
    window.print();
  };

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* 1. TOP NAVIGATION / BREADCRUMB */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '18px'
      }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            padding: '8px 16px',
            fontSize: '0.8125rem',
            fontWeight: 800,
            color: '#1e293b',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <ArrowLeft size={16} />
          <span>← Retour à la liste des commandes</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => {
              if (onSelectOrderTracking) {
                onSelectOrderTracking(targetOrder.trackingNumber);
              } else {
                setActiveTrackingNumber(targetOrder.trackingNumber);
                setActiveView('tracking');
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              border: '1px solid #a7f3d0',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <ExternalLink size={14} />
            <span>Voir vue suivi client</span>
          </button>

          <button
            onClick={handlePrintInvoice}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#0b5738',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <Printer size={14} />
            <span>Imprimer facture / BL</span>
          </button>
        </div>
      </div>

      {/* 2. HEADER BANNER */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        padding: '20px 24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
                Commande #{targetOrder.trackingNumber}
              </h1>
              <span style={{
                backgroundColor: '#fef3c7',
                color: '#92400e',
                border: '1px solid #fde68a',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>
                ⭐ COMMANDE PRIORITAIRE
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '4px 0 0' }}>
              Enregistrée le {targetOrder.createdAt} • Expédition express à domicile (Yaoundé)
            </p>
          </div>

          {/* Top status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                Top status
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: currentStatus === 'delivered' ? '#ecfdf5' : '#fff7ed',
                color: currentStatus === 'delivered' ? '#047857' : '#c2410c',
                border: `1.5px solid ${currentStatus === 'delivered' ? '#a7f3d0' : '#fed7aa'}`,
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.9375rem',
                fontWeight: 900
              }}>
                <span style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  backgroundColor: currentStatus === 'delivered' ? '#10b981' : '#ea580c'
                }} />
                {currentStatus === 'in_transit' ? 'En livraison' : currentStatus === 'delivered' ? 'Livrée' : currentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* ORDER TIMELINE (Created -> Confirmed -> Prepared -> Assigned -> Out for delivery -> Delivered) */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Order timeline (Progression en 6 jalons)
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0b5738' }}>
              Dernière mise à jour : il y a 12 min
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px'
          }}>
            {timelineSteps.map((step, idx) => {
              const isDone = step.status === 'done';
              const isActive = step.status === 'active';

              return (
                <div
                  key={step.key}
                  style={{
                    backgroundColor: isActive ? '#ecfdf5' : isDone ? '#f8fafc' : '#ffffff',
                    border: isActive ? '2px solid #0b5738' : isDone ? '1px solid #cbd5e1' : '1px dashed #cbd5e1',
                    borderRadius: '12px',
                    padding: '10px 12px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 900,
                      color: isActive ? '#0b5738' : isDone ? '#047857' : '#94a3b8'
                    }}>
                      Étape {idx + 1}
                    </span>
                    {isDone ? (
                      <CheckCircle2 size={14} color="#059669" />
                    ) : isActive ? (
                      <Truck size={14} color="#0b5738" />
                    ) : (
                      <Clock size={14} color="#94a3b8" />
                    )}
                  </div>

                  <div style={{
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    color: isActive ? '#0b5738' : isDone ? '#0f172a' : '#64748b'
                  }}>
                    {step.label}
                  </div>

                  <div style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '2px', lineHeight: 1.2 }}>
                    {step.desc}
                  </div>

                  <div style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: isActive ? '#0b5738' : '#94a3b8',
                    marginTop: '4px'
                  }}>
                    {step.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT: 2-COLUMN LAYOUT (LEFT MAIN AREA + RIGHT SIDEBAR) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.85fr) minmax(320px, 1.15fr)',
        gap: '20px',
        alignItems: 'start'
      }}>
        
        {/* ========================================================== */}
        {/* LEFT MAIN AREA                                             */}
        {/* ========================================================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* CUSTOMER CARD */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '22px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid #f1f5f9'
            }}>
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
                  <User size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    CUSTOMER (Informations Client)
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Coordonnées complètes et repères de livraison</span>
                </div>
              </div>

              <span style={{
                backgroundColor: '#ecfdf5',
                color: '#047857',
                fontSize: '0.6875rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '6px'
              }}>
                ✓ Client vérifié IFPTIE
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {/* Name */}
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                  Name (Nom)
                </span>
                <span style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#0f172a', marginTop: '2px', display: 'block' }}>
                  {targetOrder.customerName}
                </span>
                <span style={{ fontSize: '0.6875rem', color: '#059669', fontWeight: 700 }}>
                  3 commandes réussies à Yaoundé
                </span>
              </div>

              {/* Phone */}
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                  Phone (Téléphone)
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <a
                    href={`tel:${targetOrder.customerPhone}`}
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 900,
                      color: '#0b5738',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Phone size={14} />
                    <span>{targetOrder.customerPhone}</span>
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    title="Copier le numéro"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: copiedPhone ? '#059669' : '#94a3b8',
                      padding: '2px'
                    }}
                  >
                    {copiedPhone ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>Réseau MTN Cameroon</span>
              </div>

              {/* WhatsApp */}
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                  WhatsApp
                </span>
                <a
                  href={`https://wa.me/237677889900?text=Bonjour%20Carine,%20votre%20commande%20IFPTIE%20Market%20%23IFM-10482%20est%20en%20cours%20de%20livraison.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#059669',
                    fontWeight: 900,
                    fontSize: '0.9375rem',
                    textDecoration: 'none',
                    marginTop: '2px'
                  }}
                >
                  <MessageSquare size={14} />
                  <span>{targetOrder.whatsappPhone || targetOrder.customerPhone}</span>
                </a>
                <span style={{ fontSize: '0.6875rem', color: '#059669', fontWeight: 700, display: 'block' }}>
                  Discuter en 1-clic
                </span>
              </div>

              {/* Address */}
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                  Address (Adresse)
                </span>
                <span style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#0f172a', marginTop: '2px', display: 'block' }}>
                  Rue 1.042, Bastos
                </span>
                <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>Accès goudronné praticable en moto</span>
              </div>

              {/* City */}
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                  City (Ville)
                </span>
                <span style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#0f172a', marginTop: '2px', display: 'block' }}>
                  🇨🇲 {targetOrder.city}
                </span>
                <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>Région du Centre</span>
              </div>

              {/* Neighborhood */}
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                  Neighborhood (Quartier)
                </span>
                <span style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#0f172a', marginTop: '2px', display: 'block' }}>
                  📍 {targetOrder.neighborhood}
                </span>
                <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>Zone résidentielle Bastos</span>
              </div>

              {/* Landmark */}
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #f1f5f9', gridColumn: 'span 2' }}>
                <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                  Landmark (Point de repère)
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', marginTop: '2px', display: 'block' }}>
                  🏛️ {targetOrder.addressNote || 'Face Ambassade de Belgique, portail vert avec sonnette'}
                </span>
                <span style={{ fontSize: '0.6875rem', color: '#0b5738', fontWeight: 700 }}>
                  Repère bien identifié par le coursier moto
                </span>
              </div>
            </div>

            {/* Address & Delivery instructions banner */}
            <div style={{
              marginTop: '14px',
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              fontSize: '0.8125rem'
            }}>
              <strong style={{ color: '#92400e' }}>Instructions de livraison : </strong>
              <span style={{ color: '#78350f' }}>
                « {targetOrder.deliveryInstructions || 'Appeler dès l\'arrivée au carrefour Bastos. Ne pas klaxonner.'} »
              </span>
            </div>
          </div>

          {/* ORDER ITEMS TABLE */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '22px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid #f1f5f9'
            }}>
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
                  <Package size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    ORDER ITEMS (Articles commandés)
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Product, SKU, Quantity, Unit price, Discount, Subtotal</span>
                </div>
              </div>

              <span style={{
                backgroundColor: '#eff6ff',
                color: '#1d4ed8',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '6px'
              }}>
                2 articles vérifiés
              </span>
            </div>

            {/* Desktop Table for Items */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', color: '#475569', textTransform: 'uppercase', fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                    <th style={{ padding: '10px 12px' }}>Product</th>
                    <th style={{ padding: '10px 12px' }}>SKU</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Quantity</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Unit price</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Discount</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsWithSku.map((item) => (
                    <tr key={item.productId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      {/* Product */}
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={item.image}
                            alt={item.productName}
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                          />
                          <div>
                            <div style={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
                              {item.productName}
                            </div>
                            <span style={{ fontSize: '0.6875rem', color: '#0b5738', fontWeight: 700 }}>
                              ✓ Garantie IFPTIE 6 mois
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          fontFamily: 'monospace',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          backgroundColor: '#f1f5f9',
                          color: '#334155',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}>
                          {item.sku}
                        </span>
                      </td>

                      {/* Quantity */}
                      <td style={{ padding: '12px', textAlign: 'center', fontWeight: 900, color: '#0f172a' }}>
                        <span style={{
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          padding: '3px 10px',
                          borderRadius: '6px'
                        }}>
                          {item.quantity}
                        </span>
                      </td>

                      {/* Unit price */}
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#334155' }}>
                        {formatFCFA(item.unitPrice)}
                      </td>

                      {/* Discount */}
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 800, color: '#dc2626' }}>
                        -{formatFCFA(item.discountAmount)}
                      </td>

                      {/* Subtotal */}
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 900, color: '#0b5738', fontSize: '0.875rem' }}>
                        {formatFCFA(item.subtotalRow)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* INTERNAL NOTES SECTION */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '22px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid #f1f5f9'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Internal Notes Section (Remarques internes)
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Visibles uniquement par l'équipe administrative et les coursiers
                  </span>
                </div>
              </div>
            </div>

            {/* Add note input form */}
            <form onSubmit={handleAddNote} style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Ajouter une instruction ou remarque interne sur cette commande..."
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8125rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  style={{
                    backgroundColor: newNoteText.trim() ? '#0b5738' : '#e2e8f0',
                    color: newNoteText.trim() ? '#ffffff' : '#94a3b8',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 16px',
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    cursor: newNoteText.trim() ? 'pointer' : 'not-allowed',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Send size={14} />
                  <span>Ajouter</span>
                </button>
              </div>
            </form>

            {/* Notes history list */}
            <div style={{ display: 'grid', gap: '10px' }}>
              {notes.map((note) => (
                <div
                  key={note.id}
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '0.8125rem', color: '#0f172a' }}>{note.author}</strong>
                      <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>({note.role})</span>
                      {note.badge && (
                        <span style={{
                          backgroundColor: '#ecfdf5',
                          color: '#047857',
                          fontSize: '0.625rem',
                          fontWeight: 800,
                          padding: '1px 6px',
                          borderRadius: '4px'
                        }}>
                          {note.badge}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: '#94a3b8', fontWeight: 600 }}>
                      {note.timestamp}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#334155', margin: 0, lineHeight: 1.4 }}>
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================== */}
        {/* RIGHT SIDEBAR                                              */}
        {/* ========================================================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. PAYMENT CARD */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={18} color="#0b5738" />
              PAYMENT
            </h3>

            <div style={{ display: 'grid', gap: '10px', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Method :</span>
                <strong style={{ color: '#047857' }}>💵 Paiement à la livraison</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Payment status :</span>
                <span style={{
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  À encaisser par le coursier
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ color: '#64748b' }}>Amount :</span>
                <strong style={{ fontSize: '1.05rem', color: '#0b5738', fontWeight: 900 }}>
                  {formatFCFA(grandTotal)}
                </strong>
              </div>
            </div>
          </div>

          {/* 2. DELIVERY CARD */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={18} color="#0b5738" />
              DELIVERY
            </h3>

            <div style={{ display: 'grid', gap: '10px', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Zone :</span>
                <strong style={{ color: '#0f172a' }}>Yaoundé Bastos (Zone 1)</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Delivery fee :</span>
                <strong style={{ color: '#0f172a' }}>{formatFCFA(deliveryFee)}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Courier :</span>
                <strong style={{ color: '#0b5738', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Bike size={13} /> {courierAssigned}
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ color: '#64748b' }}>Delivery status :</span>
                <span style={{
                  backgroundColor: '#fff7ed',
                  color: '#c2410c',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  🚚 En route (estimé 15h30)
                </span>
              </div>
            </div>
          </div>

          {/* 3. FINANCIAL SUMMARY CARD */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '20px',
            border: '1.5px solid #0b5738',
            boxShadow: '0 2px 8px rgba(11,87,56,0.06)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0b5738', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DollarSign size={18} />
              FINANCIAL
            </h3>

            <div style={{ display: 'grid', gap: '8px', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Subtotal :</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatFCFA(grossSubtotal)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dc2626' }}>
                <span>Discount :</span>
                <span style={{ fontWeight: 800 }}>-{formatFCFA(totalDiscount)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Delivery :</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatFCFA(deliveryFee)}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '10px',
                marginTop: '4px',
                borderTop: '2px solid #e2e8f0',
                fontSize: '1.1rem',
                fontWeight: 900,
                color: '#0b5738'
              }}>
                <span>Total :</span>
                <span>{formatFCFA(grandTotal)}</span>
              </div>

              {/* Estimated Margin Section */}
              <div style={{
                marginTop: '12px',
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>
                      Estimated margin
                    </span>
                    <strong style={{ fontSize: '1.1rem', color: '#065f46', fontWeight: 900 }}>
                      +{formatFCFA(estimatedMargin)}
                    </strong>
                  </div>
                  <span style={{
                    backgroundColor: '#0b5738',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    {marginPercentage}%
                  </span>
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#047857', marginTop: '4px' }}>
                  Coût direct : {formatFCFA(estimatedCost)}
                </div>
              </div>
            </div>
          </div>

          {/* 4. ADMIN ACTIONS CARD */}
          <div style={{
            backgroundColor: '#072418',
            color: '#ffffff',
            borderRadius: '18px',
            padding: '22px',
            boxShadow: '0 4px 16px rgba(7, 36, 24, 0.25)'
          }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ffffff', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#f59e0b" />
              ADMIN ACTIONS
            </h3>

            <div style={{ display: 'grid', gap: '8px' }}>
              {/* Confirm */}
              <button
                onClick={handleConfirmOrder}
                style={{
                  backgroundColor: '#0b5738',
                  color: '#ffffff',
                  border: '1px solid #165b3d',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#4ade80" />
                  <span>Confirm</span>
                </div>
                <ChevronRight size={14} />
              </button>

              {/* Assign courier */}
              <button
                onClick={() => setShowAssignModal(true)}
                style={{
                  backgroundColor: '#0e3d29',
                  color: '#ffffff',
                  border: '1px solid #165b3d',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bike size={16} color="#f59e0b" />
                  <span>Assign courier</span>
                </div>
                <span style={{ fontSize: '0.6875rem', backgroundColor: '#072418', padding: '2px 6px', borderRadius: '4px' }}>
                  {courierAssigned.split(' ')[0]}
                </span>
              </button>

              {/* Change status */}
              <button
                onClick={() => setShowStatusModal(true)}
                style={{
                  backgroundColor: '#0e3d29',
                  color: '#ffffff',
                  border: '1px solid #165b3d',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={16} color="#a7f3d0" />
                  <span>Change status</span>
                </div>
                <span style={{ fontSize: '0.6875rem', color: '#f59e0b' }}>{currentStatus}</span>
              </button>

              {/* Contact customer */}
              <a
                href={`tel:${targetOrder.customerPhone}`}
                style={{
                  backgroundColor: '#0e3d29',
                  color: '#ffffff',
                  border: '1px solid #165b3d',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} color="#60a5fa" />
                  <span>Contact customer</span>
                </div>
                <span style={{ fontSize: '0.6875rem', color: '#93c5fd' }}>Appel</span>
              </a>

              {/* Print invoice */}
              <button
                onClick={handlePrintInvoice}
                style={{
                  backgroundColor: '#0e3d29',
                  color: '#ffffff',
                  border: '1px solid #165b3d',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Printer size={16} color="#cbd5e1" />
                  <span>Print invoice</span>
                </div>
                <span style={{ fontSize: '0.6875rem', color: '#cbd5e1' }}>PDF</span>
              </button>

              {/* Cancel */}
              <button
                onClick={handleCancelOrder}
                style={{
                  backgroundColor: '#261214',
                  color: '#fca5a5',
                  border: '1px solid #7f1d1d',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <XCircle size={16} color="#ef4444" />
                  <span>Cancel</span>
                </div>
                <span style={{ fontSize: '0.6875rem', color: '#ef4444' }}>Annuler</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* MODAL: ASSIGN COURIER */}
      {showAssignModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            maxWidth: '440px',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bike size={20} color="#0b5738" />
                Assign courier (Livreur)
              </h3>
              <button
                onClick={() => setShowAssignModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '0 0 16px' }}>
              Sélectionnez le livreur disponible pour la zone Bastos :
            </p>

            <div style={{ display: 'grid', gap: '8px', marginBottom: '18px' }}>
              {[
                { name: 'Arsène Mbida (Moto Express #01)', zone: 'Yaoundé Bastos / Centre', load: '1 course en cours' },
                { name: 'Jean Mbarga (Moto Express #02)', zone: 'Yaoundé Ouest / Biyem-Assi', load: 'Disponible' },
                { name: 'Michel Tchakounte (Moto Express #04)', zone: 'Douala Akwa', load: 'Douala uniquement' }
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleAssignCourier(c.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderRadius: '10px',
                    border: courierAssigned === c.name ? '2px solid #0b5738' : '1px solid #cbd5e1',
                    backgroundColor: courierAssigned === c.name ? '#ecfdf5' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a' }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>📍 {c.zone} • {c.load}</div>
                  </div>
                  <ChevronRight size={16} color="#0b5738" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAssignModal(false)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#f8fafc',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.8125rem'
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* MODAL: CHANGE STATUS */}
      {showStatusModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                Change status (Modifier le statut)
              </h3>
              <button
                onClick={() => setShowStatusModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gap: '8px', marginBottom: '18px' }}>
              {[
                { status: 'to_confirm', label: 'À confirmer', color: '#b45309' },
                { status: 'confirmed', label: 'Confirmée', color: '#1d4ed8' },
                { status: 'preparing', label: 'Préparation', color: '#d97706' },
                { status: 'in_transit', label: 'En livraison', color: '#c2410c' },
                { status: 'delivered', label: 'Livrée (remise réussie)', color: '#047857' },
                { status: 'failed', label: 'Échec de livraison', color: '#b91c1c' },
                { status: 'cancelled', label: 'Annulée', color: '#64748b' }
              ].map((s) => (
                <button
                  key={s.status}
                  onClick={() => handleStatusChange(s.status as OrderStatus)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: currentStatus === s.status ? '2px solid #0b5738' : '1px solid #cbd5e1',
                    backgroundColor: currentStatus === s.status ? '#ecfdf5' : '#ffffff',
                    cursor: 'pointer',
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    color: s.color
                  }}
                >
                  <span>{s.label}</span>
                  {currentStatus === s.status && <Check size={16} color="#0b5738" />}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowStatusModal(false)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#f8fafc',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.8125rem'
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
