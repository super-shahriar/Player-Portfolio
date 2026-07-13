'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { fetchProducts, PRODUCT_CATEGORIES, type Product, type ProductCategory } from '@/lib/shop-data'
import ProductCard from '@/components/product-card'
import { Skeleton } from '@/components/ui/skeleton'

function ShopContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const categoryParam = searchParams.get('category')
  const selectedCategory = PRODUCT_CATEGORIES.includes(categoryParam as ProductCategory)
    ? (categoryParam as ProductCategory)
    : null

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const data = await fetchProducts(selectedCategory ?? undefined)
        setProducts(data)
        setError(null)
      } catch (err) {
        setError('Failed to load products')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [selectedCategory])

  const selectCategory = (category: ProductCategory | null) => {
    router.replace(category ? `/shop?category=${category}` : '/shop')
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-500">Error: {error}</h1>
          <p className="text-muted-foreground">Make sure backend is running on http://localhost:8000</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            {selectedCategory ?? 'Volleyball Shop'}
            {!loading && ` (${products.length})`}
          </h1>
          <p className="text-lg text-muted-foreground">
            Gear up with volleyballs, shoes, nets, apparel, and accessories
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => selectCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !selectedCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground'
            }`}
          >
            All
          </button>
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => selectCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No products found{selectedCategory ? ` in ${selectedCategory}` : ''}. Run the seed script or check the backend connection.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  )
}
