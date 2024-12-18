"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaWhatsapp, FaXTwitter, FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa6'

interface ShareButtonProps {
  disabled: boolean
  qrCodeUrl: string
  title: string
  description: string
  className?: string
}

export function ShareButton({ disabled, qrCodeUrl, title, description, className }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async (platform: string) => {
    if (!qrCodeUrl) return
    setIsSharing(true)

    try {
      // First generate a shareable image URL
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const file = new File([blob], 'qr-code.png', { type: 'image/png' })
      
      // For native sharing on mobile devices
      const shareData = {
        files: [file],
        title,
        text: description,
      }

      switch (platform) {
        case 'whatsapp':
          if (navigator.canShare && navigator.canShare(shareData)) {
            // Use native sharing on mobile
            await navigator.share(shareData)
          } else {
            // Create a temporary URL for the image
            const imageUrl = URL.createObjectURL(blob)
            const text = `${description}\n\nQR Code: ${imageUrl}`
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
          }
          break

        case 'twitter':
          if (navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData)
          } else {
            // Upload image to a temporary storage service and get URL
            // For now, we'll use the data URL
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
              const base64data = reader.result as string
              const tweetText = `${description}\n\n${base64data}`
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank')
            }
          }
          break

        case 'facebook':
          // Facebook requires a server-side implementation to share images
          // For now, we'll share the URL with description
          const fbUrl = `https://www.facebook.com/dialog/share?app_id=YOUR_FB_APP_ID&display=popup&href=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(description)}`
          window.open(fbUrl, '_blank')
          break

        case 'linkedin':
          // LinkedIn also requires server-side implementation for image sharing
          const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
          window.open(linkedinUrl, '_blank')
          break

        case 'email':
          // Create a FormData object for the email
          const formData = new FormData()
          formData.append('attachment', file, 'qr-code.png')
          
          // Create a data URL for the image
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            const imageData = reader.result as string
            const emailBody = `${description}\n\n${imageData}`
            const mailtoLink = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(emailBody)}`
            window.location.href = mailtoLink
          }
          break

        default:
          // Try native sharing
          if (navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData)
          }
      }
    } catch (error) {
      console.error('Error sharing:', error)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={className}
          disabled={disabled || isSharing}
        >
          <Share2 className="mr-2 h-4 w-4" />
          {isSharing ? 'Sharing...' : 'Share'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem onClick={() => handleShare('whatsapp')} className="flex items-center gap-2">
          <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('twitter')} className="flex items-center gap-2">
          <FaXTwitter className="w-4 h-4" />
          X (Twitter)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('facebook')} className="flex items-center gap-2">
          <FaFacebook className="w-4 h-4 text-[#1877F2]" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('linkedin')} className="flex items-center gap-2">
          <FaLinkedin className="w-4 h-4 text-[#0A66C2]" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('email')} className="flex items-center gap-2">
          <FaEnvelope className="w-4 h-4 text-gray-600" />
          Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 