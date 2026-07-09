const DEFAULT_API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export const PRODUCT_CATEGORIES = ['Volleyballs', 'Shoes', 'Nets', 'Apparel', 'Accessories'] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export type Product = {
  id: string
  name: string
  description?: string
  category: ProductCategory
  price: number
  stock: number
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type CartItem = {
  product_id: string
  quantity: number
  product: Product | null
  line_total: number
}

export type Cart = {
  id: string
  guest_id: string
  items: CartItem[]
  total_items: number
  total_amount: number
}

export type OrderItem = {
  product_id: string
  name: string
  price: number
  quantity: number
  line_total: number
}

export type Order = {
  id: string
  guest_id: string
  items: OrderItem[]
  total_items: number
  total_amount: number
  status: string
  created_at: string
}

// Parse the FastAPI error `detail` so callers can toast a useful message.
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let detail = `Backend returned ${response.status}`
    try {
      const body = await response.json()
      if (typeof body?.detail === 'string') {
        detail = body.detail
      }
    } catch {
      // keep the generic message
    }
    throw new Error(detail)
  }
  return response.json()
}

export async function fetchProducts(category?: ProductCategory): Promise<Product[]> {
  const params = new URLSearchParams({ limit: '100', is_active: 'true' })
  if (category) {
    params.set('category', category)
  }
  const response = await fetch(`${DEFAULT_API_BASE}/products/?${params}`)
  return handleResponse<Product[]>(response)
}

export async function fetchProduct(productId: string): Promise<Product> {
  const response = await fetch(`${DEFAULT_API_BASE}/products/${productId}`)
  return handleResponse<Product>(response)
}

export async function fetchCart(guestId: string): Promise<Cart> {
  const response = await fetch(`${DEFAULT_API_BASE}/carts/${guestId}`)
  return handleResponse<Cart>(response)
}

export async function addCartItem(guestId: string, productId: string, quantity = 1): Promise<Cart> {
  const response = await fetch(`${DEFAULT_API_BASE}/carts/${guestId}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: productId, quantity }),
  })
  return handleResponse<Cart>(response)
}

export async function updateCartItem(guestId: string, productId: string, quantity: number): Promise<Cart> {
  const response = await fetch(`${DEFAULT_API_BASE}/carts/${guestId}/items/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  })
  return handleResponse<Cart>(response)
}

export async function removeCartItem(guestId: string, productId: string): Promise<Cart> {
  const response = await fetch(`${DEFAULT_API_BASE}/carts/${guestId}/items/${productId}`, {
    method: 'DELETE',
  })
  return handleResponse<Cart>(response)
}

export async function checkout(guestId: string): Promise<Order> {
  const response = await fetch(`${DEFAULT_API_BASE}/orders/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guest_id: guestId }),
  })
  return handleResponse<Order>(response)
}

export async function fetchOrders(guestId: string): Promise<Order[]> {
  const params = new URLSearchParams({ guest_id: guestId, limit: '100' })
  const response = await fetch(`${DEFAULT_API_BASE}/orders/?${params}`)
  return handleResponse<Order[]>(response)
}
