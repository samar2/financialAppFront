import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  AsyncStorage,
} from "react-native";

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


  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch (error) {
      console.log("error");
    }
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log("token" + token);
    } catch (error) {
      console.log("error");
    }
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  onSignUp = async () => {
    try {
      const body = new FormData();
      body.append("name", this.state.username);
      body.append("email", this.state.email);
      body.append("password", this.state.password);
      body.append("currencies_id", 1);
      let response = await fetch("http://192.168.1.105:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        body,
      });

      let res = await response.json();
      // console.log(res)
      if (response.status >= 200 && response.status < 300) {
        this.setState({ error: "" });
        let accessToken = res.access_token;
        this.storeToken(accessToken);
        console.log(accessToken);
        this.props.changeLogin();
        //this.props.navigation.navigate("App");
      } else {
        let error = res;
        throw error;
      }
    } catch (error) {
      console.log("error", error);
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
