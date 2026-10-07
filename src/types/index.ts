export type ProductCategory = 
  | 'solar'
  | 'home-kitchen'
  | 'tech'
  | 'beauty'
  | 'intimacy'
  | 'automotive'
  | 'tools'
  | 'sport'
  | 'baby'
  | 'trending'
  | 'deals';

export type ProductOrigin = 'local' | 'china';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number; // in FCFA
  originalPrice?: number; // for discounts
  rating: number;
  reviewsCount: number;
  origin: ProductOrigin;
  originLabel: string;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
  soldCount?: number;
  totalStock?: number; // for flash deal progress
  isFlashDeal?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isDiscreetPackaging?: boolean; // For Intimacy & Wellness
  deliveryDays: string;
  isBundle?: boolean;
  bundleItems?: string[];
  dealExpiresHours?: number;
  isHalfPricePromo?: boolean;
  isBestValueDeal?: boolean;
  trendBadge?: 'tendance' | 'bestseller' | 'nouveau' | 'populaire';
  weeklyRank?: number;
  recentViews?: number;
  popularInCity?: string;
  isRisingStar?: boolean;
  specifications?: { label: string; value: string }[];
  whatsIncluded?: string[];
  videoUrl?: string;
  faq?: { question: string; answer: string }[];
  warrantyInfo?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  productName: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'cash_on_delivery' | 'orange_money' | 'mtn_momo' | 'wave' | 'whatsapp_direct';

export type OrderStatus = 'pending' | 'new' | 'to_confirm' | 'confirmed' | 'preparing' | 'in_transit' | 'delivered' | 'failed' | 'cancelled';

export interface OrderItemSummary {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  trackingNumber: string;
  customerName: string;
  customerPhone: string;
  whatsappPhone?: string;
  city: string;
  neighborhood: string;
  addressNote?: string;
  deliveryInstructions?: string;
  items: OrderItemSummary[];
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  total: number;
  paymentMethod: PaymentMethod;
  momoProvider?: 'mtn' | 'orange';
  momoPhone?: string;
  paymentStatus: 'pending' | 'paid' | 'pay_on_delivery';
  orderStatus: OrderStatus;
  createdAt: string;
  estimatedDeliveryDate: string;
  courierName?: string;
  courierPhone?: string;
  isDiscreetPackaging?: boolean;
}

export interface CourierTask {
  id: string;
  orderId: string;
  trackingNumber: string;
  customerName: string;
  customerPhone: string;
  city: string;
  neighborhood: string;
  itemsSummary: string;
  deliveryFee?: number; // in FCFA
  totalToCollect: number; // in FCFA
  paymentMethod: PaymentMethod;
  isCollected: boolean;
  status: 'assigned' | 'picked_up' | 'in_route' | 'delivered' | 'failed';
  assignedTime: string;
  notes?: string;
}

export interface AdminStats {
  todayRevenue: number;
  todayOrdersCount: number;
  pendingDeliveriesCount: number;
  activeCouriersCount: number;
  chinaShipmentInTransit: number;
  lowStockItemsCount: number;
}
