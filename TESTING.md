# Testing Instructions

## 🖥️ Testing in Browser

1. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

2. **Open Browser DevTools** (Press `F12` or right-click → Inspect)

3. **Test Mobile View:**
   - Click the **Toggle Device Toolbar** icon (or press `Ctrl+Shift+M` / `Cmd+Shift+M`)
   - Select a mobile device (iPhone, Samsung Galaxy, etc.)
   - Or set custom dimensions (e.g., 375x667 for iPhone SE)

4. **Test the Application:**
   - Enter an employee ID number in the search box
   - Click "Search" or press Enter
   - The matching page should display

## 📱 Testing on Real Mobile Device

1. **Find your computer's IP address:**
   - Open Command Prompt (Windows) or Terminal (Mac/Linux)
   - Type: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
   - Look for "IPv4 Address" (e.g., 192.168.1.100)

2. **Start the dev server with network access:**
   - Stop the current server (Ctrl+C)
   - Run: `npm run dev -- --host`
   - This will show a Network URL like: `http://192.168.1.100:3000`

3. **On your mobile device:**
   - Connect to the same WiFi network as your computer
   - Open a browser on your phone
   - Navigate to: `http://192.168.1.100:3000` (use your actual IP)
   - Test the search functionality

## 🧪 Testing Tips

- Try different ID number formats (with/without spaces, dashes)
- Test on different screen sizes
- Check both portrait and landscape orientations
- Verify touch interactions work smoothly
- Test on actual mobile devices for best results

