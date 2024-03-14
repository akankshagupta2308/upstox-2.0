import React, { memo, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import {
  VALUE_TYPE_ENUM,
  getAmountWithRupeeSymbol,
  getTotalProfitAndLoss,
  getTotalSum,
} from "../utils/commonUtils";
import {
  current_value,
  profit_and_loss,
  todays_profit_and_loss,
  total_investment,
} from "../constants/strings";
import Seperator from "./Seperator";
import { Holding } from "../types/holdingTypes";

const getFormattedData = (data: Holding[]) => {
  return [
    {
      key: current_value,
      value: getTotalSum(data, VALUE_TYPE_ENUM.currentValue),
    },
    {
      key: total_investment,
      value: getTotalSum(data, VALUE_TYPE_ENUM.investment),
    },
    {
      key: todays_profit_and_loss,
      value: getTotalSum(data, VALUE_TYPE_ENUM.todaysProfitAndLoss),
    },
  ];
};

const ProfitAndLossExpandableCard = ({ data }) => {
  const [expandedInfo, setExpandedInfo] = useState(false);

  const formattedData = useMemo(() => getFormattedData(data), [data]);

  const totalProfitAndLoss = useMemo(
    () => getTotalProfitAndLoss(data) ?? 0,
    [data]
  );

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => setExpandedInfo(!expandedInfo)}>
        <Icon
          name={expandedInfo ? "triangle-down" : "triangle-up"}
          size={32}
          color="#691883"
          type="entypo"
        />
      </TouchableOpacity>

      {!!expandedInfo ? (
        <>
          {formattedData.map((item, index) => {
            return (
              <View style={styles.rowContainer} key={index}>
                <Text style={styles.keyTextStyle}>{`${item.key}:`}</Text>
                <Text style={styles.valueTextStyle}>
                  {getAmountWithRupeeSymbol(item.value)}
                </Text>
              </View>
            );
          })}
          <Seperator />
        </>
      ) : (
        <></>
      )}

      <View style={styles.rowContainer}>
        <Text style={styles.keyTextStyle}>{profit_and_loss}</Text>
        <Text style={styles.valueTextStyle}>
          {getAmountWithRupeeSymbol(totalProfitAndLoss)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  keyTextStyle: {
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "black",
  },
  valueTextStyle: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: "black",
    fontWeight: "600",
  },
});

export default memo(ProfitAndLossExpandableCard);
