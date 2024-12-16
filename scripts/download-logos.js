const fs = require('fs');
const https = require('https');
const path = require('path');

const logoUrls = {
  'paypal': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/paypal.svg',
  'bitcoin': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/bitcoin.svg',
  'ethereum': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/ethereum.svg',
  'litecoin': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/litecoin.svg',
  'dogecoin': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/dogecoin.svg',
  'solana': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/solana.svg',
  'usdt': 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
  'usdc': 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg',
  'cashapp': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/cashapp.svg',
  'venmo': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/venmo.svg',
  'googlepay': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlepay.svg',
  'applepay': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/applepay.svg',
  'wechat': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/wechat.svg',
  'alipay': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/alipay.svg',
  'url': 'https://raw.githubusercontent.com/feathericons/feather/master/icons/link.svg',
  'email': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/gmail.svg',
  'phone': 'https://raw.githubusercontent.com/feathericons/feather/master/icons/phone.svg',
  'sms': 'https://raw.githubusercontent.com/feathericons/feather/master/icons/message-circle.svg',
  'wifi': 'https://raw.githubusercontent.com/feathericons/feather/master/icons/wifi.svg',
  'social': 'https://raw.githubusercontent.com/feathericons/feather/master/icons/share-2.svg',
  'appstore': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/appstore.svg',
  'contact': 'https://raw.githubusercontent.com/feathericons/feather/master/icons/user.svg',
  'location': 'https://raw.githubusercontent.com/feathericons/feather/master/icons/map-pin.svg',
  'calendar': 'https://raw.githubusercontent.com/feathericons/feather/master/icons/calendar.svg',
  'text': 'https://raw.githubusercontent.com/feathericons/feather/master/icons/file-text.svg',
  'zoom': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/zoom.svg',
  'payment': 'https://raw.githubusercontent.com/feathericons/feather/master/icons/credit-card.svg',
  'playstore': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googleplay.svg',
  'amazonappstore': 'https://raw.githubusercontent.com/feathericons/feather/master/icons/shopping-bag.svg',
  'chromewebstore': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlechrome.svg'
};

// Create logos directory if it doesn't exist
const logosDir = path.join(process.cwd(), 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// Function to download and convert SVG to PNG
const downloadLogo = (name, url) => {
  const filePath = path.join(logosDir, `${name}.png`);
  
  https.get(url, (response) => {
    let data = '';
    
    response.on('data', (chunk) => {
      data += chunk;
    });
    
    response.on('end', () => {
      // Save the SVG file
      fs.writeFileSync(filePath.replace('.png', '.svg'), data);
      console.log(`Downloaded ${name} logo`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${name} logo:`, err);
  });
};

// Download all logos
Object.entries(logoUrls).forEach(([name, url]) => {
  downloadLogo(name, url);
}); 