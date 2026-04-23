export const mockInsightsData = {
  // Summary strip
  stats: {
    total: 24,
    expiringSoon: 5,
    expired: 3,
    safe: 16,
  },

  // Value distribution (left column)
  value: {
    totalCollection: 8450,
    percentageChange: 8,
    expiredValue: 1200,
    savedValue: 3600,
  },

  // Spending by category (right column)
  spendingByCategory: [
    { label: 'Skincare', amount: 4200, percent: 70 },
    { label: 'Makeup', amount: 2800, percent: 47 },
    { label: 'Others', amount: 1450, percent: 24 },
  ],

  // Smart insight cards
  insights: [
    {
      id: 1,
      icon: 'warning',
      message: '3 products are expiring this week',
      tone: 'warning',
    },
    {
      id: 2,
      icon: 'loss',
      message: 'You lost ₹1,200 to expired products recently',
      tone: 'danger',
    },
    {
      id: 3,
      icon: 'focus',
      message: 'Your collection is skincare-focused',
      tone: 'safe',
    },
  ],
};
