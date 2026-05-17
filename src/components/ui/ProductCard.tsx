'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Star } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { formatPrice, cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCartStore()

  const handleAdd = () => {
    addItem(product)
    toast.success(`${product.name} added! 🛒`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card bg-white rounded-3xl p-5 flex gap-4 items-center cursor-pointer group"
      onClick={handleAdd}
    >
      {/* Image */}
      <div className="relative w-24 h-28 flex-shrink-0 rounded-2xl overflow-hidden bg-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
        />
        {/* Badge */}
        {product.badge && (
          <span className={cn(
            'absolute top-1 left-1 text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full',
            product.badgeColor
          )}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-0.5">{product.flavor}</p>
        <h3 className="font-black text-base text-brand-dark leading-tight mb-2 truncate">{product.name}</h3>

        {/* Stars */}
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < product.rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-1 font-semibold">({product.reviewCount})</span>
        </div>

        {/* Tags */}
        <div className="flex gap-1 flex-wrap mb-3">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[9px] font-black bg-cream text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wide">
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-black text-lg text-brand-dark">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-2">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <button
            className="bg-brand-red text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full hover:bg-red-700 transition-colors flex items-center gap-1"
            onClick={(e) => { e.stopPropagation(); handleAdd() }}
          >
            <ShoppingCart size={10} />
            Order
          </button>
        </div>
      </div>
    </motion.div>
  )
}
