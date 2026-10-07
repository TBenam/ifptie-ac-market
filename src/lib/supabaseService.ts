import { supabase, isSupabaseConfigured } from './supabase';
import type { Product, Order, CourierTask } from '../types';

// ============================================================================
// 1. GESTION DES COMMANDES (ORDERS)
// ============================================================================

export async function fetchOrdersFromSupabase(): Promise<Order[] | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Erreur Supabase lors de la récupération des commandes:', error.message);
      return null;
    }
    return data as Order[];
  } catch (err) {
    console.error('Exception Supabase fetchOrders:', err);
    return null;
  }
}

export async function saveOrderToSupabase(order: Order): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const { error } = await supabase
      .from('orders')
      .upsert({
        id: order.id,
        tracking_number: order.trackingNumber,
        customer_name: order.customerName,
        customer_phone: order.customerPhone,
        whatsapp_phone: order.whatsappPhone,
        city: order.city,
        neighborhood: order.neighborhood,
        address_note: order.addressNote,
        items: order.items,
        subtotal: order.subtotal,
        delivery_fee: order.deliveryFee,
        discount: order.discount,
        total: order.total,
        payment_method: order.paymentMethod,
        payment_status: order.paymentStatus,
        order_status: order.orderStatus,
        created_at: order.createdAt,
        estimated_delivery_date: order.estimatedDeliveryDate,
        courier_name: order.courierName,
        courier_phone: order.courierPhone
      });

    if (error) {
      console.error('Erreur Supabase enregistrement commande:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception Supabase saveOrder:', err);
    return false;
  }
}

// ============================================================================
// 2. GESTION DES PRODUITS (PRODUCTS)
// ============================================================================

export async function fetchProductsFromSupabase(): Promise<Product[] | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');

    if (error) {
      console.warn('Erreur Supabase chargement produits:', error.message);
      return null;
    }
    return data as Product[];
  } catch (err) {
    console.error('Exception Supabase fetchProducts:', err);
    return null;
  }
}

export async function saveProductToSupabase(product: Product): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const { error } = await supabase
      .from('products')
      .upsert(product);

    if (error) {
      console.error('Erreur Supabase enregistrement produit:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception Supabase saveProduct:', err);
    return false;
  }
}

// ============================================================================
// 3. GESTION DES COURSIERS & TÂCHES (COURIER TASKS)
// ============================================================================

export async function updateCourierStatusInSupabase(taskId: string, status: string, isCollected?: boolean): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const updates: Record<string, any> = { status };
    if (typeof isCollected === 'boolean') {
      updates.is_collected = isCollected;
    }

    const { error } = await supabase
      .from('courier_tasks')
      .update(updates)
      .eq('id', taskId);

    if (error) {
      console.error('Erreur Supabase update coursier:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception Supabase updateCourier:', err);
    return false;
  }
}
