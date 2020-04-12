import React from "react";
import { StyleSheet, View, Text } from "react-native";

function Categories(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Categories Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebebeb",
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Categories;
