import React from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA, generateWhatsAppOrderUrl } from '../../utils/formatters';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getCartSubtotal,
    setActiveView 
  } = useStore();

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();
  const hasDiscreetItems = cart.some(item => item.product.isDiscreetPackaging);
  const freeShippingThreshold = 50000;
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleWhatsAppCheckout = () => {
    const summaryItems = cart.map(i => `${i.quantity}x ${i.product.name} (${formatFCFA(i.product.price * i.quantity)})`).join('\n• ');
    const waUrl = `https://wa.me/237699000000?text=${encodeURIComponent(
      `Bonjour IFPTIE Market ! 🛒\nJe souhaite passer commande de mon panier :\n• ${summaryItems}\n\n*Total Estimé : ${formatFCFA(subtotal)}*\n\nJe réside au Cameroun. Pouvez-vous me confirmer les détails de livraison ?`
    )}`;
    window.open(waUrl, '_blank');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
  };

  return (
    <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Votre Panier</h3>
            <span className="badge badge-yellow" style={{ fontSize: '0.75rem' }}>
              {cart.reduce((s, i) => s + i.quantity, 0)} articles
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-light)',
              padding: '4px'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div style={{
          padding: '12px 20px',
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '6px',
            color: 'var(--text-main)'
          }}>
            {remainingForFree > 0 ? (
              <span>Plus que <strong>{formatFCFA(remainingForFree)}</strong> pour la livraison offerte</span>
            ) : (
              <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                🎉 Félicitations ! Livraison offerte à Douala & Yaoundé
              </span>
            )}
            <span>{progressPercent}%</span>
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: '#e2e8f0',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: progressPercent === 100 ? 'var(--color-primary)' : 'var(--color-yellow)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Cart items list */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {cart.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--text-muted)'
            }}>
              <ShoppingBag size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                Votre panier est vide
              </h4>
              <p style={{ fontSize: '0.875rem', marginBottom: '20px' }}>
                Découvrez nos arrivages de Chine et produits locaux camerounais en promotion.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setIsCartOpen(false)}
              >
                Commencer mes achats
              </button>
            </div>
          ) : (
            <>
              {hasDiscreetItems && (
                <div style={{
                  padding: '8px 12px',
                  backgroundColor: '#f5f3ff',
                  border: '1px solid #ddd6fe',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.75rem',
                  color: '#6d28d9'
                }}>
                  <ShieldCheck size={16} />
                  <span>Votre panier contient des articles expédiés sous <strong>colis hermétique 100% discret</strong>.</span>
                </div>
              )}

              {cart.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    paddingBottom: '14px',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: '#f8fafc',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.3, marginBottom: '4px' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {item.product.originLabel}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          style={{
                            border: 'none',
                            background: '#f8fafc',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            display: 'flex'
                          }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ padding: '0 10px', fontSize: '0.8125rem', fontWeight: 700 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          style={{
                            border: 'none',
                            background: '#f8fafc',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            display: 'flex'
                          }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontFamily: 'var(--font-family-heading)',
                          fontSize: '1rem',
                          fontWeight: 800,
                          color: 'var(--color-primary-dark)'
                        }}>
                          {formatFCFA(item.product.price * item.quantity)}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          color: 'var(--text-light)',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer & Checkout Buttons */}
        {cart.length > 0 && (
          <div style={{
            padding: '20px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: '#ffffff'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '14px'
            }}>
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Sous-total
              </span>
              <span style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--color-primary-dark)'
              }}>
                {formatFCFA(subtotal)}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* WhatsApp Quick Order button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="btn btn-whatsapp btn-full"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <MessageCircle size={18} />
                Commander par WhatsApp
              </button>

              {/* Standard Checkout */}
              <button
                onClick={handleProceedToCheckout}
                className="btn btn-yellow btn-full"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                Passer la commande (Livraison 24h)
                <ArrowRight size={18} />
              </button>

              {/* View Full Cart Page Link */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView('cart');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '4px'
                }}
              >
                Voir le panier complet &rarr;
              </button>
            </div>

            <div style={{
              marginTop: '12px',
              textAlign: 'center',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              🔒 Paiement sécurisé à la livraison ou par Mobile Money
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
