function getExpiryTimestamp(expiryDate) {
  if (!expiryDate) {
    return Number.POSITIVE_INFINITY;
  }

  const timestamp = new Date(expiryDate).getTime();
  return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
}

export function sortProductsByExpiry(products = []) {
  return [...products].sort((left, right) => {
    const dateDiff = getExpiryTimestamp(left.expiryDate) - getExpiryTimestamp(right.expiryDate);
    if (dateDiff !== 0) {
      return dateDiff;
    }

    return String(left.name ?? '').localeCompare(String(right.name ?? ''));
  });
}
