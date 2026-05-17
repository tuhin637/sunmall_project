'use client'
// components/shop/ProductCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/types'
import toast from 'react-hot-toast'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    toast.success(`${product.name} added to cart! 🎉`, {
      style: { background: '#1a4a2e', color: 'white' },
      iconTheme: { primary: '#e6a817', secondary: '#1a4a2e' },
    })
  }

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group bg-white rounded-2xl p-5 flex items-center gap-4 cursor-pointer border border-transparent hover:border-light-green hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

        {/* Product Image */}
        <div className="relative w-24 h-28 flex-shrink-0">
          {discount && (
            <span className="absolute -top-2 -left-2 z-10 bg-brand-red text-white text-xs font-black px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-black text-base text-gray-900 truncate">{product.name}</p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{product.flavor}</p>

          {/* Stars */}
          <div className="flex items-center gap-1 mt-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'fill-brand-gold text-brand-gold' : 'text-gray-200 fill-gray-200'}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">({product.reviews_count})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-black text-xl text-gray-900">৳{product.price}</span>
            {product.original_price && (
              <span className="text-sm text-gray-400 line-through">৳{product.original_price}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-3 flex items-center gap-2 bg-brand-red text-white rounded-full px-4 py-2 text-sm font-black hover:bg-dark-green transition-colors"
          >
            <ShoppingCart size={14} />
            Order Now
          </button>
        </div>
      </div>
    </Link>
  )
}
