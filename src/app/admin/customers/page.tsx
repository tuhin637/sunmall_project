'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCustomerStore } from '@/store/customerStore'
import { useOrderStore } from '@/store/orderStore'
import { Customer } from '@/data/customers'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function CustomersPage() {
  const { customers, toggleBlock } = useCustomerStore()
  const { orders } = useOrderStore()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'blocked'>('all')
  const [selected, setSelected] = useState<Customer | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'orders' | 'spent'>('spent')

  const filtered = customers
    .filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      const matchFilter = filter === 'all' || (filter === 'blocked' ? c.isBlocked : !c.isBlocked)
      return matchSearch && matchFilter
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'orders') return b.totalOrders - a.totalOrders
      return b.totalSpent - a.totalSpent
    })

  const customerOrders = selected ? orders.filter(o => o.customerId === selected.id) : []

  const handleBlock = (id: string, isBlocked: boolean) => {
    toggleBlock(id)
    toast.success(isBlocked ? 'User unblocked!' : 'User blocked!')
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, isBlocked: !prev.isBlocked } : null)
  }

  const avatarColor = (name: string) => {
    const colors = ['bg-purple-500', 'bg-blue-500', 'bg-pink-500', 'bg-amber-500', 'bg-green-500', 'bg-red-500', 'bg-indigo-500']
    return colors[name.charCodeAt(0) % colors.length]
  }

  return (
    <div className="flex gap-6">
      {/* Left: Customer List */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-bebas text-4xl text-brand-dark tracking-wide">Customer Management</h1>
            <p className="text-gray-500 text-sm font-semibold mt-1">{customers.length} total customers</p>
          </div>
          <div className="flex gap-2 items-center">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as 'name' | 'orders' | 'spent')}
              className="border-2 border-gray-100 rounded-2xl px-4 py-2 text-sm font-bold focus:outline-none bg-white">
              <option value="spent">Sort: Spent</option>
              <option value="orders">Sort: Orders</option>
              <option value="name">Sort: Name</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search by name or email..."
            className="flex-1 border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-brand-green bg-white" />
          <div className="flex gap-2">
            {(['all', 'active', 'blocked'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border ${
                  filter === f ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-500 border-gray-200'}`}>
                {f === 'all' ? '👥 All' : f === 'active' ? '✅ Active' : '🚫 Blocked'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total', value: customers.length, icon: '👥', color: 'bg-blue-50 text-blue-700' },
            { label: 'Active', value: customers.filter(c => !c.isBlocked).length, icon: '✅', color: 'bg-green-50 text-green-700' },
            { label: 'Blocked', value: customers.filter(c => c.isBlocked).length, icon: '🚫', color: 'bg-red-50 text-red-700' },
          ].map(s => (
            <div key={s.label} className={`${s.color} rounded-2xl p-4 flex items-center gap-3`}>
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className="font-bebas text-2xl leading-none">{s.value}</div>
                <div className="text-xs font-black uppercase tracking-wider">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Cards */}
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((c, i) => (
              <motion.div key={c.id} layout
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -30 }} transition={{ delay: i * 0.04 }}
                onClick={() => setSelected(selected?.id === c.id ? null : c)}
                className={`bg-white rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all border-2 ${
                  selected?.id === c.id ? 'border-brand-green shadow-md' : 'border-transparent'
                } ${c.isBlocked ? 'opacity-70' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${avatarColor(c.name)} rounded-full flex items-center justify-center text-white text-sm font-black flex-shrink-0`}>
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-black text-sm text-brand-dark">{c.name}</p>
                      {c.isBlocked && <span className="text-[9px] font-black bg-red-100 text-red-600 px-2 py-0.5 rounded-full">BLOCKED</span>}
                    </div>
                    <p className="text-xs text-gray-400">{c.email}</p>
                    <p className="text-xs text-gray-400">{c.phone}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-brand-green">{formatPrice(c.totalSpent)}</p>
                    <p className="text-xs text-gray-400 font-semibold">{c.totalOrders} orders</p>
                    <p className="text-xs text-gray-300">Since {c.joinDate.slice(0, 7)}</p>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); handleBlock(c.id, c.isBlocked) }}
                    className={`ml-2 px-4 py-2 rounded-full text-xs font-black transition-all ${
                      c.isBlocked
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : 'bg-red-50 text-red-700 hover:bg-red-100'
                    }`}>
                    {c.isBlocked ? '✅ Unblock' : '🚫 Block'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <div className="text-6xl mb-4">👤</div>
              <p className="font-black text-lg">No customers found</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Customer Detail + Order History */}
      <AnimatePresence>
        {selected && (
          <motion.aside initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
            className="w-80 flex-shrink-0 self-start sticky top-8 space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-5">
                <h2 className="font-bebas text-2xl text-brand-dark tracking-wide">Profile</h2>
                <button onClick={() => setSelected(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">×</button>
              </div>

              <div className="text-center mb-5">
                <div className={`w-20 h-20 ${avatarColor(selected.name)} rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-3`}>
                  {selected.avatar}
                </div>
                <h3 className="font-black text-xl text-brand-dark">{selected.name}</h3>
                <p className="text-gray-400 text-sm">{selected.email}</p>
                {selected.isBlocked && <span className="inline-block mt-1 text-xs font-black bg-red-100 text-red-600 px-3 py-1 rounded-full">🚫 Blocked</span>}
              </div>

              <div className="space-y-2 mb-5">
                {[
                  { label: '📞 Phone', value: selected.phone },
                  { label: '📍 Address', value: selected.address },
                  { label: '📅 Joined', value: selected.joinDate },
                ].map(row => (
                  <div key={row.label} className="bg-cream rounded-xl p-3">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{row.label}</p>
                    <p className="text-sm font-bold text-brand-dark mt-0.5">{row.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-green-50 rounded-2xl p-3 text-center">
                  <div className="font-bebas text-2xl text-green-600">{formatPrice(selected.totalSpent)}</div>
                  <div className="text-[10px] font-black text-green-600 uppercase">Total Spent</div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-3 text-center">
                  <div className="font-bebas text-2xl text-blue-600">{selected.totalOrders}</div>
                  <div className="text-[10px] font-black text-blue-600 uppercase">Orders</div>
                </div>
              </div>

              <button onClick={() => handleBlock(selected.id, selected.isBlocked)}
                className={`w-full font-black text-sm py-3 rounded-full transition-all ${
                  selected.isBlocked
                    ? 'bg-green-50 text-green-700 hover:bg-green-100'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}>
                {selected.isBlocked ? '✅ Unblock User' : '🚫 Block User'}
              </button>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="font-black text-base text-brand-dark mb-4">Order History ({customerOrders.length})</h2>
              {customerOrders.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">No orders yet</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {customerOrders.map(o => (
                    <div key={o.id} className="flex items-center justify-between bg-cream rounded-xl p-3">
                      <div>
                        <p className="font-black text-xs text-brand-dark">{o.id}</p>
                        <p className="text-[10px] text-gray-400">{o.date} · {o.items.length} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-xs text-brand-green">{formatPrice(o.total)}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full capitalize ${
                          o.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          o.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                          o.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>{o.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}
