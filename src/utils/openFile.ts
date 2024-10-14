export const openBlobInNewTab = (blob: Blob) => {
  const url = URL.createObjectURL(blob)

  window.open(url, '_blank')

  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}
