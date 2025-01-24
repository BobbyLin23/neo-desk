export const formatTime = (time: Date) => {
  const now = new Date()
  const isToday =
    time.getDate() === now.getDate() &&
    time.getMonth() === now.getMonth() &&
    time.getFullYear() === now.getFullYear()

  const isSameYear = time.getFullYear() === now.getFullYear()

  if (isToday) {
    return time.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  } else if (isSameYear) {
    return time
      .toLocaleDateString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
      })
      .replace('/', '-')
  } else {
    return time
      .toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('/')
      .join('-')
  }
}
