// Persistent guest identity for the shop cart (no auth).
// The backend keys carts/orders by this client-generated ID.

const STORAGE_KEY = 'shop_guest_id'

export function getGuestId(): string {
  if (typeof window === 'undefined') {
    return ''
  }

  let guestId = window.localStorage.getItem(STORAGE_KEY)
  if (!guestId) {
    guestId = `guest-${crypto.randomUUID()}`
    window.localStorage.setItem(STORAGE_KEY, guestId)
  }
  return guestId
}
