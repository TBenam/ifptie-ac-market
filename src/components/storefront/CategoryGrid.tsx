import React from 'react';
import { useStore } from '../../store/useStore';
import { MOCK_CATEGORIES } from '../../mock/data';
import { 
  Sun, 
  Smartphone, 
  Home, 
  Sparkles, 
  Heart, 
  Wrench, 
  Car, 
  Baby, 
  TrendingUp, 
  Flame, 
  Grid 
} from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const getCategoryIcon = (iconName: string, isSelected: boolean) => {
    const color = isSelected ? '#ffffff' : 'var(--color-primary)';
    const size = 24;
    switch (iconName) {
      case 'Sun': return <Sun size={size} color={color} />;
      case 'Smartphone': return <Smartphone size={size} color={color} />;
      case 'Home': return <Home size={size} color={color} />;
      case 'Sparkles': return <Sparkles size={size} color={color} />;
      case 'Heart': return <Heart size={size} color={isSelected ? '#ffffff' : '#7c3aed'} />;
      case 'Wrench': return <Wrench size={size} color={color} />;
      case 'Car': return <Car size={size} color={color} />;
      case 'Baby': return <Baby size={size} color={color} />;
      case 'TrendingUp': return <TrendingUp size={size} color={color} />;
      case 'Flame': return <Flame size={size} color={isSelected ? '#ffffff' : '#ea580c'} />;
      default: return <Grid size={size} color={color} />;
    }
  };

  return (
    <section style={{ marginBottom: '32px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
          Explorer les Rayons
        </h2>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Disponibilité immédiate au Cameroun
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
        gap: '12px'
      }}>
        {MOCK_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                backgroundColor: isSelected ? 'var(--color-primary)' : '#ffffff',
                color: isSelected ? '#ffffff' : 'var(--text-main)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 12px',
                border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '10px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-xs)'
              }}
            >
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getCategoryIcon(cat.icon, isSelected)}
              </div>

              <span style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                lineHeight: 1.2
              }}>
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
