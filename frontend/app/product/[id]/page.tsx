// app/product/[id]/page.tsx
import ProductDetailPage from './product-detail'

// No real product IDs are known at build time without a live backend; a single
// placeholder keeps `output: export` happy. It renders the same "not found" state
// as any other id would without a backend.
export async function generateStaticParams() {
  return [{ id: 'placeholder' }]
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <ProductDetailPage params={params} />
}
