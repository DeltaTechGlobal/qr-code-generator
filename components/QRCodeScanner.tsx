"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { 
  Upload, ScanLine, AlertCircle, XCircle, FileWarning, Globe, Mail, Wifi, Phone, 
  CreditCard, FileText, Calendar, MapPin, MessageSquare, Store, Video, 
  CreditCard as PaymentIcon, Twitter, User, DollarSign, Bitcoin, Wallet, 
  ShoppingBag, Chrome 
} from 'lucide-react'
import jsQR from 'jsqr'

interface ScanError {
  type: 'invalid_file' | 'no_qr_code' | 'processing_error'
  message: string
}

interface QRCodeExplanation {
  type: 'url' | 'email' | 'phone' | 'wifi' | 'text' | 'vcard' | 'event' | 
        'location' | 'sms' | 'app_store' | 'zoom' | 'payment' | 'tweet' | 
        'social' | 'unknown'
  title: string
  description: string
  icon: React.ReactNode
  action?: {
    label: string
    url: string
    onClick?: (e: React.MouseEvent) => void
  }
}

function parseICalEvent(data: string) {
  const summary = data.match(/SUMMARY:(.*?)(?:\r\n|\n|$)/)?.[1] || ''
  const location = data.match(/LOCATION:(.*?)(?:\r\n|\n|$)/)?.[1] || ''
  const description = data.match(/DESCRIPTION:(.*?)(?:\r\n|\n|$)/)?.[1] || ''
  
  // Parse start and end dates
  const startStr = data.match(/DTSTART:(\d{8}T\d{6}Z)/)?.[1]
  const endStr = data.match(/DTEND:(\d{8}T\d{6}Z)/)?.[1]
  
  let startDate: Date | null = null
  let endDate: Date | null = null
  
  if (startStr) {
    startDate = new Date(
      parseInt(startStr.slice(0, 4)), // year
      parseInt(startStr.slice(4, 6)) - 1, // month (0-based)
      parseInt(startStr.slice(6, 8)), // day
      parseInt(startStr.slice(9, 11)), // hour
      parseInt(startStr.slice(11, 13)), // minute
      parseInt(startStr.slice(13, 15)) // second
    )
  }
  
  if (endStr) {
    endDate = new Date(
      parseInt(endStr.slice(0, 4)),
      parseInt(endStr.slice(4, 6)) - 1,
      parseInt(endStr.slice(6, 8)),
      parseInt(endStr.slice(9, 11)),
      parseInt(endStr.slice(11, 13)),
      parseInt(endStr.slice(13, 15))
    )
  }

  return {
    summary,
    location,
    description,
    startDate,
    endDate
  }
}

function parsePaymentData(data: string): { type: string; address: string; amount?: string } {
  // PayPal
  if (data.startsWith('https://www.paypal.com/paypalme/')) {
    const address = data.replace('https://www.paypal.com/paypalme/', '').split('/')[0]
    const amount = data.split('/')[1]
    return { type: 'PayPal', address, amount }
  }
  
  // Cash App
  if (data.startsWith('https://cash.app/$')) {
    const address = data.replace('https://cash.app/$', '').split('/')[0]
    const amount = data.split('/')[1]
    return { type: 'Cash App', address, amount }
  }
  
  // Venmo
  if (data.startsWith('https://venmo.com/')) {
    const address = data.replace('https://venmo.com/', '').split('?')[0]
    const amount = new URLSearchParams(data.split('?')[1]).get('amount') || undefined
    return { type: 'Venmo', address, amount }
  }
  
  // Google Pay
  if (data.startsWith('https://pay.google.com/payments')) {
    const params = new URLSearchParams(data.split('?')[1])
    return { 
      type: 'Google Pay', 
      address: params.get('phone') || '', 
      amount: params.get('amount') || undefined 
    }
  }
  
  // WeChat Pay
  if (data.startsWith('wxp://')) {
    const address = data.replace('wxp://', '').split('?')[0]
    const amount = new URLSearchParams(data.split('?')[1]).get('amount') || undefined
    return { type: 'WeChat Pay', address, amount }
  }
  
  // Alipay
  if (data.startsWith('alipay://')) {
    const params = new URLSearchParams(data.split('?')[1])
    return { 
      type: 'Alipay', 
      address: params.get('account') || '', 
      amount: params.get('amount') || undefined 
    }
  }
  
  // Cryptocurrency formats
  const cryptoMatch = data.match(/^(bitcoin|ethereum|litecoin|dogecoin|solana|tether|usdc):([^?]+)(\?amount=(.+))?/)
  if (cryptoMatch) {
    return {
      type: cryptoMatch[1].charAt(0).toUpperCase() + cryptoMatch[1].slice(1),
      address: cryptoMatch[2],
      amount: cryptoMatch[4]
    }
  }
  
  return { type: 'Unknown', address: '' }
}

