import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import MainStackNavigator from "./src/navigation/AppNavigator";
import MenuTab from "./app/components/MenuTab";
import Login from "./app/components/LogIn";
//import SignUp from "./app/components/SignUp";
import AddGoalSavings from "./app/components/AddGoalSavings";
import GoalSavingsTableView from "./app/components/GoalSavingsTableView";
//import InfoView from "./app/components/InfoView";
//import GoalSavingsTableView from "./app/components/GoalSavingsTableView";
//import Reports from "./app/components/Reports";
export default function App() {
  return (
    <NavigationContainer>{class App extends React.Component {
  state = {
    incomes: [],
    expenses: [],
    data: [
      {
        id: 1,
        category: "Salary",
        title: "Work 1",
        description: "something",
        amount: 500,
        currency: "$",
        date: "01/03/2020",
        type: "income",
      },
      {
        id: 2,
        category: "Salary",
        title: "Work 2",
        description: "something",
        amount: 300,
        currency: "$",
        date: "01/03/2020",
        type: "income",
      },
      {
        id: 3,
        category: "Salary",
        title: "Work 13",
        description: "something",
        amount: 250,
        currency: "$",
        date: "01/03/2020",
        type: "income",
      },
      {
        id: 4,
        category: "Extra",
        description: "something",
        title: "Freelance",
        amount: 700,
        currency: "$",
        date: "11/03/2020",
        type: "income",
      },
      {
        id: 5,
        category: "Fun",
        description: "something",
        title: "Lottery",
        amount: 10,
        currency: "$",
        date: "07/03/2020",
        type: "income",
      },
      {
        id: 6,
        category: "Extra",
        description: "something",
        title: "Sold TV",
        amount: 140,
        currency: "$",
        date: "12/03/2020",
        type: "income",
      },
      {
        id: 7,
        category: "Extra",
        description: "something",
        title: "gift",
        amount: 50,
        currency: "$",
        date: "17/03/2020",
        type: "income",
      },
      {
        id: 8,
        category: "Utilities",
        description: "monthly bill",
        title: "Gas",
        amount: 50,
        currency: "$",
        date: "18/03/2020",
        type: "expense",
      },
      {
        id: 8,
        category: "Loans",
        description: "taken from bank",
        title: "House",
        amount: 300,
        currency: "$",
        date: "18/03/2020",
        type: "expense",
      },
    ],
  };
  deleteItem = (id) => {
    const data = this.state.data.filter((item) => {
      return item.id !== id;
    });
    this.setState({ data });
  };
  addItem = (props) => {
    const data = [...this.state.data];
    const id = data[data.length - 1].id + 1;
    const item = {
      id: id,
      category: props.category,
      description: props.description,
      title: props.title,
      amount: props.amount,
      currency: props.currency,
      date: props.date,
      type: props.type,
    };
    data.push(item);
    this.setState({ data });
  };
  editItem = (id, props) => {
    const data = this.state.data.map((item) => {
      // if this is the contact we need to change, update it. This will apply to exactly
      // one contact
      if (item.id === id) {
        const newItem = {
          id: item.id,
          category: props.category || item.category,
          description: props.description || item.description,
          title: props.title || item.title,
          amount: props.amount || item.amount,
          currency: props.currency || item.currency,
          date: props.date || item.date,
          type: props.type || item.type,
        };
        return newItem;
      }
      // otherwise, don't change the transaction at all
      else {
        return item;
      }
    });
    this.setState({ data });
  };

  /*  state = {
    goals: [],
    data: [
      {
        id: 1,
        goalname: "Car",
        description: "Honda",
        start_date: "05 / 03 / 2020",
        end_date: "05 / 03 / 2020",
        amount: 50,
        currency: "$",
        type: "goal"
      },
      {
        id: 2,
        goalname: "Car",
        description: "Honda",
        start_date: "05 / 03 / 2020",
        end_date: "05 / 03 / 2020",
        amount: 50,
        currency: "$",
        type: "goal"
      },
      {
        id: 3,
        goalname: "Car",
        description: "Honda",
        start_date: "05 / 03 / 2020",
        end_date: "05 / 03 / 2020",
        amount: 50,
        currency: "$",
        type: "goal"
      },
      {
        id: 4,
        goalname: "Car",
        description: "Honda",
        start_date: "05 / 03 / 2020",
        end_date: "05 / 03 / 2020",
        amount: 50,
        currency: "$",
        type: "goal"
      },
      {
        id: 5,
        goalname: "Car",
        description: "Honda",
        start_date: "05 / 03 / 2020",
        end_date: "05 / 03 / 2020",
        amount: 50,
        currency: "$",
        type: "goal"
      },
      {
        id: 6,
        goalname: "Car",
        description: "Honda",
        start_date: "05 / 03 / 2020",
        end_date: "05 / 03 / 2020",
        amount: 50,
        currency: "$",
        type: "goal"
      },
      {
        id: 7,
        goalname: "Car",
        description: "Honda",
        start_date: "05 / 03 / 2020",
        end_date: "05 / 03 / 2020",
        amount: 50,
        currency: "$",
        type: "goal"
      },
      {
        id: 8,
        goalname: "Car",
        description: "Honda",
        start_date: "05 / 03 / 2020",
        end_date: "05 / 03 / 2020",
        amount: 50,
        currency: "$",
        type: "goal"
      },
      {
        id: 8,
        goalname: "Car",
        description: "Honda",
        start_date: "05 / 03 / 2020",
        end_date: "05 / 03 / 2020",
        amount: 50,
        currency: "$",
        type: "goal"
      }
    ]
  }; */
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
  };

  componentDidMount() {
    const arrIncome = this.state.data.filter((item) => item.type === "income");
    var holder = {};

    arrIncome.forEach(function (d) {
      if (holder.hasOwnProperty(d.category)) {
        holder[d.category] = holder[d.category] + d.amount;
      } else {
        holder[d.category] = d.amount;
      }
    });

    var obj2 = [];

    for (var prop in holder) {
      obj2.push({
        category: prop,
        amount: holder[prop],
        currency: "$",
      });
    }
    const arrExpense = this.state.data.filter(
      (item) => item.type === "expense"
    );
    var holder2 = {};

    arrExpense.forEach(function (d) {
      if (holder2.hasOwnProperty(d.category)) {
        holder2[d.category] = holder2[d.category] + d.amount;
      } else {
        holder2[d.category] = d.amount;
      }
    });

    var obj3 = [];

    for (var prop in holder2) {
      obj3.push({ category: prop, amount: holder2[prop], currency: "$" });
    }
    this.setState({ incomes: obj2, expenses: obj3 });
  }
  render() {
    return <Login />;
    // return (<>
    {
      /* <Login></Login> */
    }
    /*   <MenuTab
        data={this.state.data}
        deleteItem={this.deleteItem}
		addItem={this.addItem}
		editItem={this.editItem}
      />  */
    {
      /*    {this.state.incomes.length!==0?<Reports incomes={this.state.incomes}
      expenses={this.state.expenses}
      />:null} */
    }
    {
      /*   <GoalSavingsTableView data={this.state.data} deletegoal={this.deletegoal}></GoalSavingsTableView> */
    }
    //  </>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  list: {
    flex: 1,
    marginTop: 32,
  },
});}</NavigationContainer>
  );
}

