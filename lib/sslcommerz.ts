// lib/sslcommerz.ts
const SSLCommerzPayment = require('sslcommerz-lts')

const store_id = process.env.SSLCOMMERZ_STORE_ID!
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD!
const is_live = process.env.SSLCOMMERZ_IS_LIVE === 'true'

export async function initiatePayment({
  orderId,
  totalAmount,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  productName,
}: {
  orderId: string
  totalAmount: number
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  productName: string
}) {
  const data = {
    total_amount: totalAmount,
    currency: 'BDT',
    tran_id: orderId,
    success_url: `${process.env.NEXTAUTH_URL}/api/payment/success`,
    fail_url: `${process.env.NEXTAUTH_URL}/api/payment/fail`,
    cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    ipn_url: `${process.env.NEXTAUTH_URL}/api/payment/ipn`,
    shipping_method: 'Courier',
    product_name: productName,
    product_category: 'Snacks',
    product_profile: 'general',
    cus_name: customerName,
    cus_email: customerEmail,
    cus_add1: customerAddress,
    cus_city: 'Dhaka',
    cus_country: 'Bangladesh',
    cus_phone: customerPhone,
    ship_name: customerName,
    ship_add1: customerAddress,
    ship_city: 'Dhaka',
    ship_country: 'Bangladesh',
  }

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  const apiResponse = await sslcz.init(data)

  if (apiResponse?.GatewayPageURL) {
    return { url: apiResponse.GatewayPageURL }
  }
  throw new Error('SSLCommerz init failed')
}

export async function validatePayment(val_id: string) {
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  const data = await sslcz.validate({ val_id })
  return data
}
