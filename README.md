# Analytics Strategy Dashboard Design

A comprehensive marketplace analytics presentation showcasing strategic data analysis for revenue optimization, user retention, and content quality.

## Features

- **Dynamic Pricing & Elasticity Engine** - Analyzes historical sales against discount depth
- **Interactive Data Visualizations** - Built with Recharts
- **Category Filtering** - Filter data by Tech & Coding, Business, and Design categories
- **Revenue Optimization Analysis** - Find the sweet spot between volume and margin
- **Responsive Design** - Beautiful UI with Tailwind CSS

## Tech Stack

- React 18
- Vite
- Recharts
- Tailwind CSS
- Lucide React Icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── AnalyticsPresentation.jsx  # Main component
│   ├── index.jsx                  # Entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies
```

## Features Overview

### 1. Features Tab
Displays five key analytical engines:
- Dynamic Pricing & Elasticity Engine
- Churn Prediction Model
- Search Gap Analysis
- Course 'Stickiness' Index
- Instructor Performance Heatmap

### 2. Logic Tab
Shows the algorithm design and implementation logic for the Dynamic Pricing Engine with Python pseudocode.

### 3. Analysis Tab
Interactive dashboard with:
- Revenue vs Conversion Rate charts
- Sales volume visualization
- Category-based filtering
- Data table with all metrics

## License

MIT
