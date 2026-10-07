import React, { useState, useMemo } from 'react';
import {
  Star,
  MessageSquareQuote,
  CheckCircle2,
  EyeOff,
  Trash2,
  Reply,
  Plus,
  Filter,
  Search,
  Calendar,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  X,
  Send,
  User,
  Package,
  Clock,
  ThumbsUp,
  Tag
} from 'lucide-react';

export type ReviewStatus = 'published' | 'hidden' | 'pending';
export type ReviewType = 'verified_customer' | 'marketing_testimonial';

export interface AdminReview {
  id: string;
  customerName: string;
  customerPhone?: string;
  customerCity?: string;
  productName: string;
  productSku: string;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
  type: ReviewType;
  adminReply?: {
    text: string;
    repliedAt: string;
    author: string;
  };
}

const INITIAL_REVIEWS: AdminReview[] = [
  {
    id: 'rev-1',
    customerName: 'Mamadou Ousmanou',
    customerPhone: '+237 699 44 22 11',
    customerCity: 'Garoua',
    productName: 'Kit Solaire Autonome 200W + 4 Ampoules LED',
    productSku: 'SOL-KIT-200W',
    rating: 5,
    comment: 'Super produit ! Installé dans ma boutique à Garoua, aucun souci même avec les coupures régulières. La livraison par car était bien sécurisée.',
    date: '2026-09-18',
    status: 'published',
    type: 'verified_customer',
    adminReply: {
      text: 'Merci beaucoup M. Ousmanou pour votre confiance ! Nous restons à votre entière disposition pour tout conseil technique.',
      repliedAt: '2026-09-18',
      author: 'Service Client IFPTIE'
    }
  },
  {
    id: 'rev-2',
    customerName: 'Rosine Kemgang',
    customerPhone: '+237 675 33 88 99',
    customerCity: 'Douala (Akwa)',
    productName: 'Marmite Cuiseur Pression Inox 9L Haute Sécurité',
    productSku: 'CUIS-PRES-9L',
    rating: 5,
    comment: 'Très belle finition et cuisson ultra rapide des aliments. Livraison en 3h chrono à Akwa avec paiement Cash à l arrivée. Je recommande vivement.',
    date: '2026-09-17',
    status: 'published',
    type: 'verified_customer'
  },
  {
    id: 'rev-3',
    customerName: 'Dr. Jean-Paul Mbarga',
    customerPhone: '+237 698 12 34 56',
    customerCity: 'Yaoundé (Bastos)',
    productName: 'Lampe Solaire LED Rechargeable 100W IP67',
    productSku: 'SOL-LED-100W',
    rating: 4,
    comment: 'Éclairage puissant pour la cour de ma villa. La télécommande fonctionne bien à distance. Seul bémol : le livreur avait un léger retard de 30 minutes.',
    date: '2026-09-16',
    status: 'published',
    type: 'verified_customer',
    adminReply: {
      text: 'Bonjour Dr Mbarga, nous nous excusons pour le léger contretemps de livraison lié aux embouteillages de Yaoundé. Ravi que la lampe solaire réponde à vos attentes !',
      repliedAt: '2026-09-16',
      author: 'Équipe Logistique IFPTIE'
    }
  },
  {
    id: 'rev-4',
    customerName: 'Cabinet Dentaire Dr. Eboa (Témoignage Partenaire)',
    customerCity: 'Douala (Bonanjo)',
    productName: 'Batterie Gel Solaire Cycle Profond 12V 100Ah',
    productSku: 'SOL-BAT-100AH',
    rating: 5,
    comment: '« En tant que cabinet médical, nous ne pouvons tolérer aucune coupure. Grâce aux batteries solaires IFPTIE Market, nos équipements sensibles restent sous tension en permanence. Un investissement indispensable pour les professionnels au Cameroun. »',
    date: '2026-09-12',
    status: 'published',
    type: 'marketing_testimonial'
  },
  {
    id: 'rev-5',
    customerName: 'Alain Fotso',
    customerPhone: '+237 671 22 45 78',
    customerCity: 'Bafoussam',
    productName: 'Perceuse Visseuse Sans Fil 21V + Valise 24 Accessoires',
    productSku: 'OUT-PERC-21V',
    rating: 3,
    comment: 'L appareil fonctionne bien mais la deuxième batterie s est déchargée un peu vite au premier cycle. Le reste des mèches et embouts est solide.',
    date: '2026-09-15',
    status: 'pending',
    type: 'verified_customer'
  },
  {
    id: 'rev-6',
    customerName: 'Sandrine Nguemo',
    customerPhone: '+237 655 89 12 34',
    customerCity: 'Yaoundé (Mendong)',
    productName: 'Ventilateur Rechargeable Solaire 16 Pouces',
    productSku: 'SOL-FAN-16P',
    rating: 2,
    comment: 'Le ventilateur est bien silencieux mais la prise secteur était absente du colis lors de la livraison. J ai dû contacter le support WhatsApp.',
    date: '2026-09-14',
    status: 'hidden',
    type: 'verified_customer',
    adminReply: {
      text: 'Bonjour Sandrine, notre livreur est repassé vous remettre le câble manquant dès le lendemain. Nous vous renouvelons nos sincères excuses pour cet oubli.',
      repliedAt: '2026-09-15',
      author: 'Support Qualité IFPTIE'
    }
  },
  {
    id: 'rev-7',
    customerName: 'Boutique Le Confort d Étoudi (Témoignage Commerçant)',
    customerCity: 'Yaoundé',
    productName: 'Lampe Solaire LED Rechargeable 100W IP67',
    productSku: 'SOL-LED-100W',
    rating: 5,
    comment: '« Nous avons équipé toute la devanture et les allées de notre supermarché. Nos charges d électricité ont baissé de façon spectaculaire. Livraison rapide et assistance irréprochable. »',
    date: '2026-09-10',
    status: 'published',
    type: 'marketing_testimonial'
  },
  {
    id: 'rev-8',
    customerName: 'Christian Bella',
    customerPhone: '+237 690 11 22 33',
    customerCity: 'Kribi',
    productName: 'Écouteurs Sans Fil TWS Bluetooth 5.3 Anti-Bruit',
    productSku: 'ELEC-TWS-B53',
    rating: 1,
    comment: 'Colis reçu avec la boîte légèrement écrasée pendant le transport par agence. Heureusement les écouteurs fonctionnent mais l emballage n était pas soigné.',
    date: '2026-09-11',
    status: 'hidden',
    type: 'verified_customer'
  }
];

