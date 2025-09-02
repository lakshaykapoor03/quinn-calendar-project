# Infinite Scrollable Calendar

A modern, responsive React calendar component with infinite scrolling capabilities, built with Tailwind CSS.


## 🚀 Live Demo  

- **Live URL**: [https: //quinn-calendar.netlify.app/](https://quinn-calendar.netlify.app/)   

---

## 📦 Tech Stack  

- **Frontend**: React
- **Styling**: Tailwind CSS  


## Features

- **Infinite Scrolling**: Seamlessly scroll through months and years
- **Smooth Navigation**: Navigate between months and years with smooth animations
- **Date Selection**: Click on any date to select it
- **Today Highlighting**: Current date is highlighted with a special style
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Performance Optimized**: Uses Intersection Observer for efficient infinite scrolling
- **Modern UI**: Clean, professional design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── InfiniteCalendar.js    # Main calendar component with infinite scroll
│   ├── CalendarMonth.js       # Individual month display
│   ├── CalendarDay.js         # Individual day component
│   ├── NavigationControls.js  # Month/year navigation controls
│   └── Header.js              # App header
├── App.js                     # Main app component
├── index.js                   # React entry point
└── index.css                  # Global styles with Tailwind
```

## Key Components

### InfiniteCalendar
The main component that manages the infinite scrolling logic, month generation, and date selection state.

### CalendarMonth
Displays a single month with proper day layout, including previous/next month days for complete grid.

### CalendarDay
Individual day component with hover effects, selection states, and accessibility features.

### NavigationControls
Provides navigation buttons for month/year changes and a "Today" button.

## Customization

The calendar uses Tailwind CSS for styling. You can customize the appearance by modifying:

- `tailwind.config.js` - Color scheme and theme customization
- `src/index.css` - Component-specific styles
- Individual component files for specific styling needs

## Performance Features

- **Intersection Observer**: Efficiently detects when to load more months
- **Virtual Scrolling**: Only renders visible months
- **Debounced Loading**: Prevents excessive API calls during rapid scrolling
- **Memoized Components**: Optimized re-rendering

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
