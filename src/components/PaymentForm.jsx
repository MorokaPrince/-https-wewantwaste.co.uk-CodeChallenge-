import { useState } from 'react'
import './PaymentForm.css'

const PaymentForm = ({ bookingData, onComplete, onBack, totalPrice }) => {
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: ''
  })
  
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })
  
  const [processing, setProcessing] = useState(false)

  const handleCustomerChange = (field, value) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }))
  }

  const handleCardChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone']
    const missingFields = requiredFields.filter(field => !customerDetails[field])
    
    if (missingFields.length > 0) {
      alert('Please fill in all required customer details')
      return
    }

    if (paymentMethod === 'card') {
      const requiredCardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName']
      const missingCardFields = requiredCardFields.filter(field => !cardDetails[field])
      
      if (missingCardFields.length > 0) {
        alert('Please fill in all card details')
        return
      }
    }

    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const paymentData = {
        customerDetails,
        paymentMethod,
        paymentDetails: paymentMethod === 'card' ? cardDetails : {},
        totalAmount: totalPrice,
        paymentStatus: 'completed',
        transactionId: 'TXN' + Date.now()
      }
      
      setProcessing(false)
      onComplete(paymentData)
    }, 3000)
  }

  const permitCost = bookingData.permitRequired ? 25.00 : 0
  const skipCost = bookingData.skip.price_before_vat
  const vatAmount = (skipCost + permitCost) * 0.2
  const finalTotal = skipCost + permitCost + vatAmount

  return (
    <div className="payment-form">
      <div className="step-header">
        <div className="step-icon-large">
          <span>💳</span>
        </div>
        <h2>Payment</h2>
        <p>Secure online payment for your skip hire</p>
      </div>

      <div className="payment-container">
        <div className="customer-details">
          <h3>Customer Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                value={customerDetails.firstName}
                onChange={(e) => handleCustomerChange('firstName', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                value={customerDetails.lastName}
                onChange={(e) => handleCustomerChange('lastName', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                value={customerDetails.email}
                onChange={(e) => handleCustomerChange('email', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                value={customerDetails.phone}
                onChange={(e) => handleCustomerChange('phone', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="company">Company (Optional)</label>
              <input
                type="text"
                id="company"
                value={customerDetails.company}
                onChange={(e) => handleCustomerChange('company', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="payment-section">
          <h3>Payment Method</h3>
          <div className="payment-methods">
            <label className="payment-method-option">
              <input
                type="radio"
                name="payment-method"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="method-content">
                <strong>💳 Credit/Debit Card</strong>
                <small>Secure payment with Visa, Mastercard, or American Express</small>
              </span>
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="card-details">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="cardholderName">Cardholder Name *</label>
                  <input
                    type="text"
                    id="cardholderName"
                    value={cardDetails.cardholderName}
                    onChange={(e) => handleCardChange('cardholderName', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={(e) => handleCardChange('cardNumber', formatCardNumber(e.target.value))}
                    className="form-input"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={(e) => handleCardChange('expiryDate', formatExpiryDate(e.target.value))}
                    className="form-input"
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardChange('cvv', e.target.value.replace(/\D/g, ''))}
                    className="form-input"
                    placeholder="123"
                    maxLength="4"
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            <div className="summary-item">
              <span>{bookingData.skip.size} Yard Skip ({bookingData.skip.hire_period_days} days)</span>
              <span>£{skipCost.toFixed(2)}</span>
            </div>
            {permitCost > 0 && (
              <div className="summary-item">
                <span>Council Permit</span>
                <span>£{permitCost.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-item">
              <span>VAT (20%)</span>
              <span>£{vatAmount.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>£{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="step-actions">
        <button
          className="btn-primary-full"
          onClick={handleSubmit}
          disabled={processing}
        >
          {processing ? (
            <>
              <span className="spinner"></span>
              Processing Secure Payment...
            </>
          ) : (
            `Complete Booking - Pay £${finalTotal.toFixed(2)} →`
          )}
        </button>
      </div>
    </div>
  )
}

export default PaymentForm
