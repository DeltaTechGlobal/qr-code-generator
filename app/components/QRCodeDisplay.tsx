import { QRCodeSVG } from 'qrcode.react'
import { Button } from "@/components/ui/button"

export function QRCodeDisplay({ 
  value, 
  color, 
  bgColor, 
  frame, 
  frameLabel,
  frameLabelPosition,
  logo
}: { 
  value: string, 
  color: string, 
  bgColor: string, 
  frame: string,
  frameLabel: string,
  frameLabelPosition: 'top' | 'bottom', // Update 1
  logo: string
}) {
  const handleDownload = () => {
    const svg = document.getElementById('qr-code') as SVGSVGElement
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = 'qrcode.png'
      downloadLink.href = pngFile
      downloadLink.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  const framePadding = 20
  const qrSize = 256
  const containerSize = qrSize + 2 * framePadding

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`relative ${frame !== 'none' ? 'border-4' : ''} ${frame === 'rounded' ? 'rounded-lg' : ''}`} 
        style={{ 
          borderColor: color, 
          width: `${containerSize}px`, 
          height: `${containerSize}px`,
          margin: frameLabelPosition === 'top' ? '40px 0 0 0' : '0 0 40px 0' // Update 3
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <QRCodeSVG
            id="qr-code"
            value={value || 'https://example.com'}
            size={qrSize}
            fgColor={color}
            bgColor={bgColor}
            level="H"
            includeMargin={false}
            imageSettings={logo ? {
              src: logo,
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            } : undefined}
          />
        </div>
        {frame !== 'none' && frameLabel && (
          <div 
            className={`absolute ${
              frameLabelPosition === 'top' ? '-top-10' : '-bottom-10' // Update 2
            } left-0 right-0 flex items-center justify-center text-lg font-bold`}
            style={{ 
              color: '#FFFFFF',  // Update 2
              backgroundColor: '#3B82F6',  // Update 2
              padding: '4px 8px',
              height: '40px' // Update 2
            }}
          >
            {frameLabel}
          </div>
        )}
      </div>
      <Button onClick={handleDownload} className="mt-4 bg-purple-600 hover:bg-purple-700">
        Download QR Code
      </Button>
    </div>
  )
}

