"use client"

import { useState, useRef } from 'react'
import QRCode from 'qrcode.react'
import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas'
import { Download, Share2, ChevronDown } from 'lucide-react'
import { ShareButton } from './ShareButton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { jsPDF } from 'jspdf'

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
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg' | 'pdf'>('png')
  const [downloadSize, setDownloadSize] = useState<string>('300')
  const qrRef = useRef<HTMLDivElement>(null)

  const generateQRImage = async (format: 'png' | 'svg' | 'pdf', size: number) => {
    if (!qrRef.current) return null

    try {
      const padding = 40
      const scale = size / 256 // 256 is the base size of QR code

      if (format === 'svg') {
        const svgElement = qrRef.current.querySelector('svg')
        if (!svgElement) return null

        const svgData = new XMLSerializer().serializeToString(svgElement)
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        return svgBlob
      }

      const canvas = await html2canvas(qrRef.current, {
        backgroundColor: '#FFFFFF',
        scale: scale * 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: qrRef.current.offsetWidth,
        height: qrRef.current.offsetHeight + (padding * 2),
        y: frameLabelPosition === 'top' ? -padding : 0,
      })

      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [size + 80, size + 80]
        })
        pdf.addImage(imgData, 'PNG', 40, 40, size, size)
        const pdfBlob = pdf.output('blob')
        return pdfBlob
      }

      return new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          }
        }, 'image/png')
      })
    } catch (error) {
      console.error('Error generating QR code:', error)
      return null
    }
  }

  const handleDownload = async () => {
    const size = parseInt(downloadSize)
    const blob = await generateQRImage(downloadFormat, size)
    if (!blob) return

    setQrImageBlob(blob)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `qr-code.${downloadFormat}`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`
          relative 
          ${frameLabelPosition === 'top' ? 'mt-12' : ''} 
          transition-all duration-300 ease-in-out
          ${value ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}
        `}
      >
        <div 
          ref={qrRef}
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

      <div className={`
        w-full max-w-md flex gap-2 justify-center flex-wrap
        ${frameLabelPosition === 'bottom' ? 'mt-16' : 'mt-4'}
        transition-opacity duration-300
        ${value ? 'opacity-100' : 'opacity-50'}
      `}>
        <div className="flex gap-2 w-full">
          <Select
            value={downloadFormat}
            onValueChange={(value: 'png' | 'svg' | 'pdf') => setDownloadFormat(value)}
            disabled={!value}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="svg">SVG</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={downloadSize}
            onValueChange={setDownloadSize}
            disabled={!value}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">300px</SelectItem>
              <SelectItem value="400">400px</SelectItem>
              <SelectItem value="500">500px</SelectItem>
              <SelectItem value="600">600px</SelectItem>
              <SelectItem value="700">700px</SelectItem>
              <SelectItem value="800">800px</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleDownload}
          disabled={!value}
          className="flex-1 flex items-center justify-center"
        >
          <Download className="mr-2 h-4 w-4" />
          Download {downloadFormat.toUpperCase()}
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