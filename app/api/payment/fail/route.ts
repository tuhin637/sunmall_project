// app/api/payment/fail/route.ts
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const tran_id = formData.get('tran_id') as string

    // Lazy import to avoid build-time crash
    if (tran_id) {
      const { supabaseAdmin } = await import('@/lib/supabase')
      if (supabaseAdmin) {
        await supabaseAdmin
          .from('orders')
          .update({ status: 'cancelled' })
          .eq('id', tran_id)
      }
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    return NextResponse.redirect(`${baseUrl}/checkout?payment=failed`, { status: 303 })
  } catch (error) {
    console.error('Payment fail error:', error)
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    return NextResponse.redirect(`${baseUrl}/checkout?payment=error`, { status: 303 })
  }
}
