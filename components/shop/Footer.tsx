// components/shop/Footer.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 lg:px-16 py-14">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image src="/images/logo.png" alt="SunMall" width={40} height={40} className="object-contain" />
            <span className="font-display text-xl font-bold">SunMall</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Bangladesh's crunchiest snack store. Real veggies, real taste, zero guilt.
          </p>
        </div>

        {[
          {
            title: 'Shop',
            links: [
              { label: 'All Chips', href: '/products' },
              { label: 'Veggie Stix', href: '/products?cat=veggie-stix' },
              { label: 'Potato Chips', href: '/products?cat=potato-chips' },
              { label: 'New Arrivals', href: '/products?sort=new' },
            ],
          },
          {
            title: 'Help',
            links: [
              { label: 'Track Order', href: '/orders' },
              { label: 'Shipping Info', href: '/shipping' },
              { label: 'Returns', href: '/returns' },
              { label: 'Contact Us', href: '/contact' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'About Us', href: '/about' },
              { label: 'Careers', href: '/careers' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ],
          },
        ].map(col => (
          <div key={col.title}>
            <h4 className="font-black text-sm uppercase tracking-widest mb-4 text-gray-300">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 text-sm hover:text-white transition-colors font-bold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm font-bold">
          © 2026 SunMall Food Brand. All rights reserved.
        </p>
        <div className="flex gap-3 flex-wrap">
          {['bKash', 'Nagad', 'Rocket', 'Visa', 'Mastercard'].map(m => (
            <span key={m} className="bg-white/10 text-gray-300 text-xs font-black px-3 py-1.5 rounded-lg">
              {m}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
