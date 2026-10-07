import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import { 
  User, 
  Phone, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Percent, 
  Banknote, 
  History, 
  Bell, 
  ToggleLeft, 
  ToggleRight, 
  KeyRound, 
  LogOut, 
  Camera, 
  ShieldCheck, 
  Bike, 
  ChevronRight, 
  AlertCircle,
  Calendar,
  Award,
  Check,
  X
} from 'lucide-react';

interface CourierProfileViewProps {
  onBackToDeliveries?: () => void;
}

export const CourierProfileView: React.FC<CourierProfileViewProps> = ({ onBackToDeliveries }) => {
  const { courierTasks, setActiveView, addToast } = useStore();

  // Settings states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Password fields
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Performance calculations (combining today's tasks and historic metrics)
  const todayDelivered = courierTasks.filter(t => t.status === 'delivered').length;
  const todayFailed = courierTasks.filter(t => t.status === 'failed').length;
  const todayTotal = courierTasks.length;
  const todayCollected = courierTasks.filter(t => t.isCollected).reduce((sum, t) => sum + t.totalToCollect, 0);

  // Lifetime metrics for Jean
  const totalDeliveries = 142 + todayTotal;
  const successfulDeliveries = 136 + todayDelivered;
  const failedDeliveries = 6 + todayFailed;
  const successRate = Math.round((successfulDeliveries / totalDeliveries) * 100);
  const totalCollectedLifetime = 1850000 + todayCollected;

  // History deliveries list
  const historyList = [
    {
      id: 'h-01',
      trackingNumber: 'IFM-10480',
      clientName: 'Sophie Meka',
      neighborhood: 'Mvan (Descente complexe)',
      amount: 32000,
      paymentMethod: 'orange_money',
      status: 'delivered',
      date: 'Aujourd\'hui, 11:15'
    },
    {
      id: 'h-02',
      trackingNumber: 'IFP-CMR-8495',
      clientName: 'Nadine Kamga',
      neighborhood: 'Bastos Sud / Bonapriso',
      amount: 14000,
      paymentMethod: 'cash_on_delivery',
      status: 'delivered',
      date: 'Aujourd\'hui, 09:30'
    },
    {
      id: 'h-03',
      trackingNumber: 'IFM-10478',
      clientName: 'Paul Biwole',
      neighborhood: 'Biyem-Assi (Rond-point Express)',
      amount: 15500,
      paymentMethod: 'cash_on_delivery',
      status: 'failed',
      failureReason: 'Client injoignable après 3 appels',
      date: 'Aujourd\'hui, 10:00'
    },
    {
      id: 'h-04',
      trackingNumber: 'IFP-CMR-8490',
      clientName: 'Fabrice Manga',
      neighborhood: 'Nlongkak (Face Camair)',
      amount: 28000,
      paymentMethod: 'mtn_momo',
      status: 'delivered',
      date: 'Hier, 16:45'
    },
    {
      id: 'h-05',
      trackingNumber: 'IFP-CMR-8488',
      clientName: 'Esther Belinga',
      neighborhood: 'Mendong (Montée Jouvence)',
      amount: 19500,
      paymentMethod: 'cash_on_delivery',
      status: 'delivered',
      date: 'Hier, 14:10'
    }
  ];

  const handleToggleAvailability = () => {
    const nextState = !isAvailable;
    setIsAvailable(nextState);
    if (nextState) {
      addToast('🟢 Vous êtes maintenant EN SERVICE pour recevoir des courses !', 'success');
    } else {
      addToast('🔴 Vous êtes passé EN PAUSE. Aucune nouvelle course ne vous sera assignée.', 'info');
    }
  };

  const handleToggleNotifications = () => {
    const nextState = !notificationsEnabled;
    setNotificationsEnabled(nextState);
    addToast(nextState ? '🔔 Notifications sonores et SMS activées' : '🔕 Notifications désactivées', 'info');
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      addToast('Veuillez renseigner tous les champs de mot de passe', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('Les nouveaux mots de passe ne correspondent pas', 'error');
      return;
    }
    setShowPasswordModal(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    addToast('🔒 Mot de passe modifié avec succès !', 'success');
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    addToast('👋 Session coursier fermée. À bientôt Jean !', 'info');
    setActiveView('storefront');
  };

  return (
    <div style={{
      maxWidth: '640px',
      margin: '0 auto',
      padding: '16px 16px 100px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>

      {/* 1. HEADER & PROFILE CARD */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '24px 20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        marginBottom: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top decorative accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #0b5738 0%, #f59e0b 100%)'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Profile photo with badge */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              backgroundColor: '#073b26',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              fontWeight: 900,
              boxShadow: '0 4px 12px rgba(11, 87, 56, 0.25)',
              border: '3px solid #ffffff'
            }}>
              JM
            </div>
            <button
              onClick={() => addToast('Photo de profil : Fonctionnalité de capture prête', 'info')}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#f59e0b',
                color: '#073b26',
                border: '2px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Changer la photo"
            >
              <Camera size={13} />
            </button>
          </div>

          {/* Name & Phone & Zone */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.3px' }}>
                Jean Mbarga
              </h1>
              <span style={{
                backgroundColor: '#ecfdf5',
                color: '#047857',
                border: '1px solid #a7f3d0',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '0.6875rem',
                fontWeight: 800
              }}>
                ⭐ Vérifié
              </span>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#0b5738', fontWeight: 700, marginTop: '4px' }}>
              <Phone size={14} />
              <span>+237 671 23 45 67</span>
            </div>

            {/* Zone principale */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#64748b', marginTop: '2px' }}>
              <MapPin size={14} color="#0b5738" />
              <span><strong>Zone principale :</strong> Yaoundé Centre & Ouest</span>
            </div>
          </div>
        </div>

        {/* Courier details badge strip */}
        <div style={{
          marginTop: '18px',
          paddingTop: '14px',
          borderTop: '1px solid #f1f5f9',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px'
        }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.6875rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
              Véhicule moto
            </span>
            <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#1e293b', marginTop: '2px' }}>
              Yamaha YBR 125 • LT-482-CE
            </div>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.6875rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
              Statut actuel
            </span>
            <div style={{
              fontSize: '0.8125rem',
              fontWeight: 800,
              color: isAvailable ? '#16a34a' : '#dc2626',
              marginTop: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isAvailable ? '#16a34a' : '#dc2626',
                display: 'inline-block'
              }} />
              <span>{isAvailable ? 'En service' : 'En pause'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PERFORMANCE SECTION */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#0b5738',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={18} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#073b26', margin: 0 }}>
              Performance
            </h2>
          </div>

          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            backgroundColor: '#fef3c7',
            color: '#92400e',
            padding: '4px 10px',
            borderRadius: '999px'
          }}>
            🏆 Top Livreur Yaoundé
          </span>
        </div>

        {/* 5 Requested Performance Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '14px'
        }}>
          {/* 1. Livraisons totales */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '14px',
            padding: '14px',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Livraisons totales
            </span>
            <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>
              {totalDeliveries}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              {todayTotal} aujourd'hui
            </span>
          </div>

          {/* 2. Livraisons réussies */}
          <div style={{
            backgroundColor: '#f0fdf4',
            borderRadius: '14px',
            padding: '14px',
            border: '1px solid #bbf7d0'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
              Livraisons réussies
            </span>
            <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#15803d', marginTop: '2px' }}>
              {successfulDeliveries}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#16a34a' }}>
              {todayDelivered} aujourd'hui
            </span>
          </div>

          {/* 3. Livraisons échouées */}
          <div style={{
            backgroundColor: '#fef2f2',
            borderRadius: '14px',
            padding: '14px',
            border: '1px solid #fecaca'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase' }}>
              Livraisons échouées
            </span>
            <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#b91c1c', marginTop: '2px' }}>
              {failedDeliveries}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#dc2626' }}>
              {todayFailed} incident aujourd'hui
            </span>
          </div>

          {/* 4. Taux de réussite */}
          <div style={{
            backgroundColor: '#eff6ff',
            borderRadius: '14px',
            padding: '14px',
            border: '1px solid #bfdbfe'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase' }}>
              Taux de réussite
            </span>
            <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#1d4ed8', marginTop: '2px' }}>
              {successRate}%
            </div>
            <span style={{ fontSize: '0.72rem', color: '#2563eb' }}>
              Objectif contractuel : 90%
            </span>
          </div>
        </div>

        {/* 5. Montant encaissé (Full width prominent card) */}
        <div style={{
          backgroundColor: '#ecfdf5',
          border: '1.5px solid #059669',
          borderRadius: '14px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#064e3b', textTransform: 'uppercase' }}>
              Montant encaissé (Aujourd'hui)
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0b5738', marginTop: '2px' }}>
              {formatFCFA(todayCollected)}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#047857' }}>
              Cumul total encaissé : {formatFCFA(totalCollectedLifetime)}
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{
              backgroundColor: '#0b5738',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              display: 'inline-block'
            }}>
              Caisse à verser
            </span>
          </div>
        </div>
      </div>

      {/* 3. HISTORY SECTION */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <History size={18} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Historique des courses
            </h2>
          </div>

          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
            5 dernières livraisons
          </span>
        </div>

        {/* Deliveries list */}
        <div style={{ display: 'grid', gap: '10px' }}>
          {historyList.map((item) => {
            const isSuccess = item.status === 'delivered';

            return (
              <div
                key={item.id}
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: isSuccess ? '1px solid #e2e8f0' : '1px solid #fecaca',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.875rem', color: '#0f172a' }}>
                      #{item.trackingNumber}
                    </span>
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: isSuccess ? '#dcfce7' : '#fee2e2',
                      color: isSuccess ? '#15803d' : '#b91c1c'
                    }}>
                      {isSuccess ? '✓ Livrée' : '⚠️ Échec'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginTop: '2px' }}>
                    {item.clientName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    📍 {item.neighborhood} • <span style={{ color: '#94a3b8' }}>{item.date}</span>
                  </div>
                  {!isSuccess && item.failureReason && (
                    <div style={{ fontSize: '0.72rem', color: '#dc2626', fontStyle: 'italic', marginTop: '2px' }}>
                      Raison : {item.failureReason}
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 900, color: isSuccess ? '#0b5738' : '#94a3b8' }}>
                    {formatFCFA(item.amount)}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                    {item.paymentMethod === 'cash_on_delivery' ? 'Espèces' : item.paymentMethod === 'orange_money' ? 'Orange Money' : 'MTN MoMo'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. SETTINGS SECTION (Notifications, Disponibilité, Mot de passe, Déconnexion) */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>
          Paramètres & Compte
        </h2>

        <div style={{ display: 'grid', gap: '12px' }}>
          
          {/* Setting 1: Notifications */}
          <div
            onClick={handleToggleNotifications}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              backgroundColor: '#f8fafc',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: notificationsEnabled ? '#ecfdf5' : '#f1f5f9',
                color: notificationsEnabled ? '#0b5738' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bell size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a' }}>
                  Notifications
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Alertes sonores et SMS pour les nouvelles courses
                </div>
              </div>
            </div>

            <div style={{ color: notificationsEnabled ? '#0b5738' : '#94a3b8' }}>
              {notificationsEnabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </div>
          </div>

          {/* Setting 2: Disponibilité */}
          <div
            onClick={handleToggleAvailability}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              backgroundColor: isAvailable ? '#f0fdf4' : '#fef2f2',
              borderRadius: '14px',
              border: isAvailable ? '1.5px solid #a7f3d0' : '1.5px solid #fecaca',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: isAvailable ? '#dcfce7' : '#fee2e2',
                color: isAvailable ? '#15803d' : '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bike size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: isAvailable ? '#166534' : '#991b1b' }}>
                  Disponibilité
                </div>
                <div style={{ fontSize: '0.75rem', color: isAvailable ? '#15803d' : '#b91c1c' }}>
                  {isAvailable ? 'Actuellement EN SERVICE (Prêt à livrer)' : 'Actuellement EN PAUSE (Indisponible)'}
                </div>
              </div>
            </div>

            <div style={{ color: isAvailable ? '#16a34a' : '#dc2626' }}>
              {isAvailable ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </div>
          </div>

          {/* Setting 3: Mot de passe */}
          <div
            onClick={() => setShowPasswordModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              backgroundColor: '#f8fafc',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <KeyRound size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a' }}>
                  Mot de passe
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Modifier votre code PIN ou mot de passe de connexion
                </div>
              </div>
            </div>

            <ChevronRight size={18} color="#94a3b8" />
          </div>

          {/* Setting 4: Déconnexion */}
          <button
            onClick={() => setShowLogoutModal(true)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              backgroundColor: '#fff1f2',
              borderRadius: '14px',
              border: '1.5px solid #fecdd3',
              cursor: 'pointer',
              marginTop: '6px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#ffe4e6',
                color: '#e11d48',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <LogOut size={18} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#be123c' }}>
                  Déconnexion
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9f1239' }}>
                  Fermer la session sur ce smartphone
                </div>
              </div>
            </div>

            <ChevronRight size={18} color="#be123c" />
          </button>

        </div>
      </div>

      {/* MODAL: MOT DE PASSE */}
      {showPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px 20px',
            maxWidth: '440px',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KeyRound size={20} color="#0b5738" />
                Modifier le mot de passe
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePassword} style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Ancien mot de passe :
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '11px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Nouveau mot de passe :
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '11px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Confirmer le nouveau mot de passe :
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '11px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#0b5738',
                    color: '#ffffff',
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

      {/* MODAL: DÉCONNEXION */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px 20px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <LogOut size={26} />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
              Fermer la session ?
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 20px' }}>
              Voulez-vous vraiment vous déconnecter du compte coursier de Jean Mbarga ?
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Oui, déconnecter
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
