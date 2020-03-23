import React from "react";
import { StyleSheet } from "react-native";
import MenuTab from "./app/components/MenuTab";
import Login from "./app/components/LogIn";
//import SignUp from "./app/components/SignUp";
//import GoalSavings from "./app/components/GoalSavings";
//import InfoView from "./app/components/InfoView";
//import GoalSavingsTable from "./app/components/GoalSavingsTable";
import BackHandler from "./app/components/BackHandler";
export default class App extends React.Component {
  state = {
    data: [
      {
        id: 1,
        category: "Salary",
        title: "Work 1",
        description: "something",
        amount: "500",
        currency: "$",
        date: "01/03/2020",
        type: "income"
      },
      {
        id: 2,
        category: "Salary",
        title: "Work 2",
        description: "something",
        amount: "300",
        currency: "$",
        date: "01/03/2020",
        type: "income"
      },
      {
        id: 3,
        category: "Salary",
        title: "Work 13",
        description: "something",
        amount: "250",
        currency: "$",
        date: "01/03/2020",
        type: "income"
      },
      {
        id: 4,
        category: "Extra",
        description: "something",
        title: "Freelance",
        amount: "700",
        currency: "$",
        date: "11/03/2020",
        type: "income"
      },
      {
        id: 5,
        category: "Fun",
        description: "something",
        title: "Lottery",
        amount: "10",
        currency: "$",
        date: "07/03/2020",
        type: "income"
      },
      {
        id: 6,
        category: "Extra",
        description: "something",
        title: "Sold TV",
        amount: "140",
        currency: "$",
        date: "12/03/2020",
        type: "income"
      },
      {
        id: 7,
        category: "Extra",
        description: "something",
        title: "gift",
        amount: "50",
        currency: "$",
        date: "17/03/2020",
        type: "income"
      },
      {
        id: 8,
        category: "Utilities",
        description: "monthly bill",
        title: "Gas",
        amount: "50",
        currency: "$",
        date: "18/03/2020",
        type: "expense"
      }
    ]
  };
  deleteItem = id => {
    const data = this.state.data.filter(item => {
      return item.id !== id;
    });
    this.setState({ data });
  };
  addItem = props => {
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
      type: props.type
    };
    data.push(item);
    this.setState({ data });
  };
  editItem = (id, props) => {
    const data = this.state.data.map(item => {
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
          type: props.type || item.type
        };
        return newItem;
      }
      // otherwise, don't change the contact at all
      else {
        return item;
      }
    });
    this.setState({ data });
  };

  render() {
    return (
      <>
        {/* <Login></Login> }
       <MenuTab
        data={this.state.data}
        deleteItem={this.deleteItem}
		addItem={this.addItem}
		editItem={this.editItem}
    />}
    {<SignUp></SignUp>}
    {<GoalSavings></GoalSavings>}
    {<InfoView></InfoView>}
    {<GoalSavingsTable></GoalSavingsTable>*/}
        {<BackHandler></BackHandler>}
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  list: {
    flex: 1,
    marginTop: 32
  }
});
