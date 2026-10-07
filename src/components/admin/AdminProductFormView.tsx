import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import type { AdminProductItem } from './AdminProductsView';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Image as ImageIcon,
  Video,
  DollarSign,
  Package,
  Layers,
  Building2,
  Truck,
  TrendingUp,
  Search,
  Sparkles,
  Plus,
  Trash2,
  Upload,
  Calendar,
  Eye,
  Check,
  AlertCircle,
  HelpCircle,
  Link,
  Globe,
  Tag,
  ShieldCheck,
  X
} from 'lucide-react';

interface AdminProductFormViewProps {
  initialProduct?: AdminProductItem | null;
  onBack: () => void;
  onSave: (product: AdminProductItem) => void;
}

export const AdminProductFormView: React.FC<AdminProductFormViewProps> = ({
  initialProduct,
  onBack,
  onSave
}) => {
  const { addToast } = useStore();
  const isEditing = Boolean(initialProduct);

  // Active section tab
  const [activeTab, setActiveTab] = useState<'all' | 'basic' | 'media' | 'pricing' | 'inventory' | 'variants' | 'supplier' | 'delivery' | 'marketing' | 'seo'>('all');

  // =========================================================================
  // 1. BASIC INFORMATION
  // =========================================================================
  const [productName, setProductName] = useState(initialProduct?.name || 'Kit Énergie Solaire Hybride 500W Anti-Délestage');
  const [sku, setSku] = useState(initialProduct?.sku || 'SKU-SOL-500W-CMR');
  const [category, setCategory] = useState(initialProduct?.category || 'solar');
  const [subcategory, setSubcategory] = useState('Kits Solaires Hybrides & Batteries');
  const [shortDescription, setShortDescription] = useState('Solution d\'alimentation autonome anti-délestage avec 2 ampoules LED, port USB de charge rapide et batterie lithium intégrée.');
  const [fullDescription, setFullDescription] = useState(`Le Kit Énergie Solaire Hybride 500W est spécialement conçu pour répondre aux défis des coupures d'électricité récurrentes au Cameroun.

Points forts :
- Panneau solaire monocristallin haute performance 500W résistant aux intempéries tropicales.
- Batterie Lithium LiFePO4 de dernière génération avec plus de 2000 cycles de charge.
- 4 sorties 12V DC pour ampoules et ventilateur + 2 ports USB 5V/2.4A pour recharger smartphones et tablettes.
- Régulateur de charge intelligent MPPT avec écran d'affichage LCD d'état de charge.
- Idéal pour les concessions, commerces, résidences et zones périurbaines.`);

  // =========================================================================
  // 2. MEDIA
  // =========================================================================
  const [mainImage, setMainImage] = useState(initialProduct?.image || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80');
  const [additionalImages, setAdditionalImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [productVideo, setProductVideo] = useState('https://www.youtube.com/watch?v=mock-solar-kit-ifptie');

  // =========================================================================
  // 3. PRICING & AUTOMATIC MARGIN CALCULATION
  // =========================================================================
  const [purchasePrice, setPurchasePrice] = useState<number>(initialProduct?.purchasePrice || 16000);
  const [sellingPrice, setSellingPrice] = useState<number>(initialProduct?.sellingPrice || 24500);
  const [promotionalPrice, setPromotionalPrice] = useState<number>(24500);
  const [isPromoActive, setIsPromoActive] = useState(initialProduct?.isPromotion || false);

  // Automatic margin calculation
  // Target display matching prompt: "Marge estimée: 8 500 FCFA / 34.6%"
  const effectivePrice = isPromoActive && promotionalPrice > 0 ? promotionalPrice : sellingPrice;
  const estimatedMargin = Math.max(0, effectivePrice - purchasePrice);
  const marginPercentage = effectivePrice > 0 ? (Math.floor(((estimatedMargin / effectivePrice) * 100) * 10) / 10).toFixed(1) : '0';

  // =========================================================================
  // 4. INVENTORY
  // =========================================================================
  const [stock, setStock] = useState<number>(initialProduct?.stock || 35);
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(10);
  const [allowBackorder, setAllowBackorder] = useState<boolean>(true);
  const [markOutOfStock, setMarkOutOfStock] = useState<boolean>(false);

  // =========================================================================
  // 5. VARIANTS
  // =========================================================================
  const [variantsList, setVariantsList] = useState([
    { id: 'v1', size: '500W Standard', color: 'Noir Mat', model: 'Batterie 20Ah', custom: 'Prise CMR Standard', priceExtra: 0, stock: 20 },
    { id: 'v2', size: '750W Pro', color: 'Gris Sidéral', model: 'Batterie 35Ah', custom: 'Double Panneau', priceExtra: 15000, stock: 15 }
  ]);
  const [newVarSize, setNewVarSize] = useState('1000W Max');
  const [newVarColor, setNewVarColor] = useState('Bleu Nuit');
  const [newVarModel, setNewVarModel] = useState('Batterie 50Ah');
  const [newVarCustom, setNewVarCustom] = useState('Câble 10m renforcé');

  // =========================================================================
  // 6. SUPPLIER
  // =========================================================================
  const [supplier, setSupplier] = useState(initialProduct?.supplier || 'Shenzhen SunPower Tech');
  const [supplierReference, setSupplierReference] = useState('SZ-SP500-GEN4-CMR');
  const [supplierPurchaseUrl, setSupplierPurchaseUrl] = useState('https://detail.1688.com/offer/654891238472.html');
  const [supplierNotes, setSupplierNotes] = useState('Commande par container 40ft départ port de Ningbo vers Douala (Transit 32 jours). Tarif négocié pour 150 unités minimum. Contact WeChat : Mr. Chen (SunPower Export).');

  // =========================================================================
  // 7. DELIVERY
  // =========================================================================
  const [eligibleCities, setEligibleCities] = useState<string[]>([
    'Yaoundé', 'Douala', 'Bafoussam', 'Kribi', 'Garoua', 'Bamenda'
  ]);
  const [deliveryCategory, setDeliveryCategory] = useState<'express_24h' | 'standard_48h' | 'heavy_cargo'>('express_24h');
  const [specialDeliveryFee, setSpecialDeliveryFee] = useState<number>(1500);

  // =========================================================================
  // 8. MARKETING
  // =========================================================================
  const [isFeatured, setIsFeatured] = useState(true);
  const [isTrending, setIsTrending] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(true);
  const [discountPercentage, setDiscountPercentage] = useState(25);
  const [promoStartDate, setPromoStartDate] = useState('2026-09-15');
  const [promoEndDate, setPromoEndDate] = useState('2026-10-15');

  // =========================================================================
  // 9. SEO
  // =========================================================================
  const [metaTitle, setMetaTitle] = useState('Kit Énergie Solaire Hybride 500W Anti-Délestage | IFPTIE Market');
  const [metaDescription, setMetaDescription] = useState('Achetez le Kit Énergie Solaire 500W au meilleur prix au Cameroun. Éclairage garanti, recharge téléphone et batterie lithium durable. Livraison 24h Douala & Yaoundé.');
  const [slug, setSlug] = useState('kit-energie-solaire-hybride-500w-anti-delestage');

  // Auto-slug generator
  const handleNameChange = (val: string) => {
    setProductName(val);
    if (!isEditing) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
      setMetaTitle(`${val} | IFPTIE Market Cameroun`);
    }
  };

  // Add additional image
  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setAdditionalImages([...additionalImages, newImageUrl.trim()]);
    setNewImageUrl('');
    addToast('Image secondaire ajoutée', 'info');
  };

  const handleRemoveImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  // Add Variant
  const handleAddVariant = () => {
    const newV = {
      id: `var-${Date.now()}`,
      size: newVarSize,
      color: newVarColor,
      model: newVarModel,
      custom: newVarCustom,
      priceExtra: 0,
      stock: 10
    };
    setVariantsList([...variantsList, newV]);
    addToast('Nouvelle variante ajoutée à la grille', 'success');
  };

  const handleRemoveVariant = (id: string) => {
    setVariantsList(variantsList.filter(v => v.id !== id));
  };

  // Toggle city
  const handleToggleCity = (city: string) => {
    setEligibleCities(prev => 
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  // Save product handlers
  const handleSaveProduct = (statusToSave: 'Actif' | 'Brouillon') => {
    if (!productName.trim() || !sku.trim()) {
      addToast('Veuillez renseigner le nom et le SKU du produit', 'warning');
      return;
    }

    const savedItem: AdminProductItem = {
      id: initialProduct?.id || `prod-${Date.now()}`,
      name: productName,
      sku: sku.toUpperCase(),
      category: category,
      categoryLabel: category === 'solar' ? 'Énergie & Solaire' : category === 'home-kitchen' ? 'Maison & Cuisine' : 'High-Tech',
      supplier: supplier,
      supplierOrigin: supplier.includes('Kribi') || supplier.includes('Douala') ? 'local' : 'china',
      purchasePrice: purchasePrice,
      sellingPrice: isPromoActive ? promotionalPrice : sellingPrice,
      originalPrice: isPromoActive ? sellingPrice : undefined,
      stock: markOutOfStock ? 0 : stock,
      status: statusToSave,
      image: mainImage,
      isPromotion: isPromoActive
    };

    onSave(savedItem);
    addToast(statusToSave === 'Actif' ? '✓ Produit publié avec succès sur IFPTIE Market !' : '✓ Brouillon de produit enregistré !', 'success');
    onBack();
  };

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      
      {/* 1. TOP BAR */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} />
            <span>Retour aux produits</span>
          </button>

          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
              {isEditing ? 'Modifier le produit' : 'Ajouter un produit'}
            </h1>
            <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
              Fiche technique, tarification FCFA, marges calculées, stock et référencement SEO.
            </span>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleSaveProduct('Brouillon')}
            style={{
              backgroundColor: '#ffffff',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Save size={15} />
            <span>Save draft (Brouillon)</span>
          </button>

          <button
            onClick={() => handleSaveProduct('Actif')}
            style={{
              backgroundColor: '#0b5738',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 22px',
              fontSize: '0.8125rem',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(11,87,56,0.25)'
            }}
          >
            <CheckCircle2 size={16} />
            <span>Publish product (Publier le produit)</span>
          </button>
        </div>
      </div>

      {/* 2. SECTION NAVIGATION TABS */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        backgroundColor: '#ffffff',
        padding: '8px 12px',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        marginBottom: '20px',
        scrollbarWidth: 'none'
      }}>
        {[
          { key: 'all', label: 'Toutes les sections', icon: Layers },
          { key: 'basic', label: '1. Informations de base', icon: Package },
          { key: 'media', label: '2. Médias & Photos', icon: ImageIcon },
          { key: 'pricing', label: '3. Tarification & Marge', icon: DollarSign },
          { key: 'inventory', label: '4. Stock & Inventaire', icon: Layers },
          { key: 'variants', label: '5. Variantes', icon: Tag },
          { key: 'supplier', label: '6. Fournisseur', icon: Building2 },
          { key: 'delivery', label: '7. Livraison CMR', icon: Truck },
          { key: 'marketing', label: '8. Marketing', icon: TrendingUp },
          { key: 'seo', label: '9. SEO Google', icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isSelected ? '#0b5738' : 'transparent',
                color: isSelected ? '#ffffff' : '#475569',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 800 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={14} color={isSelected ? '#ffffff' : '#94a3b8'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. SECTIONS CONTENT */}
      <div style={{ display: 'grid', gap: '22px' }}>
        
        {/* ========================================================================= */}
        {/* SECTION 1: BASIC INFORMATION                                              */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'basic') && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={20} color="#0b5738" />
              1. BASIC INFORMATION (Informations Générales)
            </h3>

            <div style={{ display: 'grid', gap: '16px' }}>
              {/* Product name & SKU */}
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(200px, 1fr)', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Product name (Nom du produit) *
                  </label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Ex: Kit Énergie Solaire Hybride 500W + Ampoules LED"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', fontWeight: 600, boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    SKU (Référence unique catalogue) *
                  </label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Ex: SKU-SOL-500W-CMR"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', fontFamily: 'monospace', fontWeight: 800, boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Category & Subcategory */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Category (Rayon principal) *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', backgroundColor: '#ffffff' }}
                  >
                    <option value="solar">Énergie & Solaire</option>
                    <option value="home-kitchen">Maison & Cuisine</option>
                    <option value="tech">High-Tech & Accessoires</option>
                    <option value="beauty">Beauté & Bien-être</option>
                    <option value="intimacy">Intimité & Bien-être</option>
                    <option value="automotive">Auto & Moto</option>
                    <option value="tools">Outils & Bricolage</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Subcategory (Sous-catégorie)
                  </label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    placeholder="Ex: Kits Solaires Hybrides, Batteries"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Short description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Short description (Résumé accrocheur pour la fiche mobile) *
                </label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Bref résumé en 1 ou 2 phrases percutantes..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                />
              </div>

              {/* Full description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Full description (Description détaillée & caractéristiques techniques) *
                </label>
                <textarea
                  rows={5}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Détails complets, liste à puces des avantages, composition du colis..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: MEDIA                                                          */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'media') && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={20} color="#0b5738" />
              2. MEDIA (Visuels & Vidéo Produit)
            </h3>

            <div style={{ display: 'grid', gap: '16px' }}>
              {/* Main Image */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Main image (Image principale) *
                </label>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <img
                    src={mainImage}
                    alt="Visuel principal"
                    style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '12px', border: '2px solid #0b5738' }}
                  />
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <input
                      type="text"
                      value={mainImage}
                      onChange={(e) => setMainImage(e.target.value)}
                      placeholder="https://..."
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box', marginBottom: '6px' }}
                    />
                    <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                      Affichée sur les miniatures, paniers et bannières promotionnelles.
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Images */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Additional images (Galerie de photos supplémentaires)
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  {additionalImages.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <img
                        src={img}
                        alt={`Secondaire ${idx + 1}`}
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          backgroundColor: '#ef4444',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Coller l'URL d'une image supplémentaire..."
                    style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    style={{
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '9px 16px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Ajouter photo
                  </button>
                </div>
              </div>

              {/* Product video */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Product video (Lien démonstration vidéo YouTube / TikTok / MP4)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Video size={18} color="#0b5738" />
                  <input
                    type="text"
                    value={productVideo}
                    onChange={(e) => setProductVideo(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: PRICING                                                        */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'pricing') && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            border: '1.5px solid #0b5738',
            boxShadow: '0 2px 8px rgba(11,87,56,0.05)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0b5738', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DollarSign size={20} />
              3. PRICING (Tarification & Calcul Automatique de Marge)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              {/* Purchase price */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Purchase price (Prix d'achat unitaire) *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    required
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9375rem', fontWeight: 800, boxSizing: 'border-box' }}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>
                    FCFA
                  </span>
                </div>
              </div>

              {/* Selling price */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Selling price (Prix de vente catalogue) *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    required
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value) || 0)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9375rem', fontWeight: 800, boxSizing: 'border-box' }}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>
                    FCFA
                  </span>
                </div>
              </div>

              {/* Promotional price */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#334155' }}>
                    Promotional price (Prix promo)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.6875rem', fontWeight: 700, color: '#c2410c', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={isPromoActive}
                      onChange={(e) => setIsPromoActive(e.target.checked)}
                      style={{ accentColor: '#ea580c' }}
                    />
                    Actif
                  </label>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    disabled={!isPromoActive}
                    value={promotionalPrice}
                    onChange={(e) => setPromotionalPrice(Number(e.target.value) || 0)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9375rem', fontWeight: 800, boxSizing: 'border-box', backgroundColor: isPromoActive ? '#ffffff' : '#f8fafc' }}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>
                    FCFA
                  </span>
                </div>
              </div>
            </div>

            {/* AUTOMATIC MARGIN DISPLAY (Conforms strictly to requested display: "Marge estimée: 8 500 FCFA / 34.6%") */}
            <div style={{
              backgroundColor: '#ecfdf5',
              borderRadius: '12px',
              padding: '16px 20px',
              border: '1.5px solid #a7f3d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Automatic margin calculation
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#065f46', marginTop: '2px' }}>
                  Marge estimée: {formatFCFA(estimatedMargin)} / {marginPercentage}%
                </div>
              </div>

              <div style={{
                backgroundColor: '#0b5738',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 800
              }}>
                Rentabilité Validée ✓
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 4: INVENTORY                                                      */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'inventory') && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} color="#0b5738" />
              4. INVENTORY (Gestion des Stocks & Ruptures)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Stock (Unités disponibles à Mvan/Akwa) *
                </label>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value) || 0)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9375rem', fontWeight: 800, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Low stock threshold (Seuil d'alerte stock faible)
                </label>
                <input
                  type="number"
                  value={lowStockThreshold}
                  onChange={(e) => setLowStockThreshold(Number(e.target.value) || 0)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9375rem', fontWeight: 800, boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gap: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={allowBackorder}
                  onChange={(e) => setAllowBackorder(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#0b5738' }}
                />
                <div>
                  <strong style={{ fontSize: '0.8125rem', color: '#0f172a' }}>Allow backorder (Autoriser les précommandes en cas de rupture)</strong>
                  <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Les clients peuvent commander avec un délai de livraison de 7 à 14 jours via arrivage Chine.</div>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={markOutOfStock}
                  onChange={(e) => setMarkOutOfStock(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#dc2626' }}
                />
                <div>
                  <strong style={{ fontSize: '0.8125rem', color: '#dc2626' }}>Mark as out of stock (Forcer le statut "Épuisé" immédiatement)</strong>
                  <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Le produit reste visible avec badge Épuisé et notification de réapprovisionnement.</div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 5: VARIANTS                                                       */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'variants') && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Tag size={20} color="#0b5738" />
              5. VARIANTS (Tailles, Couleurs, Modèles & Attributs)
            </h3>

            {/* Existing variants table */}
            <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#475569', fontWeight: 800 }}>
                    <th style={{ padding: '8px 10px' }}>Size (Taille/Puissance)</th>
                    <th style={{ padding: '8px 10px' }}>Color (Couleur)</th>
                    <th style={{ padding: '8px 10px' }}>Model (Modèle)</th>
                    <th style={{ padding: '8px 10px' }}>Custom variant</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right' }}>Prix Extra</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center' }}>Stock</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {variantsList.map((v) => (
                    <tr key={v.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px', fontWeight: 700 }}>{v.size}</td>
                      <td style={{ padding: '10px' }}>{v.color}</td>
                      <td style={{ padding: '10px' }}>{v.model}</td>
                      <td style={{ padding: '10px', color: '#64748b' }}>{v.custom}</td>
                      <td style={{ padding: '10px', textAlign: 'right', fontWeight: 800, color: '#0b5738' }}>
                        +{formatFCFA(v.priceExtra)}
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: 800 }}>{v.stock} u.</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleRemoveVariant(v.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add new variant row */}
            <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#0b5738', textTransform: 'uppercase', marginBottom: '8px' }}>
                Ajouter une variante :
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Size (Taille/Puissance)"
                  value={newVarSize}
                  onChange={(e) => setNewVarSize(e.target.value)}
                  style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                />
                <input
                  type="text"
                  placeholder="Color (Couleur)"
                  value={newVarColor}
                  onChange={(e) => setNewVarColor(e.target.value)}
                  style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                />
                <input
                  type="text"
                  placeholder="Model (Modèle)"
                  value={newVarModel}
                  onChange={(e) => setNewVarModel(e.target.value)}
                  style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                />
                <input
                  type="text"
                  placeholder="Other custom variants"
                  value={newVarCustom}
                  onChange={(e) => setNewVarCustom(e.target.value)}
                  style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                />
              </div>
              <button
                type="button"
                onClick={handleAddVariant}
                style={{
                  backgroundColor: '#0b5738',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={14} />
                <span>Ajouter cette variante</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 6: SUPPLIER                                                       */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'supplier') && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={20} color="#0b5738" />
              6. SUPPLIER (Informations Fournisseur & Approvisionnement)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Supplier (Nom de l'usine / grossiste) *
                </label>
                <input
                  type="text"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="Ex: Shenzhen SunPower Tech"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Supplier reference (Référence catalogue usine)
                </label>
                <input
                  type="text"
                  value={supplierReference}
                  onChange={(e) => setSupplierReference(e.target.value)}
                  placeholder="Ex: SZ-SP500-GEN4-CMR"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', fontFamily: 'monospace', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                Supplier purchase URL (Lien direct d'achat usine Alibaba / 1688 / CMR)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link size={16} color="#64748b" />
                <input
                  type="text"
                  value={supplierPurchaseUrl}
                  onChange={(e) => setSupplierPurchaseUrl(e.target.value)}
                  placeholder="https://..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                Notes (Remarques logistiques, contacts et modalités de fret)
              </label>
              <textarea
                rows={3}
                value={supplierNotes}
                onChange={(e) => setSupplierNotes(e.target.value)}
                placeholder="Ex: Délais de transport maritime, contact WeChat de l'agent commercial..."
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 7: DELIVERY                                                       */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'delivery') && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={20} color="#0b5738" />
              7. DELIVERY (Modalités de Livraison au Cameroun)
            </h3>

            {/* Eligible cities */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '8px' }}>
                Eligible cities (Villes camerounaises desservies) *
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Yaoundé', 'Douala', 'Bafoussam', 'Kribi', 'Garoua', 'Bamenda', 'Ngaoundéré', 'Bertoua', 'Limbe'].map((city) => {
                  const isChecked = eligibleCities.includes(city);
                  return (
                    <button
                      type="button"
                      key={city}
                      onClick={() => handleToggleCity(city)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        border: isChecked ? '1.5px solid #0b5738' : '1px solid #cbd5e1',
                        backgroundColor: isChecked ? '#ecfdf5' : '#ffffff',
                        color: isChecked ? '#047857' : '#475569',
                        fontWeight: isChecked ? 800 : 600,
                        fontSize: '0.8125rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isChecked && <Check size={14} color="#047857" />}
                      <span>🇨🇲 {city}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery category & Special fee */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Delivery category (Mode d'acheminement) *
                </label>
                <select
                  value={deliveryCategory}
                  onChange={(e) => setDeliveryCategory(e.target.value as any)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', backgroundColor: '#ffffff' }}
                >
                  <option value="express_24h">⚡ Express Moto 24h (Douala & Yaoundé)</option>
                  <option value="standard_48h">📦 Standard Agence 48h (Régions)</option>
                  <option value="heavy_cargo">🚚 Colis volumineux & Matériel Lourd</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Special delivery fee (Frais spécifiques FCFA)
                </label>
                <input
                  type="number"
                  value={specialDeliveryFee}
                  onChange={(e) => setSpecialDeliveryFee(Number(e.target.value) || 0)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 8: MARKETING                                                      */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'marketing') && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="#0b5738" />
              8. MARKETING (Mise en Avant & Badges Promotionnels)
            </h3>

            {/* Badges Toggles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', cursor: 'pointer', backgroundColor: isFeatured ? '#ecfdf5' : '#ffffff' }}>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  style={{ accentColor: '#0b5738' }}
                />
                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a' }}>⭐ Featured product</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', cursor: 'pointer', backgroundColor: isTrending ? '#ecfdf5' : '#ffffff' }}>
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  style={{ accentColor: '#0b5738' }}
                />
                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a' }}>🔥 Trending product</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', cursor: 'pointer', backgroundColor: isBestSeller ? '#ecfdf5' : '#ffffff' }}>
                <input
                  type="checkbox"
                  checked={isBestSeller}
                  onChange={(e) => setIsBestSeller(e.target.checked)}
                  style={{ accentColor: '#0b5738' }}
                />
                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a' }}>🏆 Best seller</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', cursor: 'pointer', backgroundColor: isPromoActive ? '#ecfdf5' : '#ffffff' }}>
                <input
                  type="checkbox"
                  checked={isPromoActive}
                  onChange={(e) => setIsPromoActive(e.target.checked)}
                  style={{ accentColor: '#ea580c' }}
                />
                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#ea580c' }}>⚡ Promotion</span>
              </label>
            </div>

            {/* Discount & Dates */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Discount percentage (Pourcentage de remise)
                </label>
                <input
                  type="number"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(Number(e.target.value) || 0)}
                  placeholder="25"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', fontWeight: 800, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Promotion start date (Date début)
                </label>
                <input
                  type="date"
                  value={promoStartDate}
                  onChange={(e) => setPromoStartDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Promotion end date (Date fin)
                </label>
                <input
                  type="date"
                  value={promoEndDate}
                  onChange={(e) => setPromoEndDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 9: SEO                                                            */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'seo') && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={20} color="#0b5738" />
              9. SEO (Optimisation Google & Moteurs de Recherche)
            </h3>

            <div style={{ display: 'grid', gap: '14px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#334155' }}>
                    Meta title *
                  </label>
                  <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>{metaTitle.length}/60 caractères</span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#334155' }}>
                    Meta description *
                  </label>
                  <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>{metaDescription.length}/160 caractères</span>
                </div>
                <textarea
                  rows={2}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Slug (URL canonique du produit) *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f8fafc', padding: '4px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>ifptie.cm/produit/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8125rem', fontWeight: 800, color: '#0b5738' }}
                  />
                </div>
              </div>
            </div>

            {/* Google Live Search Preview */}
            <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                Aperçu du résultat Google Cameroun :
              </span>
              <div style={{ fontSize: '0.75rem', color: '#202124', marginBottom: '2px' }}>
                https://ifptie.cm &gt; produit &gt; {slug}
              </div>
              <div style={{ fontSize: '1rem', color: '#1a0dab', fontWeight: 700, textDecoration: 'underline', marginBottom: '3px' }}>
                {metaTitle}
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#4d5156', lineHeight: 1.4 }}>
                {metaDescription}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* BOTTOM ACTION BAR (Save draft & Publish product)                           */}
      {/* ========================================================================= */}
      <div style={{
        marginTop: '28px',
        padding: '16px 24px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
        position: 'sticky',
        bottom: '16px',
        zIndex: 50
      }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            color: '#475569',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          Annuler
        </button>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => handleSaveProduct('Brouillon')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: '1.5px solid #cbd5e1',
              backgroundColor: '#f8fafc',
              color: '#1e293b',
              fontWeight: 800,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Save size={16} />
            <span>Save draft (Enregistrer brouillon)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSaveProduct('Actif')}
            style={{
              padding: '10px 26px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#0b5738',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(11,87,56,0.3)'
            }}
          >
            <CheckCircle2 size={18} />
            <span>Publish product (Publier le produit)</span>
          </button>
        </div>
      </div>

    </div>
  );
};
