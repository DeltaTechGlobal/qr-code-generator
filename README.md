# QR Code Generator

A modern, feature-rich QR Code Generator built with Next.js 14, TypeScript, and Tailwind CSS. Generate QR codes for various purposes including URLs, WiFi credentials, email, social media profiles, visiting cards, cryptocurrency transactions, and plain text.

## Features

- Multiple QR Code types support
- Customizable QR Code appearance
  - Custom colors (foreground and background)
  - Frame styles (none, square, rounded)
  - Frame labels with position control
  - Logo upload capability
- Dark/Light theme support
- Responsive design
- PNG download functionality
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js 18.17 or later
- Yarn package manager

### Installing Prerequisites on macOS

1. Install Homebrew (if not already installed):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install Node.js:
```bash
brew install node
```

3. Install Yarn:
```bash
brew install yarn
```

4. Verify installations:
```bash
node --version  # Should be 18.17 or later
yarn --version
```

## Installation

1. Clone the repository: 
```

## Build for Production

To create a production build:

```bash
yarn build
```

To start the production server:

```bash
yarn start
```

## Deployment to GitHub Pages

1. Fork this repository
2. Update `next.config.js` with your repository name:
    ```js
    basePath: '/your-repo-name',
    assetPrefix: '/your-repo-name/',
    ```
3. Push to your GitHub repository
4. Enable GitHub Pages in your repository settings:
    - Go to Settings > Pages
    - Set Source to "GitHub Actions"
5. The site will be automatically deployed when you push to the main branch

## Technology Stack