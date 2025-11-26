export default function formatDate(dateString) {
  return new Date(dateString).toLocaleString("da-DK", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function getDuration(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffInMs = endDate - startDate;

  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  const hoursLeft = diffInHours % 24;

  if (diffInDays > 0) {
    return `${diffInDays} dage og ${hoursLeft} timer`;
  }
  return `${hoursLeft} timer`;
}
