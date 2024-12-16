"use client"

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Apple, ShoppingBag, Chrome, Store, Loader2 } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"
import { useToast } from "@/hooks/use-toast"

interface DynamicFormProps {
  type: string
  onGenerate: (data: string) => void
}

const APP_STORES = [
  { value: 'apple', label: 'Apple App Store', icon: Apple },
  { value: 'google', label: 'Google Play Store', icon: Store },
  { value: 'amazon', label: 'Amazon Appstore', icon: ShoppingBag },
  { value: 'chrome', label: 'Chrome Web Store', icon: Chrome },
] as const

const WIFI_ENCRYPTION_TYPES = [
  { value: 'nopass', label: 'None' },
  { value: 'WPA', label: 'WPA/WPA2' },
  { value: 'WEP', label: 'WEP' },
] as const

interface FormDataType {
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
  // Enhanced email fields
  subject?: string
  body?: string
  meetingId?: string
}

export function DynamicForm({ type, onGenerate }: DynamicFormProps) {
  const [formData, setFormData] = useState<FormDataType>({
    wifiHidden: false,
    wifiEncryption: 'WPA'
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setFormData({
      wifiHidden: false,
      wifiEncryption: 'WPA'
    })
  }, [type])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      let qrData = ''

      switch (type) {
        case 'APP_STORE':
          switch (formData.store) {
            case 'apple':
              qrData = `https://apps.apple.com/app/${formData.appId}`
              break
            case 'google':
              qrData = `https://play.google.com/store/apps/details?id=${formData.appId}`
              break
            case 'amazon':
              qrData = `https://www.amazon.com/dp/${formData.appId}`
              break
            case 'chrome':
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
            <div className="space-y-2">
              <Label htmlFor="store">App Store</Label>
              <Select 
                value={formData.store} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, store: value }))}
              >
                <SelectTrigger id="store" className="w-full">
                  <SelectValue placeholder="Select app store" />
                </SelectTrigger>
                <SelectContent>
                  {APP_STORES.map(({ value, label, icon: Icon }) => (
                    <SelectItem 
                      key={value} 
                      value={value}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="appId">
                {formData.store === 'apple' ? 'App ID or Bundle ID' :
                 formData.store === 'google' ? 'Package Name' :
                 formData.store === 'amazon' ? 'ASIN' :
                 formData.store === 'chrome' ? 'Extension ID' : 'App ID'}
              </Label>
              <Input
                id="appId"
                placeholder={
                  formData.store === 'apple' ? 'id123456789 or com.example.app' :
                  formData.store === 'google' ? 'com.example.app' :
                  formData.store === 'amazon' ? 'B01234567' :
                  formData.store === 'chrome' ? 'extension-id' : 'Enter app ID'
                }
                value={formData.appId || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, appId: e.target.value }))}
                className="w-full"
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderFields()}
      <Button 
        type="submit" 
        className="w-full relative"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate QR Code'
        )}
      </Button>
    </form>
  )
}

