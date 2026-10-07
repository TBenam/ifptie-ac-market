import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Truck,
  Package,
  Plus,
  ArrowUpRight,
  Clock,
  AlertTriangle,
  Bike,
  CheckCircle2,
  DollarSign,
  ChevronRight,
  TrendingUp,
  Search,
  Bell,
  MoreHorizontal,
  UserCheck,
  Send,
  Phone,
  MapPin,
  Sparkles,
  ExternalLink,
  Shield,
  Layers,
  Settings,
  X,
  CreditCard,
  MessageSquareQuote
} from 'lucide-react';
import { formatFCFA } from '../../utils/formatters';

interface MobileAdminProps {
  onNavigate: (viewId: string) => void;
  activeView: string;
  onOpenNewOrder?: () => void;
  onOpenAddProduct?: () => void;
  onOpenAssignDelivery?: () => void;
  onSwitchToStorefront?: () => void;
  onSwitchToCourier?: () => void;
}

export const AdminMobileDashboard: React.FC<MobileAdminProps> = ({
  onNavigate,
  activeView,
  onOpenNewOrder,
  onOpenAddProduct,
  onOpenAssignDelivery,
  onSwitchToStorefront,
  onSwitchToCourier
}) => {
  const [activeBottomNav, setActiveBottomNav] = useState<'dashboard' | 'commandes' | 'livraisons' | 'produits' | 'plus'>('dashboard');
  const [showPlusDrawer, setShowPlusDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile KPIs data
  const metrics = useMemo(() => ({
    revenue: 42850000,
    newOrders: 18,
    awaitingConfirmation: 7,
    deliveriesInProgress: 42,
    failedDeliveries: 3,
    courierAlerts: 2
  }), []);

  // Urgent attention orders
  const urgentOrders = [
    {
      id: 'IFM-10492',
      customer: 'Carine Etoa',
      phone: '+237 699 44 22 11',
      city: 'Yaoundé (Bastos)',
      amount: 45000,
      status: 'À confirmer',
      time: 'Il y a 12 min',
      product: 'Kit Solaire Autonome 200W'
    },
    {
      id: 'IFM-10488',
      customer: 'Paul Biya T.',
      phone: '+237 677 12 34 56',
      city: 'Douala (Bépanda)',
      amount: 28500,
      status: 'Client injoignable',
      time: 'Il y a 25 min',
      product: 'Lampe Solaire LED 100W'
    },
    {
      id: 'IFM-10476',
      customer: 'Mireille Ngo',
      phone: '+237 690 98 76 54',
      city: 'Douala (Makepe)',
      amount: 19500,
      status: 'Échec livraison',
      time: 'Il y a 40 min',
      product: 'Marmite Cuiseur Inox 9L'
    }
  ];

  // Active courier alerts
  const courierAlerts = [
    {
      id: 'alert-1',
      courier: 'Jean Fotso',
      zone: 'Douala (Deido)',
      issue: 'Panne moto sur axe Deido',
      impact: '3 livraisons à réassigner',
      time: 'Il y a 18 min'
    },
    {
      id: 'alert-2',
      courier: 'Samuel Nguemo',
      zone: 'Yaoundé (Mvan)',
      issue: 'Client absent au rendez-vous',
      impact: 'Attente 15 min dépassée',
      time: 'Il y a 32 min'
    }
  ];

  const handleBottomTabClick = (tab: 'dashboard' | 'commandes' | 'livraisons' | 'produits' | 'plus') => {
    setActiveBottomNav(tab);
    if (tab === 'plus') {
      setShowPlusDrawer(true);
    } else {
      setShowPlusDrawer(false);
      onNavigate(tab);
    }
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      paddingBottom: '85px', // Space for bottom navigation
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 0 25px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* =========================================================================
          MOBILE TOP BAR
         ========================================================================= */}
      <header style={{
        backgroundColor: '#0b5738',
        color: '#ffffff',
        padding: '16px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 2px 8px rgba(11,87,56,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '0.875rem'
            }}>
              IF
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 900, letterSpacing: '-0.3px', lineHeight: 1.1 }}>
                IFPTIE Market
              </div>
              <div style={{ fontSize: '0.6875rem', opacity: 0.85 }}>
                Admin Mobile • Live Cameroun 🇨🇲
              </div>
            </div>
          </div>

          {/* Quick Hub status & live ping */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              backgroundColor: 'rgba(16,185,129,0.25)',
              color: '#a7f3d0',
              fontSize: '0.6875rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#34d399' }}></span>
              EN DIRECT
            </span>
          </div>
        </div>

        {/* Quick Search */}
        <div style={{ position: 'relative' }}>
          <Search size={15} color="rgba(255,255,255,0.6)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Rechercher commande, client, coursier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#ffffff',
              fontSize: '0.8125rem',
              outline: 'none'
            }}
          />
        </div>
      </header>

      {/* =========================================================================
          MAIN MOBILE BODY
         ========================================================================= */}
      <main style={{ padding: '16px', flex: 1 }}>

        {/* =======================================================================
            SECTION 1: COMPACT KPI CARDS (Mobile Priority)
            Revenue, New orders, Awaiting confirmation, Deliveries in progress, Failed deliveries, Courier alerts
           ======================================================================= */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Métriques Clés (Temps Réel)
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Aujourd'hui</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px'
          }}>
            {/* KPI 1: Revenue (Plein écran sur 2 colonnes) */}
            <div style={{
              gridColumn: 'span 2',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              borderRadius: '14px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(15,23,42,0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
                  Chiffre d'affaires (Revenue)
                </span>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#34d399', marginTop: '2px' }}>
                  {formatFCFA(metrics.revenue)}
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginTop: '4px' }}>
                  +18.4% • Marge estimée : 35%
                </div>
              </div>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(52,211,153,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34d399'
              }}>
                <DollarSign size={22} />
              </div>
            </div>

            {/* KPI 2: New orders */}
            <div
              onClick={() => onNavigate('commandes')}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '14px',
                border: '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748b' }}>NOUVELLES CDES</span>
                <div style={{ width: '26px', height: '26px', borderRadius: '7px', backgroundColor: '#ecfdf5', color: '#0b5738', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingBag size={14} />
                </div>
              </div>
              <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 2px' }}>
                {metrics.newOrders}
              </div>
              <span style={{ fontSize: '0.6875rem', color: '#059669', fontWeight: 700 }}>
                ● À préparer
              </span>
            </div>

            {/* KPI 3: Orders awaiting confirmation */}
            <div
              onClick={() => onNavigate('commandes')}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '14px',
                border: '1px solid #fed7aa',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#9a3412' }}>À CONFIRMER</span>
                <div style={{ width: '26px', height: '26px', borderRadius: '7px', backgroundColor: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={14} />
                </div>
              </div>
              <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#c2410c', margin: '4px 0 2px' }}>
                {metrics.awaitingConfirmation}
              </div>
              <span style={{ fontSize: '0.6875rem', color: '#ea580c', fontWeight: 700 }}>
                Appel / WhatsApp requis
              </span>
            </div>

            {/* KPI 4: Deliveries in progress */}
            <div
              onClick={() => onNavigate('livraisons')}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '14px',
                border: '1px solid #bae6fd',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#0369a1' }}>EN ROUTE</span>
                <div style={{ width: '26px', height: '26px', borderRadius: '7px', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={14} />
                </div>
              </div>
              <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0369a1', margin: '4px 0 2px' }}>
                {metrics.deliveriesInProgress}
              </div>
              <span style={{ fontSize: '0.6875rem', color: '#0284c7', fontWeight: 700 }}>
                Sur le terrain
              </span>
            </div>

            {/* KPI 5: Failed deliveries */}
            <div
              onClick={() => onNavigate('livraisons')}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '14px',
                border: '1px solid #fecaca',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#991b1b' }}>ÉCHECS LIVR.</span>
                <div style={{ width: '26px', height: '26px', borderRadius: '7px', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertTriangle size={14} />
                </div>
              </div>
              <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#dc2626', margin: '4px 0 2px' }}>
                {metrics.failedDeliveries}
              </div>
              <span style={{ fontSize: '0.6875rem', color: '#dc2626', fontWeight: 700 }}>
                À reprogrammer
              </span>
            </div>

            {/* KPI 6: Courier alerts (Plein écran sur 2 colonnes) */}
            <div
              onClick={() => onNavigate('livreurs')}
              style={{
                gridColumn: 'span 2',
                backgroundColor: '#fffbeb',
                borderRadius: '14px',
                padding: '12px 16px',
                border: '1px solid #fde68a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bike size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#92400e' }}>
                    {metrics.courierAlerts} alertes livreurs actives
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#b45309' }}>
                    1 panne moto Deido • 1 client absent Mvan
                  </div>
                </div>
              </div>
              <ChevronRight size={18} color="#b45309" />
            </div>
          </div>
        </div>

        {/* =======================================================================
            SECTION 2: QUICK ACTIONS (Actions Rapides)
            Nouvelle commande, Ajouter produit, Affecter livraison, Voir commandes
           ======================================================================= */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
            Actions Rapides
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px'
          }}>
            {/* Action 1: Nouvelle commande */}
            <button
              onClick={() => {
                if (onOpenNewOrder) onOpenNewOrder();
                else onNavigate('commandes');
              }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#0b5738', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={18} />
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>
                Nouvelle commande
              </span>
            </button>

            {/* Action 2: Ajouter produit */}
            <button
              onClick={() => {
                if (onOpenAddProduct) onOpenAddProduct();
                else onNavigate('produits');
              }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={18} />
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>
                Ajouter produit
              </span>
            </button>

            {/* Action 3: Affecter livraison */}
            <button
              onClick={() => {
                if (onOpenAssignDelivery) onOpenAssignDelivery();
                else onNavigate('livraisons');
              }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bike size={18} />
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>
                Affecter livraison
              </span>
            </button>

            {/* Action 4: Voir commandes */}
            <button
              onClick={() => onNavigate('commandes')}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag size={18} />
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>
                Voir commandes
              </span>
            </button>
          </div>
        </div>

        {/* =======================================================================
            SECTION 3: URGENT ACTION FEED (Commandes & Alertes Terrain)
           ======================================================================= */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Commandes Urgentes ({urgentOrders.length})
            </span>
            <span
              onClick={() => onNavigate('commandes')}
              style={{ fontSize: '0.75rem', color: '#0b5738', fontWeight: 700, cursor: 'pointer' }}
            >
              Tout voir →
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {urgentOrders.map((ord) => (
              <div
                key={ord.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0f172a' }}>
                    {ord.customer}
                  </span>
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: ord.status === 'À confirmer' ? '#fff7ed' : '#fee2e2',
                    color: ord.status === 'À confirmer' ? '#c2410c' : '#dc2626'
                  }}>
                    {ord.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px' }}>
                  {ord.product} • {ord.city} • <strong style={{ color: '#0f172a' }}>{formatFCFA(ord.amount)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #f1f5f9', paddingTop: '8px' }}>
                  <span style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>{ord.time}</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <a
                      href={`tel:${ord.phone}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#f1f5f9',
                        color: '#334155',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      <Phone size={11} />
                      <span>Appeler</span>
                    </a>
                    <button
                      onClick={() => onNavigate('commandes')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#0b5738',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Traiter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =======================================================================
            SECTION 4: COURIER ALERTS (Alertes Livreurs sur le terrain)
           ======================================================================= */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Incidents & Alertes Livreurs ({courierAlerts.length})
            </span>
            <span
              onClick={() => onNavigate('livraisons')}
              style={{ fontSize: '0.75rem', color: '#0b5738', fontWeight: 700, cursor: 'pointer' }}
            >
              Dispatch →
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {courierAlerts.map((alt) => (
              <div
                key={alt.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  borderLeft: '4px solid #f59e0b',
                  borderTop: '1px solid #e2e8f0',
                  borderRight: '1px solid #e2e8f0',
                  borderBottom: '1px solid #e2e8f0'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Bike size={15} color="#d97706" />
                    <span style={{ fontWeight: 800, fontSize: '0.8125rem', color: '#0f172a' }}>{alt.courier}</span>
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>{alt.time}</span>
                </div>

                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309', marginTop: '4px' }}>
                  {alt.issue} ({alt.zone})
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>{alt.impact}</span>
                  <button
                    onClick={() => onNavigate('livraisons')}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#fef3c7',
                      color: '#b45309',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Réassigner
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* =========================================================================
          BOTTOM NAVIGATION (DASHBOARD, COMMANDES, LIVRAISONS, PRODUITS, PLUS)
         ========================================================================= */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: '600px',
        margin: '0 auto',
        height: '65px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        zIndex: 50,
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)'
      }}>
        {/* Tab 1: Dashboard */}
        <button
          onClick={() => handleBottomTabClick('dashboard')}
          style={{
            border: 'none',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            cursor: 'pointer',
            color: activeBottomNav === 'dashboard' ? '#0b5738' : '#94a3b8',
            transition: 'color 0.15s ease'
          }}
        >
          <LayoutDashboard size={20} />
          <span style={{ fontSize: '0.6875rem', fontWeight: activeBottomNav === 'dashboard' ? 800 : 500 }}>
            Dashboard
          </span>
        </button>

        {/* Tab 2: Commandes */}
        <button
          onClick={() => handleBottomTabClick('commandes')}
          style={{
            border: 'none',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            cursor: 'pointer',
            position: 'relative',
            color: activeBottomNav === 'commandes' ? '#0b5738' : '#94a3b8',
            transition: 'color 0.15s ease'
          }}
        >
          <div style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-8px',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              fontSize: '0.5625rem',
              fontWeight: 900,
              padding: '1px 4px',
              borderRadius: '8px'
            }}>
              18
            </span>
          </div>
          <span style={{ fontSize: '0.6875rem', fontWeight: activeBottomNav === 'commandes' ? 800 : 500 }}>
            Commandes
          </span>
        </button>

        {/* Tab 3: Livraisons */}
        <button
          onClick={() => handleBottomTabClick('livraisons')}
          style={{
            border: 'none',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            cursor: 'pointer',
            position: 'relative',
            color: activeBottomNav === 'livraisons' ? '#0b5738' : '#94a3b8',
            transition: 'color 0.15s ease'
          }}
        >
          <div style={{ position: 'relative' }}>
            <Truck size={20} />
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-8px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontSize: '0.5625rem',
              fontWeight: 900,
              padding: '1px 4px',
              borderRadius: '8px'
            }}>
              42
            </span>
          </div>
          <span style={{ fontSize: '0.6875rem', fontWeight: activeBottomNav === 'livraisons' ? 800 : 500 }}>
            Livraisons
          </span>
        </button>

        {/* Tab 4: Produits */}
        <button
          onClick={() => handleBottomTabClick('produits')}
          style={{
            border: 'none',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            cursor: 'pointer',
            color: activeBottomNav === 'produits' ? '#0b5738' : '#94a3b8',
            transition: 'color 0.15s ease'
          }}
        >
          <Package size={20} />
          <span style={{ fontSize: '0.6875rem', fontWeight: activeBottomNav === 'produits' ? 800 : 500 }}>
            Produits
          </span>
        </button>

        {/* Tab 5: Plus (Tiroir modules complémentaires) */}
        <button
          onClick={() => handleBottomTabClick('plus')}
          style={{
            border: 'none',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            cursor: 'pointer',
            color: activeBottomNav === 'plus' ? '#0b5738' : '#94a3b8',
            transition: 'color 0.15s ease'
          }}
        >
          <MoreHorizontal size={20} />
          <span style={{ fontSize: '0.6875rem', fontWeight: activeBottomNav === 'plus' ? 800 : 500 }}>
            Plus
          </span>
        </button>
      </nav>

      {/* =========================================================================
          DRAWER / SHEET "PLUS" (Autres modules admin)
         ========================================================================= */}
      {showPlusDrawer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15,23,42,0.6)',
          zIndex: 60,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px 24px 0 0',
            padding: '24px 20px 30px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a' }}>
                Modules Administrateur
              </div>
              <button
                onClick={() => setShowPlusDrawer(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
              {[
                { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: '#0b5738' },
                { id: 'finances', label: 'Finances', icon: DollarSign, color: '#0284c7' },
                { id: 'avis', label: 'Avis clients', icon: MessageSquareQuote, color: '#f59e0b' },
                { id: 'livreurs', label: 'Livreurs', icon: Bike, color: '#ea580c' },
                { id: 'zones', label: 'Zones', icon: MapPin, color: '#8b5cf6' },
                { id: 'promotions', label: 'Promotions', icon: Sparkles, color: '#ec4899' },
                { id: 'clients', label: 'Clients', icon: UserCheck, color: '#065f46' },
                { id: 'roles', label: 'Rôles RBAC', icon: Shield, color: '#334155' },
                { id: 'parametres', label: 'Paramètres', icon: Settings, color: '#64748b' },
              ].map((mod) => {
                const Icon = mod.icon;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setShowPlusDrawer(false);
                      onNavigate(mod.id);
                    }}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '14px 8px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: `${mod.color}15`, color: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b' }}>
                      {mod.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Portals Switcher */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  setShowPlusDrawer(false);
                  if (onSwitchToStorefront) onSwitchToStorefront();
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                🛍️ Voir Boutique
              </button>
              <button
                onClick={() => {
                  setShowPlusDrawer(false);
                  if (onSwitchToCourier) onSwitchToCourier();
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: '#fef3c7',
                  border: '1px solid #fde68a',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#92400e',
                  cursor: 'pointer'
                }}
              >
                🛵 Espace Coursier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
