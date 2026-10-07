import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import type { OrderStatus } from '../../types';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Grid, 
  Tag, 
  Users, 
  Bike, 
  Truck, 
  Building2, 
  MapPin, 
  BarChart3, 
  MessageSquareQuote, 
  Settings, 
  Search, 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  ChevronDown, 
  Filter, 
  RefreshCw, 
  Download, 
  ExternalLink, 
  Eye, 
  Phone, 
  ShieldCheck, 
  Zap, 
  Percent, 
  Layers, 
  DollarSign, 
  Plane,
  ChevronRight,
  Check,
  LogOut,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';
import { AdminOrdersView } from './AdminOrdersView';
import { AdminProductsView } from './AdminProductsView';
import { AdminCategoriesView } from './AdminCategoriesView';
import { AdminPromotionsView } from './AdminPromotionsView';
import { AdminCustomersView } from './AdminCustomersView';
import { AdminCouriersView } from './AdminCouriersView';
import { AdminDeliveryZonesView } from './AdminDeliveryZonesView';
import { AdminDeliveryOperationsView } from './AdminDeliveryOperationsView';
import { AdminAnalyticsView } from './AdminAnalyticsView';
import { AdminFinancesView } from './AdminFinancesView';
import { AdminReviewsView } from './AdminReviewsView';
import { AdminSettingsView } from './AdminSettingsView';
import { AdminRolesPermissionsView } from './AdminRolesPermissionsView';
import { AdminMobileDashboard } from './AdminMobileDashboard';
import { AdminNotificationCenter, INITIAL_NOTIFICATIONS } from './AdminNotificationCenter';
import type { AdminNotification } from './AdminNotificationCenter';
import { AdminLoginView } from './AdminLoginView';

