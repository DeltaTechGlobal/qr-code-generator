"use client"

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
          <span>© {new Date().getFullYear()}</span>
          <span>Developed by</span>
          <Link 
            href="https://deltatechglobal.co.uk/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Delta Tech Global Limited
          </Link>
          <span>•</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
} 