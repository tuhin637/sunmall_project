'use client'
// app/(shop)/checkout/page.tsx
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Navbar from '@/components/shop/Navbar'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    district: 'Dhaka',
    postal_code: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) {
      toast.error('Your cart is empty!')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/payment/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          totalAmount: getTotalPrice(),
          shippingAddress: form,
        }),
      })
      const data = await res.json()
      if (data.url) {
        clearCart()
        window.location.href = data.url
      } else {
        toast.error('Payment failed. Try again.')
      }
    } catch {
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  const total = getTotalPrice()
  const shipping = total >= 500 ? 0 : 60
  const grandTotal = total + shipping

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">

        {/* Left: Form */}
        <div>
          <h1 className="font-display text-3xl font-black mb-8">Shipping Details</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'full_name', label: 'Full Name', type: 'text' },
              { name: 'phone', label: 'Phone Number', type: 'tel' },
              { name: 'address', label: 'Full Address', type: 'text' },
              { name: 'city', label: 'City', type: 'text' },
              { name: 'district', label: 'District', type: 'text' },
              { name: 'postal_code', label: 'Postal Code', type: 'text' },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-sm font-bold text-gray-600 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={(form as any)[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-bold focus:border-brand-green outline-none transition-colors"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dark-green text-white rounded-full py-4 font-black text-lg mt-4 hover:bg-brand-green transition-colors disabled:opacity-60"
            >
              {loading ? '⏳ Redirecting to Payment...' : '🔒 Pay with bKash / Nagad / Card'}
            </button>
            <p className="text-xs text-gray-400 text-center font-bold">
              Secured by SSLCommerz — bKash, Nagad, Rocket, Card all supported
            </p>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div>
          <h2 className="font-display text-2xl font-black mb-6">Order Summary</h2>
          <div className="bg-white rounded-2xl p-6 space-y-4 border border-gray-100 shadow-sm">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between items-center">
                <span className="font-bold text-sm text-gray-700">{product.name} × {quantity}</span>
                <span className="font-black">৳{(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm font-bold text-gray-500">
                <span>Subtotal</span><span>৳{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-500">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-brand-green' : ''}>
                  {shipping === 0 ? 'FREE 🎉' : `৳${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-xl font-black border-t pt-3">
                <span>Total</span><span>৳{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment logos */}
          <div className="mt-6 bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-xs text-gray-400 font-bold text-center mb-3">ACCEPTED PAYMENTS</p>
            <div className="flex justify-center gap-4 flex-wrap">
              {['bKash', 'Nagad', 'Rocket', 'Visa', 'Mastercard'].map(m => (
                <span key={m} className="bg-gray-100 text-gray-600 text-xs font-black px-3 py-1.5 rounded-lg">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
