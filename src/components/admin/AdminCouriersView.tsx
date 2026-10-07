import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import type { CourierTask } from '../../types';
import {
  Bike,
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  TrendingUp,
  Award,
  Star,
  FileText,
  Truck,
  Download,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Edit,
  Trash2,
  Power,
  RotateCcw,
  Check,
  X,
  Package,
  Calendar,
  Send,
  Building2,
  Navigation
} from 'lucide-react';

export type CourierStatus = 'available' | 'delivering' | 'offline' | 'suspended';

export interface Courier {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  avatar: string;
  zone: string;
  city: string;
  vehicleType: 'moto' | 'van';
  vehiclePlate: string;
  vehicleModel: string;
  assignedCount: number;
  deliveredCount: number;
  failedCount: number;
  successRate: number; // percentage
  cashCollected: number; // total collected today in FCFA
  cashToRemit: number; // cash currently in pouch to remit to warehouse
  status: CourierStatus;
  rating: number; // e.g. 4.9
  totalDeliveriesLifetime: number;
  averageDeliveryTimeMin: number;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  hireDate: string;
  warehouseBase: string;
  assignedOrders: CourierTask[];
  deliveryHistory: {
    id: string;
    trackingNumber: string;
    customerName: string;
    neighborhood: string;
    date: string;
    itemsSummary: string;
    amount: number;
    paymentMethod: string;
    status: 'delivered' | 'failed';
    failReason?: string;
  }[];
  supervisorNotes: string[];
}

interface AdminCouriersViewProps {
  onSelectOrderTracking?: (trackingNumber: string) => void;
}

