const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

type ExecCallback = (error: Error | null, stdout: string, stderr: string) => void

async function buildExtension(): Promise<void> {
  try {
    // Run Next.js build
    await execCommand('yarn build')

    // Copy manifest and icons to out directory
    copyFile('manifest.json', 'out/manifest.json')
    copyDirectory('public/icons', 'out/icons')

    console.log('Extension build completed successfully!')
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

function execCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(command, ((error: Error | null, stdout: string, stderr: string) => {
      if (error) {
        console.error(stdout)
        console.error(stderr)
        reject(error)
        return
      }
      console.log(stdout)
      resolve()
    }) as ExecCallback)
  })
}

function copyFile(source: string, destination: string): void {
  fs.copyFileSync(source, destination)
}

function copyDirectory(source: string, destination: string): void {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true })
  }

  const files = fs.readdirSync(source)
  files.forEach((file: string) => {
    const sourcePath = path.join(source, file)
    const destPath = path.join(destination, file)
    fs.copyFileSync(sourcePath, destPath)
  })
}

buildExtension() 