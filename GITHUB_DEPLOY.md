# GitHub Deployment Guide

## Repository
**URL:** https://github.com/ChrisLovable/SCHEDULE_VIEWER.git

## Quick Deploy to GitHub Pages

### Step 1: Setup Git Repository

```bash
# Initialize git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/ChrisLovable/SCHEDULE_VIEWER.git

# Make initial commit
git add .
git commit -m "Initial commit - Schedule Viewer app"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Install Deployment Tool

```bash
npm install --save-dev gh-pages
```

### Step 3: Update vite.config.js

Make sure the base path matches your repository name:

```javascript
export default defineConfig({
  base: '/SCHEDULE_VIEWER/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

### Step 4: Update package.json

Add deploy script:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### Step 5: Deploy

```bash
npm run deploy
```

### Step 6: Enable GitHub Pages

1. Go to: https://github.com/ChrisLovable/SCHEDULE_VIEWER/settings/pages
2. Under "Source", select: `gh-pages` branch
3. Click "Save"
4. Your app will be live at: `https://chrislovable.github.io/SCHEDULE_VIEWER/`

## Important Notes

- **Base Path:** Make sure `vite.config.js` has `base: '/SCHEDULE_VIEWER/'` (matches repo name)
- **PDF File:** Ensure `INDIVIDUAL_SCHEDULES.PDF` is in the `public` folder before building
- **Service Worker:** Will work on GitHub Pages (HTTPS required)
- **Updates:** Run `npm run deploy` after each update

## Troubleshooting

**404 Errors?**
- Check base path in `vite.config.js` matches repo name exactly
- Ensure you're deploying the `dist` folder, not `build`

**Service Worker Not Working?**
- GitHub Pages uses HTTPS automatically - should work fine
- Clear browser cache if issues persist

**PDF Not Loading?**
- Verify PDF is in `public` folder
- Check file path in code matches exactly

---

**Repository:** https://github.com/ChrisLovable/SCHEDULE_VIEWER.git
**Live URL:** https://chrislovable.github.io/SCHEDULE_VIEWER/

