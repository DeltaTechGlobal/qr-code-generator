"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { QrCode as QRCode, ScanLine, GraduationCap, BookOpen, Library, HelpCircle, Lightbulb } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Footer } from '@/components/Footer'
import { Logo } from '@/components/Logo'
import { QRCodeGenerator } from '@/components/QRCodeGenerator'
import { QRCodeScanner } from '@/components/QRCodeScanner'
import { QRCodeInfo } from '@/components/QRCodeInfo'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <Logo />
            <div className="flex-1 text-center mx-8">
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                QR Code Generator
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Generate, scan, and learn about QR codes
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <Tabs defaultValue="generate" className="w-full max-w-4xl">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="generate">
              <QRCode className="h-4 w-4 mr-2" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="scan">
              <ScanLine className="h-4 w-4 mr-2" />
              Scan
            </TabsTrigger>
            <TabsTrigger value="info">
              <GraduationCap className="h-4 w-4 mr-2" />
              Learn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <QRCodeGenerator />
          </TabsContent>

          <TabsContent value="scan">
            <QRCodeScanner />
          </TabsContent>

          <TabsContent value="info">
            <QRCodeInfo />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  )
}
