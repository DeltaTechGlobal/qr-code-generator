"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  Zap, 
  Shield, 
  Smartphone, 
  Share2, 
  Building2, 
  Users, 
  Scan, 
  HelpCircle,
  CheckCircle2
} from "lucide-react"

export function QRCodeInfo() {
  return (
    <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <section className="text-center space-y-4 pb-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              About QR Codes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              QR codes (Quick Response codes) are two-dimensional barcodes that revolutionize how we share information. Created in 1994 by Denso Wave, they've become an integral part of our digital world, enabling instant access to data through simple scans.
            </p>
          </section>

          {/* Key Benefits Section */}
          <section className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Zap className="h-6 w-6 text-blue-500" />
              Key Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: <Scan className="h-5 w-5 text-green-500" />,
                  title: "Quick Scanning",
                  description: "Instant data access with any smartphone camera"
                },
                {
                  icon: <Shield className="h-5 w-5 text-blue-500" />,
                  title: "Error Correction",
                  description: "Remains readable even when partially damaged"
                },
                {
                  icon: <Share2 className="h-5 w-5 text-purple-500" />,
                  title: "Versatile Sharing",
                  description: "Share any type of data seamlessly"
                },
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    {benefit.icon}
                    <div>
                      <h4 className="font-medium mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Users className="h-6 w-6 text-purple-500" />
              Common Applications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-500" />
                  <h4 className="font-medium">Personal Use</h4>
                </div>
                <ul className="space-y-3">
                  {[
                    "Digital Business Cards",
                    "WiFi Network Sharing",
                    "Event Ticket Access",
                    "Social Media Profiles",
                    "Personal Portfolio Links"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-500" />
                  <h4 className="font-medium">Business Use</h4>
                </div>
                <ul className="space-y-3">
                  {[
                    "Product Information",
                    "Marketing Campaigns",
                    "Payment Solutions",
                    "Customer Engagement",
                    "Analytics Tracking"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-blue-500" />
              Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="hover:no-underline hover:text-blue-500">
                  How do QR codes work?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  QR codes work by encoding data in a pattern of black and white squares. When scanned, this pattern is decoded back into its original information, which can be text, URLs, or other data types.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="hover:no-underline hover:text-blue-500">
                  What types of data can be stored in a QR code?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  QR codes can store various types of data including website URLs, plain text, contact information (vCard), calendar events, email addresses, phone numbers, SMS messages, Wi-Fi credentials, and more.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="hover:no-underline hover:text-blue-500">
                  Are QR codes secure?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  QR codes themselves are just a way to store data. Their security depends on how they're used. It's important to only scan QR codes from trusted sources, as they could potentially link to malicious websites.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="hover:no-underline hover:text-blue-500">
                  How much data can a QR code store?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  A QR code can store up to 4,296 alphanumeric characters or 7,089 numeric characters. The actual capacity depends on the version of the QR code and the type of data being encoded.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="hover:no-underline hover:text-blue-500">
                  What's the difference between static and dynamic QR codes?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  Static QR codes contain fixed information that cannot be changed after creation. Dynamic QR codes point to a URL that can be modified later, allowing you to update the destination without creating a new QR code. Dynamic codes also often provide scan analytics and tracking capabilities.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="hover:no-underline hover:text-blue-500">
                  Can I customize the appearance of my QR code?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  Yes, QR codes can be customized while maintaining their functionality. You can change colors, add logos, and modify the pattern style. However, it's important to maintain sufficient contrast and not modify the code too drastically to ensure it remains scannable.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="hover:no-underline hover:text-blue-500">
                  What makes a QR code scannable?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  Several factors affect QR code scannability:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Adequate size (minimum 2x2 cm recommended)</li>
                    <li>Good contrast between dark and light elements</li>
                    <li>Sufficient quiet zone (white space) around the code</li>
                    <li>Proper lighting when scanning</li>
                    <li>Clean, undamaged surface</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="hover:no-underline hover:text-blue-500">
                  Do I need a special app to scan QR codes?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  Most modern smartphones can scan QR codes directly through their native camera apps. For older devices, you may need to download a QR code scanner app. Both iOS and Android devices have this functionality built into their default camera applications.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="hover:no-underline hover:text-blue-500">
                  What are the best practices for QR code placement?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  For optimal QR code placement:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Place at eye level when possible</li>
                    <li>Ensure adequate lighting in the scanning area</li>
                    <li>Avoid reflective surfaces</li>
                    <li>Include a clear call-to-action</li>
                    <li>Make sure the code is easily accessible</li>
                    <li>Consider the scanning distance in your size choice</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="hover:no-underline hover:text-blue-500">
                  Can QR codes be tracked or analyzed?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  Yes, dynamic QR codes can be tracked and analyzed. You can monitor metrics such as:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Number of scans</li>
                    <li>Location of scans</li>
                    <li>Time and date of scans</li>
                    <li>Device types used</li>
                    <li>Conversion rates</li>
                  </ul>
                  This data can be valuable for marketing campaigns and user engagement analysis.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </CardContent>
    </Card>
  )
} 