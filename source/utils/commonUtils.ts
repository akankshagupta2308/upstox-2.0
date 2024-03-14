import { Holding } from "../types/holdingTypes";

export const getAmountWithRupeeSymbol = (amount: number) => {
  // return Number.isInteger(amount)
  //   ? `\u20B9 ${amount}`
  //   : `\u20B9 ${amount.toFixed(2)}`;
  return `\u20B9 ${amount.toFixed(2)}`;
};

export const VALUE_TYPE_ENUM = {
  currentValue: "current_value",
  investment: "investment",
  todaysProfitAndLoss: "todays_profit_and_loss",
};

export const getCalculationType = (item: Holding, type: string) => {
  switch (type) {
    case VALUE_TYPE_ENUM.currentValue:
      return item.ltp * item.quantity;
    case VALUE_TYPE_ENUM.investment:
      return item.avgPrice * item.quantity;
    case VALUE_TYPE_ENUM.todaysProfitAndLoss:
      return (item.close - item.ltp) * item.quantity;
    default:
      return 0;
  }
};

export const getTotalSum = (array: Holding[], type: string) => {
  let totalSum = 0;
  totalSum = array.reduce(
    (acc, curr) => acc + getCalculationType(curr, type),
    0
  );
  return totalSum;
};

export const getTotalProfitAndLoss = (array: Holding[]) => {
  let totalProfitAndLoss = 0;
  totalProfitAndLoss =
    getTotalSum(array, VALUE_TYPE_ENUM.currentValue) -
    getTotalSum(array, VALUE_TYPE_ENUM.investment);
  return totalProfitAndLoss;
};
