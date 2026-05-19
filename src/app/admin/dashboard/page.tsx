'use client'
import { useOrderStore } from '@/store/orderStore'
import { useProductStore } from '@/store/productStore'
import { useCustomerStore } from '@/store/customerStore'
import { formatPrice } from '@/lib/utils'
import { motion } from 'framer-motion'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function DashboardPage() {
  const { orders, getTotalRevenue } = useOrderStore()
  const { products } = useProductStore()
  const { customers } = useCustomerStore()

  const totalRevenue = getTotalRevenue()
  const totalOrders = orders.length
  const activeProducts = products.filter(p => p.inStock).length
  const totalCustomers = customers.length
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  const stats = [
    { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: '💰', color: 'from-green-400 to-green-600', sub: `${totalOrders} orders` },
    { label: 'Total Orders', value: totalOrders.toString(), icon: '📦', color: 'from-blue-400 to-blue-600', sub: `${pendingOrders} pending` },
    { label: 'Active Products', value: activeProducts.toString(), icon: '🛍️', color: 'from-purple-400 to-purple-600', sub: `${products.length} total` },
    { label: 'Customers', value: totalCustomers.toString(), icon: '👥', color: 'from-orange-400 to-orange-600', sub: 'Registered users' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-bebas text-4xl text-brand-dark tracking-wide">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm font-semibold mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} rounded-3xl p-6 text-white`}
          >
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className="font-bebas text-4xl tracking-wide leading-none mb-1">{stat.value}</div>
            <div className="font-black text-sm opacity-90">{stat.label}</div>
            <div className="text-xs opacity-70 mt-1 font-semibold">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="font-black text-lg text-brand-dark mb-5">Recent Orders</h2>
          <div className="space-y-3">
            {recentOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white text-xs font-black">
                    {order.customerName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-black text-sm text-brand-dark">{order.customerName}</p>
                    <p className="text-xs text-gray-500 font-semibold">{order.id} · {order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm">{formatPrice(order.total)}</p>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          {/* Order Status Breakdown */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="font-black text-lg text-brand-dark mb-4">Order Status</h2>
            {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map(status => {
              const count = orders.filter(o => o.status === status).length
              const pct = totalOrders ? Math.round((count / totalOrders) * 100) : 0
              return (
                <div key={status} className="mb-3">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="capitalize text-gray-600">{status}</span>
                    <span>{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className={`h-full rounded-full ${
                        status === 'delivered' ? 'bg-green-500' :
                        status === 'shipped' ? 'bg-purple-500' :
                        status === 'processing' ? 'bg-blue-500' :
                        status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="font-black text-lg text-brand-dark mb-4">Top Products</h2>
            {products.slice(0, 3).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 mb-3">
                <span className="font-black text-gray-300 text-sm w-4">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-brand-dark truncate">{p.name}</p>
                  <p className="text-xs text-gray-400 font-semibold">{formatPrice(p.price)}</p>
                </div>
                <span className={`w-2 h-2 rounded-full ${p.inStock ? 'bg-green-400' : 'bg-red-400'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
