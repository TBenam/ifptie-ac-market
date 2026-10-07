import React, { useState } from 'react';
import {
  Settings,
  Store,
  CreditCard,
  Truck,
  ShoppingCart,
  Bell,
  Users,
  Megaphone,
  Search,
  Share2,
  Shield,
  Save,
  CheckCircle2,
  Lock,
  Smartphone,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  KeyRound,
  History,
  Laptop,
  Check,
  ToggleLeft,
  ToggleRight,
  Plus,
  AlertTriangle,
  Info,
  Sliders,
  DollarSign
} from 'lucide-react';
import { formatFCFA } from '../../utils/formatters';

export type SettingsSection =
  | 'general'
  | 'store'
  | 'payments'
  | 'delivery'
  | 'orders'
  | 'notifications'
  | 'users'
  | 'marketing'
  | 'seo'
  | 'integrations'
  | 'security';

export const AdminSettingsView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('general');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const showSaveSuccess = (message = 'Paramètres enregistrés avec succès !') => {
    setSaveToast(message);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // 1. GENERAL & STORE INFORMATION STATE
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'IFPTIE Market Cameroun',
    tagline: 'Le Grand Marché en Ligne au Cameroun - Énergie Solaire, Maison & High-Tech',
    logoUrl: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=200&auto=format&fit=crop&q=80',
    phone: '+237 690 12 34 56',
    whatsapp: '+237 675 98 76 54',
    email: 'contact@ifptie-market.cm',
    supportEmail: 'sav@ifptie-market.cm',
    address: 'Boulevard de la Liberté, Akwa - Douala, Cameroun',
    businessRegNumber: 'RC/DLA/2024/B/1842',
    currency: 'XAF (FCFA)',
    timezone: 'Africa/Douala (GMT+1)'
  });

  // 2. PAYMENT METHODS STATE
  const [paymentSettings, setPaymentSettings] = useState({
    cashOnDelivery: {
      enabled: true,
      label: 'Cash à la livraison (Espèces)',
      description: 'Paiement direct en espèces auprès du coursier à la réception du colis',
      maxOrderAmount: 350000,
      requirePhoneConfirmation: true
    },
    mtnMoMo: {
      enabled: true,
      merchantId: 'MTN-CMR-MOMO-88341',
      apiKey: '••••••••••••••••••••••••••••••••',
      phoneCollect: '+237 675 98 76 54',
      feePayer: 'merchant', // 'merchant' or 'customer'
      autoConfirm: true
    },
    orangeMoney: {
      enabled: true,
      merchantCode: 'OM-DLA-55420',
      apiKey: '••••••••••••••••••••••••••••••••',
      phoneCollect: '+237 690 12 34 56',
      feePayer: 'merchant',
      autoConfirm: true
    }
  });

  // 3. DELIVERY RULES STATE
  const [deliveryRules, setDeliveryRules] = useState({
    freeDeliveryThreshold: 75000, // Free delivery above 75,000 FCFA
    enableFreeDeliveryThreshold: true,
    defaultCityFee: 1500,
    intercityBaseFee: 3500,
    expressDeliveryFee: 3000,
    allowScheduledDelivery: true,
    requireCustomerSignature: false,
    cities: [
      { name: 'Douala', active: true, zonesCount: 14, defaultFee: 1500, avgTime: '2h - 4h' },
      { name: 'Yaoundé', active: true, zonesCount: 12, defaultFee: 1500, avgTime: '2h - 5h' },
      { name: 'Bafoussam', active: true, zonesCount: 6, defaultFee: 2500, avgTime: '24h' },
      { name: 'Kribi', active: true, zonesCount: 5, defaultFee: 2500, avgTime: '24h - 48h' },
      { name: 'Garoua / Nord', active: true, zonesCount: 4, defaultFee: 4000, avgTime: '48h - 72h' },
    ]
  });

  // 4. USERS & ROLE-BASED PERMISSIONS STATE
  const [rolesList, setRolesList] = useState([
    {
      role: 'Super Admin',
      usersCount: 2,
      description: 'Accès total sans restriction à tous les modules, finances et configurations système.',
      permissions: ['Gestion produits', 'Commandes & Remises', 'Accès Finances & Marges', 'Gestion Livreurs', 'Paramètres Sécurité & Rôles']
    },
    {
      role: 'Admin',
      usersCount: 3,
      description: 'Supervision générale, modification de catalogue, gestion commerciale et suivi des clients.',
      permissions: ['Gestion produits', 'Commandes & Remises', 'Gestion Livreurs', 'Avis & Marketing']
    },
    {
      role: 'Operations Manager',
      usersCount: 2,
      description: 'Gestion quotidienne des expéditions, dispatch des coursiers et validation des statuts de livraison.',
      permissions: ['Attribution livreurs', 'Suivi expéditions', 'Zones de livraison', 'Gestion retours']
    },
    {
      role: 'Warehouse (Magasinier)',
      usersCount: 4,
      description: 'Préparation des colis, inventaire du stock, réception des conteneurs fournisseurs.',
      permissions: ['Mise à jour stock', 'Scan colis départ', 'Réception arrivages']
    },
    {
      role: 'Courier Manager (Chef Coursiers)',
      usersCount: 2,
      description: 'Affectation des tournées urbaines, gestion des pannes et contrôle des encaissements espèces.',
      permissions: ['Planning livreurs', 'Contrôle versements cash', 'Reprogrammation livraisons']
    },
    {
      role: 'Finance (Comptabilité)',
      usersCount: 2,
      description: 'Accès aux tableaux de bord financiers, rapprochements Mobile Money et clôtures comptables.',
      permissions: ['Dashboard Finances', 'Export CSV/Excel', 'Rapprochement Mobile Money', 'Facturation']
    }
  ]);

  const [activeUsers] = useState([
    { id: 'u1', name: 'Alain Fotso', email: 'alain.fotso@ifptie-market.cm', role: 'Super Admin', status: 'Actif', lastLogin: 'Il y a 10 min' },
    { id: 'u2', name: 'Carine Mballa', email: 'carine.m@ifptie-market.cm', role: 'Operations Manager', status: 'Actif', lastLogin: 'Il y a 1h' },
    { id: 'u3', name: 'Eric Tchinda', email: 'eric.t@ifptie-market.cm', role: 'Courier Manager', status: 'Actif', lastLogin: 'Il y a 3h' },
    { id: 'u4', name: 'Nathalie Ngo', email: 'nathalie.ngo@ifptie-market.cm', role: 'Finance', status: 'Actif', lastLogin: 'Il y a 4h' },
    { id: 'u5', name: 'Jean-Marc Belinga', email: 'jm.belinga@ifptie-market.cm', role: 'Warehouse', status: 'Actif', lastLogin: 'Hier à 17:30' }
  ]);

  // 5. SECURITY STATE (Password, 2FA, Login History, Sessions)
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    twoFactorMethod: 'sms_whatsapp', // 'app' or 'sms_whatsapp'
    sessionTimeoutMinutes: 60,
    forcePasswordChangeDays: 90,
    loginAlertsEmail: true
  });

  const [activeSessions] = useState([
    {
      id: 'sess-1',
      device: 'MacBook Pro 16" - Chrome 128',
      location: 'Douala, Cameroun (IP: 154.72.168.42)',
      current: true,
      lastActive: 'À l instant'
    },
    {
      id: 'sess-2',
      device: 'iPhone 15 Pro - Safari Mobile',
      location: 'Yaoundé, Cameroun (IP: 102.244.20.15)',
      current: false,
      lastActive: 'Il y a 2 heures'
    },
    {
      id: 'sess-3',
      device: 'Windows 11 PC - Edge',
      location: 'Douala, Akwa (IP: 154.72.170.89)',
      current: false,
      lastActive: 'Hier à 19:45'
    }
  ]);

  const [loginHistory] = useState([
    { date: '2026-09-20 20:45', user: 'alain.fotso@ifptie-market.cm', ip: '154.72.168.42', status: 'Succès', device: 'Chrome / macOS' },
    { date: '2026-09-20 18:12', user: 'carine.m@ifptie-market.cm', ip: '102.244.20.15', status: 'Succès', device: 'Safari / iOS' },
    { date: '2026-09-20 14:03', user: 'eric.t@ifptie-market.cm', ip: '154.72.168.42', status: 'Succès', device: 'Chrome / Windows' },
    { date: '2026-09-19 22:15', user: 'inconnu@fake.cm', ip: '45.132.18.2', status: 'Échec (Mot de passe incorrect)', device: 'Firefox / Linux' },
    { date: '2026-09-19 11:20', user: 'nathalie.ngo@ifptie-market.cm', ip: '154.72.170.89', status: 'Succès', device: 'Edge / Windows' }
  ]);

  // Sidebar navigation items
  const navigationItems = [
    { id: 'general', label: 'Général', icon: Store },
    { id: 'store', label: 'Informations boutique', icon: Settings },
    { id: 'payments', label: 'Moyens de paiement', icon: CreditCard },
    { id: 'delivery', label: 'Livraison & Frais', icon: Truck },
    { id: 'orders', label: 'Paramètres commandes', icon: ShoppingCart },
    { id: 'notifications', label: 'Notifications système', icon: Bell },
    { id: 'users', label: 'Utilisateurs & Rôles', icon: Users },
    { id: 'marketing', label: 'Marketing & Pixels', icon: Megaphone },
    { id: 'seo', label: 'Référencement SEO', icon: Search },
    { id: 'integrations', label: 'Intégrations & API', icon: Share2 },
    { id: 'security', label: 'Sécurité & Accès', icon: Shield },
  ];

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* SAVE TOAST NOTIFICATION */}
      {saveToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#0b5738',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
          fontSize: '0.875rem',
          fontWeight: 600,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <CheckCircle2 size={18} color="#ffffff" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0b5738',
              boxShadow: '0 2px 5px rgba(11,87,56,0.12)'
            }}>
              <Settings size={24} />
            </div>
            <div>
              <h1 style={{
                fontSize: '1.75rem',
                fontWeight: 900,
                color: '#0f172a',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                Paramètres
              </h1>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '2px 0 0' }}>
                Configuration générale, passerelles de paiement, règles de livraison et sécurité
              </p>
            </div>
          </div>
        </div>

        {/* Global Save Button */}
        <button
          onClick={() => showSaveSuccess('Tous les paramètres ont été sauvegardés avec succès !')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#0b5738',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(11,87,56,0.25)',
            transition: 'all 0.15s ease'
          }}
        >
          <Save size={16} />
          <span>Enregistrer les modifications</span>
        </button>
      </div>

      {/* MAIN SETTINGS LAYOUT (SIDEBAR + CONTENT) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gap: '24px',
        alignItems: 'flex-start'
      }}>
        {/* =========================================================================
            SETTINGS SIDEBAR
           ========================================================================= */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {navigationItems.map((item) => {
            const active = activeSection === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as SettingsSection)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: active ? '#0b5738' : 'transparent',
                  color: active ? '#ffffff' : '#475569',
                  fontWeight: active ? 700 : 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={18} color={active ? '#ffffff' : '#64748b'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            SETTINGS CONTENT AREA
           ========================================================================= */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          padding: '28px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
        }}>
          {/* SECTION 1 & 2: GENERAL & STORE INFORMATION */}
          {(activeSection === 'general' || activeSection === 'store') && (
            <div>
              <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Informations Générales de la Boutique
                </h2>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '4px 0 0' }}>
                  Identité publique d'IFPTIE Market, coordonnées WhatsApp/téléphone et adresse physique
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Nom officiel de la boutique (Store name) :
                  </label>
                  <input
                    type="text"
                    value={generalSettings.storeName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, storeName: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Numéro RCCM / Enregistrement fiscal :
                  </label>
                  <input
                    type="text"
                    value={generalSettings.businessRegNumber}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, businessRegNumber: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              {/* Tagline */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Slogan commercial (Tagline) :
                </label>
                <input
                  type="text"
                  value={generalSettings.tagline}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, tagline: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                />
              </div>

              {/* Contact: Phone & WhatsApp */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    <Phone size={15} color="#0b5738" />
                    <span>Téléphone standard (Appels clients) :</span>
                  </label>
                  <input
                    type="text"
                    value={generalSettings.phone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    <MessageSquare size={15} color="#16a34a" />
                    <span>Numéro WhatsApp Business (Commandes & SAV) :</span>
                  </label>
                  <input
                    type="text"
                    value={generalSettings.whatsapp}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, whatsapp: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              {/* Email & Support Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    <Mail size={15} color="#0284c7" />
                    <span>Adresse Email officielle (Email) :</span>
                  </label>
                  <input
                    type="email"
                    value={generalSettings.email}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    <Mail size={15} color="#0284c7" />
                    <span>Email Support Client / Litiges :</span>
                  </label>
                  <input
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              {/* Physical Address */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  <MapPin size={15} color="#ea580c" />
                  <span>Adresse du Siège & Entrepôt Principal (Address) :</span>
                </label>
                <input
                  type="text"
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                />
              </div>

              <button
                onClick={() => showSaveSuccess('Informations générales enregistrées !')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: '#0b5738',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Save size={14} />
                <span>Enregistrer les coordonnées</span>
              </button>
            </div>
          )}

          {/* SECTION 3: PAYMENT METHODS (PAYMENTS) */}
          {activeSection === 'payments' && (
            <div>
              <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Moyens de Paiement
                </h2>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '4px 0 0' }}>
                  Configuration des flux d'encaissement : Cash à la livraison, MTN Mobile Money & Orange Money
                </p>
              </div>

              {/* Payment 1: Cash on delivery */}
              <div style={{
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: paymentSettings.cashOnDelivery.enabled ? '#ffffff' : '#f8fafc'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#0b5738', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                        Cash à la livraison (Cash on Delivery)
                      </h3>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                        Le client règle en espèces au coursier à la réception du colis
                      </p>
                    </div>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={paymentSettings.cashOnDelivery.enabled}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        cashOnDelivery: { ...paymentSettings.cashOnDelivery, enabled: e.target.checked }
                      })}
                      style={{ width: '18px', height: '18px', accentColor: '#0b5738' }}
                    />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: paymentSettings.cashOnDelivery.enabled ? '#0b5738' : '#64748b' }}>
                      {paymentSettings.cashOnDelivery.enabled ? 'Activé' : 'Désactivé'}
                    </span>
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                      Plafond maximum autorisé par commande en espèces :
                    </label>
                    <input
                      type="number"
                      value={paymentSettings.cashOnDelivery.maxOrderAmount}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        cashOnDelivery: { ...paymentSettings.cashOnDelivery, maxOrderAmount: Number(e.target.value) }
                      })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                    />
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Au-delà de ce montant, acompte Mobile Money obligatoire.</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', paddingTop: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={paymentSettings.cashOnDelivery.requirePhoneConfirmation}
                        onChange={(e) => setPaymentSettings({
                          ...paymentSettings,
                          cashOnDelivery: { ...paymentSettings.cashOnDelivery, requirePhoneConfirmation: e.target.checked }
                        })}
                        style={{ width: '16px', height: '16px', accentColor: '#0b5738' }}
                      />
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155' }}>
                        Exiger validation téléphonique par l'équipe avant dispatch du coursier
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment 2: MTN Mobile Money */}
              <div style={{
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: paymentSettings.mtnMoMo.enabled ? '#ffffff' : '#f8fafc'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                      MTN
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                        MTN Mobile Money (MoMo API)
                      </h3>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                        Passerelle de paiement automatique via notification USSD push (*126#)
                      </p>
                    </div>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={paymentSettings.mtnMoMo.enabled}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        mtnMoMo: { ...paymentSettings.mtnMoMo, enabled: e.target.checked }
                      })}
                      style={{ width: '18px', height: '18px', accentColor: '#0b5738' }}
                    />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: paymentSettings.mtnMoMo.enabled ? '#0b5738' : '#64748b' }}>
                      {paymentSettings.mtnMoMo.enabled ? 'Activé' : 'Désactivé'}
                    </span>
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                      ID Marchand MoMo (Merchant ID) :
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.mtnMoMo.merchantId}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        mtnMoMo: { ...paymentSettings.mtnMoMo, merchantId: e.target.value }
                      })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                      Numéro de collecte MTN MoMo :
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.mtnMoMo.phoneCollect}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        mtnMoMo: { ...paymentSettings.mtnMoMo, phoneCollect: e.target.value }
                      })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment 3: Orange Money */}
              <div style={{
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: paymentSettings.orangeMoney.enabled ? '#ffffff' : '#f8fafc'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                      OM
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                        Orange Money Cameroun (OM WebPay)
                      </h3>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                        Intégration passerelle Orange Money Web Payment avec validation OTP #150#
                      </p>
                    </div>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={paymentSettings.orangeMoney.enabled}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        orangeMoney: { ...paymentSettings.orangeMoney, enabled: e.target.checked }
                      })}
                      style={{ width: '18px', height: '18px', accentColor: '#0b5738' }}
                    />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: paymentSettings.orangeMoney.enabled ? '#0b5738' : '#64748b' }}>
                      {paymentSettings.orangeMoney.enabled ? 'Activé' : 'Désactivé'}
                    </span>
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                      Code Marchand Orange (OM Code) :
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.orangeMoney.merchantCode}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        orangeMoney: { ...paymentSettings.orangeMoney, merchantCode: e.target.value }
                      })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                      Numéro de collecte Orange Money :
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.orangeMoney.phoneCollect}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        orangeMoney: { ...paymentSettings.orangeMoney, phoneCollect: e.target.value }
                      })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => showSaveSuccess('Configuration des paiements enregistrée !')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: '#0b5738',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Save size={14} />
                <span>Enregistrer les moyens de paiement</span>
              </button>
            </div>
          )}

          {/* SECTION 4: DELIVERY RULES (DELIVERY) */}
          {activeSection === 'delivery' && (
            <div>
              <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Paramètres & Règles de Livraison
                </h2>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '4px 0 0' }}>
                  Villes éligibles, zones tarifaires, seuil de gratuité et délais d'expédition
                </p>
              </div>

              {/* Delivery Rules Controls */}
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '18px',
                marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a', margin: '0 0 14px' }}>
                  Règles Tarifaires Globales (Delivery rules)
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                      Seuil de livraison offerte (FCFA) :
                    </label>
                    <input
                      type="number"
                      value={deliveryRules.freeDeliveryThreshold}
                      onChange={(e) => setDeliveryRules({ ...deliveryRules, freeDeliveryThreshold: Number(e.target.value) })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                    />
                    <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                      Livraison gratuite dès {formatFCFA(deliveryRules.freeDeliveryThreshold)}
                    </span>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                      Tarif urbain de base (Douala / Yaoundé) :
                    </label>
                    <input
                      type="number"
                      value={deliveryRules.defaultCityFee}
                      onChange={(e) => setDeliveryRules({ ...deliveryRules, defaultCityFee: Number(e.target.value) })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                      Frais expédition interurbaine / Agences :
                    </label>
                    <input
                      type="number"
                      value={deliveryRules.intercityBaseFee}
                      onChange={(e) => setDeliveryRules({ ...deliveryRules, intercityBaseFee: Number(e.target.value) })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Cities & Zones Table */}
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>
                Villes Couvertes & Délais Moyens
              </h3>

              <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', textTransform: 'uppercase', fontSize: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '10px 14px' }}>Ville</th>
                      <th style={{ padding: '10px 14px' }}>Statut</th>
                      <th style={{ padding: '10px 14px' }}>Zones couvertes</th>
                      <th style={{ padding: '10px 14px' }}>Frais standards</th>
                      <th style={{ padding: '10px 14px' }}>Délai moyen estimé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryRules.cities.map((ct, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>{ct.name}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ backgroundColor: '#ecfdf5', color: '#065f46', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem' }}>
                            ● Actif
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', color: '#475569' }}>{ct.zonesCount} quartiers répertoriés</td>
                        <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>{formatFCFA(ct.defaultFee)}</td>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{ct.avgTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => showSaveSuccess('Règles de livraison sauvegardées !')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: '#0b5738',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Save size={14} />
                <span>Enregistrer les règles de livraison</span>
              </button>
            </div>
          )}

          {/* SECTION 7: USERS & PERMISSIONS (ROLES) */}
          {activeSection === 'users' && (
            <div>
              <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Utilisateurs & Permissions par Rôle
                </h2>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '4px 0 0' }}>
                  Attribution des accès d'équipe : Super Admin, Admin, Operations Manager, Warehouse, Courier Manager, Finance
                </p>
              </div>

              {/* Roles Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                {rolesList.map((r, idx) => (
                  <div key={idx} style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '16px',
                    backgroundColor: '#ffffff'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a' }}>{r.role}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '6px' }}>
                        {r.usersCount} utilisateurs
                      </span>
                    </div>

                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 12px', lineHeight: '1.4' }}>
                      {r.description}
                    </p>

                    <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '8px' }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#0b5738', textTransform: 'uppercase' }}>
                        Permissions incluses :
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                        {r.permissions.map((p, pIdx) => (
                          <span key={pIdx} style={{ fontSize: '0.6875rem', backgroundColor: '#ecfdf5', color: '#065f46', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                            ✓ {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Active Admin Users Table */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Collaborateurs Actifs
                </h3>
                <button
                  onClick={() => alert('Ouverture du formulaire d invitation collaborateur.')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: '#0b5738',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} />
                  <span>Inviter un utilisateur</span>
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', textTransform: 'uppercase', fontSize: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '10px 14px' }}>Nom</th>
                      <th style={{ padding: '10px 14px' }}>Email</th>
                      <th style={{ padding: '10px 14px' }}>Rôle</th>
                      <th style={{ padding: '10px 14px' }}>Statut</th>
                      <th style={{ padding: '10px 14px' }}>Dernière connexion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeUsers.map((u) => (
                      <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>{u.name}</td>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{u.email}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{
                            backgroundColor: u.role === 'Super Admin' ? '#fef3c7' : '#ecfdf5',
                            color: u.role === 'Super Admin' ? '#b45309' : '#065f46',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontWeight: 700,
                            fontSize: '0.75rem'
                          }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', color: '#16a34a', fontWeight: 600 }}>● {u.status}</td>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{u.lastLogin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION 11: SECURITY (SECURITY: Password, 2FA, Login history, Sessions) */}
          {activeSection === 'security' && (
            <div>
              <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Sécurité du Compte & Sessions
                </h2>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '4px 0 0' }}>
                  Mot de passe administrateur, authentification 2FA, historique de connexion et gestion des sessions actives
                </p>
              </div>

              {/* 1. Password & 2FA Settings */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                {/* Password Change Box */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <KeyRound size={18} color="#0b5738" />
                    <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a' }}>
                      Modifier le mot de passe (Password)
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                      type="password"
                      placeholder="Mot de passe actuel"
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                    />
                    <input
                      type="password"
                      placeholder="Nouveau mot de passe fort"
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                    />
                    <input
                      type="password"
                      placeholder="Confirmer le nouveau mot de passe"
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                    />
                    <button
                      onClick={() => showSaveSuccess('Mot de passe mis à jour avec succès !')}
                      style={{
                        padding: '8px 14px',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        marginTop: '4px'
                      }}
                    >
                      Mettre à jour
                    </button>
                  </div>
                </div>

                {/* 2FA Box */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px', backgroundColor: '#f0fdf4' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Smartphone size={18} color="#059669" />
                    <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: '#065f46' }}>
                      Authentification à Deux Facteurs (2FA)
                    </h3>
                  </div>

                  <p style={{ fontSize: '0.8125rem', color: '#047857', margin: '0 0 14px' }}>
                    Le 2FA protège l'accès back-office en exigeant un code temporaire envoyé par WhatsApp / SMS lors de chaque nouvelle connexion.
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#065f46' }}>
                      Statut 2FA : ACTIF (Recommandé)
                    </span>
                    <span style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '2px 8px', borderRadius: '6px', fontSize: '0.6875rem', fontWeight: 800 }}>
                      Sécurisé
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Active Sessions */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Laptop size={18} color="#0b5738" />
                    <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a' }}>
                      Sessions Actives (Sessions)
                    </h3>
                  </div>
                  <button
                    onClick={() => showSaveSuccess('Toutes les autres sessions distantes ont été révoquées.')}
                    style={{
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                      color: '#dc2626',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Déconnecter les autres appareils
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeSessions.map((sess) => (
                    <div key={sess.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      backgroundColor: sess.current ? '#ecfdf5' : '#f8fafc',
                      borderRadius: '10px',
                      border: sess.current ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                      fontSize: '0.8125rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>
                          {sess.device} {sess.current && <span style={{ color: '#059669', fontSize: '0.75rem' }}>(Cet appareil)</span>}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{sess.location}</div>
                      </div>
                      <div style={{ color: '#475569', fontWeight: 600 }}>
                        {sess.lastActive}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Login History */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <History size={18} color="#0b5738" />
                  <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a' }}>
                    Historique des Connexions Récentes (Login history)
                  </h3>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', textTransform: 'uppercase', fontSize: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '10px 14px' }}>Date & Heure</th>
                        <th style={{ padding: '10px 14px' }}>Compte</th>
                        <th style={{ padding: '10px 14px' }}>Adresse IP</th>
                        <th style={{ padding: '10px 14px' }}>Navigateur / OS</th>
                        <th style={{ padding: '10px 14px' }}>Résultat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loginHistory.map((h, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px 14px', color: '#475569' }}>{h.date}</td>
                          <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0f172a' }}>{h.user}</td>
                          <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: '#64748b' }}>{h.ip}</td>
                          <td style={{ padding: '12px 14px', color: '#64748b' }}>{h.device}</td>
                          <td style={{ padding: '12px 14px' }}>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              backgroundColor: h.status.includes('Succès') ? '#ecfdf5' : '#fef2f2',
                              color: h.status.includes('Succès') ? '#065f46' : '#dc2626'
                            }}>
                              {h.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* OTHER SECTIONS (Orders, Notifications, Marketing, SEO, Integrations) */}
          {(activeSection === 'orders' || activeSection === 'notifications' || activeSection === 'marketing' || activeSection === 'seo' || activeSection === 'integrations') && (
            <div>
              <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0, textTransform: 'capitalize' }}>
                  {navigationItems.find(n => n.id === activeSection)?.label}
                </h2>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '4px 0 0' }}>
                  Paramètres avancés du module {activeSection} pour IFPTIE Market
                </p>
              </div>

              {activeSection === 'orders' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 700 }}>Numérotation des commandes</h4>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '0 0 10px' }}>Préfixe personnalisé : <strong>#IFM-</strong> suivi de 5 chiffres incrémentaux.</p>
                  </div>
                  <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 700 }}>Délai d'annulation automatique</h4>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>Les commandes non confirmées par téléphone sous 48h sont passées en statut « À reprogrammer ».</p>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#334155' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#0b5738', width: '16px', height: '16px' }} />
                    <span>Alerte WhatsApp instantanée lors de toute nouvelle commande</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#334155' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#0b5738', width: '16px', height: '16px' }} />
                    <span>Notification email quotidienne de clôture financière et versements coursiers</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#334155' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#0b5738', width: '16px', height: '16px' }} />
                    <span>Alerte stock bas lorsque le seuil d'inventaire est inférieur à 5 unités</span>
                  </label>
                </div>
              )}

              {activeSection === 'seo' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Titre Méta Global (Meta Title) :
                    </label>
                    <input
                      type="text"
                      defaultValue="IFPTIE Market | Le Grand Marché en Ligne au Cameroun"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Description Méta (Meta Description) :
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Achetez en ligne au Cameroun : Kits solaires, électroménager et maison avec livraison rapide à Douala, Yaoundé et toutes les régions. Paiement cash à la livraison."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                    />
                  </div>
                </div>
              )}

              {activeSection === 'marketing' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Meta Pixel ID (Facebook / Instagram Ads) :
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : 48921098239012"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Google Analytics 4 (Measurement ID) :
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : G-CMR984210"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                    />
                  </div>
                </div>
              )}

              {activeSection === 'integrations' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: '0.9375rem', fontWeight: 700 }}>Passerelle WhatsApp Cloud API</h4>
                      <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>Pour confirmation automatique des commandes et envoi des liens de suivi.</p>
                    </div>
                    <span style={{ backgroundColor: '#ecfdf5', color: '#065f46', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>Connecté</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => showSaveSuccess(`Paramètres ${activeSection} sauvegardés !`)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: '#0b5738',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: '16px'
                }}
              >
                <Save size={14} />
                <span>Enregistrer</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
