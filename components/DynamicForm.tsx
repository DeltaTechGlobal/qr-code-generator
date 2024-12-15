"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface DynamicFormProps {
  type: string
  onGenerate: (data: string) => void
}

export function DynamicForm({ type, onGenerate }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      let qrData = ''

      switch (type) {
        // ... your existing switch cases
      }

      onGenerate(qrData)

      // Show success toast
      toast({
        title: "QR Code Generated!",
        description: "Scroll down to see your QR code",
        className: "bg-green-50 dark:bg-green-900 border-green-200",
      })

      // Smooth scroll to QR code on mobile
      if (window.innerWidth < 768) {
        const qrElement = document.getElementById('qr-container')
        if (qrElement) {
          qrElement.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... rest of your form */}
      
      <Button 
        type="submit" 
        className="w-full relative"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate QR Code'
        )}
      </Button>
    </form>
  )
} 