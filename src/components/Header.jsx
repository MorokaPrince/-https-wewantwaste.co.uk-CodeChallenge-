import './Header.css'

const Header = ({ sortBy, filterBy, onSortChange, onFilterChange }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <h2 className="logo">WeWantWaste</h2>
            <span className="tagline">Skip Hire Made Simple</span>
          </div>
          
          <div className="controls">
            <div className="control-group">
              <label htmlFor="sort-select">Sort by:</label>
              <select 
                id="sort-select"
                value={sortBy} 
                onChange={(e) => onSortChange(e.target.value)}
                className="control-select"
              >
                <option value="size">Size (Small to Large)</option>
                <option value="price">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
            
            <div className="control-group">
              <label htmlFor="filter-select">Filter:</label>
              <select 
                id="filter-select"
                value={filterBy} 
                onChange={(e) => onFilterChange(e.target.value)}
                className="control-select"
              >
                <option value="all">All Skips</option>
                <option value="road-allowed">Road Placement Allowed</option>
                <option value="heavy-waste">Heavy Waste Allowed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
