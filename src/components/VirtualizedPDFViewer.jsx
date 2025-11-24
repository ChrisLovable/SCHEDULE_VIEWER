import { useState, useEffect, useRef, useCallback } from 'react'
import PDFPage from './PDFPage'

function VirtualizedPDFViewer({ pdf, onPageRendered }) {
  const containerRef = useRef(null)
  const [visibleRange, setVisibleRange] = useState({ start: 1, end: 5 })
  const [renderedPages, setRenderedPages] = useState(0)
  const totalPages = pdf?.numPages || 0
  
  // Only render visible pages + buffer
  const BUFFER_SIZE = 3 // Pages to render before/after visible area
  
  useEffect(() => {
    if (!containerRef.current || !totalPages) return
    
    const container = containerRef.current
    
    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const containerHeight = container.clientHeight
      const pageHeight = 800 // Approximate page height
      
      // Calculate which pages are visible
      const startPage = Math.max(1, Math.floor(scrollTop / pageHeight) - BUFFER_SIZE)
      const endPage = Math.min(
        totalPages,
        Math.ceil((scrollTop + containerHeight) / pageHeight) + BUFFER_SIZE
      )
      
      setVisibleRange({ start: startPage, end: endPage })
    }
    
    // Initial calculation
    handleScroll()
    
    container.addEventListener('scroll', handleScroll, { passive: true })
    
    // Throttle scroll events
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    container.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('scroll', throttledScroll)
    }
  }, [totalPages, BUFFER_SIZE])
  
  const handlePageRendered = useCallback(() => {
    setRenderedPages(prev => prev + 1)
    if (onPageRendered) {
      onPageRendered()
    }
  }, [onPageRendered])
  
  // Only create components for visible pages
  const pagesToRender = []
  for (let i = visibleRange.start; i <= visibleRange.end; i++) {
    if (i >= 1 && i <= totalPages) {
      pagesToRender.push(i)
    }
  }
  
  // Create placeholders for non-visible pages to maintain scroll height
  const pagePlaceholders = []
  for (let i = 1; i < visibleRange.start; i++) {
    pagePlaceholders.push(
      <div key={`placeholder-${i}`} style={{ height: '800px', background: '#1a1a1a' }}>
        <div className="page-header">
          <span className="page-number">Page {i}</span>
          <span className="page-loading">(Not loaded)</span>
        </div>
      </div>
    )
  }
  
  for (let i = visibleRange.end + 1; i <= totalPages; i++) {
    pagePlaceholders.push(
      <div key={`placeholder-${i}`} style={{ height: '800px', background: '#1a1a1a' }}>
        <div className="page-header">
          <span className="page-number">Page {i}</span>
          <span className="page-loading">(Not loaded)</span>
        </div>
      </div>
    )
  }
  
  return (
    <div 
      ref={containerRef}
      className="all-pages-wrapper"
      style={{ position: 'relative' }}
    >
      {/* Placeholders before visible pages */}
      {visibleRange.start > 1 && pagePlaceholders.slice(0, visibleRange.start - 1)}
      
      {/* Render only visible pages */}
      {pagesToRender.map(pageNum => (
        <PDFPage
          key={pageNum}
          pdf={pdf}
          pageNum={pageNum}
          onRendered={handlePageRendered}
        />
      ))}
      
      {/* Placeholders after visible pages */}
      {visibleRange.end < totalPages && pagePlaceholders.slice(visibleRange.start - 1)}
    </div>
  )
}

export default VirtualizedPDFViewer

