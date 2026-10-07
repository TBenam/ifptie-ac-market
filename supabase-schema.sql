-- ==============================================================================
-- IFPTIE MARKET - SCHEMA DE BASE DE DONNEES SUPABASE (POSTGRESQL)
-- ==============================================================================
-- Copiez et collez ce script dans l'éditeur SQL de votre projet Supabase
-- (Supabase Dashboard > SQL Editor > New query)

-- 1. Table des produits (Products)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  origin TEXT DEFAULT 'local',
  origin_label TEXT,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  short_description TEXT,
  full_description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  in_stock BOOLEAN DEFAULT true,
  stock_count INTEGER DEFAULT 10,
  is_flash_deal BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  delivery_days TEXT DEFAULT '24h - 48h',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Table des commandes (Orders)
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  tracking_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  whatsapp_phone TEXT,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  address_note TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC NOT NULL,
  delivery_fee NUMERIC NOT NULL DEFAULT 1500,
  discount NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL,
  payment_method TEXT DEFAULT 'cash_on_delivery',
  payment_status TEXT DEFAULT 'pay_on_delivery',
  order_status TEXT DEFAULT 'pending',
  courier_name TEXT,
  courier_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  estimated_delivery_date TEXT
);

-- 3. Table des tâches coursiers (Courier Tasks)
CREATE TABLE IF NOT EXISTS public.courier_tasks (
  id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES public.orders(id),
  tracking_number TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  items_summary TEXT,
  total_to_collect NUMERIC NOT NULL,
  payment_method TEXT DEFAULT 'cash_on_delivery',
  is_collected BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'assigned',
  assigned_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Activation de Row Level Security (RLS) avec politique de lecture publique
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courier_tasks ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique
CREATE POLICY "Lecture publique des produits" ON public.products FOR SELECT USING (true);
CREATE POLICY "Insertion et lecture des commandes" ON public.orders FOR ALL USING (true);
CREATE POLICY "Gestion des livraisons" ON public.courier_tasks FOR ALL USING (true);
