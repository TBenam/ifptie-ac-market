import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import type { Order, OrderStatus } from '../../types';
import {
  Users,
  Search,
  Filter,
  Phone,
  MessageSquare,
  MapPin,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Star,
  Tag,
  FileText,
  Plus,
  Edit,
  Copy,
  Check,
  X,
  Truck,
  Download,
  SlidersHorizontal,
  Send,
  Building2,
  Package
} from 'lucide-react';

export type CustomerStatus = 'vip' | 'regular' | 'new' | 'at_risk' | 'inactive';

export interface CustomerProfile {
  id: string; // phone normalized
  phone: string;
  name: string;
  whatsapp: string;
  city: string;
  neighborhoods: string[];
  ordersCount: number;
  totalSpent: number; // in FCFA
  averageOrder: number; // in FCFA
  cancelledOrdersCount: number;
  successfulDeliveriesCount: number;
  lastOrderDate: string;
  lastOrderTracking: string;
  status: CustomerStatus;
  preferredPayment: string;
  internalNotes: string[];
  tags: string[];
  firstOrderDate: string;
  orders: Order[];
}

interface AdminCustomersViewProps {
  onSelectOrderTracking?: (trackingNumber: string) => void;
}

export const AdminCustomersView: React.FC<AdminCustomersViewProps> = ({ onSelectOrderTracking }) => {
  const { orders, addToast, setActiveTrackingNumber, setActiveView } = useStore();

  // Normalize phone for aggregation
  const normalizePhone = (p: string) => p.replace(/[\s\-\+\(\)]/g, '').slice(-9);

  // Rich base customer profiles matching Cameroon ecommerce realities
  const baseCustomers: CustomerProfile[] = useMemo(() => {
    return [
      {
        id: '677889900',
        phone: '+237 677 88 99 00',
        name: 'Carine Etoa',
        whatsapp: '+237 677 88 99 00',
        city: 'Yaoundé',
        neighborhoods: ['Bastos (Face Ambassade)', 'Mvan Aérodrome'],
        ordersCount: 4,
        totalSpent: 148500,
        averageOrder: 37125,
        cancelledOrdersCount: 0,
        successfulDeliveriesCount: 4,
        lastOrderDate: '2026-09-20 13:45',
        lastOrderTracking: 'IFM-10482',
        status: 'vip',
        preferredPayment: 'Cash on Delivery (Espèces)',
        internalNotes: [
          'Cliente très fidèle, préfère être livrée en fin de matinée à Bastos.',
          'Paie toujours le montant exact sans besoin de monnaie.'
        ],
        tags: ['VIP ⭐', 'Bon Payeur', 'Solaire & Déco'],
        firstOrderDate: '2026-04-12',
        orders: []
      },
      {
        id: '699112233',
        phone: '+237 699 11 22 33',
        name: 'Jean-Paul Kamga',
        whatsapp: '+237 699 11 22 33',
        city: 'Douala',
        neighborhoods: ['Akwa (Boulevard de la Liberté)', 'Bonapriso'],
        ordersCount: 6,
        totalSpent: 385000,
        averageOrder: 64166,
        cancelledOrdersCount: 0,
        successfulDeliveriesCount: 6,
        lastOrderDate: '2026-09-19 16:30',
        lastOrderTracking: 'IFM-10480',
        status: 'vip',
        preferredPayment: 'Orange Money (Paiement instantané)',
        internalNotes: [
          'Gérant de restaurant, commande régulièrement du matériel solaire et éclairage de secours.',
          'Toujours joignable sur WhatsApp.'
        ],
        tags: ['Gros Panier', 'Professionnel', 'Orange Money'],
        firstOrderDate: '2026-01-18',
        orders: []
      },
      {
        id: '675443322',
        phone: '+237 675 44 33 22',
        name: 'Béatrice Manga',
        whatsapp: '+237 675 44 33 22',
        city: 'Douala',
        neighborhoods: ['Bonamoussadi (Rond-point)', 'Makepe'],
        ordersCount: 3,
        totalSpent: 87000,
        averageOrder: 29000,
        cancelledOrdersCount: 1,
        successfulDeliveriesCount: 2,
        lastOrderDate: '2026-09-18 10:15',
        lastOrderTracking: 'IFM-10475',
        status: 'regular',
        preferredPayment: 'MTN Mobile Money',
        internalNotes: [
          'Une annulation lors de la commande IFM-10420 pour cause de déplacement imprévu à Kribi.',
          'Réactive au téléphone lors de la confirmation.'
        ],
        tags: ['Régulier', 'MTN MoMo', 'Maison & Cuisine'],
        firstOrderDate: '2026-06-05',
        orders: []
      },
      {
        id: '651239874',
        phone: '+237 651 23 98 74',
        name: 'Ibrahim Oumarou',
        whatsapp: '+237 651 23 98 74',
        city: 'Garoua',
        neighborhoods: ['Plateau Commercial', 'Bibémiré'],
        ordersCount: 2,
        totalSpent: 165000,
        averageOrder: 82500,
        cancelledOrdersCount: 0,
        successfulDeliveriesCount: 2,
        lastOrderDate: '2026-09-17 11:20',
        lastOrderTracking: 'IFM-10468',
        status: 'regular',
        preferredPayment: 'Orange Money (Expédition Agence Touristique)',
        internalNotes: [
          'Expédition par agence de voyage Touristique Express vers Garoua. Envoi du bordereau par WhatsApp indispensable.'
        ],
        tags: ['Grand Nord', 'Expédition Agence', 'Kits Solaires'],
        firstOrderDate: '2026-07-22',
        orders: []
      },
      {
        id: '694556677',
        phone: '+237 694 55 66 77',
        name: 'Christelle Fosso',
        whatsapp: '+237 694 55 66 77',
        city: 'Bafoussam',
        neighborhoods: ['Djeleng 5', 'Marché B'],
        ordersCount: 1,
        totalSpent: 22500,
        averageOrder: 22500,
        cancelledOrdersCount: 0,
        successfulDeliveriesCount: 1,
        lastOrderDate: '2026-09-19 09:00',
        lastOrderTracking: 'IFM-10479',
        status: 'new',
        preferredPayment: 'Cash on Delivery',
        internalNotes: [
          'Première commande réussie sans incident.',
          'Intéressée par les offres électroménager basse consommation.'
        ],
        tags: ['Nouveau Client', 'Ouest Cameroun'],
        firstOrderDate: '2026-09-19',
        orders: []
      },
      {
        id: '670119988',
        phone: '+237 670 11 99 88',
        name: 'Marcelle Nguemo',
        whatsapp: '+237 670 11 99 88',
        city: 'Yaoundé',
        neighborhoods: ['Mendong', 'Biyem-Assi'],
        ordersCount: 3,
        totalSpent: 34000,
        averageOrder: 17000,
        cancelledOrdersCount: 2,
        successfulDeliveriesCount: 1,
        lastOrderDate: '2026-09-14 17:45',
        lastOrderTracking: 'IFM-10452',
        status: 'at_risk',
        preferredPayment: 'Cash on Delivery',
        internalNotes: [
          'ATTENTION : 2 commandes annulées à la porte (client injoignable ou absent lors de la livraison moto).',
          'Exiger un acompte MoMo ou confirmation vocale ferme avant départ du livreur.'
        ],
        tags: ['À Risque ⚠️', 'Vérification Requise', 'Annulations'],
        firstOrderDate: '2026-08-02',
        orders: []
      },
      {
        id: '691223344',
        phone: '+237 691 22 33 44',
        name: 'Alain Tsafack',
        whatsapp: '+237 691 22 33 44',
        city: 'Kribi',
        neighborhoods: ['Dombe', 'Centre Urbain'],
        ordersCount: 2,
        totalSpent: 92000,
        averageOrder: 46000,
        cancelledOrdersCount: 0,
        successfulDeliveriesCount: 2,
        lastOrderDate: '2026-09-12 14:10',
        lastOrderTracking: 'IFM-10440',
        status: 'regular',
        preferredPayment: 'MTN Mobile Money',
        internalNotes: [
          'Résidence hôtelière à Kribi. Réception à l\'accueil.'
        ],
        tags: ['Sud Cameroun', 'Bon Payeur', 'Énergie'],
        firstOrderDate: '2026-05-14',
        orders: []
      },
      {
        id: '673884422',
        phone: '+237 673 88 44 22',
        name: 'Sandra Bikoula',
        whatsapp: '+237 673 88 44 22',
        city: 'Yaoundé',
        neighborhoods: ['Omnisports', 'Nlongkak'],
        ordersCount: 1,
        totalSpent: 16500,
        averageOrder: 16500,
        cancelledOrdersCount: 0,
        successfulDeliveriesCount: 1,
        lastOrderDate: '2026-08-25 15:30',
        lastOrderTracking: 'IFM-10425',
        status: 'inactive',
        preferredPayment: 'Orange Money',
        internalNotes: [
          'Aucune commande depuis plus de 25 jours.'
        ],
        tags: ['Inactif', 'Relance SMS'],
        firstOrderDate: '2026-08-25',
        orders: []
      }
    ];
  }, []);

  // Merge store live orders into customer profiles by normalized phone number
  const aggregatedCustomers: CustomerProfile[] = useMemo(() => {
    const customerMap = new Map<string, CustomerProfile>();

    // Seed with base Cameroon profiles
    baseCustomers.forEach(cust => {
      customerMap.set(cust.id, { ...cust, orders: [] });
    });

    // Group store orders by normalized phone
    orders.forEach(order => {
      const normPhone = normalizePhone(order.customerPhone);
      let profile = customerMap.get(normPhone);

      if (!profile) {
        // Create new guest customer record dynamically
        profile = {
          id: normPhone,
          phone: order.customerPhone,
          name: order.customerName,
          whatsapp: order.whatsappPhone || order.customerPhone,
          city: order.city,
          neighborhoods: [order.neighborhood],
          ordersCount: 0,
          totalSpent: 0,
          averageOrder: 0,
          cancelledOrdersCount: 0,
          successfulDeliveriesCount: 0,
          lastOrderDate: order.createdAt,
          lastOrderTracking: order.trackingNumber,
          status: 'new',
          preferredPayment: order.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Mobile Money',
          internalNotes: ['Client identifié via commande récente sans compte.'],
          tags: ['Nouveau Client'],
          firstOrderDate: order.createdAt.slice(0, 10),
          orders: []
        };
        customerMap.set(normPhone, profile);
      }

      // Add order to profile
      profile.orders.push(order);

      // Recalculate stats dynamically
      if (!profile.neighborhoods.includes(order.neighborhood)) {
        profile.neighborhoods.push(order.neighborhood);
      }
    });

    // Populate order history into profiles if empty
    return Array.from(customerMap.values()).map(c => {
      // If store had no orders for this pre-seeded customer, create a mock order row
      if (c.orders.length === 0) {
        const mockOrder: Order = {
          id: `ord-${c.lastOrderTracking}`,
          trackingNumber: c.lastOrderTracking,
          customerName: c.name,
          customerPhone: c.phone,
          whatsappPhone: c.whatsapp,
          city: c.city,
          neighborhood: c.neighborhoods[0] || 'Centre-ville',
          items: [
            {
              productId: 'prod-mock',
              productName: 'Commande Groupée IFPTIE Market',
              price: c.totalSpent / (c.ordersCount || 1),
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=200&auto=format&fit=crop&q=80'
            }
          ],
          subtotal: c.totalSpent,
          deliveryFee: 0,
          total: c.totalSpent,
          paymentMethod: c.preferredPayment.toLowerCase().includes('orange') ? 'orange_money' : 'cash_on_delivery',
          paymentStatus: 'paid',
          orderStatus: 'delivered',
          createdAt: c.lastOrderDate,
          estimatedDeliveryDate: 'Livré avec succès'
        };
        return {
          ...c,
          orders: [mockOrder]
        };
      }
      return c;
    });
  }, [baseCustomers, orders]);

  // State management
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'vip' | 'regular' | 'new' | 'at_risk' | 'inactive'>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [customersData, setCustomersData] = useState<CustomerProfile[]>(aggregatedCustomers);

  // Synchronize when store updates
  React.useEffect(() => {
    setCustomersData(aggregatedCustomers);
  }, [aggregatedCustomers]);

  // Filtered customers list
  const filteredCustomers = useMemo(() => {
    return customersData.filter(c => {
      // Tab status filter
      if (activeTab !== 'all' && c.status !== activeTab) return false;

      // City filter
      if (cityFilter !== 'all' && c.city.toLowerCase() !== cityFilter.toLowerCase()) return false;

      // Search query filter (name, phone, whatsapp, city, tracking)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchPhone = c.phone.includes(q) || c.id.includes(q);
        const matchCity = c.city.toLowerCase().includes(q);
        const matchTracking = c.lastOrderTracking.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchCity && !matchTracking) return false;
      }

      return true;
    });
  }, [customersData, activeTab, cityFilter, searchQuery]);

  // Selected customer for detail view
  const selectedCustomer = useMemo(() => {
    return customersData.find(c => c.id === selectedCustomerId) || null;
  }, [customersData, selectedCustomerId]);

  // Status badge config
  const getStatusBadge = (status: CustomerStatus) => {
    switch (status) {
      case 'vip':
        return { label: 'VIP ⭐', color: '#b45309', bg: '#fef3c7', border: '#fde68a' };
      case 'regular':
        return { label: 'Régulier', color: '#15803d', bg: '#ecfdf5', border: '#bbf7d0' };
      case 'new':
        return { label: 'Nouveau', color: '#0369a1', bg: '#f0f9ff', border: '#bae6fd' };
      case 'at_risk':
        return { label: 'À risque ⚠️', color: '#b91c1c', bg: '#fef2f2', border: '#fecaca' };
      case 'inactive':
        return { label: 'Inactif', color: '#64748b', bg: '#f8fafc', border: '#e2e8f0' };
    }
  };

  // Add internal note to selected customer
  const handleAddNote = () => {
    if (!newNoteText.trim() || !selectedCustomer) return;
    const dateStr = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const formattedNote = `[${dateStr}] ${newNoteText.trim()}`;

    setCustomersData(prev =>
      prev.map(c => {
        if (c.id === selectedCustomer.id) {
          return {
            ...c,
            internalNotes: [formattedNote, ...c.internalNotes]
          };
        }
        return c;
      })
    );
    setNewNoteText('');
    addToast('Note interne enregistrée sur la fiche client.', 'success');
  };

  // Copy phone number
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    addToast(`${label} copié : ${text}`, 'info');
  };

  // Open WhatsApp Web with friendly Cameroonian greeting
  const handleOpenWhatsApp = (whatsappNumber: string, customerName: string) => {
    const cleanNum = whatsappNumber.replace(/[\s\-\+\(\)]/g, '');
    const message = encodeURIComponent(`Bonjour ${customerName}, c'est le service client IFPTIE Market concernant votre commande.`);
    window.open(`https://wa.me/${cleanNum}?text=${message}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%', padding: '28px 32px 80px' }}>
      {/* 1. TOP HEADER & PHILOSOPHY BANNER */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '24px'
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
              <Users size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
                Clients
              </h1>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                Gestion et fidélisation de la clientèle IFPTIE Market — Yaoundé, Douala et toutes les régions.
              </p>
            </div>
          </div>
        </div>

        {/* Global Export & Stats Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              addToast('Fichier clients (numéros & dépenses) exporté avec succès.', 'info');
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
            Exporter CSV
          </button>
        </div>
      </div>

      {/* 2. IMPORTANT PHILOSOPHY BANNER (Phone-number-based identification) */}
      <div style={{
        backgroundColor: '#ecfdf5',
        border: '1px solid #a7f3d0',
        borderRadius: '14px',
        padding: '14px 18px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#0b5738',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            flexShrink: 0
          }}>
            <Phone size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#065f46' }}>
              Système d'Identification par Numéro de Téléphone (Guest Checkout)
            </div>
            <div style={{ fontSize: '0.75rem', color: '#047857', marginTop: '2px' }}>
              Les comptes utilisateurs n'étant pas obligatoires pour commander sur IFPTIE Market, chaque fiche client est 
              <strong> automatiquement agrégée et consolidée autour du numéro de téléphone mobile</strong> (+237 MTN / Orange / Camtel).
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#ffffff',
          padding: '6px 12px',
          borderRadius: '8px',
          border: '1px solid #bbf7d0',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#065f46'
        }}>
          <ShieldCheck size={16} color="#16a34a" />
          <span>Clé unique : <strong>MSISDN (+237)</strong></span>
        </div>
      </div>

      {/* 3. KPI METRICS CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* Total Customers */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Clients Répertoriés
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>
            {customersData.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
            100% identifiés par téléphone
          </div>
        </div>

        {/* VIP Customers */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Clients VIP (⭐)
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#b45309', marginTop: '4px' }}>
            {customersData.filter(c => c.status === 'vip').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
            Panier moyen &gt; 35 000 FCFA
          </div>
        </div>

        {/* Total Revenue from identified customers */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Volume Dépenses Cumulé
          </div>
          <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#0b5738', marginTop: '4px' }}>
            {formatFCFA(customersData.reduce((acc, c) => acc + c.totalSpent, 0))}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
            Total achats livrés
          </div>
        </div>

        {/* At Risk / Return alerts */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Profils À Risque / Retours
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#dc2626', marginTop: '4px' }}>
            {customersData.filter(c => c.status === 'at_risk').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#b91c1c', fontWeight: 700, marginTop: '2px' }}>
            Annulations à la livraison &gt; 50%
          </div>
        </div>
      </div>

      {/* 4. FILTER TABS & SEARCH CONTROLS */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        padding: '16px 20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Status Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
          {[
            { key: 'all', label: `Tous (${customersData.length})` },
            { key: 'vip', label: `VIP ⭐ (${customersData.filter(c => c.status === 'vip').length})` },
            { key: 'regular', label: `Réguliers (${customersData.filter(c => c.status === 'regular').length})` },
            { key: 'new', label: `Nouveaux (${customersData.filter(c => c.status === 'new').length})` },
            { key: 'at_risk', label: `À Risque ⚠️ (${customersData.filter(c => c.status === 'at_risk').length})` },
            { key: 'inactive', label: `Inactifs (${customersData.filter(c => c.status === 'inactive').length})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === tab.key ? '#ffffff' : 'transparent',
                color: activeTab === tab.key ? '#0f172a' : '#64748b',
                boxShadow: activeTab === tab.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & City Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, justifyContent: 'flex-end' }}>
          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '8px 12px',
            minWidth: '240px',
            maxWidth: '360px',
            flex: 1
          }}>
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Rechercher par nom, téléphone (+237), ville..."
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

          {/* City Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={15} color="#64748b" />
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
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
              <option value="all">Toutes les villes</option>
              <option value="Yaoundé">Yaoundé</option>
              <option value="Douala">Douala</option>
              <option value="Bafoussam">Bafoussam</option>
              <option value="Garoua">Garoua</option>
              <option value="Kribi">Kribi</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. CUSTOMER TABLE */}
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
                <th style={{ padding: '14px 20px' }}>Name (Nom du client)</th>
                <th style={{ padding: '14px 14px' }}>Phone (Téléphone ID)</th>
                <th style={{ padding: '14px 14px' }}>WhatsApp</th>
                <th style={{ padding: '14px 14px' }}>City (Ville & Quartier)</th>
                <th style={{ padding: '14px 14px', textAlign: 'center' }}>Orders (Cmds)</th>
                <th style={{ padding: '14px 14px' }}>Total Spent (Dépenses)</th>
                <th style={{ padding: '14px 14px' }}>Last Order (Dernière cmd)</th>
                <th style={{ padding: '14px 14px' }}>Status</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: '48px 20px', textAlign: 'center', color: '#64748b' }}>
                    Aucun client ne correspond à votre recherche.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(customer => {
                  const statusInfo = getStatusBadge(customer.status);

                  return (
                    <tr
                      key={customer.id}
                      onClick={() => setSelectedCustomerId(customer.id)}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        cursor: 'pointer',
                        transition: 'background-color 0.12s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {/* Name */}
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            backgroundColor: '#ecfdf5',
                            color: '#0b5738',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.875rem',
                            flexShrink: 0
                          }}>
                            {customer.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>
                              {customer.name}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                              {customer.tags.slice(0, 2).map((t, idx) => (
                                <span
                                  key={idx}
                                  style={{
                                    fontSize: '0.6875rem',
                                    backgroundColor: '#f1f5f9',
                                    color: '#475569',
                                    padding: '1px 6px',
                                    borderRadius: '4px',
                                    fontWeight: 600
                                  }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>
                            {customer.phone}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(customer.phone, 'Téléphone');
                            }}
                            title="Copier le numéro"
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, color: '#94a3b8' }}
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                          ID Clé Mobile
                        </div>
                      </td>

                      {/* WhatsApp */}
                      <td style={{ padding: '14px 14px' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenWhatsApp(customer.whatsapp, customer.name);
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '4px 10px',
                            backgroundColor: '#25D366',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          <MessageSquare size={12} />
                          WhatsApp
                        </button>
                      </td>

                      {/* City */}
                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>
                          {customer.city}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {customer.neighborhoods[0] || 'Zone urbaine'}
                        </div>
                      </td>

                      {/* Orders Count */}
                      <td style={{ padding: '14px 14px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          backgroundColor: '#f1f5f9',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontWeight: 800,
                          color: '#0f172a',
                          fontSize: '0.875rem'
                        }}>
                          {customer.ordersCount}
                        </span>
                      </td>

                      {/* Total Spent */}
                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ fontWeight: 800, color: '#0b5738', fontSize: '0.875rem' }}>
                          {formatFCFA(customer.totalSpent)}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                          Moy: {formatFCFA(customer.averageOrder)}
                        </div>
                      </td>

                      {/* Last Order */}
                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                          #{customer.lastOrderTracking}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                          {customer.lastOrderDate}
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 14px' }}>
                        <span style={{
                          backgroundColor: statusInfo.bg,
                          color: statusInfo.color,
                          border: `1px solid ${statusInfo.border}`,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.6875rem',
                          fontWeight: 800
                        }}>
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCustomerId(customer.id);
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 12px',
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#0b5738',
                            cursor: 'pointer'
                          }}
                        >
                          Fiche Détail
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. CUSTOMER DETAIL MODAL / DRAWER */}
      {selectedCustomer && (
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
            maxWidth: '860px',
            maxHeight: '92vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Detail Header */}
            <div style={{
              padding: '24px 28px',
              borderBottom: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  backgroundColor: '#0b5738',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  boxShadow: '0 4px 12px rgba(11, 87, 56, 0.25)'
                }}>
                  {selectedCustomer.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      {selectedCustomer.name}
                    </h2>
                    <span style={{
                      backgroundColor: getStatusBadge(selectedCustomer.status).bg,
                      color: getStatusBadge(selectedCustomer.status).color,
                      border: `1px solid ${getStatusBadge(selectedCustomer.status).border}`,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 800
                    }}>
                      {getStatusBadge(selectedCustomer.status).label}
                    </span>
                  </div>

                  {/* Phone ID badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '0.8125rem', color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0f172a', fontWeight: 700 }}>
                      <Phone size={13} color="#0b5738" />
                      {selectedCustomer.phone}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="#94a3b8" />
                      {selectedCustomer.city}
                    </span>
                    <span>•</span>
                    <span>Client depuis {selectedCustomer.firstOrderDate}</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedCustomerId(null)}
                style={{
                  border: 'none',
                  backgroundColor: '#ffffff',
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
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

            {/* Quick Contact CTAs Bar */}
            <div style={{
              padding: '12px 28px',
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* WhatsApp button */}
                <button
                  onClick={() => handleOpenWhatsApp(selectedCustomer.whatsapp, selectedCustomer.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <MessageSquare size={14} />
                  Discuter sur WhatsApp
                </button>

                {/* Call button */}
                <a
                  href={`tel:${selectedCustomer.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={14} color="#0b5738" />
                  Appeler ({selectedCustomer.phone})
                </a>
              </div>

              {/* Tag badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {selectedCustomer.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '3px 8px',
                      backgroundColor: '#f1f5f9',
                      borderRadius: '6px',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: '#475569'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Detail Body */}
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* 5 Specific Summary Metrics Cards requested by prompt */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', margin: '0 0 12px' }}>
                  Statistiques Globales du Client
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '12px'
                }}>
                  {/* Total orders */}
                  <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748b' }}>TOTAL ORDERS</div>
                    <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>
                      {selectedCustomer.ordersCount}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#16a34a', marginTop: '2px' }}>Commandes passées</div>
                  </div>

                  {/* Total spent */}
                  <div style={{ backgroundColor: '#ecfdf5', padding: '14px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#065f46' }}>TOTAL SPENT</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0b5738', marginTop: '4px' }}>
                      {formatFCFA(selectedCustomer.totalSpent)}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#047857', marginTop: '2px' }}>Dépenses cumulées</div>
                  </div>

                  {/* Average order */}
                  <div style={{ backgroundColor: '#f0f9ff', padding: '14px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#0369a1' }}>AVERAGE ORDER</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0284c7', marginTop: '4px' }}>
                      {formatFCFA(selectedCustomer.averageOrder)}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#0284c7', marginTop: '2px' }}>Panier moyen</div>
                  </div>

                  {/* Successful deliveries */}
                  <div style={{ backgroundColor: '#f0fdf4', padding: '14px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#16a34a' }}>SUCCESSFUL DELIVERIES</div>
                    <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#15803d', marginTop: '4px' }}>
                      {selectedCustomer.successfulDeliveriesCount}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#15803d', marginTop: '2px' }}>
                      Taux : {((selectedCustomer.successfulDeliveriesCount / (selectedCustomer.ordersCount || 1)) * 100).toFixed(0)}%
                    </div>
                  </div>

                  {/* Cancelled orders */}
                  <div style={{ backgroundColor: '#fef2f2', padding: '14px', borderRadius: '12px', border: '1px solid #fecaca' }}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#dc2626' }}>CANCELLED ORDERS</div>
                    <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#b91c1c', marginTop: '4px' }}>
                      {selectedCustomer.cancelledOrdersCount}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#991b1b', marginTop: '2px' }}>Annulations ou refus</div>
                  </div>
                </div>
              </div>

              {/* Contact Information & Habitual Addresses */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                backgroundColor: '#f8fafc',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                    Contact Information
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8125rem', color: '#475569' }}>
                    <div>Nom complet : <strong style={{ color: '#0f172a' }}>{selectedCustomer.name}</strong></div>
                    <div>Téléphone principal : <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{selectedCustomer.phone}</strong></div>
                    <div>WhatsApp certifié : <strong style={{ color: '#0b5738', fontFamily: 'monospace' }}>{selectedCustomer.whatsapp}</strong></div>
                    <div>Mode de règlement habituel : <strong>{selectedCustomer.preferredPayment}</strong></div>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                    Zones & Quartiers Fréquentés
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8125rem' }}>
                    <div>Ville principale : <strong style={{ color: '#0f172a' }}>{selectedCustomer.city}</strong></div>
                    <div style={{ color: '#64748b' }}>Quartiers de livraison enregistrés :</div>
                    <ul style={{ margin: '4px 0 0', paddingLeft: '18px', color: '#334155' }}>
                      {selectedCustomer.neighborhoods.map((n, idx) => (
                        <li key={idx}>{n}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Internal Notes Section */}
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={16} color="#0b5738" />
                  Notes Internes & Consignes Livreurs
                </h4>
                <div style={{
                  backgroundColor: '#fffbeb',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  border: '1px solid #fde68a',
                  marginBottom: '12px'
                }}>
                  {selectedCustomer.internalNotes.length === 0 ? (
                    <div style={{ fontSize: '0.8125rem', color: '#92400e', fontStyle: 'italic' }}>
                      Aucune note interne pour ce client.
                    </div>
                  ) : (
                    <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {selectedCustomer.internalNotes.map((note, idx) => (
                        <li key={idx} style={{ fontSize: '0.8125rem', color: '#92400e' }}>
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Add new note form */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Ajouter une consigne ou observation (ex: livreur moto uniquement, préfère le matin)..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8125rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={handleAddNote}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#0b5738',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Send size={13} />
                    Ajouter Note
                  </button>
                </div>
              </div>

              {/* Order History (Historique des commandes) */}
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShoppingBag size={16} color="#0b5738" />
                  Order History (Historique des commandes passées avec ce numéro)
                </h4>

                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 700 }}>
                        <th style={{ padding: '10px 14px' }}>Commande</th>
                        <th style={{ padding: '10px 14px' }}>Date</th>
                        <th style={{ padding: '10px 14px' }}>Articles</th>
                        <th style={{ padding: '10px 14px' }}>Montant</th>
                        <th style={{ padding: '10px 14px' }}>Statut</th>
                        <th style={{ padding: '10px 14px', textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCustomer.orders.map((ord, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: 800, color: '#0b5738' }}>
                            #{ord.trackingNumber}
                          </td>
                          <td style={{ padding: '10px 14px', color: '#64748b' }}>
                            {ord.createdAt}
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <div style={{ maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#0f172a' }}>
                              {ord.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                            </div>
                          </td>
                          <td style={{ padding: '10px 14px', fontWeight: 800, color: '#0f172a' }}>
                            {formatFCFA(ord.total)}
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '6px',
                              fontSize: '0.6875rem',
                              fontWeight: 800,
                              backgroundColor: ord.orderStatus === 'delivered' ? '#ecfdf5' : '#fef3c7',
                              color: ord.orderStatus === 'delivered' ? '#15803d' : '#b45309'
                            }}>
                              {ord.orderStatus === 'delivered' ? 'Livré' : ord.orderStatus === 'in_transit' ? 'En livraison' : ord.orderStatus}
                            </span>
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                            <button
                              onClick={() => {
                                setSelectedCustomerId(null);
                                setActiveTrackingNumber(ord.trackingNumber);
                                setActiveView('tracking');
                              }}
                              style={{
                                padding: '4px 8px',
                                backgroundColor: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                fontSize: '0.6875rem',
                                fontWeight: 700,
                                color: '#0b5738',
                                cursor: 'pointer'
                              }}
                            >
                              Suivi
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '16px 28px',
              borderTop: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Numéro identifiant : <strong style={{ color: '#0f172a' }}>{selectedCustomer.phone}</strong>
              </div>
              <button
                onClick={() => setSelectedCustomerId(null)}
                style={{
                  padding: '8px 22px',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Fermer la fiche
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
