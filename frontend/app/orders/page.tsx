'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { getGuestId } from '@/lib/guest-id'
import { fetchOrders, type Order } from '@/lib/shop-data'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true)
        const data = await fetchOrders(getGuestId())
        setOrders(data)
        setError(null)
      } catch (err) {
        setError('Failed to load orders')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-4">
          <Skeleton className="h-10 w-48" />
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Error: {error}</h1>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <Receipt className="mx-auto text-muted-foreground" size={48} />
          <h1 className="text-2xl font-bold">No orders yet</h1>
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
        <h1 className="text-4xl font-bold mb-8">Your Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl bg-secondary/40 border border-border/50 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold">Order #{order.id.slice(-8)}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {order.status}
                </Badge>
              </div>

              <div className="space-y-1 mb-3">
                {order.items.map((item) => (
                  <div key={item.product_id} className="flex justify-between text-sm text-muted-foreground">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${item.line_total.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-3 border-t border-border/30 font-semibold">
                <span>Total</span>
                <span className="text-primary">${order.total_amount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
