"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Upload, ScanLine, AlertCircle, XCircle, FileWarning } from 'lucide-react'
import jsQR from 'jsqr'

interface ScanError {
  type: 'invalid_file' | 'no_qr_code' | 'processing_error'
  message: string
}

export function QRCodeScanner() {
  const [scannedData, setScannedData] = useState<string>('')
  const [error, setError] = useState<ScanError | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const { toast } = useToast()

  const handleImageUpload = useCallback(async (file: File) => {
    // Reset previous states
    setError(null)
    setScannedData('')

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError({
        type: 'invalid_file',
        message: 'Invalid file type. Please upload a valid image file (PNG, JPG, GIF).'
      })
      toast({
        title: "Invalid File Type",
        description: "Please select a valid image file.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError({
        type: 'invalid_file',
        message: 'File size exceeds 10MB limit. Please upload a smaller file.'
      })
      toast({
        title: "File Too Large",
        description: "Maximum file size is 10MB.",
        variant: "destructive",
      })
      return
    }

    let objectUrl = ''
    try {
      const image = new Image()
      objectUrl = URL.createObjectURL(file)
      image.src = objectUrl
      
      await new Promise((resolve, reject) => {
        image.onload = resolve
        image.onerror = () => reject(new Error('Failed to load image'))
      })

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) {
        throw new Error('Failed to get canvas context')
      }

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
        setError({
          type: 'no_qr_code',
          message: 'No QR code detected in the uploaded image. Please try again with a valid QR code image.'
        })
        toast({
          title: "No QR Code Found",
          description: "Please upload an image containing a QR code.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setError({
        type: 'processing_error',
        message: 'Failed to process the image. Please try again with a different image.'
      })
      toast({
        title: "Processing Error",
        description: "Failed to scan the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [toast])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleImageUpload(file)
    }
  }, [handleImageUpload])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const getErrorIcon = (type: ScanError['type']) => {
    switch (type) {
      case 'invalid_file':
        return <FileWarning className="h-5 w-5 text-red-500" />
      case 'no_qr_code':
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case 'processing_error':
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
      <CardHeader>
        <h1 className="text-2xl font-bold">QR Code Scanner</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload or drag and drop a QR code image to scan instantly
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Error Display */}
          {error && (
            <div className={`
              p-4 rounded-lg flex items-start gap-3
              ${error.type === 'no_qr_code' 
                ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }
            `}>
              {getErrorIcon(error.type)}
              <div className="space-y-1">
                <h4 className={`font-medium ${
                  error.type === 'no_qr_code' 
                    ? 'text-amber-800 dark:text-amber-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {error.type === 'invalid_file' ? 'Invalid File' 
                    : error.type === 'no_qr_code' ? 'No QR Code Detected'
                    : 'Processing Error'}
                </h4>
                <p className={`text-sm ${
                  error.type === 'no_qr_code'
                    ? 'text-amber-700 dark:text-amber-300'
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {error.message}
                </p>
              </div>
            </div>
          )}

          {/* Upload Area */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center 
              cursor-pointer transition-all duration-200
              ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}
              ${error ? 'border-red-200 dark:border-red-800' : 'border-blue-200 dark:border-blue-800'}
              ${!error && !isDragging && 'hover:border-blue-500 dark:hover:border-blue-400'}
              bg-gray-50 dark:bg-gray-900
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center gap-4">
              <div className={`
                p-4 rounded-full 
                ${isDragging ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-blue-50 dark:bg-blue-900/20'}
              `}>
                <Upload className={`
                  h-8 w-8 
                  ${isDragging ? 'text-blue-600' : 'text-blue-500'}
                `} />
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-sm">
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
                  <span className="text-gray-500 dark:text-gray-400">
                    or drag and drop
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Results Area */}
          {scannedData && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <ScanLine className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold">Scan Results</h3>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <pre className="whitespace-pre-wrap break-words text-sm text-gray-600 dark:text-gray-400">
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