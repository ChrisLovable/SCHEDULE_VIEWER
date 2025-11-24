# Schedule Viewer

A React-based PDF viewer that displays individual employee schedules by searching for their ID number in the PDF.

## Features

- ✅ Search for employee schedules by ID number
- ✅ Automatically finds and displays the correct page from the PDF
- ✅ **Works offline** - PDF and app cached after first visit (PDF part of PWA)
- ✅ **PWA Support** - Install on mobile devices
- ✅ **Zoom & Pan** - Zoom in/out and drag to move around PDF sections
- ✅ Mobile-first responsive design
- ✅ Clean, modern dark theme UI
- ✅ Offline indicator shows connection status

## Setup

1. Install dependencies:
```bash
npm install
```

2. Ensure both PDF files are in the `public` folder:
   - `INDIVIDUAL_SCHEDULES.PDF`
   - `SITE_SCHEDULES.PDF`

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Usage

1. Enter an employee ID number in the search box
2. Click "Search" or press Enter
3. The viewer will automatically find and display the matching page from the PDF

### Special Features: View All Pages

- Enter **"1111"** as the employee ID to view all pages of **Individual Schedules** PDF
- Enter **"2222"** as the employee ID to view all pages of **Site Schedules** PDF
- All pages will be displayed in a scrollable list
- Useful for administrators or overview purposes

### Zoom & Pan Features

- **Zoom In/Out:** Use the + / - buttons or Ctrl/Cmd + Mouse Wheel
- **Pinch-to-Zoom:** On mobile, use two-finger pinch gesture
- **Pan/Drag:** When zoomed in, click and drag (or touch and drag) to move around
- **Reset:** Click the home icon (⌂) to reset zoom to 100%
- **Range:** Zoom from 50% to 300%

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Offline Support

The app includes a service worker that caches:
- Both PDF files (`INDIVIDUAL_SCHEDULES.PDF` and `SITE_SCHEDULES.PDF`) - **Always available offline as part of PWA**
- All app files (HTML, CSS, JS)
- PDF worker files

**After the first visit, the app works completely offline! Both PDFs are cached as part of the PWA installation.**

To test offline:
1. Load the app once (online)
2. Open DevTools → Network tab
3. Check "Offline"
4. Refresh - app still works!

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions to:
- Vercel (recommended - free & easy)
- Netlify
- GitHub Pages
- Traditional hosting
- AWS S3

**Quick deploy to Vercel:**
```bash
npm install -g vercel
vercel
```

## PWA Installation

After deploying, users can install the app:
- **Mobile**: Add to Home Screen from browser
- **Desktop**: Install button in address bar

See `QUICK_START.md` for more details.

