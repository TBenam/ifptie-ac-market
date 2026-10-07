import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  ShoppingBag,
  Clock,
  AlertTriangle,
  Package,
  Bike,
  CreditCard,
  Tag,
  Star,
  Check,
  CheckCheck,
  ChevronRight,
  X,
  ExternalLink,
  Trash2,
  Filter
} from 'lucide-react';

export type NotificationCategory =
  | 'new_order'
  | 'awaiting_confirmation'
  | 'delivery_failure'
  | 'low_stock'
  | 'courier_issue'
  | 'payment_issue'
  | 'promotion_ending'
  | 'new_review';

export interface AdminNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  time: string;
  relatedEntity: {
    type: 'order' | 'product' | 'courier' | 'promotion' | 'review';
    id: string;
    label: string;
  };
  read: boolean;
  actionLabel: string;
  targetView: string;
}

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-1',
    category: 'new_order',
    title: 'Nouvelle commande reçue',
    description: 'Carine Etoa a commandé 1x Kit Solaire Autonome 200W pour Bastos, Yaoundé.',
    time: 'Il y a 5 min',
    relatedEntity: {
      type: 'order',
      id: 'IFM-10492',
      label: 'Commande #IFM-10492 • 45 000 FCFA'
    },
    read: false,
    actionLabel: 'Traiter la commande',
    targetView: 'commandes'
  },
  {
    id: 'notif-2',
    category: 'awaiting_confirmation',
    title: 'Commande en attente de confirmation',
    description: 'Client injoignable après 2 tentatives d appel pour validation de l adresse à Bépanda.',
    time: 'Il y a 22 min',
    relatedEntity: {
      type: 'order',
      id: 'IFM-10488',
      label: 'Commande #IFM-10488 • Paul Biya T.'
    },
    read: false,
    actionLabel: 'Relancer WhatsApp',
    targetView: 'commandes'
  },
  {
    id: 'notif-3',
    category: 'delivery_failure',
    title: 'Échec de livraison signalé',
    description: 'Le coursier Samuel Nguemo signale : client absent au rendez-vous à Makepe Douala.',
    time: 'Il y a 45 min',
    relatedEntity: {
      type: 'order',
      id: 'IFM-10476',
      label: 'Colis #IFM-10476 • Samuel Nguemo'
    },
    read: false,
    actionLabel: 'Reprogrammer livraison',
    targetView: 'livraisons'
  },
  {
    id: 'notif-4',
    category: 'low_stock',
    title: 'Alerte stock critique',
    description: 'Plus que 3 unités disponibles pour Kit Solaire LED 100W (Seuil minimum : 10).',
    time: 'Il y a 1h',
    relatedEntity: {
      type: 'product',
      id: 'SOL-LED-100W',
      label: 'Produit SOL-LED-100W • Stock : 3'
    },
    read: false,
    actionLabel: 'Commander fournisseur',
    targetView: 'produits'
  },
  {
    id: 'notif-5',
    category: 'courier_issue',
    title: 'Incident coursier en mission',
    description: 'Panne moto signalée par Jean Fotso sur l axe Akwa-Deido. 4 livraisons en cours impactées.',
    time: 'Il y a 2h',
    relatedEntity: {
      type: 'courier',
      id: 'cour-1',
      label: 'Livreur Jean Fotso • Moto n°3'
    },
    read: false,
    actionLabel: 'Réassigner les colis',
    targetView: 'livraisons'
  },
  {
    id: 'notif-6',
    category: 'payment_issue',
    title: 'Anomalie de paiement Mobile Money',
    description: 'Échec webhook Orange Money : montant débité mais transaction non confirmée sur #IFM-10465.',
    time: 'Il y a 3h',
    relatedEntity: {
      type: 'order',
      id: 'IFM-10465',
      label: 'Transaction OM #TX-98421 • 18 500 FCFA'
    },
    read: true,
    actionLabel: 'Vérifier passerelle',
    targetView: 'finances'
  },
  {
    id: 'notif-7',
    category: 'promotion_ending',
    title: 'Fin de promotion imminente',
    description: 'La Vente Flash "Rentrée Solaire" (-25%) expire ce soir à 23h59.',
    time: 'Il y a 4h',
    relatedEntity: {
      type: 'promotion',
      id: 'promo-rentree',
      label: 'Flash Sale • Rentrée Solaire'
    },
    read: true,
    actionLabel: 'Prolonger l offre',
    targetView: 'promotions'
  },
  {
    id: 'notif-8',
    category: 'new_review',
    title: 'Nouvel avis client 5 étoiles',
    description: 'Rosine Kemgang a laissé un avis élogieux sur la Marmite Cuiseur Pression Inox 9L.',
    time: 'Il y a 5h',
    relatedEntity: {
      type: 'review',
      id: 'rev-2',
      label: 'Avis 5/5 • CUIS-PRES-9L'
    },
    read: true,
    actionLabel: 'Répondre à l avis',
    targetView: 'avis'
  }
];

