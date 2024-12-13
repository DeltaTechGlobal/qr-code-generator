import fs from 'fs'
import path from 'path'
import QRCode from 'qrcode'

async function generateLogo() {
  try {
    // Create directories if they don't exist
    const publicDir = path.join(process.cwd(), 'public')
    const iconsDir = path.join(publicDir, 'icons')
    
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir)
    }
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir)
    }

    // Generate a simple QR code as the logo
    const qrBuffer = await QRCode.toBuffer('QR', {
      width: 128,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })

    // Save in different sizes
    const files = {
      'qr-logo.png': qrBuffer,
      'icons/icon16.png': qrBuffer,
      'icons/icon32.png': qrBuffer,
      'icons/icon48.png': qrBuffer,
      'icons/icon128.png': qrBuffer,
    }

    // Save all files
    Object.entries(files).forEach(([filename, buffer]) => {
      const filePath = path.join(publicDir, filename)
      fs.writeFileSync(filePath, buffer)
    })

    console.log('✅ Logo files generated successfully!')
  } catch (error) {
    console.error('Error generating logo:', error)
    process.exit(1)
  }
}

generateLogo() 