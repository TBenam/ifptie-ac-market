import React from 'react';
import {
  ShoppingCart,
  Package,
  Truck,
  Bell,
  Star,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  WifiOff,
  CreditCard,
  Send,
  Trash2,
  UserCheck,
  Bike,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Check,
  HelpCircle,
  X
} from 'lucide-react';
import { formatFCFA } from '../../utils/formatters';

// ============================================================================
// 1. LOADING SKELETONS
//    - Product skeleton
//    - Dashboard skeleton
//    - Order table skeleton
// ============================================================================

export const ProductSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '20px',
      width: '100%'
    }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}
        >
          {/* Image skeleton */}
          <div style={{
            height: '200px',
            backgroundColor: '#f1f5f9',
            animation: 'pulse 1.5s infinite'
          }} />

          {/* Body */}
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ height: '12px', width: '40%', backgroundColor: '#e2e8f0', borderRadius: '6px' }} />
            <div style={{ height: '18px', width: '85%', backgroundColor: '#cbd5e1', borderRadius: '6px' }} />
            <div style={{ height: '14px', width: '60%', backgroundColor: '#f1f5f9', borderRadius: '6px' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <div style={{ height: '22px', width: '45%', backgroundColor: '#cbd5e1', borderRadius: '6px' }} />
              <div style={{ height: '36px', width: '36px', backgroundColor: '#e2e8f0', borderRadius: '10px' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header skeleton */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ height: '28px', width: '220px', backgroundColor: '#cbd5e1', borderRadius: '8px' }} />
          <div style={{ height: '14px', width: '340px', backgroundColor: '#e2e8f0', borderRadius: '6px' }} />
        </div>
        <div style={{ height: '38px', width: '180px', backgroundColor: '#e2e8f0', borderRadius: '10px' }} />
      </div>

      {/* 4 KPIs skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ height: '12px', width: '50%', backgroundColor: '#e2e8f0', borderRadius: '6px', marginBottom: '12px' }} />
            <div style={{ height: '28px', width: '70%', backgroundColor: '#cbd5e1', borderRadius: '8px', marginBottom: '10px' }} />
            <div style={{ height: '12px', width: '40%', backgroundColor: '#f1f5f9', borderRadius: '6px' }} />
          </div>
        ))}
      </div>

      {/* Main Chart skeleton */}
      <div style={{ height: '280px', backgroundColor: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0', padding: '24px' }}>
        <div style={{ height: '18px', width: '260px', backgroundColor: '#cbd5e1', borderRadius: '6px', marginBottom: '24px' }} />
        <div style={{ height: '180px', backgroundColor: '#f8fafc', borderRadius: '12px' }} />
      </div>
    </div>
  );
};

export const OrderTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ height: '20px', width: '160px', backgroundColor: '#cbd5e1', borderRadius: '6px' }} />
        <div style={{ height: '20px', width: '100px', backgroundColor: '#e2e8f0', borderRadius: '6px' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#f1f5f9' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ height: '14px', width: '140px', backgroundColor: '#cbd5e1', borderRadius: '4px' }} />
                <div style={{ height: '12px', width: '90px', backgroundColor: '#e2e8f0', borderRadius: '4px' }} />
              </div>
            </div>
            <div style={{ height: '16px', width: '80px', backgroundColor: '#cbd5e1', borderRadius: '4px' }} />
            <div style={{ height: '24px', width: '90px', backgroundColor: '#e2e8f0', borderRadius: '6px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 2. EMPTY STATES
//    - Empty cart
//    - No orders
//    - No products
//    - No deliveries
//    - No notifications
//    - No reviews
//    - No search results
// ============================================================================

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyCartState: React.FC<EmptyStateProps> = ({
  title = 'Votre panier est vide',
  description = 'Découvrez nos kits solaires, équipements maison et profitez du paiement cash à la livraison.',
  actionLabel = 'Explorer les produits',
  onAction
}) => (
  <div style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
    <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: '#ecfdf5', color: '#0b5738', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
      <ShoppingCart size={32} />
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>{title}</h3>
    <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '420px', margin: '0 auto 20px', lineHeight: '1.5' }}>{description}</p>
    {actionLabel && (
      <button onClick={onAction} style={{ padding: '10px 22px', backgroundColor: '#0b5738', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
        {actionLabel}
      </button>
    )}
  </div>
);

export const NoOrdersState: React.FC<EmptyStateProps> = ({
  title = 'Aucune commande enregistrée',
  description = 'Il n y a actuellement aucune commande dans cette section ou pour la période sélectionnée.',
  actionLabel = 'Créer une commande',
  onAction
}) => (
  <div style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '18px', border: '1px dashed #cbd5e1' }}>
    <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
      <Package size={32} />
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>{title}</h3>
    <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '420px', margin: '0 auto 20px', lineHeight: '1.5' }}>{description}</p>
    {actionLabel && (
      <button onClick={onAction} style={{ padding: '10px 22px', backgroundColor: '#0b5738', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
        {actionLabel}
      </button>
    )}
  </div>
);

export const NoProductsState: React.FC<EmptyStateProps> = ({
  title = 'Aucun produit trouvé',
  description = 'Votre catalogue ne contient aucun produit avec les critères de filtrage actifs.',
  actionLabel = 'Ajouter un produit',
  onAction
}) => (
  <div style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '18px', border: '1px dashed #cbd5e1' }}>
    <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
      <Package size={32} />
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>{title}</h3>
    <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '420px', margin: '0 auto 20px', lineHeight: '1.5' }}>{description}</p>
    {actionLabel && (
      <button onClick={onAction} style={{ padding: '10px 22px', backgroundColor: '#0b5738', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
        {actionLabel}
      </button>
    )}
  </div>
);

export const NoDeliveriesState: React.FC<EmptyStateProps> = ({
  title = 'Aucune livraison en attente',
  description = 'Toutes les commandes ont été affectées à un coursier ou livrées avec succès.',
  actionLabel = 'Actualiser les tournées',
  onAction
}) => (
  <div style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '18px', border: '1px dashed #cbd5e1' }}>
    <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
      <Truck size={32} />
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>{title}</h3>
    <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '420px', margin: '0 auto 20px', lineHeight: '1.5' }}>{description}</p>
    {actionLabel && (
      <button onClick={onAction} style={{ padding: '10px 22px', backgroundColor: '#0b5738', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
        {actionLabel}
      </button>
    )}
  </div>
);

export const NoNotificationsState: React.FC<EmptyStateProps> = ({
  title = 'Vous êtes à jour !',
  description = 'Aucune nouvelle alerte ni notification non lue dans votre centre de contrôle.',
  actionLabel,
  onAction
}) => (
  <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#ffffff' }}>
    <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#ecfdf5', color: '#0b5738', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
      <Bell size={28} />
    </div>
    <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>{title}</h4>
    <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>{description}</p>
  </div>
);

export const NoReviewsState: React.FC<EmptyStateProps> = ({
  title = 'Aucun avis client pour le moment',
  description = 'Les avis laissés par les clients vérifiés après réception de leur colis apparaîtront ici.',
  actionLabel = 'Créer un témoignage marketing',
  onAction
}) => (
  <div style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '18px', border: '1px dashed #cbd5e1' }}>
    <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
      <Star size={32} />
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>{title}</h3>
    <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '420px', margin: '0 auto 20px', lineHeight: '1.5' }}>{description}</p>
    {actionLabel && (
      <button onClick={onAction} style={{ padding: '10px 22px', backgroundColor: '#0b5738', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
        {actionLabel}
      </button>
    )}
  </div>
);

export const NoSearchResultsState: React.FC<{ query?: string; onReset?: () => void }> = ({
  query,
  onReset
}) => (
  <div style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '18px', border: '1px dashed #cbd5e1' }}>
    <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
      <Search size={32} />
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
      Aucun résultat pour {query ? `« ${query} »` : 'cette recherche'}
    </h3>
    <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '420px', margin: '0 auto 20px', lineHeight: '1.5' }}>
      Vérifiez l orthographe de vos mots-clés ou supprimez certains filtres pour élargir vos résultats.
    </p>
    {onReset && (
      <button onClick={onReset} style={{ padding: '10px 22px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
        Effacer les filtres
      </button>
    )}
  </div>
);

// ============================================================================
// 3. ERROR STATES
//    - Payment error
//    - Network error
//    - Product unavailable
//    - Order submission error
// ============================================================================

export const PaymentErrorState: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <div style={{ padding: '36px 24px', textAlign: 'center', backgroundColor: '#fef2f2', borderRadius: '18px', border: '1.5px solid #fecaca' }}>
    <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
      <CreditCard size={28} />
    </div>
    <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#991b1b', margin: '0 0 8px' }}>Échec de la transaction Mobile Money</h3>
    <p style={{ fontSize: '0.875rem', color: '#7f1d1d', maxWidth: '400px', margin: '0 auto 18px', lineHeight: '1.5' }}>
      Le paiement n a pas pu être validé sur votre compte Orange Money ou MTN MoMo. Veuillez vérifier votre solde ou choisir le paiement en espèces à la livraison.
    </p>
    {onRetry && (
      <button onClick={onRetry} style={{ padding: '9px 20px', backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}>
        Réessayer le paiement
      </button>
    )}
  </div>
);

export const NetworkErrorState: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <div style={{ padding: '36px 24px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
    <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
      <WifiOff size={28} />
    </div>
    <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>Connexion réseau interrompue</h3>
    <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '400px', margin: '0 auto 18px', lineHeight: '1.5' }}>
      Impossible de synchroniser les données avec le serveur IFPTIE Market. Vérifiez votre connexion Internet.
    </p>
    {onRetry && (
      <button onClick={onRetry} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', backgroundColor: '#0b5738', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}>
        <RefreshCw size={14} />
        <span>Réessayer</span>
      </button>
    )}
  </div>
);

