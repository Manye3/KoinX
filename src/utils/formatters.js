/**
 * Format a number as currency with appropriate suffixes (K, M, B)
 * Matches the reference screenshots: $104.39K, $25.31M, -$16.76M
 */
export function formatCurrency(value, { showSign = false, compact = true } = {}) {
  if (value === undefined || value === null || isNaN(value)) return "$0.00";

  const absValue = Math.abs(value);
  const sign = value < 0 ? "-" : showSign && value > 0 ? "+" : "";

  if (compact) {
    if (absValue >= 1e9) {
      return `${sign}$${(absValue / 1e9).toFixed(2)}B`;
    }
    if (absValue >= 1e6) {
      return `${sign}$${(absValue / 1e6).toFixed(2)}M`;
    }
    if (absValue >= 1e3) {
      return `${sign}$${(absValue / 1e3).toFixed(2)}K`;
    }
  }

  return `${sign}$${absValue.toFixed(2)}`;
}

/**
 * Format a number with appropriate decimal places
 * Very small numbers get more decimal places
 */
export function formatNumber(value, maxDecimals = 6) {
  if (value === undefined || value === null || isNaN(value)) return "0";

  const absValue = Math.abs(value);

  if (absValue === 0) return "0";
  if (absValue < 0.000001) return value.toExponential(2);
  if (absValue < 0.01) return value.toFixed(maxDecimals);
  if (absValue < 1) return value.toFixed(4);
  if (absValue < 1000) return value.toFixed(2);
  if (absValue < 1e6) return Number(value.toFixed(2)).toLocaleString("en-US");
  if (absValue < 1e9) return `${(value / 1e6).toFixed(2)}M`;
  return `${(value / 1e9).toFixed(2)}B`;
}

/**
 * Format holdings display: "2,218.81 WBTC" style
 */
export function formatHoldings(amount, coin) {
  if (amount === undefined || amount === null) return `-`;
  const formatted = formatNumber(amount);
  return `${formatted} ${coin}`;
}

/**
 * Format price per unit: "$92,980.19/WBTC" style
 */
export function formatPricePerUnit(price, coin) {
  return `$${Number(price.toFixed(2)).toLocaleString("en-US")}/${coin}`;
}

/**
 * Format gain/loss balance: "2,218.81 WBTC" or "0 WBTC" style
 */
export function formatBalance(balance, coin) {
  if (balance === 0) return `0 ${coin}`;
  return formatHoldings(balance, coin);
}
