export function getCurrentDateTime() {
  const timestamp = Date.now();
  const date = new Date(timestamp);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return `${formattedDate} ${formattedTime}`;
}
