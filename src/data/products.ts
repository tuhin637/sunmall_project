export interface Product {
  id: string
  name: string
  flavor: string
  category: 'veggie-stix' | 'potato-chips'
  price: number
  originalPrice?: number
  image: string
  badge?: string
  badgeColor?: string
  rating: number
  reviewCount: number
  tags: string[]
  description: string
  longDescription?: string
  isNew?: boolean
  isBestseller?: boolean
  isFeatured?: boolean
  inStock: boolean
  discount?: number
  weight?: string
}

export const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Sour Cream & Onion',
    flavor: 'Veggie Stix',
    category: 'veggie-stix',
    price: 12.30,
    originalPrice: 15.00,
    image: '/images/sour-cream.png',
    badge: 'BESTSELLER',
    badgeColor: 'bg-brand-green',
    rating: 5,
    reviewCount: 248,
    tags: ['Veggie', 'Tangy', 'Crispy'],
    description: 'Artisanal veggie stix with rich sour cream and onion flavor.',
    longDescription: 'Our signature Sour Cream & Onion Veggie Stix are crafted from the finest vegetables, slow-baked for that perfect crunch. Zero trans fat, artisanal batch crafted with love.',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    weight: '85g',
    discount: 18,
  },
  {
    id: '2',
    name: 'Black Barbeque',
    flavor: 'Veggie Stix',
    category: 'veggie-stix',
    price: 12.30,
    image: '/images/black-bbq.png',
    badge: 'HOT 🔥',
    badgeColor: 'bg-brand-red',
    rating: 5,
    reviewCount: 185,
    tags: ['Smoky', 'Bold', 'BBQ'],
    description: 'Intense smoky barbeque veggie stix. Bold taste in every bite.',
    longDescription: 'Deep smoky barbeque flavor infused into every stix. Made with real BBQ spices and artisanal seasoning blends. A bold taste adventure.',
    isFeatured: true,
    inStock: true,
    weight: '85g',
  },
  {
    id: '3',
    name: 'Golden Sea Salt',
    flavor: 'Potato Chips',
    category: 'potato-chips',
    price: 10.50,
    image: '/images/golden-salt.png',
    badge: 'CLASSIC',
    badgeColor: 'bg-yellow-500',
    rating: 4,
    reviewCount: 312,
    tags: ['Classic', 'Light', 'Salted'],
    description: 'Ultra crunch golden potato chips with premium sea salt.',
    longDescription: 'Classic never goes out of style. Our Golden Sea Salt chips are sliced thin and fried to perfection, then dusted with premium Himalayan sea salt.',
    inStock: true,
    weight: '100g',
  },
  {
    id: '4',
    name: 'Cheese & Herbs',
    flavor: 'Potato Chips',
    category: 'potato-chips',
    price: 15.89,
    originalPrice: 18.00,
    image: '/images/cheese-herbs.png',
    badge: 'NEW ✨',
    badgeColor: 'bg-orange-500',
    rating: 5,
    reviewCount: 97,
    tags: ['Cheesy', 'Herby', 'Premium'],
    description: 'Ultra crunch chips with artisanal cheese and herbs blend.',
    longDescription: 'A gourmet twist on the classic chip. Loaded with aged cheddar and a bouquet of fresh herbs. Our most premium offering yet.',
    isNew: true,
    isFeatured: true,
    inStock: true,
    weight: '90g',
    discount: 12,
  },
]
