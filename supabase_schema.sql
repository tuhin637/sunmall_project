-- ═══════════════════════════════════════════════
-- SunMall — Supabase Database Schema
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'chips',
  flavor TEXT,
  stock INTEGER DEFAULT 100,
  rating NUMERIC(2,1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  user_id UUID,
  items JSONB NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending','paid','processing','shipped','delivered','cancelled')),
  payment_method TEXT,
  payment_status TEXT DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid','paid','refunded')),
  transaction_id TEXT,
  shipping_address JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample products
INSERT INTO products (name, slug, description, price, original_price, image_url, category, flavor, stock, rating, reviews_count, is_featured) VALUES
(
  'Sour Cream & Onion Veggie Stix',
  'sour-cream-onion-veggie-stix',
  'Crispy veggie stix with tangy sour cream and onion flavour. Made with real vegetables.',
  120, 150,
  '/images/hero.png',
  'veggie-stix', 'Sour Cream & Onion',
  200, 4.9, 128, true
),
(
  'Black Barbeque Veggie Stix',
  'black-barbeque-veggie-stix',
  'Bold smoky barbeque flavour with a satisfying crunch in every bite.',
  110, 140,
  '/images/bbq.png',
  'veggie-stix', 'Black Barbeque',
  150, 4.8, 96, true
),
(
  'Golden Sea Salt Potato Chips',
  'golden-sea-salt-potato-chips',
  'Ultra crunchy potato chips seasoned with premium golden sea salt.',
  130, 160,
  '/images/potato.png',
  'potato-chips', 'Golden Sea Salt',
  180, 4.7, 74, true
),
(
  'Cheese & Herbs Potato Chips',
  'cheese-herbs-potato-chips',
  'Rich cheese and aromatic herbs come together in every crispy chip.',
  125, 155,
  '/images/cheese.png',
  'potato-chips', 'Cheese & Herbs',
  160, 4.8, 88, true
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public read on products
CREATE POLICY "Public products read" ON products
  FOR SELECT USING (is_active = true);

-- Allow public insert on orders (for checkout)
CREATE POLICY "Public orders insert" ON orders
  FOR INSERT WITH CHECK (true);

-- Allow users to read their own orders
CREATE POLICY "Users read own orders" ON orders
  FOR SELECT USING (true);
