# PDF Files Setup

## Required PDF Files

Both PDF files must be in the `public` folder:

1. **INDIVIDUAL_SCHEDULES.PDF**
   - Contains individual employee schedules
   - Used for regular employee ID searches
   - Use code "1111" to view all pages

2. **SITE_SCHEDULES.PDF**
   - Contains site schedules
   - Use code "2222" to view all pages

## File Location

```
public/
  ├── INDIVIDUAL_SCHEDULES.PDF
  ├── SITE_SCHEDULES.PDF
  ├── pdf.worker.min.mjs
  ├── sw.js
  └── manifest.json
```

## How It Works

- **Regular Employee ID**: Searches in `INDIVIDUAL_SCHEDULES.PDF`
- **"1111"**: Shows all pages from `INDIVIDUAL_SCHEDULES.PDF`
- **"2222"**: Shows all pages from `SITE_SCHEDULES.PDF`

## PWA Caching

Both PDF files are cached by the service worker and available offline after first visit.

## Deployment

Both PDFs will be included in the build and deployed with the app.

