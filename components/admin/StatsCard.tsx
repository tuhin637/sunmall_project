// components/admin/StatsCard.tsx
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: string
  change: string
}

export default function StatsCard({ title, value, icon: Icon, color, change }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{title}</p>
        <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center`}>
          <Icon size={18} className="text-white" />
        </div>
      </div>
      <p className="font-black text-3xl text-gray-900 mb-1">{value}</p>
      <p className="text-xs font-bold text-gray-400">{change}</p>
    </div>
  )
}
