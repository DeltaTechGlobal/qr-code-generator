"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogoSelector } from './LogoSelector'
import { FormDataType } from '@/app/types'

const FRAME_STYLES = [
  { value: 'bottom-frame', label: 'Bottom Frame' },
  { value: 'top-frame', label: 'Top Frame' },
  { value: 'bottom-tooltip', label: 'Bottom Tooltip' },
  { value: 'top-header', label: 'Top Header' },
  { value: 'none', label: 'No Frame' },
] as const

export function Customization({ 
  color, 
  bgColor, 
  frame, 
  frameLabel,
  type,
  paymentType,
  onColorChange, 
  onBgColorChange, 
  onFrameChange,
  onFrameLabelChange,
  onLogoChange,
  formData,
  setFormData
}: {
  color: string,
  bgColor: string,
  frame: string,
  frameLabel: string,
  type: string,
  paymentType?: string,
  onColorChange: (color: string) => void,
  onBgColorChange: (color: string) => void,
  onFrameChange: (frame: string) => void,
  onFrameLabelChange: (label: string) => void,
  onLogoChange: (logo: string | undefined) => void,
  formData: FormDataType,
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
}) {
  const handleLogoChange = (logo: string | undefined) => {
    onLogoChange(logo)
    setFormData(prev => ({ ...prev, logo }))
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Customize Your QR Code</h2>
      
      {/* Colors Section */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="color" className="dark:text-gray-300">Foreground Color</Label>
            <Input
              type="color"
              id="color"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="h-10"
            />
          </div>
          <div>
            <Label htmlFor="bgColor" className="dark:text-gray-300">Background Color</Label>
            <Input
              type="color"
              id="bgColor"
              value={bgColor}
              onChange={(e) => onBgColorChange(e.target.value)}
              className="h-10"
            />
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Logo</h3>
        <LogoSelector 
          type={type}
          paymentType={paymentType}
          onLogoChange={handleLogoChange}
          formData={formData}
        />
      </div>

      {/* Frame Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Frame</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="frame" className="dark:text-gray-300">Frame Style</Label>
            <Select value={frame} onValueChange={onFrameChange}>
              <SelectTrigger id="frame">
                <SelectValue placeholder="Choose frame style" />
              </SelectTrigger>
              <SelectContent>
                {FRAME_STYLES.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {frame !== 'none' && (
            <div>
              <div className="flex justify-between">
                <Label htmlFor="frameLabel" className="dark:text-gray-300">Frame Text</Label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {frameLabel.length}/25
                </span>
              </div>
              <Input
                type="text"
                id="frameLabel"
                value={frameLabel}
                onChange={(e) => {
                  if (e.target.value.length <= 25) {
                    onFrameLabelChange(e.target.value)
                  }
                }}
                maxLength={25}
                placeholder="Enter frame text"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

