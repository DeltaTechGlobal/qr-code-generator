import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://generateqrcode.online'

interface MetadataProps {
  title: string
  description: string
  path: string
}

export const generateMetadata = ({ title, description, path }: MetadataProps): Metadata => {
  const fullUrl = `${baseUrl}${path}`
  
  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'QR Code Generator',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    keywords: [
      'QR code generator',
      'QR code scanner',
      'QR code maker',
      'free QR code',
      'custom QR codes',
      'QR code creator',
      'QR code reader',
      'QR code tutorial',
      'QR code guide',
    ],
    authors: [{ name: 'Sabah u din Irfan' }],
    creator: 'Sabah u din Irfan',
    publisher: 'Delta Tech Global Limited',
    robots: 'index, follow',
    alternates: {
      canonical: fullUrl,
    },
  }
}

export const sectionMetadata = {
  generator: {
    title: 'Free QR Code Generator - Create Custom QR Codes Online',
    description: 'Easily generate custom QR codes for personal or business use. Create free, high-quality QR codes with our user-friendly QR code generator tool.',
    path: '/',
  },
  scanner: {
    title: 'QR Code Scanner - Upload, Scan, and Decode QR Codes Instantly',
    description: 'Upload or drag-and-drop a QR code image to quickly scan and decode the information. Fast, reliable, and free QR code scanner tool.',
    path: '/scan',
  },
  learn: {
    title: 'What is a QR Code? Learn Uses, Benefits, and FAQs',
    description: 'Discover what QR codes are, their practical uses, and benefits for personal and business applications. Explore FAQs and general information on QR codes.',
    path: '/learn',
  },
} 