// components/admin/OrderTable.tsx

interface Order {
  id: string
  shipping_address: {
    full_name?: string
    phone?: string
  }
  total_amount: number
  status: string
  payment_status: string
  created_at: string
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

const paymentColors: Record<string, string> = {
  unpaid: 'bg-gray-100 text-gray-500',
  paid: 'bg-green-100 text-green-700',
  refunded: 'bg-red-100 text-red-600',
}

export default function OrderTable({ orders }: { orders: Order[] }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="p-12 text-center text-gray-400 font-bold">
        No orders yet 📦
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {['Order ID', 'Customer', 'Amount', 'Status', 'Payment', 'Date'].map(h => (
              <th key={h} className="text-left p-4 text-xs font-black uppercase tracking-widest text-gray-400">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="p-4 font-black text-sm text-brand-green">{order.id}</td>
              <td className="p-4">
                <p className="font-bold text-sm">{order.shipping_address?.full_name || '—'}</p>
                <p className="text-xs text-gray-400">{order.shipping_address?.phone || ''}</p>
              </td>
              <td className="p-4 font-black text-sm">৳{order.total_amount?.toLocaleString()}</td>
              <td className="p-4">
                <span className={`text-xs font-black px-2.5 py-1 rounded-full capitalize ${statusColors[order.status] || 'bg-gray-100 text-gray-500'}`}>
                  {order.status}
                </span>
              </td>
              <td className="p-4">
                <span className={`text-xs font-black px-2.5 py-1 rounded-full capitalize ${paymentColors[order.payment_status] || 'bg-gray-100 text-gray-500'}`}>
                  {order.payment_status}
                </span>
              </td>
              <td className="p-4 text-sm font-bold text-gray-400">
                {new Date(order.created_at).toLocaleDateString('en-BD', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
