"use client"

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Apple, ShoppingBag, Chrome, Store, Loader2, QrCode, Twitter } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface FormDataType {
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

  // Meeting fields
  meetingId?: string

  // Payment fields
  paymentType?: string
  paymentAddress?: string
  amount?: string
  currency?: string

  // Logo fields
  logo?: string | undefined
}

interface DynamicFormProps {
  type: string
  onGenerate: (data: string) => void
  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
}

const APP_STORE_OPTIONS = [
  { value: 'APPLE', label: 'Apple App Store', icon: Apple },
  { value: 'GOOGLE', label: 'Google Play Store', icon: Store },
  { value: 'AMAZON', label: 'Amazon App Store', icon: ShoppingBag },
  { value: 'CHROME', label: 'Chrome Web Store', icon: Chrome }
]

const WIFI_ENCRYPTION_TYPES = [
  { value: 'nopass', label: 'None' },
  { value: 'WPA', label: 'WPA/WPA2' },
  { value: 'WEP', label: 'WEP' },
] as const

const PAYMENT_TYPES = [
  { value: 'paypal', label: 'PayPal' },
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'stripe', label: 'Stripe' },
  { value: 'cashapp', label: 'Cash App' },
  { value: 'venmo', label: 'Venmo' },
  { value: 'googlepay', label: 'Google Pay' },
  { value: 'applepay', label: 'Apple Pay' },
  { value: 'wechat', label: 'WeChat Pay' },
  { value: 'alipay', label: 'Alipay' },
  { value: 'litecoin', label: 'Litecoin' },
  { value: 'dogecoin', label: 'Dogecoin' },
  { value: 'solana', label: 'Solana' },
  { value: 'usdt', label: 'USDT (Tether)' },
  { value: 'usdc', label: 'USDC' },
] as const

