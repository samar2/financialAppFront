import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  AsyncStorage,
} from "react-native";
import MainStackNavigator from "./src/navigation/AppNavigator";
import Login from "./app/components/LogIn";
/* import MenuTab from "./app/components/MenuTab";
import Login from "./app/components/LogIn";
import SignUp from "./app/components/SignUp";
import AddGoalSavings from "./app/components/AddGoalSavings";
import GoalSavingsTableView from "./app/components/GoalSavingsTableView"; */
//import InfoView from "./app/components/InfoView";
//import GoalSavingsTableView from "./app/components/GoalSavingsTableView";
//import BackHandler from "./app/components/BackHandler";
//import Reports from "./app/components/Reports";

class App extends React.Component {
  state = {
    incomes: [],
    expenses: [],
    loggedIn: false,
  };

  /*  
  deletegoal = (id) => {
    const data = this.state.data.filter((item) => {
      return item.id !== id;
    });
    this.setState({ data });
  };
  addGoal = (props) => {
    const data = [...this.state.data];
    const id = data[data.length - 1].id + 1;
    const item = {
      id: id,
      goalname: props.category,
      description: props.description,
      amount: props.amount,
      currency: props.currency,
      startdate: props.date,
      endtdate: props.date,
      type: props.type,
    };
    data.push(item);
    this.setState({ data });
  };
  editgoal = (id, props) => {
    const data = this.state.data.map((item) => {
      // if this is the contact we need to change, update it. This will apply to exactly
      // one contact
      if (item.id === id) {
        const newgoal = {
          id: item.id,
          goalname: props.goalname || item.goalname,
          description: props.description || item.description,
          amount: props.amount || item.amount,
          currency: props.currency || item.currency,
          startdate: props.startdate || item.startdate,
          enddate: props.enddate || item.enddate,
          type: props.type || item.type,
        };
        return newgoal;
      }
      // otherwise, don't change the transaction at all
      else {
        return item;
      }
    });
    this.setState({ data });
  }; */

  async getToken() {
    try {
      let token = await AsyncStorage.getItem("access_token");
      console.log("token" + token);
    } catch (error) {
      console.log("error");
    }
  }

  isLoggedIn = () => {
    this.setState({ loggedIn: true });
  };
  isLoggedOut = () => {
    console.log("i am here");
    this.setState({ loggedIn: false });
  };
  async componentDidMount() {
    const token = await this.getToken();
    if (token) console.log(token);
    else console.log("nope");
  }

  render() {
    return (
      <>
        {this.state.loggedIn ? (
          <MainStackNavigator isLoggedOut={this.isLoggedOut} />
        ) : (
          <Login isLoggedIn={this.isLoggedIn} />
        )}
      </>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  list: {
    flex: 1,
    marginTop: 32,
  },
});
