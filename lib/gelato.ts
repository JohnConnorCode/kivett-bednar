export type GelatoOrderItem = {
  productUid: string
  quantity: number
  attributes?: Record<string, string>
  files?: Array<{type: string; url: string}>
}

export async function createGelatoOrder(params: {
  recipient: {
    addressLine1: string
    city: string
    country: string
    postalCode: string
    state?: string
    name?: string
    email?: string
  }
  items: GelatoOrderItem[]
  marketplaceOrderId?: string
}) {
  const apiKey = process.env.GELATO_API_KEY
  if (!apiKey) throw new Error('Missing GELATO_API_KEY')
  const res = await fetch('https://order.gelatoapis.com/v4/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': apiKey,
    },
    body: JSON.stringify({
      ...params,
      shipments: [
        {
          shipmentMethodUid: 'STANDARD',
        },
      ],
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Gelato error: ${res.status} ${text}`)
  }
  return res.json()
}

