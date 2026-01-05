export function formatDate(isoString) {
  const date = new Date(isoString);

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
