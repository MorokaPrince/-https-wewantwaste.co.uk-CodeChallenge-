# WeWantWaste Skip Selection Page Redesign

A complete redesign of the skip selection page with modern React architecture, responsive design, and enhanced user experience.

## 🎯 Project Overview

This project is a complete redesign of the WeWantWaste skip selection page, transforming the original dark-themed grid layout into a modern, clean, and responsive interface while maintaining all core functionality.

### Original vs. Redesigned

**Original Design:**
- Dark theme with yellow skip containers
- Basic grid layout
- Limited mobile responsiveness
- Simple card design

**New Design:**
- Modern gradient background with clean white cards
- Enhanced mobile-first responsive design
- Interactive hover effects and animations
- Advanced filtering and sorting capabilities
- Improved accessibility and user experience

## 🚀 Features

### Core Functionality
- ✅ **Skip Selection**: Choose from various skip sizes (4-40 yards)
- ✅ **Dynamic Pricing**: Real-time price calculation with VAT
- ✅ **API Integration**: Fetches live data from WeWantWaste API
- ✅ **Responsive Design**: Optimized for mobile, tablet, and desktop

### Enhanced Features
- 🔄 **Sorting Options**: Sort by size, price (low to high, high to low)
- 🔍 **Filtering**: Filter by road placement allowed, heavy waste capability
- ⚡ **Loading States**: Smooth loading animations
- 🚨 **Error Handling**: Graceful error handling with retry functionality
- 🎨 **Modern UI**: Clean, contemporary design with smooth animations

## 🛠 Technical Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: CSS3 with CSS Grid and Flexbox
- **State Management**: React Hooks (useState, useEffect)
- **API**: RESTful API integration
- **Build Tool**: Vite for fast development and optimized builds
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Navigation header with controls
│   ├── Header.css
│   ├── SkipGrid.jsx           # Grid layout for skip cards
│   ├── SkipGrid.css
│   ├── SkipCard.jsx           # Individual skip card component
│   ├── SkipCard.css
│   ├── LoadingSpinner.jsx     # Loading state component
│   ├── LoadingSpinner.css
│   ├── ErrorMessage.jsx       # Error handling component
│   └── ErrorMessage.css
├── App.jsx                    # Main application component
├── App.css                    # Main application styles
├── index.css                  # Global styles and resets
└── main.jsx                   # Application entry point
```

## 🎨 Design Approach

### Visual Design
1. **Color Scheme**:
   - Primary: Indigo (#4f46e5) for buttons and accents
   - Background: Purple gradient (#667eea to #764ba2)
   - Cards: Clean white with subtle shadows
   - Text: Dark gray (#1f2937) for readability

2. **Typography**:
   - Font: Inter for modern, clean readability
   - Hierarchy: Clear heading sizes and weights
   - Line height: Optimized for readability (1.5-1.6)

3. **Layout**:
   - CSS Grid for responsive card layout
   - Flexbox for component internal layouts
   - Mobile-first responsive design
   - Consistent spacing using rem units

### User Experience
1. **Interaction Design**:
   - Hover effects on cards with subtle animations
   - Clear visual feedback for selected items
   - Smooth transitions (0.2-0.3s ease)
   - Loading states to manage user expectations

2. **Accessibility**:
   - Semantic HTML structure
   - Proper ARIA labels and roles
   - Keyboard navigation support
   - High contrast ratios for text

3. **Performance**:
   - Lazy loading for images
   - Optimized bundle size with Vite
   - Efficient re-renders with React hooks
   - Fast development with hot module replacement

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/MorokaPrince/-https-wewantwaste.co.uk-CodeChallenge-.git
   cd -https-wewantwaste.co.uk-CodeChallenge-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (1 column grid)
- **Tablet**: 768px - 1024px (2 column grid)
- **Desktop**: > 1024px (3 column grid)

### Mobile Optimizations
- Touch-friendly button sizes (minimum 44px)
- Simplified navigation for smaller screens
- Optimized image sizes
- Reduced animation complexity on mobile devices

## 🔌 API Integration

### Endpoint
```
GET https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

### Data Structure
```javascript
{
  id: number,
  size: number,
  hire_period_days: number,
  price_before_vat: number,
  vat: number,
  allowed_on_road: boolean,
  allows_heavy_waste: boolean,
  // ... other fields
}
```

### Error Handling
- Network error handling with retry functionality
- Loading states during API calls
- Graceful fallbacks for missing data
