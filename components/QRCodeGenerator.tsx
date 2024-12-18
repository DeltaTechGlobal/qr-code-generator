"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypeSelector } from '@/components/TypeSelector'
import { DynamicForm } from '@/components/DynamicForm'
import { QRCodeDisplay } from '@/components/QRCodeDisplay'
import { Customization } from '@/components/Customization'

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

export function QRCodeGenerator() {
  const [selectedType, setSelectedType] = useState('URL')
  const [qrData, setQRData] = useState('')
  const [color, setColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [frame, setFrame] = useState('bottom-frame')
  const [frameLabel, setFrameLabel] = useState('Scan Me')
  const [logo, setLogo] = useState<string | undefined>(undefined)
  const [formData, setFormData] = useState<FormDataType>({
    wifiHidden: false,
    wifiEncryption: 'WPA',
    logo: undefined
  })

  const handleGenerate = (data: string) => {
    setQRData(data)
  }

  return (
    <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
      <CardHeader>
        <h1 className="text-2xl font-bold">Create Your QR Code</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate custom QR codes for various purposes with our free tool
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div>
            <TypeSelector selectedType={selectedType} onTypeChange={setSelectedType} />
            <DynamicForm 
              type={selectedType} 
              onGenerate={handleGenerate}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div className="md:hidden flex items-center justify-center py-4">
            {qrData && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 animate-bounce">
                <span>↓ Your QR Code is Ready Below ↓</span>
              </div>
            )}
          </div>
          <div className="space-y-6">
            <QRCodeDisplay 
              value={qrData} 
              color={color} 
              bgColor={bgColor} 
              frame={frame} 
              frameLabel={frameLabel}
              logo={formData.logo}
            />
            <Customization
              color={color}
              bgColor={bgColor}
              frame={frame}
              frameLabel={frameLabel}
              type={selectedType}
              paymentType={formData.paymentType}
              onColorChange={setColor}
              onBgColorChange={setBgColor}
              onFrameChange={setFrame}
              onFrameLabelChange={setFrameLabel}
              onLogoChange={setLogo}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 