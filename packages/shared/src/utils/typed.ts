export function isHttpUrl(url?: string): boolean {
  if (!url) {
    return false
  }
  const httpRegex = /^https?:\/\/.*$/
  return httpRegex.test(url)
}

export function isMacOs(): boolean {
  const macRegex = /macintosh|mac os x/i
  return macRegex.test(navigator.userAgent)
}
