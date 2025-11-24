// Simple script to create placeholder icons
// Run with: node public/generate-icons.js (requires canvas package)
// Or use the HTML version in scripts/create-icons.html

console.log(`
To create PWA icons:

Option 1: Use the HTML generator
1. Open scripts/create-icons.html in a browser
2. Right-click each canvas and save as PNG
3. Save as icon-192.png and icon-512.png in public folder

Option 2: Use online generator
1. Go to https://www.pwabuilder.com/imageGenerator
2. Upload any 512x512 image
3. Download and place icon-192.png and icon-512.png in public folder

Option 3: Create simple colored squares
- Create 192x192 and 512x512 PNG files
- Use gradient background: #667eea to #764ba2
- Add "SV" text in white
- Place in public folder

For now, the app will work without icons - they're just for home screen icon.
`)

