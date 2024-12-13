"use client"

import Image from 'next/image'
import { useRouter } from 'next/router'

export function Logo() {
  const basePath = process.env.NODE_ENV === 'production' ? '/qr-code-generator' : ''
  return (
    <div className="relative w-20 h-20">
      <Image
        src={`${basePath}/qr-logo.png`}
        alt="QR Code Eagle Logo"
        width={80}
        height={80}
        priority
        className="object-contain"
      />
    </div>
  )
} 