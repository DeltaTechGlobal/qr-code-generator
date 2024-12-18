import { MetadataRoute } from 'next'
import { sectionMetadata } from '@/lib/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://generateqrcode.online'
  
  return [
    {
      url: `${baseUrl}${sectionMetadata.generator.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}${sectionMetadata.scanner.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${sectionMetadata.learn.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
} 