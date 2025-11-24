import { useState, useEffect } from 'react'
import './OfflineIndicator.css'

function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowMessage(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!showMessage) return null

  return (
    <div className={`offline-indicator ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? (
        <span>✓ Back online - App is synced</span>
      ) : (
        <span>⚠ Offline - Using cached data</span>
      )}
    </div>
  )
}

export default OfflineIndicator

