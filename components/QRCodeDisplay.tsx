"use client"

import { useState, useRef } from 'react'
import QRCode from 'qrcode.react'
import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas'
import { Download, Share2, ChevronDown } from 'lucide-react'
import { PrintButton } from './PrintButton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { jsPDF } from 'jspdf'
import { cn } from "@/lib/utils"

interface QRCodeDisplayProps {
  value: string
  color: string
  bgColor: string
  frame: string
  frameLabel: string
  logo?: string | undefined
}

export function QRCodeDisplay({
  value,
  color,
  bgColor,
  frame,
  frameLabel,
  logo
}: QRCodeDisplayProps) {
  const [qrImageBlob, setQrImageBlob] = useState<Blob | null>(null)
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'pdf'>('png')
  const [downloadSize, setDownloadSize] = useState<string>('300')
  const qrRef = useRef<HTMLDivElement>(null)

  const getFrameStyles = () => {
    switch (frame) {
      case 'bottom-frame':
      case 'top-frame':
        return {
          border: `4px solid ${color}`,
          borderRadius: '0.5rem',
          labelPosition: frame.startsWith('top') ? 'top' : 'bottom',
          labelStyle: 'frame'
        }
      case 'bottom-tooltip':
        return {
          border: `2px solid ${color}`,
          borderRadius: '0.5rem',
          labelPosition: 'bottom',
          labelStyle: 'tooltip'
        }
      case 'top-header':
        return {
          border: 'none',
          borderRadius: '0.5rem',
          labelPosition: 'top',
          labelStyle: 'header'
        }
      default:
        return {
          border: `2px solid ${color}`,
          borderRadius: '0.5rem',
          labelPosition: 'none',
          labelStyle: 'none'
        }
    }
  }

  const frameStyles = getFrameStyles()

  const generateQRImage = async (format: 'png' | 'pdf', size: number) => {
    if (!qrRef.current || !value) return null

    try {
      const padding = 40
      const scale = size / 256

      const canvas = await html2canvas(qrRef.current, {
        backgroundColor: '#FFFFFF',
        scale: scale * 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: qrRef.current.offsetWidth,
        height: qrRef.current.offsetHeight + (padding * 2),
        y: frameStyles.labelPosition === 'top' ? -padding : 0,
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
      <div className={`relative ${frameStyles.labelPosition === 'top' ? 'mt-12' : ''}`}>
        <div
          ref={qrRef}
          id="qr-container"
          className={`
            relative bg-white
            ${frameStyles.labelStyle === 'header' ? 'shadow-lg' : ''}
          `}
          style={{ 
            padding: '1rem',
            border: frameStyles.border,
            borderRadius: frameStyles.labelStyle === 'header' ? '0 0 0.5rem 0.5rem' : '0.5rem',
            boxShadow: frame === 'none' ? 'none' : '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          {/* Top Label */}
          {frame !== 'none' && frameLabel && frameStyles.labelPosition === 'top' && (
            <div 
              className={`absolute -top-10 left-0 right-0 flex items-center justify-center text-lg font-bold
                ${frameStyles.labelStyle === 'header' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg h-14 -mt-4'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg h-10'
                }`}
            >
              {frameLabel}
            </div>
          )}

          {/* QR Code */}
          <div className="relative w-64 h-64">
            <QRCode
              value={value || ''}
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

          {/* Bottom Label */}
          {frame !== 'none' && frameLabel && frameStyles.labelPosition === 'bottom' && (
            <div 
              className={`absolute -bottom-10 left-0 right-0 flex items-center justify-center text-lg font-bold
                ${frameStyles.labelStyle === 'tooltip' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg w-auto mx-auto px-6 transform translate-y-2'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg'
                }`}
              style={{ 
                height: '40px'
              }}
            >
              {frameLabel}
              {frameStyles.labelStyle === 'tooltip' && (
                <div
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    border-8 border-transparent border-b-blue-600"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className={`
        flex flex-col gap-4 w-full max-w-md mx-auto
        ${frameStyles.labelPosition === 'bottom' ? 'mt-20' : 'mt-12'}
      `}>
        {/* Format and Size Controls Row */}
        <div className="flex justify-center gap-4">
          <Select
            value={downloadFormat}
            onValueChange={(value: 'png' | 'pdf') => setDownloadFormat(value)}
          >
            <SelectTrigger className={cn(
              "w-[120px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
              "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            )}>
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
              <SelectItem 
                value="png" 
                className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                PNG
              </SelectItem>
              <SelectItem 
                value="pdf"
                className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                PDF
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={downloadSize}
            onValueChange={setDownloadSize}
          >
            <SelectTrigger className={cn(
              "w-[120px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
              "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            )}>
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
              {['300', '400', '500', '600', '700', '800'].map((size) => (
                <SelectItem 
                  key={size}
                  value={size}
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {size}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Download and Print Buttons Row */}
        <div className="flex justify-center gap-4">
          <Button
            variant="default"
            className={cn(
              "w-[120px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
              "text-white shadow-md hover:shadow-lg transition-all duration-200",
              "border border-blue-700/20"
            )}
            onClick={handleDownload}
            disabled={!value}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <PrintButton 
            disabled={!value}
            qrCodeRef={qrRef}
            className={cn(
              "w-[120px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
              "text-white shadow-md hover:shadow-lg transition-all duration-200",
              "border border-blue-700/20"
            )}
          />
        </div>
      </div>
    </div>
  )
}