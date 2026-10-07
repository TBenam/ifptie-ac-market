import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import {
  Tag,
  Sparkles,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Percent,
  Truck,
  Layers,
  Gift,
  Zap,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Copy,
  ArrowUpRight,
  Check,
  X,
  Image as ImageIcon,
  ChevronRight,
  SlidersHorizontal,
  BarChart3,
  Target,
  Users,
  RefreshCw,
  Download,
  AlertTriangle,
  FolderTree,
  Package
} from 'lucide-react';

// Promotion Types matching prompt
export type PromotionType = 
  | 'percentage' 
  | 'fixed' 
  | 'flash_sale' 
  | 'bundle' 
  | 'buy_x_get_y' 
  | 'free_delivery' 
  | 'category';

export type PromotionStatus = 'active' | 'scheduled' | 'expired' | 'disabled';

export interface PromotionItem {
  id: string;
  name: string;
  code: string;
  type: PromotionType;
  discountType: 'percentage' | 'fixed' | 'free_shipping' | 'bundle_deal';
  discountValue: number; // e.g. 20 for 20%, 5000 for 5000 FCFA
  targetScope: 'all' | 'category' | 'products';
  targetCategories: string[];
  targetProducts: string[];
  minOrderAmount?: number;
  startDate: string; // ISO or YYYY-MM-DDTHH:mm
  endDate: string;
  maxUses: number | null;
  currentUses: number;
  banner: string;
  bannerTitle: string;
  bannerSubtitle: string;
  status: PromotionStatus;
  isFeatured?: boolean;
  performance: {
    ordersGenerated: number;
    revenue: number; // in FCFA
    discountGranted: number; // in FCFA
    conversionRate: number; // in %
    viewsCount: number;
    clicksCount: number;
  };
}

