"use client"

import Image from 'next/image'

export function Logo() {
  return (
    <div className="relative w-20 h-20">
      <Image
        src="/qr-logo.png"
        alt="QR Code Eagle Logo"
        width={80}
        height={80}
        priority
        className="object-contain"
      />
    </div>
  )
} 