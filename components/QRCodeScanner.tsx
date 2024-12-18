"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Upload, ScanLine } from 'lucide-react'
import jsQR from 'jsqr'

export function QRCodeScanner() {
  const [scannedData, setScannedData] = useState<string>('')
  const { toast } = useToast()

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      const image = new Image()
      image.src = URL.createObjectURL(file)
      
      await new Promise((resolve) => {
        image.onload = resolve
      })

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) return

      canvas.width = image.width
      canvas.height = image.height
      context.drawImage(image, 0, 0)

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code) {
        setScannedData(code.data)
        toast({
          title: "QR Code Scanned Successfully!",
          description: "The QR code content has been extracted.",
          className: "bg-green-50 dark:bg-green-900 border-green-200",
        })
      } else {
        toast({
          title: "No QR Code Found",
          description: "Please upload a clear image containing a QR code.",
          className: "bg-red-50 dark:bg-red-900 border-red-200",
        })
      }
    } catch (error) {
      toast({
        title: "Scanning Failed",
        description: "There was an error processing the image.",
        className: "bg-red-50 dark:bg-red-900 border-red-200",
      })
    }
  }, [toast])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file)
    }
  }, [handleImageUpload])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
              >
                <span>Upload a file</span>
                <Input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(file)
                  }}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>

          {scannedData && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ScanLine className="h-5 w-5" />
                Scanned QR Code Content
              </h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <pre className="whitespace-pre-wrap break-words text-sm">
                  {scannedData}
                </pre>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 