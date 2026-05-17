import { Product } from '@/types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Sour Cream & Onion',
    flavor: 'Veggie Stix',
    price: 12.30,
    originalPrice: 15.00,
    image: '/images/sour-cream.png',
    badge: 'BESTSELLER',
    badgeColor: 'bg-brand-green',
    rating: 5,
    reviewCount: 248,
    tags: ['Veggie', 'Tangy', 'Crispy'],
    description: 'Satisfying savory veggie stix with rich sour cream and onion flavor. Zero trans fat, artisanal batch crafted.',
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Black Barbeque',
    flavor: 'Veggie Stix',
    price: 12.30,
    image: '/images/black-bbq.png',
    badge: 'HOT',
    badgeColor: 'bg-brand-red',
    rating: 5,
    reviewCount: 185,
    tags: ['Smoky', 'Bold', 'BBQ'],
    description: 'Intense smoky barbeque flavor with artisanal veggie stix. A bold taste adventure in every bite.',
  },
  {
    id: '3',
    name: 'Golden Sea Salt',
    flavor: 'Potato Chips',
    price: 10.50,
    image: '/images/golden-salt.png',
    badge: 'CLASSIC',
    badgeColor: 'bg-yellow-500',
    rating: 4,
    reviewCount: 312,
    tags: ['Classic', 'Light', 'Salted'],
    description: 'Ultra crunch golden potato chips with premium sea salt. Simple, perfect, irresistible.',
  },
  {
    id: '4',
    name: 'Cheese & Herbs',
    flavor: 'Potato Chips',
    price: 15.89,
    originalPrice: 18.00,
    image: '/images/cheese-herbs.png',
    badge: 'NEW',
    badgeColor: 'bg-orange-500',
    rating: 5,
    reviewCount: 97,
    tags: ['Cheesy', 'Herby', 'Premium'],
    description: 'Ultra crunch potato chips with artisanal cheese and herbs blend. Flavor dusted for maximum taste.',
    isNew: true,
  },
]

export const heroProduct = products[0]

export const features = [
  {
    icon: '🌶️',
    title: 'EXTRA CHILI',
    desc: 'Bold heat that lingers — crafted for spice lovers who crave intensity.',
    color: 'bg-red-50',
  },
  {
    icon: '🍗',
    title: 'BOLD FLAVOUR',
    desc: 'Artisanal flavor dusting with extra energy and unique seasoning blends.',
    color: 'bg-pink-50',
  },
  {
    icon: '🔥',
    title: 'SMOKEY SIDE',
    desc: 'Deep smoky notes reminiscent of traditional slow-fire cooking.',
    color: 'bg-amber-50',
  },
]

export const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CHIPS', href: '/chips' },
  { label: 'SERVICES', href: '/services' },
]
