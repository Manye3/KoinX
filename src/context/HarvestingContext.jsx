import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { fetchHoldings } from "../api/holdings";
import { fetchCapitalGains } from "../api/capitalGains";

const HarvestingContext = createContext(null);

export function HarvestingProvider({ children }) {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        setHoldings(holdingsData);
        setCapitalGains(gainsData.capitalGains);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Retry function
  const retry = useCallback(() => {
    setSelectedIds(new Set());
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        setHoldings(holdingsData);
        setCapitalGains(gainsData.capitalGains);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Toggle individual holding
  const toggleHolding = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Toggle all holdings
  const toggleAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === holdings.length) {
        return new Set();
      }
      return new Set(holdings.map((h) => h.id));
    });
  }, [holdings]);

  // Pre-harvesting gains (from API)
  const preHarvesting = useMemo(() => {
    if (!capitalGains) {
      return {
        stcg: { profits: 0, losses: 0, net: 0 },
        ltcg: { profits: 0, losses: 0, net: 0 },
        realisedGains: 0,
      };
    }
    const stcgNet = capitalGains.stcg.profits - capitalGains.stcg.losses;
    const ltcgNet = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
    return {
      stcg: {
        profits: capitalGains.stcg.profits,
        losses: capitalGains.stcg.losses,
        net: stcgNet,
      },
      ltcg: {
        profits: capitalGains.ltcg.profits,
        losses: capitalGains.ltcg.losses,
        net: ltcgNet,
      },
      realisedGains: stcgNet + ltcgNet,
    };
  }, [capitalGains]);

  // After-harvesting gains (updated based on selections)
  const afterHarvesting = useMemo(() => {
    if (!capitalGains) {
      return {
        stcg: { profits: 0, losses: 0, net: 0 },
        ltcg: { profits: 0, losses: 0, net: 0 },
        effectiveGains: 0,
      };
    }

    let stcgProfits = capitalGains.stcg.profits;
    let stcgLosses = capitalGains.stcg.losses;
    let ltcgProfits = capitalGains.ltcg.profits;
    let ltcgLosses = capitalGains.ltcg.losses;

    // For each selected holding, add gains to profits or losses
    holdings.forEach((holding) => {
      if (selectedIds.has(holding.id)) {
        // Short-term capital gains
        if (holding.stcg.gain >= 0) {
          stcgProfits += holding.stcg.gain;
        } else {
          stcgLosses += Math.abs(holding.stcg.gain);
        }

        // Long-term capital gains
        if (holding.ltcg.gain >= 0) {
          ltcgProfits += holding.ltcg.gain;
        } else {
          ltcgLosses += Math.abs(holding.ltcg.gain);
        }
      }
    });

    const stcgNet = stcgProfits - stcgLosses;
    const ltcgNet = ltcgProfits - ltcgLosses;
    const effectiveGains = stcgNet + ltcgNet;

    return {
      stcg: { profits: stcgProfits, losses: stcgLosses, net: stcgNet },
      ltcg: { profits: ltcgProfits, losses: ltcgLosses, net: ltcgNet },
      effectiveGains,
    };
  }, [capitalGains, holdings, selectedIds]);

  // Savings calculation
  const savings = useMemo(() => {
    const diff = preHarvesting.realisedGains - afterHarvesting.effectiveGains;
    return diff > 0 ? diff : 0;
  }, [preHarvesting, afterHarvesting]);

  const allSelected = holdings.length > 0 && selectedIds.size === holdings.length;

  const value = {
    holdings,
    selectedIds,
    loading,
    error,
    preHarvesting,
    afterHarvesting,
    savings,
    allSelected,
    toggleHolding,
    toggleAll,
    retry,
  };

  return (
    <HarvestingContext.Provider value={value}>
      {children}
    </HarvestingContext.Provider>
  );
}

export function useHarvesting() {
  const context = useContext(HarvestingContext);
  if (!context) {
    throw new Error("useHarvesting must be used within a HarvestingProvider");
  }
  return context;
}
