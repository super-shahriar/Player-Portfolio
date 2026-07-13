// app/product/[id]/page.tsx
import ProductDetailPage from './product-detail'

export async function generateStaticParams() {
  return [
    'demo-prod-1', 'demo-prod-2', 'demo-prod-3', 'demo-prod-4', 'demo-prod-5',
    'demo-prod-6', 'demo-prod-7', 'demo-prod-8', 'demo-prod-9', 'demo-prod-10',
    'demo-prod-11',
  ].map((id) => ({ id }))
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <ProductDetailPage params={params} />
}
