import type { Product, Order, CourierTask, AdminStats, CustomerReview } from '../types';

export const MOCK_HOMEPAGE_CATEGORIES = [
  {
    id: 'solar',
    title: 'Énergie & Solaire',
    description: 'Kits anti-délestage, projecteurs, batteries',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop&q=80',
    itemCount: '28 produits',
    badge: 'Top Vente',
    isMomentTrending: true
  },
  {
    id: 'home-kitchen',
    title: 'Maison & Cuisine',
    description: 'Robots cuiseurs, hachoirs, électroménager',
    image: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=400&auto=format&fit=crop&q=80',
    itemCount: '64 produits',
    badge: 'Populaire',
    isMomentTrending: false
  },
  {
    id: 'tech',
    title: 'High-Tech & Accessoires',
    description: 'Powerbanks, écouteurs, montres, câbles',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&auto=format&fit=crop&q=80',
    itemCount: '95 produits',
    badge: 'Nouveau',
    isMomentTrending: true
  },
  {
    id: 'beauty',
    title: 'Beauté & Bien-être',
    description: 'Karité bio, soins naturels, beauté locale',
    image: 'https://images.unsplash.com/photo-1608248597359-25f0a82b8813?w=400&auto=format&fit=crop&q=80',
    itemCount: '42 produits',
    badge: '🇨🇲 Local',
    isMomentTrending: false
  },
  {
    id: 'intimacy',
    title: 'Intimité & Bien-être',
    description: 'Gels hydratants doux, huiles de soin',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80',
    itemCount: '19 produits',
    badge: '🔒 Colis Discret',
    isDiscreet: true,
    isMomentTrending: false
  },
  {
    id: 'automotive',
    title: 'Auto & Moto',
    description: 'Compresseurs pneus, dashcams, entretien',
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&auto=format&fit=crop&q=80',
    itemCount: '31 produits',
    badge: 'Utile',
    isMomentTrending: false
  },
  {
    id: 'sport',
    title: 'Sport & Fitness',
    description: 'Pistolets de massage, élastiques, tapis',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80',
    itemCount: '24 produits',
    badge: 'Tendance',
    isMomentTrending: false
  },
  {
    id: 'tools',
    title: 'Outils & Bricolage',
    description: 'Perceuses sans fil 21V, caisses pro',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&auto=format&fit=crop&q=80',
    itemCount: '37 produits',
    badge: 'Pro',
    isMomentTrending: false
  },
  {
    id: 'baby',
    title: 'Maman & Bébé',
    description: 'Accessoires nouveau-né, éveil, confort',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&auto=format&fit=crop&q=80',
    itemCount: '29 produits',
    badge: 'Douceur',
    isMomentTrending: false
  },
  {
    id: 'trending',
    title: 'Tendances',
    description: 'Top arrivages viraux de Chine & marché local',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80',
    itemCount: '53 produits',
    badge: '🔥 Viral',
    isMomentTrending: true
  },
  {
    id: 'deals',
    title: 'Promotions',
    description: 'Ventes flash, réductions jusqu\'à -50%',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&auto=format&fit=crop&q=80',
    itemCount: '38 offres',
    badge: '⚡ Économies',
    isMomentTrending: true
  }
];

export const MOCK_CATEGORIES = [
  { id: 'all', label: 'Tout le Catalogue', icon: 'Grid' },
  { id: 'deals', label: 'Ventes Flash 🔥', icon: 'Flame', isHot: true },
  { id: 'solar', label: 'Énergie & Solaire', icon: 'Sun' },
  { id: 'tech', label: 'High-Tech', icon: 'Smartphone' },
  { id: 'home-kitchen', label: 'Maison & Cuisine', icon: 'Home' },
  { id: 'beauty', label: 'Beauté & Bien-être', icon: 'Sparkles' },
  { id: 'automotive', label: 'Auto & Moto', icon: 'Car' },
  { id: 'sport', label: 'Sport & Fitness', icon: 'Activity' },
  { id: 'tools', label: 'Outils & Bricolage', icon: 'Wrench' },
  { id: 'intimacy', label: 'Intimité & Bien-être 🔒', icon: 'Heart', isDiscreet: true },
  { id: 'trending', label: 'Tendances Chine & Local', icon: 'TrendingUp' }
] as const;

