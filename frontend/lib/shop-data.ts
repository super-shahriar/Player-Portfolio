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

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'demo-prod-1',
    name: 'Pro Match Volleyball',
    description: 'Official size and weight, synthetic leather cover for indoor competition play.',
    category: 'Volleyballs',
    price: 49.99,
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'demo-prod-2',
    name: 'Beach Volleyball',
    description: 'Water-resistant panel construction built for outdoor sand courts.',
    category: 'Volleyballs',
    price: 34.99,
    stock: 40,
    image_url: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'demo-prod-3',
    name: 'Elite Court Shoes',
    description: 'Lightweight cushioned sole with lateral support for quick direction changes.',
    category: 'Shoes',
    price: 89.99,
    stock: 15,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'demo-prod-4',
    name: 'Ankle Support Shoes',
    description: 'High-top design with reinforced ankle collar for added stability on landings.',
    category: 'Shoes',
    price: 74.99,
    stock: 10,
    image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'demo-prod-11',
    name: 'Turf Court Shoes',
    description: 'Durable gum rubber outsole built to grip outdoor turf and asphalt courts without tearing up on rough surfaces.',
    category: 'Shoes',
    price: 79.99,
    stock: 18,
    image_url: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'demo-prod-5',
    name: 'Tournament Net System',
    description: 'Height-adjustable aluminum posts with regulation net, ideal for club and school teams.',
    category: 'Nets',
    price: 199.99,
    stock: 5,
    image_url: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'demo-prod-6',
    name: 'Portable Practice Net',
    description: 'Quick-assembly net for driveway or backyard practice sessions.',
    category: 'Nets',
    price: 59.99,
    stock: 12,
    image_url: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'demo-prod-7',
    name: 'Team Jersey',
    description: 'Moisture-wicking fabric with breathable mesh panels.',
    category: 'Apparel',
    price: 39.99,
    stock: 30,
    image_url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'demo-prod-8',
    name: 'Performance Shorts',
    description: 'Stretch-fit compression shorts for unrestricted movement.',
    category: 'Apparel',
    price: 24.99,
    stock: 20,
    image_url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'demo-prod-9',
    name: 'Knee Pads',
    description: 'Shock-absorbing foam padding for safe diving and floor defense.',
    category: 'Accessories',
    price: 19.99,
    stock: 50,
    image_url: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'demo-prod-10',
    name: 'Ankle Braces',
    description: 'Adjustable compression wrap for extra joint support during play.',
    category: 'Accessories',
    price: 14.99,
    stock: 0,
    image_url: 'https://images.unsplash.com/photo-1758684051090-bc83bb0af184?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
]

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

// Falls back to demo products when no backend is available (e.g. the static GitHub Pages deploy).
export async function fetchProducts(category?: ProductCategory): Promise<Product[]> {
  try {
    const params = new URLSearchParams({ limit: '100', is_active: 'true' })
    if (category) {
      params.set('category', category)
    }
    const response = await fetch(`${DEFAULT_API_BASE}/products/?${params}`)
    return await handleResponse<Product[]>(response)
  } catch (error) {
    console.error('Failed to load products from backend, using demo data:', error)
    return category ? FALLBACK_PRODUCTS.filter((product) => product.category === category) : FALLBACK_PRODUCTS
  }
}

export async function fetchProduct(productId: string): Promise<Product> {
  try {
    const response = await fetch(`${DEFAULT_API_BASE}/products/${productId}`)
    return await handleResponse<Product>(response)
  } catch (error) {
    const fallback = FALLBACK_PRODUCTS.find((product) => product.id === productId)
    if (!fallback) throw error
    console.error('Failed to load product from backend, using demo data:', error)
    return fallback
  }
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
