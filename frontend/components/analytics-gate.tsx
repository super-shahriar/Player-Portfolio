'use client'

import { GoogleTagManager } from '@next/third-parties/google'
import CookieConsent, { useCookieConsent } from '@/components/cookie-consent'
import AnalyticsPageview from '@/components/analytics-pageview'

export default function AnalyticsGate({ gtmId }: { gtmId?: string }) {
  const consent = useCookieConsent()

  return (
    <>
      {gtmId && consent === 'granted' && <GoogleTagManager gtmId={gtmId} />}
      <AnalyticsPageview />
      <CookieConsent />
    </>
  )
}
