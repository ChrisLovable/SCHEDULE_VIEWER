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

  // Render first 5 pages immediately - much faster initial load
  useEffect(() => {
    if (pageNum <= 5) {
      setShouldRender(true)
    }
  }, [pageNum])

  useEffect(() => {
    if (!pdf || !canvasRef.current || isRendered || !shouldRender) {
      if (!pdf) console.log(`[PDFPage ${pageNum}] No PDF yet`)
      if (!canvasRef.current) console.log(`[PDFPage ${pageNum}] No canvas ref yet`)
      if (isRendered) console.log(`[PDFPage ${pageNum}] Already rendered`)
      if (!shouldRender) console.log(`[PDFPage ${pageNum}] Should not render yet`)
      return
    }

    const renderPage = async () => {
      try {
        console.log(`[PDFPage ${pageNum}] Starting render...`)
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

          // Get container width to fit PDF to width
          // Wait a moment for layout to settle
          await new Promise(resolve => setTimeout(resolve, 100))
          
          // Try multiple ways to get container width
          let containerWidth = window.innerWidth
          const pageWrapper = containerRef.current?.closest('.page-wrapper')
          if (pageWrapper) {
            const canvasWrapper = pageWrapper.querySelector('.canvas-wrapper')
            if (canvasWrapper?.clientWidth) {
              containerWidth = canvasWrapper.clientWidth
            } else if (pageWrapper.clientWidth) {
              containerWidth = pageWrapper.clientWidth
            }
          }
          
          // Account for margins and padding (page-wrapper has 0.5rem margin on each side = 1rem total)
          containerWidth = Math.max(containerWidth - 16, 300) // Minimum 300px width
          
          // Get default viewport to calculate scale
          const defaultViewport = page.getViewport({ scale: 1.0 })
          
          // Calculate scale to fit container width
          const scaleToFitWidth = containerWidth / defaultViewport.width
          
          // Render at high quality (3x the display scale for crisp text)
          const renderScale = scaleToFitWidth * 3.0
          const renderViewport = page.getViewport({ scale: renderScale })
          
          // Set canvas internal size (high resolution for quality)
          canvas.width = renderViewport.width
          canvas.height = renderViewport.height
          
          // Set display size to fit container width
          canvas.style.width = `${containerWidth}px`
          canvas.style.height = `${defaultViewport.height * scaleToFitWidth}px`

          const context = canvas.getContext('2d', { alpha: false })
          
          // Enable high-quality image smoothing for crisp text
          context.imageSmoothingEnabled = true
          context.imageSmoothingQuality = 'high'
          
          const renderContext = {
            canvasContext: context,
            viewport: renderViewport,
            enableWebGL: false,
            renderInteractiveForms: false,
          }

          await page.render(renderContext).promise
          console.log(`[PDFPage ${pageNum}] Render complete. Canvas size: ${canvas.width}x${canvas.height}, Display: ${canvas.style.width}x${canvas.style.height}`)
          setIsRendered(true)
          setIsLoading(false)
          if (onRendered) onRendered()
        }
        
        if (shouldDefer) {
          console.log(`[PDFPage ${pageNum}] Deferring render with requestIdleCallback`)
          requestIdleCallback(() => {
            doRender().catch(err => {
              console.error(`[PDFPage ${pageNum}] Error rendering page:`, err)
              setIsLoading(false)
            })
          }, { timeout: 2000 })
        } else {
          console.log(`[PDFPage ${pageNum}] Rendering immediately`)
          doRender().catch(err => {
            console.error(`[PDFPage ${pageNum}] Error rendering page:`, err)
            setIsLoading(false)
          })
        }
      } catch (err) {
        console.error(`[PDFPage ${pageNum}] Error in renderPage:`, err)
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
        {shouldRender && (
          <>
            {isLoading && (
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                color: '#888',
                fontSize: '0.9rem'
              }}>
                Loading page {pageNum}...
              </div>
            )}
            <canvas ref={canvasRef} className="pdf-canvas" style={{ 
              opacity: isRendered ? 1 : 0,
              transition: 'opacity 0.3s'
            }}></canvas>
          </>
        )}
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