export const AdminReviewsView: React.FC = () => {
  const [reviews, setReviews] = useState<AdminReview[]>(INITIAL_REVIEWS);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProduct, setFilterProduct] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [filterType, setFilterType] = useState<'all' | 'verified_customer' | 'marketing_testimonial'>('all');

  // Reply modal state
  const [replyingReview, setReplyingReview] = useState<AdminReview | null>(null);
  const [replyText, setReplyText] = useState('');

  // Marketing testimonial creation modal state
  const [isCreatingTestimonial, setIsCreatingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    customerName: '',
    customerCity: 'Douala',
    productName: 'Kit Solaire Autonome 200W + 4 Ampoules LED',
    productSku: 'SOL-KIT-200W',
    rating: 5,
    comment: '',
    status: 'published' as ReviewStatus
  });

  // Action notification toast
  const [notice, setNotice] = useState<string | null>(null);
  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  // Calculations for rating overview
  const stats = useMemo(() => {
    const total = reviews.length;
    const sumRating = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = total > 0 ? (sumRating / total).toFixed(1) : '0.0';

    const count5 = reviews.filter(r => r.rating === 5).length;
    const count4 = reviews.filter(r => r.rating === 4).length;
    const count3 = reviews.filter(r => r.rating === 3).length;
    const count2 = reviews.filter(r => r.rating === 2).length;
    const count1 = reviews.filter(r => r.rating === 1).length;

    return {
      average,
      total,
      breakdown: [
        { stars: 5, count: count5, pct: total > 0 ? Math.round((count5 / total) * 100) : 0 },
        { stars: 4, count: count4, pct: total > 0 ? Math.round((count4 / total) * 100) : 0 },
        { stars: 3, count: count3, pct: total > 0 ? Math.round((count3 / total) * 100) : 0 },
        { stars: 2, count: count2, pct: total > 0 ? Math.round((count2 / total) * 100) : 0 },
        { stars: 1, count: count1, pct: total > 0 ? Math.round((count1 / total) * 100) : 0 },
      ],
      publishedCount: reviews.filter(r => r.status === 'published').length,
      hiddenCount: reviews.filter(r => r.status === 'hidden').length,
      pendingCount: reviews.filter(r => r.status === 'pending').length,
      marketingCount: reviews.filter(r => r.type === 'marketing_testimonial').length,
    };
  }, [reviews]);

  // Unique products for filter dropdown
  const uniqueProducts = useMemo(() => {
    const prods = new Set(reviews.map(r => r.productName));
    return Array.from(prods);
  }, [reviews]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter(r => {
      const matchesSearch = r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.productName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProduct = filterProduct === 'all' || r.productName === filterProduct;
      const matchesRating = filterRating === 'all' || r.rating === Number(filterRating);
      const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
      const matchesType = filterType === 'all' || r.type === filterType;

      let matchesDate = true;
      if (filterDate === '7days') {
        matchesDate = r.date >= '2026-09-13';
      } else if (filterDate === '30days') {
        matchesDate = r.date >= '2026-08-20';
      }

      return matchesSearch && matchesProduct && matchesRating && matchesStatus && matchesType && matchesDate;
    });
  }, [reviews, searchQuery, filterProduct, filterRating, filterStatus, filterType, filterDate]);

  // Actions
  const handlePublish = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'published' } : r));
    showNotice('Avis publié avec succès sur la boutique en ligne !');
  };

  const handleHide = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'hidden' } : r));
    showNotice('Avis masqué du site public.');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet avis définitivement ?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
      showNotice('Avis supprimé définitivement.');
    }
  };

  const handleOpenReply = (review: AdminReview) => {
    setReplyingReview(review);
    setReplyText(review.adminReply?.text || '');
  };

  const handleSaveReply = () => {
    if (!replyingReview) return;
    setReviews(prev => prev.map(r => {
      if (r.id === replyingReview.id) {
        return {
          ...r,
          adminReply: {
            text: replyText.trim(),
            repliedAt: '2026-09-20',
            author: 'Support IFPTIE Market'
          }
        };
      }
      return r;
    }));
    setReplyingReview(null);
    setReplyText('');
    showNotice('Réponse officielle publiée sous l avis client.');
  };

  const handleCreateTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.customerName.trim() || !newTestimonial.comment.trim()) {
      alert('Veuillez renseigner le nom de l auteur et le texte du témoignage.');
      return;
    }

    const created: AdminReview = {
      id: `mkt-${Date.now()}`,
      customerName: newTestimonial.customerName.trim(),
      customerCity: newTestimonial.customerCity,
      productName: newTestimonial.productName,
      productSku: newTestimonial.productSku,
      rating: newTestimonial.rating,
      comment: newTestimonial.comment.trim(),
      date: '2026-09-20',
      status: newTestimonial.status,
      type: 'marketing_testimonial',
      adminReply: undefined
    };

    setReviews(prev => [created, ...prev]);
    setIsCreatingTestimonial(false);
    setNewTestimonial({
      customerName: '',
      customerCity: 'Douala',
      productName: 'Kit Solaire Autonome 200W + 4 Ampoules LED',
      productSku: 'SOL-KIT-200W',
      rating: 5,
      comment: '',
      status: 'published'
    });
    showNotice('Nouveau témoignage marketing créé avec succès !');
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* ACTION NOTICE TOAST */}
      {notice && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} color="#10b981" />
          <span>{notice}</span>
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
              <MessageSquareQuote size={24} />
            </div>
            <div>
              <h1 style={{
                fontSize: '1.75rem',
                fontWeight: 900,
                color: '#0f172a',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                Avis clients
              </h1>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '2px 0 0' }}>
                Modération, réponses officielles et gestion des témoignages marketing IFPTIE Market
              </p>
            </div>
          </div>
        </div>

        {/* CTA: Create Marketing Testimonial */}
        <button
          onClick={() => setIsCreatingTestimonial(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
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
          <Sparkles size={16} />
          <span>Créer un témoignage marketing</span>
        </button>
      </div>

      {/* =========================================================================
          SECTION 1: OVERVIEW RATINGS & DISTRIBUTION
         ========================================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '28px'
      }}>
        {/* Card 1: Average Rating & Total Reviews */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Note Globale de la Boutique
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '10px' }}>
            <span style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>
              {stats.average}
            </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#94a3b8' }}>
              / 5
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '8px 0 14px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={22}
                fill={star <= Math.round(Number(stats.average)) ? '#f59e0b' : 'none'}
                color={star <= Math.round(Number(stats.average)) ? '#f59e0b' : '#cbd5e1'}
              />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8125rem', color: '#64748b' }}>
            <div>
              <strong style={{ color: '#0f172a' }}>{stats.total}</strong> avis au total
            </div>
            <span>•</span>
            <div>
              <strong style={{ color: '#10b981' }}>{stats.publishedCount}</strong> publiés
            </div>
            <span>•</span>
            <div>
              <strong style={{ color: '#f59e0b' }}>{stats.marketingCount}</strong> témoignages
            </div>
          </div>
        </div>

        {/* Card 2: Star Breakdown (5, 4, 3, 2, 1 star) */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Répartition par Étoile
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
            {stats.breakdown.map((item) => (
              <div key={item.stars} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8125rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '65px', fontWeight: 700, color: '#334155' }}>
                  <span>{item.stars}</span>
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                </div>

                <div style={{ flex: 1, backgroundColor: '#f1f5f9', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${item.pct}%`,
                    height: '100%',
                    backgroundColor: item.stars >= 4 ? '#10b981' : item.stars === 3 ? '#f59e0b' : '#ef4444',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>

                <div style={{ width: '70px', textAlign: 'right', color: '#64748b', fontWeight: 600 }}>
                  {item.count} ({item.pct}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: FILTERS TOOLBAR
         ========================================================================= */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '16px 20px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', minWidth: '240px', flex: '1 1 200px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Rechercher par client, commentaire, produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8125rem'
            }}
          />
        </div>

        {/* Filter: Product */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Produit :</label>
          <select
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8125rem',
              backgroundColor: '#ffffff',
              maxWidth: '200px'
            }}
          >
            <option value="all">Tous les produits</option>
            {uniqueProducts.map((p, idx) => (
              <option key={idx} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Filter: Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Note :</label>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8125rem',
              backgroundColor: '#ffffff'
            }}
          >
            <option value="all">Toutes notes</option>
            <option value="5">5 Étoiles (⭐⭐⭐⭐⭐)</option>
            <option value="4">4 Étoiles (⭐⭐⭐⭐)</option>
            <option value="3">3 Étoiles (⭐⭐⭐)</option>
            <option value="2">2 Étoiles (⭐⭐)</option>
            <option value="1">1 Étoile (⭐)</option>
          </select>
        </div>

        {/* Filter: Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Statut :</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8125rem',
              backgroundColor: '#ffffff'
            }}
          >
            <option value="all">Tous statuts</option>
            <option value="published">Publié</option>
            <option value="pending">En attente modération</option>
            <option value="hidden">Masqué</option>
          </select>
        </div>

        {/* Filter: Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Date :</label>
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8125rem',
              backgroundColor: '#ffffff'
            }}
          >
            <option value="all">Toutes dates</option>
            <option value="7days">Derniers 7 jours</option>
            <option value="30days">Derniers 30 jours</option>
          </select>
        </div>

        {/* Filter: Type (Customer vs Marketing) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Origine :</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8125rem',
              backgroundColor: '#ffffff'
            }}
          >
            <option value="all">Tous types</option>
            <option value="verified_customer">Avis client vérifié</option>
            <option value="marketing_testimonial">Témoignage marketing</option>
          </select>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: REVIEW LIST & ACTIONS
         ========================================================================= */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredReviews.map((rev) => {
          const isMarketing = rev.type === 'marketing_testimonial';

          return (
            <div
              key={rev.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '20px',
                border: isMarketing ? '1.5px dashed #f59e0b' : '1px solid #e2e8f0',
                boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                position: 'relative'
              }}
            >
              {/* Top Meta: Customer & Product & Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: isMarketing ? '#fffbeb' : '#f0fdf4',
                    color: isMarketing ? '#b45309' : '#0b5738',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1rem'
                  }}>
                    {isMarketing ? <Sparkles size={20} /> : <User size={20} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                        {rev.customerName}
                      </span>

                      {/* Type Badge: Clearly separating Marketing vs Customer */}
                      {isMarketing ? (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          backgroundColor: '#fef3c7',
                          color: '#b45309',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: '1px solid #fde68a'
                        }}>
                          <Sparkles size={12} />
                          Témoignage Marketing Manuel
                        </span>
                      ) : (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          backgroundColor: '#ecfdf5',
                          color: '#065f46',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: '1px solid #a7f3d0'
                        }}>
                          <ShieldCheck size={13} />
                          Achat Client Vérifié
                        </span>
                      )}

                      {/* Status Badge */}
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        backgroundColor: rev.status === 'published' ? '#ecfdf5' : rev.status === 'pending' ? '#fffbeb' : '#f1f5f9',
                        color: rev.status === 'published' ? '#065f46' : rev.status === 'pending' ? '#b45309' : '#64748b'
                      }}>
                        {rev.status === 'published' ? '● En ligne (Public)' : rev.status === 'pending' ? '● En attente modération' : '● Masqué'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8125rem', color: '#64748b', marginTop: '4px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Package size={14} color="#0b5738" />
                        <strong style={{ color: '#334155' }}>{rev.productName}</strong> ({rev.productSku})
                      </span>
                      {rev.customerCity && <span>• {rev.customerCity}</span>}
                      {rev.customerPhone && <span>• {rev.customerPhone}</span>}
                      <span>• {rev.date}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={18}
                      fill={s <= rev.rating ? '#f59e0b' : 'none'}
                      color={s <= rev.rating ? '#f59e0b' : '#cbd5e1'}
                    />
                  ))}
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', marginLeft: '6px' }}>
                    {rev.rating}.0
                  </span>
                </div>
              </div>

              {/* Review Comment */}
              <div style={{
                marginTop: '14px',
                padding: '14px 16px',
                backgroundColor: isMarketing ? '#fffdf7' : '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #f1f5f9',
                fontSize: '0.875rem',
                color: '#1e293b',
                lineHeight: '1.5',
                fontStyle: isMarketing ? 'italic' : 'normal'
              }}>
                "{rev.comment}"
              </div>

              {/* Existing Official Admin Reply */}
              {rev.adminReply && (
                <div style={{
                  marginTop: '12px',
                  marginLeft: '24px',
                  padding: '12px 16px',
                  backgroundColor: '#ecfdf5',
                  borderLeft: '3px solid #0b5738',
                  borderRadius: '0 10px 10px 0',
                  fontSize: '0.8125rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0b5738', fontWeight: 800, marginBottom: '4px' }}>
                    <Reply size={14} />
                    <span>Réponse officielle de {rev.adminReply.author}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>({rev.adminReply.repliedAt})</span>
                  </div>
                  <p style={{ margin: 0, color: '#065f46', lineHeight: '1.4' }}>
                    {rev.adminReply.text}
                  </p>
                </div>
              )}

              {/* ACTION BUTTONS (Publish, Hide, Delete, Reply) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '8px',
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid #f1f5f9',
                flexWrap: 'wrap'
              }}>
                {/* Reply Button */}
                <button
                  onClick={() => handleOpenReply(rev)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                >
                  <Reply size={14} color="#0b5738" />
                  <span>{rev.adminReply ? 'Modifier la réponse' : 'Répondre'}</span>
                </button>

                {/* Publish Button */}
                {rev.status !== 'published' && (
                  <button
                    onClick={() => handlePublish(rev.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: '#065f46',
                      cursor: 'pointer'
                    }}
                  >
                    <CheckCircle2 size={14} />
                    <span>Publier</span>
                  </button>
                )}

                {/* Hide Button */}
                {rev.status !== 'hidden' && (
                  <button
                    onClick={() => handleHide(rev.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#fffbeb',
                      border: '1px solid #fde68a',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: '#b45309',
                      cursor: 'pointer'
                    }}
                  >
                    <EyeOff size={14} />
                    <span>Masquer</span>
                  </button>
                )}

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(rev.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#dc2626',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={14} />
                  <span>Supprimer</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredReviews.length === 0 && (
          <div style={{
            padding: '48px 20px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px dashed #cbd5e1'
          }}>
            <MessageSquareQuote size={40} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
              Aucun avis correspondant
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
              Modifiez vos critères de recherche ou de filtrage pour afficher les avis clients.
            </p>
          </div>
        )}
      </div>

      {/* =========================================================================
          MODAL: REPLY TO REVIEW
         ========================================================================= */}
      {replyingReview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15,23,42,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            width: '100%',
            maxWidth: '560px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative'
          }}>
            <button
              onClick={() => setReplyingReview(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Reply size={20} color="#0b5738" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Répondre à l'avis client
              </h3>
            </div>

            <div style={{
              padding: '12px 14px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              marginBottom: '16px',
              fontSize: '0.8125rem',
              color: '#334155'
            }}>
              <strong>{replyingReview.customerName}</strong> a écrit :
              <p style={{ margin: '4px 0 0', fontStyle: 'italic', color: '#64748b' }}>
                "{replyingReview.comment}"
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Votre réponse officielle (visible publiquement) :
              </label>
              <textarea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Ex : Merci pour votre retour ! Notre équipe est ravie que le produit vous plaise..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setReplyingReview(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSaveReply}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#0b5738',
                  color: '#ffffff',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Send size={15} />
                <span>Publier la réponse</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: CREATE MANUAL MARKETING TESTIMONIAL
         ========================================================================= */}
      {isCreatingTestimonial && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15,23,42,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            width: '100%',
            maxWidth: '620px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative'
          }}>
            <button
              onClick={() => setIsCreatingTestimonial(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={22} color="#f59e0b" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Créer un témoignage marketing
              </h3>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '0 0 20px' }}>
              Ce témoignage sera étiqueté de manière transparente comme <strong>« Témoignage Marketing »</strong>, séparé des avis clients vérifiés.
            </p>

            <form onSubmit={handleCreateTestimonial}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Nom / Entreprise / Titre :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : Cabinet Médical Bonanjo, Alain T."
                    value={newTestimonial.customerName}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, customerName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8125rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Ville / Localité :
                  </label>
                  <input
                    type="text"
                    value={newTestimonial.customerCity}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, customerCity: e.target.value })}
                    placeholder="Ex : Douala, Yaoundé, Bafoussam"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8125rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Produit associé :
                  </label>
                  <select
                    value={newTestimonial.productName}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, productName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8125rem',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="Kit Solaire Autonome 200W + 4 Ampoules LED">Kit Solaire Autonome 200W + 4 Ampoules LED</option>
                    <option value="Lampe Solaire LED Rechargeable 100W IP67">Lampe Solaire LED Rechargeable 100W IP67</option>
                    <option value="Marmite Cuiseur Pression Inox 9L Haute Sécurité">Marmite Cuiseur Pression Inox 9L Haute Sécurité</option>
                    <option value="Batterie Gel Solaire Cycle Profond 12V 100Ah">Batterie Gel Solaire Cycle Profond 12V 100Ah</option>
                    <option value="Ventilateur Rechargeable Solaire 16 Pouces">Ventilateur Rechargeable Solaire 16 Pouces</option>
                    <option value="Perceuse Visseuse Sans Fil 21V + Valise 24 Accessoires">Perceuse Visseuse Sans Fil 21V + Valise 24 Accessoires</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Note attribuée :
                  </label>
                  <select
                    value={newTestimonial.rating}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8125rem',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value={5}>5 étoiles (⭐⭐⭐⭐⭐)</option>
                    <option value={4}>4 étoiles (⭐⭐⭐⭐)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Texte du témoignage :
                </label>
                <textarea
                  required
                  rows={3}
                  value={newTestimonial.comment}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                  placeholder="Ex : « Nous utilisons ce kit solaire pour notre pharmacie depuis 6 mois. Aucun incident et une économie substantielle... »"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8125rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreatingTestimonial(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#0b5738',
                    color: '#ffffff',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={15} />
                  <span>Enregistrer le témoignage</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
