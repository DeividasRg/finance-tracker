export default function formatString(user) {
  const lower = user.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
