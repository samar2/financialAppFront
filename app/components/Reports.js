import React from "react";
import { BarChart, PieChart } from "react-native-chart-kit";

import { Dimensions, View, Text, TouchableOpacity, Button } from "react-native";


export default class Report extends React.Component {
  state = {
    barDataIncome: null,
    barDataExpense: null,
    pieDataIncome:null,
    pieDataExpense:null,
    incomes: this.props.incomes, 
    expenses: this.props.expenses,
    active: "income",
    chartType:"bar"
  };
  
  componentDidMount() {
    const labelsIncome = [];
    const dataIncome = [];
    const pieDataIncome=[],pieDataExpense=[];
    this.state.incomes.map(item => {
        labelsIncome.push(item.category);
        dataIncome.push(item.amount);
        const color = '#'+Math.floor(Math.random()*16777215).toString(16);
        pieDataIncome.push({ name: item.category,
        amount: item.amount,
        color: color,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15})
    });
    const barDataIncome = {
       labels: labelsIncome,
      datasets: [
        {
            data:dataIncome
        }
      ]
    };
    const labelsExpense = [];
    const dataExpense = [];
    this.state.expenses.map(item => {
        labelsExpense.push(item.category);
        dataExpense.push(item.amount);
        const color = '#'+Math.floor(Math.random()*16777215).toString(16);
        pieDataExpense.push({ name: item.category,
            amount: item.amount,
            color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15})
      });
      const barDataExpense = {
       labels: labelsExpense,
        datasets: [
          {
            data:dataExpense
          }
        ]
      };
     
    this.setState({ barDataIncome, barDataExpense, pieDataExpense,pieDataIncome }, ()=>console.log(barDataExpense));
  }
  render() {
    return (
        this.state.barDataIncome&&
        <>
       
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
              Expenses
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
              Incomes
            </Text>
          </TouchableOpacity>
        </View>
        
     <View>
     <Button title="Bar" onPress={()=>this.setState({chartType:"bar"})} />
     <Button title="Pie" onPress={()=>this.setState({chartType:"pie"})} />
     </View>
     {this.state.chartType==="bar"?
        <BarChart
          // style={graphStyle}
          data={this.state.active=="income"?this.state.barDataIncome:this.state.barDataExpense}
          width={Dimensions.get("window").width - 16}
          height={220}
          yAxisLabel={"$"}
          chartConfig={{
            backgroundColor: "#fff", 
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff", 
            decimalPlaces: 2,
            color:(opacity = 0) =>`rgb(0,122,255)`, //(opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            marginLeft: 8
          }}
        />:
        <PieChart
  data={this.state.active==="income"?this.state.pieDataIncome:this.state.pieDataExpense}
 width={Dimensions.get("window").width - 16}
  height={220}
  chartConfig={{
    backgroundColor: "#fff", 
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff", 
    decimalPlaces: 2,
    color:(opacity = 0) =>`rgb(0,122,255)`, //(opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    }
  }}
  accessor="amount"
  backgroundColor="transparent"
  paddingLeft="15"
  absolute
/>}
        
      
      </>
    );
  }
}
