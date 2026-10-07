import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import type { Order, OrderStatus } from '../../types';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Bike, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Eye, 
  Phone, 
  Download, 
  Printer, 
  UserCheck, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw,
  RotateCcw,
  SlidersHorizontal,
  X,
  Check,
  Package,
  Layers,
  PhoneCall
} from 'lucide-react';

import { AdminOrderDetailView } from './AdminOrderDetailView';

interface AdminOrdersViewProps {
  onSelectOrderTracking?: (trackingNum: string) => void;
}

export const AdminOrdersView: React.FC<AdminOrdersViewProps> = ({ onSelectOrderTracking }) => {
  const { orders, updateOrderStatus, setActiveTrackingNumber, setActiveView, addToast } = useStore();

  // Selected Order for Detailed View
  const [selectedOrderDetailId, setSelectedOrderDetailId] = useState<string | null>(null);

  // Top Controls Filters
  const [searchOrder, setSearchOrder] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [filterDate, setFilterDate] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [filterStatusSelect, setFilterStatusSelect] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [filterCourier, setFilterCourier] = useState('all');

  // Active Status Tab
  // Options: 'all' | 'new' | 'to_confirm' | 'confirmed' | 'preparing' | 'in_transit' | 'delivered' | 'failed' | 'cancelled'
  const [activeTab, setActiveTab] = useState<string>('all');

  // Bulk selection state
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCourierToAssign, setSelectedCourierToAssign] = useState('Jean Mbarga (Moto #02)');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Status mapping for tabs
  const statusTabs = [
    { key: 'all', label: 'Toutes' },
    { key: 'new', label: 'Nouvelles' },
    { key: 'to_confirm', label: 'À confirmer' },
    { key: 'confirmed', label: 'Confirmées' },
    { key: 'preparing', label: 'Préparation' },
    { key: 'in_transit', label: 'En livraison' },
    { key: 'delivered', label: 'Livrées' },
    { key: 'failed', label: 'Échec' },
    { key: 'cancelled', label: 'Annulées' }
  ];

  // Extended mock orders for rich demonstration of all tabs
  const allOrdersList: Order[] = useMemo(() => {
    // Generate synthetic orders if needed to demonstrate full catalog of statuses
    const base = [...orders];

    if (!base.some(o => o.orderStatus === 'to_confirm')) {
      base.push({
        id: 'ord-synth-01',
        trackingNumber: 'IFM-10490',
        customerName: 'Béatrice Ngono',
        customerPhone: '+237 699 11 22 33',
        city: 'Yaoundé',
        neighborhood: 'Mendong (Montée Jouvence)',
        items: [{ productId: 'p1', productName: 'Mixeur Plongeant 4-en-1', price: 18500, quantity: 1, image: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=200&auto=format&fit=crop&q=80' }],
        subtotal: 18500,
        deliveryFee: 1500,
        total: 20000,
        paymentMethod: 'cash_on_delivery',
        paymentStatus: 'pay_on_delivery',
        orderStatus: 'to_confirm',
        createdAt: 'Aujourd\'hui, 15:30',
        estimatedDeliveryDate: 'Demain'
      });
    }

    if (!base.some(o => o.orderStatus === 'new')) {
      base.push({
        id: 'ord-synth-02',
        trackingNumber: 'IFM-10491',
        customerName: 'Georges Ebanda',
        customerPhone: '+237 670 44 55 66',
        city: 'Douala',
        neighborhood: 'Bonabéri (Quatre Étages)',
        items: [{ productId: 'p2', productName: 'Lampe Solaire 100W', price: 14900, quantity: 2, image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=200&auto=format&fit=crop&q=80' }],
        subtotal: 29800,
        deliveryFee: 1500,
        total: 31300,
        paymentMethod: 'mtn_momo',
        paymentStatus: 'pending',
        orderStatus: 'new',
        createdAt: 'Il y a 10 min',
        estimatedDeliveryDate: 'Demain'
      });
    }

    if (!base.some(o => o.orderStatus === 'failed')) {
      base.push({
        id: 'ord-synth-03',
        trackingNumber: 'IFM-10478',
        customerName: 'Paul Biwole',
        customerPhone: '+237 698 22 11 00',
        city: 'Yaoundé',
        neighborhood: 'Biyem-Assi (Rond-point Express)',
        items: [{ productId: 'p3', productName: 'Tondeuse Rechargeable Pro', price: 15500, quantity: 1, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&auto=format&fit=crop&q=80' }],
        subtotal: 15500,
        deliveryFee: 1500,
        total: 17000,
        paymentMethod: 'cash_on_delivery',
        paymentStatus: 'pay_on_delivery',
        orderStatus: 'failed',
        createdAt: 'Aujourd\'hui, 10:00',
        estimatedDeliveryDate: 'Aujourd\'hui',
        courierName: 'Jean Mbarga (Moto #02)'
      });
    }

    if (!base.some(o => o.orderStatus === 'cancelled')) {
      base.push({
        id: 'ord-synth-04',
        trackingNumber: 'IFM-10475',
        customerName: 'Marthe Fosso',
        customerPhone: '+237 671 99 88 77',
        city: 'Douala',
        neighborhood: 'Akwa (Boulevard Liberté)',
        items: [{ productId: 'p4', productName: 'Pack Énergie Solaire 500W', price: 50000, quantity: 1, image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=200&auto=format&fit=crop&q=80' }],
        subtotal: 50000,
        deliveryFee: 1500,
        total: 51500,
        paymentMethod: 'cash_on_delivery',
        paymentStatus: 'pending',
        orderStatus: 'cancelled',
        createdAt: 'Hier, 18:20',
        estimatedDeliveryDate: 'Annulée'
      });
    }

    return base;
  }, [orders]);

  // Tab counts calculation
  const getTabCount = (tabKey: string) => {
    if (tabKey === 'all') return allOrdersList.length;
    return allOrdersList.filter(o => o.orderStatus === tabKey).length;
  };

  // Filtered Orders Logic
  const filteredOrders = useMemo(() => {
    return allOrdersList.filter(order => {
      // Tab filter
      if (activeTab !== 'all' && order.orderStatus !== activeTab) return false;

      // Status select filter
      if (filterStatusSelect !== 'all' && order.orderStatus !== filterStatusSelect) return false;

      // Search Order (number)
      if (searchOrder.trim()) {
        const q = searchOrder.trim().toLowerCase();
        if (!order.trackingNumber.toLowerCase().includes(q)) return false;
      }

      // Search Customer (name or phone)
      if (searchCustomer.trim()) {
        const q = searchCustomer.trim().toLowerCase();
        const matchesName = order.customerName.toLowerCase().includes(q);
        const matchesPhone = order.customerPhone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, ''));
        if (!matchesName && !matchesPhone) return false;
      }

      // City filter
      if (filterCity !== 'all') {
        if (!order.city.toLowerCase().includes(filterCity.toLowerCase())) return false;
      }

      // Payment filter
      if (filterPayment !== 'all') {
        if (order.paymentMethod !== filterPayment) return false;
      }

      // Courier filter
      if (filterCourier !== 'all') {
        if (filterCourier === 'unassigned') {
          if (order.courierName) return false;
        } else {
          if (!order.courierName || !order.courierName.toLowerCase().includes(filterCourier.toLowerCase())) return false;
        }
      }

      return true;
    });
  }, [allOrdersList, activeTab, filterStatusSelect, searchOrder, searchCustomer, filterCity, filterPayment, filterCourier]);

  // Pagination slicing
  const totalOrdersCount = filteredOrders.length;
  const totalPages = Math.ceil(totalOrdersCount / rowsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredOrders.slice(start, start + rowsPerPage);
  }, [filteredOrders, currentPage, rowsPerPage]);

  // Bulk actions handlers
  const handleSelectAllOnPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const pageIds = paginatedOrders.map(o => o.id);
      setSelectedOrderIds(Array.from(new Set([...selectedOrderIds, ...pageIds])));
    } else {
      const pageIds = new Set(paginatedOrders.map(o => o.id));
      setSelectedOrderIds(selectedOrderIds.filter(id => !pageIds.has(id)));
    }
  };

  const handleToggleSelectOrder = (id: string) => {
    setSelectedOrderIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkChangeStatus = (newStatus: OrderStatus) => {
    selectedOrderIds.forEach(id => {
      updateOrderStatus(id, newStatus);
    });
    addToast(`✓ Statut mis à jour pour ${selectedOrderIds.length} commande(s) !`, 'success');
    setSelectedOrderIds([]);
  };

  const handleBulkAssignCourier = () => {
    addToast(`🛵 ${selectedOrderIds.length} commande(s) assignée(s) à ${selectedCourierToAssign} !`, 'success');
    setShowAssignModal(false);
    setSelectedOrderIds([]);
  };

  const handleBulkExport = () => {
    addToast(`📥 Export CSV généré pour ${selectedOrderIds.length || filteredOrders.length} commande(s) !`, 'success');
  };

  const handleBulkPrint = () => {
    addToast(`🖨️ Impression des bordereaux d'expédition lancée (${selectedOrderIds.length || paginatedOrders.length} colis) !`, 'info');
  };

  const handleResetFilters = () => {
    setSearchOrder('');
    setSearchCustomer('');
    setFilterDate('all');
    setFilterCity('all');
    setFilterStatusSelect('all');
    setFilterPayment('all');
    setFilterCourier('all');
    setActiveTab('all');
    setCurrentPage(1);
    addToast('Filtres réinitialisés', 'info');
  };

  // Status Badge Helper
  const renderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return (
          <span style={{ backgroundColor: '#f3e8ff', color: '#7e22ce', border: '1px solid #d8b4fe', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
            Nouvelle
          </span>
        );
      case 'to_confirm':
        return (
          <span style={{ backgroundColor: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
            À confirmer
          </span>
        );
      case 'confirmed':
        return (
          <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
            Confirmée
          </span>
        );
      case 'preparing':
        return (
          <span style={{ backgroundColor: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
            Préparation
          </span>
        );
      case 'in_transit':
        return (
          <span style={{ backgroundColor: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
            🚚 En livraison
          </span>
        );
      case 'delivered':
        return (
          <span style={{ backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
            ✓ Livrée
          </span>
        );
      case 'failed':
        return (
          <span style={{ backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
            ⚠️ Échec
          </span>
        );
      case 'cancelled':
        return (
          <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid #cbd5e1', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
            ✕ Annulée
          </span>
        );
      default:
        return (
          <span style={{ backgroundColor: '#f8fafc', color: '#475569', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
            {status}
          </span>
        );
    }
  };

  const isAllPageSelected = paginatedOrders.length > 0 && paginatedOrders.every(o => selectedOrderIds.includes(o.id));

  // If an order is selected for detailed management, display the detailed view
  if (selectedOrderDetailId) {
    return (
      <AdminOrderDetailView
        orderId={selectedOrderDetailId}
        onBack={() => setSelectedOrderDetailId(null)}
        onSelectOrderTracking={onSelectOrderTracking}
      />
    );
  }

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>

      {/* 1. PAGE HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
              Commandes
            </h1>
            <span style={{
              backgroundColor: '#0b5738',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>
              {totalOrdersCount} au total
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '4px 0 0' }}>
            Gestion centralisée, dispatch des tournées coursiers et validation des encaissements au Cameroun.
          </p>
        </div>

        {/* Top Header Quick Actions */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedOrderDetailId('ord-10482')}
            style={{
              backgroundColor: '#fef3c7',
              color: '#92400e',
              border: '1px solid #fde68a',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(245, 158, 11, 0.15)'
            }}
          >
            <span>⭐ Fiche détaillée #IFM-10482</span>
          </button>

          <button
            onClick={handleBulkExport}
            style={{
              backgroundColor: '#ffffff',
              color: '#1e293b',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download size={15} />
            <span>Exporter CSV</span>
          </button>

          <button
            onClick={handleBulkPrint}
            style={{
              backgroundColor: '#0b5738',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Printer size={15} />
            <span>Imprimer bordereaux</span>
          </button>
        </div>
      </div>

      {/* 2. TOP CONTROLS (SEARCH & FILTERS PANEL) */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '18px 20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          alignItems: 'center'
        }}>
          {/* 1. Search order */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              N° Commande
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Ex: IFM-10482"
                value={searchOrder}
                onChange={(e) => setSearchOrder(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px 8px 30px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.8125rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* 2. Search customer */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Client / Téléphone
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Nom ou 6XX XX XX"
                value={searchCustomer}
                onChange={(e) => setSearchCustomer(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px 8px 30px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.8125rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* 3. Filter date */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Date
            </label>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8125rem',
                backgroundColor: '#ffffff',
                outline: 'none'
              }}
            >
              <option value="all">Toutes dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="7days">7 derniers jours</option>
              <option value="30days">30 derniers jours</option>
              <option value="this_month">Ce mois</option>
            </select>
          </div>

          {/* 4. Filter city */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Ville
            </label>
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8125rem',
                backgroundColor: '#ffffff',
                outline: 'none'
              }}
            >
              <option value="all">Toutes villes</option>
              <option value="Yaoundé">Yaoundé</option>
              <option value="Douala">Douala</option>
              <option value="Bafoussam">Bafoussam</option>
              <option value="Kribi">Kribi</option>
              <option value="Garoua">Garoua</option>
            </select>
          </div>

          {/* 5. Filter status */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Statut
            </label>
            <select
              value={filterStatusSelect}
              onChange={(e) => setFilterStatusSelect(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8125rem',
                backgroundColor: '#ffffff',
                outline: 'none'
              }}
            >
              <option value="all">Tous statuts</option>
              <option value="new">Nouvelles</option>
              <option value="to_confirm">À confirmer</option>
              <option value="confirmed">Confirmées</option>
              <option value="preparing">Préparation</option>
              <option value="in_transit">En livraison</option>
              <option value="delivered">Livrées</option>
              <option value="failed">Échec</option>
              <option value="cancelled">Annulées</option>
            </select>
          </div>

          {/* 6. Filter payment */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Règlement
            </label>
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8125rem',
                backgroundColor: '#ffffff',
                outline: 'none'
              }}
            >
              <option value="all">Tous modes</option>
              <option value="cash_on_delivery">Espèces à la livraison</option>
              <option value="orange_money">Orange Money</option>
              <option value="mtn_momo">MTN Mobile Money</option>
            </select>
          </div>

          {/* 7. Filter courier */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Livreur
            </label>
            <select
              value={filterCourier}
              onChange={(e) => setFilterCourier(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8125rem',
                backgroundColor: '#ffffff',
                outline: 'none'
              }}
            >
              <option value="all">Tous livreurs</option>
              <option value="Jean">Jean Mbarga (Moto #02)</option>
              <option value="Arsène">Arsène Mbida (Moto #01)</option>
              <option value="Michel">Michel Tchakounte (Moto #04)</option>
              <option value="Serge">Serge Tsafack (Moto #03)</option>
              <option value="unassigned">Non assigné</option>
            </select>
          </div>

          {/* Reset Filters button */}
          <div style={{ paddingTop: '18px' }}>
            <button
              onClick={handleResetFilters}
              style={{
                width: '100%',
                backgroundColor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#475569',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <RotateCcw size={13} />
              <span>Réinitialiser</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. STATUS TABS */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '16px',
        scrollbarWidth: 'none'
      }}>
        {statusTabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          const count = getTabCount(tab.key);

          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setCurrentPage(1);
              }}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                border: isSelected ? '2px solid #0b5738' : '1px solid #cbd5e1',
                backgroundColor: isSelected ? '#0b5738' : '#ffffff',
                color: isSelected ? '#ffffff' : '#334155',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 800 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                backgroundColor: isSelected ? '#ffffff' : '#f1f5f9',
                color: isSelected ? '#0b5738' : '#64748b',
                fontSize: '0.6875rem',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: '999px'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. BULK ACTIONS FLOATING TOOLBAR */}
      {selectedOrderIds.length > 0 && (
        <div style={{
          backgroundColor: '#072418',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '14px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 4px 16px rgba(7, 36, 24, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ backgroundColor: '#f59e0b', color: '#072418', fontWeight: 900, padding: '2px 8px', borderRadius: '999px', fontSize: '0.75rem' }}>
              {selectedOrderIds.length}
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
              commande(s) sélectionnée(s)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* Action 1: Assign Courier */}
            <button
              onClick={() => setShowAssignModal(true)}
              style={{
                backgroundColor: '#ffffff',
                color: '#072418',
                border: 'none',
                borderRadius: '8px',
                padding: '7px 12px',
                fontSize: '0.75rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Bike size={14} />
              <span>Assigner livreur</span>
            </button>

            {/* Action 2: Change Status Dropdown */}
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleBulkChangeStatus(e.target.value as OrderStatus);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              style={{
                backgroundColor: '#0e3d29',
                color: '#ffffff',
                border: '1px solid #165b3d',
                borderRadius: '8px',
                padding: '7px 12px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="" disabled>Changer statut...</option>
              <option value="confirmed">Marquer Confirmées</option>
              <option value="preparing">Marquer Préparation</option>
              <option value="in_transit">Marquer En livraison</option>
              <option value="delivered">Marquer Livrées</option>
              <option value="cancelled">Marquer Annulées</option>
            </select>

            {/* Action 3: Export */}
            <button
              onClick={handleBulkExport}
              style={{
                backgroundColor: '#0e3d29',
                color: '#ffffff',
                border: '1px solid #165b3d',
                borderRadius: '8px',
                padding: '7px 12px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Download size={13} />
              <span>Export</span>
            </button>

            {/* Action 4: Print */}
            <button
              onClick={handleBulkPrint}
              style={{
                backgroundColor: '#0e3d29',
                color: '#ffffff',
                border: '1px solid #165b3d',
                borderRadius: '8px',
                padding: '7px 12px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Printer size={13} />
              <span>Imprimer</span>
            </button>

            {/* Deselect */}
            <button
              onClick={() => setSelectedOrderIds([])}
              style={{
                backgroundColor: 'transparent',
                color: '#fca5a5',
                border: 'none',
                padding: '7px 10px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Désélectionner
            </button>
          </div>
        </div>
      )}

      {/* 5. TABLE / CARDS CONTAINER */}
      <style>{`
        .admin-orders-desktop-table {
          display: block;
          overflow-x: auto;
        }
        .admin-orders-mobile-cards {
          display: none;
        }
        @media (max-width: 900px) {
          .admin-orders-desktop-table {
            display: none !important;
          }
          .admin-orders-mobile-cards {
            display: flex !important;
            flex-direction: column;
            gap: 12px;
            padding: 14px;
          }
        }
      `}</style>

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        overflow: 'hidden',
        marginBottom: '16px'
      }}>
        
        {/* DESKTOP TABLE VIEW (Visible on desktop screens > 900px) */}
        <div className="admin-orders-desktop-table">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', color: '#475569', textTransform: 'uppercase', fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                <th style={{ padding: '14px 16px', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={isAllPageSelected}
                    onChange={handleSelectAllOnPage}
                    style={{ width: '16px', height: '16px', accentColor: '#0b5738', cursor: 'pointer' }}
                  />
                </th>
                <th style={{ padding: '14px 12px' }}>Commande</th>
                <th style={{ padding: '14px 12px' }}>Client</th>
                <th style={{ padding: '14px 12px' }}>Téléphone</th>
                <th style={{ padding: '14px 12px' }}>Montant</th>
                <th style={{ padding: '14px 12px' }}>Paiement</th>
                <th style={{ padding: '14px 12px' }}>Ville</th>
                <th style={{ padding: '14px 12px' }}>Livreur</th>
                <th style={{ padding: '14px 12px' }}>Statut</th>
                <th style={{ padding: '14px 12px' }}>Date</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ padding: '40px 16px', textAlign: 'center', color: '#64748b' }}>
                    <AlertCircle size={32} color="#94a3b8" style={{ marginBottom: '8px' }} />
                    <div style={{ fontWeight: 700 }}>Aucune commande ne correspond aux filtres sélectionnés.</div>
                    <button
                      onClick={handleResetFilters}
                      style={{ marginTop: '10px', padding: '6px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                    >
                      Réinitialiser les filtres
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const isSelected = selectedOrderIds.includes(order.id);

                  return (
                    <tr
                      key={order.id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      {/* Checkbox */}
                      <td style={{ padding: '14px 16px' }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOrder(order.id)}
                          style={{ width: '16px', height: '16px', accentColor: '#0b5738', cursor: 'pointer' }}
                        />
                      </td>

                      {/* Commande */}
                      <td style={{ padding: '14px 12px' }}>
                        <div
                          onClick={() => setSelectedOrderDetailId(order.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                          title="Cliquer pour ouvrir la gestion détaillée"
                        >
                          <span style={{ fontFamily: 'monospace', fontWeight: 900, color: '#0b5738', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                            #{order.trackingNumber}
                          </span>
                          {order.trackingNumber === 'IFM-10482' && (
                            <span style={{ fontSize: '0.625rem', fontWeight: 800, backgroundColor: '#fef3c7', color: '#92400e', padding: '1px 5px', borderRadius: '4px' }}>
                              ⭐ PRIORITAIRE
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '2px' }}>
                          {order.items.length} article(s)
                        </div>
                      </td>

                      {/* Client */}
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{order.customerName}</div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Client vérifié IFPTIE</div>
                      </td>

                      {/* Téléphone */}
                      <td style={{ padding: '14px 12px' }}>
                        <a
                          href={`tel:${order.customerPhone}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#0b5738',
                            fontWeight: 700,
                            textDecoration: 'none'
                          }}
                        >
                          <Phone size={12} />
                          <span>{order.customerPhone}</span>
                        </a>
                      </td>

                      {/* Montant */}
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ fontWeight: 900, color: '#0f172a', fontSize: '0.9375rem' }}>
                          {formatFCFA(order.total)}
                        </div>
                      </td>

                      {/* Paiement */}
                      <td style={{ padding: '14px 12px' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: order.paymentMethod === 'cash_on_delivery' ? '#047857' : '#ea580c'
                        }}>
                          {order.paymentMethod === 'cash_on_delivery' 
                            ? '💵 Cash livraison' 
                            : order.paymentMethod === 'orange_money' 
                              ? '📱 Orange Money' 
                              : '📱 MTN MoMo'}
                        </span>
                      </td>

                      {/* Ville */}
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ fontWeight: 700, color: '#1e293b' }}>{order.city}</div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{order.neighborhood}</div>
                      </td>

                      {/* Livreur */}
                      <td style={{ padding: '14px 12px' }}>
                        {order.courierName ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0b5738', fontWeight: 700 }}>
                            <Bike size={14} />
                            <span>{order.courierName}</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>
                            Non assigné
                          </span>
                        )}
                      </td>

                      {/* Statut */}
                      <td style={{ padding: '14px 12px' }}>
                        {renderStatusBadge(order.orderStatus)}
                      </td>

                      {/* Date */}
                      <td style={{ padding: '14px 12px', fontSize: '0.75rem', color: '#64748b' }}>
                        {order.createdAt || "Aujourd'hui"}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => setSelectedOrderDetailId(order.id)}
                            title="Ouvrir la gestion détaillée de commande"
                            style={{
                              backgroundColor: '#ecfdf5',
                              border: '1px solid #a7f3d0',
                              borderRadius: '6px',
                              padding: '5px 9px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              color: '#065f46'
                            }}
                          >
                            <span>Détails</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveTrackingNumber(order.trackingNumber);
                              setActiveView('tracking');
                            }}
                            title="Voir le suivi client"
                            style={{
                              backgroundColor: '#f1f5f9',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              padding: '5px 8px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: '#334155'
                            }}
                          >
                            <Eye size={13} />
                            <span>Suivi</span>
                          </button>

                          {/* Quick Status Change */}
                          <select
                            value={order.orderStatus}
                            onChange={(e) => {
                              updateOrderStatus(order.id, e.target.value as OrderStatus);
                              addToast(`Commande #${order.trackingNumber} : statut passé à ${e.target.value}`, 'success');
                            }}
                            style={{
                              padding: '5px 8px',
                              borderRadius: '6px',
                              border: '1px solid #cbd5e1',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              backgroundColor: '#ffffff',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="new">Nouvelle</option>
                            <option value="to_confirm">À confirmer</option>
                            <option value="confirmed">Confirmée</option>
                            <option value="preparing">Préparation</option>
                            <option value="in_transit">En livraison</option>
                            <option value="delivered">Livrée</option>
                            <option value="failed">Échec</option>
                            <option value="cancelled">Annulée</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE / TABLET CARDS VIEW (Transforms rows into cards on screen <= 900px) */}
        <div className="admin-orders-mobile-cards">
          {paginatedOrders.length === 0 ? (
            <div style={{ padding: '36px 16px', textAlign: 'center', color: '#64748b' }}>
              <AlertCircle size={32} color="#94a3b8" style={{ marginBottom: '8px' }} />
              <div style={{ fontWeight: 700 }}>Aucune commande ne correspond aux filtres.</div>
              <button
                onClick={handleResetFilters}
                style={{ marginTop: '10px', padding: '6px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              {/* Select all bar on mobile */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                fontSize: '0.8125rem'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700, color: '#475569' }}>
                  <input
                    type="checkbox"
                    checked={isAllPageSelected}
                    onChange={handleSelectAllOnPage}
                    style={{ width: '16px', height: '16px', accentColor: '#0b5738', cursor: 'pointer' }}
                  />
                  <span>Sélectionner la page ({paginatedOrders.length})</span>
                </label>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                  Page {currentPage}/{totalPages}
                </span>
              </div>

              {paginatedOrders.map((order) => {
                const isSelected = selectedOrderIds.includes(order.id);

                return (
                  <div
                    key={order.id}
                    style={{
                      backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                      borderRadius: '14px',
                      border: isSelected ? '1.5px solid #0b5738' : '1px solid #e2e8f0',
                      padding: '14px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {/* Card Top: Checkbox, Order number, Status badge */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOrder(order.id)}
                          style={{ width: '18px', height: '18px', accentColor: '#0b5738', cursor: 'pointer' }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontFamily: 'monospace', fontWeight: 900, color: '#0b5738', fontSize: '0.9375rem' }}>
                              #{order.trackingNumber}
                            </span>
                            {order.trackingNumber === 'IFM-10482' && (
                              <span style={{ fontSize: '0.625rem', fontWeight: 800, backgroundColor: '#fef3c7', color: '#92400e', padding: '1px 5px', borderRadius: '4px' }}>
                                ⭐ PRIORITAIRE
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                            {order.createdAt || "Aujourd'hui"} • {order.items.length} article(s)
                          </span>
                        </div>
                      </div>

                      {/* Status badge */}
                      <div>
                        {renderStatusBadge(order.orderStatus)}
                      </div>
                    </div>

                    {/* Card Row: Client & Phone */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#f8fafc',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '0.8125rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{order.customerName}</div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Client vérifié IFPTIE</div>
                      </div>

                      <a
                        href={`tel:${order.customerPhone}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          backgroundColor: '#ecfdf5',
                          color: '#0b5738',
                          padding: '5px 9px',
                          borderRadius: '6px',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          textDecoration: 'none'
                        }}
                      >
                        <Phone size={12} />
                        <span>{order.customerPhone}</span>
                      </a>
                    </div>

                    {/* Card Row: Amount, Payment & Location */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8125rem' }}>
                      {/* Montant & Règlement */}
                      <div style={{ border: '1px solid #f1f5f9', borderRadius: '8px', padding: '8px' }}>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                          Montant & Paiement
                        </div>
                        <div style={{ fontWeight: 900, color: '#0f172a', fontSize: '0.9375rem', marginTop: '2px' }}>
                          {formatFCFA(order.total)}
                        </div>
                        <div style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          color: order.paymentMethod === 'cash_on_delivery' ? '#047857' : '#ea580c',
                          marginTop: '2px'
                        }}>
                          {order.paymentMethod === 'cash_on_delivery' 
                            ? '💵 Espèces livraison' 
                            : order.paymentMethod === 'orange_money' 
                              ? '📱 Orange Money' 
                              : '📱 MTN MoMo'}
                        </div>
                      </div>

                      {/* Destination & Livreur */}
                      <div style={{ border: '1px solid #f1f5f9', borderRadius: '8px', padding: '8px' }}>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                          Livraison & Coursier
                        </div>
                        <div style={{ fontWeight: 800, color: '#1e293b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={12} color="#64748b" />
                          <span>{order.city}</span>
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {order.neighborhood}
                        </div>
                        <div style={{ marginTop: '2px' }}>
                          {order.courierName ? (
                            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#0b5738', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              <Bike size={11} /> {order.courierName}
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.6875rem', color: '#94a3b8', fontStyle: 'italic' }}>
                              Livreur non assigné
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Bottom */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      paddingTop: '6px',
                      borderTop: '1px solid #f1f5f9'
                    }}>
                      <button
                        onClick={() => setSelectedOrderDetailId(order.id)}
                        style={{
                          flex: 1,
                          backgroundColor: '#ecfdf5',
                          border: '1px solid #a7f3d0',
                          borderRadius: '8px',
                          padding: '7px 10px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          color: '#065f46',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Gérer / Détails</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTrackingNumber(order.trackingNumber);
                          setActiveView('tracking');
                        }}
                        style={{
                          flex: 1,
                          backgroundColor: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          padding: '7px 10px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          color: '#334155',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Eye size={13} />
                        <span>Voir Suivi</span>
                      </button>

                      <div style={{ flex: 1 }}>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => {
                            updateOrderStatus(order.id, e.target.value as OrderStatus);
                            addToast(`Commande #${order.trackingNumber} : statut passé à ${e.target.value}`, 'success');
                          }}
                          style={{
                            width: '100%',
                            padding: '7px 8px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            backgroundColor: '#ffffff',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="new">Nouvelle</option>
                          <option value="to_confirm">À confirmer</option>
                          <option value="confirmed">Confirmée</option>
                          <option value="preparing">Préparation</option>
                          <option value="in_transit">En livraison</option>
                          <option value="delivered">Livrée</option>
                          <option value="failed">Échec</option>
                          <option value="cancelled">Annulée</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

      </div>

      {/* 6. PAGINATION FOOTER */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        padding: '12px 16px',
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        fontSize: '0.8125rem'
      }}>
        {/* Info & Rows per page */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#64748b' }}>
            Affichage de <strong>{(currentPage - 1) * rowsPerPage + 1}</strong> à{' '}
            <strong>{Math.min(currentPage * rowsPerPage, totalOrdersCount)}</strong> sur{' '}
            <strong>{totalOrdersCount}</strong> commandes
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#64748b' }}>Lignes par page :</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8125rem',
                fontWeight: 700,
                outline: 'none'
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Page Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '6px 10px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: currentPage === page ? '1px solid #0b5738' : '1px solid #cbd5e1',
                backgroundColor: currentPage === page ? '#0b5738' : '#ffffff',
                color: currentPage === page ? '#ffffff' : '#334155',
                fontSize: '0.8125rem',
                fontWeight: currentPage === page ? 800 : 600,
                cursor: 'pointer'
              }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '6px 10px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 7. ASSIGN COURIER MODAL */}
      {showAssignModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px 20px',
            maxWidth: '440px',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bike size={20} color="#0b5738" />
                Assigner un livreur
              </h3>
              <button
                onClick={() => setShowAssignModal(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '0 0 16px' }}>
              Sélectionnez le coursier auquel confier les <strong>{selectedOrderIds.length}</strong> commande(s) cochée(s) :
            </p>

            <div style={{ display: 'grid', gap: '8px', marginBottom: '20px' }}>
              {[
                { name: 'Jean Mbarga (Moto #02)', zone: 'Yaoundé Ouest', count: '1 course en cours' },
                { name: 'Arsène Mbida (Moto #01)', zone: 'Yaoundé Centre / Bastos', count: 'Disponible' },
                { name: 'Michel Tchakounte (Moto #04)', zone: 'Douala Akwa / Bonanjo', count: '2 courses' },
                { name: 'Serge Tsafack (Moto #03)', zone: 'Douala Bonabéri', count: 'Disponible' }
              ].map((c) => (
                <label
                  key={c.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: selectedCourierToAssign === c.name ? '2px solid #0b5738' : '1px solid #cbd5e1',
                    backgroundColor: selectedCourierToAssign === c.name ? '#ecfdf5' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a' }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>📍 {c.zone} • <span style={{ color: '#0b5738' }}>{c.count}</span></div>
                  </div>
                  <input
                    type="radio"
                    name="courierAssignRadio"
                    checked={selectedCourierToAssign === c.name}
                    onChange={() => setSelectedCourierToAssign(c.name)}
                    style={{ accentColor: '#0b5738', width: '18px', height: '18px' }}
                  />
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowAssignModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleBulkAssignCourier}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#0b5738',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Confirmer assignation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
