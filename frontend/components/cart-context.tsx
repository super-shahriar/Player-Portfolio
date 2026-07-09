'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from 'react'
import { toast } from 'sonner'
import { getGuestId } from '@/lib/guest-id'
import {
  fetchCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  checkout,
  type Cart,
  type Order,
} from '@/lib/shop-data'
import { trackAddToCart, trackRemoveFromCart, trackPurchase } from '@/lib/analytics'

type CartContextValue = {
  cart: Cart | null
  loading: boolean
  itemCount: number
  addToCart: (productId: string, quantity?: number) => Promise<boolean>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  doCheckout: () => Promise<Order | null>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)

  // Guards against out-of-order network responses (e.g. a slow initial
  // mount fetch resolving after a faster later mutation) clobbering newer
  // cart state. Only the response from the most recently issued request wins.
  const requestIdRef = useRef(0)
  const nextRequestId = useCallback(() => ++requestIdRef.current, [])
  const applyIfLatest = useCallback((requestId: number, data: Cart) => {
    if (requestId === requestIdRef.current) {
      setCart(data)
    }
  }, [])

  const refreshCart = useCallback(async () => {
    const requestId = nextRequestId()
    try {
      const guestId = getGuestId()
      if (!guestId) return
      const data = await fetchCart(guestId)
      applyIfLatest(requestId, data)
    } catch (err) {
      console.error('Failed to load cart:', err)
    } finally {
      setLoading(false)
    }
  }, [nextRequestId, applyIfLatest])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addToCart = useCallback(async (productId: string, quantity = 1) => {
    const requestId = nextRequestId()
    try {
      const data = await addCartItem(getGuestId(), productId, quantity)
      applyIfLatest(requestId, data)
      const addedItem = data.items.find((item) => item.product_id === productId)
      if (addedItem?.product) {
        trackAddToCart(addedItem.product, quantity)
      }
      toast.success('Added to cart')
      return true
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to add to cart')
      return false
    }
  }, [nextRequestId, applyIfLatest])

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    const requestId = nextRequestId()
    try {
      const data = await updateCartItem(getGuestId(), productId, quantity)
      applyIfLatest(requestId, data)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update cart')
    }
  }, [nextRequestId, applyIfLatest])

  const removeItem = useCallback(async (productId: string) => {
    const requestId = nextRequestId()
    const removedItem = cart?.items.find((item) => item.product_id === productId)
    try {
      const data = await removeCartItem(getGuestId(), productId)
      applyIfLatest(requestId, data)
      if (removedItem?.product) {
        trackRemoveFromCart(removedItem.product, removedItem.quantity)
      }
      toast.success('Removed from cart')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to remove item')
    }
  }, [cart, nextRequestId, applyIfLatest])

  const doCheckout = useCallback(async () => {
    try {
      const order = await checkout(getGuestId())
      trackPurchase(order)
      toast.success('Order confirmed!')
      await refreshCart()
      return order
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Checkout failed')
      await refreshCart()
      return null
    }
  }, [refreshCart])

  const itemCount = cart?.total_items ?? 0

  return (
    <CartContext.Provider
      value={{ cart, loading, itemCount, addToCart, updateQuantity, removeItem, doCheckout, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
