"use client"

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center text-sm text-gray-600 dark:text-gray-400 space-y-2 sm:space-y-0">
          <span className="whitespace-nowrap">© {new Date().getFullYear()}</span>
          <span className="hidden sm:block mx-1">•</span>
          <span className="whitespace-nowrap">Developed by</span>
          <a 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mx-1 font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 whitespace-nowrap"
            href="https://deltatechglobal.co.uk/"
          >
            Delta Tech Global Limited
          </a>
          <span className="hidden sm:block mx-1">•</span>
          <span className="whitespace-nowrap">All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
} 