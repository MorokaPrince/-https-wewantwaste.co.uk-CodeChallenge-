import { useState } from 'react'
import BookingFlow from './BookingFlow'
import './SkipCard.css'

const SkipCard = ({ skip, isSelected, onSelect }) => {
  const [showBookingFlow, setShowBookingFlow] = useState(false)
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
          {skip.allowed_on_road ? (
            <span className="feature-badge road-allowed">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
              </svg>
              Road Placement
            </span>
          ) : (
            <span className="feature-badge not-road-allowed">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Not Allowed On Road
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
        
        <button
          className={`select-button ${isSelected ? 'selected' : ''}`}
          onClick={() => {
            if (isSelected) {
              setShowBookingFlow(true)
            } else {
              onSelect(skip)
            }
          }}
        >
          {isSelected ? 'CONTINUE →' : 'SELECT THIS SKIP'}
        </button>

        {isSelected && (
          <div className="selection-details">
            <div className="process-steps">
              <div className="step completed">
                <div className="step-icon">✓</div>
                <div className="step-content">
                  <span className="step-title">Skip Size Selected</span>
                  <span className="step-detail">{skip.size} Yard Skip</span>
                </div>
              </div>

              <div className="step next">
                <div className="step-icon">📋</div>
                <div className="step-content">
                  <span className="step-title">Permit Check</span>
                  <span className="step-detail">Verify placement requirements</span>
                </div>
              </div>

              <div className="step pending">
                <div className="step-icon">📅</div>
                <div className="step-content">
                  <span className="step-title">Choose Date</span>
                  <span className="step-detail">Select delivery date</span>
                </div>
              </div>

              <div className="step pending">
                <div className="step-icon">💳</div>
                <div className="step-content">
                  <span className="step-title">Payment</span>
                  <span className="step-detail">Secure online payment</span>
                </div>
              </div>
            </div>

            <div className="selection-summary">
              <div className="summary-row">
                <span className="summary-label">{skip.size} Yard Skip</span>
                <span className="summary-value">£{calculateTotalPrice().toFixed(2)}</span>
              </div>
              <div className="summary-row hire-period">
                <span className="summary-detail">{skip.hire_period_days} day hire</span>
              </div>
            </div>

            <div className="action-buttons">
              <button className="back-btn">Back</button>
              <button className="continue-btn">Continue →</button>
            </div>

            <div className="disclaimer">
              <p>Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.</p>
            </div>
          </div>
        )}
      </div>

      {showBookingFlow && (
        <BookingFlow
          selectedSkip={skip}
          onBack={() => setShowBookingFlow(false)}
        />
      )}
    </div>
  )
}

export default SkipCard
