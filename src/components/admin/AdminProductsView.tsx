import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_PRODUCTS } from '../../mock/data';
import { formatFCFA } from '../../utils/formatters';
import {
  Plus,
  Upload,
  Download,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Edit,
  Trash2,
  Eye,
  RotateCcw,
  Check,
  X,
  Layers,
  DollarSign,
  TrendingUp,
  Package,
  Building2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { AdminProductFormView } from './AdminProductFormView';

export type AdminProductStatus = 'Actif' | 'Épuisé' | 'Brouillon' | 'Désactivé';

export interface AdminProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  categoryLabel: string;
  supplier: string;
  supplierOrigin: 'china' | 'local';
  purchasePrice: number; // Prix d'achat
  sellingPrice: number; // Prix de vente
  originalPrice?: number;
  stock: number;
  status: AdminProductStatus;
  image: string;
  isPromotion: boolean;
}

export const AdminProductsView: React.FC = () => {
  const { addToast } = useStore();

  // Initial enriched product list for administrative management
  const initialAdminProducts: AdminProductItem[] = useMemo(() => {
    return [
      {
        id: 'prod-solar-01',
        name: 'Kit Énergie Solaire Hybride 500W + 2 Ampoules LED + Port USB',
        sku: 'SKU-SOL-500W-CMR',
        category: 'solar',
        categoryLabel: 'Énergie & Solaire',
        supplier: 'Shenzhen SunPower Tech',
        supplierOrigin: 'china',
        purchasePrice: 28000,
        sellingPrice: 48500,
        originalPrice: 65000,
        stock: 35,
        status: 'Actif',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=200&auto=format&fit=crop&q=80',
        isPromotion: true
      },
      {
        id: 'prod-solar-03',
        name: 'Lampe Solaire LED Rechargeable 100W IP67 avec Détecteur',
        sku: 'SKU-SOL-100W-CMR',
        category: 'solar',
        categoryLabel: 'Énergie & Solaire',
        supplier: 'Shenzhen SunPower Tech',
        supplierOrigin: 'china',
        purchasePrice: 8200,
        sellingPrice: 14900,
        originalPrice: 22000,
        stock: 48,
        status: 'Actif',
        image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=200&auto=format&fit=crop&q=80',
        isPromotion: true
      },
      {
        id: 'prod-home-01',
        name: 'Robot Cuiseur Multifonction & Hachoir Inox Puissant 3L 500W',
        sku: 'SKU-HK-ROBOT3L-PRO',
        category: 'home-kitchen',
        categoryLabel: 'Maison & Cuisine',
        supplier: 'Guangzhou SmartLife Appliances',
        supplierOrigin: 'china',
        purchasePrice: 11000,
        sellingPrice: 19500,
        originalPrice: 28000,
        stock: 24,
        status: 'Actif',
        image: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=200&auto=format&fit=crop&q=80',
        isPromotion: true
      },
      {
        id: 'prod-home-02',
        name: 'Mini Climatiseur & Rafraîchisseur d\'Air USB Silencieux 500ml',
        sku: 'SKU-HK-CLIM-USB',
        category: 'home-kitchen',
        categoryLabel: 'Maison & Cuisine',
        supplier: 'Guangzhou SmartLife Appliances',
        supplierOrigin: 'china',
        purchasePrice: 7500,
        sellingPrice: 13500,
        originalPrice: 19000,
        stock: 0,
        status: 'Épuisé',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&auto=format&fit=crop&q=80',
        isPromotion: true
      },
      {
        id: 'prod-tech-01',
        name: 'Power Bank Solaire Blindé 30 000 mAh avec Torche LED & 4 Câbles',
        sku: 'SKU-TECH-PB30K-SOL',
        category: 'tech',
        categoryLabel: 'High-Tech',
        supplier: 'Dongguan PowerMax Ltd',
        supplierOrigin: 'china',
        purchasePrice: 9500,
        sellingPrice: 16500,
        originalPrice: 24000,
        stock: 4,
        status: 'Actif',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&auto=format&fit=crop&q=80',
        isPromotion: true
      },
      {
        id: 'prod-tech-02',
        name: 'Écouteurs Sans Fil TWS Bluetooth 5.3 avec Boîtier Powerbank',
        sku: 'SKU-TECH-TWS53-PRO',
        category: 'tech',
        categoryLabel: 'High-Tech',
        supplier: 'Dongguan PowerMax Ltd',
        supplierOrigin: 'china',
        purchasePrice: 4800,
        sellingPrice: 9600,
        originalPrice: 15000,
        stock: 82,
        status: 'Actif',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&auto=format&fit=crop&q=80',
        isPromotion: true
      },
      {
        id: 'prod-beauty-01',
        name: 'Pot Pur Beurre de Karité Bio Naturel Kribi 500g',
        sku: 'SKU-BIO-KARITE500-CMR',
        category: 'beauty',
        categoryLabel: 'Beauté & Bien-être',
        supplier: 'Coopérative Agro Kribi',
        supplierOrigin: 'local',
        purchasePrice: 2400,
        sellingPrice: 4500,
        originalPrice: 6000,
        stock: 120,
        status: 'Actif',
        image: 'https://images.unsplash.com/photo-1608248597359-25f0a82b8813?w=200&auto=format&fit=crop&q=80',
        isPromotion: true
      },
      {
        id: 'prod-beauty-02',
        name: 'Huile Végétale Pure de Ricin Noir Pressée à Froid 250ml',
        sku: 'SKU-BIO-RICIN250-CMR',
        category: 'beauty',
        categoryLabel: 'Beauté & Bien-être',
        supplier: 'Coopérative Agro Kribi',
        supplierOrigin: 'local',
        purchasePrice: 2800,
        sellingPrice: 5500,
        originalPrice: 7500,
        stock: 65,
        status: 'Actif',
        image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=200&auto=format&fit=crop&q=80',
        isPromotion: false
      },
      {
        id: 'prod-intimacy-01',
        name: 'Gel Hydratant Douceur & Bien-être Intime Formule Naturelle 100ml',
        sku: 'SKU-INT-GEL100-NAT',
        category: 'intimacy',
        categoryLabel: 'Intimité & Bien-être',
        supplier: 'Laboratoires Douala Pharma',
        supplierOrigin: 'local',
        purchasePrice: 4500,
        sellingPrice: 8500,
        originalPrice: 12000,
        stock: 45,
        status: 'Actif',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=80',
        isPromotion: true
      },
      {
        id: 'prod-auto-01',
        name: 'Mini Compresseur Pneus Digital Sans Fil Rechargeable 150 PSI',
        sku: 'SKU-AUTO-COMP150-DIG',
        category: 'automotive',
        categoryLabel: 'Auto & Moto',
        supplier: 'Zhejiang AutoParts Corp',
        supplierOrigin: 'china',
        purchasePrice: 10500,
        sellingPrice: 17500,
        originalPrice: 25000,
        stock: 18,
        status: 'Actif',
        image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=200&auto=format&fit=crop&q=80',
        isPromotion: true
      },
      {
        id: 'prod-tools-01',
        name: 'Mallette Perceuse Visseuse Sans Fil 21V avec 2 Batteries & 24 Accessoires',
        sku: 'SKU-TOOL-PERC21V-BOX',
        category: 'tools',
        categoryLabel: 'Outils & Bricolage',
        supplier: 'Zhejiang Hardware Co.',
        supplierOrigin: 'china',
        purchasePrice: 14000,
        sellingPrice: 24500,
        originalPrice: 35000,
        stock: 12,
        status: 'Actif',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200&auto=format&fit=crop&q=80',
        isPromotion: true
      },
      {
        id: 'prod-draft-01',
        name: 'Ventilateur Brasseur Solaire avec Batterie Lithium Intégrée 16 pouces',
        sku: 'SKU-SOL-VENT16-LITH',
        category: 'solar',
        categoryLabel: 'Énergie & Solaire',
        supplier: 'Shenzhen SunPower Tech',
        supplierOrigin: 'china',
        purchasePrice: 16500,
        sellingPrice: 29000,
        originalPrice: 38000,
        stock: 50,
        status: 'Brouillon',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&auto=format&fit=crop&q=80',
        isPromotion: false
      },
      {
        id: 'prod-disabled-01',
        name: 'Caméra de Sécurité Solaire 4G Extérieure Pivotante 360° Vision Nocturne',
        sku: 'SKU-SEC-CAM4G-SOL',
        category: 'tech',
        categoryLabel: 'High-Tech',
        supplier: 'Shenzhen SunPower Tech',
        supplierOrigin: 'china',
        purchasePrice: 21000,
        sellingPrice: 36000,
        originalPrice: 49000,
        stock: 0,
        status: 'Désactivé',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=200&auto=format&fit=crop&q=80',
        isPromotion: false
      }
    ];
  }, []);

  // Main state of products
  const [productsList, setProductsList] = useState<AdminProductItem[]>(initialAdminProducts);

  // Top Controls Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSupplier, setFilterSupplier] = useState('all');
  const [filterPromotion, setFilterPromotion] = useState('all');
  const [filterStock, setFilterStock] = useState('all');
  const [filterPriceRange, setFilterPriceRange] = useState('all');

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Product Creation / Editing Mode
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [editingProductItem, setEditingProductItem] = useState<AdminProductItem | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<AdminProductItem | null>(null);

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('solar');
  const [newProdSupplier, setNewProdSupplier] = useState('Shenzhen SunPower Tech');
  const [newProdPurchasePrice, setNewProdPurchasePrice] = useState('10000');
  const [newProdSellingPrice, setNewProdSellingPrice] = useState('18000');
  const [newProdStock, setNewProdStock] = useState('25');
  const [newProdStatus, setNewProdStatus] = useState<AdminProductStatus>('Actif');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1509391365360-2e959784a276?w=200&auto=format&fit=crop&q=80');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return productsList.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSku = item.sku.toLowerCase().includes(q);
        const matchesSupplier = item.supplier.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesSupplier) return false;
      }

      // Category
      if (filterCategory !== 'all' && item.category !== filterCategory) return false;

      // Status
      if (filterStatus !== 'all' && item.status !== filterStatus) return false;

      // Supplier
      if (filterSupplier !== 'all' && item.supplier !== filterSupplier) return false;

      // Promotion
      if (filterPromotion === 'promo' && !item.isPromotion) return false;
      if (filterPromotion === 'no_promo' && item.isPromotion) return false;

      // Stock
      if (filterStock === 'in_stock' && item.stock <= 0) return false;
      if (filterStock === 'low_stock' && (item.stock > 10 || item.stock <= 0)) return false;
      if (filterStock === 'out_of_stock' && item.stock > 0) return false;

      // Price Range
      if (filterPriceRange === 'under_15k' && item.sellingPrice >= 15000) return false;
      if (filterPriceRange === '15k_30k' && (item.sellingPrice < 15000 || item.sellingPrice > 30000)) return false;
      if (filterPriceRange === '30k_60k' && (item.sellingPrice < 30000 || item.sellingPrice > 60000)) return false;
      if (filterPriceRange === 'over_60k' && item.sellingPrice <= 60000) return false;

      return true;
    });
  }, [productsList, searchQuery, filterCategory, filterStatus, filterSupplier, filterPromotion, filterStock, filterPriceRange]);

  // Paginated slice
  const totalCount = filteredProducts.length;
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredProducts.slice(start, start + rowsPerPage);
  }, [filteredProducts, currentPage]);

  const isAllSelected = paginatedItems.length > 0 && paginatedItems.every(i => selectedIds.includes(i.id));

  // Selection toggles
  const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const pageIds = paginatedItems.map(p => p.id);
      setSelectedIds(Array.from(new Set([...selectedIds, ...pageIds])));
    } else {
      const pageIds = new Set(paginatedItems.map(p => p.id));
      setSelectedIds(selectedIds.filter(id => !pageIds.has(id)));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  // Bulk Actions
  const handleBulkActivate = () => {
    setProductsList(prev => prev.map(p => selectedIds.includes(p.id) ? { ...p, status: 'Actif' } : p));
    addToast(`✓ ${selectedIds.length} produit(s) activé(s) sur la boutique !`, 'success');
    setSelectedIds([]);
  };

  const handleBulkDeactivate = () => {
    setProductsList(prev => prev.map(p => selectedIds.includes(p.id) ? { ...p, status: 'Désactivé' } : p));
    addToast(`⏸️ ${selectedIds.length} produit(s) désactivé(s).`, 'info');
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Voulez-vous supprimer définitivement ces ${selectedIds.length} produit(s) ?`)) {
      setProductsList(prev => prev.filter(p => !selectedIds.includes(p.id)));
      addToast(`✕ ${selectedIds.length} produit(s) supprimé(s) du catalogue.`, 'warning');
      setSelectedIds([]);
    }
  };

  const handleBulkExport = () => {
    addToast(`📥 Export CSV généré avec succès (${selectedIds.length || filteredProducts.length} références) !`, 'success');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterCategory('all');
    setFilterStatus('all');
    setFilterSupplier('all');
    setFilterPromotion('all');
    setFilterStock('all');
    setFilterPriceRange('all');
    setCurrentPage(1);
    addToast('Filtres produits réinitialisés', 'info');
  };

  // Add Product Submit
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdSku.trim()) {
      addToast('Veuillez renseigner le nom et le SKU du produit', 'warning');
      return;
    }

    const newProd: AdminProductItem = {
      id: `prod-${Date.now()}`,
      name: newProdName.trim(),
      sku: newProdSku.trim().toUpperCase(),
      category: newProdCategory,
      categoryLabel: newProdCategory === 'solar' ? 'Énergie & Solaire' : newProdCategory === 'home-kitchen' ? 'Maison & Cuisine' : 'High-Tech',
      supplier: newProdSupplier,
      supplierOrigin: newProdSupplier.includes('Kribi') || newProdSupplier.includes('Douala') ? 'local' : 'china',
      purchasePrice: Number(newProdPurchasePrice) || 0,
      sellingPrice: Number(newProdSellingPrice) || 0,
      stock: Number(newProdStock) || 0,
      status: newProdStatus,
      image: newProdImage || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=200&auto=format&fit=crop&q=80',
      isPromotion: false
    };

    setProductsList([newProd, ...productsList]);
    setShowAddModal(false);
    // Reset form
    setNewProdName('');
    setNewProdSku('');
    addToast(`✓ Produit "${newProd.name.slice(0, 25)}..." ajouté avec succès !`, 'success');
  };

  // Single Item Status Toggle
  const handleSingleStatusChange = (id: string, newStatus: AdminProductStatus) => {
    setProductsList(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    addToast(`Statut mis à jour : ${newStatus}`, 'info');
  };

  // Render Status Badge helper
  const renderStatusBadge = (status: AdminProductStatus) => {
    switch (status) {
      case 'Actif':
        return (
          <span style={{
            backgroundColor: '#ecfdf5',
            color: '#047857',
            border: '1px solid #a7f3d0',
            padding: '3px 9px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            Actif
          </span>
        );
      case 'Épuisé':
        return (
          <span style={{
            backgroundColor: '#fef2f2',
            color: '#b91c1c',
            border: '1px solid #fecaca',
            padding: '3px 9px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
            Épuisé
          </span>
        );
      case 'Brouillon':
        return (
          <span style={{
            backgroundColor: '#fffbeb',
            color: '#b45309',
            border: '1px solid #fde68a',
            padding: '3px 9px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
            Brouillon
          </span>
        );
      case 'Désactivé':
        return (
          <span style={{
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            border: '1px solid #cbd5e1',
            padding: '3px 9px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#94a3b8' }} />
            Désactivé
          </span>
        );
    }
  };

  // If in product creation or editing mode, render the complete AdminProductFormView
  if (isCreatingProduct || editingProductItem) {
    return (
      <AdminProductFormView
        initialProduct={editingProductItem}
        onBack={() => {
          setIsCreatingProduct(false);
          setEditingProductItem(null);
        }}
        onSave={(savedProduct) => {
          setProductsList(prev => {
            const exists = prev.some(p => p.id === savedProduct.id);
            if (exists) {
              return prev.map(p => p.id === savedProduct.id ? savedProduct : p);
            }
            return [savedProduct, ...prev];
          });
          setIsCreatingProduct(false);
          setEditingProductItem(null);
        }}
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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
              Produits
            </h1>
            <span style={{
              backgroundColor: '#0b5738',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>
              {totalCount} références
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '4px 0 0' }}>
            Gestion du catalogue IFPTIE Market, prix de revient, marges brutes et stocks à Douala & Yaoundé.
          </p>
        </div>

        {/* Top: Add Product + Import CSV */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowImportModal(true)}
            style={{
              backgroundColor: '#ffffff',
              color: '#1e293b',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '9px 16px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Upload size={15} />
            <span>Import CSV</span>
          </button>

          <button
            onClick={handleBulkExport}
            style={{
              backgroundColor: '#ffffff',
              color: '#1e293b',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '9px 16px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download size={15} />
            <span>Exporter</span>
          </button>

          <button
            onClick={() => setIsCreatingProduct(true)}
            style={{
              backgroundColor: '#0b5738',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '9px 18px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 3px 10px rgba(11, 87, 56, 0.25)'
            }}
          >
            <Plus size={16} />
            <span>Add product (Ajouter un produit)</span>
          </button>
        </div>
      </div>

      {/* 2. TOP CONTROLS & FILTERS */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '18px 20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        marginBottom: '20px'
      }}>
        {/* Top Search bar */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search products : Nom de l'article, SKU (ex: SKU-SOL-100W), Fournisseur..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.875rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* 6 Filters Grid: Category, Status, Supplier, Promotion, Stock, Price range */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '12px',
          alignItems: 'center'
        }}>
          {/* 1. Category */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
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
              <option value="all">Toutes catégories</option>
              <option value="solar">Énergie & Solaire</option>
              <option value="home-kitchen">Maison & Cuisine</option>
              <option value="tech">High-Tech</option>
              <option value="beauty">Beauté & Bien-être</option>
              <option value="intimacy">Intimité & Bien-être</option>
              <option value="automotive">Auto & Moto</option>
              <option value="tools">Outils & Bricolage</option>
            </select>
          </div>

          {/* 2. Status */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
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
              <option value="Actif">Actif</option>
              <option value="Épuisé">Épuisé</option>
              <option value="Brouillon">Brouillon</option>
              <option value="Désactivé">Désactivé</option>
            </select>
          </div>

          {/* 3. Supplier */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Supplier
            </label>
            <select
              value={filterSupplier}
              onChange={(e) => { setFilterSupplier(e.target.value); setCurrentPage(1); }}
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
              <option value="all">Tous fournisseurs</option>
              <option value="Shenzhen SunPower Tech">Shenzhen SunPower (Chine)</option>
              <option value="Guangzhou SmartLife Appliances">Guangzhou SmartLife (Chine)</option>
              <option value="Dongguan PowerMax Ltd">Dongguan PowerMax (Chine)</option>
              <option value="Coopérative Agro Kribi">Coopérative Agro Kribi (CMR)</option>
              <option value="Laboratoires Douala Pharma">Douala Pharma (CMR)</option>
              <option value="Zhejiang Hardware Co.">Zhejiang Hardware (Chine)</option>
            </select>
          </div>

          {/* 4. Promotion */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Promotion
            </label>
            <select
              value={filterPromotion}
              onChange={(e) => { setFilterPromotion(e.target.value); setCurrentPage(1); }}
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
              <option value="all">Toutes offres</option>
              <option value="promo">🔥 En promotion</option>
              <option value="no_promo">Prix standard</option>
            </select>
          </div>

          {/* 5. Stock */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Stock
            </label>
            <select
              value={filterStock}
              onChange={(e) => { setFilterStock(e.target.value); setCurrentPage(1); }}
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
              <option value="all">Tous niveaux</option>
              <option value="in_stock">En stock (&gt;0)</option>
              <option value="low_stock">⚠️ Stock critique (&lt;10)</option>
              <option value="out_of_stock">Rupture totale (0)</option>
            </select>
          </div>

          {/* 6. Price range */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Price range
            </label>
            <select
              value={filterPriceRange}
              onChange={(e) => { setFilterPriceRange(e.target.value); setCurrentPage(1); }}
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
              <option value="all">Tous prix</option>
              <option value="under_15k">&lt; 15 000 FCFA</option>
              <option value="15k_30k">15 000 - 30 000 FCFA</option>
              <option value="30k_60k">30 000 - 60 000 FCFA</option>
              <option value="over_60k">&gt; 60 000 FCFA</option>
            </select>
          </div>
        </div>

        {/* Reset button row if filters active */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
          <button
            onClick={handleResetFilters}
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#475569',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RotateCcw size={12} />
            <span>Réinitialiser les filtres</span>
          </button>
        </div>
      </div>

      {/* 3. BULK ACTIONS FLOATING TOOLBAR */}
      {selectedIds.length > 0 && (
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
              {selectedIds.length}
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
              produit(s) sélectionné(s)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* 1. Bulk Activate */}
            <button
              onClick={handleBulkActivate}
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
              <CheckCircle2 size={14} color="#4ade80" />
              <span>Activate (Activer)</span>
            </button>

            {/* 2. Bulk Deactivate */}
            <button
              onClick={handleBulkDeactivate}
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
              <XCircle size={14} color="#f87171" />
              <span>Deactivate (Désactiver)</span>
            </button>

            {/* 3. Bulk Delete */}
            <button
              onClick={handleBulkDelete}
              style={{
                backgroundColor: '#261214',
                color: '#fca5a5',
                border: '1px solid #7f1d1d',
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
              <Trash2 size={14} />
              <span>Delete (Supprimer)</span>
            </button>

            {/* 4. Bulk Export */}
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
              <Download size={14} />
              <span>Export</span>
            </button>

            {/* Deselect */}
            <button
              onClick={() => setSelectedIds([])}
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

      {/* 4. PRODUCTS TABLE & CARDS CONTAINER */}
      <style>{`
        .admin-prods-desktop-table {
          display: block;
          overflow-x: auto;
        }
        .admin-prods-mobile-cards {
          display: none;
        }
        @media (max-width: 960px) {
          .admin-prods-desktop-table {
            display: none !important;
          }
          .admin-prods-mobile-cards {
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
        
        {/* DESKTOP TABLE VIEW */}
        <div className="admin-prods-desktop-table">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', color: '#475569', textTransform: 'uppercase', fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                <th style={{ padding: '14px 16px', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleToggleSelectAll}
                    style={{ width: '16px', height: '16px', accentColor: '#0b5738', cursor: 'pointer' }}
                  />
                </th>
                <th style={{ padding: '14px 10px', width: '56px' }}>Image</th>
                <th style={{ padding: '14px 12px' }}>Product</th>
                <th style={{ padding: '14px 12px' }}>SKU</th>
                <th style={{ padding: '14px 12px' }}>Category</th>
                <th style={{ padding: '14px 12px' }}>Supplier</th>
                <th style={{ padding: '14px 12px', textAlign: 'right' }}>Purchase price</th>
                <th style={{ padding: '14px 12px', textAlign: 'right' }}>Selling price</th>
                <th style={{ padding: '14px 12px', textAlign: 'right' }}>Margin</th>
                <th style={{ padding: '14px 12px', textAlign: 'center' }}>Stock</th>
                <th style={{ padding: '14px 12px' }}>Status</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={12} style={{ padding: '40px 16px', textAlign: 'center', color: '#64748b' }}>
                    <AlertCircle size={32} color="#94a3b8" style={{ marginBottom: '8px' }} />
                    <div style={{ fontWeight: 700 }}>Aucun produit ne correspond aux filtres appliqués.</div>
                    <button
                      onClick={handleResetFilters}
                      style={{ marginTop: '10px', padding: '6px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                    >
                      Réinitialiser les filtres
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedItems.map((prod) => {
                  const isSelected = selectedIds.includes(prod.id);
                  const marginAmt = prod.sellingPrice - prod.purchasePrice;
                  const marginPct = prod.sellingPrice > 0 ? ((marginAmt / prod.sellingPrice) * 100).toFixed(1) : '0';

                  return (
                    <tr
                      key={prod.id}
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
                          onChange={() => handleToggleSelect(prod.id)}
                          style={{ width: '16px', height: '16px', accentColor: '#0b5738', cursor: 'pointer' }}
                        />
                      </td>

                      {/* Image */}
                      <td style={{ padding: '10px' }}>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                        />
                      </td>

                      {/* Product */}
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.3, maxWidth: '240px' }}>
                          {prod.name}
                        </div>
                        {prod.isPromotion && (
                          <span style={{ fontSize: '0.625rem', fontWeight: 800, backgroundColor: '#fef3c7', color: '#92400e', padding: '1px 5px', borderRadius: '4px', marginTop: '3px', display: 'inline-block' }}>
                            🔥 PROMOTION ACTIVE
                          </span>
                        )}
                      </td>

                      {/* SKU */}
                      <td style={{ padding: '14px 12px' }}>
                        <span style={{
                          fontFamily: 'monospace',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          backgroundColor: '#f1f5f9',
                          color: '#334155',
                          padding: '3px 7px',
                          borderRadius: '6px'
                        }}>
                          {prod.sku}
                        </span>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '14px 12px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                          {prod.categoryLabel}
                        </span>
                      </td>

                      {/* Supplier */}
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ fontWeight: 700, color: '#1e293b' }}>
                          {prod.supplierOrigin === 'local' ? '🇨🇲' : '🇨🇳'} {prod.supplier}
                        </div>
                        <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                          {prod.supplierOrigin === 'local' ? 'Production Cameroun' : 'Import Chine Direct'}
                        </span>
                      </td>

                      {/* Purchase price */}
                      <td style={{ padding: '14px 12px', textAlign: 'right', fontWeight: 700, color: '#64748b' }}>
                        {formatFCFA(prod.purchasePrice)}
                      </td>

                      {/* Selling price */}
                      <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                        <div style={{ fontWeight: 900, color: '#0f172a', fontSize: '0.875rem' }}>
                          {formatFCFA(prod.sellingPrice)}
                        </div>
                        {prod.originalPrice && prod.originalPrice > prod.sellingPrice && (
                          <span style={{ fontSize: '0.6875rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                            {formatFCFA(prod.originalPrice)}
                          </span>
                        )}
                      </td>

                      {/* Margin */}
                      <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                        <div style={{ fontWeight: 900, color: '#0b5738' }}>
                          +{formatFCFA(marginAmt)}
                        </div>
                        <span style={{
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          backgroundColor: '#ecfdf5',
                          color: '#065f46',
                          padding: '1px 5px',
                          borderRadius: '4px'
                        }}>
                          {marginPct}%
                        </span>
                      </td>

                      {/* Stock */}
                      <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                        <span style={{
                          fontSize: '0.8125rem',
                          fontWeight: 900,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: prod.stock > 10 ? '#ecfdf5' : prod.stock > 0 ? '#fef3c7' : '#fef2f2',
                          color: prod.stock > 10 ? '#047857' : prod.stock > 0 ? '#b45309' : '#b91c1c'
                        }}>
                          {prod.stock} u.
                        </span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 12px' }}>
                        {renderStatusBadge(prod.status)}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => setEditingProductItem(prod)}
                            title="Modifier ce produit dans la fiche complète"
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
                            <Edit size={13} />
                            <span>Edit</span>
                          </button>

                          {/* Quick Status toggle */}
                          <select
                            value={prod.status}
                            onChange={(e) => handleSingleStatusChange(prod.id, e.target.value as AdminProductStatus)}
                            style={{
                              padding: '5px 6px',
                              borderRadius: '6px',
                              border: '1px solid #cbd5e1',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              backgroundColor: '#ffffff',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="Actif">Actif</option>
                            <option value="Épuisé">Épuisé</option>
                            <option value="Brouillon">Brouillon</option>
                            <option value="Désactivé">Désactivé</option>
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

        {/* MOBILE / TABLET CARDS VIEW */}
        <div className="admin-prods-mobile-cards">
          {paginatedItems.length === 0 ? (
            <div style={{ padding: '36px 16px', textAlign: 'center', color: '#64748b' }}>
              <AlertCircle size={32} color="#94a3b8" style={{ marginBottom: '8px' }} />
              <div style={{ fontWeight: 700 }}>Aucun produit ne correspond aux filtres.</div>
            </div>
          ) : (
            paginatedItems.map((prod) => {
              const isSelected = selectedIds.includes(prod.id);
              const marginAmt = prod.sellingPrice - prod.purchasePrice;
              const marginPct = prod.sellingPrice > 0 ? ((marginAmt / prod.sellingPrice) * 100).toFixed(1) : '0';

              return (
                <div
                  key={prod.id}
                  style={{
                    backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                    borderRadius: '14px',
                    border: isSelected ? '1.5px solid #0b5738' : '1px solid #e2e8f0',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  {/* Top card row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(prod.id)}
                        style={{ width: '18px', height: '18px', accentColor: '#0b5738', cursor: 'pointer' }}
                      />
                      <img
                        src={prod.image}
                        alt={prod.name}
                        style={{ width: '46px', height: '46px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>{prod.name}</div>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.6875rem', color: '#64748b' }}>
                          SKU: {prod.sku}
                        </span>
                      </div>
                    </div>

                    {renderStatusBadge(prod.status)}
                  </div>

                  {/* Financial & Stock Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.75rem', backgroundColor: '#f8fafc', padding: '8px 10px', borderRadius: '8px' }}>
                    <div>
                      <span style={{ color: '#64748b', display: 'block' }}>Vente</span>
                      <strong style={{ color: '#0f172a', fontSize: '0.8125rem' }}>{formatFCFA(prod.sellingPrice)}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block' }}>Marge ({marginPct}%)</span>
                      <strong style={{ color: '#0b5738', fontSize: '0.8125rem' }}>+{formatFCFA(marginAmt)}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block' }}>Stock</span>
                      <strong style={{ color: prod.stock > 0 ? '#0f172a' : '#dc2626', fontSize: '0.8125rem' }}>{prod.stock} unités</strong>
                    </div>
                  </div>

                  {/* Supplier & Category */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                    <span>{prod.categoryLabel}</span>
                    <span>{prod.supplierOrigin === 'local' ? '🇨🇲' : '🇨🇳'} {prod.supplier}</span>
                  </div>

                  {/* Mobile Actions */}
                  <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                    <button
                      onClick={() => setEditingProductItem(prod)}
                      style={{
                        flex: 1,
                        padding: '7px',
                        borderRadius: '6px',
                        border: '1px solid #a7f3d0',
                        backgroundColor: '#ecfdf5',
                        color: '#065f46',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      Modifier fiche
                    </button>
                    <div style={{ flex: 1 }}>
                      <select
                        value={prod.status}
                        onChange={(e) => handleSingleStatusChange(prod.id, e.target.value as AdminProductStatus)}
                        style={{
                          width: '100%',
                          padding: '7px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.75rem'
                        }}
                      >
                        <option value="Actif">Actif</option>
                        <option value="Épuisé">Épuisé</option>
                        <option value="Brouillon">Brouillon</option>
                        <option value="Désactivé">Désactivé</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 5. PAGINATION */}
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
        <span style={{ color: '#64748b' }}>
          Affichage de <strong>{(currentPage - 1) * rowsPerPage + 1}</strong> à{' '}
          <strong>{Math.min(currentPage * rowsPerPage, totalCount)}</strong> sur{' '}
          <strong>{totalCount}</strong> articles
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '6px 10px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1
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
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '6px 10px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* MODAL 1: ADD PRODUCT */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            maxWidth: '560px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={20} color="#0b5738" />
                Add product (Nouveau produit)
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} style={{ display: 'grid', gap: '14px' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                  Nom complet du produit *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Projecteur Solaire 200W IP68 avec Panneau Indépendant"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                />
              </div>

              {/* SKU & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                    SKU (Référence unique) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: SKU-SOL-200W-CMR"
                    value={newProdSku}
                    onChange={(e) => setNewProdSku(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                    Catégorie *
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', backgroundColor: '#ffffff' }}
                  >
                    <option value="solar">Énergie & Solaire</option>
                    <option value="home-kitchen">Maison & Cuisine</option>
                    <option value="tech">High-Tech</option>
                    <option value="beauty">Beauté & Bien-être</option>
                    <option value="intimacy">Intimité & Bien-être</option>
                    <option value="automotive">Auto & Moto</option>
                    <option value="tools">Outils & Bricolage</option>
                  </select>
                </div>
              </div>

              {/* Supplier & Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                    Fournisseur *
                  </label>
                  <select
                    value={newProdSupplier}
                    onChange={(e) => setNewProdSupplier(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', backgroundColor: '#ffffff' }}
                  >
                    <option value="Shenzhen SunPower Tech">Shenzhen SunPower Tech (Chine)</option>
                    <option value="Guangzhou SmartLife Appliances">Guangzhou SmartLife (Chine)</option>
                    <option value="Dongguan PowerMax Ltd">Dongguan PowerMax Ltd (Chine)</option>
                    <option value="Coopérative Agro Kribi">Coopérative Agro Kribi (Cameroun)</option>
                    <option value="Laboratoires Douala Pharma">Laboratoires Douala Pharma (Cameroun)</option>
                    <option value="Zhejiang Hardware Co.">Zhejiang Hardware Co. (Chine)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                    Statut initial *
                  </label>
                  <select
                    value={newProdStatus}
                    onChange={(e) => setNewProdStatus(e.target.value as AdminProductStatus)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', backgroundColor: '#ffffff' }}
                  >
                    <option value="Actif">Actif</option>
                    <option value="Brouillon">Brouillon</option>
                    <option value="Désactivé">Désactivé</option>
                    <option value="Épuisé">Épuisé</option>
                  </select>
                </div>
              </div>

              {/* Purchase price, Selling price & Stock */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                    Prix d'achat (FCFA)
                  </label>
                  <input
                    type="number"
                    value={newProdPurchasePrice}
                    onChange={(e) => setNewProdPurchasePrice(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                    Prix de vente (FCFA) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdSellingPrice}
                    onChange={(e) => setNewProdSellingPrice(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                    Stock initial *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                  URL de l'image principale
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '11px', borderRadius: '10px', border: 'none', backgroundColor: '#0b5738', color: '#ffffff', fontWeight: 800, cursor: 'pointer' }}
                >
                  Enregistrer le produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: IMPORT CSV */}
      {showImportModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            maxWidth: '480px',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileSpreadsheet size={20} color="#0b5738" />
                Import CSV de Catalogue
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '0 0 16px', lineHeight: 1.4 }}>
              Importez un arrivage massif de références avec colonnes : <code>name, sku, category, supplier, purchase_price, selling_price, stock</code>.
            </p>

            <div style={{
              border: '2px dashed #cbd5e1',
              borderRadius: '14px',
              padding: '30px 20px',
              textAlign: 'center',
              backgroundColor: '#f8fafc',
              marginBottom: '16px',
              cursor: 'pointer'
            }}
            onClick={() => {
              addToast('Fichier "arrivage_chine_sept2026.csv" détecté (18 articles)', 'info');
            }}>
              <Upload size={32} color="#0b5738" style={{ marginBottom: '8px' }} />
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>
                Glissez votre fichier CSV ici ou cliquez
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Taille max 10 Mo • Format .csv standard UTF-8</span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowImportModal(false)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  addToast('✓ 18 nouveaux produits importés avec succès depuis le CSV !', 'success');
                }}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#0b5738', color: '#ffffff', fontWeight: 800, cursor: 'pointer' }}
              >
                Lancer l'importation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT PRODUCT */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            maxWidth: '460px',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit size={18} color="#0b5738" />
                Modifier le produit
              </h3>
              <button
                onClick={() => setShowEditModal(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>Nom</label>
                <input
                  type="text"
                  value={showEditModal.name}
                  onChange={(e) => setShowEditModal({ ...showEditModal, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>Prix de vente (FCFA)</label>
                  <input
                    type="number"
                    value={showEditModal.sellingPrice}
                    onChange={(e) => setShowEditModal({ ...showEditModal, sellingPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>Stock disponible</label>
                  <input
                    type="number"
                    value={showEditModal.stock}
                    onChange={(e) => setShowEditModal({ ...showEditModal, stock: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>Statut</label>
                <select
                  value={showEditModal.status}
                  onChange={(e) => setShowEditModal({ ...showEditModal, status: e.target.value as AdminProductStatus })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', backgroundColor: '#ffffff' }}
                >
                  <option value="Actif">Actif</option>
                  <option value="Épuisé">Épuisé</option>
                  <option value="Brouillon">Brouillon</option>
                  <option value="Désactivé">Désactivé</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowEditModal(null)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProductsList(prev => prev.map(p => p.id === showEditModal.id ? showEditModal : p));
                    setShowEditModal(null);
                    addToast('✓ Produit mis à jour avec succès !', 'success');
                  }}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#0b5738', color: '#ffffff', fontWeight: 800, cursor: 'pointer' }}
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
