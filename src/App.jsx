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
      <Header
        sortBy={sortBy}
        filterBy={filterBy}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <h1>Choose Your Skip Size</h1>
            <p>Select the skip size that best suits your needs</p>
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
