'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useCart } from '@/components/cart-context'
import type { Order } from '@/lib/shop-data'
import { trackViewCart, trackBeginCheckout } from '@/lib/analytics'

export default function CartPage() {
  const { cart, loading, updateQuantity, removeItem, doCheckout } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (cart && cart.items.length > 0) {
      trackViewCart(cart)
    }
  }, [cart])

  const handleCheckout = async () => {
    if (cart) {
      trackBeginCheckout(cart)
    }
    setCheckingOut(true)
    const order = await doCheckout()
    setCheckingOut(false)
    if (order) {
      setConfirmedOrder(order)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-4">
          <Skeleton className="h-10 w-48" />
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    )
  }

  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center space-y-6">
          <CheckCircle2 className="mx-auto text-primary" size={64} />
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Order #{confirmedOrder.id.slice(-8)} — {confirmedOrder.total_items} item(s), $
            {confirmedOrder.total_amount.toFixed(2)}
          </p>

          <div className="rounded-xl bg-secondary/40 border border-border/50 p-5 text-left space-y-2">
            {confirmedOrder.items.map((item) => (
              <div key={item.product_id} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">${item.line_total.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/orders">View Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const items = cart?.items ?? []

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingBag className="mx-auto text-muted-foreground" size={48} />
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <Button asChild>
            <Link href="/shop">Browse the shop</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={item.product_id}
              className="flex items-center gap-4 rounded-xl bg-secondary/40 border border-border/50 p-4"
            >
              <img
                src={item.product?.image_url || 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=100&q=80'}
                alt={item.product?.name ?? 'Product'}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                {item.product ? (
                  <>
                    <p className="font-semibold truncate">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)} each</p>
                  </>
                ) : (
                  <p className="text-sm text-destructive">This product is no longer available</p>
                )}
              </div>

              {item.product && (
                <div className="flex items-center gap-2 border border-border/50 rounded-lg px-2 py-1">
                  <button
                    onClick={() =>
                      item.quantity <= 1
                        ? removeItem(item.product_id)
                        : updateQuantity(item.product_id, item.quantity - 1)
                    }
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}

              <p className="font-semibold w-20 text-right">${item.line_total.toFixed(2)}</p>

              <button
                onClick={() => removeItem(item.product_id)}
                className="text-muted-foreground hover:text-destructive"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-secondary/40 border border-border/50 p-5 space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Items</span>
            <span>{cart?.total_items ?? 0}</span>
          </div>
          <div className="flex justify-between text-xl font-bold pt-2 border-t border-border/30">
            <span>Total</span>
            <span className="text-primary">${(cart?.total_amount ?? 0).toFixed(2)}</span>
          </div>
          <Button className="w-full" size="lg" onClick={handleCheckout} disabled={checkingOut}>
            {checkingOut ? 'Processing...' : 'Checkout'}
          </Button>
        </div>
      </div>
    </div>
  )
}
