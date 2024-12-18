"use client"

import { useState, useEffect, useCallback } from 'react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { FormDataType } from '@/types'
import { Upload } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface LogoSelectorProps {
  type: string
  paymentType?: string
  onLogoChange: (logo: string | undefined) => void
  formData: FormDataType
}

const QR_TYPE_LOGOS: Record<string, string> = {
  'paypal': '/logos/paypal.svg',
  'bitcoin': '/logos/bitcoin.svg',
  'ethereum': '/logos/ethereum.svg',
  'litecoin': '/logos/litecoin.svg',
  'dogecoin': '/logos/dogecoin.svg',
  'solana': '/logos/solana.svg',
  'usdt': '/logos/usdt.svg',
  'usdc': '/logos/usdc.svg',
  'cashapp': '/logos/cashapp.svg',
  'venmo': '/logos/venmo.svg',
  'googlepay': '/logos/googlepay.svg',
  'applepay': '/logos/applepay.svg',
  'wechat': '/logos/wechat.svg',
  'alipay': '/logos/alipay.svg',
  'URL': '/logos/url.svg',
  'EMAIL': '/logos/email.svg',
  'PHONE': '/logos/phone.svg',
  'SMS': '/logos/sms.svg',
  'WIFI': '/logos/wifi.svg',
  'SOCIAL': '/logos/social.svg',
  'APP_STORE': '/logos/appstore.svg',
  'VCARD': '/logos/contact.svg',
  'GEO': '/logos/location.svg',
  'Event': '/logos/calendar.svg',
  'TEXT': '/logos/text.svg',
  'zoom': '/logos/zoom.svg',
  'PAYMENT': '/logos/payment.svg',
  'APP_STORE_APPLE': '/logos/appstore.svg',
  'APP_STORE_GOOGLE': '/logos/playstore.svg',
  'APP_STORE_AMAZON': '/logos/amazonappstore.svg',
  'APP_STORE_CHROME': '/logos/chromewebstore.svg',
  'TWITTER': '/logos/x-logo.svg'
}

export function LogoSelector({ type, paymentType, onLogoChange, formData }: LogoSelectorProps) {
  const [useLogo, setUseLogo] = useState(false)
  const [useCustomLogo, setUseCustomLogo] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const { toast } = useToast()

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file (SVG, PNG, JPG, or GIF)"
      })
      return false
    }
    return true
  }

  const getDefaultLogo = () => {
    if (type === 'PAYMENT' && paymentType) {
      return QR_TYPE_LOGOS[paymentType]
    }
    if (type === 'APP_STORE' && formData?.store) {
      return QR_TYPE_LOGOS[`APP_STORE_${formData.store}`]
    }
    return QR_TYPE_LOGOS[type]
  }

  useEffect(() => {
    if (formData?.logo) {
      setUseLogo(true)
      const defaultLogo = getDefaultLogo()
      setUseCustomLogo(defaultLogo !== formData.logo)
    }

    if (!useCustomLogo) {
      if (type === 'TWITTER') {
        setUseLogo(true)
        onLogoChange(QR_TYPE_LOGOS.TWITTER)
      } else if (type === 'PAYMENT' && paymentType) {
        const defaultLogo = getDefaultLogo()
        if (defaultLogo) {
          onLogoChange(defaultLogo)
        }
      } else if (!formData?.logo) {
        onLogoChange(undefined)
      }
    }
  }, [type, paymentType])

  const handleLogoToggle = (checked: boolean) => {
    setUseLogo(checked)
    if (!checked) {
      onLogoChange(undefined)
      setUseCustomLogo(false)
    } else {
      const defaultLogo = getDefaultLogo()
      if (defaultLogo) {
        onLogoChange(defaultLogo)
      }
    }
  }

  const handleCustomLogoToggle = (checked: boolean) => {
    setUseCustomLogo(checked)
    if (!checked) {
      const defaultLogo = getDefaultLogo()
      if (defaultLogo) {
        onLogoChange(defaultLogo)
      }
    } else {
      onLogoChange(undefined)
    }
  }

  const handleFile = useCallback((file: File) => {
    if (file && validateFile(file)) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onLogoChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [onLogoChange, toast])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="use-logo"
          checked={useLogo}
          onCheckedChange={handleLogoToggle}
        />
        <Label htmlFor="use-logo">Add Logo to QR Code</Label>
      </div>

      {useLogo && (
        <>
          {getDefaultLogo() && (
            <div className="flex items-center space-x-2">
              <Switch
                id="use-custom-logo"
                checked={useCustomLogo}
                onCheckedChange={handleCustomLogoToggle}
              />
              <Label htmlFor="use-custom-logo">Use Custom Logo</Label>
            </div>
          )}

          {(useCustomLogo || !getDefaultLogo()) && (
            <div className="space-y-2">
              <Label htmlFor="logo-upload">Upload Logo</Label>
              <div
                className={`
                  relative border-2 border-dashed rounded-lg p-6
                  ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}
                  transition-colors duration-200
                  hover:border-gray-400 dark:hover:border-gray-500
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <Upload className="w-8 h-8 mb-2" />
                  <p className="mb-1">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p>SVG, PNG, JPG or GIF (max 50x50px)</p>
                </div>
              </div>
            </div>
          )}

          {!useCustomLogo && getDefaultLogo() && (
            <div className="mt-2">
              <Label>Default Logo</Label>
              <div className="mt-1 p-2 border rounded-md w-16 h-16 flex items-center justify-center">
                <Image
                  src={getDefaultLogo()}
                  alt={`${type} logo`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
} 