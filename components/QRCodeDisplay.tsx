"use client"

import { useState, useRef } from 'react'
import QRCode from 'qrcode.react'
import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas'
import { Download, Share2 } from 'lucide-react'
import { ShareButton } from './ShareButton'

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
  const [qrImageBlob, setQrImageBlob] = useState<Blob | null>(null)
  const qrContainerRef = useRef<HTMLDivElement>(null)

  const generateQRImage = async () => {
    if (!qrContainerRef.current) return null

    try {
      // Add padding to capture the frame label
      const padding = 40
      const canvas = await html2canvas(qrContainerRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: qrContainerRef.current.offsetWidth,
        height: qrContainerRef.current.offsetHeight + (padding * 2), // Add padding for label
        y: frameLabelPosition === 'top' ? -padding : 0, // Adjust position based on label
      })

      return new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          }
        }, 'image/png')
      })
    } catch (error) {
      console.error('Error generating QR code image:', error)
      return null
    }
  }

  const handleDownload = async () => {
    const blob = await generateQRImage()
    if (!blob) return

    setQrImageBlob(blob)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${frameLabelPosition === 'top' ? 'mt-12' : ''}`}>
        <div 
          ref={qrContainerRef}
          id="qr-container"
          className="relative bg-white"
          style={{ 
            padding: '1rem',
            ...(frame !== 'none' && {
              border: `4px solid ${color}`,
              borderRadius: frame === 'rounded' ? '0.5rem' : '0',
            })
          }}
        >
          {frame !== 'none' && frameLabel && frameLabelPosition === 'top' && (
            <div 
              className="absolute -top-10 left-0 right-0 flex items-center justify-center text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded"
              style={{ height: '40px' }}
            >
              {frameLabel}
            </div>
          )}
          
          <div className="relative w-64 h-64">
            <QRCode
              value={value || 'https://example.com'}
              size={256}
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

          {frame !== 'none' && frameLabel && frameLabelPosition === 'bottom' && (
            <div 
              className="absolute -bottom-10 left-0 right-0 flex items-center justify-center text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded"
              style={{ height: '40px' }}
            >
              {frameLabel}
            </div>
          )}
        </div>
      </div>

      <div className={`w-full max-w-md flex gap-2 justify-center ${frameLabelPosition === 'bottom' ? 'mt-16' : 'mt-4'}`}>
        <Button 
          onClick={handleDownload}
          disabled={!value}
          className="flex-1 flex items-center justify-center"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PNG
        </Button>

        <ShareButton
          disabled={!value}
          qrCodeUrl={qrImageBlob ? URL.createObjectURL(qrImageBlob) : ''}
          title="Check out this QR Code"
          description="Generated with QR Code Generator"
          className="flex-1"
        />
      </div>
    </div>
  )
} 