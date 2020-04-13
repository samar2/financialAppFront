import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  AsyncStorage,
} from "react-native";
import Client from "./Client";

const register = ({ email, username, password }) => {
  return Client("/api/register", {
    body: { email, username, password },
  }).then(({ data: user, meta: { token } }) => {
    return { user, token };
  });
};
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
    };
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  onSignUp = async () => {
    const { username, email, password } = this.state;
    try {
      register({ username: username, email: email, password: password }).then(
        ({ user, token }) => {
          this.props.navigation.navigate("Login");
        }
      );
      console.log("user successfully signed up!!!!!!!", success);
    } catch (err) {
      console.log("error signing up", err);
    }
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Please enter your username!!!!"
              placeholderTextColor="white"
              onChangeText={(val) => this.onChangeText("username", val)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email :"
              secureTextEntry={true}
              placeholderTextColor="white"
              onChangeText={(val) => this.onChangeText("email", val)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password :"
              secureTextEntry={true}
              placeholderTextColor="white"
              onChangeText={(val) => this.onChangeText("password", val)}
            />
          </View>

          <TouchableOpacity style={styles.SignUpBtn} onPress={this.onSignUp}>
            <Text style={styles.SignUpText}>SIGN UP</Text>
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
