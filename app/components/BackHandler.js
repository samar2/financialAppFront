import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  BackHandler,
  Alert
} from "react-native";

export default class App extends Component {
  backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Click Back button!</Text>
        <Button
          onPress={() => {
            this.props.navigation.goBack;
          }}
        ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  }
});
