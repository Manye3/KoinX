import { useState } from "react";
import { useHarvesting } from "../../context/HarvestingContext";
import {
  formatCurrency,
  formatHoldings,
  formatPricePerUnit,
  formatBalance,
} from "../../utils/formatters";
import "./HoldingsTable.css";

const INITIAL_VISIBLE = 8;

export default function HoldingsTable() {
  const { holdings, selectedIds, toggleHolding, toggleAll, allSelected } =
    useHarvesting();
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // Sort holdings
  const sortedHoldings = [...holdings].sort((a, b) => {
    if (!sortConfig.key) {
      // Default: sort by absolute stcg gain descending
      return Math.abs(b.stcg.gain) - Math.abs(a.stcg.gain);
    }
    let aVal, bVal;
    switch (sortConfig.key) {
      case "coin":
        aVal = a.coin.toLowerCase();
        bVal = b.coin.toLowerCase();
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      case "holdings":
        aVal = a.totalHolding;
        bVal = b.totalHolding;
        break;
      case "currentPrice":
        aVal = a.currentPrice;
        bVal = b.currentPrice;
        break;
      case "stcg":
        aVal = a.stcg.gain;
        bVal = b.stcg.gain;
        break;
      case "ltcg":
        aVal = a.ltcg.gain;
        bVal = b.ltcg.gain;
        break;
      default:
        return 0;
    }
    return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
  });

  const visibleHoldings = showAll
    ? sortedHoldings
    : sortedHoldings.slice(0, INITIAL_VISIBLE);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return <span className="sort-icon">↕</span>;
    return (
      <span className="sort-icon sort-icon--active">
        {sortConfig.direction === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const isSelected = (id) => selectedIds.has(id);

  return (
    <div className="holdings-section">
      <h2 className="holdings-title">Holdings</h2>
      <div className="holdings-table-wrapper">
        <table className="holdings-table" id="holdings-table">
          <thead>
            <tr>
              <th className="col-checkbox">
                <label className="checkbox-wrapper" id="select-all-checkbox">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all holdings"
                  />
                  <span
                    className={`checkbox-custom ${allSelected ? "checkbox-custom--checked" : ""}`}
                  >
                    {allSelected && (
                      <svg viewBox="0 0 14 14" fill="none">
                        <path
                          d="M11.5 3.5L5.5 9.5L2.5 6.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {!allSelected && selectedIds.size > 0 && (
                      <svg viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3 7H11"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </span>
                </label>
              </th>
              <th className="col-asset" onClick={() => handleSort("coin")}>
                Asset {getSortIndicator("coin")}
              </th>
              <th
                className="col-holdings"
                onClick={() => handleSort("holdings")}
              >
                <span>Holdings</span>
                <span className="col-sub">Avg Buy Price</span>
                {getSortIndicator("holdings")}
              </th>
              <th
                className="col-price"
                onClick={() => handleSort("currentPrice")}
              >
                Current Price {getSortIndicator("currentPrice")}
              </th>
              <th className="col-stcg" onClick={() => handleSort("stcg")}>
                Short-Term {getSortIndicator("stcg")}
              </th>
              <th className="col-ltcg" onClick={() => handleSort("ltcg")}>
                Long-Term {getSortIndicator("ltcg")}
              </th>
              <th className="col-sell">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((holding) => {
              const selected = isSelected(holding.id);
              return (
                <tr
                  key={holding.id}
                  className={`holdings-row ${selected ? "holdings-row--selected" : ""}`}
                  onClick={() => toggleHolding(holding.id)}
                  id={`holding-${holding.id}`}
                >
                  <td className="col-checkbox">
                    <label
                      className="checkbox-wrapper"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleHolding(holding.id)}
                        aria-label={`Select ${holding.coinName}`}
                      />
                      <span
                        className={`checkbox-custom ${selected ? "checkbox-custom--checked" : ""}`}
                      >
                        {selected && (
                          <svg viewBox="0 0 14 14" fill="none">
                            <path
                              d="M11.5 3.5L5.5 9.5L2.5 6.5"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                    </label>
                  </td>
                  <td className="col-asset">
                    <div className="asset-info">
                      <img
                        src={holding.logo}
                        alt={holding.coin}
                        className="asset-logo"
                        onError={(e) => {
                          e.target.src =
                            "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
                        }}
                      />
                      <div className="asset-names">
                        <span className="asset-name">{holding.coinName}</span>
                        <span className="asset-ticker">{holding.coin}</span>
                      </div>
                    </div>
                  </td>
                  <td className="col-holdings">
                    <div className="cell-stacked">
                      <span className="cell-primary">
                        {formatHoldings(holding.totalHolding, holding.coin)}
                      </span>
                      <span className="cell-secondary">
                        {formatPricePerUnit(
                          holding.averageBuyPrice,
                          holding.coin
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="col-price">
                    <span
                      className="price-value"
                      title={`$${holding.currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                    >
                      {formatCurrency(holding.currentPrice)}
                    </span>
                  </td>
                  <td className="col-stcg">
                    <div className="cell-stacked">
                      <span
                        className={`cell-primary ${holding.stcg.gain >= 0 ? "gain-positive" : "gain-negative"}`}
                      >
                        {formatCurrency(holding.stcg.gain)}
                      </span>
                      <span className="cell-secondary">
                        {formatBalance(holding.stcg.balance, holding.coin)}
                      </span>
                    </div>
                  </td>
                  <td className="col-ltcg">
                    <div className="cell-stacked">
                      <span
                        className={`cell-primary ${holding.ltcg.gain >= 0 ? "gain-positive" : "gain-negative"}`}
                      >
                        {formatCurrency(holding.ltcg.gain)}
                      </span>
                      <span className="cell-secondary">
                        {formatBalance(holding.ltcg.balance, holding.coin)}
                      </span>
                    </div>
                  </td>
                  <td className="col-sell">
                    {selected ? (
                      <span className="sell-amount">
                        {formatHoldings(holding.totalHolding, holding.coin)}
                      </span>
                    ) : (
                      <span className="sell-dash">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {holdings.length > INITIAL_VISIBLE && (
        <button
          className="view-all-btn"
          onClick={() => setShowAll((prev) => !prev)}
          id="view-all-button"
        >
          {showAll
            ? "Show Less"
            : `View All (${holdings.length - INITIAL_VISIBLE} more)`}
          <svg
            className={`view-all-chevron ${showAll ? "view-all-chevron--up" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
