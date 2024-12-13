"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { TypeSelector } from './components/TypeSelector'
import { DynamicForm } from './components/DynamicForm'
import { QRCodeDisplay } from './components/QRCodeDisplay'
import { Customization } from './components/Customization'
import { ThemeToggle } from './components/ThemeToggle'
import { Footer } from '@/components/Footer'
import { Logo } from '@/components/Logo'

export default function QRCodeGenerator() {
  const [selectedType, setSelectedType] = useState('URL')
  const [qrData, setQRData] = useState('')
  const [color, setColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [frame, setFrame] = useState('rounded')
  const [frameLabel, setFrameLabel] = useState('Scan Me')
  const [frameLabelPosition, setFrameLabelPosition] = useState<'top' | 'bottom'>('bottom')
  const [logo, setLogo] = useState('')

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <TypeSelector selectedType={selectedType} onTypeChange={setSelectedType} />
                <DynamicForm type={selectedType} onGenerate={handleGenerate} />
              </div>
              <div className="space-y-6">
                <QRCodeDisplay 
                  value={qrData} 
                  color={color} 
                  bgColor={bgColor} 
                  frame={frame} 
                  frameLabel={frameLabel}
                  frameLabelPosition={frameLabelPosition}
                  logo={logo}
                />
                <Customization
                  color={color}
                  bgColor={bgColor}
                  frame={frame}
                  frameLabel={frameLabel}
                  frameLabelPosition={frameLabelPosition}
                  onColorChange={setColor}
                  onBgColorChange={setBgColor}
                  onFrameChange={setFrame}
                  onFrameLabelChange={setFrameLabel}
                  onFrameLabelPositionChange={setFrameLabelPosition}
                  onLogoChange={setLogo}
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

