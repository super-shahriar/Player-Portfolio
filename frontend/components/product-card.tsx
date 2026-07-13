'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import type { Product } from '@/lib/shop-data'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  // Dummy volleyball gear photo URL
  const dummyPhotoUrl = "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=400&q=80"

  const outOfStock = product.stock === 0

  const handleAddToCart = (e: React.MouseEvent) => {
    // The whole card is a Link — keep the button click from navigating
    e.preventDefault()
    e.stopPropagation()
    addToCart(product.id, 1)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group relative overflow-hidden rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20 hover:scale-105">
        {/* Image Container */}
        <div className="relative h-48 bg-gradient-to-b from-secondary to-secondary/50 overflow-hidden">
          <img
            src={product.image_url || dummyPhotoUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          {outOfStock && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-destructive/90 text-destructive-foreground text-xs font-semibold uppercase tracking-wider">
              Out of Stock
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Name & Category */}
          <div>
            <h2 className="text-2xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
              {product.name}
            </h2>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
              {product.category}
            </p>
            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Only {product.stock} left
              </p>
            )}
          </div>

          {/* Price */}
          <div className="pt-3 border-t border-border/30">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Price
            </p>
            <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>

          {/* Add to Cart */}
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={outOfStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {outOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>

        {/* Accent Bar on Hover */}
        <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-xl transition-all pointer-events-none" />
      </div>
    </Link>
  )
}
