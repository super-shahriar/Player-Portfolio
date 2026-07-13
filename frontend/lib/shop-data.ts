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

// --- Client-only mock cart/checkout, used when no backend is reachable ---
// (e.g. the static GitHub Pages deploy). Cart storage only keeps product_id +
// quantity; product details/price/line_total are re-resolved from
// FALLBACK_PRODUCTS on every read so the demo catalog stays the source of truth.

type MockCartData = { guest_id: string; items: { product_id: string; quantity: number }[] }

function mockCartKey(guestId: string) {
  return `mock_cart_${guestId}`
}

function mockOrdersKey(guestId: string) {
  return `mock_orders_${guestId}`
}

function loadRawMockCart(guestId: string): MockCartData {
  if (typeof window === 'undefined') return { guest_id: guestId, items: [] }
  try {
    const raw = window.localStorage.getItem(mockCartKey(guestId))
    const parsed = raw ? JSON.parse(raw) : null
    if (parsed && Array.isArray(parsed.items)) return parsed
  } catch {
    // fall through to an empty cart
  }
  return { guest_id: guestId, items: [] }
}

function saveRawMockCart(data: MockCartData) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(mockCartKey(data.guest_id), JSON.stringify(data))
}

function loadMockOrders(guestId: string): Order[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(mockOrdersKey(guestId))
    const parsed = raw ? JSON.parse(raw) : null
    if (Array.isArray(parsed)) return parsed
  } catch {
    // fall through to no orders
  }
  return []
}

function saveMockOrders(guestId: string, orders: Order[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(mockOrdersKey(guestId), JSON.stringify(orders))
}

function hydrateMockCart(data: MockCartData): Cart {
  const items: CartItem[] = data.items.map(({ product_id, quantity }) => {
    const product = FALLBACK_PRODUCTS.find((p) => p.id === product_id) ?? null
    return { product_id, quantity, product, line_total: (product?.price ?? 0) * quantity }
  })
  return {
    id: `mock-cart-${data.guest_id}`,
    guest_id: data.guest_id,
    items,
    total_items: items.reduce((sum, item) => sum + item.quantity, 0),
    total_amount: items.reduce((sum, item) => sum + item.line_total, 0),
  }
}

function mockOrderId() {
  return `mock-order-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export async function fetchCart(guestId: string): Promise<Cart> {
  try {
    const response = await fetch(`${DEFAULT_API_BASE}/carts/${guestId}`)
    return await handleResponse<Cart>(response)
  } catch (error) {
    return hydrateMockCart(loadRawMockCart(guestId))
  }
}

export async function addCartItem(guestId: string, productId: string, quantity = 1): Promise<Cart> {
  try {
    const response = await fetch(`${DEFAULT_API_BASE}/carts/${guestId}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity }),
    })
    return await handleResponse<Cart>(response)
  } catch (error) {
    const product = FALLBACK_PRODUCTS.find((p) => p.id === productId)
    if (!product) throw error
    if (product.stock <= 0) throw new Error('Out of stock')

    const raw = loadRawMockCart(guestId)
    const existing = raw.items.find((item) => item.product_id === productId)
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, product.stock)
    } else {
      raw.items.push({ product_id: productId, quantity: Math.min(quantity, product.stock) })
    }
    saveRawMockCart(raw)
    return hydrateMockCart(raw)
  }
}

export async function updateCartItem(guestId: string, productId: string, quantity: number): Promise<Cart> {
  try {
    const response = await fetch(`${DEFAULT_API_BASE}/carts/${guestId}/items/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    })
    return await handleResponse<Cart>(response)
  } catch (error) {
    const raw = loadRawMockCart(guestId)
    if (quantity <= 0) {
      raw.items = raw.items.filter((item) => item.product_id !== productId)
    } else {
      const item = raw.items.find((item) => item.product_id === productId)
      if (item) item.quantity = quantity
    }
    saveRawMockCart(raw)
    return hydrateMockCart(raw)
  }
}

export async function removeCartItem(guestId: string, productId: string): Promise<Cart> {
  try {
    const response = await fetch(`${DEFAULT_API_BASE}/carts/${guestId}/items/${productId}`, {
      method: 'DELETE',
    })
    return await handleResponse<Cart>(response)
  } catch (error) {
    const raw = loadRawMockCart(guestId)
    raw.items = raw.items.filter((item) => item.product_id !== productId)
    saveRawMockCart(raw)
    return hydrateMockCart(raw)
  }
}

export async function checkout(guestId: string): Promise<Order> {
  try {
    const response = await fetch(`${DEFAULT_API_BASE}/orders/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guest_id: guestId }),
    })
    return await handleResponse<Order>(response)
  } catch (error) {
    const cart = hydrateMockCart(loadRawMockCart(guestId))
    if (cart.items.length === 0) throw new Error('Your cart is empty')

    const order: Order = {
      id: mockOrderId(),
      guest_id: guestId,
      items: cart.items.map((item) => ({
        product_id: item.product_id,
        name: item.product?.name ?? 'Unknown product',
        price: item.product?.price ?? 0,
        quantity: item.quantity,
        line_total: item.line_total,
      })),
      total_items: cart.total_items,
      total_amount: cart.total_amount,
      status: 'confirmed',
      created_at: new Date().toISOString(),
    }

    const orders = loadMockOrders(guestId)
    orders.unshift(order)
    saveMockOrders(guestId, orders)
    saveRawMockCart({ guest_id: guestId, items: [] })
    return order
  }
}

export async function fetchOrders(guestId: string): Promise<Order[]> {
  try {
    const params = new URLSearchParams({ guest_id: guestId, limit: '100' })
    const response = await fetch(`${DEFAULT_API_BASE}/orders/?${params}`)
    return await handleResponse<Order[]>(response)
  } catch (error) {
    return loadMockOrders(guestId)
  }
}
