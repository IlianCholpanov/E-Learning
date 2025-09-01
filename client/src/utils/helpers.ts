export function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return;

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return;

  return date.toLocaleDateString();
}
