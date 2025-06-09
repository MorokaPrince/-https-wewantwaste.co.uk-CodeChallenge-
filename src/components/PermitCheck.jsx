import { useState } from 'react'
import './PermitCheck.css'

const PermitCheck = ({ bookingData, onComplete, onBack }) => {
  const [placement, setPlacement] = useState('')
  const [address, setAddress] = useState('')
  const [permitRequired, setPermitRequired] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePlacementChange = (value) => {
    setPlacement(value)
    // Auto-determine permit requirement based on placement
    if (value === 'private-property') {
      setPermitRequired(false)
    } else if (value === 'public-road') {
      setPermitRequired(true)
    } else {
      setPermitRequired(null)
    }
  }

  const handleContinue = () => {
    if (!placement || !address) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    
    // Simulate permit check process
    setTimeout(() => {
      const permitData = {
        placement,
        address,
        permitRequired,
        permitDetails: permitRequired ? {
          cost: 25.00,
          processingTime: '3-5 working days',
          authority: 'Local Council'
        } : null
      }
      
      setLoading(false)
      onComplete(permitData)
    }, 1500)
  }

  return (
    <div className="permit-check">
      <div className="step-header">
        <div className="step-icon-large">
          <span>🏗️</span>
        </div>
        <h2>Permit Check</h2>
        <p>Verify placement requirements for your skip</p>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label htmlFor="address">Delivery Address *</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter full delivery address"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label>Skip Placement Location *</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="placement"
                value="private-property"
                checked={placement === 'private-property'}
                onChange={(e) => handlePlacementChange(e.target.value)}
              />
              <span className="radio-custom"></span>
              <div className="radio-content">
                <strong>Private Property</strong>
                <small>Driveway, private land, or property grounds</small>
              </div>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="placement"
                value="public-road"
                checked={placement === 'public-road'}
                onChange={(e) => handlePlacementChange(e.target.value)}
              />
              <span className="radio-custom"></span>
              <div className="radio-content">
                <strong>Public Road/Street</strong>
                <small>On the road, pavement, or public highway</small>
              </div>
            </label>
          </div>
        </div>

        {permitRequired !== null && (
          <div className={`permit-result ${permitRequired ? 'permit-required' : 'no-permit'}`}>
            <div className="result-icon">
              {permitRequired ? '📋' : '✅'}
            </div>
            <div className="result-content">
              {permitRequired ? (
                <>
                  <h3>Permit Required</h3>
                  <p>A council permit is required for road placement</p>
                  <div className="permit-details">
                    <div className="detail-item">
                      <span className="label">Cost:</span>
                      <span className="value">£25.00</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Processing:</span>
                      <span className="value">3-5 working days</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3>No Permit Required</h3>
                  <p>Private property placement - no permit needed</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="step-actions">
        <button
          className="btn-primary-full"
          onClick={handleContinue}
          disabled={!placement || !address || loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Verifying Permit Requirements...
            </>
          ) : (
            'Continue to Date Selection →'
          )}
        </button>
      </div>
    </div>
  )
}

export default PermitCheck
