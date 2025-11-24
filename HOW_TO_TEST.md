# How to Test the Schedule Viewer

## ✅ Quick Start

1. **The app is already running at:**
   ```
   http://localhost:3000
   ```

2. **Open in your browser:**
   - Open Chrome, Edge, Firefox, or Safari
   - Navigate to `http://localhost:3000`
   - The app should load

## 📱 Test Mobile View in Browser

1. **Open DevTools:**
   - Press `F12` (or `Ctrl+Shift+I` / `Cmd+Option+I` on Mac)
   - Click the **Device Toggle** icon (phone/tablet icon)
   - Or press `Ctrl+Shift+M` (Windows) / `Cmd+Shift+M` (Mac)

2. **Select a Mobile Device:**
   - Choose iPhone, Samsung Galaxy, or any mobile device
   - Or set custom size (e.g., 375x667 for iPhone SE)

3. **Test the App:**
   - Enter an employee ID number
   - Click Search
   - View the schedule page

## 🖥️ Test on Real Mobile Device

1. **Find your computer's IP address:**
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. **Restart dev server with network access:**
   - Stop current server: Press `Ctrl+C` in terminal
   - Run: `npm run dev -- --host`
   - This shows: `Network: http://192.168.1.100:3000`

3. **On your phone:**
   - Connect to same WiFi network
   - Open browser
   - Go to: `http://192.168.1.100:3000` (use your actual IP)
   - Test the app!

## 🔧 Fixing Errors

### Service Worker Errors (sw.js)
Those errors are from browser extensions, NOT this app. You can ignore them or:
- Disable extensions temporarily
- Use Incognito/Private mode

### PDF Worker Error
If you see PDF worker errors:
1. Check that `pdf.worker.min.mjs` is in the `public` folder
2. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## 📝 Testing Checklist

- [ ] App loads at http://localhost:3000
- [ ] Search box appears
- [ ] Can enter employee ID
- [ ] PDF loads and searches correctly
- [ ] Mobile view works (test in DevTools)
- [ ] Touch interactions work (on real device)

## 🐛 Troubleshooting

**App won't load?**
- Check terminal for errors
- Make sure port 3000 is available
- Try: `npm run dev` again

**PDF not loading?**
- Check `INDIVIDUAL_SCHEDULES.PDF` is in `public` folder
- Check browser console for errors
- Try different browser

**Can't find employee ID?**
- Make sure the ID exists in the PDF
- Try searching with/without spaces/dashes
- Check the exact format of IDs in your PDF

