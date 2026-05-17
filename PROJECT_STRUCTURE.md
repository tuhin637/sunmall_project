# SunMall — Full Project Structure

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand (cart, auth)
- **Database**: Supabase (PostgreSQL)
- **Auth**: NextAuth.js
- **Payment**: SSLCommerz (bKash, Nagad, Rocket, Card)
- **Images**: Cloudinary
- **Deploy**: Vercel

## Folder Structure
```
sunmall/
├── app/
│   ├── (shop)/                  # Public shop pages
│   │   ├── page.tsx             # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx         # All products
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Single product
│   │   ├── cart/
│   │   │   └── page.tsx         # Cart page
│   │   ├── checkout/
│   │   │   └── page.tsx         # Checkout
│   │   ├── orders/
│   │   │   └── page.tsx         # My orders
│   │   └── about/
│   │       └── page.tsx
│   │
│   ├── (admin)/                 # Admin panel
│   │   └── admin/
│   │       ├── page.tsx         # Admin dashboard
│   │       ├── products/
│   │       │   ├── page.tsx     # Product list
│   │       │   ├── new/
│   │       │   │   └── page.tsx # Add product
│   │       │   └── [id]/
│   │       │       └── page.tsx # Edit product
│   │       ├── orders/
│   │       │   ├── page.tsx     # All orders
│   │       │   └── [id]/
│   │       │       └── page.tsx # Order detail
│   │       └── settings/
│   │           └── page.tsx
│   │
│   ├── api/                     # API Routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── products/
│   │   │   ├── route.ts         # GET all, POST new
│   │   │   └── [id]/
│   │   │       └── route.ts     # GET, PUT, DELETE
│   │   ├── orders/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── payment/
│   │       ├── init/
│   │       │   └── route.ts     # SSLCommerz init
│   │       ├── success/
│   │       │   └── route.ts
│   │       └── fail/
│   │           └── route.ts
│   │
│   ├── layout.tsx               # Root layout
│   └── globals.css
│
├── components/
│   ├── shop/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── Footer.tsx
│   │   └── FlavorBadge.tsx
│   │
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── ProductTable.tsx
│   │   ├── OrderTable.tsx
│   │   ├── StatsCard.tsx
│   │   └── SalesChart.tsx
│   │
│   └── ui/                      # shadcn components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       └── ...
│
├── lib/
│   ├── supabase.ts              # DB client
│   ├── sslcommerz.ts           # Payment helper
│   ├── cloudinary.ts           # Image upload
│   └── utils.ts
│
├── store/
│   ├── cartStore.ts            # Zustand cart
│   └── authStore.ts
│
├── types/
│   └── index.ts                # TypeScript types
│
├── hooks/
│   ├── useCart.ts
│   ├── useProducts.ts
│   └── useOrders.ts
│
├── .env.local                  # Environment variables
├── next.config.js
├── tailwind.config.js
└── package.json
```
