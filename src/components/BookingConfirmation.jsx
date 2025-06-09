import './BookingConfirmation.css'

const BookingConfirmation = ({ bookingData, onComplete, onBack }) => {
  const handleNewBooking = () => {
    // Reset to main page
    window.location.reload()
  }

  const handlePrintConfirmation = () => {
    window.print()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getTimeSlotLabel = (timeSlot) => {
    const slots = {
      'morning': '8:00 AM - 12:00 PM',
      'afternoon': '12:00 PM - 5:00 PM',
      'anytime': '8:00 AM - 5:00 PM'
    }
    return slots[timeSlot] || timeSlot
  }

  return (
    <div className="booking-confirmation">
      <div className="confirmation-header">
        <div className="success-icon">
          <span>✅</span>
        </div>
        <h2>Booking Confirmed!</h2>
        <p>Your skip hire has been successfully booked</p>
        <div className="booking-reference">
          <span>Booking Reference: <strong>{bookingData.transactionId}</strong></span>
        </div>
      </div>

      <div className="confirmation-details">
        <div className="detail-section">
          <h3>Skip Details</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="label">Skip Size:</span>
              <span className="value">{bookingData.skip.size} Yard Skip</span>
            </div>
            <div className="detail-item">
              <span className="label">Hire Period:</span>
              <span className="value">{bookingData.skip.hire_period_days} days</span>
            </div>
            <div className="detail-item">
              <span className="label">Delivery Date:</span>
              <span className="value">{formatDate(bookingData.selectedDate)}</span>
            </div>
            <div className="detail-item">
              <span className="label">Time Slot:</span>
              <span className="value">{getTimeSlotLabel(bookingData.timeSlot)}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Delivery Address</h3>
          <div className="address-info">
            <p>{bookingData.address}</p>
            <div className="placement-info">
              <span className="placement-badge">
                {bookingData.placement === 'private-property' ? '🏠 Private Property' : '🛣️ Public Road'}
              </span>
              {bookingData.permitRequired && (
                <span className="permit-badge">📋 Permit Required</span>
              )}
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Customer Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="label">Name:</span>
              <span className="value">{bookingData.customerDetails.firstName} {bookingData.customerDetails.lastName}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">{bookingData.customerDetails.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">Phone:</span>
              <span className="value">{bookingData.customerDetails.phone}</span>
            </div>
            {bookingData.customerDetails.company && (
              <div className="detail-item">
                <span className="label">Company:</span>
                <span className="value">{bookingData.customerDetails.company}</span>
              </div>
            )}
          </div>
        </div>

        <div className="detail-section">
          <h3>Payment Summary</h3>
          <div className="payment-summary">
            <div className="summary-item">
              <span>{bookingData.skip.size} Yard Skip ({bookingData.skip.hire_period_days} days)</span>
              <span>£{bookingData.skip.price_before_vat.toFixed(2)}</span>
            </div>
            {bookingData.permitRequired && (
              <div className="summary-item">
                <span>Council Permit</span>
                <span>£25.00</span>
              </div>
            )}
            <div className="summary-item">
              <span>VAT (20%)</span>
              <span>£{(bookingData.totalAmount * 0.2 / 1.2).toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total Paid</span>
              <span>£{bookingData.totalAmount.toFixed(2)}</span>
            </div>
            <div className="payment-method">
              <span>Payment Method: Credit/Debit Card</span>
              <span className="payment-status">✅ Paid</span>
            </div>
          </div>
        </div>
      </div>

      <div className="next-steps">
        <h3>What Happens Next?</h3>
        <div className="steps-list">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <strong>Confirmation Email</strong>
              <p>You'll receive a confirmation email with all booking details within 5 minutes</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <strong>Delivery Preparation</strong>
              <p>Our team will prepare your skip and contact you 1 hour before delivery</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <strong>Skip Delivery</strong>
              <p>Your skip will be delivered on {formatDate(bookingData.selectedDate)} during your selected time slot</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">4</div>
            <div className="step-content">
              <strong>Collection</strong>
              <p>We'll collect your skip after {bookingData.skip.hire_period_days} days or when you call us</p>
            </div>
          </div>
        </div>
      </div>

      <div className="confirmation-actions">
        <button className="btn-secondary" onClick={handlePrintConfirmation}>
          🖨️ Print Confirmation
        </button>
        <button className="btn-primary" onClick={handleNewBooking}>
          Book Another Skip
        </button>
      </div>
    </div>
  )
}

export default BookingConfirmation
