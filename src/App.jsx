import { useState, useEffect } from 'react'
import Header from './components/Header'
import SkipGrid from './components/SkipGrid'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import './App.css'

function App() {
  const [skips, setSkips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSkip, setSelectedSkip] = useState(null)
  const [sortBy, setSortBy] = useState('size')
  const [filterBy, setFilterBy] = useState('all')

  useEffect(() => {
    fetchSkips()
  }, [])

  const fetchSkips = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
      if (!response.ok) {
        throw new Error('Failed to fetch skip data')
      }
      const data = await response.json()
      setSkips(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSkipSelect = (skip) => {
    setSelectedSkip(skip)
  }

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
  }

  const handleFilterChange = (newFilter) => {
    setFilterBy(newFilter)
  }

  const getSortedAndFilteredSkips = () => {
    let filteredSkips = [...skips]

    // Apply filters
    if (filterBy === 'road-allowed') {
      filteredSkips = filteredSkips.filter(skip => skip.allowed_on_road)
    } else if (filterBy === 'heavy-waste') {
      filteredSkips = filteredSkips.filter(skip => skip.allows_heavy_waste)
    }

    // Apply sorting
    filteredSkips.sort((a, b) => {
      switch (sortBy) {
        case 'size':
          return a.size - b.size
        case 'price':
          return a.price_before_vat - b.price_before_vat
        case 'price-desc':
          return b.price_before_vat - a.price_before_vat
        default:
          return a.size - b.size
      }
    })

    return filteredSkips
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={fetchSkips} />

  return (
    <div className="app">
      <div className="neon-background">
        <div className="grid-overlay"></div>
        <div className="floating-particles"></div>
        <div className="cyber-grid"></div>
      </div>

      <Header
        sortBy={sortBy}
        filterBy={filterBy}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />

      <main className="main-content">
        <div className="container">
          <div className="hero-section">
            <h1 className="neon-title">
              <span className="neon-text">SKIP</span>
              <span className="neon-text-secondary">SELECTION</span>
              <span className="neon-text-accent">V2.0</span>
            </h1>
            <p className="hero-subtitle">
              Advanced waste management solutions with cutting-edge technology
            </p>
            <div className="stats-bar">
              <div className="stat-item">
                <span className="stat-number">{skips.length}</span>
                <span className="stat-label">Available Skips</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{getSortedAndFilteredSkips().length}</span>
                <span className="stat-label">Filtered Results</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{selectedSkip ? '1' : '0'}</span>
                <span className="stat-label">Selected</span>
              </div>
            </div>
          </div>

          <SkipGrid
            skips={getSortedAndFilteredSkips()}
            selectedSkip={selectedSkip}
            onSkipSelect={handleSkipSelect}
          />
        </div>
      </main>
    </div>
  )
}

export default App
