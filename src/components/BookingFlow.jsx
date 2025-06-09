import { useState } from 'react'
import PermitCheck from './PermitCheck'
import DateSelection from './DateSelection'
import PaymentForm from './PaymentForm'
import BookingConfirmation from './BookingConfirmation'
import './BookingFlow.css'

const BookingFlow = ({ selectedSkip, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    skip: selectedSkip,
    permitRequired: null,
    permitDetails: {},
    selectedDate: null,
    timeSlot: null,
    paymentDetails: {},
    customerDetails: {}
  })

  const steps = [
    { id: 1, title: 'Permit Check', component: PermitCheck },
    { id: 2, title: 'Choose Date', component: DateSelection },
    { id: 3, title: 'Payment', component: PaymentForm },
    { id: 4, title: 'Confirmation', component: BookingConfirmation }
  ]

  const handleStepComplete = (stepData) => {
    setBookingData(prev => ({ ...prev, ...stepData }))
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  const calculateTotalPrice = () => {
    const basePrice = selectedSkip.price_before_vat
    const vatAmount = basePrice * 0.2
    return basePrice + vatAmount
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="booking-flow">
      <div className="booking-container">
        {/* Progress Header */}
        <div className="booking-header">
          <div className="step-progress">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`progress-step ${
                  index + 1 === currentStep ? 'active' : 
                  index + 1 < currentStep ? 'completed' : 'pending'
                }`}
              >
                <div className="step-icon">
                  {index + 1 < currentStep ? '✓' : index + 1}
                </div>
                <span className="step-title">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Skip Summary */}
        <div className="selected-skip-summary">
          <div className="summary-badge">✓ SELECTED</div>
          <div className="skip-details">
            <h3>Skip Size Selected</h3>
            <p>{selectedSkip.size} Yard Skip</p>
          </div>
          <div className="price-display">
            <span className="price">£{calculateTotalPrice().toFixed(2)}</span>
            <span className="hire-period">{selectedSkip.hire_period_days} day hire</span>
          </div>
        </div>

        {/* Current Step Content */}
        <div className="step-content">
          <CurrentStepComponent
            bookingData={bookingData}
            onComplete={handleStepComplete}
            onBack={handleStepBack}
            selectedSkip={selectedSkip}
            totalPrice={calculateTotalPrice()}
          />
        </div>
      </div>
    </div>
  )
}

export default BookingFlow
