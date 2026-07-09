type Product = { id: string; name: string; category: string; price: number }

type CartLike = {
  total_amount: number
  items: Array<{ product: Product | null; quantity: number }>
}

type OrderLike = {
  id: string
  total_amount: number
  items: Array<{ product_id: string; name: string; price: number; quantity: number }>
}

type PlayerLike = {
  id: string
  name?: string
  first_name?: string
  last_name?: string
  position?: string
  university_team?: string
  current_team?: string
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

function pushEvent(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

function toItem(product: Product, quantity?: number) {
  return {
    item_id: product.id,
    item_name: product.name,
    item_category: product.category,
    price: product.price,
    ...(quantity !== undefined ? { quantity } : {}),
  }
}

export function trackViewItem(product: Product): void {
  pushEvent({
    event: 'view_item',
    ecommerce: { currency: 'USD', value: product.price, items: [toItem(product)] },
  })
}

export function trackAddToCart(product: Product, quantity: number): void {
  pushEvent({
    event: 'add_to_cart',
    ecommerce: { currency: 'USD', value: product.price * quantity, items: [toItem(product, quantity)] },
  })
}

export function trackRemoveFromCart(product: Product, quantity: number): void {
  pushEvent({
    event: 'remove_from_cart',
    ecommerce: { currency: 'USD', value: product.price * quantity, items: [toItem(product, quantity)] },
  })
}

export function trackViewCart(cart: CartLike): void {
  pushEvent({
    event: 'view_cart',
    ecommerce: {
      currency: 'USD',
      value: cart.total_amount,
      items: cart.items.filter((i) => i.product).map((i) => toItem(i.product as Product, i.quantity)),
    },
  })
}

export function trackBeginCheckout(cart: CartLike): void {
  pushEvent({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'USD',
      value: cart.total_amount,
      items: cart.items.filter((i) => i.product).map((i) => toItem(i.product as Product, i.quantity)),
    },
  })
}

export function trackPurchase(order: OrderLike): void {
  pushEvent({
    event: 'purchase',
    ecommerce: {
      transaction_id: order.id,
      currency: 'USD',
      value: order.total_amount,
      items: order.items.map((i) => ({
        item_id: i.product_id,
        item_name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
    },
  })
}

export function trackViewPlayerProfile(player: PlayerLike): void {
  pushEvent({
    event: 'view_player_profile',
    player_id: player.id,
    player_name: player.name ?? `${player.first_name ?? ''} ${player.last_name ?? ''}`.trim(),
    position: player.position,
    team: player.current_team ?? player.university_team,
  })
}

export function trackPageview(pathname: string): void {
  pushEvent({ event: 'page_view', page_path: pathname })
}
