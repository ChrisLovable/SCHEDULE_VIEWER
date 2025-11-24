import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

function PDFPage({ pdf, pageNum, onRendered }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [isRendered, setIsRendered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '300px', // Reduced buffer to avoid loading too many pages at once
        threshold: 0.01
      }
    )

    observer.observe(containerRef.current)

    return () => {
      if (containerRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  // Only render first 3 pages immediately - much faster initial load
  useEffect(() => {
    if (pageNum <= 3) {
      setShouldRender(true)
    }
  }, [pageNum])

  useEffect(() => {
    if (!pdf || !canvasRef.current || isRendered || !shouldRender) return

    const renderPage = async () => {
      try {
        setIsLoading(true)
        
        // Use requestIdleCallback only for pages beyond the first 5 (critical pages render immediately)
        const shouldDefer = pageNum > 5 && 'requestIdleCallback' in window
        
        const doRender = async () => {
          const page = await pdf.getPage(pageNum)
          const canvas = canvasRef.current
          if (!canvas) {
            setIsLoading(false)
            return
          }

          // AGGRESSIVE optimization - very low scale for MUCH faster rendering
          const isMobile = window.innerWidth < 640
          const baseScale = isMobile ? 0.6 : 0.7 // Much lower scale = MUCH faster rendering
          
          const viewport = page.getViewport({ scale: baseScale })
          canvas.width = viewport.width
          canvas.height = viewport.height

          const context = canvas.getContext('2d', { alpha: false, desynchronized: true })
          
          // Maximize performance - disable smoothing for speed
          context.imageSmoothingEnabled = false // Faster rendering
          
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
            enableWebGL: false,
            renderInteractiveForms: false,
          }

          await page.render(renderContext).promise
          setIsRendered(true)
          setIsLoading(false)
          if (onRendered) onRendered()
        }
        
        if (shouldDefer) {
          requestIdleCallback(() => {
            doRender().catch(err => {
              console.error(`Error rendering page ${pageNum}:`, err)
              setIsLoading(false)
            })
          }, { timeout: 2000 })
        } else {
          doRender().catch(err => {
            console.error(`Error rendering page ${pageNum}:`, err)
            setIsLoading(false)
          })
        }
      } catch (err) {
        console.error(`Error rendering page ${pageNum}:`, err)
        setIsLoading(false)
      }
    }

    renderPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdf, pageNum, isRendered, shouldRender])

  return (
    <div ref={containerRef} className="page-wrapper">
      <div className="page-header">
        <span className="page-number">Page {pageNum}</span>
        {isLoading && <span className="page-loading">(Loading...)</span>}
        {!shouldRender && !isRendered && <span className="page-loading">(Waiting...)</span>}
      </div>
      <div className="canvas-wrapper">
        {shouldRender && <canvas ref={canvasRef} className="pdf-canvas"></canvas>}
        {!shouldRender && (
          <div className="canvas-placeholder" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
            <span style={{ color: '#666' }}>Page will load when scrolled into view...</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default PDFPage