export const MOCK_PRODUCTS: Product[] = [
  // 1. SOLAR & ENERGY
  {
    id: 'prod-solar-01',
    name: 'Kit Énergie Solaire Hybride 500W + 2 Ampoules LED + Port USB',
    slug: 'kit-energie-solaire-hybride-500w',
    category: 'solar',
    categoryLabel: 'Énergie & Solaire',
    price: 48500,
    originalPrice: 65000,
    rating: 4.8,
    reviewsCount: 142,
    origin: 'china',
    originLabel: 'Import Direct Chine',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df57046475b?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Solution anti-délestage idéale pour alimenter éclairage, ventilateur et charger vos téléphones.',
    fullDescription: 'Ce kit solaire complet autonome vous assure une tranquillité totale face aux coupures de courant (délestages). Comprend un panneau solaire haute efficacité monocristallin, une batterie longue durée et des ampoules LED puissantes.',
    features: [
      'Puissance 500W crête',
      'Autonomie jusqu\'à 14 heures d\'éclairage',
      'Double port USB recharge rapide 5V/2A',
      'Câbles renforcés 5 mètres inclus'
    ],
    inStock: true,
    stockCount: 18,
    soldCount: 84,
    totalStock: 100,
    isFlashDeal: true,
    isBestSeller: true,
    isTrending: true,
    deliveryDays: 'Livraison 24h Douala & Yaoundé'
  },
  {
    id: 'prod-solar-02',
    name: 'Projecteur Solaire Extérieur 200W Étanche IP67 avec Détecteur',
    slug: 'projecteur-solaire-exterieur-200w',
    category: 'solar',
    categoryLabel: 'Énergie & Solaire',
    price: 24500,
    originalPrice: 35000,
    rating: 4.7,
    reviewsCount: 89,
    origin: 'china',
    originLabel: 'Import Direct Chine',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Éclairage puissant de cour, barrière et hangar sans facture d\'électricité.',
    fullDescription: 'Équipez votre concession d\'une sécurité lumineuse sans fil. S\'allume automatiquement à la tombée de la nuit ou au passage d\'un intrus grâce à son capteur de mouvement radar.',
    features: [
      'LED SMD ultra-lumineuses 200W',
      'Résistant aux pluies tropicales (IP67)',
      'Télécommande sans fil avec minuterie',
      'Zéro frais d\'installation électrique'
    ],
    inStock: true,
    stockCount: 35,
    deliveryDays: 'Livraison 24h - 48h'
  },
  {
    id: 'prod-solar-03',
    name: 'Lampe Solaire LED Rechargeable Haute Puissance 100W Étanche IP67 avec Détecteur & Télécommande',
    slug: 'lampe-solaire-led-rechargeable-100w',
    category: 'solar',
    categoryLabel: 'Énergie & Solaire',
    price: 14900,
    originalPrice: 22000,
    rating: 4.8,
    reviewsCount: 76,
    origin: 'china',
    originLabel: 'Top Vente Solaire',
    images: [
      'https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1508873696983-2df57046475b?w=800&auto=format&fit=crop&q=85'
    ],
    shortDescription: '0 FCFA de facture Eneo. Éclairez votre cour, entrée ou concession toute la nuit grâce à l\'énergie solaire autonome.',
    fullDescription: 'La solution anti-obscurité n°1 au Cameroun. Cette lampe solaire LED de nouvelle génération se recharge automatiquement pendant la journée et délivre un faisceau lumineux ultra-puissant dès la tombée de la nuit. Équipée d\'un détecteur de mouvement intelligent radar et d\'une télécommande sans fil, elle assure une sécurité totale sans aucun câble ni frais d\'électricité.',
    features: [
      'Puissance d\'éclairage LED 100W grand angle 120° (couvre jusqu\'à 80 m²)',
      'Batterie lithium LiFePO4 haute capacité 2400 mAh : jusqu\'à 14 heures d\'éclairage continu',
      'Détecteur de présence PIR radar avec allumage instantané à 6-8 mètres',
      'Boîtier 100% étanche certifié IP67 résistant aux pluies tropicales et forte chaleur',
      'Télécommande sans fil incluse pour changer de mode à distance'
    ],
    inStock: true,
    stockCount: 42,
    soldCount: 238,
    totalStock: 300,
    isFlashDeal: true,
    isBestSeller: true,
    isTrending: true,
    deliveryDays: 'Livraison express 24h Douala & Yaoundé • 48h régions',
    specifications: [
      { label: 'Puissance lumineuse', value: '100 Watts LED SMD ultra-brillantes' },
      { label: 'Panneau solaire', value: 'Monocristallin silicium haute efficacité 6V / 4W' },
      { label: 'Batterie intégrée', value: 'Lithium-ion 3.7V / 2400 mAh rechargeable' },
      { label: 'Autonomie nocturne', value: '10 à 14 heures selon mode sélectionné' },
      { label: 'Temps de charge', value: '6 heures d\'ensoleillement direct' },
      { label: 'Norme d\'étanchéité', value: 'Certifié IP67 (imperméable pluies diluviennes & poussière)' },
      { label: 'Angle et portée capteur', value: 'Grand angle 120°, portée de détection 6 à 8 mètres' },
      { label: 'Modes d\'éclairage', value: '3 modes (Détection 100%, Veilleuse + Détection, Continu crépusculaire)' },
      { label: 'Dimensions produit', value: '23.5 cm x 11.5 cm x 4.8 cm' },
      { label: 'Poids net', value: '480 grammes' }
    ],
    whatsIncluded: [
      '1x Lampe Solaire LED 100W étanche avec panneau intégré',
      '1x Bras de fixation murale orientable à 180°',
      '1x Télécommande infrarouge multifonction (piles incluses)',
      '1x Kit complet de chevilles métalliques et vis de fixation',
      '1x Guide d\'installation et d\'utilisation rapide en français'
    ],
    faq: [
      {
        question: 'Est-ce que la lampe se recharge même en saison des pluies ou par temps nuageux ?',
        answer: 'Oui, absolument. Le panneau solaire monocristallin de nouvelle génération capte les rayonnements UV invisibles à travers les nuages, ce qui permet de recharger la batterie même pendant la saison des pluies à Douala, Yaoundé ou dans l\'Ouest.'
      },
      {
        question: 'Comment se passe le paiement à la livraison ?',
        answer: 'Vous ne payez rien à l\'avance. Notre coursier dédié livre votre colis à domicile ou au bureau. Vous ouvrez le carton, vérifiez que le produit est intact, puis vous réglez en espèces ou par Mobile Money (Orange Money ou MTN MoMo).'
      },
      {
        question: 'L\'installation nécessite-t-elle l\'intervention d\'un électricien ?',
        answer: 'Non, aucun électricien n\'est requis. Le système est 100% autonome et sans fil. Deux trous avec les vis fournies suffisent pour fixer la lampe en 3 minutes sur n\'importe quel mur, poteau, portail ou clôture.'
      },
      {
        question: 'Quelle est la durée de vie de la batterie et de la lampe ?',
        answer: 'Les puces LED SMD ont une durée de vie supérieure à 50 000 heures (plus de 6 ans d\'éclairage quotidien) et la batterie lithium supporte plus de 1 200 cycles de charge complets. Le produit est couvert par une garantie échange IFPTIE Market de 6 mois.'
      }
    ],
    warrantyInfo: 'Garantie satisfait ou échangé 6 mois • SAV local à Douala et Yaoundé'
  },
  {
    id: 'prod-solar-04',
    name: 'Lanterne Lampe Solaire Portable Rechargeable Multifonction Camping & Délestage',
    slug: 'lanterne-lampe-solaire-portable-rechargeable',
    category: 'solar',
    categoryLabel: 'Énergie & Solaire',
    price: 8500,
    originalPrice: 12000,
    rating: 4.6,
    reviewsCount: 52,
    origin: 'china',
    originLabel: 'Import Direct Chine',
    images: [
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Lampe d\'urgence portable avec poignée, panneau solaire intégré et sortie USB de secours.',
    fullDescription: 'Compagne indispensable pour la maison pendant les coupures d\'électricité ou pour les déplacements et chantiers. Se recharge soit au soleil, soit sur prise secteur.',
    features: [
      'Autonomie jusqu\'à 10 heures d\'éclairage continu',
      'Poignée ergonomique pliable de transport',
      'Port USB pour recharge d\'urgence de téléphone'
    ],
    inStock: true,
    stockCount: 60,
    deliveryDays: 'Livraison 24h'
  },
  {
    id: 'prod-solar-05',
    name: 'Lampadaire Solaire Tout-en-Un 300W Haut Rendement avec Télécommande',
    slug: 'lampadaire-solaire-300w-telecommande',
    category: 'solar',
    categoryLabel: 'Énergie & Solaire',
    price: 54000,
    originalPrice: 75000,
    rating: 4.9,
    reviewsCount: 38,
    origin: 'china',
    originLabel: 'Qualité Pro Chine',
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df57046475b?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Éclairage urbain et de grande concession, zéro câble, zéro facture Eneo.',
    fullDescription: 'Système tout-en-un intégrant panneau solaire monocristallin haute densité, batterie LiFePO4 de grande capacité et LEDs haute luminosité.',
    features: [
      'Puissance 300W SMD ultra-lumineuse',
      'Batterie LiFePO4 durée de vie plus de 5 ans',
      'Allumage crépusculaire automatique & minuterie'
    ],
    inStock: true,
    stockCount: 14,
    deliveryDays: 'Livraison 24h - 48h'
  },

  // 2. TECH & ACCESSORIES
  {
    id: 'prod-tech-01',
    name: 'Power Bank Robuste 30 000 mAh Charge Rapide 22.5W avec Lampe Torche',
    slug: 'power-bank-30000mah-fast-charge',
    category: 'tech',
    categoryLabel: 'High-Tech',
    price: 18500,
    originalPrice: 26000,
    rating: 4.9,
    reviewsCount: 310,
    origin: 'china',
    originLabel: 'Top Vente Chine',
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Rechargez votre smartphone jusqu\'à 7 fois. Parfait pour les voyages et imprévus.',
    fullDescription: 'Batterie externe grande capacité certifiée sécurisée avec affichage LED numérique du pourcentage exact de batterie. Compatible iPhone, Samsung, Tecno, Infinix et Xiaomi.',
    features: [
      'Capacité réelle 30 000 mAh',
      'Sorties USB-C PD + 2x USB-A Quick Charge',
      'Lampe torche double LED puissante intégrée',
      'Protection surtension et court-circuit'
    ],
    inStock: true,
    stockCount: 42,
    soldCount: 158,
    totalStock: 200,
    isFlashDeal: true,
    isTrending: true,
    isBestSeller: true,
    deliveryDays: 'Livraison express jour-même Douala'
  },
  {
    id: 'prod-tech-02',
    name: 'Écouteurs Sans Fil TWS Bluetooth 5.3 avec Réduction de Bruit',
    slug: 'ecouteurs-sans-fil-tws-bluetooth-53',
    category: 'tech',
    categoryLabel: 'High-Tech',
    price: 9500,
    originalPrice: 15000,
    rating: 4.6,
    reviewsCount: 94,
    origin: 'china',
    originLabel: 'Tendance Dropshipping',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Son basse profonde, boîtier miroir avec indicateur de batterie LED.',
    fullDescription: 'Connexion instantanée, son limpide pour vos appels WhatsApp et votre musique. Autonomie de plus de 24h avec le boîtier de charge.',
    features: [
      'Bluetooth 5.3 zéro latence',
      'Microphone HD antibruit pour appels',
      'Commandes tactiles intuitives'
    ],
    inStock: true,
    stockCount: 60,
    isNewArrival: true,
    deliveryDays: 'Livraison 24h'
  },
  {
    id: 'prod-tech-03',
    name: 'Montre Connectée Sport AMOLED HD avec Appels Bluetooth & Suivi Santé',
    slug: 'montre-connectee-sport-hd-bluetooth',
    category: 'tech',
    categoryLabel: 'High-Tech',
    price: 16500,
    originalPrice: 24000,
    rating: 4.8,
    reviewsCount: 67,
    origin: 'china',
    originLabel: 'Nouveauté Chine',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Recevez notifications WhatsApp, passez des appels et mesurez rythme cardiaque et sommeil.',
    fullDescription: 'Écran tactile dynamique AMOLED lumineux même sous le soleil tropical. Autonomie de 7 jours et étanchéité IP68.',
    features: [
      'Haut-parleur & micro pour appels',
      'Plus de 100 modes sportifs',
      'Capteur d\'oxygène et fréquence cardiaque'
    ],
    inStock: true,
    stockCount: 25,
    isNewArrival: true,
    isTrending: true,
    deliveryDays: 'Livraison 24h'
  },

  // 3. HOME & KITCHEN
  {
    id: 'prod-home-01',
    name: 'Robot Cuiseur Multifonction & Hachoir Inox Puissant 3L 500W',
    slug: 'robot-cuiseur-hachoir-inox-3l',
    category: 'home-kitchen',
    categoryLabel: 'Maison & Cuisine',
    price: 19500,
    originalPrice: 28000,
    rating: 4.9,
    reviewsCount: 220,
    origin: 'china',
    originLabel: 'Import Direct Chine',
    images: [
      'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Hache viande, condiments, pistache et légumes en moins de 8 secondes.',
    fullDescription: 'Indispensable dans la cuisine moderne camerounaise pour préparer facilement le nkui, koki, sauces tomate, viandes et assaisonnements locaux.',
    features: [
      'Bol en acier inoxydable incassable 3 Litres',
      '4 lames en titane bi-étagées affûtées',
      '2 vitesses d\'impulsion',
      'Moteur en cuivre pur résistant à la chauffe'
    ],
    inStock: true,
    stockCount: 24,
    isBestSeller: true,
    isTrending: true,
    deliveryDays: 'Livraison 24h Douala & Yaoundé'
  },
  {
    id: 'prod-home-02',
    name: 'Mini Climatiseur & Rafraîchisseur d\'Air USB Silencieux 500ml',
    slug: 'mini-climatiseur-rafraichisseur-usb',
    category: 'home-kitchen',
    categoryLabel: 'Maison & Cuisine',
    price: 13500,
    originalPrice: 19000,
    rating: 4.7,
    reviewsCount: 78,
    origin: 'china',
    originLabel: 'Arrivage Chaud',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Baisse la température de votre pièce ou bureau instantanément avec brume fraîche.',
    fullDescription: 'Faible consommation d\'énergie, peut fonctionner branché sur un simple Power Bank en cas de coupure d\'électricité.',
    features: [
      'Réservoir 500ml avec diffuseur de brume',
      '3 vitesses de ventilation réglables',
      'Éclairage d\'ambiance LED 7 couleurs'
    ],
    inStock: true,
    stockCount: 30,
    isNewArrival: true,
    isFlashDeal: true,
    deliveryDays: 'Livraison 24h'
  },

  // 4. BEAUTY & LOCAL CAMEROON
  {
    id: 'prod-beauty-01',
    name: 'Beurre de Karité Pur Bio Enrichi aux Huiles Précieuses de Kribi (250g)',
    slug: 'beurre-karite-pur-bio-kribi-250g',
    category: 'beauty',
    categoryLabel: 'Beauté & Bien-être',
    price: 4500,
    originalPrice: 6000,
    rating: 4.9,
    reviewsCount: 78,
    origin: 'local',
    originLabel: 'Origine Cameroun 🇨🇲',
    images: [
      'https://images.unsplash.com/photo-1608248597359-25f0a82b8813?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Soin nourrissant corps et cheveux, production artisanale locale certifiée.',
    fullDescription: 'Extrait à froid selon la tradition pour préserver toutes les vitamines A, E et F. Répare les pointes sèches et nourrit intensément les peaux exposées au climat tropical.',
    features: [
      '100% naturel sans parfum chimique',
      'Texture onctueuse fondante',
      'Soutient les coopératives féminines locales'
    ],
    inStock: true,
    stockCount: 80,
    isBestSeller: true,
    deliveryDays: 'Livraison 24h'
  },

  // 5. SPORT & FITNESS
  {
    id: 'prod-sport-01',
    name: 'Pistolet de Massage Musculaire Pro Fascia Gun 30 Vitesses + 6 Têtes',
    slug: 'pistolet-massage-musculaire-fascia-gun',
    category: 'sport',
    categoryLabel: 'Sport & Fitness',
    price: 22500,
    originalPrice: 32000,
    rating: 4.9,
    reviewsCount: 116,
    origin: 'china',
    originLabel: 'Top Vente Fitness',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Soulage les courbatures, douleurs lombaires et tensions musculaires en quelques minutes.',
    fullDescription: 'Moteur sans balais silencieux et puissant avec percussion profonde. Écran tactile LCD affichant le niveau d\'intensité et la batterie.',
    features: [
      '30 vitesses de percussion réglables',
      '6 têtes interchangeables pour chaque groupe musculaire',
      'Batterie lithium 2500mAh longue durée'
    ],
    inStock: true,
    stockCount: 19,
    isTrending: true,
    isNewArrival: true,
    deliveryDays: 'Livraison 24h Douala & Yaoundé'
  },

  // 6. INTIMACY & WELLNESS (Tasteful, elegant, discreet presentation)
  {
    id: 'prod-intimacy-01',
    name: 'Gel Hydratant Douceur & Bien-être Intime Formule Soie Pure (100ml)',
    slug: 'gel-hydratant-douceur-bien-etre-intime',
    category: 'intimacy',
    categoryLabel: 'Intimité & Bien-être',
    price: 8500,
    originalPrice: 12000,
    rating: 4.8,
    reviewsCount: 53,
    origin: 'china',
    originLabel: 'Qualité Certifiée',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Formule neutre à base d\'eau, pH physiologique équilibré et texture soyeuse.',
    fullDescription: 'Conçu avec le plus grand soin dermatologique pour apporter confort, douceur et sérénité. Sans résidus collants, sans odeur entêtante, hypoallergénique et compatible avec tout type de peau.',
    features: [
      'Base aqueuse pure non grasse',
      'pH respectueux de l\'équilibre corporel',
      'Colisage 100% neutre et confidentiel garanti',
      'Aucune mention extérieure du contenu'
    ],
    inStock: true,
    stockCount: 30,
    isDiscreetPackaging: true,
    isBestSeller: true,
    deliveryDays: 'Livraison discrète scellée 24h'
  },
  {
    id: 'prod-intimacy-02',
    name: 'Huile Sensation Relaxante & Massage Sensoriel Fleur d\'Ylang & Coco',
    slug: 'huile-massage-sensoriel-ylang-coco',
    category: 'intimacy',
    categoryLabel: 'Intimité & Bien-être',
    price: 11000,
    originalPrice: 16000,
    rating: 4.9,
    reviewsCount: 41,
    origin: 'local',
    originLabel: 'Origine Cameroun 🇨🇲',
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Élixir de massage soyeux pour apaiser les tensions et sublimer les moments de complicité.',
    fullDescription: 'Composée d\'huiles végétales locales précieuses, cette huile sublime la peau d\'un voile satiné sans effet gras. Idéale pour un rituel de détente intime et raffiné en couple.',
    features: [
      'Huiles végétales pressées au Cameroun',
      'Senteur subtile et relaxante',
      'Emballage carton anonyme et fermé hermétiquement'
    ],
    inStock: true,
    stockCount: 22,
    isDiscreetPackaging: true,
    deliveryDays: 'Livraison discrète scellée 24h'
  },

  // 7. TOOLS & DIY
  {
    id: 'prod-tools-01',
    name: 'Visseuse-Perceuse Sans Fil Pro 21V avec 2 Batteries Lithium + Mallette 24 Pièces',
    slug: 'visseuse-perceuse-sans-fil-21v-mallette',
    category: 'tools',
    categoryLabel: 'Outils & Bricolage',
    price: 29500,
    originalPrice: 42000,
    rating: 4.8,
    reviewsCount: 165,
    origin: 'china',
    originLabel: 'Import Direct Chine',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Percez bois, métal et béton léger avec une puissance pro sans contrainte de fil.',
    fullDescription: 'L\'outil polyvalent par excellence pour tous vos travaux à la maison, atelier ou chantier. Livré avec deux batteries interchangeables pour ne jamais tomber en panne.',
    features: [
      'Couple max 45 Nm avec 25 réglages',
      '2 batteries 21V 2.0Ah haute endurance',
      'Chargeur rapide inclus',
      'Lampe LED de travail intégrée'
    ],
    inStock: true,
    stockCount: 16,
    isBestSeller: true,
    deliveryDays: 'Livraison 24h'
  },

  // 8. AUTOMOTIVE
  {
    id: 'prod-auto-01',
    name: 'Mini Compresseur d\'Air Numérique Portable Sans Fil pour Pneus & Ballons',
    slug: 'mini-compresseur-air-sans-fil-pneus',
    category: 'automotive',
    categoryLabel: 'Auto & Moto',
    price: 17500,
    originalPrice: 25000,
    rating: 4.7,
    reviewsCount: 112,
    origin: 'china',
    originLabel: 'Top Vente Chine',
    images: [
      'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Gonflez vos pneus de voiture ou moto en toute autonomie au bord de la route.',
    fullDescription: 'Écran LCD avec mesure précise de la pression en Bar ou PSI et arrêt automatique une fois la pression atteinte. Batterie rechargeable par USB-C.',
    features: [
      'Pression max 150 PSI',
      'Arrêt automatique intelligent',
      'Éclairage d\'urgence SOS inclus',
      'Embouts pour auto, moto, vélo et ballons'
    ],
    inStock: true,
    stockCount: 28,
    isTrending: true,
    deliveryDays: 'Livraison 24h',
    dealExpiresHours: 8,
    isBestValueDeal: true
  },

  // ==========================================
  // 9. DEDICATED PROMOTIONS & BUNDLES (PACKS)
  // ==========================================
  {
    id: 'bundle-01',
    name: 'Pack Énergie Anti-Délestage Total (Solaire 500W + Projecteur 200W + Lanterne)',
    slug: 'pack-energie-anti-delestage-total',
    category: 'solar',
    categoryLabel: 'Énergie & Solaire',
    price: 69000,
    originalPrice: 112000,
    rating: 4.9,
    reviewsCount: 184,
    origin: 'china',
    originLabel: 'Offre Bundle Spéciale',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df57046475b?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Solution anti-coupure intégrale pour la maison : éclairez 3 pièces et la cour avec zéro facture.',
    fullDescription: 'Ce pack groupé exclusif réunit nos 3 meilleures solutions solaires à un prix imbattable. Ne soyez plus jamais plongé dans l\'obscurité lors des coupures de courant à Douala, Yaoundé ou en province.',
    features: [
      'Kit Solaire 500W complet avec batterie et ports USB',
      'Projecteur solaire extérieur étanche 200W avec capteur radar',
      'Lanterne solaire nomade rechargeable de secours',
      '2 ampoules LED supplémentaires offertes'
    ],
    inStock: true,
    stockCount: 8,
    soldCount: 42,
    totalStock: 50,
    isBundle: true,
    bundleItems: [
      '1x Kit Hybride Solaire 500W + Batterie longue durée',
      '1x Projecteur Extérieur 200W IP67 avec Télécommande',
      '1x Lanterne Rechargeable Solaire & USB Nomade',
      '2x Ampoules LED Basse Consommation + Câbles 5m'
    ],
    dealExpiresHours: 9,
    isFlashDeal: true,
    isBestSeller: true,
    deliveryDays: 'Livraison 24h Gratuite Douala/Ydé'
  },
  {
    id: 'bundle-02',
    name: 'Pack Cuisine Express MasterChef (Robot 4-en-1 + Hachoir Inox 3L + Balance)',
    slug: 'pack-cuisine-express-masterchef',
    category: 'home-kitchen',
    categoryLabel: 'Maison & Cuisine',
    price: 29900,
    originalPrice: 48000,
    rating: 4.8,
    reviewsCount: 129,
    origin: 'china',
    originLabel: 'Pack Culinaire Pro',
    images: [
      'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Cuisinez deux fois plus vite : hachez vos viandes, condiments et pistache en 8 secondes chrono.',
    fullDescription: 'Un pack complet pensé pour les foyers camerounais exigeants. Préparez sans effort vos assaisonnements, sauces, pâtisseries et plats traditionnels.',
    features: [
      'Hachoir puissant moteur cuivre pur 500W',
      'Bol en acier inoxydable 3L indéformable',
      'Balance digitale de précision 1g - 10kg',
      'Lames de rechange en titane offertes'
    ],
    inStock: true,
    stockCount: 6,
    soldCount: 34,
    totalStock: 40,
    isBundle: true,
    bundleItems: [
      '1x Robot Multifonction & Hachoir 3L Bol Inox 500W',
      '4x Lames Titane Bi-étagées de Remplacement',
      '1x Balance Électronique Haute Précision Cuisine',
      '1x Spatule Silicone & Guide de Recettes Africaines'
    ],
    dealExpiresHours: 12,
    deliveryDays: 'Livraison 24h'
  },
  {
    id: 'bundle-03',
    name: 'Pack Sérénité Chauffeur & Voyage (Compresseur Sans Fil + Dashcam HD + Chargeur 45W)',
    slug: 'pack-serenite-chauffeur-voyage',
    category: 'automotive',
    categoryLabel: 'Auto & Moto',
    price: 31500,
    originalPrice: 52000,
    rating: 4.9,
    reviewsCount: 88,
    origin: 'china',
    originLabel: 'Pack Chauffeur Zen',
    images: [
      'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Ne tombez plus jamais en panne de pneu ou de batterie sur les axes lourds.',
    fullDescription: 'Le kit de sécurité automobile complet pour rouler serein sur l\'axe Douala-Yaoundé ou Bafoussam. Vérifiez et gonflez vos pneus en 2 minutes et enregistrez chaque trajet en HD.',
    features: [
      'Mini compresseur autonome 150 PSI sans fil',
      'Caméra Dashcam HD 1080p avec vision nuit et enregistrement en boucle',
      'Chargeur allume-cigare métallique ultra-rapide 45W double port USB-C',
      'Étui de transport rigide protecteur'
    ],
    inStock: true,
    stockCount: 5,
    soldCount: 25,
    totalStock: 30,
    isBundle: true,
    bundleItems: [
      '1x Mini Compresseur Numérique 150 PSI Sans Fil',
      '1x Caméra Dashcam Voiture HD 1080p Vision Nocturne',
      '1x Chargeur Allume-cigare Rapide Double USB-C 45W',
      '4x Embouts Universels Pneu / Moto / Ballon'
    ],
    dealExpiresHours: 10,
    deliveryDays: 'Livraison 24h'
  },
  {
    id: 'bundle-04',
    name: 'Pack Artisans & Bricoleur Expert (Perceuse 21V + 2 Batteries + Mallette 45 Accessoires)',
    slug: 'pack-artisans-bricoleur-expert',
    category: 'tools',
    categoryLabel: 'Outils & Bricolage',
    price: 38000,
    originalPrice: 62000,
    rating: 4.8,
    reviewsCount: 97,
    origin: 'china',
    originLabel: 'Qualité Pro Chantier',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Kit de perçage et vissage complet haute performance pour professionnels et passionnés.',
    fullDescription: 'Doté de deux batteries 21V lithium longue autonomie, ce pack vous permet de travailler sans interruption sur tout type de support : bois massif, aluminium, tôle ou brique.',
    features: [
      'Perceuse sans fil 21V mandrin métallique auto-serrant',
      '2 batteries lithium interchangeables haute capacité',
      'Mallette antichoc avec 45 mèches, douilles et embouts',
      'Lampe torche LED de travail orientable incluse'
    ],
    inStock: true,
    stockCount: 7,
    soldCount: 38,
    totalStock: 45,
    isBundle: true,
    bundleItems: [
      '1x Visseuse-Perceuse Sans Fil 21V Haute Puissance',
      '2x Batteries Lithium 2.0Ah Rechargeables',
      '1x Mallette Robuste 45 Forets & Embouts Tournevis',
      '1x Torche LED Pivotante d\'Atelier'
    ],
    dealExpiresHours: 14,
    deliveryDays: 'Livraison 24h'
  },

  // ==========================================
  // 10. JUSQU'À -50% (MASSIVE DISCOUNTS)
  // ==========================================
  {
    id: 'promo-50-01',
    name: 'Écouteurs Sans Fil TWS Bluetooth 5.3 Pro Bass avec Écran Miroir LED',
    slug: 'ecouteurs-tws-pro-bass-miroir-led',
    category: 'tech',
    categoryLabel: 'High-Tech',
    price: 9900,
    originalPrice: 19900, // 50% discount
    rating: 4.8,
    reviewsCount: 143,
    origin: 'china',
    originLabel: 'Déstockage Électro',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Son basse percutant, autonomie 28h avec boîtier et affichage numérique précis.',
    fullDescription: 'Profitez d\'un son stéréo enveloppant avec des basses profondes et des aigus cristallins. Boîtier miroir très élégant servant également de batterie d\'appoint d\'urgence.',
    features: [
      'Réduction de bruit passive CVC 8.0',
      'Résistance à la transpiration et éclaboussures',
      'Connexion automatique Bluetooth 5.3',
      'Microphone HD intégré pour appels clairs'
    ],
    inStock: true,
    stockCount: 9,
    soldCount: 91,
    totalStock: 100,
    isHalfPricePromo: true,
    dealExpiresHours: 6,
    isFlashDeal: true,
    deliveryDays: 'Livraison 24h'
  },
  {
    id: 'promo-50-02',
    name: 'Lampe Solaire Murale Détecteur Grand Angle 120 LED Étanche IP65',
    slug: 'lampe-solaire-murale-detecteur-120-led',
    category: 'solar',
    categoryLabel: 'Énergie & Solaire',
    price: 7500,
    originalPrice: 15000, // 50% discount
    rating: 4.7,
    reviewsCount: 82,
    origin: 'china',
    originLabel: 'Promo Flash -50%',
    images: [
      'https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Éclairez allée, porte d\'entrée ou arrière-cour sans tirer un seul câble.',
    fullDescription: 'Capteur de mouvement infrarouge ultra-sensible. S\'allume automatiquement à l\'approche de toute personne et recharge sa batterie lithium pendant la journée.',
    features: [
      '120 micro-LEDs SMD grand angle 270 degrés',
      'Batterie lithium solaire intégrée',
      'Boîtier résistant aux fortes chaleurs et pluies',
      'Installation en 2 vis fournie'
    ],
    inStock: true,
    stockCount: 11,
    soldCount: 69,
    totalStock: 80,
    isHalfPricePromo: true,
    dealExpiresHours: 7,
    deliveryDays: 'Livraison 24h'
  },
  {
    id: 'promo-50-03',
    name: 'Mini Hachoir Électrique Sans Fil USB pour Ail, Piments & Gingembre (250ml)',
    slug: 'mini-hachoir-sans-fil-ail-piment-usb',
    category: 'home-kitchen',
    categoryLabel: 'Maison & Cuisine',
    price: 5900,
    originalPrice: 12000, // 50.8% discount
    rating: 4.8,
    reviewsCount: 99,
    origin: 'china',
    originLabel: 'Bons Plans Cuisine',
    images: [
      'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Fini les yeux qui piquent pour découper les piments rouges et le gingembre frais.',
    fullDescription: 'Ce mini hachoir rechargeable par câble USB est le chouchou des cuisinières modernes. Appuyez sur le bouton supérieur et hachez en 5 secondes piments, ail, persil et oignons.',
    features: [
      'Lames en inox 304 qualité alimentaire',
      'Recharge universelle par câble USB',
      'Nettoyage ultra facile sous l\'eau',
      'Compact et nomade'
    ],
    inStock: true,
    stockCount: 14,
    soldCount: 86,
    totalStock: 100,
    isHalfPricePromo: true,
    dealExpiresHours: 8,
    deliveryDays: 'Livraison 24h'
  },
  {
    id: 'promo-50-04',
    name: 'Montre Intelligente FitPulse Écran Couleur Étanche avec Suivi Tension & Pas',
    slug: 'montre-intelligente-fitpulse-couleur',
    category: 'tech',
    categoryLabel: 'High-Tech',
    price: 9500,
    originalPrice: 19000, // 50% discount
    rating: 4.6,
    reviewsCount: 54,
    origin: 'china',
    originLabel: 'Déstockage High-Tech',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Surveillez votre tension, rythme cardiaque et nombre de pas au quotidien.',
    fullDescription: 'Bracelet connecté élégant et léger compatible Android et iPhone. Recevez vos notifications d\'appels et SMS directement au poignet.',
    features: [
      'Capteur optique de fréquence cardiaque et tension',
      'Rappel de sédentarité et hydratation',
      'Autonomie jusqu\'à 5 jours',
      'Bracelet silicone doux hypoallergénique'
    ],
    inStock: true,
    stockCount: 8,
    soldCount: 72,
    totalStock: 80,
    isHalfPricePromo: true,
    dealExpiresHours: 5,
    deliveryDays: 'Livraison 24h'
  },

  // ==========================================
  // 11. MEILLEURES AFFAIRES (BEST VALUE DEALS)
  // ==========================================
  {
    id: 'deal-best-01',
    name: 'Power Bank Solaire Blindé 20 000 mAh Double Lampe Camping & Boussole',
    slug: 'power-bank-solaire-blinde-20000mah',
    category: 'tech',
    categoryLabel: 'High-Tech',
    price: 14500,
    originalPrice: 22500,
    rating: 4.9,
    reviewsCount: 135,
    origin: 'china',
    originLabel: 'Meilleur Rapport Qualité/Prix',
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Se recharge au soleil ou sur secteur. Conçu pour résister aux chocs, poussières et pluie.',
    fullDescription: 'Indestructible et ultra-pratique en déplacement ou en zone à délestage récurrent. Équipé d\'un panneau solaire de secours sur le dessus et d\'une puissante lampe LED d\'éclairage.',
    features: [
      'Capacité 20 000 mAh réelle',
      'Coque renforcée antichoc avec coins en caoutchouc',
      'Double port USB pour charger 2 téléphones en même temps',
      'Mousqueton de fixation et boussole intégrée'
    ],
    inStock: true,
    stockCount: 17,
    soldCount: 83,
    totalStock: 100,
    isBestValueDeal: true,
    dealExpiresHours: 11,
    deliveryDays: 'Livraison 24h'
  },
  {
    id: 'deal-best-02',
    name: 'Mini Ventilateur Portatif Rechargeable USB 3 Vitesses Silencieux avec Support Téléphone',
    slug: 'mini-ventilateur-portatif-rechargeable-usb',
    category: 'home-kitchen',
    categoryLabel: 'Maison & Cuisine',
    price: 4900,
    originalPrice: 8500,
    rating: 4.8,
    reviewsCount: 104,
    origin: 'china',
    originLabel: 'Affaire Star Climat',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Restez au frais au bureau, en voiture, au marché ou pendant les coupures de courant.',
    fullDescription: 'Compagnon idéal contre la chaleur tropicale lourde. Moteur brushless silencieux et batterie lithium offrant jusqu\'à 6 heures de brise continue.',
    features: [
      '3 vitesses de souffle ajustables',
      'Batterie lithium rechargeable par câble USB',
      'Support de table pliable avec encoche pour smartphone',
      'Poids plume de seulement 160g'
    ],
    inStock: true,
    stockCount: 22,
    soldCount: 98,
    totalStock: 120,
    isBestValueDeal: true,
    dealExpiresHours: 15,
    deliveryDays: 'Livraison 24h'
  },
  {
    id: 'deal-best-03',
    name: 'Support Téléphone Voiture & Moto Anti-Vibrations à Verrouillage Automatique 360°',
    slug: 'support-telephone-anti-vibration-360',
    category: 'automotive',
    categoryLabel: 'Auto & Moto',
    price: 4500,
    originalPrice: 7500,
    rating: 4.7,
    reviewsCount: 77,
    origin: 'china',
    originLabel: 'Top Affaire Moto/Auto',
    images: [
      'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Maintient fermement votre téléphone même sur les routes cahoteuses de Douala et Yaoundé.',
    fullDescription: 'Système mécanique à ressort et mâchoires siliconées qui enserre instantanément le téléphone dès qu\'il est déposé. Rotation sur rotule à 360 degrés pour utiliser le GPS confortablement.',
    features: [
      'Verrouillage instantané en une seconde d\'une seule main',
      'Coussinets en silicone antichoc et anti-rayures',
      'Compatible tous téléphones de 4.7 à 7 pouces',
      'Fixation solide sur grille d\'aération ou guidon'
    ],
    inStock: true,
    stockCount: 19,
    soldCount: 61,
    totalStock: 80,
    isBestValueDeal: true,
    dealExpiresHours: 16,
    deliveryDays: 'Livraison 24h'
  }
];

export const MOCK_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    author: 'Michel T.',
    city: 'Douala (Akwa)',
    rating: 5,
    productName: 'Kit Énergie Solaire Hybride 500W',
    comment: 'Commande passée à 10h, livrée à 15h le même jour à Akwa ! J\'ai payé le coursier en espèces après avoir testé les ampoules solaires. Franchement un sans-faute, bravo IFPTIE.',
    date: 'Il y a 2 jours',
    verifiedPurchase: true
  },
  {
    id: 'rev-02',
    author: 'Carine E.',
    city: 'Yaoundé (Bastos)',
    rating: 5,
    productName: 'Gel Hydratant Douceur & Bien-être Intime',
    comment: 'Emballage 100% opaque et discret, aucune mention dessus, coursier très poli. C\'était exactement ce qui m\'inquiétait et ils ont tenu parole. Très satisfaite.',
    date: 'Il y a 4 jours',
    verifiedPurchase: true
  },
  {
    id: 'rev-03',
    author: 'Alain F.',
    city: 'Douala (Bonamoussadi)',
    rating: 5,
    productName: 'Robot Cuiseur Multifonction 3L',
    comment: 'Le hachoir découpe la viande et le condiment en 5 secondes chrono. Réglé par Orange Money directement à la livraison. Matériel solide.',
    date: 'Il y a 1 semaine',
    verifiedPurchase: true
  },
  {
    id: 'rev-04',
    author: 'Dr. Joseph N.',
    city: 'Bafoussam',
    rating: 5,
    productName: 'Power Bank Robuste 30 000 mAh',
    comment: 'Expédié à Bafoussam via agence en 48h. La batterie tient plus de 5 jours entiers sans recharge. Excellent rapport qualité/prix.',
    date: 'Il y a 1 semaine',
    verifiedPurchase: true
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-10482',
    trackingNumber: 'IFM-10482',
    customerName: 'Carine Etoa',
    customerPhone: '+237 677 88 99 00',
    whatsappPhone: '+237 677 88 99 00',
    city: 'Yaoundé',
    neighborhood: 'Bastos (Face Ambassade de Belgique)',
    addressNote: 'Portail vert avec sonnette, face Ambassade',
    deliveryInstructions: 'Appeler dès l\'arrivée dans la zone Bastos',
    items: [
      {
        productId: 'prod-solar-03',
        productName: 'Lampe Solaire LED Rechargeable 100W IP67 avec Détecteur',
        price: 14900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=200&auto=format&fit=crop&q=80'
      },
      {
        productId: 'prod-tech-02',
        productName: 'Écouteurs Sans Fil TWS Bluetooth 5.3',
        price: 9600,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 24500,
    deliveryFee: 0,
    discount: 5000,
    total: 24500,
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'pay_on_delivery',
    orderStatus: 'in_transit',
    createdAt: '2026-09-20 13:45',
    estimatedDeliveryDate: 'Aujourd\'hui entre 14h30 et 16h00',
    courierName: 'Arsène Mbida (Moto Express)',
    courierPhone: '+237 671 23 45 67',
    isDiscreetPackaging: false
  },
  {
    id: 'ord-1001',
    trackingNumber: 'IFP-CMR-8492',
    customerName: 'Michel Tchakounte',
    customerPhone: '+237 699 45 12 80',
    city: 'Douala',
    neighborhood: 'Akwa (face Direction Douanes)',
    addressNote: 'Appeler 15 min avant d\'arriver',
    items: [
      {
        productId: 'prod-solar-01',
        productName: 'Kit Énergie Solaire Hybride 500W',
        price: 48500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=200&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 48500,
    deliveryFee: 1500,
    total: 50000,
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'pay_on_delivery',
    orderStatus: 'in_transit',
    createdAt: '2026-09-20 14:30',
    estimatedDeliveryDate: 'Aujourd\'hui avant 18h',
    courierName: 'Serge - Moto Express #4',
    courierPhone: '+237 670 11 22 33',
    isDiscreetPackaging: false
  },
  {
    id: 'ord-1002',
    trackingNumber: 'IFP-CMR-8493',
    customerName: 'Carine Etoa',
    customerPhone: '+237 677 88 99 00',
    city: 'Yaoundé',
    neighborhood: 'Bastos (Descente Ambassade)',
    items: [
      {
        productId: 'prod-intimacy-01',
        productName: 'Gel Hydratant Douceur & Bien-être Intime',
        price: 8500,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 17000,
    deliveryFee: 1500,
    total: 18500,
    paymentMethod: 'orange_money',
    paymentStatus: 'paid',
    orderStatus: 'preparing',
    createdAt: '2026-09-20 16:15',
    estimatedDeliveryDate: 'Demain avant 12h',
    isDiscreetPackaging: true
  },
  {
    id: 'ord-1003',
    trackingNumber: 'IFP-CMR-8494',
    customerName: 'Alain Fotso',
    customerPhone: '+237 655 44 33 22',
    city: 'Douala',
    neighborhood: 'Bonamoussadi (Rond-point)',
    items: [
      {
        productId: 'prod-home-01',
        productName: 'Robot Cuiseur Multifonction 3L',
        price: 19500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=200&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 19500,
    deliveryFee: 1000,
    total: 20500,
    paymentMethod: 'mtn_momo',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    createdAt: '2026-09-19 11:20',
    estimatedDeliveryDate: 'Livré le 19 Sept 16h40',
    courierName: 'Jean - Coursier #2',
    courierPhone: '+237 691 23 45 67'
  }
];

export const MOCK_COURIER_TASKS: CourierTask[] = [
  {
    id: 'task-c-01',
    orderId: 'ord-10482',
    trackingNumber: 'IFM-10482',
    customerName: 'Carine Etoa',
    customerPhone: '+237 677 88 99 00',
    city: 'Yaoundé',
    neighborhood: 'Bastos (Face Ambassade de Belgique)',
    itemsSummary: '1x Lampe Solaire LED 100W + 1x Écouteurs TWS',
    deliveryFee: 1500,
    totalToCollect: 24500,
    paymentMethod: 'cash_on_delivery',
    isCollected: false,
    status: 'in_route',
    assignedTime: '13:45',
    notes: 'Portail vert avec sonnette. Appeler dès l\'arrivée dans la zone Bastos.'
  },
  {
    id: 'task-c-02',
    orderId: 'ord-10483',
    trackingNumber: 'IFM-10483',
    customerName: 'Christian Nsangou',
    customerPhone: '+237 690 12 34 56',
    city: 'Yaoundé',
    neighborhood: 'Omnisports (Carrefour Mtn)',
    itemsSummary: '1x Pack Mixeur Plongeant 4-en-1 Multifonction',
    deliveryFee: 1000,
    totalToCollect: 18500,
    paymentMethod: 'cash_on_delivery',
    isCollected: false,
    status: 'assigned',
    assignedTime: '14:20',
    notes: 'Client disponible à partir de 15h. Bureau 2ème étage.'
  },
  {
    id: 'task-c-03',
    orderId: 'ord-10480',
    trackingNumber: 'IFM-10480',
    customerName: 'Sophie Meka',
    customerPhone: '+237 674 55 66 77',
    city: 'Yaoundé',
    neighborhood: 'Mvan (Descente complexe)',
    itemsSummary: '2x Kit Énergie Solaire 500W',
    deliveryFee: 1500,
    totalToCollect: 32000,
    paymentMethod: 'orange_money',
    isCollected: true,
    status: 'delivered',
    assignedTime: '11:15',
    notes: 'Colis remis en main propre. Validé par Orange Money.'
  },
  {
    id: 'task-c-04',
    orderId: 'ord-10478',
    trackingNumber: 'IFM-10478',
    customerName: 'Paul Biwole',
    customerPhone: '+237 698 22 11 00',
    city: 'Yaoundé',
    neighborhood: 'Biyem-Assi (Rond-point Express)',
    itemsSummary: '1x Tondeuse Professionnelle Rechargeable',
    deliveryFee: 1500,
    totalToCollect: 15500,
    paymentMethod: 'cash_on_delivery',
    isCollected: false,
    status: 'failed',
    assignedTime: '10:00',
    notes: 'Injoignable après 3 appels et message WhatsApp. Relance prévue demain matin.'
  },
  {
    id: 'task-c-05',
    orderId: 'ord-1004',
    trackingNumber: 'IFP-CMR-8495',
    customerName: 'Nadine Kamga',
    customerPhone: '+237 671 22 33 44',
    city: 'Yaoundé',
    neighborhood: 'Bonapriso / Bastos Sud',
    itemsSummary: '1x Beurre Karité Bio Kribi + 1x Écouteurs TWS',
    deliveryFee: 1000,
    totalToCollect: 14000,
    paymentMethod: 'cash_on_delivery',
    isCollected: true,
    status: 'delivered',
    assignedTime: '09:30',
    notes: 'Payé en espèces à la livraison. Tout était conforme.'
  }
];

export const MOCK_ADMIN_STATS: AdminStats = {
  todayRevenue: 845000,
  todayOrdersCount: 28,
  pendingDeliveriesCount: 11,
  activeCouriersCount: 6,
  chinaShipmentInTransit: 450,
  lowStockItemsCount: 3
};