interface NotificationCenterProps {
  notifications: AdminNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onSelectAction: (targetView: string) => void;
  onClose?: () => void;
  isFullView?: boolean;
}

export const AdminNotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onSelectAction,
  onClose,
  isFullView = false
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');

  // Badge unread calculation
  const unreadCount = notifications.filter(n => !n.read).length;

  const getCategoryDetails = (cat: NotificationCategory) => {
    switch (cat) {
      case 'new_order':
        return { icon: ShoppingBag, color: '#0b5738', bg: '#ecfdf5', label: 'Nouvelle commande' };
      case 'awaiting_confirmation':
        return { icon: Clock, color: '#f59e0b', bg: '#fffbeb', label: 'En attente confirmation' };
      case 'delivery_failure':
        return { icon: AlertTriangle, color: '#ef4444', bg: '#fef2f2', label: 'Échec livraison' };
      case 'low_stock':
        return { icon: Package, color: '#dc2626', bg: '#fee2e2', label: 'Stock bas' };
      case 'courier_issue':
        return { icon: Bike, color: '#ea580c', bg: '#fff7ed', label: 'Incident livreur' };
      case 'payment_issue':
        return { icon: CreditCard, color: '#9333ea', bg: '#faf5ff', label: 'Problème paiement' };
      case 'promotion_ending':
        return { icon: Tag, color: '#2563eb', bg: '#eff6ff', label: 'Promo expirante' };
      case 'new_review':
        return { icon: Star, color: '#d97706', bg: '#fef3c7', label: 'Nouvel avis' };
      default:
        return { icon: Bell, color: '#64748b', bg: '#f1f5f9', label: 'Notification' };
    }
  };

  // Filtered notifications
  const filtered = notifications.filter(n => {
    const matchesCat = filterCategory === 'all' || n.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || (filterStatus === 'unread' ? !n.read : n.read);
    return matchesCat && matchesStatus;
  });

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: isFullView ? '18px' : '16px',
      border: '1px solid #e2e8f0',
      boxShadow: isFullView ? '0 4px 12px rgba(0,0,0,0.03)' : '0 15px 35px rgba(0,0,0,0.18)',
      width: isFullView ? '100%' : '440px',
      maxWidth: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: isFullView ? 'none' : '620px'
    }}>
      {/* HEADER */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: '#ecfdf5',
            color: '#0b5738',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bell size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                Centre de Notifications
              </h3>
              {unreadCount > 0 && (
                <span style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: '12px'
                }}>
                  {unreadCount} non lues
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Alertes opérationnelles en direct IFPTIE Market
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: 'none',
                background: 'transparent',
                color: '#0b5738',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '6px'
              }}
              title="Marquer toutes les notifications comme lues"
            >
              <CheckCheck size={15} />
              <span>Tout marquer lu</span>
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: '#64748b',
                padding: '4px'
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* FILTER BAR */}
      <div style={{
        padding: '10px 16px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        flexWrap: 'wrap',
        fontSize: '0.75rem'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setFilterStatus('all')}
            style={{
              border: 'none',
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: filterStatus === 'all' ? '#0f172a' : '#f1f5f9',
              color: filterStatus === 'all' ? '#ffffff' : '#475569',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Toutes ({notifications.length})
          </button>
          <button
            onClick={() => setFilterStatus('unread')}
            style={{
              border: 'none',
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: filterStatus === 'unread' ? '#dc2626' : '#f1f5f9',
              color: filterStatus === 'unread' ? '#ffffff' : '#475569',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Non lues ({unreadCount})
          </button>
        </div>

        {/* Category selector */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            fontSize: '0.75rem',
            padding: '3px 6px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            color: '#334155'
          }}
        >
          <option value="all">Toutes catégories</option>
          <option value="new_order">Nouvelle commande</option>
          <option value="awaiting_confirmation">Attente confirmation</option>
          <option value="delivery_failure">Échec livraison</option>
          <option value="low_stock">Stock bas</option>
          <option value="courier_issue">Incident livreur</option>
          <option value="payment_issue">Problème paiement</option>
          <option value="promotion_ending">Fin promotion</option>
          <option value="new_review">Nouvel avis</option>
        </select>
      </div>

      {/* NOTIFICATIONS LIST */}
      <div style={{
        overflowY: 'auto',
        flex: 1,
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {filtered.map((notif) => {
          const config = getCategoryDetails(notif.category);
          const Icon = config.icon;

          return (
            <div
              key={notif.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '12px',
                backgroundColor: notif.read ? '#ffffff' : '#f8fafc',
                border: notif.read ? '1px solid #f1f5f9' : `1.5px solid ${config.color}30`,
                boxShadow: notif.read ? 'none' : '0 2px 4px rgba(0,0,0,0.02)',
                position: 'relative',
                transition: 'all 0.15s ease'
              }}
            >
              {/* Unread blue/red indicator dot */}
              {!notif.read && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#dc2626'
                }}></span>
              )}

              {/* Icon */}
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: config.bg,
                color: config.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={18} />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: notif.read ? 700 : 800,
                    color: '#0f172a'
                  }}>
                    {notif.title}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                    {notif.time}
                  </span>
                </div>

                <p style={{
                  margin: '4px 0 6px',
                  fontSize: '0.8125rem',
                  color: '#475569',
                  lineHeight: '1.4'
                }}>
                  {notif.description}
                </p>

                {/* Related Entity (order, product, courier, etc.) */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#f1f5f9',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  color: '#334155',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}>
                  <span>🔗 {notif.relatedEntity.label}</span>
                </div>

                {/* Bottom Row: Actions & Mark as Read */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '6px',
                  borderTop: '1px dashed #e2e8f0'
                }}>
                  {/* Action Button */}
                  <button
                    onClick={() => {
                      onMarkAsRead(notif.id);
                      onSelectAction(notif.targetView);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: config.bg,
                      color: config.color,
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <span>{notif.actionLabel}</span>
                    <ChevronRight size={13} />
                  </button>

                  {/* Mark as read button */}
                  {!notif.read ? (
                    <button
                      onClick={() => onMarkAsRead(notif.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        border: 'none',
                        background: 'transparent',
                        color: '#64748b',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                      title="Marquer comme lu"
                    >
                      <Check size={12} />
                      <span>Marquer lu</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                      ✓ Lu
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '36px 16px', color: '#94a3b8' }}>
            <CheckCircle2 size={36} color="#cbd5e1" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155' }}>
              Aucune notification
            </div>
            <div style={{ fontSize: '0.75rem' }}>
              Toutes les alertes de cette catégorie ont été traitées !
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
