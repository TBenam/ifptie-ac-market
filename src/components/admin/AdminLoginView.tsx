import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onLoginSuccess }) => {
  const { setActiveView, addToast } = useStore();
  const [email, setEmail] = useState('admin@ifptie.cm');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const HARDCODED_PASSWORD = '1234567890';

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Veuillez saisir votre mot de passe administrateur.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (password === HARDCODED_PASSWORD) {
        sessionStorage.setItem('ifptie_admin_authenticated', 'true');
        addToast('Connexion réussie au Cockpit Administrateur !', 'success');
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError(`Mot de passe incorrect. Pour les tests, le mot de passe requis est : ${HARDCODED_PASSWORD}`);
      }
    }, 400);
  };

  const handleDemoQuickLogin = () => {
    setEmail('admin@ifptie.cm');
    setPassword(HARDCODED_PASSWORD);
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      sessionStorage.setItem('ifptie_admin_authenticated', 'true');
      addToast('Connexion rapide réussie (Mode Test) !', 'success');
      setIsLoading(false);
      onLoginSuccess();
    }, 300);
  };

  return (
    <div style={{
      minHeight: '82vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 12px 36px -4px rgba(11, 87, 56, 0.18)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}>
        {/* TOP BRAND HEADER */}
        <div style={{
          background: 'linear-gradient(135deg, #073b26 0%, #0b5738 60%, #107c50 100%)',
          color: '#ffffff',
          padding: '32px 24px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '2px solid rgba(245, 158, 11, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
          }}>
            <ShieldCheck size={36} color="var(--color-yellow)" />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-family-heading)',
            fontSize: '1.45rem',
            fontWeight: 800,
            marginBottom: '6px',
            color: '#ffffff',
            letterSpacing: '-0.3px'
          }}>
            Portail Administration
          </h2>

          <p style={{
            fontSize: '0.85rem',
            color: '#a7f3d0',
            maxWidth: '320px',
            margin: '0 auto'
          }}>
            Cockpit de gestion IFPTIE Market Cameroun
          </p>

          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px'
          }}>
            <button
              onClick={() => setActiveView('storefront')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '5px 10px',
                cursor: 'pointer',
                backdropFilter: 'blur(3px)'
              }}
              title="Retour à la boutique"
            >
              <ArrowLeft size={14} />
              <span>Boutique</span>
            </button>
          </div>
        </div>

        {/* NOTICE / BADGE MODE TEST */}
        <div style={{
          backgroundColor: '#fef3c7',
          borderBottom: '1px solid #fde68a',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.8rem',
          color: '#92400e'
        }}>
          <KeyRound size={17} color="#d97706" style={{ flexShrink: 0 }} />
          <div>
            <strong>Mode Test Actif :</strong> Mot de passe requis : <code style={{ backgroundColor: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontWeight: 800, color: '#b45309' }}>1234567890</code>
          </div>
        </div>

        {/* LOGIN FORM BODY */}
        <div style={{ padding: '28px 24px' }}>
          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '12px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              fontSize: '0.825rem',
              marginBottom: '20px'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ lineHeight: 1.4 }}>{error}</div>
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email / Identifiant */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.825rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '6px'
              }}>
                Identifiant ou Email
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px' }} />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ifptie.cm"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 40px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--border-subtle)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    color: 'var(--text-main)',
                    backgroundColor: '#ffffff'
                  }}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  color: 'var(--text-main)'
                }}>
                  Mot de passe administrateur
                </label>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                  (Test : 1234567890)
                </span>
              </div>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Saisissez 1234567890"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 44px 11px 40px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--border-subtle)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    color: 'var(--text-main)',
                    backgroundColor: '#ffffff'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  title={showPassword ? 'Masquer' : 'Afficher'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 800,
                fontSize: '0.95rem',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(11, 87, 56, 0.25)',
                marginBottom: '12px',
                cursor: isLoading ? 'wait' : 'pointer'
              }}
            >
              {isLoading ? (
                <span>Vérification en cours...</span>
              ) : (
                <>
                  <span>Accéder au Cockpit</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Quick 1-Click Demo Login */}
            <button
              type="button"
              onClick={handleDemoQuickLogin}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px dashed var(--color-primary)',
                backgroundColor: 'var(--color-primary-subtle)',
                color: 'var(--color-primary-dark)',
                fontWeight: 700,
                fontSize: '0.875rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dcfce7')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary-subtle)')}
            >
              <Sparkles size={16} color="var(--color-primary)" />
              <span>Connexion Démo en 1 Clic (1234567890)</span>
            </button>
          </form>

          {/* Footer security note */}
          <div style={{
            marginTop: '22px',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            lineHeight: 1.4
          }}>
            Session active sur ce navigateur jusqu'à déconnexion.
          </div>
        </div>
      </div>
    </div>
  );
};
