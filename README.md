# 🌟 SunMall — Too Yummi Chips Website

A production-grade Next.js e-commerce website for SunMall chips brand.

---

## 🏗️ Project Structure

```
sunmall/
├── public/
│   └── images/              # Product & logo images
│       ├── logo.png
│       ├── sour-cream.png   # Hero product
│       ├── black-bbq.png
│       ├── golden-salt.png
│       └── cheese-herbs.png
│
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout + metadata
│   │   └── page.tsx         # Home page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Sticky nav with mobile menu
│   │   │   ├── CartSidebar.tsx  # Slide-in cart drawer
│   │   │   └── Footer.tsx       # Full footer
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Main hero with floating product
│   │   │   ├── ProductsSection.tsx  # Product grid
│   │   │   ├── FeaturesSection.tsx  # Stats + banner
│   │   │   └── NewsletterSection.tsx
│   │   │
│   │   └── ui/
│   │       └── ProductCard.tsx  # Reusable product card
│   │
│   ├── hooks/
│   │   └── useCart.ts       # Cart hook with toast notifications
│   │
│   ├── lib/
│   │   ├── data.ts          # Product data & content
│   │   └── utils.ts         # cn(), formatPrice(), renderStars()
│   │
│   ├── store/
│   │   └── cartStore.ts     # Zustand cart store (persisted)
│   │
│   └── types/
│       └── index.ts         # TypeScript types
│
├── styles/
│   └── globals.css          # Global styles + Tailwind imports
│
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework, App Router, SSR/SSG |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Zustand** | Global cart state (persisted to localStorage) |
| **react-hot-toast** | Toast notifications |
| **lucide-react** | Icons |

---

## 📦 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# http://localhost:3000
```

---

## 🌐 Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts — done in 1 minute!
```

---

## ✨ Features

- **Responsive Design** — Mobile, tablet, desktop
- **Sticky Navbar** — With mobile hamburger menu
- **Floating Hero** — Animated product image
- **Cart System** — Add, remove, update quantity
- **Persistent Cart** — Saved to localStorage
- **Cart Sidebar** — Slide-in drawer with Framer Motion
- **Toast Notifications** — User feedback on actions
- **Product Cards** — Hover animations
- **Newsletter** — Email subscription form
- **SEO Ready** — Next.js metadata API
- **TypeScript** — Full type safety

---

## 🛍️ Adding More Products

Edit `src/lib/data.ts`:

```ts
export const products: Product[] = [
  {
    id: '5',
    name: 'Spicy Masala',
    flavor: 'Potato Chips',
    price: 11.99,
    image: '/images/spicy-masala.png', // add image to public/images/
    badge: 'HOT',
    badgeColor: 'bg-brand-red',
    rating: 5,
    reviewCount: 142,
    tags: ['Spicy', 'Indian', 'Bold'],
    description: 'Bold Indian spices meet crispy potato chips.',
    isNew: true,
  },
]
```

---

## 📱 Pages to Build Next

- `/chips` — Full product listing with filters
- `/product/[id]` — Product detail page
- `/about` — Brand story
- `/checkout` — Checkout flow
- `/admin` — Dashboard (optional)

---

Made with ❤️ for SunMall Food Brand
