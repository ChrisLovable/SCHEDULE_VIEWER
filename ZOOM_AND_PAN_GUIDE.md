# Zoom and Pan Guide

## ✅ Features Implemented

### 1. **Zoom Functionality**
- **Zoom In/Out Buttons:** Use + / - buttons in the header
- **Mouse Wheel Zoom:** Hold Ctrl (or Cmd on Mac) + scroll
- **Pinch-to-Zoom:** On mobile devices, use two fingers
- **Reset Zoom:** Click the home icon (⌂) to reset to 100%
- **Zoom Range:** 50% to 300%

### 2. **Pan/Drag Functionality**
- **Desktop:** Click and drag to move around when zoomed in
- **Mobile:** Touch and drag to move around when zoomed in
- **Cursor Changes:** Shows "grab" cursor when zoomed (hover) and "grabbing" (dragging)
- **Auto-reset:** Pan position resets when zoom returns to 100%

### 3. **PDF Always Available (PWA)**
- PDF is cached in service worker
- Part of STATIC_CACHE - always available offline
- Cached during install for instant access

## How to Use

### Zooming In:
1. Click the **+** button or use **Ctrl/Cmd + Mouse Wheel Up**
2. On mobile, **pinch outward** with two fingers
3. Zoom level is displayed (e.g., "150%")

### Moving Around (When Zoomed):
1. **Desktop:** Click and hold, then drag the PDF
2. **Mobile:** Touch and drag with one finger
3. Scroll bars also work to navigate

### Zooming Out:
1. Click the **-** button or use **Ctrl/Cmd + Mouse Wheel Down**
2. On mobile, **pinch inward** with two fingers
3. Click **Reset (⌂)** to return to 100%

### Resetting:
- Click the **⌂** button to reset zoom to 100% and center the view

## Mobile Gestures

- **Pinch Out:** Zoom in
- **Pinch In:** Zoom out  
- **Single Finger Drag:** Pan around when zoomed
- **Scroll:** Normal scrolling when not zoomed

## Technical Details

### PDF Caching:
- PDF is included in service worker static cache
- Always available offline after first visit
- Part of PWA installation

### Performance:
- Smooth CSS transforms for zoom/pan
- Touch events optimized for mobile
- No lag when dragging/panning

---

**Test it now!** Zoom in and drag around to see different sections of the PDF! 📱🖱️

