#!/bin/bash

# Exit on error
set -e

echo "🏗️  Building Chrome Extension..."

# Remove old build
rm -rf out
mkdir -p out

# Build Next.js app
echo "📦 Building Next.js app..."
next build

# Create icons directory if it doesn't exist
echo "🎨 Setting up icons..."
mkdir -p public/icons
mkdir -p out/icons

# Generate default icon if none exists
if [ ! "$(ls -A public/icons)" ]; then
  echo "⚠️  No icons found, generating default icons..."
  # Copy default QR code icon to different sizes
  cp public/qr-logo.png public/icons/icon16.png
  cp public/qr-logo.png public/icons/icon32.png
  cp public/qr-logo.png public/icons/icon48.png
  cp public/qr-logo.png public/icons/icon128.png
fi

# Copy manifest and icons
echo "📝 Copying extension files..."
cp manifest.json out/
cp -r public/icons/* out/icons/

# Fix asset paths in HTML files
echo "🔧 Fixing asset paths..."
find out -name "*.html" -exec sed -i '' 's|"/_next/|"./_next/|g' {} \;

echo "✅ Extension built successfully!" 