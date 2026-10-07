import React from 'react';
import { MOCK_REVIEWS } from '../../mock/data';
import { Star, ShieldCheck, MapPin } from 'lucide-react';

export const SocialProofSection: React.FC = () => {
  return (
    <section style={{
      marginBottom: '40px',
      backgroundColor: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      padding: '24px 16px',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-xs)'
    }}>
      {/* Title & Trust metrics */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Avis clients au Cameroun
            </h2>
            <span className="badge badge-express" style={{ fontSize: '0.65rem' }}>
              🇨🇲 98.4%
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', color: 'var(--color-yellow-hover)' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill="currentColor" />
            ))}
          </div>
          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>4.9 / 5</span>
        </div>
      </div>

      {/* Horizontally scrollable on mobile, grid on desktop */}
      <div 
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: '14px',
          overflowX: 'auto',
          paddingBottom: '6px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {MOCK_REVIEWS.map((review) => (
          <div
            key={review.id}
            style={{
              flex: '0 0 min(280px, 85vw)',
              scrollSnapAlign: 'start',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', color: 'var(--color-yellow-hover)', gap: '2px' }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>

                {review.verifiedPurchase && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: '#16a34a',
                    backgroundColor: '#dcfce7',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    <ShieldCheck size={12} />
                    Vérifié
                  </span>
                )}
              </div>

              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px' }}>
                📦 {review.productName}
              </div>

              <p style={{
                fontSize: '0.8125rem',
                color: 'var(--text-main)',
                lineHeight: 1.45,
                fontStyle: 'italic',
                marginBottom: '12px'
              }}>
                « {review.comment} »
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #e2e8f0',
              paddingTop: '8px',
              fontSize: '0.72rem'
            }}>
              <div>
                <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{review.author}</span>
                <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <MapPin size={10} color="var(--color-primary)" />
                  {review.city}
                </div>
              </div>

              <span style={{ color: 'var(--text-light)' }}>
                {review.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
