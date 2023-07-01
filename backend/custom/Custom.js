export const createFilterObjects = (filterArray) => {
  let arr = [];

  for (const obj of filterArray) {
    arr.push({ category: `${obj}` });
  }

  return arr;
};

export const calcCartTotal = (Cart) => {
  let total = 0;

  total = Cart.reduce((a, b) => {
    return a + parseInt(b?.total ? b?.total : 0);
  }, 0);

  return total;
};
