'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useCart } from '@/components/cart-context'
import { fetchProduct, type Product } from '@/lib/shop-data'
import { trackViewItem } from '@/lib/analytics'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        const data = await fetchProduct(id)
        setProduct(data)
        setError(null)
      } catch (err) {
        setError('Failed to load product')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  useEffect(() => {
    if (product) {
      trackViewItem(product)
    }
  }, [product])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-10">
          <Skeleton className="h-96" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-500">Error: {error ?? 'Product not found'}</h1>
          <Link href="/shop" className="text-primary hover:underline">
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  const outOfStock = product.stock === 0
  const dummyPhotoUrl = "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=80"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} />
          Back to shop
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="relative h-80 md:h-96 rounded-xl overflow-hidden bg-secondary/40 border border-border/50">
            <img
              src={product.image_url || dummyPhotoUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>
            </div>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            )}

            <div className="pt-4 border-t border-border/30">
              <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {outOfStock ? 'Out of stock' : `${product.stock} in stock`}
              </p>
            </div>

            {!outOfStock && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 border border-border/50 rounded-lg px-3 py-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <Button onClick={() => addToCart(product.id, quantity)} className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
