import React from 'react';
import { ShieldCheck, Package } from 'lucide-react';

export const DiscreetNotice: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderLeft: '4px solid #7c3aed',
      borderRadius: 'var(--radius-sm)',
      padding: '12px 16px',
      margin: '16px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: '#ede9fe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#7c3aed',
        flexShrink: 0
      }}>
        <Package size={20} />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e1b4b' }}>
            Livraison 100% Confidentielle & Colis Neutre Garanti
          </span>
          <ShieldCheck size={16} color="#7c3aed" />
        </div>
        <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.4, margin: 0 }}>
          Aucune mention du produit ni de la catégorie sur le paquet extérieur. Remis en main propre discrètement par nos coursiers agréés.
        </p>
      </div>
    </div>
  );
};
