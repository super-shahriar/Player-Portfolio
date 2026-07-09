'use client'

import {
  Users,
  Globe,
  School,
  Building2,
  Trophy,
  Zap,
  BookOpen,
  Mail,
  Info,
  ShoppingBag,
  CircleDot,
  Footprints,
  Grid3x3,
  Shirt,
  Package,
  ShoppingCart,
  Receipt,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/components/cart-context'

export default function SidebarNavbar() {
  const pathname = usePathname()
  const { itemCount } = useCart()

  const primaryNavItems = [
    { id: 'all-players', icon: Users, label: 'All Players', href: '/players' },
    { id: 'by-university', icon: School, label: 'Players by University', href: '/players/university' },
    { id: 'by-country', icon: Globe, label: 'Players by Country', href: '/players/country' },
    { id: 'by-school', icon: Building2, label: 'Players by School', href: '/players/school' },
    { id: 'by-division', icon: Trophy, label: 'Players by Division', href: '/players/division' },
    { id: 'top-prospects', icon: Zap, label: 'Top Prospects', href: '/players/highlights' },
  ]

  const shopNavItems = [
    { id: 'all-products', icon: ShoppingBag, label: 'All Products', href: '/shop' },
    { id: 'shop-volleyballs', icon: CircleDot, label: 'Volleyballs', href: '/shop?category=Volleyballs' },
    { id: 'shop-shoes', icon: Footprints, label: 'Shoes', href: '/shop?category=Shoes' },
    { id: 'shop-nets', icon: Grid3x3, label: 'Nets', href: '/shop?category=Nets' },
    { id: 'shop-apparel', icon: Shirt, label: 'Apparel', href: '/shop?category=Apparel' },
    { id: 'shop-accessories', icon: Package, label: 'Accessories', href: '/shop?category=Accessories' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart', href: '/cart', badge: itemCount },
    { id: 'orders', icon: Receipt, label: 'Orders', href: '/orders' },
  ]

  const secondaryNavItems = [
    { id: 'highlights', icon: BookOpen, label: 'Highlights', href: '#' },
    { id: 'contact', icon: Mail, label: 'Contact', href: '#' },
    { id: 'about', icon: Info, label: 'About', href: '/about' },
  ]

  const isActive = (href: string) => pathname === href || (href === '/' && pathname === '/')

  const NavLink = ({ item }: { item: typeof primaryNavItems[0] | typeof shopNavItems[0] }) => {
    const Icon = item.icon
    const active = isActive(item.href)
    const badge = 'badge' in item ? item.badge : undefined

    return (
      <Link href={item.href} className="block">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative group ${
            active
              ? 'text-primary bg-primary/10'
              : 'text-foreground/70 hover:text-foreground hover:bg-secondary/50'
          }`}
        >
          <Icon size={20} />
          <span className="font-medium text-sm flex-1">{item.label}</span>
          {!!badge && (
            <span className="min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {badge}
            </span>
          )}
          {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-lg" />}
        </div>
      </Link>
    )
  }

  const SecondaryNavLink = ({ item }: { item: typeof secondaryNavItems[0] }) => {
    const Icon = item.icon
    const active = isActive(item.href)

    return (
      <Link href={item.href} className="block">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            active
              ? 'text-primary bg-primary/10'
              : 'text-foreground/60 hover:text-foreground/80 hover:bg-secondary/30'
          }`}
        >
          <Icon size={18} />
          <span className="font-medium text-xs uppercase tracking-wider">{item.label}</span>
        </div>
      </Link>
    )
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-background border-r border-border/50 flex-col z-40 overflow-y-auto">
        {/* Logo Section */}
        <div className="p-6 border-b border-border/30">
          <Link href="/">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Trophy size={24} className="text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-foreground">Scout</span>
                <span className="text-xs text-foreground/60 font-medium">Volleyball</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation (Discovery, Shop, Resources scroll together as one region) */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-2 mb-4">
            Discovery
          </div>
          {primaryNavItems.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}

          <div className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-2 mb-4 mt-6">
            Shop
          </div>
          {shopNavItems.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}

          <div className="h-px bg-border/30 my-6" />

          <div className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-2 mb-4">
            Resources
          </div>
          {secondaryNavItems.map((item) => (
            <SecondaryNavLink key={item.id} item={item} />
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border/30 p-4 mt-auto text-xs text-foreground/50 text-center">
          <p className="font-medium">@Shahriar Ratul,2026</p>
          
          
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border/50 px-3 py-2">
        <div className="flex gap-2 overflow-x-auto justify-start">
          {primaryNavItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link key={item.id} href={item.href} className="flex-shrink-0">
                <div
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/60 hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
