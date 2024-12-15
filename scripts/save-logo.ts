import fs from 'fs'
import path from 'path'

// Convert the image to base64 and save it
const imageData = `data:image/png;base64,<base64_data_here>`
const base64Data = imageData.replace(/^data:image\/png;base64,/, '')

fs.writeFileSync(
  path.join(process.cwd(), 'public', 'logo.png'),
  Buffer.from(base64Data, 'base64')
) 