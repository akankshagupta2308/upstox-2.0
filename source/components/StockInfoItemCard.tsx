import React, { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { last_traded_price, p_and_l } from "../constants/strings";
import { getAmountWithRupeeSymbol } from "../utils/commonUtils";
import Seperator from "./Seperator";

const StockInfoItemCard = ({ data, index }) => {
  const { symbol, ltp, quantity, avgPrice } = data;

  const profitAndLoss = useMemo(() => {
    return (ltp - avgPrice) * quantity;
  }, [ltp, quantity, avgPrice]);

  return (
    <View style={styles.container} key={index}>
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.symbolTextStyle}>{symbol}</Text>
          <Text>
            {`${last_traded_price}: `}
            <Text style={styles.boldTextStyle}>
              {getAmountWithRupeeSymbol(ltp)}
            </Text>
          </Text>
        </View>
        <Seperator />
        <View style={styles.rowContainer}>
          <Text style={styles.quantityTextStyle}>{quantity}</Text>
          <Text>
            {`${p_and_l}: `}
            <Text style={styles.boldTextStyle}>
              {getAmountWithRupeeSymbol(profitAndLoss)}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  mainContainer: {
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    marginHorizontal: 16,
    paddingVertical: 12,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  symbolTextStyle: {
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "black",
  },
  quantityTextStyle: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: "black",
  },
  boldTextStyle: {
    fontWeight: "700",
    fontFamily: "Roboto",
  },
});

export default memo(StockInfoItemCard);
