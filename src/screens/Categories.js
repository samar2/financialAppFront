import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Picker,TextInput, Button, AsyncStorage } from "react-native";

class Categories extends React.Component {
  state={
    icon:"md-gift", name:""
  }
  addCategory = async()=>{
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);
    const body = new FormData();
    body.append('name', this.state.name);
    body.append('icon', this.state.icon);
    const response = await fetch('http://192.168.1.105:8000/api/categories',{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }, 
      body
    });
    const result = await response.json();
    console.log(result);
    this.props.addCategory(result.category);
  }
  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Add a Category</Text>
      <Text>Title:</Text>
      <View style={{borderWidth:1, width:250}}>
            <TextInput
              style={{ height: 40 }}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
            />
            </View>
     {this.state.icon && <Ionicons
                      name={this.state.icon}
                      size={32}
                      color="#8173f0"
                    />}
      <Picker
              selectedValue={this.state.icon}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ icon: itemValue }, () =>
                  console.log(itemValue)
                )
              }
            >
              <Picker.Item label="---" value="" />
                <Picker.Item label="cart" value="ios-cart" />
                <Picker.Item label="bicycle" value="ios-bicycle" />
                <Picker.Item label="book" value="ios-book" />
                <Picker.Item label="briefcase" value="ios-briefcase" />
                <Picker.Item label="tool" value="ios-build" />
                <Picker.Item label="bulb" value="ios-bulb" />
                <Picker.Item label="car" value="ios-car" />
                <Picker.Item label="house" value="ios-home" />
                <Picker.Item label="heart" value="ios-heart" />
                <Picker.Item label="fun" value="ios-ice-cream" />
                <Picker.Item label="health" value="ios-medkit" />
                <Picker.Item label="nutrition" value="ios-nutrition" />
                <Picker.Item label="pets" value="ios-paw" />
                <Picker.Item label="travel" value="md-airplane" />
                <Picker.Item label="food" value="ios-restaurant" />
                <Picker.Item label="gift" value="md-gift" />


             
            </Picker>
            <Button title="ADD" onPress={this.addCategory} />
    </View>
  );
            }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* justifyContent: "center", */
    /* alignItems: "center", */
    backgroundColor: "#ebebeb",
    margin:30
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Categories;
