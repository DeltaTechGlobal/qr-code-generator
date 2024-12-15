"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  FaWhatsapp, 
  FaXTwitter, 
  FaLinkedin, 
  FaFacebook, 
  FaTelegram,
  FaEnvelope
} from 'react-icons/fa6'

interface ShareButtonProps {
  disabled: boolean
  qrCodeUrl: string
  title?: string
  description?: string
  className?: string
}

const SHARE_PLATFORMS = [
  {
    name: 'WhatsApp',
    icon: FaWhatsapp,
    color: '#25D366',
  },
  {
    name: 'X',
    icon: FaXTwitter,
    color: '#000000',
  },
  {
    name: 'Facebook',
    icon: FaFacebook,
    color: '#1877F2',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    color: '#0A66C2',
  },
  {
    name: 'Telegram',
    icon: FaTelegram,
    color: '#0088cc',
  },
  {
    name: 'Email',
    icon: FaEnvelope,
    color: '#333333',
  }
] as const

export function ShareButton({ 
  disabled, 
  qrCodeUrl, 
  title = '', 
  description = '',
  className = '' 
}: ShareButtonProps) {
  const handleShare = async (platform: typeof SHARE_PLATFORMS[number]) => {
    try {
      // Convert URL to Blob for sharing
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const file = new File([blob], 'qr-code.png', { type: 'image/png' })

      // Try native sharing first if available
      if (navigator.share) {
        try {
          await navigator.share({
            title,
            text: description,
            files: [file],
          })
          return
        } catch (err) {
          console.error('Native share failed:', err)
        }
      }

      // Platform specific sharing
      switch (platform.name) {
        case 'WhatsApp':
          // WhatsApp doesn't support direct image sharing via URL
          // Create a form and submit it
          const formData = new FormData()
          formData.append('file', file)
          formData.append('text', `${title}\n${description}`)
          
          window.open(`whatsapp://send?text=${encodeURIComponent(`${title}\n${description}\n${window.location.href}`)}`, '_blank')
          break

        case 'X':
          // X Web Intent with image
          const xFormData = new FormData()
          xFormData.append('media[]', file)
          xFormData.append('text', title)
          
          window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(`${title}\n${description}\n${window.location.href}`)}`, '_blank')
          break

        case 'Facebook':
          // Facebook sharing
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')
          break

        case 'LinkedIn':
          // LinkedIn sharing
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')
          break

        case 'Telegram':
          // Telegram sharing
          window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`${title}\n${description}`)}`, '_blank')
          break

        case 'Email':
          // Email with attachment
          const emailBody = `${description}\n\n${window.location.href}`
          const mailtoLink = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(emailBody)}`
          
          // Create a temporary link to download the image
          const downloadLink = document.createElement('a')
          downloadLink.href = URL.createObjectURL(file)
          downloadLink.download = 'qr-code.png'
          downloadLink.click()
          
          // Open email client
          window.location.href = mailtoLink
          break
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`flex items-center justify-center ${className}`}
          disabled={disabled}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {SHARE_PLATFORMS.map((platform) => {
          const Icon = platform.icon
          return (
            <DropdownMenuItem
              key={platform.name}
              onClick={() => handleShare(platform)}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Icon 
                className="w-4 h-4" 
                style={{ color: platform.color }}
              />
              <span>{platform.name}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 