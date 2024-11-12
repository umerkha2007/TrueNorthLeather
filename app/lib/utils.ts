export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(price);
};

export const generateOrderId = (): string => {
  return `TNL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.13; // 13% HST for Ontario
};

export const calculateShipping = (subtotal: number): number => {
  if (subtotal >= 100) return 0; // Free shipping over $100
  return 15; // Standard shipping rate
}; 