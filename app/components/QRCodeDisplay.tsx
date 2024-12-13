"use client"

import QRCode from 'qrcode.react'
import { Button } from '@/components/ui/button'

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
  const handleDownload = () => {
    const element = document.getElementById('qr-code')
    if (!element) {
      console.error('QR code element not found')
      return
    }

    // Check if the element is an SVG
    if (!(element instanceof SVGElement)) {
      console.error('Element is not an SVG')
      return
    }

    try {
      const svgData = new XMLSerializer().serializeToString(element)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        throw new Error('Could not get canvas context')
      }

      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = 'qr-code.png'
        downloadLink.href = pngFile
        downloadLink.click()
      }
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    } catch (error) {
      console.error('Error downloading QR code:', error)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <QRCode
          id="qr-code"
          value={value || 'https://deltatechglobal.co.uk'}
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

