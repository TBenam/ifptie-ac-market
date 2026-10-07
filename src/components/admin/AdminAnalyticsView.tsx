import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Search,
  DollarSign,
  ShoppingBag,
  Percent,
  Truck,
  Building2,
  Users,
  MapPin,
  Bike,
  Package,
  Layers,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  FileText,
  FileDown,
  RotateCcw,
  Clock,
  ChevronDown,
  ShieldCheck,
  Check
} from 'lucide-react';

export const AdminAnalyticsView: React.FC = () => {
  const { addToast } = useStore();

  // Date Filter Presets
  const [dateRange, setDateRange] = useState<'today' | '7days' | '30days' | 'this_month' | 'this_quarter' | 'year_2026' | 'custom'>('30days');
  const [customStartDate, setCustomStartDate] = useState('2026-08-20');
  const [customEndDate, setCustomEndDate] = useState('2026-09-20');

  // Filters State
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [selectedCourier, setSelectedCourier] = useState<string>('all');

  // Interactive chart hover
  const [hoveredRevenueDay, setHoveredRevenueDay] = useState<number | null>(null);

  // Revenue Over Time Data (30 days mock series)
  const revenueSeries = useMemo(() => [
    { label: '21 Aoû', current: 1200000, previous: 980000, orders: 32 },
    { label: '24 Aoû', current: 1450000, previous: 1100000, orders: 38 },
    { label: '27 Aoû', current: 1380000, previous: 1150000, orders: 36 },
    { label: '30 Aoû', current: 1850000, previous: 1400000, orders: 48 },
    { label: '02 Sep', current: 1620000, previous: 1350000, orders: 42 },
    { label: '05 Sep', current: 1950000, previous: 1520000, orders: 50 },
    { label: '08 Sep', current: 2100000, previous: 1680000, orders: 54 },
    { label: '11 Sep', current: 1780000, previous: 1490000, orders: 45 },
    { label: '14 Sep', current: 2250000, previous: 1720000, orders: 58 },
    { label: '17 Sep', current: 2400000, previous: 1890000, orders: 62 },
    { label: '20 Sep', current: 2650000, previous: 2050000, orders: 68 }
  ], []);

  // Category Breakdown Data
  const categoryRevenue = useMemo(() => [
    { name: 'Énergie & Solaire', amount: 20475000, percent: 42, color: '#0b5738', growth: '+24%' },
    { name: 'Maison & Cuisine', amount: 13650000, percent: 28, color: '#0284c7', growth: '+15%' },
    { name: 'High-Tech & Accessoires', amount: 8775000, percent: 18, color: '#8b5cf6', growth: '+19%' },
    { name: 'Beauté & Bien-être', amount: 3900000, percent: 8, color: '#ec4899', growth: '+8%' },
    { name: 'Autres Rayons', amount: 1950000, percent: 4, color: '#64748b', growth: '+5%' }
  ], []);

  // City Breakdown Data
  const cityRevenue = useMemo(() => [
    { city: 'Douala', amount: 21450000, percent: 44, orders: 549, color: '#0284c7' },
    { city: 'Yaoundé', amount: 18525000, percent: 38, orders: 474, color: '#0b5738' },
    { city: 'Bafoussam', amount: 4875000, percent: 10, orders: 125, color: '#d97706' },
    { city: 'Kribi', amount: 2437500, percent: 5, orders: 62, color: '#10b981' },
    { city: 'Garoua & Nord', amount: 1462500, percent: 3, orders: 38, color: '#6366f1' }
  ], []);

  // Payment Methods Data
  const paymentBreakdown = useMemo(() => [
    { method: 'Cash on Delivery (Paiement à la livraison)', count: 686, percent: 55, color: '#0b5738', badge: 'Espèces' },
    { method: 'Orange Money (Paiement direct)', count: 324, percent: 26, color: '#ea580c', badge: 'OM' },
    { method: 'MTN Mobile Money (MoMo)', count: 212, percent: 17, color: '#eab308', badge: 'MoMo' },
    { method: 'Wave / Autre', count: 26, percent: 2, color: '#0284c7', badge: 'Wave' }
  ], []);

  // Top Products Data
  const topProductsList = useMemo(() => [
    {
      id: 'prod-01',
      name: 'Kit Solaire Autonome 500W Hybride',
      category: 'Énergie & Solaire',
      unitsSold: 142,
      revenue: 8520000,
      margin: 2982000,
      marginPercent: 35.0,
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=120&auto=format&fit=crop&q=80',
      stock: 38,
      status: 'En stock'
    },
    {
      id: 'prod-02',
      name: 'Friteuse Sans Huile AirFryer 6L XXL',
      category: 'Maison & Cuisine',
      unitsSold: 215,
      revenue: 6020000,
      margin: 1926400,
      marginPercent: 32.0,
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=120&auto=format&fit=crop&q=80',
      stock: 45,
      status: 'En stock'
    },
    {
      id: 'prod-03',
      name: 'Projecteur Solaire LED 200W IP67',
      category: 'Énergie & Solaire',
      unitsSold: 280,
      revenue: 4480000,
      margin: 1612800,
      marginPercent: 36.0,
      image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=120&auto=format&fit=crop&q=80',
      stock: 82,
      status: 'En stock'
    },
    {
      id: 'prod-04',
      name: 'Écouteurs TWS Bluetooth 5.3 Pro',
      category: 'High-Tech',
      unitsSold: 340,
      revenue: 3264000,
      margin: 1305600,
      marginPercent: 40.0,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&auto=format&fit=crop&q=80',
      stock: 120,
      status: 'En stock'
    },
    {
      id: 'prod-05',
      name: 'Marmite Électrique Multifonction Chef',
      category: 'Maison & Cuisine',
      unitsSold: 110,
      revenue: 2695000,
      margin: 862400,
      marginPercent: 32.0,
      image: 'https://images.unsplash.com/photo-1584990347449-399d554a9fc2?w=120&auto=format&fit=crop&q=80',
      stock: 18,
      status: 'Stock faible'
    }
  ], []);

  // Top Suppliers Data
  const topSuppliersList = useMemo(() => [
    {
      name: 'Shenzhen SunPower Tech Ltd',
      origin: 'Chine (Shenzhen)',
      category: 'Énergie & Solaire',
      volumeFCFA: 18500000,
      deliverySpeedDays: '22 jours (Conteneur)',
      qualityScore: '98.5%',
      marginContribution: '36.2%'
    },
    {
      name: 'Guangzhou SmartLife Electronics',
      origin: 'Chine (Guangzhou)',
      category: 'High-Tech & Petit Électroménager',
      volumeFCFA: 12400000,
      deliverySpeedDays: '24 jours (Fret Maritime)',
      qualityScore: '97.0%',
      marginContribution: '33.8%'
    },
    {
      name: 'Coopérative Agro Kribi & Sud',
      origin: 'Cameroun (Kribi)',
      category: 'Terroir & Bien-être',
      volumeFCFA: 3800000,
      deliverySpeedDays: '48h (Axe Douala/Yaoundé)',
      qualityScore: '99.0%',
      marginContribution: '42.0%'
    },
    {
      name: 'Fonderie & Plasturgie Ouest CMR',
      origin: 'Cameroun (Bafoussam)',
      category: 'Ustensiles & Rangement',
      volumeFCFA: 2900000,
      deliverySpeedDays: '24h (Direct Usine)',
      qualityScore: '96.2%',
      marginContribution: '28.5%'
    }
  ], []);

  // Courier Performance Ranking Data
  const couriersPerformance = useMemo(() => [
    {
      name: 'Jean',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      zone: 'Yaoundé Bastos',
      deliveries: 342,
      successRate: 98.2,
      onTimeRate: 96.5,
      rating: 4.9,
      cashRemitted: 3850000
    },
    {
      name: 'Cedric Fotso',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      zone: 'Douala Bonamoussadi',
      deliveries: 310,
      successRate: 97.8,
      onTimeRate: 95.0,
      rating: 4.9,
      cashRemitted: 3420000
    },
    {
      name: 'Arsène Mbida',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      zone: 'Yaoundé Mvan',
      deliveries: 288,
      successRate: 97.2,
      onTimeRate: 94.2,
      rating: 4.8,
      cashRemitted: 3120000
    },
    {
      name: 'Boris Ekani',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      zone: 'Douala Akwa',
      deliveries: 365,
      successRate: 95.4,
      onTimeRate: 91.0,
      rating: 4.7,
      cashRemitted: 4180000
    }
  ], []);

  // Export handlers
  const handleExport = (type: 'CSV' | 'Excel' | 'PDF') => {
    addToast(`Exportation du rapport Analytics en format ${type} générée avec succès !`, 'success');
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%', padding: '28px 32px 80px' }}>
      {/* 1. TOP HEADER & EXPORT BUTTONS */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '26px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#0b5738',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(11, 87, 56, 0.25)'
            }}>
              <BarChart3 size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
                Analytics
              </h1>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                Tableau de bord décisionnel : chiffre d'affaires, marges, performance commerciale et logistique au Cameroun.
              </p>
            </div>
          </div>
        </div>

        {/* Export Buttons: CSV, Excel, PDF */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleExport('CSV')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 14px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
          >
            <FileText size={15} color="#0284c7" />
            CSV
          </button>

          <button
            onClick={() => handleExport('Excel')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 14px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
          >
            <FileSpreadsheet size={15} color="#15803d" />
            Excel
          </button>

          <button
            onClick={() => handleExport('PDF')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              backgroundColor: '#0b5738',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              color: '#ffffff',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(11, 87, 56, 0.25)'
            }}
          >
            <FileDown size={15} />
            PDF
          </button>
        </div>
      </div>

      {/* 2. DATE SELECTOR & FILTER BAR */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '16px 20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
        marginBottom: '26px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Date Selector Presets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px', flexWrap: 'wrap' }}>
          {[
            { key: 'today', label: 'Aujourd\'hui' },
            { key: '7days', label: '7 jours' },
            { key: '30days', label: '30 jours' },
            { key: 'this_month', label: 'Ce mois' },
            { key: 'this_quarter', label: 'Ce trimestre' },
            { key: 'year_2026', label: 'Année 2026' },
            { key: 'custom', label: 'Personnalisé' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setDateRange(tab.key as any)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: dateRange === tab.key ? '#ffffff' : 'transparent',
                color: dateRange === tab.key ? '#0b5738' : '#64748b',
                boxShadow: dateRange === tab.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Custom date range inputs if selected */}
        {dateRange === 'custom' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem' }}>
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
            <span style={{ color: '#64748b' }}>à</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>
        )}

        {/* Specific Multi-level Filters: City, Category, Product, Courier */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* City Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={14} color="#64748b" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{
                padding: '7px 10px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#1e293b'
              }}
            >
              <option value="all">Toutes les villes</option>
              <option value="douala">Douala</option>
              <option value="yaounde">Yaoundé</option>
              <option value="bafoussam">Bafoussam</option>
              <option value="garoua">Garoua</option>
              <option value="kribi">Kribi</option>
            </select>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Layers size={14} color="#64748b" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '7px 10px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#1e293b'
              }}
            >
              <option value="all">Tous les rayons</option>
              <option value="energie">Énergie & Solaire</option>
              <option value="maison">Maison & Cuisine</option>
              <option value="hightech">High-Tech & Acc.</option>
              <option value="beaute">Beauté & Bien-être</option>
            </select>
          </div>

          {/* Courier Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Bike size={14} color="#64748b" />
            <select
              value={selectedCourier}
              onChange={(e) => setSelectedCourier(e.target.value)}
              style={{
                padding: '7px 10px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#1e293b'
              }}
            >
              <option value="all">Tous les livreurs</option>
              <option value="jean">Jean</option>
              <option value="arsene">Arsène Mbida</option>
              <option value="boris">Boris Ekani</option>
              <option value="cedric">Cedric Fotso</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. SPECIFIED 6 KPIS CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginBottom: '26px'
      }}>
        {/* KPI 1: Revenue */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Revenue (Chiffre d'Affaires)
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0b5738', marginTop: '6px' }}>
            48 750 000 FCFA
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
            <TrendingUp size={14} />
            <span>+18.4% vs période préc.</span>
          </div>
        </div>

        {/* KPI 2: Orders */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Orders (Commandes)
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>
            1 248
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
            <TrendingUp size={14} />
            <span>+12.1% (+135 commandes)</span>
          </div>
        </div>

        {/* KPI 3: Average Order Value */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Average Order Value (Panier Moyen)
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0284c7', marginTop: '6px' }}>
            39 062 FCFA
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
            <TrendingUp size={14} />
            <span>+5.6% (+2 100 FCFA)</span>
          </div>
        </div>

        {/* KPI 4: Gross Margin */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Gross Margin (Marge Brute)
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>
            16 850 000 FCFA
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
            <span>Taux moyen : <strong>34.6%</strong></span>
            <span>(+2.3 pts)</span>
          </div>
        </div>

        {/* KPI 5: Conversion Rate */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Conversion Rate (Transformation)
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#8b5cf6', marginTop: '6px' }}>
            4.8%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
            <TrendingUp size={14} />
            <span>+0.6 pt (vs 4.2%)</span>
          </div>
        </div>

        {/* KPI 6: Delivery Success Rate */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Delivery Success Rate
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#15803d', marginTop: '6px' }}>
            96.4%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
            <CheckCircle2 size={14} />
            <span>1 203 livraisons réussies</span>
          </div>
        </div>
      </div>

      {/* 4. CHARTS SECTION (ROW 1: REVENUE OVER TIME & ORDERS OVER TIME) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* CHART 1: REVENUE OVER TIME */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Revenue Over Time (Évolution du Chiffre d'Affaires)
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                Comparaison période actuelle vs période précédente (en FCFA).
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#0b5738' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#0b5738' }} />
                Période en cours
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94a3b8' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#cbd5e1' }} />
                Période précédente
              </span>
            </div>
          </div>

          {/* SVG Area & Line Chart */}
          <div style={{ height: '240px', width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0b5738" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0b5738" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="180" x2="600" y2="180" stroke="#e2e8f0" strokeWidth="1" />

              {/* Previous Period Line */}
              <path
                d="M 0,140 Q 60,130 120,125 T 240,110 T 360,95 T 480,85 T 600,70"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Current Period Area */}
              <path
                d="M 0,130 Q 60,110 120,115 T 240,80 T 360,70 T 480,50 T 600,30 L 600,180 L 0,180 Z"
                fill="url(#revGradient)"
              />

              {/* Current Period Line */}
              <path
                d="M 0,130 Q 60,110 120,115 T 240,80 T 360,70 T 480,50 T 600,30"
                fill="none"
                stroke="#0b5738"
                strokeWidth="3.5"
              />

              {/* Data points */}
              {[
                { x: 0, y: 130, val: '1.2M' },
                { x: 120, y: 115, val: '1.4M' },
                { x: 240, y: 80, val: '1.8M' },
                { x: 360, y: 70, val: '2.1M' },
                { x: 480, y: 50, val: '2.4M' },
                { x: 600, y: 30, val: '2.65M' }
              ].map((pt, idx) => (
                <g key={idx}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#0b5738" strokeWidth="3" />
                  <text x={pt.x} y={pt.y - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0b5738">
                    {pt.val}
                  </text>
                </g>
              ))}
            </svg>

            {/* X-axis labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#64748b', marginTop: '6px' }}>
              <span>21 Aoû</span>
              <span>27 Aoû</span>
              <span>02 Sep</span>
              <span>08 Sep</span>
              <span>14 Sep</span>
              <span>20 Sep (Aujourd'hui)</span>
            </div>
          </div>
        </div>

        {/* CHART 2: ORDERS OVER TIME */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Orders Over Time (Volume Commandes)
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                Distribution journalière des expéditions.
              </p>
            </div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0284c7' }}>
              Moy: 41 cmds/j
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '190px', gap: '6px', paddingTop: '10px' }}>
            {revenueSeries.map((item, idx) => {
              const barHeight = Math.min(100, Math.round((item.orders / 70) * 100));
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{ fontSize: '0.625rem', fontWeight: 800, color: '#0284c7', marginBottom: '4px' }}>
                    {item.orders}
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: `${barHeight}%`,
                      backgroundColor: idx === revenueSeries.length - 1 ? '#0b5738' : '#38bdf8',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.3s ease'
                    }}
                  />
                  <div style={{ fontSize: '0.5625rem', color: '#94a3b8', marginTop: '6px', whiteSpace: 'nowrap' }}>
                    {item.label.slice(0, 2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. CHARTS ROW 2: REVENUE BY CATEGORY & REVENUE BY CITY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* CHART 3: REVENUE BY CATEGORY */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Revenue by Category (Ventes par Rayon)
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                Part de chaque univers produit dans le chiffre d'affaires.
              </p>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0b5738', backgroundColor: '#ecfdf5', padding: '3px 8px', borderRadius: '6px' }}>
              Solaire en tête (+24%)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {categoryRevenue.map((cat, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 900, color: '#0f172a' }}>{formatFCFA(cat.amount)}</span>
                    <span style={{ color: '#64748b', fontSize: '0.75rem' }}>({cat.percent}%)</span>
                  </div>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${cat.percent}%`, height: '100%', backgroundColor: cat.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 4: REVENUE BY CITY */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Revenue by City (Répartition Géographique)
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                Volume d'affaires généré par métropole et région.
              </p>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284c7', backgroundColor: '#f0f9ff', padding: '3px 8px', borderRadius: '6px' }}>
              Douala & Yaoundé = 82%
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {cityRevenue.map((c, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} color={c.color} />
                    {c.city}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 900, color: '#0b5738' }}>{formatFCFA(c.amount)}</span>
                    <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{c.orders} cmds ({c.percent}%)</span>
                  </div>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${c.percent}%`, height: '100%', backgroundColor: c.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. CHARTS ROW 3: ORDERS BY PAYMENT METHOD & DELIVERY SUCCESS RATE */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* CHART 5: ORDERS BY PAYMENT METHOD */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Orders by Payment Method (Modes de Paiement)
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                Répartition Cash on Delivery vs Mobile Money (OM / MoMo).
              </p>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ea580c', backgroundColor: '#fff7ed', padding: '3px 8px', borderRadius: '6px' }}>
              MoMo en hausse (+43%)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {paymentBreakdown.map((p, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a' }}>{p.method}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 900, color: '#0f172a' }}>{p.count} cmds</span>
                    <span style={{ color: '#64748b', fontSize: '0.75rem' }}>({p.percent}%)</span>
                  </div>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${p.percent}%`, height: '100%', backgroundColor: p.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 6: DELIVERY SUCCESS RATE (Gauge & Breakdown) */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Delivery Success Rate (Qualité Logistique Flotte)
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                Taux de réussite moto & camionnette sur l'ensemble du territoire.
              </p>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803d', backgroundColor: '#ecfdf5', padding: '3px 8px', borderRadius: '6px' }}>
              Objectif &gt; 95% Atteint ✓
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Radial Gauge */}
            <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="3.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="3.5"
                  strokeDasharray="96.4, 100"
                />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0b5738' }}>96.4%</div>
                <div style={{ fontSize: '0.5625rem', color: '#64748b' }}>SUCCÈS</div>
              </div>
            </div>

            {/* Breakdown Details */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                <span style={{ color: '#15803d', fontWeight: 700 }}>✓ Livraisons réussies</span>
                <span style={{ fontWeight: 800 }}>1 203 (96.4%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                <span style={{ color: '#d97706', fontWeight: 700 }}>⚠️ Échecs reprogrammés</span>
                <span style={{ fontWeight: 800 }}>30 (2.4%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                <span style={{ color: '#dc2626', fontWeight: 700 }}>✕ Annulations & Refus</span>
                <span style={{ fontWeight: 800 }}>15 (1.2%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. TABLES SECTION: TOP PRODUCTS, TOP SUPPLIERS & COURIER PERFORMANCE */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* CHART 7: TOP PRODUCTS */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Top Products (Classement des Meilleures Ventes)
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>
              Produits générant le plus fort chiffre d'affaires et la meilleure contribution de marge.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '12px 20px' }}>Produit & Rayon</th>
                  <th style={{ padding: '12px 14px', textAlign: 'center' }}>Unités vendues</th>
                  <th style={{ padding: '12px 14px' }}>Chiffre d'Affaires</th>
                  <th style={{ padding: '12px 14px' }}>Marge Brute</th>
                  <th style={{ padding: '12px 14px' }}>Taux de Marge</th>
                  <th style={{ padding: '12px 20px', textAlign: 'right' }}>Stock Restant</th>
                </tr>
              </thead>
              <tbody>
                {topProductsList.map((prod, idx) => (
                  <tr key={prod.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={prod.image}
                          alt=""
                          style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 800, color: '#0f172a' }}>{prod.name}</div>
                          <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{prod.category}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 800 }}>
                      {prod.unitsSold}
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 900, color: '#0b5738' }}>
                      {formatFCFA(prod.revenue)}
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 800, color: '#0f172a' }}>
                      {formatFCFA(prod.margin)}
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 800, color: '#15803d' }}>
                      {prod.marginPercent}%
                    </td>
                    <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.6875rem',
                        fontWeight: 800,
                        backgroundColor: prod.stock > 20 ? '#ecfdf5' : '#fef3c7',
                        color: prod.stock > 20 ? '#15803d' : '#b45309'
                      }}>
                        {prod.stock} unités ({prod.status})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROW 4: TOP SUPPLIERS & COURIER PERFORMANCE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* CHART 8: TOP SUPPLIERS */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Top Suppliers (Fournisseurs Principaux)
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                Partenaires industriels Chine & coopératives locales camerounaises.
              </p>
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {topSuppliersList.map((sup, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #edf2f7',
                    borderRadius: '10px',
                    padding: '12px 14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>{sup.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sup.origin} • {sup.category}</div>
                    </div>
                    <span style={{ fontWeight: 900, color: '#0b5738', fontSize: '0.875rem' }}>
                      {formatFCFA(sup.volumeFCFA)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#64748b', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid #e2e8f0' }}>
                    <span>Délai transit : <strong>{sup.deliverySpeedDays}</strong></span>
                    <span>Marge générée : <strong style={{ color: '#15803d' }}>{sup.marginContribution}</strong></span>
                    <span>Qualité : <strong>{sup.qualityScore}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHART 9: COURIER PERFORMANCE */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Courier Performance (Classement des Coursiers)
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                Taux de réussite, ponctualité et encaissements reversés.
              </p>
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {couriersPerformance.map((c, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #edf2f7',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={c.avatar}
                      alt=""
                      style={{ width: '36px', height: '36px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>{c.name}</div>
                      <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{c.zone} • {c.deliveries} courses</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 900, color: '#15803d' }}>{c.successRate}%</span>
                      <span style={{ fontSize: '0.6875rem', color: '#f59e0b', fontWeight: 800 }}>★ {c.rating}</span>
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                      Encaissé : {formatFCFA(c.cashRemitted)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
