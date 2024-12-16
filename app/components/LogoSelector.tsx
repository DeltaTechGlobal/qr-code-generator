"use client"

import { useState, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { FormDataType } from '@/app/types'

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
  'APP_STORE_CHROME': '/logos/chromewebstore.svg'
}

export function LogoSelector({ type, paymentType, onLogoChange, formData }: LogoSelectorProps) {
  const [useLogo, setUseLogo] = useState(false)
  const [useCustomLogo, setUseCustomLogo] = useState(false)

  // Get the appropriate default logo
  const getDefaultLogo = () => {
    if (type === 'PAYMENT' && paymentType) {
      return QR_TYPE_LOGOS[paymentType]
    }
    if (type === 'APP_STORE' && formData?.store) {
      return QR_TYPE_LOGOS[`APP_STORE_${formData.store}`]
    }
    return QR_TYPE_LOGOS[type]
  }

  // Initialize state based on existing logo
  useEffect(() => {
    if (formData?.logo) {
      setUseLogo(true)
      const defaultLogo = getDefaultLogo()
      setUseCustomLogo(defaultLogo !== formData.logo)
    }
  }, [type, paymentType, formData, getDefaultLogo])

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
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onLogoChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
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
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full"
              />
              <p className="text-sm text-gray-500">
                Recommended: Square image, max 50x50 pixels
              </p>
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