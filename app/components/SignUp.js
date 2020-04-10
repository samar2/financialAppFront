import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

export default class App extends React.Component {
  state = {
    email: "",
    password: "",
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Full Name: "
              placeholderTextColor="white"
              onChangeText={(text) => this.setState({ name: text })}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email :"
              secureTextEntry={true}
              placeholderTextColor="white"
              onChangeText={(text) => this.setState({ email: text })}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password :"
              secureTextEntry={true}
              placeholderTextColor="white"
              onChangeText={(text) => this.setState({ password: save })}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Confirm Password :"
              secureTextEntry={true}
              placeholderTextColor="white"
              onChangeText={(text) => this.setState({ confirmpassword: save })}
            />
          </View>
          <TouchableOpacity style={styles.SignUpBtn}>
            <Text style={styles.SignUpText}>SIGN UP</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Contiue}>
            <Text style={styles.ContinueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  SignUpBtn: {
    width: "80%",
    backgroundColor: "#74b37a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#8173f0",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  SignUpText: {
    color: "white",
  },
  ContinueText: {
    color: "#78ad7c",
  },
});
