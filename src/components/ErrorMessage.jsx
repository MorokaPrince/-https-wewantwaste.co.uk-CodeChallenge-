import './ErrorMessage.css'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h2>Oops! Something went wrong</h2>
        <p>{message}</p>
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      </div>
    </div>
  )
}

export default ErrorMessage
