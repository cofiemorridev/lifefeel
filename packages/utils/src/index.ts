import { format, differenceInDays, addDays } from 'date-fns'

export const calculateCommission = (
  subtotal: number,
  rate: number = 11.5
): { commission: number; providerPayout: number } => {
  const commission = (subtotal * rate) / 100
  const providerPayout = subtotal - commission
  return { commission, providerPayout }
}

export const generateBookingNumber = (): string => {
  const date = new Date()
  const year = date.getFullYear()
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')
  return `LF-${year}-${random}`
}

export const formatCurrency = (
  amount: number,
  currency: string = 'GHS'
): string => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export const checkAvailability = (
  availability: { date: Date; isAvailable: boolean }[],
  startDate: Date,
  endDate: Date
): boolean => {
  const days = differenceInDays(endDate, startDate)
  for (let i = 0; i <= days; i++) {
    const currentDate = addDays(startDate, i)
    const slot = availability.find(
      (a) => format(a.date, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
    )
    if (!slot || !slot.isAvailable) {
      return false
    }
  }
  return true
}

export const validateGhanaPhone = (phone: string): boolean => {
  const ghanaPhoneRegex = /^(0|\+233)?[2345][0-9]{8}$/
  return ghanaPhoneRegex.test(phone)
}
