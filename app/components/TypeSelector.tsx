"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Link, 
  Mail, 
  Wifi, 
  Phone, 
  CreditCard, 
  MapPin, 
  FileText, 
  Share2, 
  Smartphone,
  Globe
} from 'lucide-react'

interface TypeSelectorProps {
  selectedType: string
  onTypeChange: (value: string) => void
}

const QR_TYPES = [
  { value: 'URL', label: 'Website URL', icon: Globe },
  { value: 'EMAIL', label: 'Email Address', icon: Mail },
  { value: 'WIFI', label: 'WiFi Network', icon: Wifi },
  { value: 'PHONE', label: 'Phone Number', icon: Phone },
  { value: 'VCARD', label: 'Contact Card', icon: CreditCard },
  { value: 'GEO', label: 'Location', icon: MapPin },
  { value: 'SMS', label: 'SMS Message', icon: Smartphone },
  { value: 'TEXT', label: 'Plain Text', icon: FileText },
  { value: 'SOCIAL', label: 'Social Profile', icon: Share2 },
] as const

export function TypeSelector({ selectedType, onTypeChange }: TypeSelectorProps) {
  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        QR Code Type
      </label>
      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          {QR_TYPES.map(({ value, label, icon: Icon }) => (
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
  )
}

