// app/(shop)/page.tsx
export const dynamic = 'force-dynamic'

import Image from 'next/image'
import Link from 'next/link'
import { getProducts } from '@/lib/supabase'
import ProductCard from '@/components/shop/ProductCard'
import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'

export default async function HomePage() {
  let products: any[] = []
  try {
    products = await getProducts({ limit: 6 }) || []
  } catch (e) {
    // DB not configured yet — show empty state
  }

  return (
    <>
      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-3 gap-8 items-center min-h-[580px] py-12">

          {/* Left */}
          <div className="animate-fade-in-up">
            <span className="inline-block bg-light-green text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              ✨ New Arrival
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-black leading-tight mb-4">
              Eat Our <span className="text-brand-green">Crispy</span> Veggie Stix
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-sm">
              Satisfying savory snacks made with real vegetables — zero guilt, maximum crunch. Anytime, anywhere, always yummi.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/products"
                className="flex items-center gap-2 bg-gray-900 text-white rounded-full px-8 py-4 font-black text-base hover:bg-brand-green transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                🛒 Shop Now
              </Link>
              <Link
                href="/about"
                className="font-bold text-gray-500 hover:text-dark-green underline underline-offset-4 transition-colors"
              >
                Our Story →
              </Link>
            </div>
          </div>

          {/* Center — Hero Bag */}
          <div className="flex justify-center items-center relative">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-brand-green/10 blur-3xl scale-110" />
              <div className="absolute left-0 top-[42%] -translate-x-1/2 rotate-[-3deg] bg-brand-gold text-gray-900 font-display font-bold text-xl px-5 py-3 rounded-lg border-2 border-amber-600 shadow-[3px_4px_0_#9a6508] whitespace-nowrap z-10 animate-pop">
                CRISPY &amp;
              </div>
              <div className="absolute left-0 top-[57%] -translate-x-1/3 rotate-[-2deg] bg-brand-red text-white font-display font-bold text-xl px-5 py-3 rounded-lg border-2 border-red-800 shadow-[3px_4px_0_#6e1f17] whitespace-nowrap z-10 animate-pop [animation-delay:200ms]">
                TEASTY
              </div>
              <Image
                src="/images/hero.png"
                alt="Too Yummi Veggie Stix"
                width={340}
                height={400}
                className="object-contain animate-float drop-shadow-2xl relative z-0"
                priority
              />
            </div>
          </div>

          {/* Right — Features */}
          <div className="flex flex-col gap-7 animate-fade-in-up [animation-delay:300ms]">
            {[
              { icon: '🌶️', color: 'bg-dark-green', title: 'Extra Chili', desc: 'Bold heat that tingles your taste buds with every crunch.' },
              { icon: '🍗', color: 'bg-brand-red', title: 'Beef Flavour', desc: 'Rich smoky beef taste packed with energy and flavour.' },
              { icon: '🔥', color: 'bg-brand-gold', title: 'Smokey Side', desc: 'Slow-roasted smokiness that keeps you coming back for more.' },
            ].map(f => (
              <div key={f.title} className="flex items-center gap-4">
                <div className={`${f.color} w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0`}>
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-widest mb-1">{f.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRODUCTS ─────────────────────────────────────── */}
        <section className="bg-dark-green rounded-t-[2rem] px-6 lg:px-16 py-14">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">
                Our <span className="text-brand-gold">Popular</span> Snacks
              </h2>
              <Link
                href="/products"
                className="text-brand-gold font-black text-sm uppercase tracking-widest border-b-2 border-brand-gold pb-0.5 hover:opacity-70 transition-opacity"
              >
                SEE ALL →
              </Link>
            </div>

            {products.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-white/50 text-center py-12 font-bold">Products loading...</p>
            )}
          </div>
        </section>

        {/* ── BANNER ───────────────────────────────────────── */}
        <section className="bg-brand-gold px-6 lg:px-16 py-16 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-black text-dark-green mb-4">
            Free Delivery Over ৳500 🚚
          </h2>
          <p className="text-dark-green/70 font-bold text-lg mb-8">
            Order now and get your snacks delivered within 24 hours in Dhaka.
          </p>
          <Link
            href="/products"
            className="inline-block bg-dark-green text-white rounded-full px-10 py-4 font-black text-lg hover:scale-105 transition-transform"
          >
            Order Now →
          </Link>
        </section>
      </main>

      <Footer />
    </>
  )
}
