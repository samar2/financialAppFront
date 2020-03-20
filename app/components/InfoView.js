import React from "react";
import * as Progress from "react-native-progress";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default class InfoView extends React.Component {
    state={
        active:0
    }
  render() {
    return (
      <>
       <Text style={styles.budgetTitle}>
                Budget{'\n'}
                {'\n'}
                1000$
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
                  width:'50%',
                
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#de3b3b",
                borderRadius: 4,
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: this.state.active === 0 ?"#de3b3b":"#fff"
              }}
             
              onPress={() =>
                this.setState({ active: 0 })
              }
            >
              <Text
                style={{
                  color: this.state.active === 0 ? "#fff" : "#de3b3b",
                  textAlign:'center'
                }}
              >
                Expenses{'\n'}{'\n'}
                1000$
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width:'50%',
                
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#2d9547",
                borderRadius: 4,
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: this.state.active === 1 ?"#2d9547":"#fff"
              }}
             
              onPress={() =>
                this.setState({ active: 1 })
              }
            >
              <Text
                style={{
                  color: this.state.active === 1 ? "#fff" : "#2d9547",
                  textAlign:'center'
                }}
              >
                Incomes{'\n'}{'\n'}
                2000$
              </Text>
            </TouchableOpacity>
            </View>
        <View style={styles.mainContainer}>
          <View style={styles.containerLabels}>
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
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 250,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  container: {
    flex: 1,
    flexDirection: "row",

    justifyContent: "flex-start",
    alignItems: "center"
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
    color: "red",
    marginRight: "25%"
  },
  icon: {
    width: "10%",
    marginLeft: 5
  },
  bar: {
    height: 20
  }, 
  budgetTitle:{
    fontSize:20,
    textAlign: 'center',
    

  }
});
