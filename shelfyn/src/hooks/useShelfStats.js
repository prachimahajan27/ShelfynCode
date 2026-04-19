import { useMemo } from 'react';

/**
 * Derives summary statistics from a products array.
 * Memoized so it only recalculates when `products` changes.
 */
function useShelfStats(products) {
  return useMemo(
    () => ({
      total: products.length,
      expiringSoon: products.filter((p) => p.status === 'expiring').length,
      expired: products.filter((p) => p.status === 'expired').length,
    }),
    [products],
  );
}

export default useShelfStats;
