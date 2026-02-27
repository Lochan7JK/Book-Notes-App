// export function formatRelativeTime(timestamp) {
//   const diff = Date.now() - timestamp;

//   const minutes = Math.floor(diff / 60000);
//   const hours = Math.floor(diff / 3600000);
//   const days = Math.floor(diff / 86400000);

//   if (minutes < 1) return "just now";
//   if (minutes < 60) return `${minutes} min ago`;
//   if (hours < 24) return `${hours} hr ago`;

//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

export function formatRelativeTime(timestamp, updatedAt) {
  if (!timestamp) return "recently";

  const baseTime = updatedAt || timestamp;
  const diff = Date.now() - baseTime;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  return `${days} day${days > 1 ? "s" : ""} ago`;
}
