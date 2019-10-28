/**
 * Simple version of date formatter function
 * @param timeInISO {string|*} incoming value to work with
 * @param delimiter {string} symbol by which date is formatted
 * @returns {string|*}
 */
function fromISO2Format(timeInISO, delimiter) {
  if (typeof timeInISO !== 'string' || !timeInISO.includes('-')) return timeInISO;

  return timeInISO
    .split('T')[0]
    .split('-')
    .join(delimiter);
}