export const ProductUnavailableState: React.FC<{ productName?: string }> = ({ productName = 'Cet article' }) => (
  <div style={{ padding: '32px 20px', textAlign: 'center', backgroundColor: '#fffbeb', borderRadius: '16px', border: '1px solid #fde68a' }}>
    <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
      <AlertTriangle size={24} />
    </div>
    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#92400e', margin: '0 0 6px' }}>Produit temporairement indisponible</h4>
    <p style={{ fontSize: '0.8125rem', color: '#b45309', margin: 0 }}>
      {productName} est actuellement en rupture dans nos dépôts de Douala et Yaoundé. Un réapprovisionnement est en cours.
    </p>
  </div>
);

export const OrderSubmissionErrorState: React.FC<{ message?: string; onRetry?: () => void }> = ({
  message = 'Une erreur est survenue lors de la transmission de votre commande.',
  onRetry
}) => (
  <div style={{ padding: '36px 24px', textAlign: 'center', backgroundColor: '#fef2f2', borderRadius: '18px', border: '1px solid #fecaca' }}>
    <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
      <XCircle size={28} />
    </div>
    <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#991b1b', margin: '0 0 8px' }}>Erreur d enregistrement</h3>
    <p style={{ fontSize: '0.875rem', color: '#7f1d1d', maxWidth: '400px', margin: '0 auto 18px' }}>{message}</p>
    {onRetry && (
      <button onClick={onRetry} style={{ padding: '9px 20px', backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}>
        Soumettre à nouveau
      </button>
    )}
  </div>
);

// ============================================================================
// 4. SUCCESS STATES
//    - Order confirmed
//    - Product created
//    - Product imported
//    - Courier assigned
//    - Delivery completed
// ============================================================================

export const OrderConfirmedState: React.FC<{ orderNumber: string; amount: number; onTrack?: () => void }> = ({
  orderNumber,
  amount,
  onTrack
}) => (
  <div style={{ padding: '40px 24px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '20px', border: '1.5px solid #a7f3d0', boxShadow: '0 4px 12px rgba(11,87,56,0.06)' }}>
    <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: '#ecfdf5', color: '#0b5738', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
      <CheckCircle2 size={36} />
    </div>
    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Commande Validée</span>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 10px' }}>{orderNumber}</h2>
    <p style={{ fontSize: '0.875rem', color: '#475569', maxWidth: '420px', margin: '0 auto 16px', lineHeight: '1.5' }}>
      Votre commande de <strong>{formatFCFA(amount)}</strong> a été enregistrée. Notre coursier prendra contact avec vous par WhatsApp/appel avant la livraison.
    </p>
    {onTrack && (
      <button onClick={onTrack} style={{ padding: '10px 24px', backgroundColor: '#0b5738', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
        Suivre mon colis en direct
      </button>
    )}
  </div>
);

export const ProductCreatedSuccessState: React.FC<{ productName: string; sku: string }> = ({ productName, sku }) => (
  <div style={{ padding: '24px', backgroundColor: '#ecfdf5', borderRadius: '16px', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: '14px' }}>
    <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#ffffff', color: '#0b5738', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Package size={22} />
    </div>
    <div>
      <h4 style={{ margin: '0 0 2px', fontSize: '0.9375rem', fontWeight: 800, color: '#065f46' }}>Produit publié avec succès !</h4>
      <p style={{ margin: 0, fontSize: '0.8125rem', color: '#047857' }}>
        <strong>{productName}</strong> (SKU: {sku}) est désormais en ligne dans le catalogue.
      </p>
    </div>
  </div>
);

export const ProductImportedSuccessState: React.FC<{ count: number }> = ({ count }) => (
  <div style={{ padding: '20px', backgroundColor: '#ecfdf5', borderRadius: '14px', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: '12px' }}>
    <CheckCircle2 size={24} color="#059669" />
    <div>
      <h4 style={{ margin: '0 0 2px', fontSize: '0.875rem', fontWeight: 800, color: '#065f46' }}>Importation CSV terminée</h4>
      <p style={{ margin: 0, fontSize: '0.8125rem', color: '#047857' }}>{count} articles ont été mis à jour et créés avec succès.</p>
    </div>
  </div>
);

export const CourierAssignedSuccessState: React.FC<{ courierName: string; orderId: string }> = ({ courierName, orderId }) => (
  <div style={{ padding: '16px 20px', backgroundColor: '#e0f2fe', borderRadius: '12px', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', gap: '12px' }}>
    <Bike size={20} color="#0284c7" />
    <div style={{ fontSize: '0.8125rem', color: '#0369a1' }}>
      La commande <strong>{orderId}</strong> a été assignée au coursier <strong>{courierName}</strong>.
    </div>
  </div>
);

export const DeliveryCompletedSuccessState: React.FC<{ orderId: string; amountCollected: number }> = ({ orderId, amountCollected }) => (
  <div style={{ padding: '18px 20px', backgroundColor: '#ecfdf5', borderRadius: '14px', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: '12px' }}>
    <CheckCircle2 size={22} color="#0b5738" />
    <div style={{ fontSize: '0.8125rem', color: '#065f46' }}>
      Livraison terminée pour <strong>{orderId}</strong>. Montant collecté : <strong>{formatFCFA(amountCollected)}</strong> en espèces.
    </div>
  </div>
);

// ============================================================================
// 5. CONFIRMATION MODALS
//    - Delete product
//    - Cancel order
//    - Cancel delivery
//    - Mark order as delivered
//    - Assign courier
// ============================================================================

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteProductModal: React.FC<BaseModalProps & { productName: string }> = ({
  isOpen,
  onClose,
  onConfirm,
  productName
}) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', maxWidth: '460px', width: '100%', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
          <Trash2 size={24} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>Supprimer le produit ?</h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 20px', lineHeight: '1.5' }}>
          Êtes-vous sûr de vouloir supprimer définitivement <strong>{productName}</strong> ? Cette action est irréversible et retirera le produit de la boutique.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '9px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}>Annuler</button>
          <button onClick={onConfirm} style={{ padding: '9px 18px', borderRadius: '10px', border: 'none', backgroundColor: '#dc2626', color: '#ffffff', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}>Supprimer définitivement</button>
        </div>
      </div>
    </div>
  );
};

export const CancelOrderModal: React.FC<BaseModalProps & { orderNumber: string }> = ({
  isOpen,
  onClose,
  onConfirm,
  orderNumber
}) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', maxWidth: '460px', width: '100%', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
          <AlertTriangle size={24} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>Annuler la commande {orderNumber} ?</h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 20px', lineHeight: '1.5' }}>
          Le statut de la commande passera à « Annulée » et les articles seront réintégrés automatiquement à l inventaire.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '9px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}>Fermer</button>
          <button onClick={onConfirm} style={{ padding: '9px 18px', borderRadius: '10px', border: 'none', backgroundColor: '#dc2626', color: '#ffffff', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}>Confirmer l annulation</button>
        </div>
      </div>
    </div>
  );
};

export const CancelDeliveryModal: React.FC<BaseModalProps & { deliveryId: string }> = ({
  isOpen,
  onClose,
  onConfirm,
  deliveryId
}) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', maxWidth: '460px', width: '100%', padding: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>Interrompre la livraison {deliveryId} ?</h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 20px' }}>
          Le coursier sera notifié et le colis sera retourné au centre logistique de distribution.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '9px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', cursor: 'pointer' }}>Retour</button>
          <button onClick={onConfirm} style={{ padding: '9px 18px', borderRadius: '10px', border: 'none', backgroundColor: '#dc2626', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>Interrompre</button>
        </div>
      </div>
    </div>
  );
};

export const MarkOrderDeliveredModal: React.FC<BaseModalProps & { orderNumber: string; amount: number }> = ({
  isOpen,
  onClose,
  onConfirm,
  orderNumber,
  amount
}) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', maxWidth: '460px', width: '100%', padding: '24px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#ecfdf5', color: '#0b5738', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
          <CheckCircle2 size={24} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>Valider la remise du colis {orderNumber} ?</h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 20px', lineHeight: '1.5' }}>
          Confirmez-vous que le client a bien reçu sa marchandise et que le montant de <strong>{formatFCFA(amount)}</strong> a été encaissé en espèces ou Mobile Money ?
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '9px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', cursor: 'pointer' }}>Annuler</button>
          <button onClick={onConfirm} style={{ padding: '9px 18px', borderRadius: '10px', border: 'none', backgroundColor: '#0b5738', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>Confirmer livraison</button>
        </div>
      </div>
    </div>
  );
};

