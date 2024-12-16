"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { TypeSelector } from './components/TypeSelector'
import { DynamicForm } from '@/app/components/DynamicForm'
import { QRCodeDisplay } from '@/components/QRCodeDisplay'
import { Customization } from './components/Customization'
import { ThemeToggle } from './components/ThemeToggle'
import { Footer } from '@/components/Footer'
import { Logo } from '@/components/Logo'

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

export default function QRCodeGenerator() {
  const [selectedType, setSelectedType] = useState('URL')
  const [qrData, setQRData] = useState('')
  const [color, setColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [frame, setFrame] = useState('rounded')
  const [frameLabel, setFrameLabel] = useState('Scan Me')
  const [frameLabelPosition, setFrameLabelPosition] = useState<'top' | 'bottom'>('bottom')
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
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl flex items-center justify-between mb-4">
          <Logo />
          <ThemeToggle />
        </div>
        <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                QR Code Generator
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Generate custom QR codes for any purpose
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <div>
                <TypeSelector selectedType={selectedType} onTypeChange={setSelectedType} />
                <DynamicForm 
                  type={selectedType} 
                  onGenerate={setQRData}
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
                  frameLabelPosition={frameLabelPosition}
                  logo={formData.logo}
                />
                <Customization
                  color={color}
                  bgColor={bgColor}
                  frame={frame}
                  frameLabel={frameLabel}
                  frameLabelPosition={frameLabelPosition}
                  type={selectedType}
                  paymentType={formData.paymentType}
                  onColorChange={setColor}
                  onBgColorChange={setBgColor}
                  onFrameChange={setFrame}
                  onFrameLabelChange={setFrameLabel}
                  onFrameLabelPositionChange={setFrameLabelPosition}
                  onLogoChange={setLogo}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
