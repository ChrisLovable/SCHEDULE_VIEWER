# Quick Start Guide

## ✅ Offline Support Setup

The app now includes **offline support**! Here's what's been added:

### Features:
- ✅ **Service Worker** - Caches PDF and app files
- ✅ **PWA Support** - Can be installed on mobile devices
- ✅ **Offline Indicator** - Shows when you're online/offline
- ✅ **PDF Cached** - PDF is cached after first load

## 🚀 Testing Offline Functionality

1. **First Visit (Online):**
   - Open the app at `http://localhost:3000`
   - The service worker will cache everything
   - You'll see "Service Worker registered" in console

2. **Test Offline:**
   - Open DevTools (F12) → Network tab
   - Check "Offline" checkbox
   - Refresh the page
   - The app should still work!
   - PDF should load from cache

3. **On Mobile:**
   - Visit the app once (online)
   - Turn off WiFi/Data
   - App should work offline
   - You'll see "Offline - Using cached data" message

## 📦 Create PWA Icons (Optional)

The app works without icons, but for a better mobile experience:

1. **Easy Option - Use Online Generator:**
   - Go to: https://realfavicongenerator.net/
   - Upload any 512x512 image
   - Download and place in `public` folder:
     - `icon-192.png`
     - `icon-512.png`

2. **Or Create Simple Icons:**
   - Create 192x192 and 512x512 PNG files
   - Use gradient: #667eea to #764ba2
   - Add "SV" text in white
   - Save in `public` folder

## 🚢 Deploy to Production

### Fastest: Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Done! Your app is live with offline support!

### Or: Build for Other Hosting

```bash
# Build
npm run build

# Preview build
npm run preview

# Upload 'dist' folder to your host
```

See `DEPLOYMENT.md` for detailed instructions.

## 📱 Install as App on Mobile

After deploying:

1. **iOS:**
   - Open in Safari
   - Tap Share → Add to Home Screen

2. **Android:**
   - Open in Chrome
   - Tap Menu → Install App / Add to Home Screen

3. **Desktop:**
   - Chrome/Edge: Click install icon in address bar

## ✨ What's Cached

- ✅ Main app files (HTML, CSS, JS)
- ✅ PDF file (INDIVIDUAL_SCHEDULES.PDF)
- ✅ PDF worker file
- ✅ All assets

**After first visit, everything works offline!**

## 🔍 Verify It's Working

1. **Check Service Worker:**
   - DevTools → Application → Service Workers
   - Should see "activated and running"

2. **Check Cache:**
   - DevTools → Application → Cache Storage
   - Should see "schedule-viewer-v1" cache

3. **Test Offline:**
   - Network tab → Check "Offline"
   - Refresh → App should work!

---

**Ready to deploy?** See `DEPLOYMENT.md` for full instructions! 🚀

