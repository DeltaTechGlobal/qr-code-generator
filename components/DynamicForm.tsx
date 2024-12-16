"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface DynamicFormProps {
  type: string
  onGenerate: (data: string) => void
}

export function DynamicForm({ type, onGenerate }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const renderFields = () => {
    switch (type) {
      case 'URL':
        return (
          <div className="space-y-2">
            <Label htmlFor="url">Website</Label>
            <Input
              type="url"
              id="url"
              placeholder="Enter your website"
              value={formData.url || ''}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Example: https://www.example.com
            </p>
          </div>
        )
      case 'WiFi':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ssid">Network Name (SSID)</Label>
              <Input
                type="text"
                id="ssid"
                placeholder="Enter network name"
                value={formData.ssid || ''}
                onChange={(e) => setFormData({ ...formData, ssid: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter network password"
                value={formData.password || ''}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
        )
      case 'Text':
        return (
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Input
              type="text"
              id="text"
              placeholder="Enter your text"
              value={formData.text || ''}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            />
          </div>
        )
      case 'event':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                type="text"
                id="title"
                required
                placeholder="Enter event title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                placeholder="Enter event location"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                type="datetime-local"
                id="startTime"
                required
                value={formData.startTime || ''}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                type="datetime-local"
                id="endTime"
                required
                value={formData.endTime || ''}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminder">Reminder Before Event</Label>
              <Select 
                value={formData.reminder || '15'} 
                onValueChange={(value) => setFormData({ ...formData, reminder: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reminder time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Link (Optional)</Label>
              <Input
                type="url"
                id="url"
                placeholder="Enter related URL"
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      let qrData = ''

      switch (type) {
        case 'URL':
          qrData = formData.url || ''
          break
        case 'WiFi':
          qrData = `WIFI:S:${formData.ssid};T:WPA;P:${formData.password};;`
          break
        case 'Text':
          qrData = formData.text || ''
          break
        case 'event':
          const startDate = new Date(formData.startTime || '')
          const endDate = new Date(formData.endTime || '')
          const reminderMinutes = parseInt(formData.reminder || '15')
          
          // Format dates for iCalendar
          const formatDate = (date: Date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
          }
          
          const eventData = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `SUMMARY:${formData.title || ''}`,
            `DTSTART:${formatDate(startDate)}`,
            `DTEND:${formatDate(endDate)}`,
            formData.location ? `LOCATION:${formData.location}` : '',
            formData.url ? `URL:${formData.url}` : '',
            formData.notes ? `DESCRIPTION:${formData.notes}` : '',
            `BEGIN:VALARM`,
            `TRIGGER:-PT${reminderMinutes}M`,
            `ACTION:DISPLAY`,
            `DESCRIPTION:Reminder`,
            `END:VALARM`,
            'END:VEVENT',
            'END:VCALENDAR'
          ].filter(Boolean).join('\n')
          
          qrData = eventData
          break
        default:
          qrData = ''
      }

      onGenerate(qrData)

      toast({
        title: "QR Code Generated!",
        description: "Scroll down to see your QR code",
        className: "bg-green-50 dark:bg-green-900 border-green-200",
      })

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
        className: "bg-red-50 dark:bg-red-900 border-red-200",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderFields()}
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