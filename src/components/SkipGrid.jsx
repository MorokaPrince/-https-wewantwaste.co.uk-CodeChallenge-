import SkipCard from './SkipCard'
import './SkipGrid.css'

const SkipGrid = ({ skips, selectedSkip, onSkipSelect }) => {
  return (
    <div className="skip-grid">
      {skips.map((skip) => (
        <SkipCard
          key={skip.id}
          skip={skip}
          isSelected={selectedSkip?.id === skip.id}
          onSelect={() => onSkipSelect(skip)}
        />
      ))}
    </div>
  )
}

export default SkipGrid