export const AdminCouriersView: React.FC<AdminCouriersViewProps> = ({ onSelectOrderTracking }) => {
  const { courierTasks, addToast, setActiveTrackingNumber, setActiveView } = useStore();

  // Initial couriers data representing Cameroon delivery hubs
  const initialCouriers: Courier[] = useMemo(() => [
    {
      id: 'cour-01',
      name: 'Arsène Mbida',
      phone: '+237 671 23 45 67',
      whatsapp: '+237 671 23 45 67',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      zone: 'Yaoundé - Bastos, Mvan & Centre',
      city: 'Yaoundé',
      vehicleType: 'moto',
      vehiclePlate: 'CE-842-LT',
      vehicleModel: 'Yamaha Crux 110cc',
      assignedCount: 6,
      deliveredCount: 5,
      failedCount: 0,
      successRate: 98.2,
      cashCollected: 78500,
      cashToRemit: 78500,
      status: 'delivering',
      rating: 4.9,
      totalDeliveriesLifetime: 842,
      averageDeliveryTimeMin: 24,
      emergencyContact: {
        name: 'Madeleine Mbida',
        relation: 'Épouse',
        phone: '+237 677 11 22 33'
      },
      hireDate: '2025-08-15',
      warehouseBase: 'Entrepôt Mvan Aérodrome',
      assignedOrders: courierTasks.filter(t => t.status === 'in_route' || t.status === 'assigned'),
      deliveryHistory: [
        {
          id: 'hist-01',
          trackingNumber: 'IFM-10480',
          customerName: 'Sophie Meka',
          neighborhood: 'Mvan Descente',
          date: 'Aujourd\'hui 11:30',
          itemsSummary: 'Kit Énergie Solaire 500W',
          amount: 32000,
          paymentMethod: 'cash_on_delivery',
          status: 'delivered'
        },
        {
          id: 'hist-02',
          trackingNumber: 'IFM-10476',
          customerName: 'Patrice Noah',
          neighborhood: 'Nlongkak',
          date: 'Aujourd\'hui 10:15',
          itemsSummary: 'Projecteur Solaire LED 100W',
          amount: 22000,
          paymentMethod: 'cash_on_delivery',
          status: 'delivered'
        },
        {
          id: 'hist-03',
          trackingNumber: 'IFM-10471',
          customerName: 'Gisèle Owona',
          neighborhood: 'Biyem-Assi',
          date: 'Hier 16:40',
          itemsSummary: 'Marmite Électrique Multifonction',
          amount: 24500,
          paymentMethod: 'cash_on_delivery',
          status: 'delivered'
        }
      ],
      supervisorNotes: [
        '[15 Sept 2026] Excellent livreur, ponctuel et maîtrise parfaitement les raccourcis de Yaoundé.',
        '[02 Août 2026] Révision périodique de la moto effectuée au garage partenaire de Mvan.'
      ]
    },
    {
      id: 'cour-02',
      name: 'Boris Ekani',
      phone: '+237 699 45 67 89',
      whatsapp: '+237 699 45 67 89',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      zone: 'Douala - Akwa, Bonanjo & Bali',
      city: 'Douala',
      vehicleType: 'moto',
      vehiclePlate: 'LT-519-AB',
      vehicleModel: 'TVS Neo 125cc',
      assignedCount: 8,
      deliveredCount: 7,
      failedCount: 1,
      successRate: 95.4,
      cashCollected: 125000,
      cashToRemit: 95000,
      status: 'delivering',
      rating: 4.8,
      totalDeliveriesLifetime: 1240,
      averageDeliveryTimeMin: 28,
      emergencyContact: {
        name: 'Samuel Ekani',
        relation: 'Frère',
        phone: '+237 699 88 77 66'
      },
      hireDate: '2025-03-10',
      warehouseBase: 'Entrepôt Akwa Douala',
      assignedOrders: [],
      deliveryHistory: [
        {
          id: 'hist-04',
          trackingNumber: 'IFM-10475',
          customerName: 'Béatrice Manga',
          neighborhood: 'Akwa Nord',
          date: 'Aujourd\'hui 14:10',
          itemsSummary: 'AirFryer 6L Multifonction',
          amount: 45000,
          paymentMethod: 'orange_money',
          status: 'delivered'
        },
        {
          id: 'hist-05',
          trackingNumber: 'IFM-10469',
          customerName: 'David Kotto',
          neighborhood: 'Bonanjo Port',
          date: 'Aujourd\'hui 12:00',
          itemsSummary: 'Panneau Solaire 200W',
          amount: 50000,
          paymentMethod: 'cash_on_delivery',
          status: 'delivered'
        },
        {
          id: 'hist-06',
          trackingNumber: 'IFM-10465',
          customerName: 'Hervé Bell',
          neighborhood: 'New Bell',
          date: 'Hier 15:30',
          itemsSummary: 'Kit Écouteurs Pro',
          amount: 18000,
          paymentMethod: 'cash_on_delivery',
          status: 'failed',
          failReason: 'Client absent et téléphone éteint'
        }
      ],
      supervisorNotes: [
        '[18 Sept 2026] Attention aux embouteillages vers le pont du Wouri aux heures de pointe.'
      ]
    },
    {
      id: 'cour-03',
      name: 'Cedric Fotso',
      phone: '+237 653 12 34 56',
      whatsapp: '+237 653 12 34 56',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      zone: 'Douala - Bonamoussadi, Makepe & Kotto',
      city: 'Douala',
      vehicleType: 'moto',
      vehiclePlate: 'LT-902-CD',
      vehicleModel: 'Bajaj Boxer 150cc',
      assignedCount: 5,
      deliveredCount: 5,
      failedCount: 0,
      successRate: 99.1,
      cashCollected: 64000,
      cashToRemit: 64000,
      status: 'available',
      rating: 5.0,
      totalDeliveriesLifetime: 610,
      averageDeliveryTimeMin: 22,
      emergencyContact: {
        name: 'Pauline Fotso',
        relation: 'Mère',
        phone: '+237 650 33 44 55'
      },
      hireDate: '2025-11-20',
      warehouseBase: 'Entrepôt Akwa Douala',
      assignedOrders: [],
      deliveryHistory: [
        {
          id: 'hist-07',
          trackingNumber: 'IFM-10478',
          customerName: 'Sandrine Njeck',
          neighborhood: 'Bonamoussadi Rond-point',
          date: 'Aujourd\'hui 11:00',
          itemsSummary: 'Lampe Solaire LED 100W',
          amount: 14900,
          paymentMethod: 'cash_on_delivery',
          status: 'delivered'
        },
        {
          id: 'hist-08',
          trackingNumber: 'IFM-10474',
          customerName: 'Arthur Manga',
          neighborhood: 'Makepe Missoke',
          date: 'Aujourd\'hui 09:30',
          itemsSummary: 'Convertisseur Pur Sinus 1000W',
          amount: 49100,
          paymentMethod: 'cash_on_delivery',
          status: 'delivered'
        }
      ],
      supervisorNotes: [
        '[10 Sept 2026] Noté 5 étoiles par les clients de Bonamoussadi, très poli.'
      ]
    },
    {
      id: 'cour-04',
      name: 'Yannick Nguemo',
      phone: '+237 675 99 88 77',
      whatsapp: '+237 675 99 88 77',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      zone: 'Yaoundé - Omnisports, Essos & Ngoa-Ekelle',
      city: 'Yaoundé',
      vehicleType: 'moto',
      vehiclePlate: 'CE-441-XY',
      vehicleModel: 'Yamaha Crux 110cc',
      assignedCount: 4,
      deliveredCount: 4,
      failedCount: 0,
      successRate: 97.0,
      cashCollected: 46500,
      cashToRemit: 46500,
      status: 'available',
      rating: 4.7,
      totalDeliveriesLifetime: 520,
      averageDeliveryTimeMin: 27,
      emergencyContact: {
        name: 'Thérèse Nguemo',
        relation: 'Sœur',
        phone: '+237 670 44 55 66'
      },
      hireDate: '2026-01-10',
      warehouseBase: 'Entrepôt Mvan Aérodrome',
      assignedOrders: [],
      deliveryHistory: [
        {
          id: 'hist-09',
          trackingNumber: 'IFM-10483',
          customerName: 'Christian Nsangou',
          neighborhood: 'Omnisports Mtn',
          date: 'Aujourd\'hui 14:45',
          itemsSummary: 'Mixeur Plongeant 4-en-1',
          amount: 18500,
          paymentMethod: 'cash_on_delivery',
          status: 'delivered'
        }
      ],
      supervisorNotes: [
        '[01 Sept 2026] Permis A renouvelé et casque haute visibilité certifié.'
      ]
    },
    {
      id: 'cour-05',
      name: 'Dieudonné Abega (Camionnette)',
      phone: '+237 691 33 22 11',
      whatsapp: '+237 691 33 22 11',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      zone: 'Interurbain - Yaoundé vers Bafoussam & Ouest',
      city: 'Yaoundé',
      vehicleType: 'van',
      vehiclePlate: 'CE-102-TR',
      vehicleModel: 'Toyota Hiace Utilitaire',
      assignedCount: 3,
      deliveredCount: 2,
      failedCount: 0,
      successRate: 96.0,
      cashCollected: 185000,
      cashToRemit: 185000,
      status: 'delivering',
      rating: 4.9,
      totalDeliveriesLifetime: 340,
      averageDeliveryTimeMin: 120,
      emergencyContact: {
        name: 'Jeanne Abega',
        relation: 'Épouse',
        phone: '+237 695 11 33 55'
      },
      hireDate: '2025-06-01',
      warehouseBase: 'Hub Central Yaoundé',
      assignedOrders: [],
      deliveryHistory: [
        {
          id: 'hist-10',
          trackingNumber: 'IFM-10479',
          customerName: 'Christelle Fosso',
          neighborhood: 'Bafoussam Marché B',
          date: 'Aujourd\'hui 13:00',
          itemsSummary: 'Batterie Solaire LiFePO4 100Ah + Panneau 400W',
          amount: 185000,
          paymentMethod: 'cash_on_delivery',
          status: 'delivered'
        }
      ],
      supervisorNotes: [
        '[12 Sept 2026] Chauffeur poids moyen pour palettes solaires et colis volumineux vers l\'Ouest.'
      ]
    },
    {
      id: 'cour-06',
      name: 'Fabrice Tchakounte',
      phone: '+237 670 88 77 66',
      whatsapp: '+237 670 88 77 66',
      avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
      zone: 'Douala - Bassa, Ndokoti & Logbaba',
      city: 'Douala',
      vehicleType: 'moto',
      vehiclePlate: 'LT-772-GH',
      vehicleModel: 'Yamaha Crux 110cc',
      assignedCount: 0,
      deliveredCount: 0,
      failedCount: 0,
      successRate: 94.2,
      cashCollected: 0,
      cashToRemit: 0,
      status: 'offline',
      rating: 4.6,
      totalDeliveriesLifetime: 410,
      averageDeliveryTimeMin: 32,
      emergencyContact: {
        name: 'Marie Tchakounte',
        relation: 'Sœur',
        phone: '+237 672 55 44 33'
      },
      hireDate: '2026-02-15',
      warehouseBase: 'Entrepôt Akwa Douala',
      assignedOrders: [],
      deliveryHistory: [],
      supervisorNotes: [
        '[20 Sept 2026] Repos hebdomadaire programmé ce dimanche.'
      ]
    }
  ], [courierTasks]);

  // States
  const [couriers, setCouriers] = useState<Courier[]>(initialCouriers);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [selectedCourierId, setSelectedCourierId] = useState<string | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignSelectedCourierId, setAssignSelectedCourierId] = useState<string>('cour-01');
  const [assignSelectedTaskIds, setAssignSelectedTaskIds] = useState<string[]>([]);
  const [newSupervisorNote, setNewSupervisorNote] = useState<string>('');

  // Form for new courier
  const [newCourierForm, setNewCourierForm] = useState({
    name: '',
    phone: '+237 ',
    whatsapp: '+237 ',
    zone: 'Yaoundé - Bastos & Centre',
    city: 'Yaoundé',
    vehicleType: 'moto' as 'moto' | 'van',
    vehiclePlate: '',
    vehicleModel: 'Yamaha Crux 110cc',
    warehouseBase: 'Entrepôt Mvan Aérodrome'
  });

  // Calculate 5 specified KPIs
  const activeCouriersCount = couriers.filter(c => c.status !== 'suspended' && c.status !== 'offline').length;
  const availableCount = couriers.filter(c => c.status === 'available').length;
  const deliveringCount = couriers.filter(c => c.status === 'delivering').length;
  const offlineCount = couriers.filter(c => c.status === 'offline').length;
  const averageSuccessRate = (
    couriers.reduce((acc, c) => acc + c.successRate, 0) / (couriers.length || 1)
  ).toFixed(1);

  // Filtered couriers list
  const filteredCouriers = useMemo(() => {
    return couriers.filter(courier => {
      if (statusFilter !== 'all' && courier.status !== statusFilter) return false;
      if (zoneFilter !== 'all' && courier.city.toLowerCase() !== zoneFilter.toLowerCase()) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = courier.name.toLowerCase().includes(q);
        const matchPhone = courier.phone.includes(q);
        const matchZone = courier.zone.toLowerCase().includes(q);
        const matchPlate = courier.vehiclePlate.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchZone && !matchPlate) return false;
      }
      return true;
    });
  }, [couriers, statusFilter, zoneFilter, searchQuery]);

  // Selected courier for profile detail page
  const selectedCourier = useMemo(() => {
    return couriers.find(c => c.id === selectedCourierId) || null;
  }, [couriers, selectedCourierId]);

  // Toggle courier status (Deactivate / Suspend / Activate)
  const handleToggleStatus = (courierId: string) => {
    setCouriers(prev =>
      prev.map(c => {
        if (c.id !== courierId) return c;
        const nextStatus: CourierStatus = c.status === 'offline' ? 'available' : c.status === 'available' ? 'offline' : 'offline';
        return { ...c, status: nextStatus };
      })
    );
    addToast('Statut du livreur mis à jour avec succès.', 'info');
  };

  // Reconcile cash collected to warehouse desk
  const handleReconcileCash = (courierId: string) => {
    const courier = couriers.find(c => c.id === courierId);
    if (!courier) return;

    if (courier.cashToRemit === 0) {
      addToast('Aucune caisse à reverser pour ce livreur actuellement.', 'info');
      return;
    }

    const amount = courier.cashToRemit;
    setCouriers(prev =>
      prev.map(c => (c.id === courierId ? { ...c, cashToRemit: 0 } : c))
    );
    addToast(`Versement de ${formatFCFA(amount)} validé à la caisse de l'entrepôt.`, 'success');
  };

  // Add supervisor note
  const handleAddSupervisorNote = () => {
    if (!newSupervisorNote.trim() || !selectedCourier) return;
    const dateStr = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
    const formatted = `[${dateStr}] ${newSupervisorNote.trim()}`;

    setCouriers(prev =>
      prev.map(c => {
        if (c.id === selectedCourier.id) {
          return {
            ...c,
            supervisorNotes: [formatted, ...c.supervisorNotes]
          };
        }
        return c;
      })
    );
    setNewSupervisorNote('');
    addToast('Note superviseur enregistrée sur la fiche livreur.', 'success');
  };

  // Submit new courier
  const handleCreateCourier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourierForm.name.trim() || !newCourierForm.phone.trim()) {
      alert('Veuillez remplir le nom et le numéro de téléphone.');
      return;
    }

    const newC: Courier = {
      id: 'cour-' + Date.now(),
      name: newCourierForm.name,
      phone: newCourierForm.phone,
      whatsapp: newCourierForm.whatsapp || newCourierForm.phone,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      zone: newCourierForm.zone,
      city: newCourierForm.city,
      vehicleType: newCourierForm.vehicleType,
      vehiclePlate: newCourierForm.vehiclePlate || 'ENREGISTREMENT-CMR',
      vehicleModel: newCourierForm.vehicleModel,
      assignedCount: 0,
      deliveredCount: 0,
      failedCount: 0,
      successRate: 100,
      cashCollected: 0,
      cashToRemit: 0,
      status: 'available',
      rating: 5.0,
      totalDeliveriesLifetime: 0,
      averageDeliveryTimeMin: 25,
      emergencyContact: {
        name: 'Contact Référent',
        relation: 'Proche',
        phone: '+237 670 00 00 00'
      },
      hireDate: new Date().toISOString().slice(0, 10),
      warehouseBase: newCourierForm.warehouseBase,
      assignedOrders: [],
      deliveryHistory: [],
      supervisorNotes: ['Nouveau livreur intégré à la flotte IFPTIE Market.']
    };

    setCouriers([newC, ...couriers]);
    setIsAddModalOpen(false);
    setNewCourierForm({
      name: '',
      phone: '+237 ',
      whatsapp: '+237 ',
      zone: 'Yaoundé - Bastos & Centre',
      city: 'Yaoundé',
      vehicleType: 'moto',
      vehiclePlate: '',
      vehicleModel: 'Yamaha Crux 110cc',
      warehouseBase: 'Entrepôt Mvan Aérodrome'
    });
    addToast(`Livreur ${newC.name} ajouté à la flotte avec succès !`, 'success');
  };

  // Submit task assignment
  const handleAssignTasks = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignSelectedTaskIds.length === 0) {
      alert('Veuillez sélectionner au moins une course à assigner.');
      return;
    }

    const courier = couriers.find(c => c.id === assignSelectedCourierId);
    if (!courier) return;

    setCouriers(prev =>
      prev.map(c => {
        if (c.id === assignSelectedCourierId) {
          return {
            ...c,
            assignedCount: c.assignedCount + assignSelectedTaskIds.length,
            status: 'delivering'
          };
        }
        return c;
      })
    );

    setIsAssignModalOpen(false);
    setAssignSelectedTaskIds([]);
    addToast(`${assignSelectedTaskIds.length} course(s) assignée(s) à ${courier.name}.`, 'success');
  };

  // Status helper
  const getStatusBadge = (status: CourierStatus) => {
    switch (status) {
      case 'available':
        return { label: 'Disponible', color: '#15803d', bg: '#dcfce7', dot: '#22c55e' };
      case 'delivering':
        return { label: 'En livraison 🏍️', color: '#b45309', bg: '#fef3c7', dot: '#f59e0b' };
      case 'offline':
        return { label: 'Hors ligne', color: '#64748b', bg: '#f1f5f9', dot: '#94a3b8' };
      case 'suspended':
        return { label: 'Suspendu', color: '#b91c1c', bg: '#fee2e2', dot: '#ef4444' };
    }
  };

  // Open WhatsApp
  const handleOpenWhatsApp = (num: string, name: string) => {
    const cleanNum = num.replace(/[\s\-\+\(\)]/g, '');
    const message = encodeURIComponent(`Bonjour ${name}, de la part de la régie de livraison IFPTIE Market.`);
    window.open(`https://wa.me/${cleanNum}?text=${message}`, '_blank');
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
        marginBottom: '26px'
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
              <Bike size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
                Livreurs
              </h1>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                Supervision de la flotte de coursiers express (Yaoundé, Douala, Bafoussam), affectation des tournées et contrôle des encaissements.
              </p>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              addToast('Rapport de la flotte de livreurs exporté en CSV.', 'info');
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

          <button
            onClick={() => setIsAssignModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              backgroundColor: '#0284c7',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: 800,
              color: '#ffffff',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
            }}
          >
            <Navigation size={16} />
            Assign deliveries
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
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
              boxShadow: '0 4px 14px rgba(11, 87, 56, 0.35)'
            }}
          >
            <Plus size={18} />
            Add courier
          </button>
        </div>
      </div>

      {/* 2. SPECIFIED 5 KPI CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '26px'
      }}>
        {/* Active Couriers */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Active Couriers
            </div>
            <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>
              {activeCouriersCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
              En service sur le terrain
            </div>
          </div>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: '#ecfdf5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0b5738'
          }}>
            <Bike size={24} />
          </div>
        </div>

        {/* Available */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Available (Disponibles)
            </div>
            <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#15803d', marginTop: '4px' }}>
              {availableCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700, marginTop: '2px' }}>
              Prêts pour affectation
            </div>
          </div>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#15803d'
          }}>
            <CheckCircle2 size={24} />
          </div>
        </div>

        {/* Delivering */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Delivering (En course)
            </div>
            <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#b45309', marginTop: '4px' }}>
              {deliveringCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 700, marginTop: '2px' }}>
              Courses en cours
            </div>
          </div>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: '#fef3c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#b45309'
          }}>
            <Navigation size={24} />
          </div>
        </div>

        {/* Offline */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Offline (Hors ligne)
            </div>
            <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#64748b', marginTop: '4px' }}>
              {offlineCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
              Repos ou hors service
            </div>
          </div>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b'
          }}>
            <Power size={24} />
          </div>
        </div>

        {/* Average Success Rate */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Average Success Rate
            </div>
            <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0b5738', marginTop: '4px' }}>
              {averageSuccessRate}%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
              Excellence opérationnelle
            </div>
          </div>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: '#ecfdf5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0b5738'
          }}>
            <Award size={24} />
          </div>
        </div>
      </div>

      {/* 3. FILTERS & SEARCH BAR */}
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
            { key: 'all', label: `Tous (${couriers.length})` },
            { key: 'available', label: `Disponibles (${availableCount})` },
            { key: 'delivering', label: `En livraison (${deliveringCount})` },
            { key: 'offline', label: `Hors ligne (${offlineCount})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: statusFilter === tab.key ? '#ffffff' : 'transparent',
                color: statusFilter === tab.key ? '#0f172a' : '#64748b',
                boxShadow: statusFilter === tab.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & City Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, justifyContent: 'flex-end' }}>
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
              placeholder="Rechercher livreur, téléphone, plaque, zone..."
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={15} color="#64748b" />
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
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
              <option value="all">Toutes les zones (Yaoundé & Douala)</option>
              <option value="Yaoundé">Yaoundé</option>
              <option value="Douala">Douala</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. SPECIFIED COURIER TABLE */}
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
                <th style={{ padding: '14px 20px' }}>Courier (Livreur)</th>
                <th style={{ padding: '14px 14px' }}>Phone</th>
                <th style={{ padding: '14px 14px' }}>Zone</th>
                <th style={{ padding: '14px 14px', textAlign: 'center' }}>Assigned</th>
                <th style={{ padding: '14px 14px', textAlign: 'center' }}>Delivered</th>
                <th style={{ padding: '14px 14px', textAlign: 'center' }}>Failed</th>
                <th style={{ padding: '14px 14px' }}>Success rate</th>
                <th style={{ padding: '14px 14px' }}>Cash collected</th>
                <th style={{ padding: '14px 14px' }}>Status</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCouriers.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ padding: '48px 20px', textAlign: 'center', color: '#64748b' }}>
                    Aucun livreur ne correspond aux filtres sélectionnés.
                  </td>
                </tr>
              ) : (
                filteredCouriers.map(courier => {
                  const statusInfo = getStatusBadge(courier.status);

                  return (
                    <tr
                      key={courier.id}
                      onClick={() => setSelectedCourierId(courier.id)}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        cursor: 'pointer',
                        transition: 'background-color 0.12s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {/* Courier Name & Vehicle */}
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={courier.avatar}
                            alt=""
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '10px',
                              objectFit: 'cover',
                              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>
                              {courier.name}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', fontSize: '0.75rem', color: '#64748b' }}>
                              <span>{courier.vehicleType === 'moto' ? '🏍️' : '🚐'} {courier.vehicleModel}</span>
                              <span>•</span>
                              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>{courier.vehiclePlate}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Phone & WhatsApp */}
                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>
                          {courier.phone}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenWhatsApp(courier.whatsapp, courier.name);
                            }}
                            title="WhatsApp"
                            style={{
                              border: 'none',
                              backgroundColor: '#25D366',
                              color: 'white',
                              borderRadius: '4px',
                              padding: '2px 6px',
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}
                          >
                            <MessageSquare size={10} />
                            WhatsApp
                          </button>
                        </div>
                      </td>

                      {/* Zone */}
                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>
                          {courier.city}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {courier.zone}
                        </div>
                      </td>

                      {/* Assigned */}
                      <td style={{ padding: '14px 14px', textAlign: 'center' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#f1f5f9',
                          fontWeight: 800,
                          color: '#0f172a'
                        }}>
                          {courier.assignedCount}
                        </span>
                      </td>

                      {/* Delivered */}
                      <td style={{ padding: '14px 14px', textAlign: 'center' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#ecfdf5',
                          fontWeight: 800,
                          color: '#15803d'
                        }}>
                          {courier.deliveredCount}
                        </span>
                      </td>

                      {/* Failed */}
                      <td style={{ padding: '14px 14px', textAlign: 'center' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: courier.failedCount > 0 ? '#fef2f2' : '#f8fafc',
                          fontWeight: 800,
                          color: courier.failedCount > 0 ? '#dc2626' : '#94a3b8'
                        }}>
                          {courier.failedCount}
                        </span>
                      </td>

                      {/* Success Rate */}
                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 900, color: courier.successRate >= 96 ? '#15803d' : '#d97706' }}>
                            {courier.successRate}%
                          </span>
                        </div>
                        <div style={{ width: '60px', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', marginTop: '4px' }}>
                          <div
                            style={{
                              width: `${courier.successRate}%`,
                              height: '100%',
                              backgroundColor: courier.successRate >= 96 ? '#16a34a' : '#f59e0b',
                              borderRadius: '2px'
                            }}
                          />
                        </div>
                      </td>

                      {/* Cash Collected */}
                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ fontWeight: 800, color: '#0b5738' }}>
                          {formatFCFA(courier.cashCollected)}
                        </div>
                        {courier.cashToRemit > 0 && (
                          <div style={{ fontSize: '0.6875rem', color: '#ea580c', fontWeight: 700 }}>
                            {formatFCFA(courier.cashToRemit)} en poche
                          </div>
                        )}
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
                          gap: '5px'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusInfo.dot }} />
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                          {/* View performance button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCourierId(courier.id);
                            }}
                            title="View performance (Voir profil et tournées)"
                            style={{
                              padding: '5px 10px',
                              backgroundColor: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: '#0b5738',
                              cursor: 'pointer'
                            }}
                          >
                            Performance
                          </button>

                          {/* Assign deliveries button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setAssignSelectedCourierId(courier.id);
                              setIsAssignModalOpen(true);
                            }}
                            title="Assigner des courses"
                            style={{
                              padding: '5px 8px',
                              backgroundColor: '#f0f9ff',
                              border: '1px solid #bae6fd',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: '#0284c7',
                              cursor: 'pointer'
                            }}
                          >
                            <Navigation size={13} />
                          </button>

                          {/* Deactivate / toggle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStatus(courier.id);
                            }}
                            title={courier.status === 'offline' ? 'Activer le livreur' : 'Deactivate (Mettre hors ligne)'}
                            style={{
                              padding: '5px 8px',
                              backgroundColor: courier.status === 'offline' ? '#f0fdf4' : '#fef2f2',
                              border: courier.status === 'offline' ? '1px solid #bbf7d0' : '1px solid #fecaca',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: courier.status === 'offline' ? '#15803d' : '#dc2626',
                              cursor: 'pointer'
                            }}
                          >
                            <Power size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. COURIER PROFILE DETAIL PAGE (Modal / Drawer matching prompt specifications) */}
      {selectedCourier && (
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
            maxWidth: '900px',
            maxHeight: '92vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Profile Header */}
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
                <img
                  src={selectedCourier.avatar}
                  alt=""
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      {selectedCourier.name}
                    </h2>
                    <span style={{
                      backgroundColor: getStatusBadge(selectedCourier.status).bg,
                      color: getStatusBadge(selectedCourier.status).color,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: getStatusBadge(selectedCourier.status).dot }} />
                      {getStatusBadge(selectedCourier.status).label}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '0.8125rem', color: '#64748b' }}>
                    <span style={{ color: '#0f172a', fontWeight: 700, fontFamily: 'monospace' }}>
                      {selectedCourier.phone}
                    </span>
                    <span>•</span>
                    <span>{selectedCourier.zone}</span>
                    <span>•</span>
                    <span>{selectedCourier.warehouseBase}</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedCourierId(null)}
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

            {/* Quick Actions & Contact Bar */}
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
                <button
                  onClick={() => handleOpenWhatsApp(selectedCourier.whatsapp, selectedCourier.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <MessageSquare size={13} />
                  WhatsApp
                </button>

                <a
                  href={`tel:${selectedCourier.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={13} color="#0b5738" />
                  Appeler
                </a>

                {/* Quick Status toggle */}
                <button
                  onClick={() => handleToggleStatus(selectedCourier.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    backgroundColor: '#f8fafc',
                    color: '#334155',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Power size={13} color="#64748b" />
                  Basculer Statut ({selectedCourier.status === 'offline' ? 'Activer' : 'Mettre Hors Ligne'})
                </button>
              </div>

              {/* Vehicle Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f1f5f9',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#334155'
              }}>
                <span>{selectedCourier.vehicleType === 'moto' ? '🏍️ Moto' : '🚐 Camionnette'}</span>
                <span>•</span>
                <span>{selectedCourier.vehicleModel}</span>
                <span>•</span>
                <span style={{ fontFamily: 'monospace', color: '#0b5738' }}>{selectedCourier.vehiclePlate}</span>
              </div>
            </div>

            {/* Profile Body with 6 Required Sections */}
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* SECTION 1: PERSONAL INFORMATION */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', margin: '0 0 12px' }}>
                  1. Personal Information (Informations Générales & Flotte)
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px',
                  backgroundColor: '#f8fafc',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Nom & Prénom</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a' }}>{selectedCourier.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Numéro Téléphone Flotte</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace' }}>{selectedCourier.phone}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Contact d'Urgence</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a' }}>
                      {selectedCourier.emergencyContact.name} ({selectedCourier.emergencyContact.relation}) : {selectedCourier.emergencyContact.phone}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Entrepôt de Rattachement</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0b5738' }}>{selectedCourier.warehouseBase}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Date d'embauche</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a' }}>{selectedCourier.hireDate}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>Immatriculation Véhicule</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace' }}>{selectedCourier.vehiclePlate}</div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: PERFORMANCE */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', margin: '0 0 12px' }}>
                  2. Performance (Indicateurs d'efficacité de livraison)
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '12px'
                }}>
                  <div style={{ backgroundColor: '#ecfdf5', padding: '14px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#065f46' }}>SUCCESS RATE</div>
                    <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0b5738', marginTop: '4px' }}>
                      {selectedCourier.successRate}%
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#047857', marginTop: '2px' }}>Taux de succès global</div>
                  </div>

                  <div style={{ backgroundColor: '#f0fdf4', padding: '14px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#16a34a' }}>TOTAL DELIVERIES</div>
                    <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#15803d', marginTop: '4px' }}>
                      {selectedCourier.totalDeliveriesLifetime}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#15803d', marginTop: '2px' }}>Courses réalisées</div>
                  </div>

                  <div style={{ backgroundColor: '#fef3c7', padding: '14px', borderRadius: '12px', border: '1px solid #fde68a' }}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#92400e' }}>SATISFACTION CLIENT</div>
                    <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#b45309', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={18} fill="#f59e0b" color="#f59e0b" />
                      {selectedCourier.rating} / 5
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#92400e', marginTop: '2px' }}>Avis clients après course</div>
                  </div>

                  <div style={{ backgroundColor: '#f0f9ff', padding: '14px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#0369a1' }}>DURÉE MOYENNE</div>
                    <div style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0284c7', marginTop: '4px' }}>
                      {selectedCourier.averageDeliveryTimeMin} min
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#0369a1', marginTop: '2px' }}>Par course en ville</div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: CASH COLLECTION (Encaissements & Versement Caisse) */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', margin: 0 }}>
                    3. Cash Collection (Contrôle des Encaissements & Caisse)
                  </h4>
                  {selectedCourier.cashToRemit > 0 && (
                    <button
                      onClick={() => handleReconcileCash(selectedCourier.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        backgroundColor: '#0b5738',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      <CheckCircle2 size={13} />
                      Valider Versement Caisse ({formatFCFA(selectedCourier.cashToRemit)})
                    </button>
                  )}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px',
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fde68a',
                  padding: '16px',
                  borderRadius: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#92400e', fontWeight: 700 }}>ENCAISSÉ AUJOURD'HUI</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0b5738', marginTop: '2px' }}>
                      {formatFCFA(selectedCourier.cashCollected)}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#78350f' }}>Total collecté auprès des clients</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#92400e', fontWeight: 700 }}>LIQUIDE ACTUEL EN POCHE</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: selectedCourier.cashToRemit > 0 ? '#dc2626' : '#15803d', marginTop: '2px' }}>
                      {formatFCFA(selectedCourier.cashToRemit)}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#78350f' }}>
                      {selectedCourier.cashToRemit > 0 ? 'À déposer au bureau comptabilité' : 'Toutes les recettes ont été déposées ✓'}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: ASSIGNED ORDERS (Commandes Assignées Actives) */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', margin: '0 0 12px' }}>
                  4. Assigned Orders (Courses Assignées pour la Tournée Active)
                </h4>

                {selectedCourier.assignedOrders.length === 0 ? (
                  <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px dashed #cbd5e1',
                    fontSize: '0.8125rem',
                    color: '#64748b'
                  }}>
                    Aucune commande actuellement assignée en cours de route.
                  </div>
                ) : (
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                          <th style={{ padding: '10px 14px' }}>Tracking</th>
                          <th style={{ padding: '10px 14px' }}>Client</th>
                          <th style={{ padding: '10px 14px' }}>Destination</th>
                          <th style={{ padding: '10px 14px' }}>À encaisser</th>
                          <th style={{ padding: '10px 14px' }}>Statut</th>
                          <th style={{ padding: '10px 14px', textAlign: 'right' }}>Suivi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCourier.assignedOrders.map((task, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: 800, color: '#0b5738' }}>
                              #{task.trackingNumber}
                            </td>
                            <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>
                              {task.customerName}
                            </td>
                            <td style={{ padding: '10px 14px', color: '#64748b' }}>
                              {task.neighborhood}
                            </td>
                            <td style={{ padding: '10px 14px', fontWeight: 800, color: '#0f172a' }}>
                              {formatFCFA(task.totalToCollect)}
                            </td>
                            <td style={{ padding: '10px 14px' }}>
                              <span style={{
                                padding: '2px 8px',
                                borderRadius: '6px',
                                fontSize: '0.6875rem',
                                fontWeight: 800,
                                backgroundColor: task.status === 'in_route' ? '#fef3c7' : '#e0f2fe',
                                color: task.status === 'in_route' ? '#b45309' : '#0369a1'
                              }}>
                                {task.status === 'in_route' ? 'En route 🏍️' : 'Assigné'}
                              </span>
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                              <button
                                onClick={() => {
                                  setSelectedCourierId(null);
                                  setActiveTrackingNumber(task.trackingNumber);
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
                                Ouvrir
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* SECTION 5: DELIVERY HISTORY */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', margin: '0 0 12px' }}>
                  5. Delivery History (Historique des courses récentes)
                </h4>

                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                        <th style={{ padding: '10px 14px' }}>Date</th>
                        <th style={{ padding: '10px 14px' }}>Commande</th>
                        <th style={{ padding: '10px 14px' }}>Destinataire</th>
                        <th style={{ padding: '10px 14px' }}>Colis</th>
                        <th style={{ padding: '10px 14px' }}>Montant</th>
                        <th style={{ padding: '10px 14px' }}>Résultat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCourier.deliveryHistory.map((hist) => (
                        <tr key={hist.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 14px', color: '#64748b' }}>
                            {hist.date}
                          </td>
                          <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: 800, color: '#0f172a' }}>
                            #{hist.trackingNumber}
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{hist.customerName}</div>
                            <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{hist.neighborhood}</div>
                          </td>
                          <td style={{ padding: '10px 14px', color: '#475569' }}>
                            {hist.itemsSummary}
                          </td>
                          <td style={{ padding: '10px 14px', fontWeight: 800, color: '#0f172a' }}>
                            {formatFCFA(hist.amount)}
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            {hist.status === 'delivered' ? (
                              <span style={{ color: '#15803d', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <CheckCircle2 size={13} /> Livré
                              </span>
                            ) : (
                              <span style={{ color: '#dc2626', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <XCircle size={13} /> Échec ({hist.failReason})
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION 6: SUPERVISOR NOTES */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', margin: '0 0 12px' }}>
                  6. Notes (Notes Superviseur & Observations)
                </h4>

                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px',
                  marginBottom: '12px'
                }}>
                  {selectedCourier.supervisorNotes.map((note, idx) => (
                    <div key={idx} style={{ fontSize: '0.8125rem', color: '#334155', marginBottom: '8px' }}>
                      {note}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Ajouter une observation pour ce livreur..."
                    value={newSupervisorNote}
                    onChange={(e) => setNewSupervisorNote(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSupervisorNote()}
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
                    onClick={handleAddSupervisorNote}
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
            </div>

            {/* Profile Footer */}
            <div style={{
              padding: '16px 28px',
              borderTop: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Livreur ID : <strong style={{ color: '#0f172a' }}>{selectedCourier.id}</strong>
              </div>
              <button
                onClick={() => setSelectedCourierId(null)}
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
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. ADD COURIER MODAL */}
      {isAddModalOpen && (
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
            maxWidth: '560px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Add Courier (Nouveau Livreur)
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.8125rem', color: '#64748b' }}>
                  Enregistrez un nouveau coursier dans la flotte IFPTIE Market.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCourier} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Nom complet du coursier *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Patrick Ngo"
                  value={newCourierForm.name}
                  onChange={(e) => setNewCourierForm({ ...newCourierForm, name: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Téléphone Flotte *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+237 6XX XX XX XX"
                    value={newCourierForm.phone}
                    onChange={(e) => setNewCourierForm({ ...newCourierForm, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      fontFamily: 'monospace',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="+237 6XX XX XX XX"
                    value={newCourierForm.whatsapp}
                    onChange={(e) => setNewCourierForm({ ...newCourierForm, whatsapp: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      fontFamily: 'monospace',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Ville & Hub
                  </label>
                  <select
                    value={newCourierForm.city}
                    onChange={(e) => setNewCourierForm({ ...newCourierForm, city: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="Yaoundé">Yaoundé</option>
                    <option value="Douala">Douala</option>
                    <option value="Bafoussam">Bafoussam</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Véhicule
                  </label>
                  <select
                    value={newCourierForm.vehicleType}
                    onChange={(e) => setNewCourierForm({ ...newCourierForm, vehicleType: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="moto">Moto Express (110-150cc)</option>
                    <option value="van">Camionnette Utilitaire</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Immatriculation
                  </label>
                  <input
                    type="text"
                    placeholder="ex: CE-920-AB"
                    value={newCourierForm.vehiclePlate}
                    onChange={(e) => setNewCourierForm({ ...newCourierForm, vehiclePlate: e.target.value.toUpperCase() })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      fontFamily: 'monospace',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Zone d'affectation
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Bastos & Dragages"
                    value={newCourierForm.zone}
                    onChange={(e) => setNewCourierForm({ ...newCourierForm, zone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 22px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#0b5738',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(11, 87, 56, 0.3)'
                  }}
                >
                  Enregistrer le livreur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. ASSIGN DELIVERIES MODAL */}
      {isAssignModalOpen && (
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
            maxWidth: '600px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Assign Deliveries (Affecter des Courses)
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.8125rem', color: '#64748b' }}>
                  Sélectionnez le livreur et cochez les commandes prêtes pour tournée.
                </p>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAssignTasks} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Choisir le livreur *
                </label>
                <select
                  value={assignSelectedCourierId}
                  onChange={(e) => setAssignSelectedCourierId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem',
                    backgroundColor: '#ffffff',
                    fontWeight: 700
                  }}
                >
                  {couriers.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.zone} — Statut: {getStatusBadge(c.status).label})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Commandes prêtes pour départ entrepôt *
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                  {[
                    { id: 'task-new-01', tracking: 'IFM-10484', client: 'Marcelle Nguemo', dest: 'Mendong (Yaoundé)', amt: 34000 },
                    { id: 'task-new-02', tracking: 'IFM-10485', client: 'David Kotto', dest: 'Bonanjo (Douala)', amt: 50000 },
                    { id: 'task-new-03', tracking: 'IFM-10486', client: 'Sandra Bikoula', dest: 'Omnisports (Yaoundé)', amt: 16500 },
                  ].map(item => {
                    const isChecked = assignSelectedTaskIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (isChecked) {
                            setAssignSelectedTaskIds(assignSelectedTaskIds.filter(id => id !== item.id));
                          } else {
                            setAssignSelectedTaskIds([...assignSelectedTaskIds, item.id]);
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: isChecked ? '2px solid #0b5738' : '1px solid #e2e8f0',
                          backgroundColor: isChecked ? '#ecfdf5' : '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.8125rem' }}>
                            #{item.tracking} — {item.client}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {item.dest}
                          </div>
                        </div>
                        <div style={{ fontWeight: 800, color: '#0b5738', fontSize: '0.8125rem' }}>
                          {formatFCFA(item.amt)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 22px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
                  }}
                >
                  Confirmer l'affectation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
