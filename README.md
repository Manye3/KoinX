# KoinX — Tax Loss Harvesting Tool

A responsive React-based Tax Loss Harvesting interface that helps users optimize their crypto capital gains by identifying tax-saving opportunities through strategic loss harvesting.

![Tax Loss Harvesting](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![Status](https://img.shields.io/badge/Status-Live-green)

## 🚀 Live Demo

[Deployed Link](#) *(Add your Vercel/Netlify link here)*

## ✨ Features

- **Pre & After Harvesting Cards** — Side-by-side comparison of capital gains before and after tax loss harvesting
- **Interactive Holdings Table** — Select individual assets or all at once to simulate harvesting scenarios
- **Real-time Calculations** — Instant updates to profits, losses, net gains, and savings when toggling holdings
- **Savings Indicator** — Dynamic message showing potential tax savings (🎉)
- **Skeleton Loading States** — Polished shimmer-effect loading skeletons
- **Error Handling** — Graceful error states with retry functionality
- **View All Toggle** — Expandable table to show/hide additional holdings
- **Column Sorting** — Sort holdings by any column (asset, price, gains)
- **Mobile Responsive** — Fully responsive design for all screen sizes
- **Dark Theme** — Premium dark UI matching the KoinX design language

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| Vite 6 | Build Tool & Dev Server |
| Vanilla CSS | Styling (CSS Custom Properties) |
| React Context | State Management |
| Mock APIs | Simulated async data fetching |

## 📁 Folder Structure

```
src/
├── api/                    # Mock API functions
│   ├── holdings.js         # Holdings data endpoint
│   └── capitalGains.js     # Capital gains data endpoint
├── components/
│   ├── CapitalGainsCards/   # Pre & After harvesting cards
│   ├── Header/              # App header
│   ├── HoldingsTable/       # Interactive holdings table
│   ├── ImportantBanner/     # Disclaimers banner
│   └── Loader/              # Skeleton loading state
├── context/
│   └── HarvestingContext.jsx # Global state management
├── utils/
│   └── formatters.js       # Currency & number formatting
├── App.jsx                 # Root component
├── App.css                 # App-level styles
├── index.css               # Global styles & design tokens
└── main.jsx                # Entry point
```

## 🏗️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd koinx-tax-loss-harvesting

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📐 Business Logic

### Pre-Harvesting Card
- Displays data directly from the Capital Gains API
- Shows STCG and LTCG profits, losses, and net gains
- **Realised Capital Gains** = Net STCG + Net LTCG

### After-Harvesting Card
- Initially mirrors the Pre-Harvesting card
- When a holding is selected:
  - If `gain > 0` → added to **profits**
  - If `gain < 0` → added to **losses**
- **Effective Capital Gains** updates in real-time
- Savings message appears when post-harvesting gains < pre-harvesting gains

### Holdings Table
- Each row is selectable via checkbox
- "Select All" checkbox in header
- **Amount to Sell** shows `totalHolding` when selected, `-` when not
- Gains are color-coded: green (profit) / red (loss)

## 🎨 Design Decisions

- **Inter font** from Google Fonts for modern, clean typography
- **CSS Custom Properties** for theming — easy to extend or customize
- **BEM-like naming** convention for CSS classes
- **Skeleton loaders** instead of spinners for perceived performance
- **Compact number formatting** (K, M, B suffixes) for readability
- **Subtle background gradients** for depth without distraction

## 📝 Assumptions

1. Currency displayed in USD ($) as shown in the reference design
2. Holdings sorted by absolute short-term gain (descending) by default
3. Initial view shows first 8 holdings with "View All" to expand
4. 5% simulated API error rate for demonstrating error states (refresh to see)
5. Each holding gets a unique ID combining coin symbol + index to handle duplicate coins (e.g., two USDC entries)

## 📱 Screenshots

*(Add screenshots here after running the app)*

## 📄 License

MIT
