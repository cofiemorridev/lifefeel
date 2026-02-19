export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface BookingDetails {
  bookingNumber: string
  serviceName: string
  startDate: Date
  endDate: Date
  total: number
  status: string
}

export interface CommissionCalculation {
  subtotal: number
  commission: number
  commissionRate: number
  providerPayout: number
}

export interface DateRange {
  start: Date
  end: Date
}

export interface Location {
  lat: number
  lng: number
  address: string
}
