import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import type { Order, CourierTask, PaymentMethod } from '../../types';
import {
  Truck,
  Bike,
  Navigation,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Search,
  Filter,
  Phone,
  MessageSquare,
  MapPin,
  DollarSign,
  User,
  Users,
  ShieldAlert,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Send,
  Eye,
  Radio,
  SlidersHorizontal,
  Calendar,
  Check,
  X,
  Package,
  Layers,
  Compass
} from 'lucide-react';

export interface CourierWorkload {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  whatsapp: string;
  zone: string;
  city: string;
  vehicle: string;
  totalDeliveries: number;
  completed: number;
  inProgress: number;
  pending: number;
  cashCollected: number;
  isOnline: boolean;
}

export interface DeliveryMission {
  id: string;
  orderId: string;
  trackingNumber: string;
  customerName: string;
  customerPhone: string;
  whatsappPhone: string;
  city: string;
  neighborhood: string;
  addressNote: string;
  itemsSummary: string;
  totalToCollect: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pay_on_delivery';
  deliveryFee: number;
  status: 'to_assign' | 'assigned' | 'in_route' | 'delivered' | 'failed' | 'to_reschedule';
  assignedCourierId: string | null;
  assignedCourierName: string | null;
  orderTime: string;
  estimatedDeliveryTime: string;
  isDelayed?: boolean;
  failReason?: string;
  notes?: string;
}

