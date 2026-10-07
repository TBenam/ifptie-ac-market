import React, { useState } from 'react';
import type { CourierTask } from '../../types';
import { 
  X, 
  AlertCircle, 
  CalendarClock, 
  Building2, 
  Headphones, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  ChevronRight,
  UserX,
  PhoneOff,
  MapPinOff,
  Ban,
  CreditCard,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface CourierFailedDeliveryModalProps {
  task: CourierTask;
  isOpen: boolean;
  onClose: () => void;
  onSubmitFailure: (reason: string, comment: string, nextAction: string) => void;
}

export const CourierFailedDeliveryModal: React.FC<CourierFailedDeliveryModalProps> = ({
  task,
  isOpen,
  onClose,
  onSubmitFailure
}) => {
  // Selectable reasons requested:
  // - Client absent
  // - Client injoignable
  // - Adresse incorrecte
  // - Client a refusé la commande
  // - Problème de paiement
  // - Autre
  const reasons = [
    {
      id: 'Client absent',
      label: 'Client absent',
      sublabel: 'Personne au domicile ou sur le lieu de rendez-vous',
      icon: UserX,
      color: '#d97706'
    },
    {
      id: 'Client injoignable',
      label: 'Client injoignable',
      sublabel: 'Ne répond pas aux appels, téléphone éteint ou occupé',
      icon: PhoneOff,
      color: '#dc2626'
    },
    {
      id: 'Adresse incorrecte',
      label: 'Adresse incorrecte',
      sublabel: 'Quartier ou repère introuvable, coordonnées fausses',
      icon: MapPinOff,
      color: '#7c3aed'
    },
    {
      id: 'Client a refusé la commande',
      label: 'Client a refusé la commande',
      sublabel: 'A changé d\'avis, refus du prix ou colis non conforme',
      icon: Ban,
      color: '#b91c1c'
    },
    {
      id: 'Problème de paiement',
      label: 'Problème de paiement',
      sublabel: 'Fonds insuffisants en espèces ou Mobile Money échoué',
      icon: CreditCard,
      color: '#ea580c'
    },
    {
      id: 'Autre',
      label: 'Autre',
      sublabel: 'Météo extrême, panne, ou motif particulier',
      icon: HelpCircle,
      color: '#475569'
    }
  ];

  // States
  const [selectedReason, setSelectedReason] = useState<string>('Client injoignable');
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedNextAction, setSelectedNextAction] = useState<string | null>(null);
  const [reprogramSlot, setReprogramSlot] = useState('Demain matin (09h - 12h)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleFinishWithAction = (action: string) => {
    setSelectedNextAction(action);
    const finalComment = comment ? `${comment} [Action: ${action}]` : `[Action: ${action}]`;
    onSubmitFailure(selectedReason, finalComment, action);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 120,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: '0',
      backdropFilter: 'blur(3px)'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '560px',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        padding: '24px 20px 32px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 -8px 30px rgba(0,0,0,0.25)',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>

        {/* Modal Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Signalement d'incident
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: '2px 0 0', letterSpacing: '-0.3px' }}>
              Pourquoi la livraison a échoué ?
            </h2>
            <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '2px' }}>
              Commande #{task.trackingNumber} • {task.customerName} ({task.neighborhood})
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* STEP 1: FORM TO RECORD FAILURE */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            {/* Selectable Reasons */}
            <div style={{ display: 'grid', gap: '8px', marginBottom: '16px' }}>
              {reasons.map((r) => {
                const isSelected = selectedReason === r.id;
                const IconComponent = r.icon;

                return (
                  <label
                    key={r.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #dc2626' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? '#fef2f2' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <input
                      type="radio"
                      name="failureReason"
                      value={r.id}
                      checked={isSelected}
                      onChange={() => setSelectedReason(r.id)}
                      style={{
                        accentColor: '#dc2626',
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer'
                      }}
                    />

                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#fee2e2' : '#f1f5f9',
                      color: r.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconComponent size={18} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 800, color: isSelected ? '#991b1b' : '#1e293b' }}>
                        {r.label}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {r.sublabel}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Optional Comment Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>
                Commentaire / Précisions (optionnel) :
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ex: 3 appels passés entre 14h10 et 14h25 sans réponse. Message WhatsApp envoyé. Le gardien confirme que le client est sorti."
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Primary CTA */}
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '14px',
                padding: '16px',
                fontSize: '1rem',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                letterSpacing: '0.3px'
              }}
            >
              <AlertCircle size={20} />
              <span>Enregistrer l'échec</span>
            </button>
          </form>
        ) : (
          /* STEP 2: RECOMMENDED NEXT ACTIONS AFTER SUBMISSION */
          <div>
            {/* Confirmation Banner */}
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              padding: '14px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle2 size={22} color="#dc2626" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#991b1b' }}>
                  Échec enregistré : « {selectedReason} »
                </div>
                <div style={{ fontSize: '0.75rem', color: '#b91c1c' }}>
                  La commande #{task.trackingNumber} a été mise à jour dans le système logistique.
                </div>
              </div>
            </div>

            {/* Headline */}
            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                SUITE À DONNER
              </span>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 900, color: '#0f172a', margin: '2px 0 0' }}>
                Action recommandée pour ce colis :
              </h3>
            </div>

            {/* 3 Recommended Next Action Options */}
            <div style={{ display: 'grid', gap: '12px', marginBottom: '20px' }}>
              
              {/* ACTION 1: Reprogrammation */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #3b82f6',
                borderRadius: '14px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#dbeafe',
                    color: '#1d4ed8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CalendarClock size={18} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: '#1e40af' }}>
                      Reprogrammation
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Idéal si le client a demandé un report ou était temporairement absent
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <select
                    value={reprogramSlot}
                    onChange={(e) => setReprogramSlot(e.target.value)}
                    style={{
                      flex: 1,
                      minWidth: '180px',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8125rem',
                      fontWeight: 600
                    }}
                  >
                    <option value="Demain matin (09h - 12h)">Demain matin (09h - 12h)</option>
                    <option value="Demain après-midi (14h - 17h)">Demain après-midi (14h - 17h)</option>
                    <option value="Après-demain (Même créneau)">Après-demain (Même créneau)</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleFinishWithAction(`Reprogrammé pour ${reprogramSlot}`)}
                    style={{
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '9px 14px',
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Valider reprogrammation</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* ACTION 2: Retour à l'entrepôt */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #d97706',
                borderRadius: '14px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: '#fef3c7',
                      color: '#b45309',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Building2 size={18} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: '#92400e' }}>
                        Retour à l'entrepôt
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Conserver le colis scellé pour le déposer au Hub Central (Mvan)
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleFinishWithAction("Retour à l'entrepôt de Mvan prévu en fin de tournée")}
                    style={{
                      backgroundColor: '#f59e0b',
                      color: '#073b26',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '9px 14px',
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginLeft: 'auto'
                    }}
                  >
                    <span>Confirmer retour dépôt</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* ACTION 3: Contacter l'administration */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #059669',
                borderRadius: '14px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: '#d1fae5',
                      color: '#047857',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Headphones size={18} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: '#065f46' }}>
                        Contacter l'administration
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Joindre le superviseur régulation IFPTIE pour arbitrage immédiat
                      </span>
                    </div>
                  </div>

                  <a
                    href="tel:+237690000000"
                    onClick={() => handleFinishWithAction("Administration contactée par téléphone")}
                    style={{
                      backgroundColor: '#0b5738',
                      color: '#ffffff',
                      borderRadius: '8px',
                      padding: '9px 14px',
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginLeft: 'auto'
                    }}
                  >
                    <Phone size={14} />
                    <span>Appeler régulateur (+237 690...)</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Done button */}
            <button
              onClick={onClose}
              style={{
                width: '100%',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Fermer et revenir à mes livraisons
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
