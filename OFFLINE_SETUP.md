# Offline Setup - Complete Guide

## ✅ What's Been Added

Your Schedule Viewer app now has **full offline support**:

1. **Service Worker** (`public/sw.js`)
   - Caches the PDF file after first load
   - Caches all app files
   - Works completely offline after initial visit

2. **PWA Manifest** (`public/manifest.json`)
   - Makes app installable on mobile devices
   - Adds to home screen functionality

3. **Offline Indicator**
   - Shows when you're online/offline
   - Visual feedback for connection status

4. **Service Worker Registration** (`src/utils/serviceWorkerRegistration.js`)
   - Automatically registers on app load
   - Handles updates and caching

## 🔄 How It Works

1. **First Visit (Online):**
   - User visits the app
   - Service worker installs
   - PDF and all files are cached
   - Ready for offline use

2. **Subsequent Visits (Offline):**
   - App loads from cache
   - PDF loads from cache
   - Everything works without internet

3. **Updates:**
   - Service worker checks for updates hourly
   - New versions auto-install on next visit

## 🧪 Testing Offline Mode

### In Browser DevTools:

1. **Load the app once** (online)
   - Open `http://localhost:3000`
   - Wait for "Service Worker registered" in console

2. **Go offline:**
   - Open DevTools (F12)
   - Go to Network tab
   - Check "Offline" checkbox

3. **Test:**
   - Refresh the page
   - App should load from cache
   - PDF should display
   - Search should work
   - You'll see "Offline - Using cached data" banner

### On Mobile Device:

1. **Visit app once** (with internet)
   - Service worker installs
   - Everything caches

2. **Turn off WiFi/Data**

3. **Open app:**
   - Should work completely offline
   - PDF loads from cache
   - All functionality works

## 📱 Creating PWA Icons

Icons are optional but improve the experience:

### Easy Method:

1. **Open:** `create-icons-simple.html` in your browser
2. **Click:** "Download" buttons for each icon
3. **Save:** As `icon-192.png` and `icon-512.png`
4. **Place:** In the `public` folder

### Alternative Methods:

- Use online generator: https://realfavicongenerator.net/
- Create manually: 192x192 and 512x512 PNG files with gradient background

**Note:** App works fine without icons - they're just for the home screen icon.

## 🚀 Deployment with Offline Support

### All deployment methods support offline:

1. **Vercel** - ✅ Works automatically
2. **Netlify** - ✅ Works automatically  
3. **GitHub Pages** - ✅ Works automatically
4. **Traditional Hosting** - ✅ Works if HTTPS enabled

**Important:** Service Workers require HTTPS (except localhost)

### Build Process:

```bash
# Build includes:
npm run build
# - All app files
# - Service worker (sw.js)
# - Manifest (manifest.json)
# - PDF file (cached)
# - PDF worker
```

Everything needed for offline support is included!

## 🔍 Verifying Offline Setup

### Check Service Worker:

1. Open DevTools → Application tab
2. Click "Service Workers"
3. Should see: "activated and running"
4. Should see your service worker active

### Check Cache:

1. DevTools → Application → Cache Storage
2. Should see: "schedule-viewer-v1"
3. Should contain:
   - `/index.html`
   - `/INDIVIDUAL_SCHEDULES.PDF`
   - `/pdf.worker.min.mjs`
   - Other app files

### Test Offline:

1. Network tab → Check "Offline"
2. Refresh page
3. App should load and work
4. PDF should display

## 🐛 Troubleshooting

**Service Worker not registering?**
- Ensure you're on HTTPS (or localhost)
- Check browser console for errors
- Clear cache and reload

**PDF not caching?**
- Check file size (very large files may take time)
- Verify PDF is in `public` folder
- Check network tab for successful load
- Wait for initial cache to complete

**Offline not working?**
- Ensure you visited online first
- Clear cache and revisit
- Check service worker is active
- Verify cache storage has files

**Icons not showing?**
- App works without icons
- Check manifest.json has correct paths
- Verify icon files are in `public` folder
- Clear app cache on mobile

## 📋 Checklist

Before deploying, verify:

- [ ] Service worker registers (check console)
- [ ] PDF caches successfully
- [ ] App works offline (test in DevTools)
- [ ] Offline indicator shows correctly
- [ ] Icons created (optional but recommended)
- [ ] Manifest.json is correct
- [ ] All files in `public` folder

## 🎯 Summary

Your app now:
- ✅ Works completely offline after first visit
- ✅ Caches the PDF file
- ✅ Is installable as PWA on mobile
- ✅ Shows offline status
- ✅ Auto-updates when new version available

**Everything is ready for deployment!** 🚀

See `DEPLOYMENT.md` for deployment instructions.

