'use client'
// components/admin/SalesChart.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface Order {
  created_at: string
  total_amount: number
  payment_status: string
}

interface SalesChartProps {
  orders: Order[]
}

export default function SalesChart({ orders }: SalesChartProps) {
  // Group paid orders by month
  const monthMap: Record<string, number> = {}

  orders
    .filter(o => o.payment_status === 'paid')
    .forEach(o => {
      const date = new Date(o.created_at)
      const key = date.toLocaleString('default', { month: 'short', year: '2-digit' })
      monthMap[key] = (monthMap[key] || 0) + o.total_amount
    })

  const data = Object.entries(monthMap).map(([month, revenue]) => ({
    month,
    revenue,
  }))

  if (data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-300 font-bold">
        No sales data yet
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fontWeight: 700, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fontWeight: 700, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `৳${v}`}
        />
        <Tooltip
          formatter={(value: number) => [`৳${value.toLocaleString()}`, 'Revenue']}
          contentStyle={{
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            fontWeight: 700,
          }}
        />
        <Bar dataKey="revenue" fill="#2d7a4f" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
