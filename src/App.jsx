import { HarvestingProvider, useHarvesting } from "./context/HarvestingContext";
import Header from "./components/Header/Header";
import ImportantBanner from "./components/ImportantBanner/ImportantBanner";
import CapitalGainsCards from "./components/CapitalGainsCards/CapitalGainsCards";
import HoldingsTable from "./components/HoldingsTable/HoldingsTable";
import Loader from "./components/Loader/Loader";
import "./App.css";

function AppContent() {
  const { loading, error, retry } = useHarvesting();

  if (error) {
    return (
      <div className="app-wrapper">
        <Header />
        <div className="error-state" id="error-state">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Something went wrong</h2>
          <p className="error-message">{error}</p>
          <button className="error-retry-btn" onClick={retry} id="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <main className="app-main">
          <ImportantBanner />
          <CapitalGainsCards />
          <HoldingsTable />
        </main>
      )}
    </div>
  );
}

export default function App() {
  return (
    <HarvestingProvider>
      <AppContent />
    </HarvestingProvider>
  );
}
