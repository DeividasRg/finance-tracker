export default function formatCurrency(currency) {
  return `${Math.abs(currency).toFixed(2)} €`;
}