export const AdminDeliveryOperationsView: React.FC = () => {
  const { addToast, setActiveTrackingNumber, setActiveView } = useStore();

  // Courier workload matching prompt example ("Jean: 12 deliveries, 8 completed, 2 in progress, 2 pending")
  const initialCouriers: CourierWorkload[] = [
    {
      id: 'cour-jean',
      name: 'Jean',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      phone: '+237 671 00 11 22',
      whatsapp: '+237 671 00 11 22',
      zone: 'Yaoundé - Bastos & Centre',
      city: 'Yaoundé',
      vehicle: '🏍️ Yamaha Crux',
      totalDeliveries: 12,
      completed: 8,
      inProgress: 2,
      pending: 2,
      cashCollected: 114000,
      isOnline: true
    },
    {
      id: 'cour-arsene',
      name: 'Arsène Mbida',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
      phone: '+237 671 23 45 67',
      whatsapp: '+237 671 23 45 67',
      zone: 'Yaoundé - Mvan & Aérodrome',
      city: 'Yaoundé',
      vehicle: '🏍️ TVS Neo',
      totalDeliveries: 9,
      completed: 6,
      inProgress: 2,
      pending: 1,
      cashCollected: 89500,
      isOnline: true
    },
    {
      id: 'cour-boris',
      name: 'Boris Ekani',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      phone: '+237 699 45 67 89',
      whatsapp: '+237 699 45 67 89',
      zone: 'Douala - Akwa & Bonanjo',
      city: 'Douala',
      vehicle: '🏍️ Bajaj Boxer',
      totalDeliveries: 14,
      completed: 10,
      inProgress: 3,
      pending: 1,
      cashCollected: 162000,
      isOnline: true
    },
    {
      id: 'cour-cedric',
      name: 'Cedric Fotso',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      phone: '+237 653 12 34 56',
      whatsapp: '+237 653 12 34 56',
      zone: 'Douala - Bonamoussadi & Kotto',
      city: 'Douala',
      vehicle: '🏍️ Yamaha Crux',
      totalDeliveries: 8,
      completed: 7,
      inProgress: 1,
      pending: 0,
      cashCollected: 78000,
      isOnline: true
    },
    {
      id: 'cour-dieudonne',
      name: 'Dieudonné Abega',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
      phone: '+237 691 33 22 11',
      whatsapp: '+237 691 33 22 11',
      zone: 'Interurbain - Bafoussam & Ouest',
      city: 'Bafoussam',
      vehicle: '🚐 Camionnette Hiace',
      totalDeliveries: 5,
      completed: 3,
      inProgress: 1,
      pending: 1,
      cashCollected: 235000,
      isOnline: true
    }
  ];

  // Initial delivery missions
  const initialMissions: DeliveryMission[] = [
    {
      id: 'mis-01',
      orderId: 'ord-10482',
      trackingNumber: 'IFM-10482',
      customerName: 'Carine Etoa',
      customerPhone: '+237 677 88 99 00',
      whatsappPhone: '+237 677 88 99 00',
      city: 'Yaoundé',
      neighborhood: 'Bastos (Face Ambassade de Belgique)',
      addressNote: 'Portail vert, sonnette à droite',
      itemsSummary: '1x Lampe Solaire LED 100W + 1x Écouteurs TWS Pro',
      totalToCollect: 24500,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pay_on_delivery',
      deliveryFee: 1500,
      status: 'in_route',
      assignedCourierId: 'cour-jean',
      assignedCourierName: 'Jean',
      orderTime: '13:45',
      estimatedDeliveryTime: '14:30 - 15:00',
      isDelayed: false,
      notes: 'Appeler dès l\'arrivée à Bastos'
    },
    {
      id: 'mis-02',
      orderId: 'ord-10484',
      trackingNumber: 'IFM-10484',
      customerName: 'Marcelle Nguemo',
      customerPhone: '+237 670 11 99 88',
      whatsappPhone: '+237 670 11 99 88',
      city: 'Yaoundé',
      neighborhood: 'Mendong (Entrée Simbock)',
      addressNote: 'Près de l\'école primaire publique',
      itemsSummary: '2x Panneau Solaire Monocristallin 200W',
      totalToCollect: 34000,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pay_on_delivery',
      deliveryFee: 2000,
      status: 'to_assign',
      assignedCourierId: null,
      assignedCourierName: null,
      orderTime: '14:10',
      estimatedDeliveryTime: 'Attente affectation',
      isDelayed: false
    },
    {
      id: 'mis-03',
      orderId: 'ord-10485',
      trackingNumber: 'IFM-10485',
      customerName: 'David Kotto',
      customerPhone: '+237 699 22 44 66',
      whatsappPhone: '+237 699 22 44 66',
      city: 'Douala',
      neighborhood: 'Bonanjo (Face Direction Douanes)',
      addressNote: 'Immeuble Le Balafon, 3ème étage',
      itemsSummary: '1x Kit Énergie Solaire 500W Hybride',
      totalToCollect: 50000,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pay_on_delivery',
      deliveryFee: 1500,
      status: 'to_assign',
      assignedCourierId: null,
      assignedCourierName: null,
      orderTime: '14:15',
      estimatedDeliveryTime: 'Attente affectation',
      isDelayed: false
    },
    {
      id: 'mis-04',
      orderId: 'ord-10486',
      trackingNumber: 'IFM-10486',
      customerName: 'Sandra Bikoula',
      customerPhone: '+237 673 88 44 22',
      whatsappPhone: '+237 673 88 44 22',
      city: 'Yaoundé',
      neighborhood: 'Omnisports (Carrefour Mtn)',
      addressNote: 'Boutique prêt-à-porter en face de la pharmacie',
      itemsSummary: '1x AirFryer 6L Multifonction Sans Huile',
      totalToCollect: 16500,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pay_on_delivery',
      deliveryFee: 1500,
      status: 'to_assign',
      assignedCourierId: null,
      assignedCourierName: null,
      orderTime: '14:22',
      estimatedDeliveryTime: 'Attente affectation',
      isDelayed: false
    },
    {
      id: 'mis-05',
      orderId: 'ord-10487',
      trackingNumber: 'IFM-10487',
      customerName: 'Paul Kenmoe',
      customerPhone: '+237 655 12 34 99',
      whatsappPhone: '+237 655 12 34 99',
      city: 'Douala',
      neighborhood: 'Akwa (Rue Pau)',
      addressNote: 'Face Galerie Mam',
      itemsSummary: '1x Friteuse AirFryer + 1x Lampe Solaire',
      totalToCollect: 29900,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pay_on_delivery',
      deliveryFee: 1500,
      status: 'to_assign',
      assignedCourierId: null,
      assignedCourierName: null,
      orderTime: '14:28',
      estimatedDeliveryTime: 'Attente affectation',
      isDelayed: false
    },
    {
      id: 'mis-06',
      orderId: 'ord-10488',
      trackingNumber: 'IFM-10488',
      customerName: 'Nathalie Biya',
      customerPhone: '+237 670 99 88 77',
      whatsappPhone: '+237 670 99 88 77',
      city: 'Yaoundé',
      neighborhood: 'Mvan (Descente complexe)',
      addressNote: 'Deuxième portail noir après le complexe',
      itemsSummary: '1x Mixeur Plongeant 4-en-1',
      totalToCollect: 18500,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pay_on_delivery',
      deliveryFee: 1000,
      status: 'to_assign',
      assignedCourierId: null,
      assignedCourierName: null,
      orderTime: '14:35',
      estimatedDeliveryTime: 'Attente affectation',
      isDelayed: false
    },
    {
      id: 'mis-07',
      orderId: 'ord-10476',
      trackingNumber: 'IFM-10476',
      customerName: 'Patrice Noah',
      customerPhone: '+237 671 44 55 66',
      whatsappPhone: '+237 671 44 55 66',
      city: 'Yaoundé',
      neighborhood: 'Nlongkak (Rond-point)',
      addressNote: 'Boutique orange',
      itemsSummary: 'Projecteur Solaire 200W',
      totalToCollect: 22000,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pay_on_delivery',
      deliveryFee: 1500,
      status: 'in_route',
      assignedCourierId: 'cour-jean',
      assignedCourierName: 'Jean',
      orderTime: '13:10',
      estimatedDeliveryTime: '14:00 (En retard de 25 min)',
      isDelayed: true
    },
    {
      id: 'mis-08',
      orderId: 'ord-10475',
      trackingNumber: 'IFM-10475',
      customerName: 'Béatrice Manga',
      customerPhone: '+237 675 44 33 22',
      whatsappPhone: '+237 675 44 33 22',
      city: 'Douala',
      neighborhood: 'Akwa Nord',
      addressNote: 'Entrée école maternelle',
      itemsSummary: 'AirFryer 6L',
      totalToCollect: 45000,
      paymentMethod: 'orange_money',
      paymentStatus: 'paid',
      deliveryFee: 1500,
      status: 'in_route',
      assignedCourierId: 'cour-boris',
      assignedCourierName: 'Boris Ekani',
      orderTime: '13:00',
      estimatedDeliveryTime: '13:50 (En retard de 35 min)',
      isDelayed: true
    },
    {
      id: 'mis-09',
      orderId: 'ord-10477',
      trackingNumber: 'IFM-10477',
      customerName: 'Hervé Bell',
      customerPhone: '+237 690 33 22 11',
      whatsappPhone: '+237 690 33 22 11',
      city: 'Douala',
      neighborhood: 'New Bell (Bamiléké)',
      addressNote: 'Face pharmacie New Bell',
      itemsSummary: 'Kit Écouteurs Pro',
      totalToCollect: 18000,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pay_on_delivery',
      deliveryFee: 1500,
      status: 'failed',
      assignedCourierId: 'cour-boris',
      assignedCourierName: 'Boris Ekani',
      orderTime: '12:30',
      estimatedDeliveryTime: 'Échoué à 13:40',
      failReason: 'Client injoignable après 4 appels moto'
    },
    {
      id: 'mis-10',
      orderId: 'ord-10470',
      trackingNumber: 'IFM-10470',
      customerName: 'Christophe Ebode',
      customerPhone: '+237 678 99 00 11',
      whatsappPhone: '+237 678 99 00 11',
      city: 'Yaoundé',
      neighborhood: 'Biyem-Assi (Carrefour Acacia)',
      addressNote: 'Maison blanche portail noir',
      itemsSummary: 'Batterie Solaire LiFePO4',
      totalToCollect: 85000,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pay_on_delivery',
      deliveryFee: 2000,
      status: 'to_reschedule',
      assignedCourierId: null,
      assignedCourierName: null,
      orderTime: '11:15',
      estimatedDeliveryTime: 'À reprogrammer demain matin',
      failReason: 'Client indisponible aujourd\'hui'
    },
    {
      id: 'mis-11',
      orderId: 'ord-10480',
      trackingNumber: 'IFM-10480',
      customerName: 'Sophie Meka',
      customerPhone: '+237 674 55 66 77',
      whatsappPhone: '+237 674 55 66 77',
      city: 'Yaoundé',
      neighborhood: 'Mvan (Descente complexe)',
      addressNote: 'Boutique face complexe',
      itemsSummary: '2x Kit Énergie Solaire 500W',
      totalToCollect: 32000,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'paid',
      deliveryFee: 1000,
      status: 'delivered',
      assignedCourierId: 'cour-arsene',
      assignedCourierName: 'Arsène Mbida',
      orderTime: '10:45',
      estimatedDeliveryTime: 'Livré à 11:30'
    }
  ];

  // States
  const [missions, setMissions] = useState<DeliveryMission[]>(initialMissions);
  const [couriers, setCouriers] = useState<CourierWorkload[]>(initialCouriers);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [activeMissionId, setActiveMissionId] = useState<string>('mis-01');

  // Filters state
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [courierFilter, setCourierFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('today');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Top KPIs calculations
  const kpiToAssign = missions.filter(m => m.status === 'to_assign').length;
  const kpiAssigned = missions.filter(m => m.status === 'assigned').length;
  const kpiInRoute = missions.filter(m => m.status === 'in_route').length;
  const kpiDeliveredToday = missions.filter(m => m.status === 'delivered').length;
  const kpiFailed = missions.filter(m => m.status === 'failed').length;
  const kpiToReschedule = missions.filter(m => m.status === 'to_reschedule').length;

  // Selected mission object for RIGHT column
  const activeMission = useMemo(() => {
    return missions.find(m => m.id === activeMissionId) || missions[0];
  }, [missions, activeMissionId]);

  // Filtered orders list for LEFT column
  const filteredMissions = useMemo(() => {
    return missions.filter(mission => {
      if (cityFilter !== 'all' && mission.city.toLowerCase() !== cityFilter.toLowerCase()) return false;
      if (zoneFilter !== 'all' && !mission.neighborhood.toLowerCase().includes(zoneFilter.toLowerCase())) return false;
      if (courierFilter !== 'all' && mission.assignedCourierId !== courierFilter) return false;
      if (statusFilter !== 'all' && mission.status !== statusFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTracking = mission.trackingNumber.toLowerCase().includes(q);
        const matchCustomer = mission.customerName.toLowerCase().includes(q);
        const matchPhone = mission.customerPhone.includes(q);
        const matchNeighborhood = mission.neighborhood.toLowerCase().includes(q);
        if (!matchTracking && !matchCustomer && !matchPhone && !matchNeighborhood) return false;
      }
      return true;
    });
  }, [missions, cityFilter, zoneFilter, courierFilter, statusFilter, searchQuery]);

  // Multi-select handling
  const handleToggleSelectOrder = (id: string) => {
    if (selectedOrderIds.includes(id)) {
      setSelectedOrderIds(selectedOrderIds.filter(item => item !== id));
    } else {
      setSelectedOrderIds([...selectedOrderIds, id]);
    }
  };

  const handleSelectAllToAssign = () => {
    const toAssignIds = filteredMissions.filter(m => m.status === 'to_assign').map(m => m.id);
    if (selectedOrderIds.length === toAssignIds.length && toAssignIds.length > 0) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(toAssignIds);
    }
  };

  // Assign selected orders to a specific courier
  const handleAssignToCourier = (courier: CourierWorkload) => {
    if (selectedOrderIds.length === 0) {
      addToast('Veuillez d\'abord cocher au moins une commande à affecter.', 'info');
      return;
    }

    const assignedCount = selectedOrderIds.length;

    // Update missions
    setMissions(prev =>
      prev.map(m => {
        if (selectedOrderIds.includes(m.id)) {
          return {
            ...m,
            status: 'in_route',
            assignedCourierId: courier.id,
            assignedCourierName: courier.name,
            estimatedDeliveryTime: 'Départ imminent en tournée'
          };
        }
        return m;
      })
    );

    // Update courier workload
    setCouriers(prev =>
      prev.map(c => {
        if (c.id === courier.id) {
          return {
            ...c,
            totalDeliveries: c.totalDeliveries + assignedCount,
            inProgress: c.inProgress + assignedCount
          };
        }
        return c;
      })
    );

    setSelectedOrderIds([]);
    addToast(`${assignedCount} commande(s) assignée(s) à ${courier.name} avec succès !`, 'success');
  };

  // Change individual order status in RIGHT column
  const handleUpdateMissionStatus = (missionId: string, newStatus: DeliveryMission['status']) => {
    setMissions(prev =>
      prev.map(m => (m.id === missionId ? { ...m, status: newStatus } : m))
    );
    addToast(`Statut de la livraison #${activeMission.trackingNumber} mis à jour.`, 'info');
  };

  // Quick Open WhatsApp
  const handleOpenWhatsApp = (num: string, name: string) => {
    const cleanNum = num.replace(/[\s\-\+\(\)]/g, '');
    const message = encodeURIComponent(`Bonjour ${name}, de la part de la régie de livraison IFPTIE Market concernant votre colis.`);
    window.open(`https://wa.me/${cleanNum}?text=${message}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100%', padding: '24px 28px 80px', color: '#f8fafc' }}>
      {/* 1. CONTROL ROOM TOP HEADER */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: '#0b5738',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#34d399',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
          }}>
            <Radio size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
                Centre de livraison
              </h1>
              <span style={{
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                fontSize: '0.6875rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '6px',
                letterSpacing: '0.5px'
              }}>
                SALLE DE CONTRÔLE OPÉRATIONNELLE • LIVE
              </span>
            </div>
            <p style={{ margin: '3px 0 0', color: '#94a3b8', fontSize: '0.8125rem' }}>
              Dispatching des tournées moto, supervision des coursiers et résolution des incidents de livraison en temps réel.
            </p>
          </div>
        </div>

        {/* Live Pulse Ticker */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid #334155',
          padding: '8px 14px',
          borderRadius: '10px',
          fontSize: '0.75rem',
          color: '#cbd5e1'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
          <span>Hub Mvan & Akwa connectés</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ color: '#38bdf8', fontWeight: 700 }}>5 coursiers géolocalisés</span>
        </div>
      </div>

      {/* 2. SPECIFIED ALERTS TICKER (Alerts as requested by prompt) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {/* Alert 1: 5 commandes non affectées */}
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          borderRadius: '12px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f87171',
            flexShrink: 0
          }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#fca5a5' }}>
              🚨 5 commandes non affectées
            </div>
            <div style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '1px' }}>
              Colis emballés à Mvan & Akwa en attente de coursier moto.
            </div>
          </div>
        </div>

        {/* Alert 2: 3 livraisons en retard */}
        <div style={{
          backgroundColor: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: '12px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: 'rgba(245, 158, 11, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fbbf24',
            flexShrink: 0
          }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#fde68a' }}>
              ⚠️ 3 livraisons en retard
            </div>
            <div style={{ fontSize: '0.75rem', color: '#fbbf24', marginTop: '1px' }}>
              Dépassement du créneau promis (+20 min) à Nlongkak & Akwa.
            </div>
          </div>
        </div>

        {/* Alert 3: 2 clients injoignables */}
        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.12)',
          border: '1px solid rgba(139, 92, 246, 0.35)',
          borderRadius: '12px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: 'rgba(139, 92, 246, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#c084fc',
            flexShrink: 0
          }}>
            <Phone size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ddd6fe' }}>
              📵 2 clients injoignables
            </div>
            <div style={{ fontSize: '0.75rem', color: '#c084fc', marginTop: '1px' }}>
              Livreurs sur place sans réponse (relance WhatsApp en cours).
            </div>
          </div>
        </div>
      </div>

      {/* 3. SPECIFIED TOP KPIS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {/* À affecter */}
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>À AFFECTER</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f87171', marginTop: '4px' }}>{kpiToAssign}</div>
          <div style={{ fontSize: '0.6875rem', color: '#ef4444', marginTop: '2px' }}>Urgence répartition</div>
        </div>

        {/* Affectées */}
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>AFFECTÉES</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#38bdf8', marginTop: '4px' }}>{kpiAssigned}</div>
          <div style={{ fontSize: '0.6875rem', color: '#0284c7', marginTop: '2px' }}>Prêtes en entrepôt</div>
        </div>

        {/* En route */}
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>EN ROUTE</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fbbf24', marginTop: '4px' }}>{kpiInRoute}</div>
          <div style={{ fontSize: '0.6875rem', color: '#f59e0b', marginTop: '2px' }}>Motos en circulation</div>
        </div>

        {/* Livrées aujourd'hui */}
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>LIVRÉES AUJOURD'HUI</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#34d399', marginTop: '4px' }}>{kpiDeliveredToday}</div>
          <div style={{ fontSize: '0.6875rem', color: '#10b981', marginTop: '2px' }}>Encaissées avec succès</div>
        </div>

        {/* Échecs */}
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>ÉCHECS</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f87171', marginTop: '4px' }}>{kpiFailed}</div>
          <div style={{ fontSize: '0.6875rem', color: '#ef4444', marginTop: '2px' }}>Non remises au client</div>
        </div>

        {/* À reprogrammer */}
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>À REPROGRAMMER</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#c084fc', marginTop: '4px' }}>{kpiToReschedule}</div>
          <div style={{ fontSize: '0.6875rem', color: '#a855f7', marginTop: '2px' }}>Retour entrepôt</div>
        </div>
      </div>

      {/* 4. SPECIFIED FILTERS BAR (City, Zone, Courier, Status, Date) */}
      <div style={{
        backgroundColor: '#1e293b',
        borderRadius: '14px',
        padding: '14px 18px',
        border: '1px solid #334155',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', flex: 1 }}>
          {/* City filter */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#0f172a',
              border: '1px solid #475569',
              color: '#ffffff',
              fontSize: '0.8125rem',
              outline: 'none',
              fontWeight: 600
            }}
          >
            <option value="all">Toutes les Villes</option>
            <option value="Yaoundé">Yaoundé</option>
            <option value="Douala">Douala</option>
            <option value="Bafoussam">Bafoussam</option>
          </select>

          {/* Zone filter */}
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#0f172a',
              border: '1px solid #475569',
              color: '#ffffff',
              fontSize: '0.8125rem',
              outline: 'none',
              fontWeight: 600
            }}
          >
            <option value="all">Toutes les Zones / Quartiers</option>
            <option value="Bastos">Bastos</option>
            <option value="Mvan">Mvan</option>
            <option value="Akwa">Akwa</option>
            <option value="Bonanjo">Bonanjo</option>
            <option value="Mendong">Mendong</option>
          </select>

          {/* Courier filter */}
          <select
            value={courierFilter}
            onChange={(e) => setCourierFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#0f172a',
              border: '1px solid #475569',
              color: '#ffffff',
              fontSize: '0.8125rem',
              outline: 'none',
              fontWeight: 600
            }}
          >
            <option value="all">Tous les Livreurs</option>
            {couriers.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.zone})</option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#0f172a',
              border: '1px solid #475569',
              color: '#ffffff',
              fontSize: '0.8125rem',
              outline: 'none',
              fontWeight: 600
            }}
          >
            <option value="all">Tous les Statuts</option>
            <option value="to_assign">À affecter</option>
            <option value="in_route">En route</option>
            <option value="delivered">Livrées</option>
            <option value="failed">Échecs</option>
            <option value="to_reschedule">À reprogrammer</option>
          </select>

          {/* Date filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#0f172a',
              border: '1px solid #475569',
              color: '#ffffff',
              fontSize: '0.8125rem',
              outline: 'none',
              fontWeight: 600
            }}
          >
            <option value="today">Aujourd'hui</option>
            <option value="yesterday">Hier</option>
            <option value="week">Cette semaine</option>
          </select>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#0f172a',
          border: '1px solid #475569',
          borderRadius: '8px',
          padding: '6px 12px',
          minWidth: '220px'
        }}>
          <Search size={14} color="#94a3b8" />
          <input
            type="text"
            placeholder="Rechercher commande, client, quartier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              outline: 'none',
              fontSize: '0.8125rem',
              color: '#ffffff',
              width: '100%'
            }}
          />
        </div>
      </div>

      {/* 5. MAIN 3-COLUMN VIEW: LEFT (Orders) | CENTER (Couriers Workload) | RIGHT (Selected Details) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr 1.2fr',
        gap: '18px',
        alignItems: 'start'
      }}>
        {/* ===================== LEFT COLUMN: LIST OF ORDERS REQUIRING DELIVERY ===================== */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          border: '1px solid #334155',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '740px'
        }}>
          {/* Column Header */}
          <div style={{
            padding: '16px 18px',
            borderBottom: '1px solid #334155',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={18} color="#38bdf8" />
              <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 900, color: '#ffffff' }}>
                Commandes à Livrer ({filteredMissions.length})
              </h3>
            </div>
            <button
              onClick={handleSelectAllToAssign}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#38bdf8',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                padding: 0
              }}
            >
              {selectedOrderIds.length > 0 ? 'Désélectionner tout' : 'Sélectionner non affectées'}
            </button>
          </div>

          {/* Batch Assignment Action Bar if orders are checked */}
          {selectedOrderIds.length > 0 && (
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#34d399' }}>
                ✓ {selectedOrderIds.length} commande(s) sélectionnée(s)
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                👉 Cliquez sur un livreur au centre pour affecter
              </span>
            </div>
          )}

          {/* Orders Scrollable List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredMissions.map((mission) => {
              const isSelected = activeMissionId === mission.id;
              const isChecked = selectedOrderIds.includes(mission.id);

              return (
                <div
                  key={mission.id}
                  onClick={() => setActiveMissionId(mission.id)}
                  style={{
                    backgroundColor: isSelected ? 'rgba(30, 41, 59, 0.9)' : '#0f172a',
                    border: isSelected ? '2px solid #38bdf8' : '1px solid #334155',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleSelectOrder(mission.id);
                        }}
                        style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#0b5738' }}
                      />
                      <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#38bdf8', fontSize: '0.8125rem' }}>
                        #{mission.trackingNumber}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: '6px',
                      backgroundColor:
                        mission.status === 'to_assign'
                          ? 'rgba(239, 68, 68, 0.2)'
                          : mission.status === 'in_route'
                          ? 'rgba(245, 158, 11, 0.2)'
                          : mission.status === 'delivered'
                          ? 'rgba(16, 185, 129, 0.2)'
                          : 'rgba(168, 85, 247, 0.2)',
                      color:
                        mission.status === 'to_assign'
                          ? '#f87171'
                          : mission.status === 'in_route'
                          ? '#fbbf24'
                          : mission.status === 'delivered'
                          ? '#34d399'
                          : '#c084fc'
                    }}>
                      {mission.status === 'to_assign' ? 'À affecter' : mission.status === 'in_route' ? 'En route' : mission.status === 'delivered' ? 'Livré' : 'À reprogrammer'}
                    </span>
                  </div>

                  {/* Customer & Address */}
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
                    {mission.customerName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                    <MapPin size={12} color="#64748b" />
                    <span>{mission.city} • {mission.neighborhood}</span>
                  </div>

                  {/* Cash to collect & assigned courier info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '6px',
                    borderTop: '1px solid #1e293b',
                    fontSize: '0.75rem'
                  }}>
                    <span style={{ fontWeight: 800, color: '#34d399' }}>
                      {formatFCFA(mission.totalToCollect)}
                    </span>

                    {mission.assignedCourierName ? (
                      <span style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Bike size={12} color="#38bdf8" />
                        {mission.assignedCourierName}
                      </span>
                    ) : (
                      <span style={{ color: '#f87171', fontWeight: 700 }}>
                        Non assigné
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================== CENTER COLUMN: COURIER WORKLOAD ===================== */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          border: '1px solid #334155',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '740px'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 18px',
            borderBottom: '1px solid #334155',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bike size={18} color="#34d399" />
              <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 900, color: '#ffffff' }}>
                Charge des Coursiers ({couriers.length})
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Capacités en direct
            </span>
          </div>

          {/* Courier Workload Cards (Matching specified example format) */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {couriers.map((courier) => {
              const progressPercent = courier.totalDeliveries > 0 
                ? Math.round((courier.completed / courier.totalDeliveries) * 100) 
                : 0;

              return (
                <div
                  key={courier.id}
                  style={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    position: 'relative'
                  }}
                >
                  {/* Courier Header: Name, Avatar, Vehicle, Zone */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={courier.avatar}
                        alt=""
                        style={{ width: '38px', height: '38px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 900, color: '#ffffff', fontSize: '0.9375rem' }}>
                          {courier.name}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                          {courier.vehicle} • {courier.zone}
                        </div>
                      </div>
                    </div>

                    {/* Quick Call / WhatsApp */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => handleOpenWhatsApp(courier.whatsapp, courier.name)}
                        title="WhatsApp"
                        style={{
                          backgroundColor: '#25D366',
                          border: 'none',
                          color: 'white',
                          borderRadius: '6px',
                          padding: '4px 6px',
                          cursor: 'pointer'
                        }}
                      >
                        <MessageSquare size={12} />
                      </button>
                      <a
                        href={`tel:${courier.phone}`}
                        title="Appeler"
                        style={{
                          backgroundColor: '#334155',
                          border: 'none',
                          color: 'white',
                          borderRadius: '6px',
                          padding: '4px 6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Phone size={12} />
                      </a>
                    </div>
                  </div>

                  {/* Workload Metric Chips (Matching prompt: deliveries, completed, in progress, pending) */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '6px',
                    backgroundColor: '#1e293b',
                    padding: '8px',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.625rem', color: '#94a3b8', fontWeight: 700 }}>TOTAL</div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#ffffff' }}>
                        {courier.totalDeliveries}
                      </div>
                      <div style={{ fontSize: '0.5625rem', color: '#64748b' }}>deliveries</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.625rem', color: '#34d399', fontWeight: 700 }}>LIVRÉES</div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#34d399' }}>
                        {courier.completed}
                      </div>
                      <div style={{ fontSize: '0.5625rem', color: '#10b981' }}>completed</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.625rem', color: '#fbbf24', fontWeight: 700 }}>EN COURS</div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#fbbf24' }}>
                        {courier.inProgress}
                      </div>
                      <div style={{ fontSize: '0.5625rem', color: '#f59e0b' }}>in progress</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.625rem', color: '#f87171', fontWeight: 700 }}>ATTENTE</div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#f87171' }}>
                        {courier.pending}
                      </div>
                      <div style={{ fontSize: '0.5625rem', color: '#ef4444' }}>pending</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#94a3b8', marginBottom: '4px' }}>
                      <span>Taux d'avancement tournée</span>
                      <span style={{ color: '#34d399', fontWeight: 800 }}>{progressPercent}%</span>
                    </div>
                    <div style={{ width: '100%', height: '5px', backgroundColor: '#334155', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#10b981', borderRadius: '3px' }} />
                    </div>
                  </div>

                  {/* Quick Assign Action Button */}
                  <button
                    onClick={() => handleAssignToCourier(courier)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: selectedOrderIds.length > 0 ? '#0b5738' : '#1e293b',
                      border: selectedOrderIds.length > 0 ? '1px solid #10b981' : '1px solid #334155',
                      borderRadius: '8px',
                      color: selectedOrderIds.length > 0 ? '#ffffff' : '#94a3b8',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <ArrowRight size={14} />
                    {selectedOrderIds.length > 0
                      ? `Assigner ${selectedOrderIds.length} commande(s) à ${courier.name}`
                      : `Assigner la sélection à ${courier.name}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================== RIGHT COLUMN: SELECTED DELIVERY DETAILS ===================== */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          border: '1px solid #334155',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '740px'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 18px',
            borderBottom: '1px solid #334155',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Navigation size={18} color="#f59e0b" />
              <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 900, color: '#ffffff' }}>
                Fiche Livraison #{activeMission.trackingNumber}
              </h3>
            </div>
            <button
              onClick={() => {
                setActiveTrackingNumber(activeMission.trackingNumber);
                setActiveView('tracking');
              }}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#38bdf8',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Suivi Coursier ↗
            </button>
          </div>

          {/* Details Scrollable Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Status & Timing Banner */}
            <div style={{
              backgroundColor: '#0f172a',
              borderRadius: '12px',
              padding: '14px',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>STATUT DE LA COURSE</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', marginTop: '2px' }}>
                  {activeMission.status === 'to_assign' ? 'À Affecter' : activeMission.status === 'in_route' ? 'En Route 🏍️' : activeMission.status === 'delivered' ? 'Livrée ✓' : 'Incident / Reprogrammation'}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>DÉLAI ESTIMÉ</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: activeMission.isDelayed ? '#f87171' : '#34d399', marginTop: '2px' }}>
                  {activeMission.estimatedDeliveryTime}
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '14px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Client & Coordonnées
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#ffffff' }}>
                {activeMission.customerName}
              </div>
              <div style={{ fontSize: '0.8125rem', fontFamily: 'monospace', color: '#cbd5e1', marginTop: '2px' }}>
                {activeMission.customerPhone}
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  onClick={() => handleOpenWhatsApp(activeMission.whatsappPhone, activeMission.customerName)}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: '6px',
                    backgroundColor: '#25D366',
                    color: 'white',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <MessageSquare size={13} />
                  WhatsApp
                </button>
                <a
                  href={`tel:${activeMission.customerPhone}`}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: '6px',
                    backgroundColor: '#334155',
                    color: 'white',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Phone size={13} />
                  Appeler
                </a>
              </div>
            </div>

            {/* Destination & Itinerary */}
            <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '14px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Destination & Repères
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff' }}>
                {activeMission.city} — {activeMission.neighborhood}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                Indication : {activeMission.addressNote}
              </div>
            </div>

            {/* Order Items & Cash Collection */}
            <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '14px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Colis & Encaissement
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#ffffff', marginBottom: '8px' }}>
                {activeMission.itemsSummary}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid #1e293b'
              }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Montant à encaisser :</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 900, color: '#34d399' }}>
                  {formatFCFA(activeMission.totalToCollect)}
                </span>
              </div>
            </div>

            {/* Assigned Courier & Reassignment Controls */}
            <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '14px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Affectation Coursier
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8125rem', color: '#ffffff' }}>
                  {activeMission.assignedCourierName ? `Attribué à : ${activeMission.assignedCourierName}` : 'Non affecté'}
                </span>
              </div>

              {/* Status Update Quick Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <button
                  onClick={() => handleUpdateMissionStatus(activeMission.id, 'in_route')}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                    color: '#fbbf24',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Marquer En Route
                </button>
                <button
                  onClick={() => handleUpdateMissionStatus(activeMission.id, 'delivered')}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    color: '#34d399',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Confirmer Livré
                </button>
                <button
                  onClick={() => handleUpdateMissionStatus(activeMission.id, 'failed')}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    color: '#f87171',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Signaler Échec
                </button>
                <button
                  onClick={() => handleUpdateMissionStatus(activeMission.id, 'to_reschedule')}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #a855f7',
                    backgroundColor: 'rgba(168, 85, 247, 0.2)',
                    color: '#c084fc',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Reprogrammer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
