import React from 'react';
import { useStore } from '../../store/useStore';
import { formatFCFA } from '../../utils/formatters';
import { MOCK_PRODUCTS } from '../../mock/data';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  MessageCircle,
  HelpCircle,
  Sparkles,
  Zap
} from 'lucide-react';

export const CartView: React.FC = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartSubtotal, 
    setActiveView,
    addToast,
    addToCart,
    setSelectedProduct
  } = useStore();

  const subtotal = getCartSubtotal();
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Delivery calculation: Free for orders >= 25,000 FCFA, otherwise 1,500 FCFA
  const isFreeDelivery = subtotal >= 25000;
  const deliveryFee = subtotal > 0 ? (isFreeDelivery ? 0 : 1500) : 0;

  // Calculate total original price to determine overall discount
  const totalOriginalPrice = cart.reduce((acc, item) => {
    const orig = item.product.originalPrice || item.product.price;
    return acc + (orig * item.quantity);
  }, 0);

  const totalDiscount = Math.max(0, totalOriginalPrice - subtotal);
  const finalTotal = subtotal + deliveryFee;

  const handleProceedToCheckout = () => {
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppHelp = () => {
    const message = encodeURIComponent(
      `Bonjour IFPTIE Market, j'ai une question concernant les articles de mon panier (Total : ${formatFCFA(finalTotal)}). Pouvez-vous m'assister ?`
    );
    window.open(`https://wa.me/237699000000?text=${message}`, '_blank');
  };

  // =========================================================================
  // EMPTY CART STATE
  // =========================================================================
  if (cart.length === 0) {
    const suggestedProducts = MOCK_PRODUCTS.filter(p => p.isFlashDeal || p.isBestSeller).slice(0, 4);

    return (
      <div style={{ backgroundColor: '#fcfbf7', minHeight: '80vh', padding: '40px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginBottom: '28px'
          }}>
            <span onClick={() => setActiveView('storefront')} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>
              Accueil
            </span>
            <ChevronRight size={13} />
            <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>Votre panier</span>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--border-subtle)',
            padding: '48px 24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            marginBottom: '40px'
          }}>
            {/* Empty Bag Graphic */}
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-subtle)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <ShoppingBag size={40} />
            </div>

            {/* Exact Required Empty Cart Message */}
            <h1 style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-main)',
              margin: '0 0 10px 0'
            }}>
              Votre panier est vide
            </h1>

            <p style={{
              fontSize: '0.95rem',
              color: 'var(--text-muted)',
              maxWidth: '440px',
              margin: '0 auto 26px auto',
              lineHeight: 1.5
            }}>
              Vous n'avez pas encore ajouté de produit. Explorez nos arrivages solaires, maison et high-tech à prix direct fournisseur.
            </p>

            {/* Exact Required Empty Cart CTA */}
            <button
              onClick={() => {
                setActiveView('storefront');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-yellow"
              style={{
                padding: '13px 28px',
                fontWeight: 800,
                fontSize: '1rem',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={18} />
              <span>Découvrir les produits</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Suggested Best Sellers */}
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
              🔥 Produits populaires du moment au Cameroun
            </h3>
            <div className="product-grid-2col">
              {suggestedProducts.map(prod => (
                <div 
                  key={prod.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}
                >
                  <div 
                    style={{ display: 'flex', gap: '12px', cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedProduct(prod);
                      setActiveView('product-detail');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <img 
                      src={prod.images[0]} 
                      alt={prod.name} 
                      style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px 0', lineHeight: 1.3 }}>
                        {prod.name}
                      </h4>
                      <span style={{ fontWeight: 800, color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                        {formatFCFA(prod.price)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(prod, 1);
                      addToast(`"${prod.name.slice(0, 25)}..." ajouté au panier !`, 'success');
                    }}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', padding: '8px' }}
                  >
                    Ajouter au panier
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // ACTIVE CART STATE
  // =========================================================================
  return (
    <div style={{ backgroundColor: '#fcfbf7', minHeight: '90vh', paddingBottom: '90px' }}>
      {/* 1. BREADCRUMB */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '12px 0',
        fontSize: '0.8rem'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-muted)'
        }}>
          <span 
            onClick={() => setActiveView('storefront')} 
            style={{ cursor: 'pointer', color: 'var(--color-primary)', fontWeight: 600 }}
          >
            Accueil
          </span>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>
            Votre panier ({totalItemsCount})
          </span>
        </div>
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="container" style={{ paddingTop: '24px' }}>
        {/* Exact Required Title */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px',
          borderBottom: '2px solid #fed7aa',
          paddingBottom: '14px'
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)',
              fontWeight: 900,
              color: 'var(--text-main)',
              margin: '0 0 4px 0'
            }}>
              Votre panier
            </h1>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
              Vérifiez vos articles avant de finaliser la commande avec paiement à la livraison.
            </p>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Voulez-vous vraiment vider votre panier ?')) {
                clearCart();
                addToast('Panier vidé', 'info');
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#dc2626',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Trash2 size={14} />
            <span>Vider le panier</span>
          </button>
        </div>

        {/* Layout Grid: Items on Left, Order Summary on Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* =========================================================================
              LEFT COLUMN: CART ITEMS LIST
              ========================================================================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {cart.map((item) => {
              const unitDiscountPercent = item.product.originalPrice && item.product.originalPrice > item.product.price
                ? Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)
                : 0;

              return (
                <div 
                  key={item.product.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    padding: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    display: 'grid',
                    gridTemplateColumns: '84px 1fr auto',
                    gap: '16px',
                    alignItems: 'center'
                  }}
                >
                  {/* Product Image */}
                  <div 
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#f8fafc',
                      cursor: 'pointer',
                      border: '1px solid var(--border-subtle)',
                      flexShrink: 0
                    }}
                    onClick={() => {
                      setSelectedProduct(item.product);
                      setActiveView('product-detail');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Product Details */}
                  <div>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '2px'
                    }}>
                      {item.product.categoryLabel}
                    </span>

                    <h3 
                      onClick={() => {
                        setSelectedProduct(item.product);
                        setActiveView('product-detail');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: 'var(--text-main)',
                        margin: '0 0 4px 0',
                        cursor: 'pointer',
                        lineHeight: 1.35
                      }}
                    >
                      {item.product.name}
                    </h3>

                    {/* Variant if applicable */}
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px' }}>
                      <span>Modèle : <strong>Standard Haute Performance</strong></span>
                      {item.product.origin === 'local' ? ' • 🇨🇲 Local' : ' • 🇨🇳 Import Direct'}
                    </div>

                    {/* Unit Price & Discount */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#b45309' }}>
                        {formatFCFA(item.product.price)}
                      </span>

                      {item.product.originalPrice && (
                        <span style={{ fontSize: '0.78rem', textDecoration: 'line-through', color: '#94a3b8' }}>
                          {formatFCFA(item.product.originalPrice)}
                        </span>
                      )}

                      {unitDiscountPercent > 0 && (
                        <span style={{
                          backgroundColor: 'var(--color-yellow)',
                          color: '#78350f',
                          fontSize: '0.68rem',
                          fontWeight: 900,
                          padding: '1px 5px',
                          borderRadius: '3px'
                        }}>
                          -{unitDiscountPercent}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    {/* Remove button */}
                    <button
                      onClick={() => {
                        removeFromCart(item.product.id);
                        addToast(`"${item.product.name.slice(0, 20)}..." retiré`, 'info');
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                      title="Supprimer l'article"
                    >
                      <Trash2 size={16} />
                    </button>

                    {/* Quantity Selector (- / +) */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      backgroundColor: '#f8fafc'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Minus size={13} />
                      </button>

                      <span style={{
                        width: '32px',
                        textAlign: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: 'var(--text-main)'
                      }}>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div style={{ fontWeight: 900, fontSize: '0.95rem', color: 'var(--color-primary-dark)' }}>
                      {formatFCFA(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Free shipping progress alert */}
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: 'var(--radius-md)',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={20} color="#16a34a" />
                <span style={{ color: '#166534', fontWeight: 600 }}>
                  {isFreeDelivery 
                    ? '🎉 Félicitations ! La livraison est GRATUITE sur cette commande.' 
                    : `Ajoutez encore ${formatFCFA(25000 - subtotal)} pour bénéficier de la livraison GRATUITE.`}
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: ORDER SUMMARY & CHECKOUT CTA
              ========================================================================= */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--border-subtle)',
              padding: '24px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 900,
                color: 'var(--text-main)',
                margin: '0 0 16px 0',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '12px'
              }}>
                Récapitulatif de la commande
              </h2>

              {/* Order summary table requested: Sous-total, Livraison, Réduction, Total */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '20px' }}>
                {/* 1. Sous-total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Sous-total ({totalItemsCount} article{totalItemsCount > 1 ? 's' : ''})</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{formatFCFA(subtotal)}</span>
                </div>

                {/* 2. Livraison */}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Livraison estimée</span>
                  {deliveryFee === 0 ? (
                    <span style={{ color: '#16a34a', fontWeight: 800 }}>GRATUITE</span>
                  ) : (
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{formatFCFA(deliveryFee)}</span>
                  )}
                </div>

                {/* 3. Réduction */}
                {totalDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                    <span>Réduction totale</span>
                    <span style={{ fontWeight: 800 }}>-{formatFCFA(totalDiscount)}</span>
                  </div>
                )}

                {/* 4. Total */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderTop: '2px dashed #e2e8f0',
                  paddingTop: '14px',
                  marginTop: '4px'
                }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-main)' }}>
                    Total à payer
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: '1.45rem',
                    fontWeight: 900,
                    color: '#b45309'
                  }}>
                    {formatFCFA(finalTotal)}
                  </span>
                </div>
              </div>

              {/* =========================================================================
                  CTA: "Passer la commande"
                  ========================================================================= */}
              <button
                onClick={handleProceedToCheckout}
                className="btn btn-yellow"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: '0 6px 18px rgba(245, 158, 11, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  border: '1.5px solid #d97706',
                  marginBottom: '16px'
                }}
              >
                <Zap size={18} fill="#78350f" />
                <span>Passer la commande</span>
                <ArrowRight size={18} />
              </button>

              {/* Exact Reassuring Message requested */}
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 12px',
                textAlign: 'center',
                marginBottom: '18px'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  color: 'var(--color-primary-dark)'
                }}>
                  <Lock size={15} color="var(--color-primary)" />
                  <span>Commande simple et sécurisée.</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                  Aucun paiement par carte bancaire requis à l'avance.
                </div>
              </div>

              {/* Payment Methods Section requested */}
              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '14px'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Moyens de paiement acceptés :
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                    <span style={{ fontSize: '1.1rem' }}>💵</span>
                    <span><strong>Paiement à la livraison</strong> (espèces après vérification)</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                    <span style={{ fontSize: '1.1rem' }}>📱</span>
                    <span><strong>Mobile Money</strong> (Orange Money & MTN MoMo)</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Help Shortcut */}
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <button
                  onClick={handleWhatsAppHelp}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#15803d',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <MessageCircle size={14} color="#16a34a" />
                  <span>Besoin d'aide ? Contactez un conseiller WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. MOBILE STICKY CHECKOUT BAR
          Keeps checkout CTA sticky at the bottom as requested.
          ========================================================================= */}
      <div 
        className="mobile-only"
        style={{
          position: 'fixed',
          bottom: '56px', // Sits above mobile bottom nav
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderTop: '2px solid var(--color-yellow)',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.12)',
          padding: '10px 14px',
          zIndex: 840,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1 }}>
            Total ({totalItemsCount} art.) :
          </span>
          <span style={{
            fontFamily: 'var(--font-family-heading)',
            fontSize: '1.25rem',
            fontWeight: 900,
            color: '#b45309',
            lineHeight: 1.2
          }}>
            {formatFCFA(finalTotal)}
          </span>
          <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 800 }}>
            Paiement à la livraison
          </span>
        </div>

        <button
          onClick={handleProceedToCheckout}
          className="btn btn-yellow"
          style={{
            padding: '12px 20px',
            fontSize: '0.9rem',
            fontWeight: 900,
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          <span>Passer la commande</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
