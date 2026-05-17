// app/(admin)/admin/products/page.tsx
import { getProducts } from '@/lib/supabase'
import AdminSidebar from '@/components/admin/AdminSidebar'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-black">Products</h1>
            <p className="text-gray-500 mt-1">{products?.length || 0} total products</p>
          </div>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 bg-dark-green text-white rounded-full px-6 py-3 font-black text-sm hover:bg-brand-green transition-colors"
          >
            <Plus size={18} />
            Add Product
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left p-4 text-xs font-black uppercase tracking-widest text-gray-400">Product</th>
                <th className="text-left p-4 text-xs font-black uppercase tracking-widest text-gray-400">Category</th>
                <th className="text-left p-4 text-xs font-black uppercase tracking-widest text-gray-400">Price</th>
                <th className="text-left p-4 text-xs font-black uppercase tracking-widest text-gray-400">Stock</th>
                <th className="text-left p-4 text-xs font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="text-left p-4 text-xs font-black uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map(product => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 flex-shrink-0">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-black text-sm">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.flavor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-500">{product.category}</td>
                  <td className="p-4 font-black text-sm">৳{product.price}</td>
                  <td className="p-4">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                      product.stock > 10
                        ? 'bg-green-100 text-green-700'
                        : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                      product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {product.is_active ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
