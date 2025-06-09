import './LoadingSpinner.css'

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading skip options...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
