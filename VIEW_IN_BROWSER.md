# How to View in Browser Console

## ✅ Your App is Running!

The dev server is active on port 3000.

## 🖥️ Open in Browser

1. **Open your browser** (Chrome, Edge, Firefox, etc.)

2. **Go to:**
   ```
   http://localhost:3000
   ```

3. **Open Developer Console:**
   - Press `F12` (Windows/Linux)
   - Or `Cmd+Option+I` (Mac)
   - Or Right-click → Inspect → Console tab

## 📱 Test Mobile View in Browser

1. **Open DevTools** (F12)

2. **Click Device Toggle Icon** (phone/tablet icon) or press:
   - `Ctrl+Shift+M` (Windows/Linux)
   - `Cmd+Shift+M` (Mac)

3. **Select a mobile device** from the dropdown

4. **Test the app** in mobile view!

## 🧪 Test the Features

### Test Individual Schedules (1111):
1. Enter "1111" in search box
2. Click Search
3. Should show all pages from Individual Schedules PDF

### Test Site Schedules (2222):
1. Enter "2222" in search box
2. Click Search
3. Should show all pages from Site Schedules PDF

### Test Regular Employee ID:
1. Enter an employee ID number
2. Click Search
3. Should find and display that employee's page

### Test Zoom & Pan:
1. Click zoom buttons (+ / -)
2. Hold Ctrl/Cmd + scroll to zoom
3. Click and drag when zoomed in
4. Reset zoom with home icon (⌂)

## 🔍 Check Console Logs

In the browser console, you should see:
- Service worker registration messages
- PDF loading status
- Any errors (if they occur)

## 🐛 Troubleshooting

**Page not loading?**
- Check browser console for errors
- Make sure both PDF files are in `public` folder
- Verify file names match exactly (case-sensitive)

**PDF not found?**
- Check Network tab in DevTools
- Look for 404 errors
- Verify PDF file names in `public` folder

---

**Your app is ready at: http://localhost:3000** 🚀