export const AssignCourierModal: React.FC<BaseModalProps & {
  orderNumber: string;
  couriers: { id: string; name: string; zone: string }[];
  selectedCourierId: string;
  onSelectCourier: (id: string) => void;
}> = ({
  isOpen,
  onClose,
  onConfirm,
  orderNumber,
  couriers,
  selectedCourierId,
  onSelectCourier
}) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', maxWidth: '480px', width: '100%', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Bike size={20} color="#0b5738" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Affecter un livreur</h3>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 16px' }}>
          Choisissez le coursier en charge de la tournée pour la commande <strong>{orderNumber}</strong> :
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', maxHeight: '220px', overflowY: 'auto' }}>
          {couriers.map((c) => {
            const isSelected = selectedCourierId === c.id;
            return (
              <div
                key={c.id}
                onClick={() => onSelectCourier(c.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: isSelected ? '2px solid #0b5738' : '1px solid #e2e8f0',
                  backgroundColor: isSelected ? '#ecfdf5' : '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0f172a' }}>{c.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Zone : {c.zone}</div>
                </div>
                {isSelected && <Check size={18} color="#0b5738" />}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '9px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', cursor: 'pointer' }}>Annuler</button>
          <button onClick={onConfirm} style={{ padding: '9px 18px', borderRadius: '10px', border: 'none', backgroundColor: '#0b5738', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>Valider l affectation</button>
        </div>
      </div>
    </div>
  );
};