const PAYPAL_CURRENCIES = [
  { value: 'AUD', label: 'Australian Dollar (AUD)' },
  { value: 'BRL', label: 'Brazilian Real (BRL)' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)' },
  { value: 'CNY', label: 'Chinese Yuan (CNY)' },
  { value: 'CZK', label: 'Czech Koruna (CZK)' },
  { value: 'DKK', label: 'Danish Krone (DKK)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'HKD', label: 'Hong Kong Dollar (HKD)' },
  { value: 'HUF', label: 'Hungarian Forint (HUF)' },
  { value: 'ILS', label: 'Israeli New Shekel (ILS)' },
  { value: 'JPY', label: 'Japanese Yen (JPY)' },
  { value: 'MYR', label: 'Malaysian Ringgit (MYR)' },
  { value: 'MXN', label: 'Mexican Peso (MXN)' },
  { value: 'TWD', label: 'New Taiwan Dollar (TWD)' },
  { value: 'NZD', label: 'New Zealand Dollar (NZD)' },
  { value: 'NOK', label: 'Norwegian Krone (NOK)' },
  { value: 'PHP', label: 'Philippine Peso (PHP)' },
  { value: 'PLN', label: 'Polish Złoty (PLN)' },
  { value: 'GBP', label: 'British Pound Sterling (GBP)' },
  { value: 'RUB', label: 'Russian Ruble (RUB)' },
  { value: 'SGD', label: 'Singapore Dollar (SGD)' },
  { value: 'SEK', label: 'Swedish Krona (SEK)' },
  { value: 'CHF', label: 'Swiss Franc (CHF)' },
  { value: 'THB', label: 'Thai Baht (THB)' },
  { value: 'USD', label: 'United States Dollar (USD)' }
] as const

export function DynamicForm({ type, onGenerate, formData, setFormData }: DynamicFormProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    setFormData({
      wifiHidden: false,
      wifiEncryption: 'WPA',
      logo: undefined
    })
  }, [type, setFormData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      let qrData = ''

      switch (type) {
        case 'APP_STORE':
          switch (formData.store) {
            case 'APPLE':
              qrData = `https://apps.apple.com/app/${formData.appId}`
              break
            case 'GOOGLE':
              qrData = `https://play.google.com/store/apps/details?id=${formData.appId}`
              break
            case 'AMAZON':
              qrData = `https://www.amazon.com/dp/${formData.appId}`
              break
            case 'CHROME':
              qrData = `https://chrome.google.com/webstore/detail/${formData.appId}`
              break
          }
          break
        case 'SMS':
          qrData = `SMSTO:${formData.phone}:${formData.message}`
          break
        case 'VCARD':
          // Format data as vCard 3.0
          qrData = `BEGIN:VCARD
VERSION:3.0
N:${formData.lastName};${formData.firstName};;;
FN:${formData.firstName} ${formData.lastName}
ORG:${formData.company}
TITLE:${formData.jobTitle}
TEL;TYPE=CELL:${formData.mobile}
TEL;TYPE=WORK:${formData.phone}
TEL;TYPE=FAX:${formData.fax}
EMAIL:${formData.email}
URL:${formData.website}
ADR:;;${formData.street};${formData.city};;;${formData.country}
END:VCARD`
          break
        case 'WIFI':
          const encryption = formData.wifiEncryption as string
          qrData = `WIFI:T:${encryption};S:${formData.ssid};P:${formData.password || ''};H:${formData.wifiHidden ? 'true' : 'false'};`
          break
        case 'SOCIAL':
          qrData = formData.social as string
          break
        case 'URL':
          qrData = formData.url as string
          break
        case 'PHONE':
          qrData = `tel:${formData.phone}`
          break
        case 'EMAIL':
          qrData = `mailto:${formData.email}?subject=${encodeURIComponent(formData.subject || '')}&body=${encodeURIComponent(formData.body || '')}`
          break
        case 'GEO':
          qrData = `geo:${formData.latitude},${formData.longitude}`
          break
        case 'Event':
          const startDate = new Date(formData.startTime || '')
          const endDate = new Date(formData.endTime || '')
          const reminderMinutes = parseInt(formData.reminder || '15')
          
          // Format dates for iCalendar
          const formatDate = (date: Date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
          }
          
          const eventData = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `SUMMARY:${formData.title || ''}`,
            `DTSTART:${formatDate(startDate)}`,
            `DTEND:${formatDate(endDate)}`,
            formData.location ? `LOCATION:${formData.location}` : '',
            formData.url ? `URL:${formData.url}` : '',
            formData.notes ? `DESCRIPTION:${formData.notes}` : '',
            `BEGIN:VALARM`,
            `TRIGGER:-PT${reminderMinutes}M`,
            `ACTION:DISPLAY`,
            `DESCRIPTION:Reminder`,
            `END:VALARM`,
            'END:VEVENT',
            'END:VCALENDAR'
          ].filter(Boolean).join('\n')
          
          qrData = eventData
          break
        case 'zoom':
          qrData = `zoommtg://zoom.us/join?confno=${formData.meetingId}&pwd=${formData.password}`;
          break;
        case 'PAYMENT':
          switch (formData.paymentType) {
            case 'paypal':
              qrData = `https://www.paypal.com/paypalme/${formData.paymentAddress}${
                formData.amount ? '/' + formData.amount : ''
              }`
              break
            case 'bitcoin':
              qrData = `bitcoin:${formData.paymentAddress}${
                formData.amount ? '?amount=' + formData.amount : ''
              }`
              break
            case 'ethereum':
              qrData = `ethereum:${formData.paymentAddress}${
                formData.amount ? '?value=' + formData.amount : ''
              }`
              break
            case 'litecoin':
              qrData = `litecoin:${formData.paymentAddress}${
                formData.amount ? '?amount=' + formData.amount : ''
              }`
              break
            case 'dogecoin':
              qrData = `dogecoin:${formData.paymentAddress}${
                formData.amount ? '?amount=' + formData.amount : ''
              }`
              break
            case 'solana':
              qrData = `solana:${formData.paymentAddress}${
                formData.amount ? '?amount=' + formData.amount : ''
              }`
              break
            case 'usdt':
              qrData = `tether:${formData.paymentAddress}${
                formData.amount ? '?amount=' + formData.amount : ''
              }`
              break
            case 'usdc':
              qrData = `usdc:${formData.paymentAddress}${
                formData.amount ? '?amount=' + formData.amount : ''
              }`
              break
            case 'cashapp':
              qrData = `https://cash.app/$${formData.paymentAddress}${
                formData.amount ? '/' + formData.amount : ''
              }`
              break
            case 'venmo':
              qrData = `https://venmo.com/${formData.paymentAddress}${
                formData.amount ? '?amount=' + formData.amount : ''
              }`
              break
            case 'googlepay':
              qrData = `https://pay.google.com/payments/u/0/send?phone=${formData.paymentAddress}${
                formData.amount ? '&amount=' + formData.amount : ''
              }`
              break
            case 'wechat':
              qrData = `wxp://${formData.paymentAddress}${
                formData.amount ? '?amount=' + formData.amount : ''
              }`
              break
            case 'alipay':
              qrData = `alipay://platformapi/startapp?appId=20000116&actionType=toAccount&account=${
                formData.paymentAddress
              }${formData.amount ? '&amount=' + formData.amount : ''}`
              break
          }
          break
        case 'TWITTER':
          const tweetText = encodeURIComponent(formData.text || '')
          qrData = `https://twitter.com/intent/tweet?text=${tweetText}`
          break
        default:
          qrData = formData.text || ''
      }

      onGenerate(qrData)

      toast({
        title: "QR Code Generated!",
        description: "Scroll down to see your QR code",
        className: "bg-green-50 dark:bg-green-900 border-green-200",
      })

      if (window.innerWidth < 768) {
        const qrElement = document.getElementById('qr-container')
        if (qrElement) {
          qrElement.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again",
        className: "bg-red-50 dark:bg-red-900 border-red-200",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const renderFields = () => {
    switch (type) {
      case 'APP_STORE':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="store">Store</Label>
              <Select
                value={formData.store}
                onValueChange={(value) => handleFieldChange('store', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  {APP_STORE_OPTIONS.map(({ value, label, icon: Icon }) => (
                    <SelectItem key={value} value={value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="appId">App ID or URL</Label>
              <Input
                id="appId"
                value={formData.appId || ''}
                onChange={(e) => handleFieldChange('appId', e.target.value)}
                placeholder={getAppIdPlaceholder(formData.store)}
              />
            </div>
          </div>
        )
      case 'SMS':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={formData.phone || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message here"
                value={formData.message || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full min-h-[100px]"
              />
            </div>
          </div>
        )
      case 'VCARD':
        return (
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Company Name"
                    value={formData.company || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="Software Engineer"
                    value={formData.jobTitle || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="+1234567890"
                    value={formData.mobile || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Work Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fax">Fax</Label>
                  <Input
                    id="fax"
                    type="tel"
                    placeholder="+1234567890"
                    value={formData.fax || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, fax: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.website || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">Address</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Textarea
                    id="street"
                    placeholder="Enter your complete address"
                    value={formData.street || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                    className="w-full min-h-[80px]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={formData.city || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="Country"
                      value={formData.country || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'WIFI':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ssid">Network Name (SSID)</Label>
              <Input
                id="ssid"
                placeholder="Enter network name"
                value={formData.ssid || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, ssid: e.target.value }))}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hidden"
                checked={formData.wifiHidden}
                onCheckedChange={(checked: CheckedState) => 
                  setFormData(prev => ({ 
                    ...prev, 
                    wifiHidden: checked === true 
                  }))
                }
              />
              <Label htmlFor="hidden" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Hidden Network
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="encryption">Encryption</Label>
              <Select
                value={formData.wifiEncryption as string}
                onValueChange={(value) => setFormData(prev => ({ ...prev, wifiEncryption: value }))}
              >
                <SelectTrigger id="encryption" className="w-full">
                  <SelectValue placeholder="Select encryption type" />
                </SelectTrigger>
                <SelectContent>
                  {WIFI_ENCRYPTION_TYPES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.wifiEncryption !== 'nopass' && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter network password"
                  value={formData.password || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full"
                />
              </div>
            )}
          </div>
        )
      case 'SOCIAL':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="social">Profile Link</Label>
              <Input
                id="social"
                type="url"
                placeholder="Enter social media profile URL"
                value={formData.social || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, social: e.target.value }))}
                className="w-full"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Example: https://twitter.com/username or https://linkedin.com/in/username
              </p>
            </div>
          </div>
        )
      case 'URL':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Website</Label>
              <Input
                id="url"
                type="url"
                placeholder="Enter your website"
                value={formData.url || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="w-full"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Example: https://www.example.com
              </p>
            </div>
          </div>
        )
      case 'PHONE':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Example: +1234567890 or (123) 456-7890
              </p>
            </div>
          </div>
        )
      case 'EMAIL':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject (Optional)</Label>
              <Input
                id="subject"
                placeholder="Enter email subject"
                value={formData.subject || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body">Message (Optional)</Label>
              <Textarea
                id="body"
                placeholder="Enter email body"
                value={formData.body || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
                className="w-full"
              />
            </div>
          </div>
        )
      case 'GEO':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                placeholder="Enter latitude"
                value={formData.latitude || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
                className="w-full"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Example: 51.5074
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                placeholder="Enter longitude"
                value={formData.longitude || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
                className="w-full"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Example: -0.1278
              </p>
            </div>
          </div>
        )
      case 'Event':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                type="text"
                id="title"
                required
                placeholder="Enter event title"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                placeholder="Enter event location"
                value={formData.location || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                type="datetime-local"
                id="startTime"
                required
                value={formData.startTime || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                type="datetime-local"
                id="endTime"
                required
                value={formData.endTime || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminder">Reminder Before Event</Label>
              <Select 
                value={formData.reminder || '15'} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, reminder: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reminder time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes"
                value={formData.notes || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>
        )
      case 'zoom':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meetingId">Meeting ID *</Label>
              <Input
                id="meetingId"
                required
                placeholder="Enter Zoom meeting ID"
                value={formData.meetingId || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, meetingId: e.target.value }))}
                className="w-full"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Example: 123 456 7890
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Meeting Password *</Label>
              <Input
                id="password"
                required
                type="text"
                placeholder="Enter meeting password"
                value={formData.password || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full"
              />
            </div>
          </div>
        );
      case 'PAYMENT':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paymentType">Payment Method</Label>
              <Select
                value={formData.paymentType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, paymentType: value }))}
              >
                <SelectTrigger id="paymentType" className="w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_TYPES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentAddress">
                {formData.paymentType === 'paypal' ? 'PayPal Username' :
                 formData.paymentType === 'bitcoin' ? 'Bitcoin Address' :
                 formData.paymentType === 'ethereum' ? 'Ethereum Address' :
                 formData.paymentType === 'litecoin' ? 'Litecoin Address' :
                 formData.paymentType === 'dogecoin' ? 'Dogecoin Address' :
                 formData.paymentType === 'solana' ? 'Solana Address' :
                 formData.paymentType === 'usdt' ? 'USDT Address' :
                 formData.paymentType === 'usdc' ? 'USDC Address' :
                 formData.paymentType === 'cashapp' ? 'Cash App $Cashtag' :
                 formData.paymentType === 'venmo' ? 'Venmo Username' :
                 formData.paymentType === 'googlepay' ? 'Phone Number/UPI' :
                 formData.paymentType === 'wechat' ? 'WeChat ID' :
                 formData.paymentType === 'alipay' ? 'Alipay ID' :
                 'Payment Address'}
              </Label>
              <Input
                id="paymentAddress"
                placeholder={
                  formData.paymentType === 'paypal' ? 'username' :
                  formData.paymentType === 'bitcoin' ? '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' :
                  formData.paymentType === 'ethereum' ? '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' :
                  formData.paymentType === 'litecoin' ? 'LTC address' :
                  formData.paymentType === 'dogecoin' ? 'DOGE address' :
                  formData.paymentType === 'solana' ? 'SOL address' :
                  formData.paymentType === 'usdt' ? 'USDT address' :
                  formData.paymentType === 'usdc' ? 'USDC address' :
                  formData.paymentType === 'cashapp' ? 'Cash App $Cashtag' :
                  formData.paymentType === 'venmo' ? 'Venmo username' :
                  formData.paymentType === 'googlepay' ? 'Phone number/UPI' :
                  formData.paymentType === 'wechat' ? 'WeChat ID' :
                  formData.paymentType === 'alipay' ? 'Alipay ID' :
                  'Enter payment address'
                }
                value={formData.paymentAddress || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, paymentAddress: e.target.value }))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (Optional)</Label>
              <Input
                id="amount"
                type="number"
                step="any"
                placeholder="Enter amount"
                value={formData.amount || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full"
              />
            </div>

            {formData.paymentType === 'paypal' && (
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={formData.currency || 'USD'}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger id="currency" className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYPAL_CURRENCIES.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Enter payment message or note"
                value={formData.message || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full"
              />
            </div>
          </div>
        )
      case 'TWITTER':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tweet">Compose your X tweet</Label>
              <div className="relative">
                <Textarea
                  id="tweet"
                  placeholder="What's on your mind?"
                  value={formData.text || ''}
                  onChange={(e) => {
                    const text = e.target.value
                    if (text.length <= 280) {
                      setFormData(prev => ({ ...prev, text: text }))
                    }
                  }}
                  className="w-full min-h-[100px] pr-16"
                />
                <div className="absolute bottom-2 right-2 text-sm text-gray-500 dark:text-gray-400">
                  {(formData.text?.length || 0)}/280
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Input
              id="text"
              placeholder="Enter text"
              value={formData.text || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              className="w-full"
            />
          </div>
        )
    }
  }

  const getAppIdPlaceholder = (store?: string) => {
    switch (store) {
      case 'APPLE':
        return 'e.g., id123456789'
      case 'GOOGLE':
        return 'e.g., com.example.app'
      case 'AMAZON':
        return 'e.g., B00CXXX'
      case 'CHROME':
        return 'e.g., extension-id'
      default:
        return 'Enter app ID or URL'
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderFields()}
      
      <Button 
        type="submit"
        className={cn(
          "w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
          "text-white shadow-md hover:shadow-lg transition-all duration-200",
          "border border-blue-700/20"
        )}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR Code
          </>
        )}
      </Button>
    </form>
  )
}

