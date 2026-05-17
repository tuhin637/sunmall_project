# 🌟 SunMall — Setup Guide

## Step 1 — Project Install করো

```bash
# Clone/download করার পর
cd sunmall
npm install
```

---

## Step 2 — Supabase Setup

1. **supabase.com** এ account খোলো (free)
2. নতুন project create করো
3. SQL Editor এ গিয়ে `supabase_schema.sql` এর সব code paste করে Run করো
4. Settings > API থেকে URL ও Keys নাও

---

## Step 3 — SSLCommerz Setup

1. **sslcommerz.com** এ গিয়ে Merchant account খোলো
2. Sandbox mode এ test করতে পারবে (free)
3. Store ID ও Password নাও

---

## Step 4 — Cloudinary Setup (Image Upload)

1. **cloudinary.com** এ free account খোলো
2. Dashboard থেকে Cloud Name, API Key, API Secret নাও

---

## Step 5 — .env.local ফাইল পূরণ করো

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

NEXTAUTH_SECRET=any-random-long-string-here
NEXTAUTH_URL=http://localhost:3000

SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_password
SSLCOMMERZ_IS_LIVE=false

CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

## Step 6 — Images রাখো

`public/images/` ফোল্ডারে এই files রাখো:
- `hero.png` — Sour Cream & Onion (hero image)
- `bbq.png` — Black Barbeque
- `potato.png` — Golden Sea Salt
- `cheese.png` — Cheese & Herbs
- `logo.png` — SunMall Logo

---

## Step 7 — Run করো

```bash
npm run dev
```

Browser এ যাও: **http://localhost:3000**

Admin Panel: **http://localhost:3000/admin**

---

## Step 8 — Vercel এ Deploy

```bash
npm install -g vercel
vercel
```

Environment variables গুলো Vercel dashboard এ add করো।

---

## 📁 Pages Summary

| URL | কী আছে |
|-----|--------|
| `/` | Homepage (Hero + Products) |
| `/products` | সব products |
| `/products/[slug]` | Single product detail |
| `/cart` | Cart page |
| `/checkout` | Checkout + Payment |
| `/orders` | My orders |
| `/admin` | Admin Dashboard |
| `/admin/products` | Product management |
| `/admin/orders` | Order management |

---

## 💳 Payment Flow

```
Customer → Checkout Page
  → POST /api/payment/init
    → SSLCommerz Gateway
      → bKash / Nagad / Card
        → Success → /api/payment/success
          → Order status = "paid"
```
