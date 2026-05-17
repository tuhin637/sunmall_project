import Image from 'next/image'
import Link from 'next/link'

const footerLinks = {
  'Shop': ['All Chips', 'Veggie Stix', 'Potato Chips', 'New Arrivals', 'Bestsellers'],
  'Company': ['About Us', 'Our Story', 'Careers', 'Press', 'Contact'],
  'Support': ['FAQ', 'Shipping Policy', 'Returns', 'Track Order', 'Bulk Orders'],
}

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/images/logo.png" alt="SunMall" width={44} height={44} className="object-contain" />
              <span className="font-bebas text-3xl tracking-wide">
                Sun<span className="text-brand-green-light">Mall</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium artisanal chips and veggie stix. Crafted with the finest ingredients for bold, unforgettable flavors.
            </p>
            <div className="flex gap-3">
              {['📘', '📸', '🐦', '📌'].map((icon, i) => (
                <button key={i} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-base hover:bg-brand-green transition-colors">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bebas text-xl tracking-widest text-white mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 SunMall Food Brand. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link key={item} href="#" className="text-gray-500 text-xs hover:text-white transition-colors font-semibold">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
