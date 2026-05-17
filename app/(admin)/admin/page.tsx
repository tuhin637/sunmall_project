// app/(admin)/admin/page.tsx
import { getAllOrders, getProducts } from '@/lib/supabase'
import AdminSidebar from '@/components/admin/AdminSidebar'
import StatsCard from '@/components/admin/StatsCard'
import SalesChart from '@/components/admin/SalesChart'
import OrderTable from '@/components/admin/OrderTable'
import { Package, ShoppingBag, DollarSign, Users } from 'lucide-react'

export default async function AdminDashboard() {
  const [orders, products] = await Promise.all([
    getAllOrders(),
    getProducts(),
  ])

  const totalRevenue = orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0
  const paidOrders = orders?.filter(o => o.payment_status === 'paid') || []
  const recentOrders = orders?.slice(0, 5) || []

  const stats = [
    {
      title: 'Total Revenue',
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-brand-green',
      change: '+12% this month',
    },
    {
      title: 'Total Orders',
      value: orders?.length || 0,
      icon: ShoppingBag,
      color: 'bg-brand-gold',
      change: `${paidOrders.length} paid`,
    },
    {
      title: 'Products',
      value: products?.length || 0,
      icon: Package,
      color: 'bg-brand-red',
      change: 'Active listings',
    },
    {
      title: 'Customers',
      value: '—',
      icon: Users,
      color: 'bg-dark-green',
      change: 'All time',
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin 👋</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map(s => (
            <StatsCard key={s.title} {...s} />
          ))}
        </div>

        {/* Charts + Recent Orders */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-black text-lg mb-6">Sales Overview</h2>
            <SalesChart orders={orders || []} />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-black text-lg mb-6">Order Status</h2>
            <div className="space-y-4">
              {['pending', 'paid', 'processing', 'shipped', 'delivered'].map(status => {
                const count = orders?.filter(o => o.status === status).length || 0
                const colors: Record<string, string> = {
                  pending: 'bg-yellow-100 text-yellow-700',
                  paid: 'bg-blue-100 text-blue-700',
                  processing: 'bg-purple-100 text-purple-700',
                  shipped: 'bg-orange-100 text-orange-700',
                  delivered: 'bg-green-100 text-green-700',
                }
                return (
                  <div key={status} className="flex items-center justify-between">
                    <span className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full ${colors[status]}`}>
                      {status}
                    </span>
                    <span className="font-black text-lg">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="font-black text-lg">Recent Orders</h2>
            <a href="/admin/orders" className="text-sm text-brand-green font-black hover:underline">
              View all →
            </a>
          </div>
          <OrderTable orders={recentOrders} />
        </div>
      </main>
    </div>
  )
}
