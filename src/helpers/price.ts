export const parsePrice = (price: number) => {
  return (price / 100)
    .toFixed(2)
    .toLocaleString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
