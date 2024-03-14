import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StockInfoItemCard from "../components/StockInfoItemCard";
import ProfitAndLossExpandableCard from "../components/ProfitAndLossExpandableCard";
import { error_message, upstox_hodling } from "../constants/strings";
import { useGetUserHoldings } from "../hooks/useGetUserHoldings";
import EmptyListView from "../components/EmptyListView";

const HodlingsDashboard = () => {
  const { holdings, isLoading, error } = useGetUserHoldings();

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={24} color={"#691883"} />
      </View>
    );
  }

  if (!isLoading && !!error) {
    return (
      <View style={styles.loaderContainer}>
        <Text>{error_message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#ffffff"} barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextStyle}>{upstox_hodling}</Text>
      </View>
      <FlatList
        style={styles.listContainer}
        data={holdings}
        renderItem={({ item, index }) => (
          <StockInfoItemCard key={index} data={item} index={index} />
        )}
        windowSize={20}
        maxToRenderPerBatch={20}
        keyExtractor={(item) => item.symbol}
        ListEmptyComponent={<EmptyListView />}
      />
      {!!holdings.length ? (
        <ProfitAndLossExpandableCard data={holdings} />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4d4d4",
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "#fffff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    backgroundColor: "#691883",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "left",
    fontFamily: "Roboto",
  },
  listContainer: {
    flexGrow: 1,
  },
});

export default HodlingsDashboard;
