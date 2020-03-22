import React from "react";
import * as Progress from "react-native-progress";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { TrackingState } from "expo/build/AR";

export default class InfoView extends React.Component {
  state = {
    active: "expense",
    budget: 0,
    income: 0,
    expense: 0,
    expensesByCat: [],
    incomesByCat: []
  };
  componentDidMount() {
    const budget = this.props.data.reduce(
      (a, b) => a + (b.type == "income" ? b.amount : -b.amount),
      0
    );
   // console.log(budget);
    const income = this.props.data.reduce(
      (a, b) => a + (b.type == "income" ? b.amount : 0),
      0
    );
    const expense = Math.abs(budget - income);
      const arrIncome = this.props.data.filter(item=>item.type==="income");
      var holder = {};

      arrIncome.forEach(function(d) {
        if (holder.hasOwnProperty(d.category)) {
          holder[d.category] = holder[d.category] + d.amount;
        } else {
          holder[d.category] = d.amount;
        }
      });
      
      var obj2 = [];
      
      for (var prop in holder) {
        obj2.push({ category: prop, amount: holder[prop], currency:'$' });
      }
      
      const arrExpense = this.props.data.filter(item=>item.type==="expense");
      var holder2 = {};

      arrExpense.forEach(function(d) {
        if (holder2.hasOwnProperty(d.category)) {
          holder2[d.category] = holder2[d.category] + d.amount;
        } else {
          holder2[d.category] = d.amount;
        }
      });
      
      var obj3 = [];
      
      for (var prop in holder2) {
        obj3.push({ category: prop, amount: holder2[prop], currency:'$' });
      }
      
    
    this.setState({ budget, income, expense, incomesByCat:obj2, expensesByCat:obj3 });
      }

  render() {
    return (
      <>
        <Text style={styles.budgetTitle}>
          Budget{"\n"}
          {"\n"}
          {this.state.budget}$
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            marginBottom: 20,
            height: 55,
            position: "relative"
          }}
        >
          <TouchableOpacity
            style={{
              width: "50%",

              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#de3b3b",
              borderRadius: 4,
              borderRightWidth: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor:
                this.state.active === "expense" ? "#de3b3b" : "#fff"
            }}
            onPress={() => this.setState({ active: "expense" })}
          >
            <Text
              style={{
                color: this.state.active === "expense" ? "#fff" : "#de3b3b",
                textAlign: "center"
              }}
            >
              Expenses{"\n"}
              {"\n"}
              {this.state.expense}$
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "50%",

              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#2d9547",
              borderRadius: 4,
              borderRightWidth: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor:
                this.state.active === "income" ? "#2d9547" : "#fff"
            }}
            onPress={() => this.setState({ active: "income" })}
          >
            <Text
              style={{
                color: this.state.active === "income" ? "#fff" : "#2d9547",
                textAlign: "center"
              }}
            >
              Incomes{"\n"}
              {"\n"}
              {this.state.income}$
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          {this.state.active==="income"?this.state.incomesByCat.map(
            transaction =>
              (
                <View style={{ height: 55 }} key={transaction.category+"inc"}>
                  <View style={styles.containerLabels}>
                    <Text style={styles.labelCategory}>
                      {transaction.category}
                    </Text>
                    <Text
                      style={{
                        ...styles.labelAmount,
                        color: this.state.active === "expense" ? "red" : "green"
                      }}
                    >
                      {transaction.amount}
                      {transaction.currency}
                    </Text>
                  </View>
                  <View style={styles.container}>
                    <Ionicons
                      name="md-heart"
                      size={32}
                      color="orange"
                      style={styles.icon}
                    />
                    <Progress.Bar
                      progress={
                        this.state.active === "expense"
                          ? transaction.amount / this.state.expense
                          : transaction.amount / this.state.income
                      }
                      width={200}
                      height={20}
                      style={styles.bar}
                    />
                    <Text style={styles.text}>
                      {this.state.active === "expense"
                        ? Math.ceil(
                            (transaction.amount * 100) / this.state.expense
                          )
                        : Math.ceil(
                            (transaction.amount / this.state.income) * 100
                          )}
                      %
                    </Text>
                  </View>
                </View>
              )
          )
        :
        this.state.expensesByCat.map(
          transaction =>
            (
              <View style={{ height: 55 }} key={transaction.category+"exp"}>
                <View style={styles.containerLabels}>
                  <Text style={styles.labelCategory}>
                    {transaction.category}
                  </Text>
                  <Text
                    style={{
                      ...styles.labelAmount,
                      color: this.state.active === "expense" ? "red" : "green"
                    }}
                  >
                    {transaction.amount}
                    {transaction.currency}
                  </Text>
                </View>
                <View style={styles.container}>
                  <Ionicons
                    name="md-heart"
                    size={32}
                    color="orange"
                    style={styles.icon}
                  />
                  <Progress.Bar
                    progress={
                      this.state.active === "expense"
                        ? transaction.amount / this.state.expense
                        : transaction.amount / this.state.income
                    }
                    width={200}
                    height={20}
                    style={styles.bar}
                  />
                  <Text style={styles.text}>
                    {this.state.active === "expense"
                      ? Math.ceil(
                          (transaction.amount * 100) / this.state.expense
                        )
                      : Math.ceil(
                          (transaction.amount / this.state.income) * 100
                        )}
                    %
                  </Text>
                </View>
              </View>
            )
        )
        }
          {/*  <View style={styles.containerLabels}>
            <Text style={styles.labelCategory}>Entertainment</Text>
            <Text style={styles.labelAmount}>250$</Text>
          </View>
          <View style={styles.container}>
            <Ionicons
              name="md-heart"
              size={32}
              color="orange"
              style={styles.icon}
            />
            <Progress.Bar
              progress={0.25}
              width={200}
              height={20}
              style={styles.bar}
            />
            <Text style={styles.text}>25%</Text>
          </View>
          <View style={styles.containerLabels}>
            <Text style={styles.labelCategory}>Food</Text>
            <Text style={styles.labelAmount}>150$</Text>
          </View>
          <View style={styles.container}>
            <Ionicons
              name="md-cafe"
              size={32}
              color="orange"
              style={styles.icon}
            />
            <Progress.Bar
              progress={0.15}
              width={200}
              height={20}
              style={styles.bar}
            />
            <Text style={styles.text}>15%</Text>
          </View>
          <View style={styles.containerLabels}>
            <Text style={styles.labelCategory}>Bills</Text>
            <Text style={styles.labelAmount}>650$</Text>
          </View>
          <View style={styles.container}>
            <Ionicons
              name="md-wallet"
              size={32}
              color="orange"
              style={styles.icon}
            />
            <Progress.Bar
              progress={0.6}
              width={200}
              height={20}
              style={styles.bar}
            />
            <Text style={styles.text}>60%</Text>
          </View>
         */}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    /* height: 500, */
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  container: {
    flex: 1,
    flexDirection: "row",

    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  containerLabels: {
    flex: 1,
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    marginLeft: 10,
    color: "gray"
  },
  labelCategory: {
    fontSize: 18,
    width: "30%",
    marginLeft: "10%"
  },
  labelAmount: {
    fontSize: 18,
    marginRight: "20%"
  },
  icon: {
    width: "10%",
    marginLeft: 5
  },
  bar: {
    height: 20
  },
  budgetTitle: {
    fontSize: 20,
    textAlign: "center"
  }
});
