// Re-export from data files for backwards compatibility
export { defaultProducts as products } from '@/data/products'

export const heroProduct = {
  id: '1',
  name: 'Sour Cream & Onion',
  flavor: 'Veggie Stix',
  price: 12.30,
  image: '/images/sour-cream.png',
}

export const features = [
  { icon: '🌶️', title: 'EXTRA CHILI', desc: 'Bold heat crafted for spice lovers.', color: 'bg-red-50' },
  { icon: '🍗', title: 'BOLD FLAVOUR', desc: 'Artisanal flavor dusting with unique seasoning blends.', color: 'bg-pink-50' },
  { icon: '🔥', title: 'SMOKEY SIDE', desc: 'Deep smoky notes from traditional slow-fire cooking.', color: 'bg-amber-50' },
]

export const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'CHIPS', href: '/chips' },
  { label: 'ABOUT', href: '/about' },
  { label: 'SERVICES', href: '/services' },
]
