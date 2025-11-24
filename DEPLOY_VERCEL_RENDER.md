# Deploy to Vercel or Render

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest & Fastest)

#### Method A: Deploy from GitHub (Recommended)

1. **Push to GitHub first** (see steps below)

2. **Go to Vercel:**
   - Visit: https://vercel.com
   - Sign up/Login (use GitHub account - easiest!)

3. **Import Project:**
   - Click "Add New Project"
   - Import from GitHub
   - Select `SCHEDULE_VIEWER` repository
   - Vercel auto-detects Vite! ✅

4. **Configure Build:**
   - Framework Preset: **Vite** (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `./` (leave as is)

5. **Environment Variables:**
   - None needed for this app!

6. **Click Deploy!**
   - Takes 1-2 minutes
   - Your app is live! 🎉

#### Method B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# For production
vercel --prod
```

---

### Option 2: Render (Also Easy & Free)

#### Method A: Deploy from GitHub

1. **Push to GitHub first** (see steps below)

2. **Go to Render:**
   - Visit: https://render.com
   - Sign up/Login (use GitHub account)

3. **Create New Static Site:**
   - Click "New +" → "Static Site"
   - Connect GitHub repository: `SCHEDULE_VIEWER`
   - Select the repository

4. **Configure Build:**
   - **Name:** schedule-viewer (or any name)
   - **Branch:** main (or your branch)
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

5. **Environment Variables:**
   - None needed!

6. **Click Create Static Site!**
   - First deployment takes 2-3 minutes
   - Your app is live! 🎉

#### Method B: Deploy via Render CLI (Optional)

```bash
# Install Render CLI
npm install -g render-cli

# Login
render login

# Deploy
render deploy
```

---

## 📤 Push to GitHub First

### Step 1: Initialize Git (if not done)

```bash
git init
git remote add origin https://github.com/ChrisLovable/SCHEDULE_VIEWER.git
```

### Step 2: Commit and Push

```bash
# Add all files
git add .

# Commit
git commit -m "Schedule Viewer PWA - Ready for deployment"

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## ⚙️ Important Configuration

### Vercel Configuration:
- **Base Path:** `/` (root) - automatically configured ✅
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **No special config needed!**

### Render Configuration:
- **Base Path:** `/` (root) - automatically configured ✅
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **No special config needed!**

### Both platforms will:
- ✅ Auto-detect Vite
- ✅ Build automatically
- ✅ Provide HTTPS
- ✅ Support PWA/service workers
- ✅ Auto-deploy on every push

---

## 🎯 Recommended: Vercel

**Why Vercel?**
- ✅ Fastest deployment (30 seconds!)
- ✅ Zero configuration
- ✅ Best for React/Vite apps
- ✅ Automatic HTTPS
- ✅ Free tier is generous
- ✅ Better performance

---

## ✅ After Deployment

1. **Test the live URL**
2. **Test offline functionality** (PDF should be cached)
3. **Test "1111"** for Individual Schedules
4. **Test "2222"** for Site Schedules
5. **Test zoom & pan features**

Both platforms will give you a live URL like:
- Vercel: `https://schedule-viewer.vercel.app`
- Render: `https://schedule-viewer.onrender.com`

---

## 📝 Notes

- Both PDF files (`INDIVIDUAL_SCHEDULES.PDF` and `SITE_SCHEDULES.pdf`) are included in the build
- Service worker will work (both platforms use HTTPS)
- PWA features work on both platforms
- No environment variables needed

**Ready to deploy!** 🚀

