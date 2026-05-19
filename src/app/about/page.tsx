import Navbar from '@/components/layout/Navbar'
import CartSidebar from '@/components/layout/CartSidebar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <CartSidebar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-50 to-cream py-20 px-6 lg:px-12 text-center">
        <p className="text-brand-gold text-xs font-black tracking-[4px] uppercase mb-3">Our Story</p>
        <h1 className="font-bebas text-6xl lg:text-8xl text-brand-dark tracking-wide mb-6">About SunMall</h1>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Born out of a love for bold flavours and wholesome snacking, SunMall brings you artisanal chips and veggie stix crafted with the finest ingredients.
        </p>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: '🌿', title: 'Natural Ingredients', desc: 'No artificial colours or flavours. Just real ingredients you can pronounce.' },
            { icon: '🔥', title: 'Artisanal Process', desc: 'Small-batch crafted with traditional techniques for maximum flavour and crunch.' },
            { icon: '❤️', title: 'Made with Love', desc: 'Every pack is quality checked to ensure you get the best snacking experience.' },
          ].map(v => (
            <div key={v.title} className="bg-white rounded-3xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">{v.icon}</div>
              <h3 className="font-black text-xl text-brand-dark mb-3">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Brand */}
        <div className="bg-brand-dark rounded-3xl p-12 text-center text-white">
          <div className="flex justify-center mb-6">
            <Image src="/images/logo.png" alt="SunMall" width={80} height={80} className="object-contain" />
          </div>
          <h2 className="font-bebas text-5xl tracking-wide mb-4">SunMall Food Brand</h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed text-sm">
            Founded with the mission to make healthy snacking exciting. Our Too Yummi range is loved by thousands across the country. We believe great snacks should be bold, honest, and irresistible.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
