// app/api/payment/init/route.ts
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { items, totalAmount, shippingAddress } = await req.json()

    const { createOrder } = await import('@/lib/supabase')
    const { initiatePayment } = await import('@/lib/sslcommerz')

    const orderId = `SM-${randomBytes(4).toString('hex').toUpperCase()}`

    const order = await createOrder({
      id: orderId,
      items: items.map((i: any) => ({
        product_id: i.product.id,
        product_name: i.product.name,
        product_image: i.product.image_url,
        quantity: i.quantity,
        price: i.product.price,
      })),
      total_amount: totalAmount + (totalAmount >= 500 ? 0 : 60),
      status: 'pending',
      payment_status: 'unpaid',
      shipping_address: shippingAddress,
    })

    const { url } = await initiatePayment({
      orderId,
      totalAmount: order.total_amount,
      customerName: shippingAddress.full_name,
      customerEmail: 'customer@sunmall.com',
      customerPhone: shippingAddress.phone,
      customerAddress: `${shippingAddress.address}, ${shippingAddress.city}`,
      productName: items.map((i: any) => i.product.name).join(', '),
    })

    return NextResponse.json({ url })
  } catch (error: any) {
    console.error('Payment init error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
