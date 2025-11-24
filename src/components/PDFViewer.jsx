import { useEffect, useState, useRef } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import PDFPage from './PDFPage'
import './PDFViewer.css'

// Set up PDF.js worker - using local worker file from public folder
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

function PDFViewer({ employeeId, pdfPath = '/INDIVIDUAL_SCHEDULES.PDF' }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pageNumber, setPageNumber] = useState(null)
  const [pdf, setPdf] = useState(null)
  const canvasRef = useRef(null)
  const [searching, setSearching] = useState(true)
  const [showAllPages, setShowAllPages] = useState(false)
  const [allPagesRendered, setAllPagesRendered] = useState(false)
  const [renderedPages, setRenderedPages] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loadedPageNumbers, setLoadedPageNumbers] = useState(new Set([1, 2, 3, 4, 5]))
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    // Reset state when PDF path changes
    setPdf(null)
    setPageNumber(null)
    setShowAllPages(false)
    setRenderedPages(0)
    setTotalPages(0)
    setLoadedPageNumbers(new Set())
    setError(null)
    
    loadPDF(pdfPath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfPath])

  useEffect(() => {
    if (pdf && employeeId) {
      // Check for special codes - show all pages
      if (employeeId.trim() === '1111' || employeeId.trim() === '2222') {
        setShowAllPages(true)
        setAllPagesRendered(false)
        setRenderedPages(0)
        setTotalPages(pdf.numPages)
        setSearching(false) // Don't block - show pages immediately as they render
        setError(null)
        setLoadedPageNumbers(new Set([1, 2, 3, 4, 5])) // Only load first 5 initially
      } else {
        setShowAllPages(false)
        setRenderedPages(0)
        setTotalPages(0)
        setLoadedPageNumbers(new Set())
        searchForEmployee()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdf, employeeId])

  // Lazy load pages when scrolled into view
  useEffect(() => {
    if (!showAllPages || !pdf || !containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNum = parseInt(entry.target.getAttribute('data-page-num'))
            if (pageNum && !loadedPageNumbers.has(pageNum)) {
              setLoadedPageNumbers(prev => new Set([...prev, pageNum]))
            }
          }
        })
      },
      {
        root: containerRef.current,
        rootMargin: '300px',
        threshold: 0.1
      }
    )

    // Observe all placeholder divs
    const placeholders = containerRef.current.querySelectorAll('.lazy-page-trigger')
    placeholders.forEach(placeholder => observer.observe(placeholder))

    return () => {
      placeholders.forEach(placeholder => observer.unobserve(placeholder))
      observer.disconnect()
    }
  }, [showAllPages, pdf, loadedPageNumbers])

  const loadPDF = async (path) => {
    try {
      setLoading(true)
      setError(null)
      const loadingTask = pdfjsLib.getDocument(path)
      const pdfDocument = await loadingTask.promise
      setPdf(pdfDocument)
      setLoading(false)
    } catch (err) {
      console.error('Error loading PDF:', err)
      const pdfName = path.includes('SITE') ? 'SITE_SCHEDULES.pdf' : 'INDIVIDUAL_SCHEDULES.PDF'
      setError(`Failed to load PDF file. Please ensure ${pdfName} is in the public folder.`)
      setLoading(false)
    }
  }

  const searchForEmployee = async () => {
    if (!pdf || !employeeId) return

    try {
      setSearching(true)
      setError(null)
      
      const cleanId = employeeId.replace(/\s+/g, '').replace(/-/g, '')
      
      // Search through each page for the employee ID
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const textContent = await page.getTextContent()
        
        // Extract all text from the page
        const pageText = textContent.items
          .map(item => item.str)
          .join(' ')
        
        // Normalize the page text by removing spaces and dashes for comparison
        const normalizedPageText = pageText.replace(/\s+/g, '').replace(/-/g, '').toLowerCase()
        const normalizedId = cleanId.toLowerCase()
        
        // Try multiple search strategies
        const searchPatterns = [
          // Direct match (case-insensitive, ignoring spaces/dashes)
          normalizedPageText.includes(normalizedId),
          // Original format with word boundary
          new RegExp(`\\b${employeeId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(pageText),
          // With spaces inserted every 2 characters
          new RegExp(cleanId.replace(/(.{2})/g, '$1\\s*'), 'i').test(pageText),
          // With dashes inserted every 2 characters
          new RegExp(cleanId.replace(/(.{2})/g, '$1-?'), 'i').test(pageText),
        ]
        
        if (searchPatterns.some(pattern => pattern)) {
          setPageNumber(pageNum)
          renderPage(page, canvasRef.current)
          setSearching(false)
          return
        }
      }
      
      // If we get here, employee ID not found
      setError(`Employee ID "${employeeId}" not found in the schedule. Please check the ID number and try again.`)
      setPageNumber(null)
      setSearching(false)
    } catch (err) {
      console.error('Error searching PDF:', err)
      setError('Error searching for employee ID. Please try again.')
      setSearching(false)
    }
  }

  const renderPage = async (page, canvas, pageNum = null) => {
    if (!canvas) return

    // Get default viewport to calculate available space
    const defaultViewport = page.getViewport({ scale: 1.0 })
    
    // Wait a moment for layout to settle
    await new Promise(resolve => setTimeout(resolve, 50))
    
    const container = wrapperRef.current
    const availableWidth = (container?.clientWidth || window.innerWidth) - 32 // Account for padding
    const availableHeight = (container?.clientHeight || window.innerHeight) - 120 // Account for header and padding
    
    // Calculate scale to fit page in viewport (fit to width or height, whichever is smaller)
    const scaleX = availableWidth / defaultViewport.width
    const scaleY = availableHeight / defaultViewport.height
    const fitScale = Math.min(scaleX, scaleY, 1.0) // Fit to viewport, max 1:1 (can zoom in later)
    
    // Render at high quality (3x for crisp text when zoomed in)
    const renderScale = 3.0
    
    const renderViewport = page.getViewport({ scale: renderScale })
    
    // Set canvas internal size (high resolution for quality)
    canvas.width = renderViewport.width
    canvas.height = renderViewport.height
    
    // Set canvas display size (fit to screen initially, can zoom out much further with native zoom)
    canvas.style.width = `${defaultViewport.width * fitScale}px`
    canvas.style.height = `${defaultViewport.height * fitScale}px`

    const context = canvas.getContext('2d', { alpha: false })
    
    // Enable high-quality image smoothing for crisp text
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'
    
    // Scale the context to map the render scale to the display scale
    const scaleRatio = fitScale / renderScale
    context.scale(scaleRatio, scaleRatio)

    const renderContext = {
      canvasContext: context,
      viewport: renderViewport,
      enableWebGL: false,
    }

    await page.render(renderContext).promise
  }

  const handlePageRendered = () => {
    setRenderedPages(prev => {
      const newCount = prev + 1
      if (newCount >= totalPages) {
        setAllPagesRendered(true)
      }
      return newCount
    })
  }

  if (loading) {
    return (
      <div className="pdf-viewer">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading PDF...</p>
        </div>
      </div>
    )
  }

  if (searching && !error && !showAllPages) {
    return (
      <div className="pdf-viewer">
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching for Employee ID: {employeeId}...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pdf-viewer">
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      {showAllPages && !error && pdf && (
        <div className="pdf-container all-pages-container">
          <div className="pdf-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span className="page-info">
                Showing All Pages ({pdf.numPages} total)
                {pdfPath.includes('SITE') && <span> - Site Schedules</span>}
                {pdfPath.includes('INDIVIDUAL') && <span> - Individual Schedules</span>}
                {renderedPages > 0 && (
                  <span className="loading-status"> - {loadedPageNumbers.size} pages ready</span>
                )}
              </span>
              <div className="native-zoom-hint">
                <span style={{ fontSize: '0.75rem', color: '#888' }}>Pinch to zoom • Drag to pan</span>
              </div>
            </div>
          </div>
          <div 
            ref={containerRef}
            className="all-pages-wrapper" 
            id="pages-container"
          >
            {/* Only render pages that are in loadedPageNumbers */}
            {Array.from({ length: pdf.numPages }, (_, i) => i + 1).map((pageNum) => {
              if (loadedPageNumbers.has(pageNum)) {
                return (
                  <PDFPage
                    key={pageNum}
                    pdf={pdf}
                    pageNum={pageNum}
                    onRendered={handlePageRendered}
                  />
                )
              } else {
                // Placeholder that triggers loading when scrolled into view
                return (
                  <div 
                    key={pageNum} 
                    className="page-wrapper" 
                    style={{ minHeight: '600px', background: '#1a1a1a' }}
                  >
                    <div className="page-header">
                      <span className="page-number">Page {pageNum}</span>
                      <span className="page-loading">(Scroll to load)</span>
                    </div>
                    <div 
                      className="lazy-page-trigger" 
                      data-page-num={pageNum}
                      style={{ 
                        minHeight: '500px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: '#1a1a1a'
                      }}
                    >
                      <span style={{ color: '#666' }}>Page {pageNum}</span>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      )}

      {!showAllPages && pageNumber && !error && (
        <div className="pdf-container">
          <div className="pdf-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span className="page-info">Employee ID: {employeeId} | Page {pageNumber}</span>
              <div className="native-zoom-hint">
                <span style={{ fontSize: '0.75rem', color: '#888' }}>Pinch to zoom • Drag to pan</span>
              </div>
            </div>
          </div>
          <div 
            ref={wrapperRef}
            className="canvas-wrapper"
          >
            <canvas ref={canvasRef} className="pdf-canvas"></canvas>
          </div>
        </div>
      )}
    </div>
  )
}

export default PDFViewer
