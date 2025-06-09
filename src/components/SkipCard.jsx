import './SkipCard.css'

const SkipCard = ({ skip, isSelected, onSelect }) => {
  const calculateTotalPrice = () => {
    const vatAmount = (skip.price_before_vat * skip.vat) / 100
    return skip.price_before_vat + vatAmount
  }

  const getSkipImage = (size) => {
    // Generate a placeholder image URL based on skip size
    return `https://via.placeholder.com/300x200/4f46e5/ffffff?text=${size}+Yard+Skip`
  }

  return (
    <div 
      className={`skip-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="skip-image">
        <img 
          src={getSkipImage(skip.size)} 
          alt={`${skip.size} Yard Skip`}
          loading="lazy"
        />
        <div className="skip-size-badge">
          {skip.size} Yards
        </div>
      </div>
      
      <div className="skip-content">
        <h3 className="skip-title">{skip.size} Yard Skip</h3>
        <p className="skip-period">{skip.hire_period_days} day hire period</p>
        
        <div className="skip-features">
          {skip.allowed_on_road && (
            <span className="feature-badge road-allowed">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
              </svg>
              Road Placement
            </span>
          )}
          {skip.allows_heavy_waste && (
            <span className="feature-badge heavy-waste">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9Z"/>
              </svg>
              Heavy Waste OK
            </span>
          )}
        </div>
        
        <div className="skip-pricing">
          <div className="price-breakdown">
            <span className="price-before-vat">£{skip.price_before_vat}</span>
            <span className="vat-info">+ VAT ({skip.vat}%)</span>
          </div>
          <div className="total-price">
            <span className="total-label">Total:</span>
            <span className="total-amount">£{calculateTotalPrice().toFixed(2)}</span>
          </div>
        </div>
        
        <button className="select-button">
          {isSelected ? 'Selected' : 'Select This Skip'}
        </button>
      </div>
    </div>
  )
}

export default SkipCard
