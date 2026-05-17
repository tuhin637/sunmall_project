// app/api/payment/fail/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const tran_id = formData.get('tran_id') as string

    if (tran_id) {
      await supabaseAdmin
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', tran_id)
    }

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/checkout?payment=failed`,
      { status: 303 }
    )
  } catch (error) {
    console.error('Payment fail error:', error)
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/checkout?payment=error`,
      { status: 303 }
    )
  }
}
