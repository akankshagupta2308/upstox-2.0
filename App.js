import React from "react";
import { StyleSheet, View } from "react-native";
import HodlingsDashboard from "./source/screens/HodlingsDashboard";

export default function App() {
  return (
    <View style={styles.container}>
      <HodlingsDashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
