import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import type { CourierTask } from '../../types';
import { CourierDeliveryDetailView } from './CourierDeliveryDetailView';
import { CourierFailedDeliveryModal } from './CourierFailedDeliveryModal';
import { CourierProfileView } from './CourierProfileView';
import { 
  Bike, 
  Phone, 
  MessageCircle, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Navigation,
  Banknote,
  Eye,
  X,
  Check,
  TrendingUp,
  Percent,
  Calendar,
  User,
  Package,
  ArrowRight,
  Shield,
  HelpCircle,
  Smartphone,
  ChevronRight,
  Map
} from 'lucide-react';

export const CourierDashboard: React.FC = () => {
  const { courierTasks, updateCourierTaskStatus, addToast } = useStore();

  // Courier internal bottom navigation state
  const [activeTab, setActiveTab] = useState<'home' | 'deliveries' | 'history' | 'profile'>('home');

  // Filter state for delivery list
  const [filterStatus, setFilterStatus] = useState<'all' | 'assigned' | 'in_route' | 'delivered' | 'failed'>('all');

  // Modal state for "Voir"
  const [selectedTask, setSelectedTask] = useState<CourierTask | null>(null);

  // Online status toggle
  const [isOnline, setIsOnline] = useState(true);

  // Failure reason modal
  const [reportingFailureTask, setReportingFailureTask] = useState<CourierTask | null>(null);
  const [failureReason, setFailureReason] = useState('Client injoignable après plusieurs appels');

  // Calculations for KPI Cards
  // - À livrer (assigned)
  // - En cours (in_route)
  // - Livrées (delivered)
  // - Échecs (failed)
  const assignedCount = courierTasks.filter(t => t.status === 'assigned').length;
  const inRouteCount = courierTasks.filter(t => t.status === 'in_route').length;
  const deliveredCount = courierTasks.filter(t => t.status === 'delivered').length;
  const failedCount = courierTasks.filter(t => t.status === 'failed').length;
  const totalTasks = courierTasks.length;

  // Performance calculations
  // Livraisons aujourd'hui
  // Taux de réussite: delivered / (delivered + failed) or delivered / total
  const completedTotal = deliveredCount + failedCount;
  const successRate = completedTotal > 0 ? Math.round((deliveredCount / completedTotal) * 100) : 100;
  
  // Montant encaissé
  const totalCollectedToday = courierTasks
    .filter(t => t.isCollected)
    .reduce((sum, t) => sum + t.totalToCollect, 0);

  const totalExpectedToday = courierTasks
    .reduce((sum, t) => sum + t.totalToCollect, 0);

  // Filtered deliveries list
  const filteredTasks = courierTasks.filter(task => {
    if (filterStatus === 'all') return true;
    return task.status === filterStatus;
  });

  // History tasks
  const historyTasks = courierTasks.filter(task => task.status === 'delivered' || task.status === 'failed');

  // Handlers
  const handleMarkDelivered = (task: CourierTask) => {
    updateCourierTaskStatus(task.id, 'delivered', true);
    addToast(`✅ Commande #${task.trackingNumber} livrée et ${formatFCFA(task.totalToCollect)} encaissés !`, 'success');
    if (selectedTask?.id === task.id) {
      setSelectedTask(null);
    }
  };

  const handleStartRoute = (task: CourierTask) => {
    updateCourierTaskStatus(task.id, 'in_route', false);
    addToast(`🛵 Commande #${task.trackingNumber} passée en cours de livraison !`, 'info');
    if (selectedTask?.id === task.id) {
      setSelectedTask({ ...selectedTask, status: 'in_route' });
    }
  };

  const handleConfirmFailure = () => {
    if (reportingFailureTask) {
      updateCourierTaskStatus(reportingFailureTask.id, 'failed', false);
      addToast(`⚠️ Échec enregistré pour #${reportingFailureTask.trackingNumber} : ${failureReason}`, 'warning');
      setReportingFailureTask(null);
      if (selectedTask?.id === reportingFailureTask.id) {
        setSelectedTask(null);
      }
    }
  };

  const openGoogleMaps = (neighborhood: string, city: string) => {
    const query = encodeURIComponent(`${neighborhood}, ${city}, Cameroun`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  if (selectedTask) {
    return (
      <CourierDeliveryDetailView 
        task={selectedTask} 
        onBack={() => setSelectedTask(null)} 
      />
    );
  }

  return (
    <div style={{
      backgroundColor: '#f1f5f9',
      minHeight: '100vh',
      paddingBottom: '90px', // space for bottom nav
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      
      {/* Top Sticky Bar for Courier */}
      <div style={{
        backgroundColor: '#073b26',
        color: '#ffffff',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: '#f59e0b',
            color: '#073b26',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bike size={18} />
          </div>
          <div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.5px' }}>
              IFPTIE COURSIER
            </span>
            <div style={{ fontSize: '0.6875rem', color: '#a7f3d0' }}>
              Moto #02 • Yaoundé
            </div>
          </div>
        </div>

        {/* Online / Offline status toggle */}
        <button
          onClick={() => setIsOnline(!isOnline)}
          style={{
            backgroundColor: isOnline ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            border: `1px solid ${isOnline ? '#22c55e' : '#ef4444'}`,
            color: isOnline ? '#86efac' : '#fca5a5',
            padding: '5px 10px',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isOnline ? '#22c55e' : '#ef4444',
            display: 'inline-block'
          }} />
          {isOnline ? 'En service' : 'En pause'}
        </button>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '16px' }}>

        {/* 1. HEADER */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          border: '1px solid #e2e8f0',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.3px' }}>
                Bonjour, Jean 👋
              </h1>
              <p style={{ fontSize: '0.9375rem', color: '#64748b', margin: 0, fontWeight: 500 }}>
                Voici vos livraisons du jour.
              </p>
            </div>
            
            <div style={{
              backgroundColor: '#ecfdf5',
              padding: '6px 12px',
              borderRadius: '10px',
              textAlign: 'right',
              border: '1px solid #a7f3d0'
            }}>
              <span style={{ fontSize: '0.6875rem', color: '#064e3b', fontWeight: 700, textTransform: 'uppercase' }}>
                Tournée
              </span>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0b5738' }}>
                {deliveredCount}/{totalTasks} Faites
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access to Priority Task #IFM-10482 */}
        <div 
          onClick={() => {
            const ifmTask = courierTasks.find(t => t.trackingNumber === 'IFM-10482') || courierTasks[0];
            setSelectedTask(ifmTask);
          }}
          style={{
            backgroundColor: '#073b26',
            color: '#ffffff',
            borderRadius: '14px',
            padding: '12px 16px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(7, 59, 38, 0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: '#f59e0b',
              color: '#073b26',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem'
            }}>
              🛵
            </div>
            <div>
              <div style={{ fontSize: '0.6875rem', color: '#a7f3d0', fontWeight: 700, textTransform: 'uppercase' }}>
                Course assignée • Bastos
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 800 }}>
                #IFM-10482 • Carine Etoa
              </div>
            </div>
          </div>
          <span style={{
            backgroundColor: '#f59e0b',
            color: '#073b26',
            borderRadius: '8px',
            padding: '6px 10px',
            fontSize: '0.75rem',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px'
          }}>
            Ouvrir la fiche <ChevronRight size={13} />
          </span>
        </div>

        {/* 2. KPI CARDS (À livrer, En cours, Livrées, Échecs) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          marginBottom: '16px'
        }}>
          {/* Card 1: À livrer */}
          <div
            onClick={() => {
              setFilterStatus('assigned');
              setActiveTab('deliveries');
            }}
            style={{
              backgroundColor: filterStatus === 'assigned' && activeTab === 'deliveries' ? '#eff6ff' : '#ffffff',
              borderRadius: '14px',
              padding: '14px',
              border: filterStatus === 'assigned' && activeTab === 'deliveries' ? '2px solid #3b82f6' : '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                À livrer
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#1e40af', marginTop: '2px' }}>
                {assignedCount}
              </div>
            </div>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#dbeafe',
              color: '#1d4ed8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Package size={20} />
            </div>
          </div>

          {/* Card 2: En cours */}
          <div
            onClick={() => {
              setFilterStatus('in_route');
              setActiveTab('deliveries');
            }}
            style={{
              backgroundColor: filterStatus === 'in_route' && activeTab === 'deliveries' ? '#fffbeb' : '#ffffff',
              borderRadius: '14px',
              padding: '14px',
              border: filterStatus === 'in_route' && activeTab === 'deliveries' ? '2px solid #f59e0b' : '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                En cours
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#b45309', marginTop: '2px' }}>
                {inRouteCount}
              </div>
            </div>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bike size={20} />
            </div>
          </div>

          {/* Card 3: Livrées */}
          <div
            onClick={() => {
              setFilterStatus('delivered');
              setActiveTab('deliveries');
            }}
            style={{
              backgroundColor: filterStatus === 'delivered' && activeTab === 'deliveries' ? '#ecfdf5' : '#ffffff',
              borderRadius: '14px',
              padding: '14px',
              border: filterStatus === 'delivered' && activeTab === 'deliveries' ? '2px solid #10b981' : '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Livrées
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#047857', marginTop: '2px' }}>
                {deliveredCount}
              </div>
            </div>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#d1fae5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={20} />
            </div>
          </div>

          {/* Card 4: Échecs */}
          <div
            onClick={() => {
              setFilterStatus('failed');
              setActiveTab('deliveries');
            }}
            style={{
              backgroundColor: filterStatus === 'failed' && activeTab === 'deliveries' ? '#fef2f2' : '#ffffff',
              borderRadius: '14px',
              padding: '14px',
              border: filterStatus === 'failed' && activeTab === 'deliveries' ? '2px solid #ef4444' : '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Échecs
              </div>
              <div style={{ fontSize: '1.625rem', fontWeight: 900, color: '#b91c1c', marginTop: '2px' }}>
                {failedCount}
              </div>
            </div>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertCircle size={20} />
            </div>
          </div>
        </div>

        {/* 3. PROMINENT DAILY PERFORMANCE SECTION */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '18px 20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          border: '1.5px solid #0b5738',
          marginBottom: '20px',
          background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: '#0b5738',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUp size={16} />
              </div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#073b26', margin: 0 }}>
                Performance du jour
              </h2>
            </div>

            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: '#ecfdf5',
              color: '#0b5738',
              padding: '3px 8px',
              borderRadius: '6px'
            }}>
              ⭐ Objectif 90%
            </span>
          </div>

          {/* 3 Prominent Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            textAlign: 'center',
            padding: '12px 6px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #d1fae5',
            marginBottom: '14px'
          }}>
            {/* Metric 1: Livraisons aujourd'hui */}
            <div>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Livraisons aujourd'hui
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#073b26' }}>
                {deliveredCount} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>/ {totalTasks}</span>
              </div>
            </div>

            {/* Metric 2: Taux de réussite */}
            <div style={{ borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Taux de réussite
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: successRate >= 80 ? '#059669' : '#d97706' }}>
                {successRate}%
              </div>
            </div>

            {/* Metric 3: Montant encaissé */}
            <div>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Montant encaissé
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0b5738' }}>
                {formatFCFA(totalCollectedToday)}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
              <span>Avancement de la tournée</span>
              <span>{Math.round((deliveredCount / totalTasks) * 100)}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                width: `${Math.round((deliveredCount / totalTasks) * 100)}%`,
                height: '100%',
                backgroundColor: '#0b5738',
                borderRadius: '999px',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>
        </div>

        {/* 4. MAIN SECTION: "Mes livraisons" (rendered on 'home' and 'deliveries' tabs) */}
        {(activeTab === 'home' || activeTab === 'deliveries') && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Mes livraisons
              </h2>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                {filteredTasks.length} commande{filteredTasks.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Filter Pills */}
            <div style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '8px',
              marginBottom: '14px',
              scrollbarWidth: 'none'
            }}>
              <button
                onClick={() => setFilterStatus('all')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: filterStatus === 'all' ? '1px solid #0b5738' : '1px solid #cbd5e1',
                  backgroundColor: filterStatus === 'all' ? '#0b5738' : '#ffffff',
                  color: filterStatus === 'all' ? '#ffffff' : '#475569'
                }}
              >
                Tous ({totalTasks})
              </button>
              <button
                onClick={() => setFilterStatus('in_route')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: filterStatus === 'in_route' ? '1px solid #d97706' : '1px solid #cbd5e1',
                  backgroundColor: filterStatus === 'in_route' ? '#fef3c7' : '#ffffff',
                  color: filterStatus === 'in_route' ? '#92400e' : '#475569'
                }}
              >
                En cours ({inRouteCount})
              </button>
              <button
                onClick={() => setFilterStatus('assigned')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: filterStatus === 'assigned' ? '1px solid #2563eb' : '1px solid #cbd5e1',
                  backgroundColor: filterStatus === 'assigned' ? '#eff6ff' : '#ffffff',
                  color: filterStatus === 'assigned' ? '#1d4ed8' : '#475569'
                }}
              >
                À livrer ({assignedCount})
              </button>
              <button
                onClick={() => setFilterStatus('delivered')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: filterStatus === 'delivered' ? '1px solid #059669' : '1px solid #cbd5e1',
                  backgroundColor: filterStatus === 'delivered' ? '#ecfdf5' : '#ffffff',
                  color: filterStatus === 'delivered' ? '#065f46' : '#475569'
                }}
              >
                Livrées ({deliveredCount})
              </button>
              <button
                onClick={() => setFilterStatus('failed')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: filterStatus === 'failed' ? '1px solid #dc2626' : '1px solid #cbd5e1',
                  backgroundColor: filterStatus === 'failed' ? '#fef2f2' : '#ffffff',
                  color: filterStatus === 'failed' ? '#991b1b' : '#475569'
                }}
              >
                Échecs ({failedCount})
              </button>
            </div>

            {/* List of Delivery Cards */}
            <div style={{ display: 'grid', gap: '14px' }}>
              {filteredTasks.map((task) => {
                const isDelivered = task.status === 'delivered';
                const isFailed = task.status === 'failed';
                const isInRoute = task.status === 'in_route';
                const isAssigned = task.status === 'assigned';
                const cleanPhone = task.customerPhone.replace(/[^0-9]/g, '');

                return (
                  <div
                    key={task.id}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '16px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                      border: isDelivered 
                        ? '1.5px solid #a7f3d0' 
                        : isInRoute 
                          ? '1.5px solid #f59e0b' 
                          : isFailed 
                            ? '1.5px solid #fecaca' 
                            : '1px solid #e2e8f0',
                      position: 'relative'
                    }}
                  >
                    {/* Top line: Order # and Status */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          fontFamily: 'monospace',
                          fontSize: '1rem',
                          fontWeight: 900,
                          color: '#073b26',
                          backgroundColor: '#f1f5f9',
                          padding: '4px 10px',
                          borderRadius: '8px'
                        }}>
                          Commande #{task.trackingNumber}
                        </span>
                        {task.trackingNumber === 'IFM-10482' && (
                          <span style={{
                            backgroundColor: '#fef3c7',
                            color: '#92400e',
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: '4px'
                          }}>
                            ⭐ PRIORITAIRE
                          </span>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div>
                        {isInRoute && (
                          <span style={{
                            backgroundColor: '#fef3c7',
                            color: '#b45309',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '999px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            ● En cours
                          </span>
                        )}
                        {isAssigned && (
                          <span style={{
                            backgroundColor: '#dbeafe',
                            color: '#1d4ed8',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '999px'
                          }}>
                            📦 À livrer
                          </span>
                        )}
                        {isDelivered && (
                          <span style={{
                            backgroundColor: '#d1fae5',
                            color: '#047857',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '999px'
                          }}>
                            ✓ Livrée
                          </span>
                        )}
                        {isFailed && (
                          <span style={{
                            backgroundColor: '#fee2e2',
                            color: '#b91c1c',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '999px'
                          }}>
                            ⚠️ Échec
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Client Name & Phone */}
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0f172a' }}>
                        {task.customerName}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>
                        {task.customerPhone}
                      </div>
                    </div>

                    {/* Neighborhood with MapPin */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      backgroundColor: '#f8fafc',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      marginBottom: '12px',
                      border: '1px solid #f1f5f9'
                    }}>
                      <MapPin size={16} color="#0b5738" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ fontSize: '0.8125rem' }}>
                        <span style={{ fontWeight: 700, color: '#1e293b' }}>
                          {task.city} - {task.neighborhood}
                        </span>
                        {task.notes && (
                          <div style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', marginTop: '3px' }}>
                            « {task.notes} »
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delivery Fee & Amount to Collect */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '10px',
                      marginBottom: '14px',
                      border: '1px solid #dcfce7'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase' }}>
                          Frais de livraison
                        </span>
                        <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#065f46' }}>
                          {task.deliveryFee ? formatFCFA(task.deliveryFee) : 'Inclus (0 FCFA)'}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#92400e', textTransform: 'uppercase' }}>
                          Montant à encaisser
                        </span>
                        <div style={{ fontSize: '1.1875rem', fontWeight: 900, color: '#0b5738' }}>
                          {formatFCFA(task.totalToCollect)}
                        </div>
                        <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                          {task.paymentMethod === 'cash_on_delivery' ? '💵 Espèces' : '📱 Mobile Money'}
                        </span>
                      </div>
                    </div>

                    {/* 4 Action Buttons: "Voir", "Appeler", "WhatsApp", "Navigation" */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '8px',
                      marginBottom: '10px'
                    }}>
                      {/* 1. Voir */}
                      <button
                        onClick={() => setSelectedTask(task)}
                        style={{
                          backgroundColor: '#f8fafc',
                          color: '#1e293b',
                          border: '1px solid #cbd5e1',
                          borderRadius: '10px',
                          padding: '9px 4px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Eye size={16} color="#475569" />
                        <span>Voir</span>
                      </button>

                      {/* 2. Appeler */}
                      <a
                        href={`tel:${task.customerPhone}`}
                        style={{
                          backgroundColor: '#ecfdf5',
                          color: '#065f46',
                          border: '1px solid #a7f3d0',
                          borderRadius: '10px',
                          padding: '9px 4px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Phone size={16} color="#059669" />
                        <span>Appeler</span>
                      </a>

                      {/* 3. WhatsApp */}
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                          `Bonjour ${task.customerName}, c'est Jean votre coursier IFPTIE Market. Je suis en route pour votre commande #${task.trackingNumber} vers ${task.neighborhood}.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          backgroundColor: '#f0fdf4',
                          color: '#15803d',
                          border: '1px solid #86efac',
                          borderRadius: '10px',
                          padding: '9px 4px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <MessageCircle size={16} color="#16a34a" />
                        <span>WhatsApp</span>
                      </a>

                      {/* 4. Navigation */}
                      <button
                        onClick={() => openGoogleMaps(task.neighborhood, task.city)}
                        style={{
                          backgroundColor: '#eff6ff',
                          color: '#1d4ed8',
                          border: '1px solid #bfdbfe',
                          borderRadius: '10px',
                          padding: '9px 4px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Navigation size={16} color="#2563eb" />
                        <span>Navigation</span>
                      </button>
                    </div>

                    {/* Primary quick flow action based on task status */}
                    {!isDelivered && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                        {isAssigned && (
                          <button
                            onClick={() => handleStartRoute(task)}
                            style={{
                              flex: 1,
                              backgroundColor: '#f59e0b',
                              color: '#073b26',
                              border: 'none',
                              borderRadius: '10px',
                              padding: '11px',
                              fontSize: '0.8125rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                          >
                            <Bike size={16} />
                            <span>Démarrer la course</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleMarkDelivered(task)}
                          style={{
                            flex: 1,
                            backgroundColor: '#0b5738',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '11px',
                            fontSize: '0.8125rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            boxShadow: '0 2px 6px rgba(11, 87, 56, 0.25)'
                          }}
                        >
                          <CheckCircle2 size={16} />
                          <span>Valider & Encaisser</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. HISTORIQUE TAB CONTENT */}
        {activeTab === 'history' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                Historique des livraisons
              </h2>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>
                Courses finalisées et encaissées aujourd'hui.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {historyTasks.length === 0 ? (
                <div style={{ backgroundColor: '#ffffff', padding: '32px 16px', textAlign: 'center', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <Clock size={36} color="#94a3b8" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: 700, color: '#475569' }}>Aucune course finalisée pour l'instant</div>
                </div>
              ) : (
                historyTasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      padding: '14px 16px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0f172a' }}>
                          #{task.trackingNumber}
                        </span>
                        <span style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: task.status === 'delivered' ? '#dcfce7' : '#fee2e2',
                          color: task.status === 'delivered' ? '#166534' : '#991b1b'
                        }}>
                          {task.status === 'delivered' ? '✓ Livré' : '⚠️ Échec'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '2px' }}>
                        {task.customerName} • {task.neighborhood}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#0b5738' }}>
                        {formatFCFA(task.totalToCollect)}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                        {task.isCollected ? 'Encaissé' : 'Non encaissé'}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 6. PROFIL TAB CONTENT */}
        {activeTab === 'profile' && (
          <CourierProfileView onBackToDeliveries={() => setActiveTab('deliveries')} />
        )}

      </div>



      {/* 8. REPORT FAILURE WORKFLOW MODAL */}
      {reportingFailureTask && (
        <CourierFailedDeliveryModal
          task={reportingFailureTask}
          isOpen={!!reportingFailureTask}
          onClose={() => setReportingFailureTask(null)}
          onSubmitFailure={(reason, comment, action) => {
            updateCourierTaskStatus(reportingFailureTask.id, 'failed', false);
            addToast(`⚠️ Échec enregistré pour #${reportingFailureTask.trackingNumber} : ${reason} → Action : ${action}`, 'warning');
            setReportingFailureTask(null);
          }}
        />
      )}

      {/* 9. BOTTOM NAVIGATION (Accueil, Livraisons, Historique, Profil) */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        zIndex: 50,
        padding: '6px 0 8px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.06)'
      }}>
        {/* 1. Accueil */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: activeTab === 'home' ? '#0b5738' : '#64748b',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <Bike size={20} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span style={{ fontSize: '0.6875rem', fontWeight: activeTab === 'home' ? 800 : 500 }}>
            Accueil
          </span>
        </button>

        {/* 2. Livraisons */}
        <button
          onClick={() => {
            setActiveTab('deliveries');
            setFilterStatus('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: activeTab === 'deliveries' ? '#0b5738' : '#64748b',
            cursor: 'pointer',
            padding: '4px',
            position: 'relative'
          }}
        >
          <Package size={20} strokeWidth={activeTab === 'deliveries' ? 2.5 : 2} />
          <span style={{ fontSize: '0.6875rem', fontWeight: activeTab === 'deliveries' ? 800 : 500 }}>
            Livraisons
          </span>
          {inRouteCount + assignedCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '2px',
              right: 'calc(50% - 16px)',
              backgroundColor: '#f59e0b',
              color: '#073b26',
              fontSize: '0.625rem',
              fontWeight: 800,
              borderRadius: '999px',
              minWidth: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 3px'
            }}>
              {inRouteCount + assignedCount}
            </span>
          )}
        </button>

        {/* 3. Historique */}
        <button
          onClick={() => {
            setActiveTab('history');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: activeTab === 'history' ? '#0b5738' : '#64748b',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <Clock size={20} strokeWidth={activeTab === 'history' ? 2.5 : 2} />
          <span style={{ fontSize: '0.6875rem', fontWeight: activeTab === 'history' ? 800 : 500 }}>
            Historique
          </span>
        </button>

        {/* 4. Profil */}
        <button
          onClick={() => {
            setActiveTab('profile');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: activeTab === 'profile' ? '#0b5738' : '#64748b',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <User size={20} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span style={{ fontSize: '0.6875rem', fontWeight: activeTab === 'profile' ? 800 : 500 }}>
            Profil
          </span>
        </button>
      </nav>

    </div>
  );
};
