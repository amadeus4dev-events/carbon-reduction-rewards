const formatPercentage = (value: number | null) =>
  value ? `${String((value * 100).toFixed(0))}%` : "n/a";

export default formatPercentage;
