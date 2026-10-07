import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import {
  MapPin,
  Navigation,
  Compass,
  Clock,
  DollarSign,
  Bike,
  Truck,
  Building2,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  SlidersHorizontal,
  Layers,
  Globe,
  Search,
  Power,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Radio,
  Download,
  Flame,
  Calendar
} from 'lucide-react';

export interface DeliveryZone {
  id: string;
  name: string;
  cityId: string;
  deliveryFee: number; // in FCFA
  estimatedDeliveryTime: string; // e.g. "30-45 min"
  availableCouriers: number;
  isActive: boolean;
  tier: 'express' | 'standard' | 'regional';
  notes?: string;
}

export interface DeliveryCity {
  id: string;
  name: string;
  region: string;
  corridor: string;
  code: string;
  baseWarehouse: string;
  isMainHub: boolean;
  transitDelayFromHub: string;
  zones: DeliveryZone[];
}

export const AdminDeliveryZonesView: React.FC = () => {
  const { addToast } = useStore();

  // Initial cities & zones structured around Cameroon logistical realities
  const initialCities: DeliveryCity[] = [
    {
      id: 'city-yde',
      name: 'Yaoundé',
      region: 'Centre',
      corridor: 'Corridor Capitale & Sud',
      code: 'YDE',
      baseWarehouse: 'Entrepôt Central Mvan Aérodrome',
      isMainHub: true,
      transitDelayFromHub: 'Hub Principal (Stock Direct)',
      zones: [
        {
          id: 'zone-yde-01',
          name: 'Bastos & Dragages',
          cityId: 'city-yde',
          deliveryFee: 1500,
          estimatedDeliveryTime: '30-45 min',
          availableCouriers: 4,
          isActive: true,
          tier: 'express',
          notes: 'Zone prioritaire ambassades & résidences.'
        },
        {
          id: 'zone-yde-02',
          name: 'Mvan, Aérodrome & Messamendongo',
          cityId: 'city-yde',
          deliveryFee: 1000,
          estimatedDeliveryTime: '25-35 min',
          availableCouriers: 3,
          isActive: true,
          tier: 'express',
          notes: 'Proche entrepôt logistique principal.'
        },
        {
          id: 'zone-yde-03',
          name: 'Centre-ville, Poste Centrale & Hippodrome',
          cityId: 'city-yde',
          deliveryFee: 1000,
          estimatedDeliveryTime: '30-45 min',
          availableCouriers: 4,
          isActive: true,
          tier: 'express',
          notes: 'Bureaux administratifs & ministères.'
        },
        {
          id: 'zone-yde-04',
          name: 'Omnisports, Essos & Ngoa-Ekelle',
          cityId: 'city-yde',
          deliveryFee: 1500,
          estimatedDeliveryTime: '45-60 min',
          availableCouriers: 3,
          isActive: true,
          tier: 'standard',
          notes: 'Zone universitaire & commerciale.'
        },
        {
          id: 'zone-yde-05',
          name: 'Mendong, Biyem-Assi & Simbock',
          cityId: 'city-yde',
          deliveryFee: 2000,
          estimatedDeliveryTime: '60-90 min',
          availableCouriers: 2,
          isActive: true,
          tier: 'standard',
          notes: 'Pente et circulation dense en fin d\'après-midi.'
        },
        {
          id: 'zone-yde-06',
          name: 'Nkoabang, Olembe & Périphérie',
          cityId: 'city-yde',
          deliveryFee: 2500,
          estimatedDeliveryTime: '90-120 min',
          availableCouriers: 1,
          isActive: true,
          tier: 'regional',
          notes: 'Zone périphérique extérieure.'
        }
      ]
    },
    {
      id: 'city-dla',
      name: 'Douala',
      region: 'Littoral',
      corridor: 'Corridor Portuaire & Ouest',
      code: 'DLA',
      baseWarehouse: 'Entrepôt Akwa Nord (Boulevard Liberté)',
      isMainHub: true,
      transitDelayFromHub: 'Hub Principal (Stock Arrivage Port)',
      zones: [
        {
          id: 'zone-dla-01',
          name: 'Akwa, Bonanjo & Bali',
          cityId: 'city-dla',
          deliveryFee: 1500,
          estimatedDeliveryTime: '30-45 min',
          availableCouriers: 5,
          isActive: true,
          tier: 'express',
          notes: 'Cœur financier et portuaire.'
        },
        {
          id: 'zone-dla-02',
          name: 'Bonamoussadi, Makepe & Kotto',
          cityId: 'city-dla',
          deliveryFee: 1500,
          estimatedDeliveryTime: '45-60 min',
          availableCouriers: 4,
          isActive: true,
          tier: 'express',
          notes: 'Forte concentration résidentielle.'
        },
        {
          id: 'zone-dla-03',
          name: 'Deido, Bepanda & Cité des Palmiers',
          cityId: 'city-dla',
          deliveryFee: 1500,
          estimatedDeliveryTime: '45-60 min',
          availableCouriers: 3,
          isActive: true,
          tier: 'standard',
          notes: 'Marché central Deido & axes populaires.'
        },
        {
          id: 'zone-dla-04',
          name: 'Ndokoti, Bassa & Zone Industrielle',
          cityId: 'city-dla',
          deliveryFee: 2000,
          estimatedDeliveryTime: '60-90 min',
          availableCouriers: 2,
          isActive: true,
          tier: 'standard',
          notes: 'Embouteillages fréquents au carrefour Ndokoti.'
        },
        {
          id: 'zone-dla-05',
          name: 'Bonabéri (Poste, Rail & Zone Nord)',
          cityId: 'city-dla',
          deliveryFee: 2500,
          estimatedDeliveryTime: '60-90 min',
          availableCouriers: 2,
          isActive: true,
          tier: 'regional',
          notes: 'Passage du pont du Wouri (moto express dédiée).'
        }
      ]
    },
    {
      id: 'city-bfm',
      name: 'Bafoussam',
      region: 'Ouest',
      corridor: 'Corridor Hauts-Plateaux',
      code: 'BFM',
      baseWarehouse: 'Relais Marché B Bafoussam',
      isMainHub: false,
      transitDelayFromHub: '24h depuis Douala / Yaoundé',
      zones: [
        {
          id: 'zone-bfm-01',
          name: 'Djeleng, Marché B & Centre Urbain',
          cityId: 'city-bfm',
          deliveryFee: 1500,
          estimatedDeliveryTime: '45-60 min',
          availableCouriers: 2,
          isActive: true,
          tier: 'express',
          notes: 'Livraison moto locale rapide.'
        },
        {
          id: 'zone-bfm-02',
          name: 'Tamdja, Évêché & Socada',
          cityId: 'city-bfm',
          deliveryFee: 2000,
          estimatedDeliveryTime: '60-80 min',
          availableCouriers: 1,
          isActive: true,
          tier: 'standard',
          notes: 'Secteurs vallonnés.'
        },
        {
          id: 'zone-bfm-03',
          name: 'Expédition Agence Ouest (Général / Buca)',
          cityId: 'city-bfm',
          deliveryFee: 2500,
          estimatedDeliveryTime: '24h en Agence',
          availableCouriers: 2,
          isActive: true,
          tier: 'regional',
          notes: 'Dépôt colis en agence de voyage partenaire.'
        }
      ]
    },
    {
      id: 'city-bda',
      name: 'Bamenda',
      region: 'Nord-Ouest',
      corridor: 'Corridor Nord-Ouest',
      code: 'BDA',
      baseWarehouse: 'Relais Commercial Avenue Bamenda',
      isMainHub: false,
      transitDelayFromHub: '24h à 48h depuis Bafoussam',
      zones: [
        {
          id: 'zone-bda-01',
          name: 'Commercial Avenue, Up Station & Old Town',
          cityId: 'city-bda',
          deliveryFee: 2000,
          estimatedDeliveryTime: '60-90 min',
          availableCouriers: 2,
          isActive: true,
          tier: 'express',
          notes: 'Zone commerciale sécurisée.'
        },
        {
          id: 'zone-bda-02',
          name: 'Nkwen & Mile 4',
          cityId: 'city-bda',
          deliveryFee: 2500,
          estimatedDeliveryTime: '90-120 min',
          availableCouriers: 1,
          isActive: true,
          tier: 'standard',
          notes: 'Zone périphérique Nkwen.'
        },
        {
          id: 'zone-bda-03',
          name: 'Expédition Agence Amour Mezam',
          cityId: 'city-bda',
          deliveryFee: 3000,
          estimatedDeliveryTime: '24-48h en Agence',
          availableCouriers: 1,
          isActive: true,
          tier: 'regional',
          notes: 'Arrivage bus direct.'
        }
      ]
    },
    {
      id: 'city-gra',
      name: 'Garoua',
      region: 'Nord',
      corridor: 'Axe Grand-Nord (Adamaoua / Nord / Extrême-Nord)',
      code: 'GRA',
      baseWarehouse: 'Point de Chute Gare Routière Touristique',
      isMainHub: false,
      transitDelayFromHub: '48h à 72h fret routier / train',
      zones: [
        {
          id: 'zone-gra-01',
          name: 'Plateau Commercial, Bibémiré & Centre',
          cityId: 'city-gra',
          deliveryFee: 2000,
          estimatedDeliveryTime: '60-90 min',
          availableCouriers: 2,
          isActive: true,
          tier: 'express',
          notes: 'Livraison dernier kilomètre moto locale.'
        },
        {
          id: 'zone-gra-02',
          name: 'Roumdé Adjia & Marouaré',
          cityId: 'city-gra',
          deliveryFee: 2500,
          estimatedDeliveryTime: '90-120 min',
          availableCouriers: 1,
          isActive: true,
          tier: 'standard',
          notes: 'Axe stade et quartiers périphériques.'
        },
        {
          id: 'zone-gra-03',
          name: 'Expédition Agence Touristique Express',
          cityId: 'city-gra',
          deliveryFee: 3500,
          estimatedDeliveryTime: '48h à 72h Agence',
          availableCouriers: 2,
          isActive: true,
          tier: 'regional',
          notes: 'Retrait direct sur présentation du bordereau.'
        }
      ]
    },
    {
      id: 'city-other',
      name: 'Autres Villes (Kribi, Ngaoundéré, Bertoua...)',
      region: 'Sud / Est / Adamaoua',
      corridor: 'Réseau National Interurbain',
      code: 'OTH',
      baseWarehouse: 'Réseau Agences Partenaires (Buca, Touristique, Danay)',
      isMainHub: false,
      transitDelayFromHub: '24h à 72h selon destination',
      zones: [
        {
          id: 'zone-oth-01',
          name: 'Kribi — Centre Urbain, Dombe & Plages',
          cityId: 'city-other',
          deliveryFee: 2000,
          estimatedDeliveryTime: '60-90 min (Moto locale)',
          availableCouriers: 2,
          isActive: true,
          tier: 'express',
          notes: 'Pôle balnéaire et résidences hôtelières.'
        },
        {
          id: 'zone-oth-02',
          name: 'Ngaoundéré — Baladji & Quartier Administratif',
          cityId: 'city-other',
          deliveryFee: 3000,
          estimatedDeliveryTime: '48h Retrait Agence',
          availableCouriers: 1,
          isActive: true,
          tier: 'regional',
          notes: 'Liaison ferroviaire Camrail ou Agence.'
        },
        {
          id: 'zone-oth-03',
          name: 'Bertoua — Centre-ville & Échangeur Est',
          cityId: 'city-other',
          deliveryFee: 3000,
          estimatedDeliveryTime: '48h Retrait Agence',
          availableCouriers: 1,
          isActive: true,
          tier: 'regional',
          notes: 'Expédition via Agence Bertoua Express.'
        },
        {
          id: 'zone-oth-04',
          name: 'Limbe — Down Beach & Bota Island',
          cityId: 'city-other',
          deliveryFee: 2500,
          estimatedDeliveryTime: '24h Moto Douala-Limbe',
          availableCouriers: 1,
          isActive: true,
          tier: 'standard',
          notes: 'Liaison rapide depuis le hub de Douala.'
        }
      ]
    }
  ];

  // State management
  const [cities, setCities] = useState<DeliveryCity[]>(initialCities);
  const [selectedCityId, setSelectedCityId] = useState<string>('city-yde');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>('all');

  // Modals state
  const [isAddCityModalOpen, setIsAddCityModalOpen] = useState(false);
  const [isAddZoneModalOpen, setIsAddZoneModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null);

  // Forms
  const [newCityForm, setNewCityForm] = useState({
    name: '',
    region: 'Centre',
    corridor: 'Axe Logistique Régional',
    code: '',
    baseWarehouse: 'Point de contact local',
    transitDelayFromHub: '24h à 48h'
  });

  const [newZoneForm, setNewZoneForm] = useState({
    name: '',
    cityId: 'city-yde',
    deliveryFee: 1500,
    estimatedDeliveryTime: '45-60 min',
    availableCouriers: 2,
    tier: 'standard' as 'express' | 'standard' | 'regional',
    notes: ''
  });

  // Selected city object
  const activeCity = useMemo(() => {
    return cities.find(c => c.id === selectedCityId) || cities[0];
  }, [cities, selectedCityId]);

  // Total summary numbers
  const totalCitiesCount = cities.length;
  const totalZonesCount = cities.reduce((acc, c) => acc + c.zones.length, 0);
  const activeZonesCount = cities.reduce((acc, c) => acc + c.zones.filter(z => z.isActive).length, 0);
  const totalFleetCouriers = cities.reduce((acc, c) => acc + c.zones.reduce((sum, z) => sum + (z.isActive ? z.availableCouriers : 0), 0), 0);

  // Filtered zones for active city
  const filteredCityZones = useMemo(() => {
    return activeCity.zones.filter(zone => {
      if (selectedTierFilter !== 'all' && zone.tier !== selectedTierFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = zone.name.toLowerCase().includes(q);
        const matchNotes = zone.notes?.toLowerCase().includes(q) || false;
        if (!matchName && !matchNotes) return false;
      }
      return true;
    });
  }, [activeCity, selectedTierFilter, searchQuery]);

  // Activate / Deactivate Zone
  const handleToggleZoneActive = (cityId: string, zoneId: string) => {
    setCities(prev =>
      prev.map(c => {
        if (c.id !== cityId) return c;
        return {
          ...c,
          zones: c.zones.map(z => {
            if (z.id !== zoneId) return z;
            const newActive = !z.isActive;
            addToast(`Zone « ${z.name} » ${newActive ? 'activée' : 'désactivée'}.`, 'info');
            return { ...z, isActive: newActive };
          })
        };
      })
    );
  };

  // Quick edit fee & time save
  const handleSaveEditZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingZone) return;

    setCities(prev =>
      prev.map(c => {
        if (c.id !== editingZone.cityId) return c;
        return {
          ...c,
          zones: c.zones.map(z => (z.id === editingZone.id ? editingZone : z))
        };
      })
    );

    addToast(`Tarif et délai mis à jour pour « ${editingZone.name} ».`, 'success');
    setEditingZone(null);
  };

  // Create new City
  const handleCreateCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityForm.name.trim()) return;

    const newC: DeliveryCity = {
      id: 'city-' + Date.now(),
      name: newCityForm.name.trim(),
      region: newCityForm.region,
      corridor: newCityForm.corridor,
      code: newCityForm.code.toUpperCase() || newCityForm.name.substring(0, 3).toUpperCase(),
      baseWarehouse: newCityForm.baseWarehouse,
      isMainHub: false,
      transitDelayFromHub: newCityForm.transitDelayFromHub,
      zones: [
        {
          id: 'zone-' + Date.now() + '-1',
          name: 'Centre-ville & Quartier Principal',
          cityId: 'city-' + Date.now(),
          deliveryFee: 1500,
          estimatedDeliveryTime: '45-60 min',
          availableCouriers: 2,
          isActive: true,
          tier: 'express',
          notes: 'Zone urbaine de départ.'
        }
      ]
    };

    setCities([...cities, newC]);
    setSelectedCityId(newC.id);
    setIsAddCityModalOpen(false);
    setNewCityForm({
      name: '',
      region: 'Centre',
      corridor: 'Axe Logistique Régional',
      code: '',
      baseWarehouse: 'Point de contact local',
      transitDelayFromHub: '24h à 48h'
    });
    addToast(`Ville de « ${newC.name} » ajoutée au réseau avec succès !`, 'success');
  };

  // Create new Zone
  const handleCreateZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZoneForm.name.trim()) return;

    const newZ: DeliveryZone = {
      id: 'zone-' + Date.now(),
      name: newZoneForm.name.trim(),
      cityId: newZoneForm.cityId,
      deliveryFee: Number(newZoneForm.deliveryFee) || 1500,
      estimatedDeliveryTime: newZoneForm.estimatedDeliveryTime || '45-60 min',
      availableCouriers: Number(newZoneForm.availableCouriers) || 2,
      isActive: true,
      tier: newZoneForm.tier,
      notes: newZoneForm.notes
    };

    setCities(prev =>
      prev.map(c => {
        if (c.id !== newZoneForm.cityId) return c;
        return {
          ...c,
          zones: [...c.zones, newZ]
        };
      })
    );

    setIsAddZoneModalOpen(false);
    setNewZoneForm({
      name: '',
      cityId: activeCity.id,
      deliveryFee: 1500,
      estimatedDeliveryTime: '45-60 min',
      availableCouriers: 2,
      tier: 'standard',
      notes: ''
    });
    addToast(`Zone « ${newZ.name} » ajoutée à ${activeCity.name}.`, 'success');
  };

  // Delete Zone
  const handleDeleteZone = (cityId: string, zoneId: string, zoneName: string) => {
    if (confirm(`Confirmez-vous le retrait de la zone « ${zoneName} » ?`)) {
      setCities(prev =>
        prev.map(c => {
          if (c.id !== cityId) return c;
          return {
            ...c,
            zones: c.zones.filter(z => z.id !== zoneId)
          };
        })
      );
      addToast(`Zone « ${zoneName} » retirée.`, 'info');
    }
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
              <MapPin size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
                Zones de livraison
              </h1>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                Organisation cartographique des tarifs, délais et livreurs par ville et quartier au Cameroun.
              </p>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              addToast('Grille tarifaire des zones exportée en format CSV.', 'info');
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
            Exporter la grille
          </button>

          <button
            onClick={() => {
              setNewZoneForm({ ...newZoneForm, cityId: activeCity.id });
              setIsAddZoneModalOpen(true);
            }}
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
            <Plus size={16} />
            Add zone (Ajouter quartier)
          </button>

          <button
            onClick={() => setIsAddCityModalOpen(true)}
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
            Add city (Ajouter ville)
          </button>
        </div>
      </div>

      {/* 2. VISUAL MAP-INSPIRED SCHEMATIC ORGANIZATION (Without external map API) */}
      <div style={{
        backgroundColor: '#072418',
        borderRadius: '18px',
        padding: '24px',
        color: '#ffffff',
        marginBottom: '26px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 30px -8px rgba(7, 36, 24, 0.5)'
      }}>
        {/* Background stylized topological grid & radar vectors */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: 0.08,
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, #072418 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Top Banner Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Compass size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 900, letterSpacing: '-0.3px', color: '#ffffff' }}>
                  Topologie & Corridors Logistiques — Cameroun IFPTIE
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#93c5fd' }}>
                  Architecture en étoile : Hub Central Yaoundé ⇄ Port Douala ⇄ Relais Ouest & Grand-Nord.
                </p>
              </div>
            </div>

            {/* Live Stats Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              padding: '6px 14px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.12)',
              fontSize: '0.75rem'
            }}>
              <div><strong style={{ color: '#34d399' }}>{totalCitiesCount}</strong> Villes connectées</div>
              <span style={{ opacity: 0.4 }}>|</span>
              <div><strong style={{ color: '#38bdf8' }}>{activeZonesCount} / {totalZonesCount}</strong> Quartiers actifs</div>
              <span style={{ opacity: 0.4 }}>|</span>
              <div><strong style={{ color: '#fbbf24' }}>{totalFleetCouriers}</strong> Coursiers sur zone</div>
            </div>
          </div>

          {/* Visual Corridor Flow Diagram (Map-Inspired Hub & Spoke Representation) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px'
          }}>
            {cities.map((city) => {
              const isSelected = city.id === selectedCityId;
              const activeCount = city.zones.filter(z => z.isActive).length;
              const couriersCount = city.zones.reduce((sum, z) => sum + (z.isActive ? z.availableCouriers : 0), 0);
              const minFee = Math.min(...city.zones.map(z => z.deliveryFee));

              return (
                <div
                  key={city.id}
                  onClick={() => setSelectedCityId(city.id)}
                  style={{
                    backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: isSelected ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '14px',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(8px)',
                    position: 'relative'
                  }}
                >
                  {city.isMainHub && (
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: '#10b981',
                      color: '#ffffff',
                      fontSize: '0.625rem',
                      fontWeight: 900,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      letterSpacing: '0.5px'
                    }}>
                      HUB
                    </span>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#10b981' : 'rgba(255,255,255,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontWeight: 900,
                      fontSize: '0.75rem'
                    }}>
                      {city.code}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#ffffff' }}>
                        {city.name}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                        Région {city.region}
                      </div>
                    </div>
                  </div>

                  {/* Corridor & Delay */}
                  <div style={{ fontSize: '0.6875rem', color: '#cbd5e1', marginBottom: '10px', minHeight: '32px' }}>
                    {city.corridor}
                  </div>

                  {/* Micro stats footer */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    fontSize: '0.6875rem'
                  }}>
                    <span style={{ color: '#38bdf8', fontWeight: 700 }}>
                      {activeCount} zones actives
                    </span>
                    <span style={{ color: '#fbbf24', fontWeight: 800 }}>
                      Dès {formatFCFA(minFee)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. CITY LEVEL DETAILS & NEIGHBORHOOD / ZONE CONTROLS */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '20px 24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '16px',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                backgroundColor: '#ecfdf5',
                color: '#0b5738',
                fontSize: '0.75rem',
                fontWeight: 900,
                padding: '3px 8px',
                borderRadius: '6px'
              }}>
                VILLE SÉLECTIONNÉE
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                {activeCity.name}
              </h2>
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '4px' }}>
              Base logistique : <strong style={{ color: '#0f172a' }}>{activeCity.baseWarehouse}</strong> • {activeCity.transitDelayFromHub}
            </div>
          </div>

          {/* Quick city-level stats */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '8px 14px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 700 }}>QUARTIERS</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 900, color: '#0f172a' }}>
                {activeCity.zones.length}
              </div>
            </div>

            <div style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #bbf7d0',
              padding: '8px 14px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.6875rem', color: '#065f46', fontWeight: 700 }}>COURSIERS DISPO</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 900, color: '#0b5738' }}>
                {activeCity.zones.reduce((sum, z) => sum + (z.isActive ? z.availableCouriers : 0), 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar for Neighborhoods */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: '16px'
        }}>
          {/* Tier Tabs: Express (<45min) | Standard (45-90min) | Régional (24h+) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
            {[
              { key: 'all', label: `Tous les quartiers (${activeCity.zones.length})` },
              { key: 'express', label: `⚡ Express Urgence (<45min)` },
              { key: 'standard', label: `📦 Standard (45-90min)` },
              { key: 'regional', label: `🚚 Périphérie / Agence` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedTierFilter(tab.key)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: selectedTierFilter === tab.key ? '#ffffff' : 'transparent',
                  color: selectedTierFilter === tab.key ? '#0f172a' : '#64748b',
                  boxShadow: selectedTierFilter === tab.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '8px 12px',
            minWidth: '240px',
            maxWidth: '340px',
            flex: 1
          }}>
            <Search size={15} color="#94a3b8" />
            <input
              type="text"
              placeholder={`Rechercher un quartier à ${activeCity.name}...`}
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
        </div>
      </div>

      {/* 4. NEIGHBORHOODS / ZONES TABLE & CARDS */}
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
                <th style={{ padding: '14px 20px' }}>Neighborhoods / Zones (Quartier)</th>
                <th style={{ padding: '14px 14px' }}>Type de desserte</th>
                <th style={{ padding: '14px 14px' }}>Delivery fee (Frais de livraison)</th>
                <th style={{ padding: '14px 14px' }}>Estimated delivery time (Délai estimé)</th>
                <th style={{ padding: '14px 14px', textAlign: 'center' }}>Available couriers (Coursiers dispo)</th>
                <th style={{ padding: '14px 14px' }}>Active / Inactive</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCityZones.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '40px 20px', textAlign: 'center', color: '#64748b' }}>
                    Aucun quartier ne correspond à votre filtre.
                  </td>
                </tr>
              ) : (
                filteredCityZones.map(zone => {
                  return (
                    <tr
                      key={zone.id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        backgroundColor: zone.isActive ? 'transparent' : '#f8fafc',
                        opacity: zone.isActive ? 1 : 0.65,
                        transition: 'background-color 0.12s ease'
                      }}
                    >
                      {/* Name & Notes */}
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            backgroundColor: zone.isActive ? '#ecfdf5' : '#f1f5f9',
                            color: zone.isActive ? '#0b5738' : '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Navigation size={16} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>
                              {zone.name}
                            </div>
                            {zone.notes && (
                              <div style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '2px' }}>
                                {zone.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Tier Badge */}
                      <td style={{ padding: '14px 14px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          backgroundColor: zone.tier === 'express' ? '#f0fdf4' : zone.tier === 'standard' ? '#f0f9ff' : '#fffbeb',
                          color: zone.tier === 'express' ? '#16a34a' : zone.tier === 'standard' ? '#0284c7' : '#d97706'
                        }}>
                          {zone.tier === 'express' ? '⚡ Express Hub' : zone.tier === 'standard' ? '📦 Standard' : '🚚 Périphérie'}
                        </span>
                      </td>

                      {/* Delivery Fee */}
                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ fontWeight: 900, color: '#0b5738', fontSize: '0.9375rem' }}>
                          {formatFCFA(zone.deliveryFee)}
                        </div>
                      </td>

                      {/* Estimated delivery time */}
                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#0f172a', fontWeight: 700 }}>
                          <Clock size={13} color="#64748b" />
                          {zone.estimatedDeliveryTime}
                        </div>
                      </td>

                      {/* Available couriers */}
                      <td style={{ padding: '14px 14px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '3px 10px',
                          borderRadius: '8px',
                          backgroundColor: zone.availableCouriers > 2 ? '#ecfdf5' : zone.availableCouriers > 0 ? '#fef3c7' : '#fef2f2',
                          color: zone.availableCouriers > 2 ? '#15803d' : zone.availableCouriers > 0 ? '#b45309' : '#dc2626',
                          fontWeight: 800,
                          fontSize: '0.8125rem'
                        }}>
                          <Bike size={12} />
                          {zone.availableCouriers} livreur{zone.availableCouriers > 1 ? 's' : ''}
                        </span>
                      </td>

                      {/* Active/Inactive toggle */}
                      <td style={{ padding: '14px 14px' }}>
                        <button
                          onClick={() => handleToggleZoneActive(activeCity.id, zone.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: zone.isActive ? '#dcfce7' : '#f1f5f9',
                            color: zone.isActive ? '#15803d' : '#64748b',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: zone.isActive ? '#22c55e' : '#94a3b8'
                          }} />
                          {zone.isActive ? 'Actif' : 'Inactif'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                          {/* Edit fee & time */}
                          <button
                            onClick={() => setEditingZone({ ...zone })}
                            title="Modifier tarif et délai"
                            style={{
                              padding: '6px 10px',
                              backgroundColor: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: '#0b5738',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Edit size={13} />
                            Éditer
                          </button>

                          {/* Delete zone */}
                          <button
                            onClick={() => handleDeleteZone(activeCity.id, zone.id, zone.name)}
                            title="Supprimer cette zone"
                            style={{
                              padding: '6px',
                              backgroundColor: '#fef2f2',
                              border: '1px solid #fee2e2',
                              borderRadius: '6px',
                              color: '#dc2626',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={13} />
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

      {/* 5. EDIT FEE & SET DELIVERY TIME MODAL */}
      {editingZone && (
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
            borderRadius: '16px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Modifier Zone — {editingZone.name}
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                  Ajustez les frais de livraison, le délai estimé et le nombre de coursiers.
                </p>
              </div>
              <button
                onClick={() => setEditingZone(null)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEditZone} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Nom du quartier / zone
                </label>
                <input
                  type="text"
                  value={editingZone.name}
                  onChange={(e) => setEditingZone({ ...editingZone, name: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Delivery Fee (Frais FCFA) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={100}
                    value={editingZone.deliveryFee}
                    onChange={(e) => setEditingZone({ ...editingZone, deliveryFee: Number(e.target.value) })}
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Set delivery time (Délai) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: 30-45 min"
                    value={editingZone.estimatedDeliveryTime}
                    onChange={(e) => setEditingZone({ ...editingZone, estimatedDeliveryTime: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Livreurs disponibles
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editingZone.availableCouriers}
                    onChange={(e) => setEditingZone({ ...editingZone, availableCouriers: Number(e.target.value) })}
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Type de zone
                  </label>
                  <select
                    value={editingZone.tier}
                    onChange={(e) => setEditingZone({ ...editingZone, tier: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="express">Express (&lt;45 min)</option>
                    <option value="standard">Standard (45-90 min)</option>
                    <option value="regional">Régional / Agence</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Consignes & Notes logistiques
                </label>
                <input
                  type="text"
                  placeholder="ex: Embouteillages en fin de journée..."
                  value={editingZone.notes || ''}
                  onChange={(e) => setEditingZone({ ...editingZone, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8125rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setEditingZone(null)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#0b5738',
                    color: '#ffffff',
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. ADD CITY MODAL */}
      {isAddCityModalOpen && (
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
            borderRadius: '16px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Add City (Ajouter une Ville)
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                  Intégrez une nouvelle agglomération au réseau IFPTIE Market.
                </p>
              </div>
              <button
                onClick={() => setIsAddCityModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCity} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Nom de la ville *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Kribi, Ebolowa, Ngaoundéré..."
                  value={newCityForm.name}
                  onChange={(e) => setNewCityForm({ ...newCityForm, name: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Région
                  </label>
                  <select
                    value={newCityForm.region}
                    onChange={(e) => setNewCityForm({ ...newCityForm, region: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="Centre">Centre</option>
                    <option value="Littoral">Littoral</option>
                    <option value="Ouest">Ouest</option>
                    <option value="Nord-Ouest">Nord-Ouest</option>
                    <option value="Sud-Ouest">Sud-Ouest</option>
                    <option value="Nord">Nord</option>
                    <option value="Adamaoua">Adamaoua</option>
                    <option value="Extrême-Nord">Extrême-Nord</option>
                    <option value="Sud">Sud</option>
                    <option value="Est">Est</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Code Court (3 lettres)
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="ex: KRI"
                    value={newCityForm.code}
                    onChange={(e) => setNewCityForm({ ...newCityForm, code: e.target.value.toUpperCase() })}
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

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Axe / Corridor logistique
                </label>
                <input
                  type="text"
                  placeholder="ex: Axe Yaoundé - Kribi Autoroute"
                  value={newCityForm.corridor}
                  onChange={(e) => setNewCityForm({ ...newCityForm, corridor: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8125rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Délai moyen d'acheminement depuis le Hub
                </label>
                <input
                  type="text"
                  placeholder="ex: 24h Agence Buca Voyage"
                  value={newCityForm.transitDelayFromHub}
                  onChange={(e) => setNewCityForm({ ...newCityForm, transitDelayFromHub: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8125rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddCityModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#0b5738',
                    color: '#ffffff',
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Ajouter la ville
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. ADD ZONE MODAL */}
      {isAddZoneModalOpen && (
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
            borderRadius: '16px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Add Zone (Ajouter un Quartier)
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                  Définissez un nouveau périmètre de livraison pour {activeCity.name}.
                </p>
              </div>
              <button
                onClick={() => setIsAddZoneModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateZone} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                  Nom du quartier / zone *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Bastos Ambassade, Logpom, Bonabéri..."
                  value={newZoneForm.name}
                  onChange={(e) => setNewZoneForm({ ...newZoneForm, name: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Frais de livraison (FCFA) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={100}
                    value={newZoneForm.deliveryFee}
                    onChange={(e) => setNewZoneForm({ ...newZoneForm, deliveryFee: Number(e.target.value) })}
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Délai estimé *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: 30-45 min"
                    value={newZoneForm.estimatedDeliveryTime}
                    onChange={(e) => setNewZoneForm({ ...newZoneForm, estimatedDeliveryTime: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Livreurs affectés
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={newZoneForm.availableCouriers}
                    onChange={(e) => setNewZoneForm({ ...newZoneForm, availableCouriers: Number(e.target.value) })}
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                    Catégorie de zone
                  </label>
                  <select
                    value={newZoneForm.tier}
                    onChange={(e) => setNewZoneForm({ ...newZoneForm, tier: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="express">Express (&lt;45 min)</option>
                    <option value="standard">Standard (45-90 min)</option>
                    <option value="regional">Régional / Périphérie</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddZoneModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#0b5738',
                    color: '#ffffff',
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Ajouter le quartier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
