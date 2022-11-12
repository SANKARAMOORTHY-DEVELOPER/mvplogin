const ERC20_DECIMALS = 18;
export const DECIMALS = 10 ** 18;

const ether = (wei) => wei / DECIMALS;

export var truncate = function (address) {
  if (!address) return
  return address.slice(0, 5) + "..." + address.slice(address.length - 4, address.length);
};

export function formatDate(itemDate) {
  let date1 = new Date();
  let date2 = new Date(itemDate);
  // To calculate the time difference of two dates
  let Difference_In_Time = date1.getTime() - date2.getTime();
  // To calculate the no. of days between two dates
  let Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
  let Difference_In_Hours = Math.floor(Difference_In_Time / (1000 * 3600));

  if (Difference_In_Days < 1) {
      return `${Difference_In_Hours} hrs`;
  } else {
      return `${Difference_In_Days} days`;
  }
}

// convert from big number
export const formatBigNumber = (num) => {
  if (!num) return
  return num.shiftedBy(-ERC20_DECIMALS).toFixed(2);
}

export const formatPrice = (price) => {
  const precision = 100; // Use 2 decimal places

  price = ether(price);
  price = Math.round(price * precision) / precision;

  return price;
};