export const AdminDashboard: React.FC = () => {
  const { orders, courierTasks, updateOrderStatus, setActiveTrackingNumber, setActiveView, addToast } = useStore();

  // Test environment authentication gate (hardcoded password: 1234567890)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ifptie_admin_authenticated') === 'true';
  });

  const handleLogout = () => {
    sessionStorage.removeItem('ifptie_admin_authenticated');
    setIsAuthenticated(false);
    addToast('Vous avez été déconnecté du Cockpit Admin', 'info');
  };

  // Responsive mobile screen detection
  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
  });
  const [isAdminMobileSidebarOpen, setIsAdminMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation sidebar item
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');

  // Mobile dashboard mode toggle (responsive or manual view preview)
  const [isMobileMode, setIsMobileMode] = useState(false);

  // Date filter state: 'today' | '7days' | '30days' | 'this_month' | 'custom'
  const [dateFilter, setDateFilter] = useState<'today' | '7days' | '30days' | 'this_month' | 'custom'>('7days');

  // Search filter for recent orders
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Top bar search
  const [globalSearch, setGlobalSearch] = useState('');

  // Notifications state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('Toutes les notifications ont été marquées comme lues', 'success');
  };

  // Date filter multipliers for dynamic metrics
  const getMultiplier = () => {
    switch (dateFilter) {
      case 'today': return 0.15;
      case '7days': return 1.0;
      case '30days': return 4.2;
      case 'this_month': return 3.8;
      case 'custom': return 1.5;
      default: return 1.0;
    }
  };
  const mult = getMultiplier();

  // Dynamic KPI calculations
  const baseRevenue = 12450000;
  const currentRevenue = Math.round(baseRevenue * mult);
  const previousRevenue = Math.round(currentRevenue * 0.88);
  const revenueGrowth = 14.2;

  const baseOrdersCount = 348;
  const currentOrdersCount = Math.round(baseOrdersCount * mult);
  const averageBasket = Math.round(currentRevenue / currentOrdersCount);

  const pendingConfirmCount = 18;
  const inTransitCount = 42;
  const deliveredCount = Math.round(274 * mult);
  const cancelledCount = Math.round(14 * mult);
  const estimatedMargin = Math.round(currentRevenue * 0.40);

  // Delivery performance
  const totalCompletedDeliveries = deliveredCount + cancelledCount;
  const deliverySuccessRate = totalCompletedDeliveries > 0 
    ? ((deliveredCount / totalCompletedDeliveries) * 100).toFixed(1) 
    : '95.1';

  // Sidebar navigation menu items matching prompt
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'commandes', label: 'Commandes', icon: ShoppingBag, badge: '18' },
    { id: 'produits', label: 'Produits', icon: Package, badge: null },
    { id: 'categories', label: 'Catégories', icon: Grid, badge: null },
    { id: 'promotions', label: 'Promotions', icon: Tag, badge: 'Actif' },
    { id: 'clients', label: 'Clients', icon: Users, badge: null },
    { id: 'livreurs', label: 'Livreurs', icon: Bike, badge: '6 en service' },
    { id: 'livraisons', label: 'Livraisons', icon: Truck, badge: '42' },
    { id: 'fournisseurs', label: 'Fournisseurs', icon: Building2, badge: 'Chine/CMR' },
    { id: 'zones', label: 'Zones de livraison', icon: MapPin, badge: null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'finances', label: 'Finances', icon: DollarSign, badge: 'Marge 35%' },
    { id: 'avis', label: 'Avis clients', icon: MessageSquareQuote, badge: '4.8/5' },
    { id: 'roles', label: 'Rôles & Permissions', icon: ShieldCheck, badge: 'RBAC' },
    { id: 'parametres', label: 'Paramètres', icon: Settings, badge: null },
  ];

  // Top products data
  const topProducts = [
    {
      id: 'p1',
      name: 'Lampe Solaire LED Rechargeable 100W IP67',
      sku: 'SOL-LED-100W',
      image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=100&auto=format&fit=crop&q=80',
      unitsSold: Math.round(142 * mult),
      revenue: Math.round(2115800 * mult),
      marginPct: 48,
      marginAmount: Math.round(1015500 * mult)
    },
    {
      id: 'p2',
      name: 'Kit Énergie Solaire Complet 500W Anti-délestage',
      sku: 'SOL-KIT-500W',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=100&auto=format&fit=crop&q=80',
      unitsSold: Math.round(45 * mult),
      revenue: Math.round(2250000 * mult),
      marginPct: 42,
      marginAmount: Math.round(945000 * mult)
    },
    {
      id: 'p3',
      name: 'Écouteurs Sans Fil TWS Bluetooth 5.3',
      sku: 'AUD-TWS-053',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&auto=format&fit=crop&q=80',
      unitsSold: Math.round(180 * mult),
      revenue: Math.round(1728000 * mult),
      marginPct: 55,
      marginAmount: Math.round(950400 * mult)
    },
    {
      id: 'p4',
      name: 'Robot Cuiseur Mixeur Multifonction 4-en-1',
      sku: 'HOM-MIX-4IN1',
      image: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=100&auto=format&fit=crop&q=80',
      unitsSold: Math.round(68 * mult),
      revenue: Math.round(1258000 * mult),
      marginPct: 38,
      marginAmount: Math.round(478040 * mult)
    },
    {
      id: 'p5',
      name: 'Beurre de Karité Bio Brut de Kribi (500g)',
      sku: 'BEA-KAR-500G',
      image: 'https://images.unsplash.com/photo-1608248597359-25f0a82b8813?w=100&auto=format&fit=crop&q=80',
      unitsSold: Math.round(210 * mult),
      revenue: Math.round(735000 * mult),
      marginPct: 62,
      marginAmount: Math.round(455700 * mult)
    }
  ];

  // Top categories breakdown
  const topCategories = [
    { name: 'Énergie & Solaire', sharePct: 35.1, revenue: Math.round(4365800 * mult), productCount: 28, color: '#f59e0b' },
    { name: 'High-Tech & Accessoires', sharePct: 24.0, revenue: Math.round(2988000 * mult), productCount: 95, color: '#3b82f6' },
    { name: 'Maison & Cuisine', sharePct: 20.0, revenue: Math.round(2490000 * mult), productCount: 64, color: '#10b981' },
    { name: 'Beauté & Bien-être', sharePct: 12.0, revenue: Math.round(1494000 * mult), productCount: 42, color: '#8b5cf6' },
    { name: 'Auto & Moto', sharePct: 8.9, revenue: Math.round(1112200 * mult), productCount: 31, color: '#ec4899' }
  ];

  // Top Couriers
  const topCouriers = [
    { name: 'Jean Mbarga', vehicle: 'Moto #02 (Yamaha)', zone: 'Yaoundé Ouest', assigned: 64, delivered: 61, failed: 3, rate: 95.3 },
    { name: 'Arsène Mbida', vehicle: 'Moto #01 (Boxer)', zone: 'Yaoundé Centre', assigned: 58, delivered: 56, failed: 2, rate: 96.6 },
    { name: 'Michel Tchakounte', vehicle: 'Moto #04 (Bajaj)', zone: 'Douala Akwa/Bonanjo', assigned: 72, delivered: 70, failed: 2, rate: 97.2 },
    { name: 'Serge Tsafack', vehicle: 'Moto #03 (TVS)', zone: 'Douala Bonabéri', assigned: 52, delivered: 48, failed: 4, rate: 92.3 },
  ];

  // Order Funnel Steps
  const funnelSteps = [
    { label: 'Nouvelles', count: currentOrdersCount, pct: 100, color: '#6366f1' },
    { label: 'Confirmées', count: Math.round(currentOrdersCount * 0.948), pct: 94.8, color: '#3b82f6' },
    { label: 'Préparées', count: Math.round(currentOrdersCount * 0.925), pct: 92.5, color: '#0ea5e9' },
    { label: 'En livraison', count: Math.round(currentOrdersCount * 0.908), pct: 90.8, color: '#f59e0b' },
    { label: 'Livrées', count: deliveredCount, pct: 78.7, color: '#10b981' },
    { label: 'Annulées', count: cancelledCount, pct: 4.0, color: '#ef4444' },
  ];

  // Filter recent orders
  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter !== 'all' && order.orderStatus !== orderStatusFilter) return false;
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      return (
        order.trackingNumber.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.customerPhone.toLowerCase().includes(q) ||
        order.city.toLowerCase().includes(q) ||
        order.neighborhood.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>Confirmée</span>;
      case 'preparing':
        return <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>Préparée</span>;
      case 'in_transit':
        return <span style={{ backgroundColor: '#fff7ed', color: '#c2410c', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>🚚 En livraison</span>;
      case 'delivered':
        return <span style={{ backgroundColor: '#ecfdf5', color: '#047857', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>✓ Livrée</span>;
      case 'cancelled':
        return <span style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>✕ Annulée</span>;
      default:
        return <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>{status}</span>;
    }
  };

  if (!isAuthenticated) {
    return <AdminLoginView onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>

      {/* MOBILE OVERLAY BACKDROP */}
      {isMobileScreen && isAdminMobileSidebarOpen && (
        <div 
          onClick={() => setIsAdminMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            zIndex: 998,
            backdropFilter: 'blur(3px)'
          }}
        />
      )}

      {/* ============================================================ */}
      {/* 1. LEFT SIDEBAR (Fixed on desktop, Slide-in Drawer on mobile) */}
      {/* ============================================================ */}
      <aside style={{
        width: '270px',
        maxWidth: '85vw',
        backgroundColor: '#072418',
        color: '#f1f5f9',
        display: isMobileScreen ? (isAdminMobileSidebarOpen ? 'flex' : 'none') : 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        borderRight: '1px solid #0f3928',
        position: isMobileScreen ? 'fixed' : 'sticky',
        top: 0,
        left: 0,
        bottom: isMobileScreen ? 0 : 'auto',
        height: '100vh',
        overflowY: 'auto',
        zIndex: isMobileScreen ? 999 : 20,
        boxShadow: isMobileScreen ? '8px 0 24px rgba(0,0,0,0.4)' : 'none'
      }}>
        {/* Brand Header */}
        <div style={{
          padding: '20px 20px 18px',
          borderBottom: '1px solid #0e3d29',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#f59e0b',
              color: '#072418',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.2rem',
              boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)'
            }}>
              IF
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.3px', color: '#ffffff' }}>
                IFPTIE <span style={{ color: '#f59e0b' }}>Market</span>
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#a7f3d0', fontWeight: 700, letterSpacing: '0.5px' }}>
                COCKPIT OPÉRATIONNEL
              </div>
            </div>
          </div>

          {isMobileScreen && (
            <button
              onClick={() => setIsAdminMobileSidebarOpen(false)}
              aria-label="Fermer le menu admin"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Sidebar Nav Items */}
        <nav style={{ padding: '16px 12px', flex: 1, display: 'grid', gap: '4px' }}>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSidebarItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSidebarItem(item.id);
                  if (isMobileScreen) setIsAdminMobileSidebarOpen(false);
                  if (item.id !== 'dashboard') {
                    addToast(`Vue administrative ${item.label} activée`, 'info');
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: isActive ? '#0f4832' : 'transparent',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} color={isActive ? '#f59e0b' : '#94a3b8'} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    padding: '2px 7px',
                    borderRadius: '999px',
                    backgroundColor: isActive ? '#f59e0b' : '#0e3d29',
                    color: isActive ? '#072418' : '#a7f3d0'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Bottom Footer */}
        <div style={{
          padding: '16px 18px',
          borderTop: '1px solid #0e3d29',
          backgroundColor: '#051d13'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#a7f3d0', marginBottom: '10px' }}>
            <span>🇨🇲 Hub Central Mvan</span>
            <span style={{ color: '#86efac' }}>● Connecté</span>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#fca5a5',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: '8px',
              transition: 'all 0.2s'
            }}
            title="Se déconnecter"
          >
            <LogOut size={14} />
            <span>Déconnexion</span>
          </button>

          <div style={{ fontSize: '0.6875rem', color: '#64748b', textAlign: 'center' }}>
            IFPTIE Commerce OS • v2.6.4
          </div>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* 2. MAIN CONTENT AREA (TOP BAR + DASHBOARD CONTENT)           */}
      {/* ============================================================ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>

        {/* TOP BAR */}
        <header style={{
          minHeight: '58px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: isMobileScreen ? '8px 12px' : '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          gap: '10px'
        }}>
          {/* Left section: Hamburger button on mobile OR global search on desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: isMobileScreen ? 1 : 'none' }}>
            {isMobileScreen && (
              <button
                onClick={() => setIsAdminMobileSidebarOpen(true)}
                aria-label="Ouvrir le menu navigation admin"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: '#f1f5f9',
                  border: '1.5px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#072418',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                title="Menu Admin"
              >
                <Menu size={22} />
              </button>
            )}

            {isMobileScreen ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#072418', lineHeight: 1.1 }}>
                  IFPTIE Admin
                </span>
                <span style={{ fontSize: '0.72rem', color: '#0b5738', fontWeight: 700, textTransform: 'capitalize' }}>
                  {sidebarItems.find(s => s.id === activeSidebarItem)?.label || activeSidebarItem}
                </span>
              </div>
            ) : (
              <div style={{ position: 'relative', width: '380px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  placeholder="Rechercher commande, client, produit, coursier..."
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 38px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}
          </div>

          {/* Top Bar Actions & Admin Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobileScreen ? '8px' : '14px' }}>
            {!isMobileScreen && (
              <button
                onClick={() => setIsMobileMode(!isMobileMode)}
                style={{
                  backgroundColor: isMobileMode ? '#0b5738' : '#f1f5f9',
                  border: isMobileMode ? '1px solid #0b5738' : '1px solid #cbd5e1',
                  color: isMobileMode ? '#ffffff' : '#334155',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                title="Basculer vers la vue Admin Mobile responsive"
              >
                <span>📱 {isMobileMode ? 'Vue Bureau' : 'Aperçu Mobile'}</span>
              </button>
            )}

            <button
              onClick={() => setActiveView('storefront')}
              style={{
                backgroundColor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                color: '#334155',
                padding: isMobileScreen ? '6px 10px' : '7px 12px',
                borderRadius: '8px',
                fontSize: isMobileScreen ? '0.75rem' : '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Retourner à la boutique client"
            >
              <span>🛍️ Boutique</span>
            </button>

            {!isMobileScreen && (
              <button
                onClick={() => setActiveView('courier')}
                style={{
                  backgroundColor: '#fef3c7',
                  border: '1px solid #fde68a',
                  color: '#92400e',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>🛵 Espace Coursier</span>
              </button>
            )}

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <Bell size={18} />
                {unreadNotificationsCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    fontSize: '0.625rem',
                    fontWeight: 900,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #ffffff'
                  }}>
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '46px',
                  right: 0,
                  zIndex: 50,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}>
                  <AdminNotificationCenter
                    notifications={notifications}
                    onMarkAsRead={handleMarkNotificationAsRead}
                    onMarkAllAsRead={handleMarkAllNotificationsAsRead}
                    onSelectAction={(targetView) => {
                      setActiveSidebarItem(targetView);
                      setShowNotifications(false);
                    }}
                    onClose={() => setShowNotifications(false)}
                  />
                </div>
              )}
            </div>

            {/* Admin Profile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingLeft: '8px',
              borderLeft: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#0b5738',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.875rem'
              }}>
                AD
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a' }}>
                  Admin IFPTIE
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                  Super Administrateur
                </div>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#fee2e2',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  padding: '7px 10px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginLeft: '4px'
                }}
                title="Se déconnecter de la session admin"
              >
                <LogOut size={14} />
                <span>Sortir</span>
              </button>
            </div>
          </div>
        </header>

        {/* MOBILE SUBHEADER BREADCRUMB WHEN VIEWING SUBVIEWS */}
        {isMobileScreen && activeSidebarItem !== 'dashboard' && (
          <div style={{
            padding: '10px 14px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}>
            <button
              onClick={() => setActiveSidebarItem('dashboard')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                color: '#0f172a'
              }}
            >
              <ArrowLeft size={15} />
              <span>Tableau de bord</span>
            </button>

            <span style={{
              fontSize: '0.8125rem',
              fontWeight: 800,
              color: '#0b5738',
              backgroundColor: '#ecfdf5',
              padding: '4px 10px',
              borderRadius: '6px'
            }}>
              {sidebarItems.find(s => s.id === activeSidebarItem)?.label || activeSidebarItem}
            </span>
          </div>
        )}

        {/* DASHBOARD BODY */}
        <main style={{ 
          padding: isMobileScreen 
            ? '12px 10px 80px' 
            : ((activeSidebarItem === 'commandes' || activeSidebarItem === 'produits' || activeSidebarItem === 'categories' || activeSidebarItem === 'promotions' || activeSidebarItem === 'clients' || activeSidebarItem === 'livreurs' || activeSidebarItem === 'zones' || activeSidebarItem === 'livraisons' || activeSidebarItem === 'analytics') ? '0' : '24px 28px 60px'),
          flex: 1,
          width: '100%',
          overflowX: 'auto',
          boxSizing: 'border-box'
        }}>
          {activeSidebarItem === 'commandes' ? (
            <AdminOrdersView 
              onSelectOrderTracking={(num) => {
                setActiveTrackingNumber(num);
                setActiveView('tracking');
              }}
            />
          ) : activeSidebarItem === 'produits' ? (
            <AdminProductsView />
          ) : activeSidebarItem === 'categories' ? (
            <AdminCategoriesView />
          ) : activeSidebarItem === 'promotions' ? (
            <AdminPromotionsView />
          ) : activeSidebarItem === 'clients' ? (
            <AdminCustomersView />
          ) : activeSidebarItem === 'livreurs' ? (
            <AdminCouriersView />
          ) : activeSidebarItem === 'zones' ? (
            <AdminDeliveryZonesView />
          ) : activeSidebarItem === 'livraisons' ? (
            <AdminDeliveryOperationsView />
          ) : activeSidebarItem === 'analytics' ? (
            <AdminAnalyticsView />
          ) : activeSidebarItem === 'finances' ? (
            <AdminFinancesView />
          ) : activeSidebarItem === 'avis' ? (
            <AdminReviewsView />
          ) : activeSidebarItem === 'roles' ? (
            <AdminRolesPermissionsView />
          ) : activeSidebarItem === 'parametres' ? (
            <AdminSettingsView />
          ) : (isMobileScreen || isMobileMode) ? (
            <AdminMobileDashboard
              activeView={activeSidebarItem}
              onNavigate={(viewId) => {
                setActiveSidebarItem(viewId);
              }}
              onOpenNewOrder={() => {
                setActiveSidebarItem('commandes');
              }}
              onOpenAddProduct={() => {
                setActiveSidebarItem('produits');
              }}
              onOpenAssignDelivery={() => {
                setActiveSidebarItem('livraisons');
              }}
              onSwitchToStorefront={() => setActiveView('storefront')}
              onSwitchToCourier={() => setActiveView('courier')}
            />
          ) : (
            <>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
                  Bonjour, Admin 👋
                </h1>
                <span style={{
                  backgroundColor: '#ecfdf5',
                  color: '#065f46',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  ● LIVE
                </span>
              </div>
              <p style={{ fontSize: '0.9375rem', color: '#64748b', margin: '4px 0 0' }}>
                Voici les performances de IFPTIE Market.
              </p>
            </div>

            {/* DATE FILTER BUTTONS */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '4px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              {(['today', '7days', '30days', 'this_month', 'custom'] as const).map((filterKey) => {
                const labels = {
                  today: "Aujourd'hui",
                  '7days': '7 jours',
                  '30days': '30 jours',
                  this_month: 'Ce mois',
                  custom: 'Personnalisé'
                };
                const isSelected = dateFilter === filterKey;

                return (
                  <button
                    key={filterKey}
                    onClick={() => {
                      setDateFilter(filterKey);
                      addToast(`Période sélectionnée : ${labels[filterKey]}`, 'info');
                    }}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: isSelected ? '#0b5738' : 'transparent',
                      color: isSelected ? '#ffffff' : '#475569',
                      fontSize: '0.8125rem',
                      fontWeight: isSelected ? 800 : 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {labels[filterKey]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* 3. 8 KPI CARDS GRID                                          */}
          {/* ============================================================ */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px',
            marginBottom: '24px'
          }}>
            {/* 1. Chiffre d'affaires */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '18px 20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Chiffre d'affaires
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center' }}>
                  <ArrowUpRight size={14} /> +{revenueGrowth}%
                </span>
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#073b26', marginTop: '6px' }}>
                {formatFCFA(currentRevenue)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                vs {formatFCFA(previousRevenue)} période préc.
              </div>
            </div>

            {/* 2. Commandes */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '18px 20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Commandes
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center' }}>
                  <ArrowUpRight size={14} /> +8.5%
                </span>
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>
                {currentOrdersCount} <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>colis</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                Douala: 54% • Yaoundé: 46%
              </div>
            </div>

            {/* 3. Panier moyen */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '18px 20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Panier moyen
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center' }}>
                  <ArrowUpRight size={14} /> +5.1%
                </span>
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>
                {formatFCFA(averageBasket)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                2.3 articles par panier
              </div>
            </div>

            {/* 4. Commandes à confirmer */}
            <div style={{
              backgroundColor: '#fffbeb',
              borderRadius: '16px',
              padding: '18px 20px',
              border: '1.5px solid #fde68a',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
                  À confirmer
                </span>
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#92400e', backgroundColor: '#fef3c7', padding: '2px 6px', borderRadius: '4px' }}>
                  Appels requis
                </span>
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#92400e', marginTop: '6px' }}>
                {pendingConfirmCount}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#b45309', marginTop: '4px' }}>
                Délai moyen d'appel : 12 min
              </div>
            </div>

            {/* 5. En livraison */}
            <div style={{
              backgroundColor: '#eff6ff',
              borderRadius: '16px',
              padding: '18px 20px',
              border: '1.5px solid #bfdbfe',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase' }}>
                  En livraison
                </span>
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#1d4ed8', backgroundColor: '#dbeafe', padding: '2px 6px', borderRadius: '4px' }}>
                  Tournées motos
                </span>
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#1d4ed8', marginTop: '6px' }}>
                {inTransitCount}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#3b82f6', marginTop: '4px' }}>
                6 livreurs actifs sur le terrain
              </div>
            </div>

            {/* 6. Livrées */}
            <div style={{
              backgroundColor: '#ecfdf5',
              borderRadius: '16px',
              padding: '18px 20px',
              border: '1.5px solid #a7f3d0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase' }}>
                  Livrées & encaissées
                </span>
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#047857', backgroundColor: '#d1fae5', padding: '2px 6px', borderRadius: '4px' }}>
                  ✓ {deliverySuccessRate}%
                </span>
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#047857', marginTop: '6px' }}>
                {deliveredCount}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '4px' }}>
                Taux de remise en main propre
              </div>
            </div>

            {/* 7. Annulées */}
            <div style={{
              backgroundColor: '#fef2f2',
              borderRadius: '16px',
              padding: '18px 20px',
              border: '1.5px solid #fecaca',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#991b1b', textTransform: 'uppercase' }}>
                  Annulées / Échecs
                </span>
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#b91c1c', backgroundColor: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>
                  3.9%
                </span>
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#b91c1c', marginTop: '6px' }}>
                {cancelledCount}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '4px' }}>
                Motif principal : client injoignable
              </div>
            </div>

            {/* 8. Marge estimée */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '18px 20px',
              border: '1.5px solid #0b5738',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#064e3b', textTransform: 'uppercase' }}>
                  Marge estimée
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0b5738' }}>
                  40.0% marge brute
                </span>
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#0b5738', marginTop: '6px' }}>
                {formatFCFA(estimatedMargin)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '4px' }}>
                Après fret et frais coursiers
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 4. REVENUE CHART (Compare current vs previous period)        */}
          {/* ============================================================ */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Chiffre d'affaires
                </h2>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '2px 0 0' }}>
                  Comparaison période actuelle vs période précédente (FCFA)
                </p>
              </div>

              {/* Chart Legend */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8125rem', fontWeight: 700 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#0b5738', display: 'inline-block' }} />
                  <span>Période actuelle ({formatFCFA(currentRevenue)})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#cbd5e1', display: 'inline-block' }} />
                  <span style={{ color: '#64748b' }}>Période précédente ({formatFCFA(previousRevenue)})</span>
                </div>
              </div>
            </div>

            {/* SVG Interactive Visual Chart */}
            <div style={{ width: '100%', height: '240px', position: 'relative' }}>
              <svg viewBox="0 0 800 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Horizontal Grid lines */}
                <line x1="40" y1="30" x2="780" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="80" x2="780" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="130" x2="780" y2="130" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="180" x2="780" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />

                {/* Y-axis labels */}
                <text x="5" y="34" fontSize="10" fill="#94a3b8">2.5M</text>
                <text x="5" y="84" fontSize="10" fill="#94a3b8">1.8M</text>
                <text x="5" y="134" fontSize="10" fill="#94a3b8">1.0M</text>
                <text x="5" y="184" fontSize="10" fill="#94a3b8">0</text>

                {/* Previous Period Line (Dashed Slate) */}
                <path
                  d="M 60 150 Q 180 140, 300 110 T 540 120 T 760 95"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                />

                {/* Current Period Area Gradient */}
                <defs>
                  <linearGradient id="currentRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0b5738" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0b5738" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path
                  d="M 60 140 Q 180 110, 300 70 T 540 85 T 760 45 L 760 180 L 60 180 Z"
                  fill="url(#currentRevGrad)"
                />

                {/* Current Period Line (Solid Emerald) */}
                <path
                  d="M 60 140 Q 180 110, 300 70 T 540 85 T 760 45"
                  fill="none"
                  stroke="#0b5738"
                  strokeWidth="3.5"
                />

                {/* Data point checkpoints */}
                {[
                  { x: 60, y: 140, label: 'Lun' },
                  { x: 180, y: 110, label: 'Mar' },
                  { x: 300, y: 70, label: 'Mer' },
                  { x: 420, y: 88, label: 'Jeu' },
                  { x: 540, y: 85, label: 'Ven' },
                  { x: 650, y: 60, label: 'Sam' },
                  { x: 760, y: 45, label: 'Dim (Pic)' },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#0b5738" strokeWidth="3" />
                    <text x={pt.x} y="200" fontSize="11" fontWeight="700" fill="#64748b" textAnchor="middle">
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 5. ORDER FUNNEL & DELIVERY PERFORMANCE (2 COLUMNS)          */}
          {/* ============================================================ */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '20px',
            marginBottom: '24px'
          }}>
            {/* ORDER FUNNEL */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '22px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Entonnoir des commandes
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Taux de transformation par étape</span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0b5738', backgroundColor: '#ecfdf5', padding: '3px 8px', borderRadius: '6px' }}>
                  {deliveredCount} Livrées au final
                </span>
              </div>

              {/* Funnel bars */}
              <div style={{ display: 'grid', gap: '12px' }}>
                {funnelSteps.map((step, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span style={{ color: '#334155' }}>{step.label}</span>
                      <span style={{ color: '#0f172a' }}>
                        {step.count} ({step.pct}%)
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '10px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${step.pct}%`,
                        height: '100%',
                        backgroundColor: step.color,
                        borderRadius: '999px',
                        transition: 'width 0.4s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DELIVERY PERFORMANCE */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '22px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Performance de livraison
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Remise en main propre par les coursiers</span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', backgroundColor: '#eff6ff', padding: '3px 8px', borderRadius: '6px' }}>
                  Moto Express CMR
                </span>
              </div>

              {/* 3 Metrics Requested */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#f0fdf4', padding: '12px 8px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                    Successful
                  </div>
                  <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#15803d', marginTop: '2px' }}>
                    {deliveredCount}
                  </div>
                </div>

                <div style={{ backgroundColor: '#fef2f2', padding: '12px 8px', borderRadius: '12px', border: '1px solid #fecaca' }}>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#991b1b', textTransform: 'uppercase' }}>
                    Failed
                  </div>
                  <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#b91c1c', marginTop: '2px' }}>
                    {cancelledCount}
                  </div>
                </div>

                <div style={{ backgroundColor: '#eff6ff', padding: '12px 8px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase' }}>
                    Success Rate
                  </div>
                  <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#1d4ed8', marginTop: '2px' }}>
                    {deliverySuccessRate}%
                  </div>
                </div>
              </div>

              {/* Geographic split Douala vs Yaoundé */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Répartition par ville active :
                </span>
                <div style={{ display: 'grid', gap: '8px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                    <span>🇨🇲 <strong>Douala</strong> (Akwa, Bonapriso, Bonabéri)</span>
                    <strong style={{ color: '#059669' }}>96.2% de succès (158 livraisons)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                    <span>🇨🇲 <strong>Yaoundé</strong> (Bastos, Omnisports, Mvan)</span>
                    <strong style={{ color: '#059669' }}>94.0% de succès (116 livraisons)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 6. TOP PRODUCTS & TOP CATEGORIES (2 COLUMNS)                 */}
          {/* ============================================================ */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px',
            marginBottom: '24px'
          }}>
            {/* TOP PRODUCTS */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '22px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Top Produits
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Classés par volume & marge</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                      <th style={{ paddingBottom: '8px' }}>Produit</th>
                      <th style={{ paddingBottom: '8px', textAlign: 'center' }}>Ventes</th>
                      <th style={{ paddingBottom: '8px', textAlign: 'right' }}>Chiffre d'affaires</th>
                      <th style={{ paddingBottom: '8px', textAlign: 'right' }}>Marge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={p.image} alt={p.name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                          <div style={{ maxWidth: '180px' }}>
                            <div style={{ fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {p.name}
                            </div>
                            <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>{p.sku}</div>
                          </div>
                        </td>
                        <td style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 800, color: '#1e293b' }}>
                          {p.unitsSold}
                        </td>
                        <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 800, color: '#0b5738' }}>
                          {formatFCFA(p.revenue)}
                        </td>
                        <td style={{ padding: '10px 0', textAlign: 'right' }}>
                          <span style={{ fontWeight: 800, color: '#059669', backgroundColor: '#ecfdf5', padding: '2px 6px', borderRadius: '4px' }}>
                            {p.marginPct}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TOP CATEGORIES */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '22px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Top Catégories
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Part des ventes & catalogue</span>
              </div>

              <div style={{ display: 'grid', gap: '14px' }}>
                {topCategories.map((c, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span style={{ color: '#1e293b' }}>{c.name} ({c.productCount} réf.)</span>
                      <span style={{ color: '#0b5738' }}>
                        {formatFCFA(c.revenue)} ({c.sharePct}%)
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${c.sharePct}%`,
                        height: '100%',
                        backgroundColor: c.color,
                        borderRadius: '999px'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 7. TOP COURIERS TABLE                                        */}
          {/* ============================================================ */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '22px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Top Livreurs (Flotte Express IFPTIE)
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Suivi des tournées quotidiennes et encaissements</span>
              </div>
              <button
                onClick={() => setActiveView('courier')}
                style={{
                  backgroundColor: '#0b5738',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Gérer les coursiers
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                    <th style={{ paddingBottom: '10px' }}>Livreur</th>
                    <th style={{ paddingBottom: '10px' }}>Zone</th>
                    <th style={{ paddingBottom: '10px', textAlign: 'center' }}>Assignées</th>
                    <th style={{ paddingBottom: '10px', textAlign: 'center' }}>Livrées</th>
                    <th style={{ paddingBottom: '10px', textAlign: 'center' }}>Échecs</th>
                    <th style={{ paddingBottom: '10px', textAlign: 'right' }}>Taux de succès</th>
                  </tr>
                </thead>
                <tbody>
                  {topCouriers.map((c, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 0' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{c.name}</div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{c.vehicle}</div>
                      </td>
                      <td style={{ padding: '12px 0', color: '#334155' }}>
                        📍 {c.zone}
                      </td>
                      <td style={{ padding: '12px 0', textAlign: 'center', fontWeight: 700 }}>
                        {c.assigned}
                      </td>
                      <td style={{ padding: '12px 0', textAlign: 'center', fontWeight: 800, color: '#059669' }}>
                        {c.delivered}
                      </td>
                      <td style={{ padding: '12px 0', textAlign: 'center', fontWeight: 800, color: '#dc2626' }}>
                        {c.failed}
                      </td>
                      <td style={{ padding: '12px 0', textAlign: 'right' }}>
                        <span style={{
                          backgroundColor: c.rate >= 95 ? '#ecfdf5' : '#fffbeb',
                          color: c.rate >= 95 ? '#047857' : '#b45309',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontWeight: 900
                        }}>
                          {c.rate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 8. RECENT ORDERS TABLE (Detailed Operational Grid)           */}
          {/* ============================================================ */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '22px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Commandes Récentes
                  </h3>
                  <button
                    onClick={() => setActiveSidebarItem('commandes')}
                    style={{
                      backgroundColor: '#ecfdf5',
                      color: '#065f46',
                      border: '1px solid #a7f3d0',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Gérer toutes ({orders.length})</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Dispatch en direct et statut des paiements</span>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '220px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Filtrer commande..."
                    style={{
                      width: '100%',
                      padding: '7px 10px 7px 30px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8125rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="confirmed">Confirmée</option>
                  <option value="preparing">En préparation</option>
                  <option value="in_transit">En livraison</option>
                  <option value="delivered">Livrée</option>
                  <option value="cancelled">Annulée</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                    <th style={{ paddingBottom: '10px' }}>Order ID</th>
                    <th style={{ paddingBottom: '10px' }}>Customer</th>
                    <th style={{ paddingBottom: '10px' }}>Amount</th>
                    <th style={{ paddingBottom: '10px' }}>Payment</th>
                    <th style={{ paddingBottom: '10px' }}>Status</th>
                    <th style={{ paddingBottom: '10px' }}>Courier</th>
                    <th style={{ paddingBottom: '10px' }}>Date</th>
                    <th style={{ paddingBottom: '10px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 0' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#0b5738' }}>
                          #{order.trackingNumber}
                        </span>
                        {order.trackingNumber === 'IFM-10482' && (
                          <span style={{ marginLeft: '6px', fontSize: '0.625rem', backgroundColor: '#fef3c7', color: '#92400e', padding: '1px 4px', borderRadius: '3px', fontWeight: 800 }}>
                            ⭐ P1
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px 0' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{order.customerName}</div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{order.city} • {order.neighborhood}</div>
                      </td>
                      <td style={{ padding: '12px 0', fontWeight: 800, color: '#0f172a' }}>
                        {formatFCFA(order.total)}
                      </td>
                      <td style={{ padding: '12px 0' }}>
                        <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
                          {order.paymentMethod === 'cash_on_delivery' ? '💵 Cash livraison' : '📱 Mobile Money'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 0' }}>
                        {getStatusBadge(order.orderStatus)}
                      </td>
                      <td style={{ padding: '12px 0' }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155' }}>
                          {order.courierName || 'Jean Mbarga'}
                        </div>
                      </td>
                      <td style={{ padding: '12px 0', fontSize: '0.75rem', color: '#64748b' }}>
                        {order.createdAt || "Aujourd'hui"}
                      </td>
                      <td style={{ padding: '12px 0', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={() => setActiveSidebarItem('commandes')}
                            style={{
                              backgroundColor: '#ecfdf5',
                              border: '1px solid #a7f3d0',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              color: '#065f46'
                            }}
                            title="Ouvrir la gestion détaillée de cette commande"
                          >
                            <span>Gérer</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveTrackingNumber(order.trackingNumber);
                              setActiveView('tracking');
                            }}
                            style={{
                              backgroundColor: '#f1f5f9',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#334155'
                            }}
                            title="Voir le suivi en direct"
                          >
                            <Eye size={12} />
                            <span>Suivi</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            </>
          )}
        </main>
      </div>

    </div>
  );
};
