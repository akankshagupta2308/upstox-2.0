import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { empty_list_message } from "../constants/strings";

const EmptyListView = () => {
  return (
    <View style={styles.container}>
      <Text>{empty_list_message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4d4d4",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});

export default memo(EmptyListView);
