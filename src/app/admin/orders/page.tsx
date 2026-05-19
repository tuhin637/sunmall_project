'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useOrderStore } from '@/store/orderStore'
import { OrderStatus } from '@/data/orders'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

const STATUSES: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const statusConfig: Record<OrderStatus, { color: string; bg: string; icon: string }> = {
  pending:    { color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200',  icon: '⏳' },
  processing: { color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-200',      icon: '⚙️' },
  shipped:    { color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200',  icon: '🚚' },
  delivered:  { color: 'text-green-700',  bg: 'bg-green-50 border-green-200',    icon: '✅' },
  cancelled:  { color: 'text-red-700',    bg: 'bg-red-50 border-red-200',        icon: '❌' },
}

export default function OrdersPage() {
  const { orders, updateStatus, deleteOrder } = useOrderStore()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'date' | 'total'>('date')

  const filtered = orders
    .filter(o => {
      const matchSearch = o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(search.toLowerCase())
      const matchStatus = filterStatus === 'all' || o.status === filterStatus
      const matchFrom = !dateFrom || o.date >= dateFrom
      const matchTo = !dateTo || o.date <= dateTo
      return matchSearch && matchStatus && matchFrom && matchTo
    })
    .sort((a, b) => sortBy === 'date'
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : b.total - a.total
    )

  const selectedOrder = selected ? orders.find(o => o.id === selected) : null

  const handleStatus = (orderId: string, status: OrderStatus) => {
    updateStatus(orderId, status)
    toast.success(`Order ${orderId} → ${status}!`)
  }

  const handleDelete = (orderId: string) => {
    deleteOrder(orderId)
    setSelected(null)
    toast.success('Order deleted!')
  }

  return (
    <div className="flex gap-6 h-full">
      {/* Left: Orders List */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-bebas text-4xl text-brand-dark tracking-wide">Order Management</h1>
            <p className="text-gray-500 text-sm font-semibold mt-1">{filtered.length} of {orders.length} orders</p>
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as 'date' | 'total')}
            className="border-2 border-gray-100 rounded-2xl px-4 py-2 text-sm font-bold focus:outline-none bg-white">
            <option value="date">Sort: Date</option>
            <option value="total">Sort: Amount</option>
          </select>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-6">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search by name, email, order ID..."
            className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-brand-green bg-white" />
          <div className="flex flex-wrap gap-2">
            {(['all', ...STATUSES] as const).map(s => {
              const conf = s !== 'all' ? statusConfig[s] : null
              return (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all border ${
                    filterStatus === s
                      ? 'bg-brand-dark text-white border-brand-dark'
                      : `bg-white text-gray-500 border-gray-200 hover:border-gray-300`
                  }`}>
                  {conf ? `${conf.icon} ` : ''}{s}
                </button>
              )
            })}
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-black text-gray-400 mb-1 block">From</label>
              <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2 text-sm font-semibold focus:outline-none focus:border-brand-green bg-white" />
            </div>
            <div className="flex-1">
              <label className="text-xs font-black text-gray-400 mb-1 block">To</label>
              <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2 text-sm font-semibold focus:outline-none focus:border-brand-green bg-white" />
            </div>
            {(dateFrom || dateTo) && (
              <button onClick={() => { setDateFrom(''); setDateTo('') }}
                className="self-end border-2 border-gray-200 rounded-2xl px-4 py-2 text-xs font-black text-gray-500 hover:bg-gray-100">Clear</button>
            )}
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((order, i) => {
              const conf = statusConfig[order.status]
              const isSelected = selected === order.id
              return (
                <motion.div key={order.id} layout
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }} transition={{ delay: i * 0.03 }}
                  onClick={() => setSelected(isSelected ? null : order.id)}
                  className={`bg-white rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all border-2 ${isSelected ? 'border-brand-green shadow-md' : 'border-transparent'}`}>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                        {order.customerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-black text-sm text-brand-dark">{order.customerName}</p>
                        <p className="text-xs text-gray-400 font-semibold">{order.id} · {order.date}</p>
                        <p className="text-xs text-gray-400">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-black text-lg text-brand-dark">{formatPrice(order.total)}</span>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full border capitalize ${conf.bg} ${conf.color}`}>
                        {conf.icon} {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Status changer */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Change Status:</p>
                        <div className="flex flex-wrap gap-2">
                          {STATUSES.map(s => (
                            <button key={s} onClick={e => { e.stopPropagation(); handleStatus(order.id, s) }}
                              className={`px-3 py-1.5 rounded-full text-xs font-black capitalize transition-all ${
                                order.status === s ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}>
                              {statusConfig[s].icon} {s}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <div className="text-6xl mb-4">📦</div>
              <p className="font-black text-lg">No orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Order Detail Panel */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.aside initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
            className="w-80 flex-shrink-0 bg-white rounded-3xl p-6 shadow-sm self-start sticky top-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-bebas text-2xl text-brand-dark tracking-wide">{selectedOrder.id}</h2>
                <p className="text-xs text-gray-400 font-semibold">{selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelected(null)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">×</button>
            </div>

            {/* Customer Info */}
            <div className="bg-cream rounded-2xl p-4 mb-5">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Customer</p>
              <p className="font-black text-brand-dark">{selectedOrder.customerName}</p>
              <p className="text-xs text-gray-500 mt-0.5">{selectedOrder.customerEmail}</p>
              <p className="text-xs text-gray-500">{selectedOrder.customerPhone}</p>
              <p className="text-xs text-gray-500 mt-1">📍 {selectedOrder.address}</p>
            </div>

            {/* Items */}
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Order Items</p>
            <div className="space-y-3 mb-5">
              {selectedOrder.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-cream rounded-2xl p-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white flex-shrink-0">
                    <Image src={item.productImage} alt={item.productName} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-xs text-brand-dark truncate">{item.productName}</p>
                    <p className="text-xs text-gray-400">×{item.quantity} · {formatPrice(item.price)}</p>
                  </div>
                  <p className="font-black text-xs">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-100 pt-4 mb-5">
              {selectedOrder.couponCode && (
                <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
                  <span>Coupon: {selectedOrder.couponCode}</span>
                  <span>-{formatPrice(selectedOrder.discount || 0)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-lg">
                <span>Total</span>
                <span className="text-brand-green">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Status */}
            <div className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 mb-5 font-black text-sm capitalize ${statusConfig[selectedOrder.status].bg} ${statusConfig[selectedOrder.status].color}`}>
              {statusConfig[selectedOrder.status].icon} {selectedOrder.status}
            </div>

            <button onClick={() => handleDelete(selectedOrder.id)}
              className="w-full border-2 border-red-200 text-brand-red font-black text-sm py-3 rounded-full hover:bg-brand-red hover:text-white transition-all">
              🗑️ Delete Order
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}
