import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  ArrowUpRight,
  Package,
  Truck,
  Percent,
  CheckCircle2,
  Clock,
  Building2,
  MapPin,
  Layers,
  FileSpreadsheet,
  Printer,
  BarChart3
} from 'lucide-react';
import { formatFCFA } from '../../utils/formatters';

// Types for Finance module
interface ProfitabilityRow {
  id: string;
  productName: string;
  sku: string;
  category: string;
  supplier: string;
  unitsSold: number;
  revenue: number;
  purchaseCost: number;
  deliveryCost: number;
  discounts: number;
  estimatedProfit: number;
  marginPct: number;
}

export const AdminFinancesView: React.FC = () => {
  // Date filter state
  const [dateRange, setDateRange] = useState<'today' | '7days' | '30days' | 'this_month' | 'this_quarter' | 'year' | 'custom'>('this_month');
  const [customStartDate, setCustomStartDate] = useState('2026-09-01');
  const [customEndDate, setCustomEndDate] = useState('2026-09-20');

  // Breakdown tab state
  const [activeBreakdown, setActiveBreakdown] = useState<'product' | 'category' | 'city' | 'supplier'>('category');

  // Search & Filter in profitability table
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [sortField, setSortField] = useState<keyof ProfitabilityRow>('revenue');
  const [sortAsc, setSortAsc] = useState(false);

  // Export state notification
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const showExportNotice = (msg: string) => {
    setExportNotice(msg);
    setTimeout(() => setExportNotice(null), 3500);
  };

  // Base multiplier based on date filter for realistic interactive updates
  const mult = useMemo(() => {
    switch (dateRange) {
      case 'today': return 0.04;
      case '7days': return 0.28;
      case '30days': return 1.0;
      case 'this_month': return 0.72;
      case 'this_quarter': return 2.6;
      case 'year': return 8.5;
      default: return 1.0;
    }
  }, [dateRange]);

  // Main Finance KPIs
  const kpis = useMemo(() => {
    const revenue = Math.round(42850000 * mult);
    const productCost = Math.round(23140000 * mult);
    const deliveryCost = Math.round(2890000 * mult);
    const discounts = Math.round(1820000 * mult);

    // Marge Brute = Chiffre d'affaires - Coût Produits - Coût Livraison - Réductions
    const grossMargin = revenue - productCost - deliveryCost - discounts;
    const averageMargin = revenue > 0 ? (grossMargin / revenue) * 100 : 0;

    // Encaissements
    const collectedAmount = Math.round(revenue * 0.88);
    const pendingAmount = revenue - collectedAmount;

    return {
      revenue,
      productCost,
      deliveryCost,
      discounts,
      grossMargin,
      averageMargin: averageMargin.toFixed(1),
      collectedAmount,
      pendingAmount,
    };
  }, [mult]);

  // Comparative trend chart data (weekly / points over the period)
  const chartData = useMemo(() => {
    const points = [
      { label: 'Sem 1', rev: 9200000 * mult, prodCost: 4950000 * mult, delivCost: 620000 * mult, margin: 3630000 * mult },
      { label: 'Sem 2', rev: 11400000 * mult, prodCost: 6150000 * mult, delivCost: 780000 * mult, margin: 4470000 * mult },
      { label: 'Sem 3', rev: 10800000 * mult, prodCost: 5800000 * mult, delivCost: 730000 * mult, margin: 4270000 * mult },
      { label: 'Sem 4', rev: 11450000 * mult, prodCost: 6240000 * mult, delivCost: 760000 * mult, margin: 4450000 * mult },
    ];
    return points;
  }, [mult]);

  // Breakdown 1: By Category
  const categoryBreakdown = useMemo(() => [
    {
      name: 'Énergie & Solaire',
      revenue: Math.round(18425000 * mult),
      productCost: Math.round(9200000 * mult),
      deliveryCost: Math.round(1120000 * mult),
      profit: Math.round(8105000 * mult),
      marginPct: 44.0,
      share: 43.0,
      color: '#0b5738'
    },
    {
      name: 'Maison & Cuisine',
      revenue: Math.round(11570000 * mult),
      productCost: Math.round(6700000 * mult),
      deliveryCost: Math.round(840000 * mult),
      profit: Math.round(4030000 * mult),
      marginPct: 34.8,
      share: 27.0,
      color: '#0284c7'
    },
    {
      name: 'Électronique & High-Tech',
      revenue: Math.round(7712000 * mult),
      productCost: Math.round(4650000 * mult),
      deliveryCost: Math.round(520000 * mult),
      profit: Math.round(2542000 * mult),
      marginPct: 33.0,
      share: 18.0,
      color: '#f59e0b'
    },
    {
      name: 'Bricolage & Outillage',
      revenue: Math.round(5143000 * mult),
      productCost: Math.round(2590000 * mult),
      deliveryCost: Math.round(410000 * mult),
      profit: Math.round(2143000 * mult),
      marginPct: 41.7,
      share: 12.0,
      color: '#8b5cf6'
    },
  ], [mult]);

  // Breakdown 2: By City
  const cityBreakdown = useMemo(() => [
    {
      city: 'Douala',
      orders: Math.round(628 * mult),
      revenue: Math.round(18854000 * mult),
      deliveryCost: Math.round(1050000 * mult),
      profit: Math.round(6780000 * mult),
      marginPct: 36.0,
      share: 44.0
    },
    {
      city: 'Yaoundé',
      orders: Math.round(486 * mult),
      revenue: Math.round(14569000 * mult),
      deliveryCost: Math.round(890000 * mult),
      profit: Math.round(5240000 * mult),
      marginPct: 35.9,
      share: 34.0
    },
    {
      city: 'Bafoussam',
      orders: Math.round(171 * mult),
      revenue: Math.round(5142000 * mult),
      deliveryCost: Math.round(480000 * mult),
      profit: Math.round(1680000 * mult),
      marginPct: 32.7,
      share: 12.0
    },
    {
      city: 'Kribi',
      orders: Math.round(86 * mult),
      revenue: Math.round(2571000 * mult),
      deliveryCost: Math.round(270000 * mult),
      profit: Math.round(790000 * mult),
      marginPct: 30.7,
      share: 6.0
    },
    {
      city: 'Garoua / Grand Nord',
      orders: Math.round(57 * mult),
      revenue: Math.round(1714000 * mult),
      deliveryCost: Math.round(200000 * mult),
      profit: Math.round(510000 * mult),
      marginPct: 29.8,
      share: 4.0
    },
  ], [mult]);

  // Breakdown 3: By Supplier
  const supplierBreakdown = useMemo(() => [
    {
      name: 'Shenzhen SunPower Direct',
      country: 'Chine (Direct Usine)',
      productsCount: 14,
      revenue: Math.round(18200000 * mult),
      purchaseCost: Math.round(9100000 * mult),
      estimatedProfit: Math.round(7850000 * mult),
      marginPct: 43.1,
      paymentTerms: '30% acompte / 70% BL'
    },
    {
      name: 'Guangzhou SmartLife Co.',
      country: 'Chine (Yiwu/GZ)',
      productsCount: 22,
      revenue: Math.round(12400000 * mult),
      purchaseCost: Math.round(7100000 * mult),
      estimatedProfit: Math.round(4480000 * mult),
      marginPct: 36.1,
      paymentTerms: '100% à l expédition'
    },
    {
      name: 'Cameroun Agro-Tech Kribi',
      country: 'Cameroun (Local)',
      productsCount: 8,
      revenue: Math.round(6800000 * mult),
      purchaseCost: Math.round(3950000 * mult),
      estimatedProfit: Math.round(2290000 * mult),
      marginPct: 33.7,
      paymentTerms: 'Paiement à 15 jours'
    },
    {
      name: 'Douala Électro Import SARL',
      country: 'Cameroun (Grossiste Douala)',
      productsCount: 11,
      revenue: Math.round(5450000 * mult),
      purchaseCost: Math.round(2990000 * mult),
      estimatedProfit: Math.round(1880000 * mult),
      marginPct: 34.5,
      paymentTerms: 'Comptant à la livraison'
    },
  ], [mult]);

  // Profitability table data: Product level
  const profitabilityProducts: ProfitabilityRow[] = useMemo(() => {
    const rawData: ProfitabilityRow[] = [
      {
        id: 'p1',
        productName: 'Kit Solaire Autonome 200W + 4 Ampoules LED + Port USB',
        sku: 'SOL-KIT-200W',
        category: 'Énergie & Solaire',
        supplier: 'Shenzhen SunPower Direct',
        unitsSold: Math.round(84 * mult),
        revenue: Math.round(7980000 * mult),
        purchaseCost: Math.round(4200000 * mult),
        deliveryCost: Math.round(540000 * mult),
        discounts: Math.round(280000 * mult),
        estimatedProfit: Math.round(2960000 * mult),
        marginPct: 37.1
      },
      {
        id: 'p2',
        productName: 'Lampe Solaire LED Rechargeable 100W IP67',
        sku: 'SOL-LED-100W',
        category: 'Énergie & Solaire',
        supplier: 'Shenzhen SunPower Direct',
        unitsSold: Math.round(195 * mult),
        revenue: Math.round(5655000 * mult),
        purchaseCost: Math.round(2730000 * mult),
        deliveryCost: Math.round(420000 * mult),
        discounts: Math.round(180000 * mult),
        estimatedProfit: Math.round(2325000 * mult),
        marginPct: 41.1
      },
      {
        id: 'p3',
        productName: 'Marmite Cuiseur Pression Inox 9L Haute Sécurité',
        sku: 'CUIS-PRES-9L',
        category: 'Maison & Cuisine',
        supplier: 'Guangzhou SmartLife Co.',
        unitsSold: Math.round(142 * mult),
        revenue: Math.round(4544000 * mult),
        purchaseCost: Math.round(2414000 * mult),
        deliveryCost: Math.round(380000 * mult),
        discounts: Math.round(150000 * mult),
        estimatedProfit: Math.round(1600000 * mult),
        marginPct: 35.2
      },
      {
        id: 'p4',
        productName: 'Batterie Gel Solaire Cycle Profond 12V 100Ah',
        sku: 'SOL-BAT-100AH',
        category: 'Énergie & Solaire',
        supplier: 'Shenzhen SunPower Direct',
        unitsSold: Math.round(46 * mult),
        revenue: Math.round(4140000 * mult),
        purchaseCost: Math.round(2208000 * mult),
        deliveryCost: Math.round(390000 * mult),
        discounts: Math.round(120000 * mult),
        estimatedProfit: Math.round(1422000 * mult),
        marginPct: 34.3
      },
      {
        id: 'p5',
        productName: 'Ventilateur Rechargeable Solaire 16 Pouces avec Veilleuse',
        sku: 'SOL-FAN-16P',
        category: 'Maison & Cuisine',
        supplier: 'Guangzhou SmartLife Co.',
        unitsSold: Math.round(110 * mult),
        revenue: Math.round(3850000 * mult),
        purchaseCost: Math.round(2090000 * mult),
        deliveryCost: Math.round(280000 * mult),
        discounts: Math.round(190000 * mult),
        estimatedProfit: Math.round(1290000 * mult),
        marginPct: 33.5
      },
      {
        id: 'p6',
        productName: 'Perceuse Visseuse Sans Fil 21V + Valise 24 Accessoires',
        sku: 'OUT-PERC-21V',
        category: 'Bricolage & Outillage',
        supplier: 'Douala Électro Import SARL',
        unitsSold: Math.round(98 * mult),
        revenue: Math.round(3430000 * mult),
        purchaseCost: Math.round(1715000 * mult),
        deliveryCost: Math.round(260000 * mult),
        discounts: Math.round(130000 * mult),
        estimatedProfit: Math.round(1325000 * mult),
        marginPct: 38.6
      },
      {
        id: 'p7',
        productName: 'Écouteurs Sans Fil TWS Bluetooth 5.3 Anti-Bruit',
        sku: 'ELEC-TWS-B53',
        category: 'Électronique & High-Tech',
        supplier: 'Guangzhou SmartLife Co.',
        unitsSold: Math.round(168 * mult),
        revenue: Math.round(2520000 * mult),
        purchaseCost: Math.round(1344000 * mult),
        deliveryCost: Math.round(190000 * mult),
        discounts: Math.round(95000 * mult),
        estimatedProfit: Math.round(891000 * mult),
        marginPct: 35.4
      },
      {
        id: 'p8',
        productName: 'Presse-Agrumes Électrique Professionnel Inox 160W',
        sku: 'CUIS-JUIC-160W',
        category: 'Maison & Cuisine',
        supplier: 'Cameroun Agro-Tech Kribi',
        unitsSold: Math.round(82 * mult),
        revenue: Math.round(2050000 * mult),
        purchaseCost: Math.round(1148000 * mult),
        deliveryCost: Math.round(180000 * mult),
        discounts: Math.round(75000 * mult),
        estimatedProfit: Math.round(647000 * mult),
        marginPct: 31.6
      }
    ];
    return rawData;
  }, [mult]);

  // Filter & Sort table
  const filteredProducts = useMemo(() => {
    return profitabilityProducts
      .filter((p) => {
        const matchesQuery = p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             p.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSupplier = selectedSupplier === 'all' || p.supplier === selectedSupplier;
        return matchesQuery && matchesCategory && matchesSupplier;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
  }, [profitabilityProducts, searchQuery, selectedCategory, selectedSupplier, sortField, sortAsc]);

  // Handle column sort
  const handleSort = (field: keyof ProfitabilityRow) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Export handlers
  const handleExportCSV = () => {
    const headers = ['Produit', 'SKU', 'Categorie', 'Fournisseur', 'Unites Vendues', 'Chiffre Affaires (FCFA)', 'Cout Produits (FCFA)', 'Cout Livraison (FCFA)', 'Reductions (FCFA)', 'Marge Nette (FCFA)', 'Marge %'];
    const rows = filteredProducts.map(p => [
      `"${p.productName.replace(/"/g, '""')}"`,
      p.sku,
      `"${p.category}"`,
      `"${p.supplier}"`,
      p.unitsSold,
      p.revenue,
      p.purchaseCost,
      p.deliveryCost,
      p.discounts,
      p.estimatedProfit,
      p.marginPct
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rentabilite_finances_ifptie_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showExportNotice('Fichier CSV de rentabilité financière téléchargé !');
  };

  const handleExportExcel = () => {
    showExportNotice('Rapport Excel complet (XLSX) généré pour analyse comptable.');
  };

  const handleExportPDF = () => {
    showExportNotice('Préparation du rapport exécutif Finances PDF...');
    window.print();
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* EXPORT TOAST NOTIFICATION */}
      {exportNotice && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} color="#10b981" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* HEADER SECTION: Title, Subtitle, Date Presets & Export Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0b5738',
              boxShadow: '0 2px 5px rgba(11,87,56,0.12)'
            }}>
              <DollarSign size={24} />
            </div>
            <div>
              <h1 style={{
                fontSize: '1.75rem',
                fontWeight: 900,
                color: '#0f172a',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                Finances
              </h1>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '2px 0 0' }}>
                Tableau de bord de performance financière, marge brute & rentabilité unitaire IFPTIE Market
              </p>
            </div>
          </div>
        </div>

        {/* CONTROLS: Date Range Selector & Export actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Date Selector Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '4px',
            border: '1px solid #cbd5e1',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            {[
              { id: 'today', label: "Aujourd'hui" },
              { id: '7days', label: '7 jours' },
              { id: '30days', label: '30 jours' },
              { id: 'this_month', label: 'Ce mois' },
              { id: 'this_quarter', label: 'Trimestre' },
              { id: 'year', label: '2026' },
              { id: 'custom', label: 'Personnalisé' },
            ].map((p) => {
              const active = dateRange === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setDateRange(p.id as any)}
                  style={{
                    border: 'none',
                    backgroundColor: active ? '#0b5738' : 'transparent',
                    color: active ? '#ffffff' : '#64748b',
                    fontSize: '0.8125rem',
                    fontWeight: active ? 700 : 500,
                    padding: '6px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Export Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleExportCSV}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
              }}
              title="Exporter au format CSV"
            >
              <FileSpreadsheet size={15} color="#0b5738" />
              <span>CSV</span>
            </button>

            <button
              onClick={handleExportExcel}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
              }}
              title="Exporter au format Excel"
            >
              <Download size={15} color="#0284c7" />
              <span>Excel</span>
            </button>

            <button
              onClick={handleExportPDF}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                backgroundColor: '#0b5738',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(11,87,56,0.25)'
              }}
              title="Imprimer / Télécharger en PDF"
            >
              <Printer size={15} />
              <span>Rapport PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* CUSTOM DATE PICKER ROW (if 'custom' selected) */}
      {dateRange === 'custom' && (
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '12px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} color="#0b5738" /> Plage personnalisée :
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '0.8125rem', color: '#64748b' }}>Du :</label>
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8125rem'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '0.8125rem', color: '#64748b' }}>Au :</label>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8125rem'
              }}
            />
          </div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, backgroundColor: '#ecfdf5', padding: '4px 8px', borderRadius: '6px' }}>
            Période active : {customStartDate} au {customEndDate}
          </span>
        </div>
      )}

      {/* =========================================================================
          SECTION 1: THE 8 MAIN FINANCIAL KPIS
         ========================================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        {/* KPI 1: Chiffre d'affaires */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Chiffre d'affaires
              </span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
                {formatFCFA(kpis.revenue)}
              </div>
            </div>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0b5738'
            }}>
              <DollarSign size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
            <ArrowUpRight size={15} />
            <span>+18.4% vs période N-1</span>
          </div>
        </div>

        {/* KPI 2: Coût produits */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Coût produits
              </span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dc2626', marginTop: '6px' }}>
                {formatFCFA(kpis.productCost)}
              </div>
            </div>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#fef2f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#dc2626'
            }}>
              <Package size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.75rem', color: '#64748b' }}>
            <span>{( (kpis.productCost / kpis.revenue) * 100 ).toFixed(1)}% du chiffre d'affaires</span>
          </div>
        </div>

        {/* KPI 3: Coût livraison */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Coût livraison
              </span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ea580c', marginTop: '6px' }}>
                {formatFCFA(kpis.deliveryCost)}
              </div>
            </div>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#fff7ed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ea580c'
            }}>
              <Truck size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.75rem', color: '#64748b' }}>
            <span>Frais coursiers & expéditions interurbaines</span>
          </div>
        </div>

        {/* KPI 4: Réductions */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Réductions
              </span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7c3aed', marginTop: '6px' }}>
                {formatFCFA(kpis.discounts)}
              </div>
            </div>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#f5f3ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7c3aed'
            }}>
              <Percent size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.75rem', color: '#64748b' }}>
            <span>Codes promos & ventes flash appliquées</span>
          </div>
        </div>

        {/* KPI 5: Marge brute */}
        <div style={{
          backgroundColor: '#0f172a',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #1e293b',
          boxShadow: '0 4px 12px rgba(15,23,42,0.15)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Marge brute nette
              </span>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#34d399', marginTop: '6px' }}>
                {formatFCFA(kpis.grossMargin)}
              </div>
            </div>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'rgba(52, 211, 153, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399'
            }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.75rem', color: '#94a3b8' }}>
            <span>Après déduction achats + livraison + rabais</span>
          </div>
        </div>

        {/* KPI 6: Marge moyenne (%) */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Marge moyenne
              </span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0b5738', marginTop: '6px' }}>
                {kpis.averageMargin}%
              </div>
            </div>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0b5738'
            }}>
              <BarChart3 size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
            <span>Objectif rentabilité {'>'} 30% atteint</span>
          </div>
        </div>

        {/* KPI 7: Montant encaissé */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Montant encaissé
              </span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284c7', marginTop: '6px' }}>
                {formatFCFA(kpis.collectedAmount)}
              </div>
            </div>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#e0f2fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284c7'
            }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.75rem', color: '#0284c7', fontWeight: 600 }}>
            <span>88.0% du CA total déjà en trésorerie</span>
          </div>
        </div>

        {/* KPI 8: Montant en attente */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Montant en attente
              </span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b', marginTop: '6px' }}>
                {formatFCFA(kpis.pendingAmount)}
              </div>
            </div>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f59e0b'
            }}>
              <Clock size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.75rem', color: '#d97706', fontWeight: 600 }}>
            <span>Colis en cours de livraison / reversements</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: CHART - REVENUE VS ESTIMATED COSTS VS MARGIN
         ========================================================================= */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        marginBottom: '28px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Chiffre d'affaires vs Coûts estimés vs Marge
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '4px 0 0' }}>
              Évolution comparative temporelle : ventilation des flux entrants et coûts engagés
            </p>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#334155' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#0b5738' }}></span>
              <span style={{ fontWeight: 600 }}>Chiffre d'affaires</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#334155' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#ef4444' }}></span>
              <span style={{ fontWeight: 600 }}>Coût produits (Achats)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#334155' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#f97316' }}></span>
              <span style={{ fontWeight: 600 }}>Coût livraison</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#334155' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#10b981' }}></span>
              <span style={{ fontWeight: 600 }}>Marge nette</span>
            </div>
          </div>
        </div>

        {/* SVG Multi-bar & Grouped Visual Representation */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <div style={{ minWidth: '600px' }}>
            {/* Visual Bars Container */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', height: '240px', alignItems: 'flex-end', paddingBottom: '30px', borderBottom: '1px solid #e2e8f0', position: 'relative' }}>
              
              {/* Horizontal gridlines */}
              <div style={{ position: 'absolute', top: '0', left: 0, right: 0, borderTop: '1px dashed #e2e8f0', zIndex: 0 }}></div>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px dashed #e2e8f0', zIndex: 0 }}></div>

              {chartData.map((pt, idx) => {
                const maxVal = 14000000 * mult;
                const revHeight = Math.min(100, Math.round((pt.rev / maxVal) * 100));
                const prodCostHeight = Math.min(100, Math.round((pt.prodCost / maxVal) * 100));
                const delivCostHeight = Math.min(100, Math.round((pt.delivCost / maxVal) * 100));
                const marginHeight = Math.min(100, Math.round((pt.margin / maxVal) * 100));

                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '100%' }}>
                      
                      {/* Revenue Bar */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} title={`CA : ${formatFCFA(pt.rev)}`}>
                        <div style={{
                          width: '26px',
                          height: `${revHeight}%`,
                          backgroundColor: '#0b5738',
                          borderRadius: '6px 6px 0 0',
                          transition: 'height 0.4s ease'
                        }}></div>
                      </div>

                      {/* Product Cost Bar */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} title={`Achats : ${formatFCFA(pt.prodCost)}`}>
                        <div style={{
                          width: '26px',
                          height: `${prodCostHeight}%`,
                          backgroundColor: '#ef4444',
                          borderRadius: '6px 6px 0 0',
                          transition: 'height 0.4s ease'
                        }}></div>
                      </div>

                      {/* Delivery Cost Bar */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} title={`Livraison : ${formatFCFA(pt.delivCost)}`}>
                        <div style={{
                          width: '26px',
                          height: `${delivCostHeight}%`,
                          backgroundColor: '#f97316',
                          borderRadius: '6px 6px 0 0',
                          transition: 'height 0.4s ease'
                        }}></div>
                      </div>

                      {/* Margin Bar */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} title={`Marge : ${formatFCFA(pt.margin)}`}>
                        <div style={{
                          width: '26px',
                          height: `${marginHeight}%`,
                          backgroundColor: '#10b981',
                          borderRadius: '6px 6px 0 0',
                          transition: 'height 0.4s ease'
                        }}></div>
                      </div>
                    </div>

                    <div style={{ marginTop: '10px', fontSize: '0.8125rem', fontWeight: 700, color: '#334155' }}>
                      {pt.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary metrics under chart */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              paddingTop: '16px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Période CA</span>
                <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0b5738' }}>{formatFCFA(kpis.revenue)}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Achats</span>
                <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#ef4444' }}>{formatFCFA(kpis.productCost)}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Frais Livraison</span>
                <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#f97316' }}>{formatFCFA(kpis.deliveryCost)}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Marge Nette Dégagée</span>
                <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#10b981' }}>{formatFCFA(kpis.grossMargin)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: FINANCIAL BREAKDOWNS (By Product / By Category / By City / By Supplier)
         ========================================================================= */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        marginBottom: '28px'
      }}>
        {/* Breakdown Navigation Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Ventilations Financières Analytiques
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '4px 0 0' }}>
              Explorez la rentabilité par catégorie, ville de destination et partenaire fournisseur
            </p>
          </div>

          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '10px'
          }}>
            {[
              { id: 'category', label: 'Par Catégorie', icon: Layers },
              { id: 'city', label: 'Par Ville', icon: MapPin },
              { id: 'supplier', label: 'Par Fournisseur', icon: Building2 },
              { id: 'product', label: 'Par Produit (Synthèse)', icon: Package },
            ].map((tab) => {
              const active = activeBreakdown === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveBreakdown(tab.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: 'none',
                    backgroundColor: active ? '#ffffff' : 'transparent',
                    color: active ? '#0b5738' : '#64748b',
                    fontSize: '0.8125rem',
                    fontWeight: active ? 700 : 600,
                    padding: '8px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content 1: Category Breakdown */}
        {activeBreakdown === 'category' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {categoryBreakdown.map((cat, idx) => (
              <div key={idx} style={{
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '16px',
                backgroundColor: '#f8fafc'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a' }}>{cat.name}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff', backgroundColor: cat.color, padding: '3px 8px', borderRadius: '6px' }}>
                    {cat.share}% du CA
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span>Chiffre d'affaires :</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatFCFA(cat.revenue)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span>Coût d'achat produits :</span>
                    <span style={{ fontWeight: 600, color: '#dc2626' }}>{formatFCFA(cat.productCost)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span>Frais de livraison :</span>
                    <span style={{ fontWeight: 600, color: '#ea580c' }}>{formatFCFA(cat.deliveryCost)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px dashed #cbd5e1',
                    fontWeight: 700
                  }}>
                    <span style={{ color: '#0b5738' }}>Marge brute ({cat.marginPct}%) :</span>
                    <span style={{ color: '#0b5738', fontSize: '0.875rem' }}>{formatFCFA(cat.profit)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 2: City Breakdown */}
        {activeBreakdown === 'city' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', textTransform: 'uppercase', fontSize: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px' }}>Ville</th>
                  <th style={{ padding: '12px 16px' }}>Commandes</th>
                  <th style={{ padding: '12px 16px' }}>Chiffre d'affaires</th>
                  <th style={{ padding: '12px 16px' }}>Frais Livraison</th>
                  <th style={{ padding: '12px 16px' }}>Marge Réalisée</th>
                  <th style={{ padding: '12px 16px' }}>Taux de marge</th>
                  <th style={{ padding: '12px 16px' }}>Part CA</th>
                </tr>
              </thead>
              <tbody>
                {cityBreakdown.map((ct, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={16} color="#0b5738" />
                        <span>{ct.city}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>{ct.orders} colis</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>{formatFCFA(ct.revenue)}</td>
                    <td style={{ padding: '14px 16px', color: '#ea580c', fontWeight: 600 }}>{formatFCFA(ct.deliveryCost)}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0b5738' }}>{formatFCFA(ct.profit)}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ backgroundColor: '#ecfdf5', color: '#065f46', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
                        {ct.marginPct}%
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748b', fontWeight: 600 }}>{ct.share}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab Content 3: Supplier Breakdown */}
        {activeBreakdown === 'supplier' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', textTransform: 'uppercase', fontSize: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px' }}>Fournisseur</th>
                  <th style={{ padding: '12px 16px' }}>Origine / Canal</th>
                  <th style={{ padding: '12px 16px' }}>Réf. Produits</th>
                  <th style={{ padding: '12px 16px' }}>CA Ventes</th>
                  <th style={{ padding: '12px 16px' }}>Coût d'achat</th>
                  <th style={{ padding: '12px 16px' }}>Marge Dégagée</th>
                  <th style={{ padding: '12px 16px' }}>Taux Marge</th>
                  <th style={{ padding: '12px 16px' }}>Conditions</th>
                </tr>
              </thead>
              <tbody>
                {supplierBreakdown.map((sup, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Building2 size={16} color="#0284c7" />
                        <span>{sup.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748b' }}>{sup.country}</td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>{sup.productsCount} articles</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>{formatFCFA(sup.revenue)}</td>
                    <td style={{ padding: '14px 16px', color: '#dc2626', fontWeight: 600 }}>{formatFCFA(sup.purchaseCost)}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0b5738' }}>{formatFCFA(sup.estimatedProfit)}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ backgroundColor: '#ecfdf5', color: '#065f46', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
                        {sup.marginPct}%
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '0.75rem' }}>{sup.paymentTerms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab Content 4: Product Summary */}
        {activeBreakdown === 'product' && (
          <div style={{ padding: '12px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.875rem', color: '#475569', margin: '0 0 8px' }}>
              Consultez le tableau détaillé complet de rentabilité par produit ci-dessous avec toutes les métriques unitaires.
            </p>
            <span style={{ fontSize: '0.75rem', color: '#0b5738', fontWeight: 700 }}>
              {profitabilityProducts.length} articles clés analysés dans la période active.
            </span>
          </div>
        )}
      </div>

      {/* =========================================================================
          SECTION 4: PROFITABILITY TABLE (TABLEAU DE RENTABILITÉ)
         ========================================================================= */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Tableau de Rentabilité par Produit
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '4px 0 0' }}>
              Détail unitaire : Unités vendues, Chiffre d'affaires, Achats, Frais de livraison, Réductions & Marge nette
            </p>
          </div>

          {/* Quick Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Rechercher produit ou SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8125rem',
                minWidth: '220px'
              }}
            />

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8125rem',
                backgroundColor: '#ffffff',
                color: '#334155'
              }}
            >
              <option value="all">Toutes catégories</option>
              <option value="Énergie & Solaire">Énergie & Solaire</option>
              <option value="Maison & Cuisine">Maison & Cuisine</option>
              <option value="Électronique & High-Tech">Électronique & High-Tech</option>
              <option value="Bricolage & Outillage">Bricolage & Outillage</option>
            </select>

            {/* Supplier Dropdown */}
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8125rem',
                backgroundColor: '#ffffff',
                color: '#334155'
              }}
            >
              <option value="all">Tous fournisseurs</option>
              <option value="Shenzhen SunPower Direct">Shenzhen SunPower Direct</option>
              <option value="Guangzhou SmartLife Co.">Guangzhou SmartLife Co.</option>
              <option value="Cameroun Agro-Tech Kribi">Cameroun Agro-Tech Kribi</option>
              <option value="Douala Électro Import SARL">Douala Électro Import SARL</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', color: '#475569', textTransform: 'uppercase', fontSize: '0.75rem', borderBottom: '2px solid #e2e8f0' }}>
                <th
                  onClick={() => handleSort('productName')}
                  style={{ padding: '12px 14px', cursor: 'pointer', userSelect: 'none' }}
                >
                  Product {sortField === 'productName' && (sortAsc ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => handleSort('unitsSold')}
                  style={{ padding: '12px 14px', cursor: 'pointer', userSelect: 'none' }}
                >
                  Units sold {sortField === 'unitsSold' && (sortAsc ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => handleSort('revenue')}
                  style={{ padding: '12px 14px', cursor: 'pointer', userSelect: 'none' }}
                >
                  Revenue {sortField === 'revenue' && (sortAsc ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => handleSort('purchaseCost')}
                  style={{ padding: '12px 14px', cursor: 'pointer', userSelect: 'none' }}
                >
                  Purchase cost {sortField === 'purchaseCost' && (sortAsc ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => handleSort('deliveryCost')}
                  style={{ padding: '12px 14px', cursor: 'pointer', userSelect: 'none' }}
                >
                  Delivery cost {sortField === 'deliveryCost' && (sortAsc ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => handleSort('discounts')}
                  style={{ padding: '12px 14px', cursor: 'pointer', userSelect: 'none' }}
                >
                  Discounts {sortField === 'discounts' && (sortAsc ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => handleSort('estimatedProfit')}
                  style={{ padding: '12px 14px', cursor: 'pointer', userSelect: 'none' }}
                >
                  Estimated profit {sortField === 'estimatedProfit' && (sortAsc ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => handleSort('marginPct')}
                  style={{ padding: '12px 14px', cursor: 'pointer', userSelect: 'none' }}
                >
                  Margin % {sortField === 'marginPct' && (sortAsc ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s ease' }}>
                  {/* Product & SKU */}
                  <td style={{ padding: '14px', maxWidth: '280px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '2px', lineHeight: '1.3' }}>
                      {row.productName}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: '#64748b' }}>
                      <span style={{ fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '1px 5px', borderRadius: '4px' }}>
                        {row.sku}
                      </span>
                      <span>• {row.supplier}</span>
                    </div>
                  </td>

                  {/* Units Sold */}
                  <td style={{ padding: '14px', fontWeight: 600, color: '#334155' }}>
                    {row.unitsSold} unités
                  </td>

                  {/* Revenue */}
                  <td style={{ padding: '14px', fontWeight: 700, color: '#0f172a' }}>
                    {formatFCFA(row.revenue)}
                  </td>

                  {/* Purchase Cost */}
                  <td style={{ padding: '14px', fontWeight: 600, color: '#dc2626' }}>
                    {formatFCFA(row.purchaseCost)}
                  </td>

                  {/* Delivery Cost */}
                  <td style={{ padding: '14px', fontWeight: 600, color: '#ea580c' }}>
                    {formatFCFA(row.deliveryCost)}
                  </td>

                  {/* Discounts */}
                  <td style={{ padding: '14px', fontWeight: 600, color: '#7c3aed' }}>
                    {formatFCFA(row.discounts)}
                  </td>

                  {/* Estimated Profit */}
                  <td style={{ padding: '14px', fontWeight: 800, color: '#0b5738' }}>
                    {formatFCFA(row.estimatedProfit)}
                  </td>

                  {/* Margin % */}
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        backgroundColor: row.marginPct >= 35 ? '#ecfdf5' : '#fffbeb',
                        color: row.marginPct >= 35 ? '#065f46' : '#b45309'
                      }}>
                        {row.marginPct}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                    Aucun produit ne correspond aux filtres sélectionnés.
                  </td>
                </tr>
              )}
            </tbody>

            {/* Table Footer Totals */}
            {filteredProducts.length > 0 && (
              <tfoot>
                <tr style={{ backgroundColor: '#f8fafc', fontWeight: 800, borderTop: '2px solid #cbd5e1' }}>
                  <td style={{ padding: '14px', color: '#0f172a' }}>TOTAL ({filteredProducts.length} articles)</td>
                  <td style={{ padding: '14px', color: '#334155' }}>
                    {filteredProducts.reduce((acc, p) => acc + p.unitsSold, 0)}
                  </td>
                  <td style={{ padding: '14px', color: '#0f172a' }}>
                    {formatFCFA(filteredProducts.reduce((acc, p) => acc + p.revenue, 0))}
                  </td>
                  <td style={{ padding: '14px', color: '#dc2626' }}>
                    {formatFCFA(filteredProducts.reduce((acc, p) => acc + p.purchaseCost, 0))}
                  </td>
                  <td style={{ padding: '14px', color: '#ea580c' }}>
                    {formatFCFA(filteredProducts.reduce((acc, p) => acc + p.deliveryCost, 0))}
                  </td>
                  <td style={{ padding: '14px', color: '#7c3aed' }}>
                    {formatFCFA(filteredProducts.reduce((acc, p) => acc + p.discounts, 0))}
                  </td>
                  <td style={{ padding: '14px', color: '#0b5738' }}>
                    {formatFCFA(filteredProducts.reduce((acc, p) => acc + p.estimatedProfit, 0))}
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span style={{ backgroundColor: '#ecfdf5', color: '#065f46', padding: '4px 8px', borderRadius: '6px' }}>
                      {kpis.averageMargin}%
                    </span>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
