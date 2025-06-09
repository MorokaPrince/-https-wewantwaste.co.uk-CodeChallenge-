import { useState } from 'react'
import './DateSelection.css'

const DateSelection = ({ bookingData, onComplete, onBack }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')

  // Generate available dates (next 14 days, excluding weekends for this example)
  const generateAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 21; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip weekends for delivery
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-GB', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          }),
          available: Math.random() > 0.3 // 70% chance of availability
        })
      }
    }
    
    return dates.slice(0, 10) // Show first 10 available dates
  }

  const timeSlots = [
    { value: 'morning', label: '8:00 AM - 12:00 PM', description: 'Morning delivery' },
    { value: 'afternoon', label: '12:00 PM - 5:00 PM', description: 'Afternoon delivery' },
    { value: 'anytime', label: 'Anytime (8:00 AM - 5:00 PM)', description: 'Flexible timing' }
  ]

  const availableDates = generateAvailableDates()

  const handleContinue = () => {
    if (!selectedDate || !selectedTimeSlot) {
      alert('Please select both a date and time slot')
      return
    }

    const dateData = {
      selectedDate,
      timeSlot: selectedTimeSlot,
      deliveryDetails: {
        date: selectedDate,
        timeSlot: timeSlots.find(slot => slot.value === selectedTimeSlot)
      }
    }

    onComplete(dateData)
  }

  return (
    <div className="date-selection">
      <div className="step-header">
        <div className="step-icon-large">
          <span>📅</span>
        </div>
        <h2>Choose Date</h2>
        <p>Select your preferred delivery date and time</p>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label>Available Delivery Dates</label>
          <div className="date-grid">
            {availableDates.map((date) => (
              <label 
                key={date.value}
                className={`date-option ${!date.available ? 'unavailable' : ''}`}
              >
                <input
                  type="radio"
                  name="delivery-date"
                  value={date.value}
                  checked={selectedDate === date.value}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  disabled={!date.available}
                />
                <div className="date-content">
                  <span className="date-label">{date.label}</span>
                  {!date.available && <span className="unavailable-badge">Unavailable</span>}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Preferred Time Slot</label>
          <div className="time-slot-grid">
            {timeSlots.map((slot) => (
              <label key={slot.value} className="time-slot-option">
                <input
                  type="radio"
                  name="time-slot"
                  value={slot.value}
                  checked={selectedTimeSlot === slot.value}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                />
                <div className="slot-content">
                  <strong>{slot.label}</strong>
                  <small>{slot.description}</small>
                </div>
              </label>
            ))}
          </div>
        </div>

        {selectedDate && selectedTimeSlot && (
          <div className="selection-summary">
            <div className="summary-icon">✅</div>
            <div className="summary-content">
              <h3>Delivery Scheduled</h3>
              <p>
                <strong>Date:</strong> {availableDates.find(d => d.value === selectedDate)?.label}
              </p>
              <p>
                <strong>Time:</strong> {timeSlots.find(s => s.value === selectedTimeSlot)?.label}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="step-actions">
        <button
          className="btn-primary-full"
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTimeSlot}
        >
          Continue to Payment →
        </button>
      </div>
    </div>
  )
}

export default DateSelection
