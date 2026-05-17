// app/api/payment/success/route.ts
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const val_id = formData.get('val_id') as string
    const tran_id = formData.get('tran_id') as string
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    const { validatePayment } = await import('@/lib/sslcommerz')
    const validation = await validatePayment(val_id)

    if (validation?.status === 'VALID' || validation?.status === 'VALIDATED') {
      const { supabaseAdmin } = await import('@/lib/supabase')
      if (supabaseAdmin) {
        await supabaseAdmin
          .from('orders')
          .update({
            status: 'paid',
            payment_status: 'paid',
            payment_method: (formData.get('card_type') as string) || 'online',
            transaction_id: val_id,
          })
          .eq('id', tran_id)
      }
      return NextResponse.redirect(`${baseUrl}/orders?payment=success`, { status: 303 })
    }

    return NextResponse.redirect(`${baseUrl}/checkout?payment=failed`, { status: 303 })
  } catch (error) {
    console.error('Payment success error:', error)
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    return NextResponse.redirect(`${baseUrl}/checkout?payment=error`, { status: 303 })
  }
}
