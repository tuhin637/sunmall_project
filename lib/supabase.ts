// lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Lazy clients — only created when env vars are present
function getSupabase(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase env vars not configured')
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase admin env vars not configured')
  }
  return createClient(supabaseUrl, supabaseServiceKey)
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any

export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null as any

// ─── Products ─────────────────────────────────────────────
export async function getProducts(options?: {
  featured?: boolean
  category?: string
  limit?: number
}) {
  if (!supabase) return []

  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (options?.featured) query = query.eq('is_featured', true)
  if (options?.category) query = query.eq('category', options.category)
  if (options?.limit) query = query.limit(options.limit)

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function getProductBySlug(slug: string) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

// ─── Orders ───────────────────────────────────────────────
export async function createOrder(orderData: any) {
  if (!supabase) throw new Error('DB not configured')
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getOrdersByUser(userId: string) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

// ─── Admin ────────────────────────────────────────────────
export async function getAllOrders() {
  if (!supabaseAdmin) return []
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function updateOrderStatus(id: string, status: string) {
  if (!supabaseAdmin) throw new Error('DB not configured')
  const { error } = await supabaseAdmin
    .from('orders')
    .update({ status })
    .eq('id', id)
  if (error) throw error
}