function parseWifiData(data: string) {
  const ssid = data.match(/(?:SSID|S):(.*?);/i)?.[1] || ''
  const security = data.match(/T:(.*?);/i)?.[1] || 'nopass'
  const password = data.match(/P:(.*?);/i)?.[1] || ''
  const hidden = data.match(/H:(.*?);/i)?.[1] === 'true'

  return {
    ssid: ssid.replace(/"/g, ''),
    security: security.toUpperCase(),
    password,
    hidden
  }
}

function detectAppStore(url: string): { 
  store: 'APPLE' | 'GOOGLE' | 'AMAZON' | 'CHROME' | 'UNKNOWN',
  label: string,
  icon: React.ReactNode 
} {
  if (url.includes('apps.apple.com')) {
    return {
      store: 'APPLE',
      label: 'Apple App Store',
      icon: <AppleIcon />
    }
  }
  if (url.includes('play.google.com')) {
    return {
      store: 'GOOGLE',
      label: 'Google Play Store',
      icon: <Store className="h-5 w-5 text-green-500" />
    }
  }
  if (url.includes('amazon.com/apps')) {
    return {
      store: 'AMAZON',
      label: 'Amazon App Store',
      icon: <ShoppingBag className="h-5 w-5 text-orange-500" />
    }
  }
  if (url.includes('chrome.google.com/webstore')) {
    return {
      store: 'CHROME',
      label: 'Chrome Web Store',
      icon: <Chrome className="h-5 w-5 text-blue-500" />
    }
  }
  return {
    store: 'UNKNOWN',
    label: 'App Store',
    icon: <Store className="h-5 w-5 text-gray-500" />
  }
}

function analyzeQRContent(data: string): QRCodeExplanation {
  // Event detection (iCal format)
  if (/^BEGIN:VCALENDAR/i.test(data)) {
    const eventDetails = parseICalEvent(data)
    const formatDate = (date: Date | null) => {
      if (!date) return 'Not specified'
      return date.toLocaleString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    let description = `Event: ${eventDetails.summary || 'Untitled Event'}\n`
    description += `When: ${formatDate(eventDetails.startDate)}`
    if (eventDetails.endDate) {
      description += ` to ${formatDate(eventDetails.endDate)}`
    }
    if (eventDetails.location) {
      description += `\nLocation: ${eventDetails.location}`
    }
    if (eventDetails.description) {
      description += `\nDetails: ${eventDetails.description}`
    }

    // Generate Google Calendar link
    const googleCalParams = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventDetails.summary || 'Untitled Event',
      dates: `${eventDetails.startDate?.toISOString().replace(/[-:]/g, '').slice(0, -5)}Z/${
        eventDetails.endDate?.toISOString().replace(/[-:]/g, '').slice(0, -5)}Z`,
      details: eventDetails.description || '',
      location: eventDetails.location || ''
    })

    return {
      type: 'event',
      title: 'Calendar Event',
      description: description.trim(),
      icon: <Calendar className="h-5 w-5 text-orange-500" />,
      action: {
        label: 'Add to Calendar',
        url: `https://calendar.google.com/calendar/render?${googleCalParams.toString()}`
      }
    }
  }

  // vCard detection (enhanced)
  if (/^BEGIN:VCARD/i.test(data)) {
    const name = data.match(/FN:(.*)/i)?.[1] || ''
    return {
      type: 'vcard',
      title: 'Contact Information',
      description: `This QR code contains contact information for ${name || 'someone'} in vCard format.`,
      icon: <CreditCard className="h-5 w-5 text-indigo-500" />
    }
  }

  // Wi-Fi detection (enhanced)
  if (/^WIFI:/i.test(data)) {
    const wifiDetails = parseWifiData(data)
    
    let description = `Network Name (SSID): ${wifiDetails.ssid}\n`
    description += `Security Type: ${wifiDetails.security === 'NOPASS' ? 'Open Network' : wifiDetails.security}\n`
    if (wifiDetails.password) {
      description += `Password: ${wifiDetails.password}\n`
    }
    if (wifiDetails.hidden) {
      description += `Note: This is a hidden network`
    }

    const connectInstructions = `
To connect to this network:
1. Open your device's Wi-Fi settings
2. ${wifiDetails.hidden ? 'Select "Add Hidden Network" or "Other Network"' : `Look for "${wifiDetails.ssid}"`}
3. ${wifiDetails.password ? `Enter the password shown above` : 'Select "Connect"'}
    `.trim()

    return {
      type: 'wifi',
      title: 'Wi-Fi Network',
      description: `${description}\n\n${connectInstructions}`,
      icon: <Wifi className="h-5 w-5 text-amber-500" />,
      action: wifiDetails.password ? {
        label: 'Copy Password',
        url: '#',
        onClick: undefined
      } : undefined
    }
  }

  // Location detection
  if (/^geo:/i.test(data)) {
    return {
      type: 'location',
      title: 'Geographic Location',
      description: 'This QR code links to a geographical location on a map.',
      icon: <MapPin className="h-5 w-5 text-red-500" />,
      action: {
        label: 'View on Map',
        url: `https://www.google.com/maps?q=${encodeURIComponent(data.replace('geo:', ''))}`
      }
    }
  }

  // SMS detection
  if (/^smsto:/i.test(data)) {
    const number = data.match(/^smsto:(.*?):/i)?.[1] || ''
    return {
      type: 'sms',
      title: 'SMS Message',
      description: `This QR code contains an SMS message template for ${number}`,
      icon: <MessageSquare className="h-5 w-5 text-green-500" />
    }
  }

  // App Store detection
  if (/^https?:\/\/(apps\.apple\.com|play\.google\.com|amazon\.com\/apps|chrome\.google\.com\/webstore)/i.test(data)) {
    const storeInfo = detectAppStore(data)
    return {
      type: 'app_store',
      title: `${storeInfo.label} Link`,
      description: `This QR code redirects to an application on the ${storeInfo.label}.`,
      icon: storeInfo.icon,
      action: {
        label: 'Visit Store',
        url: data
      }
    }
  }

  // Zoom meeting detection
  if (/zoom\.us\//i.test(data)) {
    return {
      type: 'zoom',
      title: 'Zoom Meeting',
      description: 'This QR code provides a link to join a Zoom meeting.',
      icon: <Video className="h-5 w-5 text-blue-500" />,
      action: {
        label: 'Join Meeting',
        url: data
      }
    }
  }

  // Payment detection
  if (/^(bitcoin|ethereum|litecoin|dogecoin|solana|tether|usdc):|^https:\/\/(www\.)?(paypal\.com\/paypalme|cash\.app\/\$|venmo\.com)|^wxp:\/\/|^alipay:\/\//.test(data)) {
    const paymentInfo = parsePaymentData(data)
    
    let description = `This QR code contains payment information for ${paymentInfo.type}`
    if (paymentInfo.amount) {
      description += ` with an amount of ${paymentInfo.amount}`
    }
    description += `\nPayment Address: ${paymentInfo.address}`
    
    const getPaymentIcon = (type: string) => {
      switch (type.toLowerCase()) {
        case 'bitcoin':
        case 'litecoin':
        case 'dogecoin':
          return <Bitcoin className="h-5 w-5 text-orange-500" />
        case 'ethereum':
        case 'solana':
        case 'tether':
        case 'usdc':
          return <Wallet className="h-5 w-5 text-blue-500" />
        case 'paypal':
        case 'cash app':
        case 'venmo':
        case 'google pay':
          return <DollarSign className="h-5 w-5 text-green-500" />
        default:
          return <PaymentIcon className="h-5 w-5 text-gray-500" />
      }
    }
    
    let action;
    if (data.startsWith('https://')) {
      action = {
        label: `Pay with ${paymentInfo.type}`,
        url: data
      }
    }
    
    return {
      type: 'payment',
      title: `${paymentInfo.type} Payment`,
      description,
      icon: getPaymentIcon(paymentInfo.type),
      ...(action && { action })
    }
  }

  // Twitter/X post detection
  if (/twitter\.com|x\.com/i.test(data)) {
    return {
      type: 'tweet',
      title: 'X/Twitter Post',
      description: 'This QR code links to a specific tweet or X post.',
      icon: <Twitter className="h-5 w-5 text-sky-500" />,
      action: {
        label: 'View Post',
        url: data
      }
    }
  }

  // Social media profile detection
  if (/^https?:\/\/(www\.)?(facebook|instagram|linkedin|tiktok)\.com/i.test(data)) {
    return {
      type: 'social',
      title: 'Social Media Profile',
      description: 'This QR code links to a social media profile.',
      icon: <User className="h-5 w-5 text-pink-500" />,
      action: {
        label: 'View Profile',
        url: data
      }
    }
  }

  // URL detection
  if (/^(https?:\/\/)/i.test(data)) {
    return {
      type: 'url',
      title: 'Website URL',
      description: `This QR code redirects to the website: ${data}`,
      icon: <Globe className="h-5 w-5 text-blue-500" />
    }
  }

  // Email detection
  if (/^mailto:/i.test(data) || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data)) {
    return {
      type: 'email',
      title: 'Email Address',
      description: `This QR code contains an email address: ${data.replace('mailto:', '')}`,
      icon: <Mail className="h-5 w-5 text-purple-500" />
    }
  }

  // Phone number detection
  if (/^tel:/i.test(data) || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(data)) {
    return {
      type: 'phone',
      title: 'Phone Number',
      description: `This QR code contains a phone number: ${data.replace('tel:', '')}`,
      icon: <Phone className="h-5 w-5 text-green-500" />
    }
  }

  // Default case: treat as text
  return {
    type: 'text',
    title: 'Text Content',
    description: `This QR code contains the following text message: ${data}`,
    icon: <FileText className="h-5 w-5 text-gray-500" />
  }
}

const AppleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
)

export function QRCodeScanner() {
  const [scannedData, setScannedData] = useState<string>('')
  const [error, setError] = useState<ScanError | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [explanation, setExplanation] = useState<QRCodeExplanation | null>(null)
  const { toast } = useToast()

  const analyzeQRContentWithToast = useCallback((data: string) => {
    const result = analyzeQRContent(data)
    
    if (result.type === 'wifi' && result.action?.label === 'Copy Password') {
      return {
        ...result,
        action: {
          ...result.action,
          onClick: (e: React.MouseEvent) => {
            e.preventDefault()
            navigator.clipboard.writeText(data.match(/P:(.*?);/i)?.[1] || '')
            toast({
              title: "Password Copied",
              description: "Wi-Fi password has been copied to clipboard.",
              className: "bg-green-50 dark:bg-green-900 border-green-200",
            })
          }
        }
      }
    }
    
    return result
  }, [toast])

  const handleImageUpload = useCallback(async (file: File) => {
    // Reset previous states
    setError(null)
    setScannedData('')
    setExplanation(null)

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError({
        type: 'invalid_file',
        message: 'Invalid file type. Please upload a valid image file (PNG, JPG, GIF).'
      })
      toast({
        title: "Invalid File Type",
        description: "Please select a valid image file.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError({
        type: 'invalid_file',
        message: 'File size exceeds 10MB limit. Please upload a smaller file.'
      })
      toast({
        title: "File Too Large",
        description: "Maximum file size is 10MB.",
        variant: "destructive",
      })
      return
    }

    let objectUrl = ''
    try {
      const image = new Image()
      objectUrl = URL.createObjectURL(file)
      image.src = objectUrl
      
      await new Promise((resolve, reject) => {
        image.onload = resolve
        image.onerror = () => reject(new Error('Failed to load image'))
      })

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) {
        throw new Error('Failed to get canvas context')
      }

      canvas.width = image.width
      canvas.height = image.height
      context.drawImage(image, 0, 0)

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code) {
        setScannedData(code.data)
        setExplanation(analyzeQRContentWithToast(code.data))
        toast({
          title: "QR Code Scanned Successfully!",
          description: "The QR code content has been extracted.",
          className: "bg-green-50 dark:bg-green-900 border-green-200",
        })
      } else {
        setError({
          type: 'no_qr_code',
          message: 'No QR code detected in the uploaded image. Please try again with a valid QR code image.'
        })
        toast({
          title: "No QR Code Found",
          description: "Please upload an image containing a QR code.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setError({
        type: 'processing_error',
        message: 'Failed to process the image. Please try again with a different image.'
      })
      toast({
        title: "Processing Error",
        description: "Failed to scan the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [toast, analyzeQRContentWithToast])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleImageUpload(file)
    }
  }, [handleImageUpload])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const getErrorIcon = (type: ScanError['type']) => {
    switch (type) {
      case 'invalid_file':
        return <FileWarning className="h-5 w-5 text-red-500" />
      case 'no_qr_code':
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case 'processing_error':
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
      <CardHeader>
        <h1 className="text-2xl font-bold">QR Code Scanner</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload or drag and drop a QR code image to scan instantly
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Error Display */}
          {error && (
            <div className={`
              p-4 rounded-lg flex items-start gap-3
              ${error.type === 'no_qr_code' 
                ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }
            `}>
              {getErrorIcon(error.type)}
              <div className="space-y-1">
                <h4 className={`font-medium ${
                  error.type === 'no_qr_code' 
                    ? 'text-amber-800 dark:text-amber-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {error.type === 'invalid_file' ? 'Invalid File' 
                    : error.type === 'no_qr_code' ? 'No QR Code Detected'
                    : 'Processing Error'}
                </h4>
                <p className={`text-sm ${
                  error.type === 'no_qr_code'
                    ? 'text-amber-700 dark:text-amber-300'
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {error.message}
                </p>
              </div>
            </div>
          )}

          {/* Upload Area */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center 
              cursor-pointer transition-all duration-200
              ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}
              ${error ? 'border-red-200 dark:border-red-800' : 'border-blue-200 dark:border-blue-800'}
              ${!error && !isDragging && 'hover:border-blue-500 dark:hover:border-blue-400'}
              bg-gray-50 dark:bg-gray-900
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center gap-4">
              <div className={`
                p-4 rounded-full 
                ${isDragging ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-blue-50 dark:bg-blue-900/20'}
              `}>
                <Upload className={`
                  h-8 w-8 
                  ${isDragging ? 'text-blue-600' : 'text-blue-500'}
                `} />
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-sm">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                  >
                    <span>Upload a file</span>
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file)
                      }}
                    />
                  </label>
                  <span className="text-gray-500 dark:text-gray-400">
                    or drag and drop
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Results Area */}
          {scannedData && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <ScanLine className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold">Scan Results</h3>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <pre className="whitespace-pre-wrap break-words text-sm text-gray-600 dark:text-gray-400">
                  {scannedData}
                </pre>
              </div>

              {scannedData && explanation && (
                <div className="mt-6 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    {explanation.icon}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {explanation.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {explanation.description}
                  </p>
                  {explanation.action && (
                    <a
                      href={explanation.action.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={explanation.action.onClick}
                      className="mt-2 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {explanation.action.label}
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 