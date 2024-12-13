"use client"

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Apple, ShoppingBag, Chrome, Store } from 'lucide-react'

interface DynamicFormProps {
  type: string
  onGenerate: (data: string) => void
}

const APP_STORES = [
  { value: 'apple', label: 'Apple App Store', icon: Apple },
  { value: 'google', label: 'Google Play Store', icon: Store },
  { value: 'amazon', label: 'Amazon Appstore', icon: ShoppingBag },
  { value: 'chrome', label: 'Chrome Web Store', icon: Chrome },
] as const

export function DynamicForm({ type, onGenerate }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  useEffect(() => {
    setFormData({}) // Reset form when type changes
  }, [type])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let qrData = ''

    switch (type) {
      case 'APP_STORE':
        switch (formData.store) {
          case 'apple':
            qrData = `https://apps.apple.com/app/${formData.appId}`
            break
          case 'google':
            qrData = `https://play.google.com/store/apps/details?id=${formData.appId}`
            break
          case 'amazon':
            qrData = `https://www.amazon.com/dp/${formData.appId}`
            break
          case 'chrome':
            qrData = `https://chrome.google.com/webstore/detail/${formData.appId}`
            break
        }
        break
      case 'SMS':
        qrData = `SMSTO:${formData.phone}:${formData.message}`
        break
      default:
        qrData = formData.text || ''
    }

    onGenerate(qrData)
  }

  const renderFields = () => {
    switch (type) {
      case 'APP_STORE':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store">App Store</Label>
              <Select 
                value={formData.store} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, store: value }))}
              >
                <SelectTrigger id="store" className="w-full">
                  <SelectValue placeholder="Select app store" />
                </SelectTrigger>
                <SelectContent>
                  {APP_STORES.map(({ value, label, icon: Icon }) => (
                    <SelectItem 
                      key={value} 
                      value={value}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="appId">
                {formData.store === 'apple' ? 'App ID or Bundle ID' :
                 formData.store === 'google' ? 'Package Name' :
                 formData.store === 'amazon' ? 'ASIN' :
                 formData.store === 'chrome' ? 'Extension ID' : 'App ID'}
              </Label>
              <Input
                id="appId"
                placeholder={
                  formData.store === 'apple' ? 'id123456789 or com.example.app' :
                  formData.store === 'google' ? 'com.example.app' :
                  formData.store === 'amazon' ? 'B01234567' :
                  formData.store === 'chrome' ? 'extension-id' : 'Enter app ID'
                }
                value={formData.appId || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, appId: e.target.value }))}
                className="w-full"
              />
            </div>
          </div>
        )
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

