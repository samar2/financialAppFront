import React from "react";
import { BarChart, PieChart } from "react-native-chart-kit";

import { Dimensions } from "react-native";

export default class Report extends React.Component {
  state = {
    barData: null,
    incomes: this.props.data
  };
  
  componentDidMount() {
    const labels = [];
    const data = [];
    this.state.incomes.map(item => {
      labels.push(item.category);
      data.push(item.amount);
    });
    const barData = {
      labels,
      datasets: [
        {
          data
        }
      ]
    };
    this.setState({ barData });
  }
  render() {
    return (
      this.state.barData && (
        <BarChart
          // style={graphStyle}
          data={this.state.barData}
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
        />
      )
    );
  }
}
