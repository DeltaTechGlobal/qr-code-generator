export interface FormDataType {
  // Basic fields
  text?: string
  wifiHidden: boolean
  wifiEncryption: string
  ssid?: string
  password?: string
  social?: string
  url?: string
  phone?: string
  email?: string
  latitude?: string
  longitude?: string
  store?: string
  appId?: string
  message?: string

  // vCard fields
  firstName?: string
  lastName?: string
  company?: string
  jobTitle?: string
  mobile?: string
  fax?: string
  website?: string
  street?: string
  city?: string
  country?: string

  // Event fields
  title?: string
  location?: string
  startTime?: string
  endTime?: string
  reminder?: string
  notes?: string

  // Email fields
  subject?: string
  body?: string
  meetingId?: string

  // Payment fields
  paymentType?: string
  paymentAddress?: string
  amount?: string
  currency?: string

  // Logo fields
  logo?: string | undefined
} 