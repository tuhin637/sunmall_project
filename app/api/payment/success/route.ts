// app/api/payment/success/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { validatePayment } from '@/lib/sslcommerz'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const val_id = formData.get('val_id') as string
    const tran_id = formData.get('tran_id') as string

    // Validate payment with SSLCommerz
    const validation = await validatePayment(val_id)

    if (validation?.status === 'VALID' || validation?.status === 'VALIDATED') {
      // Update order status in DB
      await supabaseAdmin
        .from('orders')
        .update({
          status: 'paid',
          payment_status: 'paid',
          payment_method: formData.get('card_type') as string || 'online',
          transaction_id: val_id,
        })
        .eq('id', tran_id)

      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/orders?payment=success`,
        { status: 303 }
      )
    }

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/checkout?payment=failed`,
      { status: 303 }
    )
  } catch (error) {
    console.error('Payment success error:', error)
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/checkout?payment=error`,
      { status: 303 }
    )
  }
}
