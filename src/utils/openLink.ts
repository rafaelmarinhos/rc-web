export const openLink = (url: string) => {
  if (!url) return

  window.open(url, '_blank')
}
