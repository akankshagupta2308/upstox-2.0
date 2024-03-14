import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

const Seperator = () => {
  return <View style={styles.seperator} />;
};

const styles = StyleSheet.create({
  seperator: {
    height: 10,
  },
});

export default memo(Seperator);
