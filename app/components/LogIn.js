import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  AsyncStorage,
} from "react-native";

const ACCESS_TOKEN = "access_token";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  componentDidMount() {
    this.initialState().done();
  }

  initialState = async () => {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (token !== null) {
      //this.props.navigation.navigate("App");
      this.props.isLoggedIn();
      console.log("token is not null")
    }
  };

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

  async onLoginButtonPress() {
    try {
      const body = new FormData();
      body.append('email', this.state.email);
      body.append('password', this.state.password);
      let response = await fetch("http://192.168.1.105:8000/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
        },
        body
      });
     
      let res = await response.json();
     // console.log(res)
      if (response.status >= 200 && response.status < 300) {
        this.setState({ error: "" });
        let accessToken = res.access_token;
        this.storeToken(accessToken);
        console.log(accessToken);
        this.props.isLoggedIn();
        //this.props.navigation.navigate("App");
      } else {
        let error = res;
        throw error;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email: "
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
              onChangeText={(text) => this.setState({ password: text })}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}
         onPress={this.onLoginButtonPress.bind(this)}>
            <Text style={styles.loginText}>LOG IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.SignUpBtn}
            onPress={this.onLoginButtonPress.bind(this)}
          >
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
  forgot: {
    color: "#78ad7c",
    fontSize: 15,
    marginBottom: 10,
  },

  loginText: {
    color: "white",
  },

  SignUpText: {
    color: "white",
  },

  loginBtn: {
    width: "80%",
    backgroundColor: "#8173f0",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
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
});
