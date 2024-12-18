"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'
import html2canvas from 'html2canvas'
import { cn } from "@/lib/utils"

interface PrintButtonProps {
  disabled: boolean
  qrCodeRef: React.RefObject<HTMLDivElement>
  className?: string
}

export function PrintButton({ disabled, qrCodeRef, className }: PrintButtonProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = async () => {
    if (!qrCodeRef.current) return
    setIsPrinting(true)

    try {
      // Generate the QR code image using html2canvas
      const canvas = await html2canvas(qrCodeRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: qrCodeRef.current.offsetWidth,
        height: qrCodeRef.current.offsetHeight + 80, // Add padding for labels
        y: -40, // Offset to capture top label
      })

      // Convert canvas to data URL
      const imageUrl = canvas.toDataURL('image/png')

      // Create print window
      const printWindow = window.open('', '', 'width=800,height=600')
      if (!printWindow) return

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body {
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: white;
                font-family: system-ui, -apple-system, sans-serif;
              }
              .qr-container {
                padding: 40px;
                background: white;
                text-align: center;
                position: relative;
              }
              .qr-image {
                max-width: 100%;
                height: auto;
                display: block;
                margin: 0 auto;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              @media print {
                body {
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                  color-adjust: exact;
                }
                @page {
                  size: auto;
                  margin: 15mm;
                }
                .qr-container {
                  padding: 0;
                  page-break-inside: avoid;
                }
                .qr-image {
                  max-width: 90%;
                }
              }
              @media screen {
                .qr-container {
                  max-width: 600px;
                  margin: 20px;
                }
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <img src="${imageUrl}" alt="QR Code" class="qr-image" />
            </div>
            <script>
              window.onload = () => {
                // Wait for image to load before printing
                const img = document.querySelector('.qr-image');
                if (img.complete) {
                  setTimeout(printAndClose, 500);
                } else {
                  img.onload = () => setTimeout(printAndClose, 500);
                }
                
                function printAndClose() {
                  window.print();
                  setTimeout(() => window.close(), 500);
                }
              };
            </script>
          </body>
        </html>
      `)

      printWindow.document.close()
    } catch (error) {
      console.error('Error printing:', error)
    } finally {
      setIsPrinting(false)
    }
  }

  return (
    <Button
      variant="default"
      className={cn(
        className,
        disabled && "opacity-50 cursor-not-allowed",
        isPrinting && "bg-gradient-to-r from-blue-700 to-blue-800"
      )}
      disabled={disabled || isPrinting}
      onClick={handlePrint}
    >
      <Printer className={cn(
        "mr-2 h-4 w-4",
        isPrinting && "animate-pulse"
      )} />
      {isPrinting ? 'Printing...' : 'Print'}
    </Button>
  )
} 