'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'cookie_consent'
type Consent = 'granted' | 'denied'

function readConsent(): Consent | null {
  const value = window.localStorage.getItem(STORAGE_KEY)
  return value === 'granted' || value === 'denied' ? value : null
}

export function useCookieConsent(): Consent | null {
  const [consent, setConsent] = useState<Consent | null>(null)

  useEffect(() => {
    setConsent(readConsent())

    function onChange() {
      setConsent(readConsent())
    }
    window.addEventListener('cookie-consent-change', onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener('cookie-consent-change', onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  return consent
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(readConsent() === null)
  }, [])

  function choose(value: Consent) {
    window.localStorage.setItem(STORAGE_KEY, value)
    // 'storage' only fires in OTHER tabs; dispatch a custom event so this
    // same tab's useCookieConsent() (in AnalyticsGate) picks it up too.
    window.dispatchEvent(new Event('cookie-consent-change'))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-secondary border-t border-border/50 p-4 md:p-5">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-between">
        <p className="text-sm text-muted-foreground">
          This site uses cookies for analytics to understand how the shop and player pages are used.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <Button variant="outline" size="sm" onClick={() => choose('denied')}>
            Decline
          </Button>
          <Button size="sm" onClick={() => choose('granted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
