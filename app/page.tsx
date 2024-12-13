"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { TypeSelector } from './components/TypeSelector'
import { DynamicForm } from './components/DynamicForm'
import { QRCodeDisplay } from './components/QRCodeDisplay'
import { Customization } from './components/Customization'
import { ThemeToggle } from './components/ThemeToggle'
import { ThemeProvider } from "@/components/theme-provider"

export default function QRCodeGenerator() {
  const [selectedType, setSelectedType] = useState('URL')
  const [qrData, setQRData] = useState('')
  const [color, setColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [frame, setFrame] = useState('none')
  const [frameLabel, setFrameLabel] = useState('Scan Me')
  const [frameLabelPosition, setFrameLabelPosition] = useState<'top' | 'bottom'>('bottom')
  const [logo, setLogo] = useState('')

  const handleGenerate = (data: string) => {
    setQRData(data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">QR Code Generator</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <TypeSelector selectedType={selectedType} onTypeChange={setSelectedType} />
              <DynamicForm type={selectedType} onGenerate={handleGenerate} />
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
            <QRCodeDisplay 
              value={qrData} 
              color={color} 
              bgColor={bgColor} 
              frame={frame} 
              frameLabel={frameLabel}
              frameLabelPosition={frameLabelPosition}
              logo={logo}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

