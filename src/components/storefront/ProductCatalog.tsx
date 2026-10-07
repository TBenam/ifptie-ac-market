import React, { useMemo, useState } from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_PRODUCTS } from '../../mock/data';
import { ProductCard } from '../common/ProductCard';
import { DiscreetNotice } from '../common/DiscreetNotice';
import { SlidersHorizontal, PackageSearch, RotateCcw } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory,
    searchQuery, 
    setSearchQuery, 
    originFilter, 
    setOriginFilter 
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // 1. Category Filter
      if (selectedCategory === 'deals') {
        if (!product.isFlashDeal) return false;
      } else if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // 2. Origin Filter
      if (originFilter !== 'all' && product.origin !== originFilter) {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.shortDescription.toLowerCase().includes(q);
        const matchCat = product.categoryLabel.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, originFilter, searchQuery, sortBy]);

  const isIntimacyCategory = selectedCategory === 'intimacy';

  return (
    <section id="catalog-section" style={{ marginBottom: '48px' }}>
      {/* Filters & Control Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '20px',
        paddingBottom: '14px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
            {selectedCategory === 'all' 
              ? 'Tous nos Produits' 
              : selectedCategory === 'deals'
              ? 'Sélection Ventes Flash'
              : `Rayon : ${filteredProducts[0]?.categoryLabel || selectedCategory}`}
          </h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            ({filteredProducts.length} articles)
          </span>
        </div>

        {/* Origin Toggle Tabs: Tous | Chine Direct | Local Cameroun */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            background: '#ffffff',
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={() => setOriginFilter('all')}
              style={{
                border: 'none',
                background: originFilter === 'all' ? 'var(--color-primary)' : 'transparent',
                color: originFilter === 'all' ? '#ffffff' : 'var(--text-main)',
                padding: '5px 12px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Tous
            </button>
            <button
              onClick={() => setOriginFilter('china')}
              style={{
                border: 'none',
                background: originFilter === 'china' ? '#0284c7' : 'transparent',
                color: originFilter === 'china' ? '#ffffff' : 'var(--text-main)',
                padding: '5px 12px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🇨🇳 Chine Direct
            </button>
            <button
              onClick={() => setOriginFilter('local')}
              style={{
                border: 'none',
                background: originFilter === 'local' ? '#b91c1c' : 'transparent',
                color: originFilter === 'local' ? '#ffffff' : 'var(--text-main)',
                padding: '5px 12px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🇨🇲 Cameroun Local
            </button>
          </div>

          {/* Sort Select */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8125rem' }}
          >
            <option value="featured">Tri : En vedette</option>
            <option value="price_asc">Prix : Moins cher</option>
            <option value="price_desc">Prix : Plus cher</option>
            <option value="rating">Meilleures notes</option>
          </select>
        </div>
      </div>

      {/* Discreet notice shown when viewing intimacy category */}
      {isIntimacyCategory && <DiscreetNotice />}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '60px 20px',
          textAlign: 'center',
          border: '1px solid var(--border-subtle)'
        }}>
          <PackageSearch size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
            Aucun produit ne correspond à votre recherche
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Essayez de modifier vos filtres d'origine ou votre mot-clé de recherche.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setOriginFilter('all');
              setSearchQuery('');
            }}
            className="btn btn-primary"
            style={{ gap: '8px' }}
          >
            <RotateCcw size={16} />
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
