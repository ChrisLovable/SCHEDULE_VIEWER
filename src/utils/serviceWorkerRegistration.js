// Service Worker Registration for Offline Support
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[SW] Service Worker registered:', registration.scope)

          // Check for updates every hour
          setInterval(() => {
            registration.update()
          }, 60 * 60 * 1000)

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            console.log('[SW] New service worker found')

            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('[SW] New content available - reload to update')
                // Optionally notify user about update
              }
            })
          })
        })
        .catch((error) => {
          console.log('[SW] Service Worker registration failed:', error)
        })

      // Handle controller changes (when new SW takes over)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[SW] New service worker activated')
        // Optionally reload the page
        // window.location.reload()
      })
    })
  }
}

export const unregisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister().then((success) => {
        if (success) {
          console.log('[SW] Service Worker unregistered')
        }
      })
    })
  }
}

