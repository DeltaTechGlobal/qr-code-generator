"use client"

import QRCode from 'qrcode.react'
import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas'

interface QRCodeDisplayProps {
  value: string
  color: string
  bgColor: string
  frame: string
  frameLabel: string
  frameLabelPosition: 'top' | 'bottom'
  logo?: string
}

export function QRCodeDisplay({
  value,
  color,
  bgColor,
  frame,
  frameLabel,
  frameLabelPosition,
  logo
}: QRCodeDisplayProps) {
  const handleDownload = async () => {
    const qrContainer = document.getElementById('qr-container-wrapper')
    if (!qrContainer) {
      console.error('QR code container not found')
      return
    }

    try {
      const canvas = await html2canvas(qrContainer, {
        backgroundColor: '#FFFFFF',
        scale: 2, // Increase quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        windowWidth: qrContainer.scrollWidth,
        windowHeight: qrContainer.scrollHeight
      })

      const link = document.createElement('a')
      link.download = 'qr-code.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error downloading QR code:', error)
    }
  }

  const framePadding = 20
  const qrSize = 256
  const containerSize = qrSize + 2 * framePadding

  return (
    <div className="flex flex-col items-center space-y-4">
      <div id="qr-container-wrapper" className="relative p-4">
        <div 
          id="qr-container"
          className={`relative bg-white ${frame !== 'none' ? 'border-4' : ''} ${
            frame === 'rounded' ? 'rounded-lg' : ''
          } p-4`}
          style={{ 
            borderColor: color,
            width: `${containerSize}px`,
            height: `${containerSize}px`,
            margin: frameLabelPosition === 'top' ? '40px 0 0 0' : '0 0 40px 0'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <QRCode
              id="qr-code"
              value={value || 'https://deltatechglobal.co.uk'}
              size={qrSize}
              level="H"
              fgColor={color}
              bgColor={bgColor}
              imageSettings={logo ? {
                src: logo,
                width: 24,
                height: 24,
                excavate: true
              } : undefined}
            />
          </div>
          {frame !== 'none' && frameLabel && (
            <div 
              className={`absolute ${
                frameLabelPosition === 'top' ? '-top-10' : '-bottom-10'
              } left-0 right-0 flex items-center justify-center text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600`}
              style={{ 
                color: '#FFFFFF',
                padding: '4px 8px',
                height: '40px',
                borderRadius: frame === 'rounded' ? '8px' : '0'
              }}
            >
              {frameLabel}
            </div>
          )}
        </div>
      </div>
      <Button 
        onClick={handleDownload}
        disabled={!value}
        className="w-full"
      >
        Download PNG
      </Button>
    </div>
  )
}

