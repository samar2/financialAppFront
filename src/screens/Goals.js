import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AddGoalSave from '../../app/components/AddGoalSave'
import ListNew from "../../app/components/ListNew"

class Goals extends React.Component {
  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Goals</Text>
      <AddGoalSave addItem={this.props.addItem} currencies={this.props.currencies} categories={this.props.categories} />
              
              <ListNew
                /* data={this.props.data.filter((item) => {
                  return item.type === "expense";
                })} */
                data={this.props.transactions.filter((item) => {
                  return item.type === "goal saving";
               })}
                deleteItem={this.props.deleteItem}
                editItem={this.props.editItem}
                currencies={this.props.currencies}
                categories={this.props.categories}
              />
    </View>
  );
              }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebebeb",
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Goals;
