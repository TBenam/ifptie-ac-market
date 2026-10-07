import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_PRODUCTS, MOCK_HOMEPAGE_CATEGORIES } from '../../mock/data';
import { ProductCard } from '../common/ProductCard';
import { formatFCFA } from '../../utils/formatters';
import type { Product } from '../../types';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  RotateCcw, 
  PackageSearch, 
  Star, 
  Check, 
  Truck, 
  Tag, 
  Filter,
  ArrowRight
} from 'lucide-react';

export const ProductListingView: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    setActiveView 
  } = useStore();

  // Initial query "lampe solaire" if empty
  const currentQuery = searchQuery || 'lampe solaire';

  // Filter States
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(80000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(true);
  const [promoOnly, setPromoOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [deliveryCity, setDeliveryCity] = useState<string>('all');

  // Sort State
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'price_asc' | 'price_desc' | 'sales'>('relevance');

  // Mobile Filter Modal
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and Search Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // 1. Text Search matching
      if (currentQuery.trim()) {
        const terms = currentQuery.toLowerCase().split(' ').filter(Boolean);
        const text = `${product.name} ${product.shortDescription} ${product.categoryLabel} ${product.features.join(' ')}`.toLowerCase();
        // Check if product matches or if in solar/lamp category for "lampe solaire"
        const matchesQuery = terms.some(term => text.includes(term)) || (currentQuery.toLowerCase().includes('solaire') && product.category === 'solar');
        if (!matchesQuery) return false;
      }

      // 2. Category
      if (selectedCatFilter !== 'all' && product.category !== selectedCatFilter) {
        return false;
      }

      // 3. Price
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // 4. In Stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // 5. Promo Only
      if (promoOnly && (!product.originalPrice || product.originalPrice <= product.price)) {
        return false;
      }

      // 6. Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // 7. City delivery
      if (deliveryCity !== 'all' && !product.deliveryDays.toLowerCase().includes(deliveryCity.toLowerCase())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'sales') return (b.soldCount || 0) - (a.soldCount || 0);
      if (sortBy === 'relevance') return b.rating - a.rating;
      return 0;
    });
  }, [currentQuery, selectedCatFilter, minPrice, maxPrice, inStockOnly, promoOnly, minRating, deliveryCity, sortBy]);

  const resetFilters = () => {
    setSelectedCatFilter('all');
    setMinPrice(0);
    setMaxPrice(80000);
    setInStockOnly(false);
    setPromoOnly(false);
    setMinRating(0);
    setDeliveryCity('all');
    setSortBy('relevance');
  };

  const activeFiltersCount = (selectedCatFilter !== 'all' ? 1 : 0) + 
    (minPrice > 0 ? 1 : 0) + 
    (maxPrice < 80000 ? 1 : 0) + 
    (promoOnly ? 1 : 0) + 
    (minRating > 0 ? 1 : 0) + 
    (deliveryCity !== 'all' ? 1 : 0);

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '64px' }}>
      {/* 1. TOP HEADER SEARCH SUMMARY */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-xs)',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              Résultats pour votre recherche :
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--color-primary-dark)'
              }}>
                « {currentQuery} »
              </span>
              <span className="badge badge-yellow" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                {filteredProducts.length} produits trouvés
              </span>
            </div>
          </div>

          {/* Quick Clear or Refine Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setSearchQuery('')}
              className="btn btn-outline btn-sm"
              style={{ gap: '6px' }}
            >
              <RotateCcw size={14} />
              <span>Réinitialiser la recherche</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MOBILE CONTROLS BAR (Filter & Sort Buttons) */}
      <div className="mobile-only" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {/* Mobile Filter Trigger Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="btn btn-outline btn-full"
            style={{
              padding: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              gap: '6px',
              backgroundColor: activeFiltersCount > 0 ? 'var(--color-primary-subtle)' : '#ffffff',
              borderColor: activeFiltersCount > 0 ? 'var(--color-primary)' : 'var(--border-subtle)'
            }}
          >
            <Filter size={16} color="var(--color-primary)" />
            <span>Filtres {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Mobile Sort Dropdown */}
          <div style={{ position: 'relative' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="form-select"
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '0.85rem',
                fontWeight: 700,
                borderColor: 'var(--border-subtle)'
              }}
            >
              <option value="relevance">Trier : Pertinence</option>
              <option value="newest">Trier : Nouveautés</option>
              <option value="price_asc">Trier : Prix croissant</option>
              <option value="price_desc">Trier : Prix décroissant</option>
              <option value="sales">Trier : Meilleures ventes</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. MAIN LAYOUT: SIDEBAR + RESULTS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '270px 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="desktop-only" style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '22px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-xs)',
          position: 'sticky',
          top: '90px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={18} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Filtres</h3>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Effacer ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* 1. Filter: Catégorie */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '10px' }}>Catégorie</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="catFilter"
                  checked={selectedCatFilter === 'all'}
                  onChange={() => setSelectedCatFilter('all')}
                />
                <span>Toutes les catégories</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="catFilter"
                  checked={selectedCatFilter === 'solar'}
                  onChange={() => setSelectedCatFilter('solar')}
                />
                <span>Énergie & Solaire</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="catFilter"
                  checked={selectedCatFilter === 'tech'}
                  onChange={() => setSelectedCatFilter('tech')}
                />
                <span>High-Tech & Accessoires</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="catFilter"
                  checked={selectedCatFilter === 'home-kitchen'}
                  onChange={() => setSelectedCatFilter('home-kitchen')}
                />
                <span>Maison & Cuisine</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="catFilter"
                  checked={selectedCatFilter === 'tools'}
                  onChange={() => setSelectedCatFilter('tools')}
                />
                <span>Outils & Bricolage</span>
              </label>
            </div>
          </div>

          {/* 2. Filter: Prix Min / Max */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Budget (FCFA)</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                placeholder="Min"
                className="form-input"
                style={{ padding: '6px 8px', fontSize: '0.8125rem' }}
              />
              <span style={{ color: 'var(--text-light)' }}>-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                placeholder="Max"
                className="form-input"
                style={{ padding: '6px 8px', fontSize: '0.8125rem' }}
              />
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Entre {formatFCFA(minPrice)} et {formatFCFA(maxPrice)}
            </div>
          </div>

          {/* 3. Filter: Disponibilité */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Disponibilité</h4>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span>En stock uniquement au Cameroun</span>
            </label>
          </div>

          {/* 4. Filter: Promotions */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Offres spéciales</h4>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={promoOnly}
                onChange={(e) => setPromoOnly(e.target.checked)}
              />
              <span style={{ color: '#ea580c', fontWeight: 600 }}>🔥 En promotion uniquement</span>
            </label>
          </div>

          {/* 5. Filter: Note */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Avis clients</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[4, 4.5].map((stars) => (
                <label key={stars} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="ratingFilter"
                    checked={minRating === stars}
                    onChange={() => setMinRating(minRating === stars ? 0 : stars)}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--color-yellow-hover)' }}>
                    <Star size={13} fill="currentColor" />
                    <span>{stars}★ et plus</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 6. Filter: Ville / Livraison */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Ville & Expédition</h4>
            <select
              value={deliveryCity}
              onChange={(e) => setDeliveryCity(e.target.value)}
              className="form-select"
              style={{ padding: '6px 10px', fontSize: '0.8125rem' }}
            >
              <option value="all">Toutes les villes</option>
              <option value="Douala">Douala (24h)</option>
              <option value="Yaoundé">Yaoundé (24h)</option>
              <option value="Régions">Autres régions (48h)</option>
            </select>
          </div>
        </aside>

        {/* MAIN RESULTS CONTENT */}
        <div>
          {/* Top Toolbar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            backgroundColor: '#ffffff',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '20px'
          }}>
            {/* Results count */}
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
              <span>{filteredProducts.length} produits trouvés</span>
            </div>

            {/* Desktop Sort Dropdown */}
            <div className="desktop-flex" style={{ alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="form-select"
                style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8125rem', fontWeight: 600 }}
              >
                <option value="relevance">Pertinence</option>
                <option value="newest">Nouveautés</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="sales">Meilleures ventes</option>
              </select>
            </div>
          </div>

          {/* Product Grid (4 columns desktop, 2 columns mobile) */}
          {filteredProducts.length === 0 ? (
            /* EMPTY SEARCH STATE */
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '48px 24px',
              textAlign: 'center',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <PackageSearch size={32} />
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                Aucun produit trouvé
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '460px', margin: '0 auto 24px', lineHeight: 1.5 }}>
                Nous n'avons trouvé aucun article correspondant exactement à vos critères. Essayez d'ajuster vos filtres ou explorez nos suggestions populaires.
              </p>

              {/* Suggestions */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px' }}>
                  Suggestions de recherche fréquentes :
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  {['Kit solaire', 'Power Bank', 'Robot cuiseur', 'Karité bio', 'Perceuse'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="btn btn-outline btn-sm"
                      style={{ borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA to browse categories */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={resetFilters}
                  className="btn btn-outline"
                >
                  <RotateCcw size={16} />
                  Réinitialiser les filtres
                </button>

                <button
                  onClick={() => setActiveView('categories')}
                  className="btn btn-primary"
                >
                  Parcourir toutes les catégories
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="product-grid-2col">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} ctaText="Acheter maintenant" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. MOBILE FILTER MODAL / DRAWER */}
      {isMobileFilterOpen && (
        <div className="modal-overlay" onClick={() => setIsMobileFilterOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SlidersHorizontal size={20} color="var(--color-primary)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Filtrer les produits</h3>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Filter options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
              <div>
                <label className="form-label">Catégorie</label>
                <select
                  value={selectedCatFilter}
                  onChange={(e) => setSelectedCatFilter(e.target.value)}
                  className="form-select"
                >
                  <option value="all">Toutes les catégories</option>
                  <option value="solar">Énergie & Solaire</option>
                  <option value="tech">High-Tech & Accessoires</option>
                  <option value="home-kitchen">Maison & Cuisine</option>
                  <option value="tools">Outils & Bricolage</option>
                </select>
              </div>

              <div>
                <label className="form-label">Prix maximum ({formatFCFA(maxPrice)})</label>
                <input
                  type="range"
                  min="5000"
                  max="80000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span>En stock uniquement</span>
                </label>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 600, color: '#ea580c' }}>
                  <input
                    type="checkbox"
                    checked={promoOnly}
                    onChange={(e) => setPromoOnly(e.target.checked)}
                  />
                  <span>🔥 En promotion uniquement</span>
                </label>
              </div>

              <div>
                <label className="form-label">Ville de livraison</label>
                <select
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="form-select"
                >
                  <option value="all">Toutes les villes</option>
                  <option value="Douala">Douala (24h)</option>
                  <option value="Yaoundé">Yaoundé (24h)</option>
                </select>
              </div>
            </div>

            {/* Mobile Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={resetFilters}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Effacer
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                Voir les résultats ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
