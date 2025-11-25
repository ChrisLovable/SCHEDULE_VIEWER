import { useState } from 'react'
import PDFViewer from './components/PDFViewer'
import OfflineIndicator from './components/OfflineIndicator'
import './App.css'

function App() {
  const [employeeId, setEmployeeId] = useState('')
  const [searchId, setSearchId] = useState('')
  const [pdfPath, setPdfPath] = useState('/INDIVIDUAL_SCHEDULES.PDF')

  const handleSearch = () => {
    if (employeeId.trim()) {
      const id = employeeId.trim()
      // Determine which PDF to use based on input
      if (id === '2222') {
        setPdfPath('/SITE_SCHEDULES.pdf') // Use lowercase .pdf extension
      } else {
        setPdfPath('/INDIVIDUAL_SCHEDULES.PDF')
      }
      setSearchId(id)
    }
  }

  const handleBack = () => {
    setSearchId('')
    setEmployeeId('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const isViewing = !!searchId

  return (
    <div className={`app ${isViewing ? 'viewing-mode' : ''}`}>
      {!isViewing && <OfflineIndicator />}
      
      {isViewing && (
        <button onClick={handleBack} className="back-button" title="Back to Search">
          ← Back
        </button>
      )}

      {!isViewing && (
        <>
          <header className="app-header">
            <h1>Schedule Viewer</h1>
          </header>

          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter Employee ID Number"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                onKeyPress={handleKeyPress}
                className="id-input"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
              />
              <button 
                onClick={handleSearch} 
                className="search-button"
              >
                Search
              </button>
            </div>
            <p className="subtitle" style={{ textAlign: 'center', marginTop: '0.75rem' }}>Enter Employee ID to view schedule</p>
          </div>
        </>
      )}

      {isViewing && (
        <div className="viewer-container">
          <PDFViewer employeeId={searchId} pdfPath={pdfPath} />
        </div>
      )}
    </div>
  )
}

export default App

