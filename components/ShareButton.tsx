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
  FaTwitter, 
  FaLinkedin, 
  FaFacebook, 
  FaTelegram,
  FaEnvelope
} from 'react-icons/fa'

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
    name: 'Twitter',
    icon: FaTwitter,
    color: '#1DA1F2',
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
      // Try native sharing first if available
      if (navigator.share) {
        try {
          await navigator.share({
            title,
            text: description,
            url: qrCodeUrl,
          })
          return
        } catch (err) {
          console.error('Native share failed:', err)
          // Fall back to platform-specific sharing
        }
      }

      // Platform specific sharing
      switch (platform.name) {
        case 'WhatsApp':
          window.open(`whatsapp://send?text=${encodeURIComponent(`${title}\n${qrCodeUrl}`)}`, '_blank')
          break
        case 'Twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(qrCodeUrl)}`, '_blank')
          break
        case 'Facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(qrCodeUrl)}`, '_blank')
          break
        case 'LinkedIn':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(qrCodeUrl)}`, '_blank')
          break
        case 'Telegram':
          window.open(`https://t.me/share/url?url=${encodeURIComponent(qrCodeUrl)}&text=${encodeURIComponent(title)}`, '_blank')
          break
        case 'Email':
          window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n${qrCodeUrl}`)}`
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