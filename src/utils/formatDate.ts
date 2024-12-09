import dayjs from 'dayjs'

export function formatDate(date: string) {
  const formatted = dayjs(date).format('DD MMM YYYY HH:mm')

  return formatted
}

export function age(date: string) {
  const today = dayjs().year()
  console.log(date)

  console.log(today)

  return 0
}
