export function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}-${month}`;
}