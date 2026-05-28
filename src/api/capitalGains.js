const capitalGainsData = {
  capitalGains: {
    stcg: {
      profits: 70200.88,
      losses: 1548.53,
    },
    ltcg: {
      profits: 5020,
      losses: 3050,
    },
  },
};

export async function fetchCapitalGains() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Simulate random error (5% chance) for error state demo
  if (Math.random() < 0.05) {
    throw new Error("Failed to fetch capital gains data. Please try again.");
  }

  return capitalGainsData;
}
