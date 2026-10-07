import React from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px',
      width: 'calc(100% - 40px)'
    }}>
      {toasts.map((toast) => {
        let icon = <Info size={18} color="#0284c7" />;
        let bg = '#ffffff';
        let border = '#e2e8f0';

        if (toast.type === 'success') {
          icon = <CheckCircle size={18} color="#10b981" />;
          border = '#a7f3d0';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle size={18} color="#f59e0b" />;
          border = '#fde68a';
        } else if (toast.type === 'error') {
          icon = <XCircle size={18} color="#ef4444" />;
          border = '#fecaca';
        }

        return (
          <div
            key={toast.id}
            style={{
              background: bg,
              borderRadius: 'var(--radius-sm)',
              border: `1.5px solid ${border}`,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              boxShadow: 'var(--shadow-md)',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {icon}
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-light)',
                display: 'flex',
                padding: '4px'
              }}
              title="Fermer"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
