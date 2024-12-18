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
  MessageSquare,
  Globe,
  Store,
  Calendar,
  Video,
  Wallet,
  Twitter
} from 'lucide-react'

interface TypeSelectorProps {
  selectedType: string
  onTypeChange: (value: string) => void
}

export type QRCodeType = 
  | 'text' 
  | 'url' 
  | 'email' 
  | 'phone' 
  | 'sms' 
  | 'wifi' 
  | 'zoom'
  | 'payment'
  | 'TWITTER'

export const typeOptions = [
  { value: 'Event', label: 'Calendar Event', icon: Calendar },
  { value: 'VCARD', label: 'vCard Contact', icon: CreditCard },
  { value: 'WIFI', label: 'WiFi Network', icon: Wifi },
  { value: 'SOCIAL', label: 'Social Profile', icon: Share2 },
  { value: 'APP_STORE', label: 'App Store', icon: Store },
  { value: 'URL', label: 'Website URL', icon: Globe },
  { value: 'SMS', label: 'SMS Message', icon: MessageSquare },
  { value: 'PHONE', label: 'Phone Number', icon: Phone },
  { value: 'EMAIL', label: 'Compose Email', icon: Mail },
  { value: 'GEO', label: 'Location', icon: MapPin },
  { value: 'TEXT', label: 'Plain Text', icon: FileText },
  { value: 'zoom', label: 'Zoom Meeting', icon: Video },
  { value: 'PAYMENT', label: 'Payment', icon: Wallet },
  { value: 'TWITTER', label: 'X Tweet', icon: Twitter },
] as const

export function TypeSelector({ selectedType, onTypeChange }: TypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          QR Code Type
        </label>
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map(({ value, label, icon: Icon }) => (
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
    </div>
  )
}
