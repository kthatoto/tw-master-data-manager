export default (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.floor(Math.log(bytes) / Math.log(1000)))
  return Math.round(bytes / Math.pow(1000, i)) + ' ' + sizes[i]
}
