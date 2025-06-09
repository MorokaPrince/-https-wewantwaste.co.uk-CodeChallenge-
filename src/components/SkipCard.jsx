import './SkipCard.css'

const SkipCard = ({ skip, isSelected, onSelect }) => {
  const calculateTotalPrice = () => {
    const vatAmount = (skip.price_before_vat * skip.vat) / 100
    return skip.price_before_vat + vatAmount
  }

  const getSkipImage = (size) => {
    // Use real skip images from Supabase storage
    const baseUrl = 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/'
    const imageMap = {
      4: '4-yarder-skip.jpg',
      6: '6-yarder-skip.jpg',
      8: '8-yarder-skip.jpg',
      10: '10-yarder-skip.jpg',
      12: '12-yarder-skip.jpg',
      14: '14-yarder-skip.jpg',
      16: '16-yarder-skip.jpg',
      20: '20-yarder-skip.jpg',
      40: '40-yarder-skip.jpg'
    }

    return `${baseUrl}${imageMap[size] || '16-yarder-skip.jpg'}`
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
        
        <button className={`select-button ${isSelected ? 'selected' : ''}`}>
          {isSelected ? '✓ Selected' : 'Select This Skip'}
        </button>

        {isSelected && (
          <div className="selection-details">
            <div className="next-steps">
              <h4>Next Steps:</h4>
              <ul>
                <li>✓ Skip size selected: {skip.size} yards</li>
                <li>📅 Hire period: {skip.hire_period_days} days</li>
                <li>💰 Total cost: £{calculateTotalPrice().toFixed(2)} (inc. VAT)</li>
                <li>📞 Call to book or continue online</li>
              </ul>
              <div className="booking-actions">
                <button className="book-now-btn">Book Now</button>
                <button className="call-btn">Call Us</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SkipCard
