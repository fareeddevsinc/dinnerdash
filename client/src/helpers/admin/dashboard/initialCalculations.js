export const initialCalculations = (orders) => {
  let total = 0;
  orders &&
    orders?.order?.forEach((order) => {
      total += order.totalPrice;
    });
  return total;
};
