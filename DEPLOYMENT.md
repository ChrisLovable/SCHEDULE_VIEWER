# Deployment Instructions

## 🚀 Build for Production

1. **Build the app:**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with optimized production files.

2. **Preview the build locally:**
   ```bash
   npm run preview
   ```
   This serves the production build at `http://localhost:4173`

## 📦 Deploy to Vercel (Recommended - Free & Easy)

### Option 1: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - It will detect Vite automatically
   - Your app will be live in seconds!

4. **For production:**
   ```bash
   vercel --prod
   ```

### Option 2: Using Vercel Website

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your Git repository (or drag & drop the `dist` folder)
4. Vercel auto-detects Vite - just click "Deploy"
5. Done! Your app is live.

**Vercel automatically:**
- Builds your app on every push
- Provides HTTPS
- Handles PWA service workers
- Gives you a custom domain

---

## 🌐 Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the app:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --dir=dist
   ```
   - For production: `netlify deploy --prod --dir=dist`

**Or use Netlify Website:**
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your `dist` folder
3. Your app is live!

---

## 📱 Deploy to GitHub Pages

**Repository:** https://github.com/ChrisLovable/SCHEDULE_VIEWER.git

1. **Initialize Git repository (if not already):**
   ```bash
   git init
   git remote add origin https://github.com/ChrisLovable/SCHEDULE_VIEWER.git
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Update package.json:**
   Add this to the `scripts` section:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

4. **Set base in vite.config.js:**
   ```javascript
   export default defineConfig({
     base: '/SCHEDULE_VIEWER/', // Your repo name
     // ... rest of config
   })
   ```

5. **Deploy:**
   ```bash
   npm run deploy
   ```

6. **Enable GitHub Pages:**
   - Go to https://github.com/ChrisLovable/SCHEDULE_VIEWER → Settings → Pages
   - Select `gh-pages` branch
   - Your app will be at: `https://chrislovable.github.io/SCHEDULE_VIEWER/`

---

## 🖥️ Deploy to Traditional Web Hosting (cPanel, FTP, etc.)

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder contents:**
   - Use FTP client (FileZilla, WinSCP)
   - Upload all files from `dist` to your `public_html` folder (or `www` folder)
   - Make sure `index.html` is in the root

3. **Important:**
   - Ensure `.htaccess` file supports SPA routing (if you add routing later)
   - Make sure service worker file (`sw.js`) is accessible
   - PDF file must be in the same location as specified in code

---

## ☁️ Deploy to AWS S3 + CloudFront

1. **Build:**
   ```bash
   npm run build
   ```

2. **Install AWS CLI:**
   ```bash
   pip install awscli
   ```

3. **Configure AWS:**
   ```bash
   aws configure
   ```

4. **Upload to S3:**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

5. **Enable static website hosting in S3**
6. **Set up CloudFront distribution** (optional, for CDN)

---

## 🔧 Important Notes for Deployment

### 1. Ensure PDF Files are Included
- Make sure both PDF files are in the `public` folder:
  - `INDIVIDUAL_SCHEDULES.PDF`
  - `SITE_SCHEDULES.PDF`
- They will be copied to `dist` during build
- Verify both are in the deployed files

### 2. Service Worker for Offline Support
- Service worker is automatically included
- Users can "Add to Home Screen" on mobile
- App works offline after first visit

### 3. Environment Variables
- No environment variables needed for this app
- All paths are relative

### 4. CORS Issues
- If deploying PDF separately, ensure CORS headers are set
- Local files work fine in same origin

### 5. Testing Deployment
- Test offline functionality after deployment
- Clear cache and reload to test service worker
- Test on mobile devices

---

## 📋 Quick Checklist Before Deploying

- [ ] `npm run build` completes without errors
- [ ] `INDIVIDUAL_SCHEDULES.PDF` is in `public` folder
- [ ] `SITE_SCHEDULES.PDF` is in `public` folder
- [ ] `pdf.worker.min.mjs` is in `public` folder
- [ ] Test `npm run preview` works locally
- [ ] Service worker registers correctly
- [ ] App works offline after first load
- [ ] Mobile responsive design works
- [ ] Test "1111" shows Individual Schedules
- [ ] Test "2222" shows Site Schedules

---

## 🎯 Recommended: Vercel

**Why Vercel?**
- ✅ Free tier is generous
- ✅ Automatic HTTPS
- ✅ Zero configuration
- ✅ Instant deployments
- ✅ Perfect for React/Vite apps
- ✅ Handles PWA automatically

**Quick Deploy:**
```bash
npm install -g vercel
vercel
```

That's it! 🎉

---

## 🆘 Troubleshooting

**Build fails?**
- Check for TypeScript/ESLint errors
- Ensure all dependencies are installed
- Try deleting `node_modules` and `package-lock.json`, then `npm install`

**Service Worker not working?**
- Ensure HTTPS (service workers require secure context)
- Check browser console for errors
- Verify `sw.js` is in the root of deployed site

**PDF not loading?**
- Verify PDF is in `public` folder
- Check network tab for 404 errors
- Ensure file path matches exactly (case-sensitive)

**Offline not working?**
- Clear browser cache
- Check service worker is registered (DevTools → Application → Service Workers)
- Verify cache storage (DevTools → Application → Cache Storage)