export const AdminPromotionsView: React.FC = () => {
  const { addToast } = useStore();

  // Initial rich promotion data tailored to IFPTIE Market
  const [promotions, setPromotions] = useState<PromotionItem[]>([
    {
      id: 'promo-flash-solar',
      name: 'Vente Flash Solaire Anti-Délestage',
      code: 'SOLARFLASH30',
      type: 'flash_sale',
      discountType: 'percentage',
      discountValue: 30,
      targetScope: 'category',
      targetCategories: ['Énergie & Solaire', 'Lampes solaires'],
      targetProducts: ['Kit Solaire Autonome 500W', 'Projecteur Solaire 200W LED'],
      minOrderAmount: 25000,
      startDate: '2026-09-18T08:00',
      endDate: '2026-09-24T23:59',
      maxUses: 200,
      currentUses: 146,
      banner: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
      bannerTitle: '⚡ Vente Flash Solaire : Jusqu\'à -30% !',
      bannerSubtitle: 'Équipez votre maison à Yaoundé et Douala contre les coupures.',
      status: 'active',
      isFeatured: true,
      performance: {
        ordersGenerated: 146,
        revenue: 8450000,
        discountGranted: 1620000,
        conversionRate: 6.8,
        viewsCount: 3820,
        clicksCount: 890
      }
    },
    {
      id: 'promo-bundle-cuisine',
      name: 'Pack Confort Cuisine & Foyer',
      code: 'PACKCUISINE',
      type: 'bundle',
      discountType: 'bundle_deal',
      discountValue: 15000,
      targetScope: 'category',
      targetCategories: ['Maison & Cuisine', 'Cuisine'],
      targetProducts: ['Marmite Électrique Multifonction', 'Friteuse Sans Huile AirFryer 6L'],
      minOrderAmount: 40000,
      startDate: '2026-09-15T00:00',
      endDate: '2026-10-05T23:59',
      maxUses: 100,
      currentUses: 78,
      banner: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
      bannerTitle: '🎁 Pack Duo Chef : 15 000 FCFA Offerts',
      bannerSubtitle: 'Achetez l\'AirFryer + le Cuiseur, recevez 1 lot d\'ustensiles.',
      status: 'active',
      isFeatured: false,
      performance: {
        ordersGenerated: 78,
        revenue: 4290000,
        discountGranted: 1170000,
        conversionRate: 5.2,
        viewsCount: 2450,
        clicksCount: 510
      }
    },
    {
      id: 'promo-free-delivery',
      name: 'Livraison Gratuite Yaoundé & Douala',
      code: 'LIVRAISONGRATUITE',
      type: 'free_delivery',
      discountType: 'free_shipping',
      discountValue: 2500,
      targetScope: 'all',
      targetCategories: [],
      targetProducts: [],
      minOrderAmount: 35000,
      startDate: '2026-09-01T00:00',
      endDate: '2026-09-30T23:59',
      maxUses: 500,
      currentUses: 412,
      banner: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      bannerTitle: '🚚 Livraison Moto Offerte dès 35 000 FCFA',
      bannerSubtitle: 'Valable pour toute commande sur Yaoundé, Douala et Kribi.',
      status: 'active',
      isFeatured: true,
      performance: {
        ordersGenerated: 412,
        revenue: 19850000,
        discountGranted: 1030000,
        conversionRate: 8.4,
        viewsCount: 8900,
        clicksCount: 2240
      }
    },
    {
      id: 'promo-percentage-hightech',
      name: 'Remise Tech & Accessoires -20%',
      code: 'TECH20',
      type: 'percentage',
      discountType: 'percentage',
      discountValue: 20,
      targetScope: 'category',
      targetCategories: ['High-Tech & Accessoires'],
      targetProducts: ['Écouteurs TWS Pro Sans Fil', 'PowerBank Solaire 30000mAh'],
      minOrderAmount: 15000,
      startDate: '2026-09-10T00:00',
      endDate: '2026-09-22T23:59',
      maxUses: 300,
      currentUses: 215,
      banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
      bannerTitle: '-20% Immédiat sur les Accessoires Connectés',
      bannerSubtitle: 'Code promo TECH20 valable jusqu\'à épuisement des stocks.',
      status: 'active',
      isFeatured: false,
      performance: {
        ordersGenerated: 215,
        revenue: 5375000,
        discountGranted: 1075000,
        conversionRate: 4.9,
        viewsCount: 4200,
        clicksCount: 780
      }
    },
    {
      id: 'promo-buy-x-get-y',
      name: 'Achetez 2 Panneaux, 3ème à -50%',
      code: 'PANNEAU50',
      type: 'buy_x_get_y',
      discountType: 'percentage',
      discountValue: 50,
      targetScope: 'products',
      targetCategories: ['Énergie & Solaire'],
      targetProducts: ['Panneau Solaire Monocristallin 200W', 'Panneau 400W Haute Efficacité'],
      minOrderAmount: 80000,
      startDate: '2026-09-28T00:00',
      endDate: '2026-10-15T23:59',
      maxUses: 80,
      currentUses: 0,
      banner: 'https://images.unsplash.com/photo-1508873696983-2df57046475b?w=800&auto=format&fit=crop&q=80',
      bannerTitle: '☀️ Offre Spéciale Installation Solaire : 2 + 1/2',
      bannerSubtitle: 'Profitez de 50% sur le 3ème panneau commandé.',
      status: 'scheduled',
      isFeatured: false,
      performance: {
        ordersGenerated: 0,
        revenue: 0,
        discountGranted: 0,
        conversionRate: 0,
        viewsCount: 120,
        clicksCount: 15
      }
    },
    {
      id: 'promo-octobre-beauté',
      name: 'Promo Catégorie Soins & Beauté d\'Octobre',
      code: 'BEAUTE15',
      type: 'category',
      discountType: 'percentage',
      discountValue: 15,
      targetScope: 'category',
      targetCategories: ['Beauté & Bien-être'],
      targetProducts: [],
      minOrderAmount: 10000,
      startDate: '2026-10-01T00:00',
      endDate: '2026-10-31T23:59',
      maxUses: 250,
      currentUses: 0,
      banner: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      bannerTitle: '✨ Mois de la Beauté : -15% sur tous les soins',
      bannerSubtitle: 'Formules naturelles, karité pur et brumes parfumées.',
      status: 'scheduled',
      isFeatured: false,
      performance: {
        ordersGenerated: 0,
        revenue: 0,
        discountGranted: 0,
        conversionRate: 0,
        viewsCount: 45,
        clicksCount: 4
      }
    },
    {
      id: 'promo-fixed-rentree',
      name: 'Rentrée 2026 : -10 000 FCFA Directs',
      code: 'RENTREE10K',
      type: 'fixed',
      discountType: 'fixed',
      discountValue: 10000,
      targetScope: 'all',
      targetCategories: [],
      targetProducts: [],
      minOrderAmount: 60000,
      startDate: '2026-08-20T00:00',
      endDate: '2026-09-10T23:59',
      maxUses: 200,
      currentUses: 200,
      banner: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
      bannerTitle: '🎒 Bon d\'Achat Rentrée : 10 000 FCFA Déduits',
      bannerSubtitle: 'Opération spéciale rentrée scolaire et fournitures bureaux.',
      status: 'expired',
      isFeatured: false,
      performance: {
        ordersGenerated: 200,
        revenue: 14600000,
        discountGranted: 2000000,
        conversionRate: 7.1,
        viewsCount: 5120,
        clicksCount: 1340
      }
    }
  ]);

  // Filters state
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'scheduled' | 'expired'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<PromotionItem | null>(null);
  const [selectedPerformancePromo, setSelectedPerformancePromo] = useState<PromotionItem | null>(null);

  // Form state for Create / Edit
  const initialFormState: Partial<PromotionItem> = {
    name: '',
    code: '',
    type: 'percentage',
    discountType: 'percentage',
    discountValue: 15,
    targetScope: 'all',
    targetCategories: [],
    targetProducts: [],
    minOrderAmount: 20000,
    startDate: new Date().toISOString().slice(0, 16),
    endDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 16),
    maxUses: 150,
    currentUses: 0,
    banner: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
    bannerTitle: 'Offre Spéciale IFPTIE Market',
    bannerSubtitle: 'Profitez de remises exclusives pour toute livraison au Cameroun.',
    status: 'active',
    isFeatured: false
  };
  const [formData, setFormData] = useState<Partial<PromotionItem>>(initialFormState);

  // Calculate Dashboard Summary Metrics
  const activeCount = promotions.filter(p => p.status === 'active').length;
  const scheduledCount = promotions.filter(p => p.status === 'scheduled').length;
  const expiredCount = promotions.filter(p => p.status === 'expired').length;

  const totalOrdersGenerated = promotions.reduce((acc, p) => acc + p.performance.ordersGenerated, 0);
  const totalRevenue = promotions.reduce((acc, p) => acc + p.performance.revenue, 0);
  const totalDiscountGranted = promotions.reduce((acc, p) => acc + p.performance.discountGranted, 0);
  const averageConversionRate = (
    promotions.reduce((acc, p) => acc + (p.performance.conversionRate || 0), 0) / (promotions.length || 1)
  ).toFixed(1);

  // Filtered promotions list
  const filteredPromotions = promotions.filter(promo => {
    // Tab filter
    if (activeTab === 'active' && promo.status !== 'active') return false;
    if (activeTab === 'scheduled' && promo.status !== 'scheduled') return false;
    if (activeTab === 'expired' && promo.status !== 'expired') return false;

    // Type filter
    if (selectedTypeFilter !== 'all' && promo.type !== selectedTypeFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = promo.name.toLowerCase().includes(q);
      const matchCode = promo.code.toLowerCase().includes(q);
      const matchBanner = promo.bannerTitle.toLowerCase().includes(q);
      const matchCategory = promo.targetCategories.some(c => c.toLowerCase().includes(q));
      if (!matchName && !matchCode && !matchBanner && !matchCategory) return false;
    }

    return true;
  });

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingPromotion(null);
    setFormData({
      ...initialFormState,
      code: 'PROMO-' + Math.random().toString(36).substring(2, 7).toUpperCase()
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (promo: PromotionItem) => {
    setEditingPromotion(promo);
    setFormData({ ...promo });
    setIsModalOpen(true);
  };

  // Duplicate Promotion
  const handleDuplicate = (promo: PromotionItem) => {
    const duplicated: PromotionItem = {
      ...promo,
      id: 'promo-' + Date.now(),
      name: `${promo.name} (Copie)`,
      code: `${promo.code}-COPY`,
      currentUses: 0,
      status: 'scheduled',
      performance: {
        ordersGenerated: 0,
        revenue: 0,
        discountGranted: 0,
        conversionRate: 0,
        viewsCount: 0,
        clicksCount: 0
      }
    };
    setPromotions([duplicated, ...promotions]);
    addToast(`La promotion « ${duplicated.name} » a été créée en mode planifié.`, 'success');
  };

  // Toggle Status (Enable / Disable)
  const handleToggleStatus = (promoId: string) => {
    setPromotions(prev =>
      prev.map(p => {
        if (p.id !== promoId) return p;
        const newStatus: PromotionStatus = p.status === 'active' ? 'disabled' : 'active';
        return { ...p, status: newStatus };
      })
    );
    addToast('Le statut de la promotion a été modifié instantanément.', 'info');
  };

  // Delete Promotion
  const handleDelete = (promoId: string, promoName: string) => {
    if (confirm(`Confirmez-vous la suppression de la promotion « ${promoName} » ?`)) {
      setPromotions(prev => prev.filter(p => p.id !== promoId));
      addToast(`La promotion « ${promoName} » a été retirée du catalogue.`, 'info');
    }
  };

  // Save Promotion from Form
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.code?.trim()) {
      alert('Veuillez renseigner le nom et le code promo.');
      return;
    }

    if (editingPromotion) {
      setPromotions(prev =>
        prev.map(p => (p.id === editingPromotion.id ? ({ ...p, ...formData } as PromotionItem) : p))
      );
      addToast(`Les modifications de « ${formData.name} » ont été enregistrées.`, 'success');
    } else {
      const newPromo: PromotionItem = {
        ...(formData as PromotionItem),
        id: 'promo-' + Date.now(),
        currentUses: 0,
        performance: {
          ordersGenerated: 0,
          revenue: 0,
          discountGranted: 0,
          conversionRate: 0,
          viewsCount: 0,
          clicksCount: 0
        }
      };
      setPromotions([newPromo, ...promotions]);
      addToast(`La campagne « ${newPromo.name} » est maintenant enregistrée.`, 'success');
    }

    setIsModalOpen(false);
  };

  // Helper type metadata
  const getTypeBadge = (type: PromotionType) => {
    switch (type) {
      case 'percentage':
        return { label: 'Remise en %', color: '#8b5cf6', bg: '#f5f3ff', icon: Percent };
      case 'fixed':
        return { label: 'Remise fixe FCFA', color: '#0b5738', bg: '#ecfdf5', icon: DollarSign };
      case 'flash_sale':
        return { label: 'Vente Flash ⚡', color: '#ea580c', bg: '#fff7ed', icon: Zap };
      case 'bundle':
        return { label: 'Pack Bundle 🎁', color: '#0284c7', bg: '#f0f9ff', icon: Gift };
      case 'buy_x_get_y':
        return { label: 'Achetez X Obtenez Y', color: '#db2777', bg: '#fdf2f8', icon: Layers };
      case 'free_delivery':
        return { label: 'Livraison Gratuite 🚚', color: '#16a34a', bg: '#f0fdf4', icon: Truck };
      case 'category':
        return { label: 'Remise Catégorie', color: '#d97706', bg: '#fffbeb', icon: FolderTree };
      default:
        return { label: 'Promotion', color: '#64748b', bg: '#f8fafc', icon: Tag };
    }
  };

  const getStatusBadge = (status: PromotionStatus) => {
    switch (status) {
      case 'active':
        return { label: 'Actif', color: '#15803d', bg: '#dcfce7', dot: '#22c55e' };
      case 'scheduled':
        return { label: 'Planifié', color: '#0369a1', bg: '#e0f2fe', dot: '#0284c7' };
      case 'expired':
        return { label: 'Expiré', color: '#64748b', bg: '#f1f5f9', dot: '#94a3b8' };
      case 'disabled':
        return { label: 'Désactivé', color: '#b91c1c', bg: '#fee2e2', dot: '#ef4444' };
    }
  };

  // Copy code utility
  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    addToast(`Le code « ${code} » a été copié dans le presse-papiers.`, 'info');
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%', padding: '28px 32px 80px' }}>
      {/* 1. TOP HEADER */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '28px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#0b5738',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(11, 87, 56, 0.25)'
            }}>
              <Tag size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
                Promotions
              </h1>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                Pilotez vos campagnes marketing, ventes flash, bundles et codes promotionnels pour dynamiser le commerce au Cameroun.
              </p>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              addToast('Rapport des performances de promotions exporté en CSV.', 'info');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <Download size={16} />
            Exporter
          </button>

          <button
            onClick={handleOpenCreate}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#0b5738',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: 800,
              color: '#ffffff',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(11, 87, 56, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            <Plus size={18} />
            Créer une promotion
          </button>
        </div>
      </div>

      {/* 2. DASHBOARD KPI CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        {/* Active Promotions */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Promotions Actives
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>
              {activeCount}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
              Campagnes en direct
            </div>
          </div>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            backgroundColor: '#ecfdf5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0b5738'
          }}>
            <Sparkles size={26} />
          </div>
        </div>

        {/* Scheduled Promotions */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Planifiées (Scheduled)
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>
              {scheduledCount}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '0.75rem', color: '#0284c7', fontWeight: 700 }}>
              <Clock size={12} />
              Lancements à venir
            </div>
          </div>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            backgroundColor: '#e0f2fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0284c7'
          }}>
            <Calendar size={26} />
          </div>
        </div>

        {/* Revenue Generated */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Chiffre d'Affaires Généré
            </div>
            <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#0b5738', marginTop: '6px' }}>
              {formatFCFA(totalRevenue)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
              <TrendingUp size={12} color="#16a34a" />
              Sur {totalOrdersGenerated} commandes
            </div>
          </div>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            backgroundColor: '#fef3c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#d97706'
          }}>
            <DollarSign size={26} />
          </div>
        </div>

        {/* Discounts Granted & Conversion */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Remises Accordées & Conv.
            </div>
            <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#dc2626', marginTop: '6px' }}>
              {formatFCFA(totalDiscountGranted)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '0.75rem', color: '#0f172a', fontWeight: 700 }}>
              <Target size={12} color="#8b5cf6" />
              Taux conversion moyen : <span style={{ color: '#8b5cf6' }}>{averageConversionRate}%</span>
            </div>
          </div>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            backgroundColor: '#f5f3ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8b5cf6'
          }}>
            <BarChart3 size={26} />
          </div>
        </div>
      </div>

      {/* 3. FILTER TABS & SEARCH CONTROLS */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        padding: '16px 20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Status Tabs: Toutes | Active promotions | Scheduled | Expired */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'all' ? '#ffffff' : 'transparent',
              color: activeTab === 'all' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'all' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Toutes ({promotions.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            style={{
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'active' ? '#ffffff' : 'transparent',
              color: activeTab === 'active' ? '#15803d' : '#64748b',
              boxShadow: activeTab === 'active' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
            Active ({activeCount})
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            style={{
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'scheduled' ? '#ffffff' : 'transparent',
              color: activeTab === 'scheduled' ? '#0284c7' : '#64748b',
              boxShadow: activeTab === 'scheduled' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Scheduled ({scheduledCount})
          </button>
          <button
            onClick={() => setActiveTab('expired')}
            style={{
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'expired' ? '#ffffff' : 'transparent',
              color: activeTab === 'expired' ? '#64748b' : '#64748b',
              boxShadow: activeTab === 'expired' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Expired ({expiredCount})
          </button>
        </div>

        {/* Search & Type Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1, justifyContent: 'flex-end' }}>
          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '8px 12px',
            minWidth: '220px',
            maxWidth: '320px',
            flex: 1
          }}>
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Rechercher promotion ou code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                outline: 'none',
                fontSize: '0.8125rem',
                color: '#0f172a',
                width: '100%'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Promotion Type Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <SlidersHorizontal size={15} color="#64748b" />
            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#1e293b',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">Tous les types de promos</option>
              <option value="percentage">Remise en % (Percentage)</option>
              <option value="fixed">Remise fixe (Fixed discount)</option>
              <option value="flash_sale">Vente Flash (Flash sale)</option>
              <option value="bundle">Pack groupé (Bundle)</option>
              <option value="buy_x_get_y">Achetez X Obtenez Y (Buy X get Y)</option>
              <option value="free_delivery">Livraison Gratuite (Free delivery)</option>
              <option value="category">Remise par Catégorie (Category promo)</option>
            </select>
          </div>

          {/* View toggle (Cards vs Table) */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
            <button
              onClick={() => setViewMode('cards')}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: viewMode === 'cards' ? '#ffffff' : 'transparent',
                color: viewMode === 'cards' ? '#0f172a' : '#64748b',
                fontSize: '0.75rem',
                fontWeight: 700,
                boxShadow: viewMode === 'cards' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              Grille
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: viewMode === 'table' ? '#ffffff' : 'transparent',
                color: viewMode === 'table' ? '#0f172a' : '#64748b',
                fontSize: '0.75rem',
                fontWeight: 700,
                boxShadow: viewMode === 'table' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              Tableau
            </button>
          </div>
        </div>
      </div>

      {/* 4. PROMOTIONS LIST (CARDS VIEW OR TABLE VIEW) */}
      {filteredPromotions.length === 0 ? (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '60px 20px',
          textAlign: 'center',
          border: '1px dashed #cbd5e1'
        }}>
          <Tag size={44} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
            Aucune promotion trouvée
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 16px' }}>
            Ajustez vos filtres ou créez une nouvelle campagne marketing dès maintenant.
          </p>
          <button
            onClick={handleOpenCreate}
            style={{
              padding: '8px 18px',
              backgroundColor: '#0b5738',
              color: '#ffffff',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            + Créer une promotion
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        /* CARDS VIEW */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {filteredPromotions.map((promo) => {
            const typeInfo = getTypeBadge(promo.type);
            const statusInfo = getStatusBadge(promo.status);
            const TypeIcon = typeInfo.icon;
            const usagePercent = promo.maxUses ? Math.min(100, Math.round((promo.currentUses / promo.maxUses) * 100)) : 100;

            return (
              <div
                key={promo.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
              >
                {/* Visual Banner Preview */}
                <div style={{
                  position: 'relative',
                  height: '130px',
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(7,36,24,0.85) 100%), url(${promo.banner})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  {/* Top Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: typeInfo.bg,
                      color: typeInfo.color,
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      <TypeIcon size={12} />
                      {typeInfo.label}
                    </span>

                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: statusInfo.bg,
                      color: statusInfo.color,
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusInfo.dot }} />
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Banner Content */}
                  <div>
                    <h4 style={{
                      color: '#ffffff',
                      fontSize: '0.9375rem',
                      fontWeight: 900,
                      margin: 0,
                      textShadow: '0 1px 3px rgba(0,0,0,0.6)'
                    }}>
                      {promo.bannerTitle}
                    </h4>
                    <p style={{
                      color: '#cbd5e1',
                      fontSize: '0.75rem',
                      margin: '2px 0 0',
                      textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {promo.bannerSubtitle}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {/* Promo Name & Code */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        {promo.name}
                      </h3>
                      <button
                        onClick={() => handleCopyCode(promo.code)}
                        title="Copier le code promo"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          backgroundColor: '#f8fafc',
                          border: '1px dashed #94a3b8',
                          borderRadius: '6px',
                          padding: '3px 7px',
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          fontFamily: 'monospace',
                          color: '#0b5738',
                          cursor: 'pointer'
                        }}
                      >
                        <code>{promo.code}</code>
                        <Copy size={11} />
                      </button>
                    </div>

                    {/* Scope / Target Categories or Products */}
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '14px' }}>
                      {promo.targetScope === 'all' ? (
                        <span>Tous les produits du catalogue</span>
                      ) : promo.targetCategories.length > 0 ? (
                        <span>Rayon : <strong>{promo.targetCategories.join(', ')}</strong></span>
                      ) : (
                        <span>{promo.targetProducts.length} produit(s) ciblés</span>
                      )}
                      {promo.minOrderAmount ? ` • Dès ${formatFCFA(promo.minOrderAmount)}` : ''}
                    </div>

                    {/* Performance Metrics Grid */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      border: '1px solid #edf2f7',
                      marginBottom: '14px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '8px'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 600 }}>Commandes</div>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a' }}>
                          {promo.performance.ordersGenerated} cmds
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 600 }}>Chiffre d'Affaires</div>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0b5738' }}>
                          {formatFCFA(promo.performance.revenue)}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 600 }}>Remises Accordées</div>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#dc2626' }}>
                          {formatFCFA(promo.performance.discountGranted)}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 600 }}>Conversion</div>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#8b5cf6' }}>
                          {promo.performance.conversionRate}%
                        </div>
                      </div>
                    </div>

                    {/* Usage Progress Bar */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
                        <span>Utilisations</span>
                        <span>
                          {promo.currentUses} {promo.maxUses ? `/ ${promo.maxUses} (${usagePercent}%)` : 'utilisations'}
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${usagePercent}%`,
                            backgroundColor: usagePercent > 90 ? '#ef4444' : '#0b5738',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                    </div>

                    {/* Dates / Timeline */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.6875rem', color: '#64748b' }}>
                      <Calendar size={12} color="#94a3b8" />
                      <span>Du {promo.startDate.slice(0, 10)} au {promo.endDate.slice(0, 10)}</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid #f1f5f9'
                  }}>
                    {/* Quick Performance Drawer Trigger */}
                    <button
                      onClick={() => setSelectedPerformancePromo(promo)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'transparent',
                        border: 'none',
                        color: '#0b5738',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      <BarChart3 size={14} />
                      Détails perf.
                    </button>

                    {/* Action Icon Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {/* Toggle status */}
                      <button
                        onClick={() => handleToggleStatus(promo.id)}
                        title={promo.status === 'active' ? 'Désactiver' : 'Activer'}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: promo.status === 'active' ? '#16a34a' : '#94a3b8',
                          cursor: 'pointer'
                        }}
                      >
                        {promo.status === 'active' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={() => handleDuplicate(promo)}
                        title="Dupliquer"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#64748b',
                          cursor: 'pointer'
                        }}
                      >
                        <Copy size={14} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => handleOpenEdit(promo)}
                        title="Modifier"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0284c7',
                          cursor: 'pointer'
                        }}
                      >
                        <Edit size={14} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(promo.id, promo.name)}
                        title="Supprimer"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: '1px solid #fee2e2',
                          backgroundColor: '#fef2f2',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#dc2626',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 800 }}>
                  <th style={{ padding: '14px 18px' }}>Promotion & Bannière</th>
                  <th style={{ padding: '14px 14px' }}>Type</th>
                  <th style={{ padding: '14px 14px' }}>Remise</th>
                  <th style={{ padding: '14px 14px' }}>Cible</th>
                  <th style={{ padding: '14px 14px' }}>Période</th>
                  <th style={{ padding: '14px 14px' }}>Utilisations</th>
                  <th style={{ padding: '14px 14px' }}>Performance (CA / Conv)</th>
                  <th style={{ padding: '14px 14px' }}>Statut</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPromotions.map((promo) => {
                  const typeInfo = getTypeBadge(promo.type);
                  const statusInfo = getStatusBadge(promo.status);

                  return (
                    <tr
                      key={promo.id}
                      style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.1s ease' }}
                    >
                      {/* Name & Banner */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={promo.banner}
                            alt=""
                            style={{ width: '48px', height: '36px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
                          />
                          <div>
                            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>
                              {promo.name}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#0b5738', fontWeight: 700 }}>
                                {promo.code}
                              </span>
                              <button
                                onClick={() => handleCopyCode(promo.code)}
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, color: '#94a3b8' }}
                              >
                                <Copy size={11} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td style={{ padding: '14px 14px' }}>
                        <span style={{
                          backgroundColor: typeInfo.bg,
                          color: typeInfo.color,
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}>
                          {typeInfo.label}
                        </span>
                      </td>

                      {/* Discount */}
                      <td style={{ padding: '14px 14px', fontWeight: 800, color: '#0f172a' }}>
                        {promo.discountType === 'percentage'
                          ? `-${promo.discountValue}%`
                          : promo.discountType === 'fixed'
                          ? `-${formatFCFA(promo.discountValue)}`
                          : promo.discountType === 'free_shipping'
                          ? 'Gratuit'
                          : 'Spécial'}
                      </td>

                      {/* Scope */}
                      <td style={{ padding: '14px 14px', color: '#64748b' }}>
                        {promo.targetScope === 'all'
                          ? 'Tout le site'
                          : promo.targetCategories.join(', ') || `${promo.targetProducts.length} produits`}
                      </td>

                      {/* Period */}
                      <td style={{ padding: '14px 14px', fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                        <div>Du {promo.startDate.slice(5, 10)}</div>
                        <div>Au {promo.endDate.slice(5, 10)}</div>
                      </td>

                      {/* Uses */}
                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>
                          {promo.currentUses} {promo.maxUses ? `/ ${promo.maxUses}` : ''}
                        </div>
                        {promo.maxUses && (
                          <div style={{ width: '60px', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', marginTop: '4px' }}>
                            <div
                              style={{
                                width: `${Math.min(100, Math.round((promo.currentUses / promo.maxUses) * 100))}%`,
                                height: '100%',
                                backgroundColor: '#0b5738',
                                borderRadius: '2px'
                              }}
                            />
                          </div>
                        )}
                      </td>

                      {/* Performance */}
                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ fontWeight: 800, color: '#0b5738' }}>
                          {formatFCFA(promo.performance.revenue)}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                          {promo.performance.ordersGenerated} cmds • {promo.performance.conversionRate}% conv.
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 14px' }}>
                        <span style={{
                          backgroundColor: statusInfo.bg,
                          color: statusInfo.color,
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusInfo.dot }} />
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => setSelectedPerformancePromo(promo)}
                            title="Voir stats"
                            style={{
                              padding: '5px',
                              backgroundColor: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              color: '#0b5738'
                            }}
                          >
                            <BarChart3 size={14} />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(promo)}
                            title="Modifier"
                            style={{
                              padding: '5px',
                              backgroundColor: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              color: '#0284c7'
                            }}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(promo.id, promo.name)}
                            title="Supprimer"
                            style={{
                              padding: '5px',
                              backgroundColor: '#fef2f2',
                              border: '1px solid #fee2e2',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              color: '#dc2626'
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. CREATE / EDIT PROMOTION MODAL */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            width: '100%',
            maxWidth: '780px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f8fafc'
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  {editingPromotion ? 'Modifier la Promotion' : 'Créer une Promotion'}
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.8125rem', color: '#64748b' }}>
                  Configurez le type d'offre, les remises, les dates d'activation et la bannière marketing.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  border: 'none',
                  backgroundColor: '#ffffff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveForm} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Type selector chips */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '8px' }}>
                  Type de Promotion *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px' }}>
                  {[
                    { key: 'percentage', label: 'Percentage discount', icon: Percent },
                    { key: 'fixed', label: 'Fixed discount', icon: DollarSign },
                    { key: 'flash_sale', label: 'Flash sale ⚡', icon: Zap },
                    { key: 'bundle', label: 'Bundle pack 🎁', icon: Gift },
                    { key: 'buy_x_get_y', label: 'Buy X get Y', icon: Layers },
                    { key: 'free_delivery', label: 'Free delivery 🚚', icon: Truck },
                    { key: 'category', label: 'Category promotion', icon: FolderTree },
                  ].map(t => {
                    const isSelected = formData.type === t.key;
                    const TIcon = t.icon;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            type: t.key as PromotionType,
                            discountType: t.key === 'free_delivery' ? 'free_shipping' : t.key === 'fixed' ? 'fixed' : 'percentage'
                          });
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #0b5738' : '1px solid #e2e8f0',
                          backgroundColor: isSelected ? '#ecfdf5' : '#ffffff',
                          color: isSelected ? '#0b5738' : '#475569',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <TIcon size={14} />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Promo Code */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Promotion Name (Nom) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Vente Flash Énergie 2026"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Code Promo / Coupon *
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      required
                      placeholder="ex: FLASH30"
                      value={formData.code || ''}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, code: 'PROMO-' + Math.random().toString(36).substring(2, 6).toUpperCase() })}
                      style={{
                        padding: '0 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#f8fafc',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Générer
                    </button>
                  </div>
                </div>
              </div>

              {/* Scope & Target Categories/Products & Discount */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Cible (Products / Categories) *
                  </label>
                  <select
                    value={formData.targetScope || 'all'}
                    onChange={(e) => {
                      const scope = e.target.value as 'all' | 'category' | 'products';
                      setFormData({
                        ...formData,
                        targetScope: scope,
                        targetCategories: scope === 'category' ? ['Énergie & Solaire'] : []
                      });
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      outline: 'none',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="all">Tous les produits du catalogue</option>
                    <option value="category">Catégorie spécifique</option>
                    <option value="products">Produits sélectionnés</option>
                  </select>

                  {formData.targetScope === 'category' && (
                    <div style={{ marginTop: '8px' }}>
                      <input
                        type="text"
                        placeholder="ex: Énergie & Solaire, Maison & Cuisine"
                        value={formData.targetCategories?.join(', ') || ''}
                        onChange={(e) => setFormData({ ...formData, targetCategories: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.8125rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Discount (Valeur de la remise) *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.discountValue || 0}
                      onChange={(e) => setFormData({ ...formData, discountValue: parseFloat(e.target.value) || 0 })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.875rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#475569', minWidth: '40px' }}>
                      {formData.type === 'fixed' || formData.discountType === 'fixed' ? 'FCFA' : '%'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Start Date & End Date */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Start Date (Date & heure de début) *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.startDate || ''}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8125rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    End Date (Date & heure de fin) *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.endDate || ''}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8125rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Maximum Uses & Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Maximum uses (Utilisations maximales)
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="Illimité si vide"
                    value={formData.maxUses || ''}
                    onChange={(e) => setFormData({ ...formData, maxUses: e.target.value ? parseInt(e.target.value) : null })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Status (Statut initial) *
                  </label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as PromotionStatus })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      outline: 'none',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="active">Actif (Active promotion)</option>
                    <option value="scheduled">Planifié (Scheduled)</option>
                    <option value="expired">Expiré (Expired)</option>
                    <option value="disabled">Désactivé (Disabled)</option>
                  </select>
                </div>
              </div>

              {/* Banner Details */}
              <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon size={15} color="#0b5738" />
                  Banner (Bannière visuelle & Accroche marketing)
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Image URL</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.banner || ''}
                      onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.8125rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Titre de la bannière</label>
                      <input
                        type="text"
                        placeholder="ex: ⚡ Vente Flash Solaire !"
                        value={formData.bannerTitle || ''}
                        onChange={(e) => setFormData({ ...formData, bannerTitle: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.8125rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Sous-titre accrocheur</label>
                      <input
                        type="text"
                        placeholder="ex: Jusqu'à -30% sur tous les kits solaires."
                        value={formData.bannerSubtitle || ''}
                        onChange={(e) => setFormData({ ...formData, bannerSubtitle: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.8125rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#64748b',
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#0b5738',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(11, 87, 56, 0.3)'
                  }}
                >
                  {editingPromotion ? 'Enregistrer les modifications' : 'Créer la promotion'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. PROMOTION PERFORMANCE DEEP-DIVE MODAL */}
      {selectedPerformancePromo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BarChart3 size={22} color="#0b5738" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Performances de la Promotion
                  </h3>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '4px' }}>
                  Campagne : <strong style={{ color: '#0f172a' }}>{selectedPerformancePromo.name}</strong> ({selectedPerformancePromo.code})
                </div>
              </div>
              <button
                onClick={() => setSelectedPerformancePromo(null)}
                style={{
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '8px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* 4 Performance Indicators requested by prompt */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px',
              marginBottom: '20px'
            }}>
              {/* Orders Generated */}
              <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: '#16a34a' }}>
                  <ShoppingBag size={14} />
                  ORDERS GENERATED
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>
                  {selectedPerformancePromo.performance.ordersGenerated}
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#15803d', marginTop: '2px' }}>
                  Commandes passées via ce code
                </div>
              </div>

              {/* Revenue */}
              <div style={{ backgroundColor: '#ecfdf5', padding: '16px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: '#0b5738' }}>
                  <DollarSign size={14} />
                  REVENUE (CHIFFRE D'AFFAIRES)
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0b5738', marginTop: '4px' }}>
                  {formatFCFA(selectedPerformancePromo.performance.revenue)}
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#065f46', marginTop: '2px' }}>
                  Volume de ventes brut encaissé
                </div>
              </div>

              {/* Discount Granted */}
              <div style={{ backgroundColor: '#fef2f2', padding: '16px', borderRadius: '12px', border: '1px solid #fecaca' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: '#dc2626' }}>
                  <Tag size={14} />
                  DISCOUNT GRANTED (REMISES ACCORDÉES)
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#dc2626', marginTop: '4px' }}>
                  {formatFCFA(selectedPerformancePromo.performance.discountGranted)}
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#b91c1c', marginTop: '2px' }}>
                  Économies réelles clients
                </div>
              </div>

              {/* Conversion */}
              <div style={{ backgroundColor: '#f5f3ff', padding: '16px', borderRadius: '12px', border: '1px solid #ddd6fe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: '#8b5cf6' }}>
                  <Target size={14} />
                  CONVERSION (TAUX DE TRANSFORMATION)
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#7c3aed', marginTop: '4px' }}>
                  {selectedPerformancePromo.performance.conversionRate}%
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#6d28d9', marginTop: '2px' }}>
                  Visiteurs ayant finalisé un achat
                </div>
              </div>
            </div>

            {/* Funnel breakdown */}
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                Entonnoir d'Engagement & Rentabilité
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                    <span>Vues de la bannière</span>
                    <span>{selectedPerformancePromo.performance.viewsCount} vues</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', marginTop: '4px' }}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#94a3b8', borderRadius: '3px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                    <span>Clics & Ajouts Panier</span>
                    <span>{selectedPerformancePromo.performance.clicksCount} clics ({((selectedPerformancePromo.performance.clicksCount / (selectedPerformancePromo.performance.viewsCount || 1)) * 100).toFixed(1)}%)</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', marginTop: '4px' }}>
                    <div style={{ width: `${Math.min(100, ((selectedPerformancePromo.performance.clicksCount / (selectedPerformancePromo.performance.viewsCount || 1)) * 100))}%`, height: '100%', backgroundColor: '#0284c7', borderRadius: '3px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                    <span>Commandes payées & livrées</span>
                    <span style={{ color: '#0b5738' }}>{selectedPerformancePromo.performance.ordersGenerated} commandes ({selectedPerformancePromo.performance.conversionRate}%)</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', marginTop: '4px' }}>
                    <div style={{ width: `${Math.min(100, selectedPerformancePromo.performance.conversionRate * 8)}%`, height: '100%', backgroundColor: '#0b5738', borderRadius: '3px' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Close CTA */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedPerformancePromo(null)}
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
