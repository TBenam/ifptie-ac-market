import { create } from 'zustand';
import type { Product, CartItem, Order, CourierTask, OrderStatus } from '../types';
import { MOCK_ORDERS, MOCK_COURIER_TASKS } from '../mock/data';
import { saveOrderToSupabase, updateCourierStatusInSupabase } from '../lib/supabaseService';

export type AppView = 'storefront' | 'categories' | 'listing' | 'promotions' | 'trending' | 'product-detail' | 'cart' | 'checkout' | 'order-confirmation' | 'tracking' | 'courier' | 'admin';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface StoreState {
  // Navigation & View
  activeView: AppView;
  setActiveView: (view: AppView) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;

  // Category Drawer Menu
  isCategoryDrawerOpen: boolean;
  setIsCategoryDrawerOpen: (open: boolean) => void;

  // Product Filter & Search
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  originFilter: 'all' | 'local' | 'china';
  setOriginFilter: (origin: 'all' | 'local' | 'china') => void;

  // Selected Product (for Quick view modal)
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Orders & Tracking
  orders: Order[];
  activeTrackingNumber: string;
  setActiveTrackingNumber: (num: string) => void;
  createOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Courier Tasks
  courierTasks: CourierTask[];
  updateCourierTaskStatus: (taskId: string, status: CourierTask['status'], isCollected?: boolean) => void;

  // Toasts
  toasts: ToastNotification[];
  addToast: (message: string, type?: ToastNotification['type']) => void;
  removeToast: (id: string) => void;
}

const LOCAL_STORAGE_CART_KEY = 'ifptie_market_cart';

const getInitialCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const useStore = create<StoreState>((set, get) => ({
  activeView: 'storefront',
  setActiveView: (view) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    set({ activeView: view });
  },

  isCategoryDrawerOpen: false,
  setIsCategoryDrawerOpen: (open) => set({ isCategoryDrawerOpen: open }),

  cart: getInitialCart(),
  isCartOpen: false,
  setIsCartOpen: (open) => set({ isCartOpen: open }),

  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id);
      let newCart: CartItem[];
      if (existing) {
        newCart = state.cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...state.cart, { product, quantity }];
      }
      try {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newCart));
      } catch (e) {
        console.error('Error saving cart to local storage', e);
      }
      return { cart: newCart, isCartOpen: true };
    });
    get().addToast(`"${product.name.slice(0, 30)}..." ajouté au panier !`, 'success');
  },

  removeFromCart: (productId) => {
    set((state) => {
      const newCart = state.cart.filter((item) => item.product.id !== productId);
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newCart));
      return { cart: newCart };
    });
    get().addToast('Article retiré du panier', 'info');
  },

  updateQuantity: (productId, delta) => {
    set((state) => {
      const newCart = state.cart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newCart));
      return { cart: newCart };
    });
  },

  clearCart: () => {
    localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
    set({ cart: [] });
  },

  getCartSubtotal: () => {
    return get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  getCartCount: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  wishlist: [],
  toggleWishlist: (productId) => {
    set((state) => {
      const exists = state.wishlist.includes(productId);
      const newWishlist = exists
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId];
      return { wishlist: newWishlist };
    });
    const isNowSaved = !get().wishlist.includes(productId);
    get().addToast(
      isNowSaved ? 'Ajouté à vos favoris' : 'Retiré des favoris',
      'info'
    );
  },

  selectedCategory: 'all',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  originFilter: 'all',
  setOriginFilter: (origin) => set({ originFilter: origin }),

  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  orders: MOCK_ORDERS,
  activeTrackingNumber: 'IFM-10482',
  setActiveTrackingNumber: (num) => set({ activeTrackingNumber: num }),

  createOrder: (order) => {
    set((state) => ({
      orders: [order, ...state.orders],
      activeTrackingNumber: order.trackingNumber,
      cart: []
    }));
    localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
    // Background sync to Supabase if configured
    saveOrderToSupabase(order).catch(err => console.warn('Supabase sync error:', err));
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    }));
    get().addToast(`Statut de commande mis à jour : ${status}`, 'info');
  },

  courierTasks: MOCK_COURIER_TASKS,
  updateCourierTaskStatus: (taskId, status, isCollected) => {
    set((state) => ({
      courierTasks: state.courierTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
              ...(isCollected !== undefined ? { isCollected } : {})
            }
          : task
      )
    }));
    get().addToast(`Statut livraison mis à jour : ${status}`, 'success');
    // Background sync to Supabase
    updateCourierStatusInSupabase(taskId, status, isCollected).catch(err => console.warn('Supabase sync courier error:', err));
  },

  toasts: [],
  addToast: (message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }]
    }));
    setTimeout(() => {
      get().removeToast(id);
    }, 3500);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }));
  }
}));
