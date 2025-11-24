// Service Worker for Schedule Viewer - Offline Support
const CACHE_NAME = 'schedule-viewer-v1'
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/pdf.worker.min.mjs',
  '/INDIVIDUAL_SCHEDULES.PDF', // Individual schedules PDF - part of PWA
  '/SITE_SCHEDULES.pdf' // Site schedules PDF - part of PWA (lowercase extension)
]

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static files')
      // Cache static files including both PDFs (PDFs are part of PWA)
      return cache.addAll(STATIC_CACHE).catch((err) => {
        console.log('[SW] Cache addAll failed, trying individual files:', err)
        // If addAll fails (PDFs might be large), cache files individually
        return Promise.all([
          cache.add('/'),
          cache.add('/index.html'),
          cache.add('/pdf.worker.min.mjs'),
          fetch('/INDIVIDUAL_SCHEDULES.PDF').then(response => {
            if (response.ok) {
              return cache.put('/INDIVIDUAL_SCHEDULES.PDF', response)
            }
          }).catch(e => console.log('[SW] Individual PDF cache attempt:', e)),
          fetch('/SITE_SCHEDULES.pdf').then(response => {
            if (response.ok) {
              return cache.put('/SITE_SCHEDULES.pdf', response)
            }
          }).catch(e => console.log('[SW] Site PDF cache attempt:', e))
        ])
      })
    })
  )
  // Force activation of new service worker
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name)
            return caches.delete(name)
          })
      )
    })
  )
  // Take control of all pages immediately
  return self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        console.log('[SW] Serving from cache:', request.url)
        return cachedResponse
      }

      // Otherwise fetch from network
      return fetch(request)
        .then((response) => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200) {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          // Cache the response (especially important for PDFs and assets)
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache).then(() => {
              if (request.url.includes('.PDF') || request.url.includes('.pdf')) {
                const pdfName = request.url.includes('SITE') ? 'Site Schedules' : 'Individual Schedules'
                console.log(`[SW] ${pdfName} PDF cached successfully for offline use`)
              }
            }).catch((err) => {
              console.log('[SW] Failed to cache:', request.url, err)
            })
          })

          return response
        })
        .catch(() => {
          // If fetch fails and it's a navigation request, return offline page
          if (request.mode === 'navigate') {
            return caches.match('/index.html')
          }
          // For other requests, return a basic error response
          return new Response('Offline - resource not cached', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          })
        })
    })
  )
})

