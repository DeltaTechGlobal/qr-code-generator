"use client"

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface DynamicFormProps {
  type: string
  onGenerate: (data: string) => void
}

export function DynamicForm({ type, onGenerate }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  useEffect(() => {
    setFormData({}) // Reset form when type changes
  }, [type])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let qrData = ''

    switch (type) {
      case 'SMS':
        qrData = `SMSTO:${formData.phone}:${formData.message}`
        break
      // ... other cases
      default:
        qrData = formData.text || ''
    }

    onGenerate(qrData)
  }

  const renderFields = () => {
    switch (type) {
      case 'SMS':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={formData.phone || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message here"
                value={formData.message || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full min-h-[100px]"
              />
            </div>
          </div>
        )
      // ... other cases
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Input
              id="text"
              placeholder="Enter text"
              value={formData.text || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              className="w-full"
            />
          </div>
        )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderFields()}
      <Button type="submit" className="w-full">
        Generate QR Code
      </Button>
    </form>
  )
}

