import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View
} from "react-native";

export default class App extends React.Component {
  state = {
    email: "",
    password: ""
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Full Name: "
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ name: text })}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email :"
              secureTextEntry={true}
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ email: text })}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password :"
              secureTextEntry={true}
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ password: save })}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Confirm Password :"
              secureTextEntry={true}
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ confirmpassword: save })}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.Signup}>SignUp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", //170d2c
    alignItems: "center",
    justifyContent: "center"
  },
  Signup: {
    flex: 0,
    color: "black",
    fontSize: 20,
    position: "relative"
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    //backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },

  loginBtn: {
    width: "80%",
    // backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  SignupText: {
    width: "80%",
    // backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});
