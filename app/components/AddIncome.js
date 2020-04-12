import React from "react";
import { Text, Button, View , TextInput, Picker} from "react-native";
import Modal from "react-native-modal";

export default class AddIncome extends React.Component {
  state = {
    isModalVisible: false,
    title: "",
    category:"",
    description:"",
    start_date:"", 
    end_date:"",
    amount:"",
    currency:"",
    category:"",
    kind:""

  };

  toggleModal = () => {
    this.props.addItem({title:this.state.title,description:this.state.description, start_date:this.state.start_date, end_date:this.state.end_date, amount:this.state.amount, currency:this.state.currency, type:"income", kind:this.state.kind, category:this.state.category})
    this.setState({ isModalVisible: false , title:"", description:"", start_date:"", currency:"", amount:"",end_date:"",category:"", kind:""});
  };
  render() {
    return (
      <>
        <Button
          title="ADD INCOME"
          onPress={() => this.setState({ isModalVisible: true })}
        ></Button>
        <Modal isVisible={this.state.isModalVisible}
        backdropColor="white"
        backdropOpacity={1}
        >
          <View style={{ flex: 1 }}>
          {/* <Text>Category:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={category => this.setState({ category })}
              value={this.state.category}
            /> */}
            <Text>Title:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={title => this.setState({ title })}
              value={this.state.title}
            />
            <Text>Description:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={description => this.setState({ description })}
              value={this.state.description}
            />
            <Text>Start date:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={start_date => this.setState({ start_date })}
              value={this.state.start_date}
            />
             <Text>End date:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={end_date => this.setState({ end_date })}
              value={this.state.end_date}
            />
            <Text>Amount:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={amount => this.setState({ amount })}
              value={this.state.amount}
            />
            <Text>Currency:</Text>
            <Picker
              selectedValue={this.state.currency}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ currency: itemValue }, ()=>console.log(itemValue))}>
              {this.props.currencies.map(item=>
              <Picker.Item label={item.code} value={item.id} />
              )}
            </Picker>
            <Text>Category:</Text>
            <Picker
              selectedValue={this.state.category}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue }, ()=>console.log(itemValue))}>
              {this.props.categories.map(item=>
              <Picker.Item label={item.name} value={item.id} />
              )}
            </Picker>
            <Text>Kind:</Text>
            <Picker
              selectedValue={this.state.kind}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ kind: itemValue }, ()=>console.log(itemValue))}>
              
              <Picker.Item label='Recurring' value='recurring' />
              <Picker.Item label='Fixed' value='fixed' />
            </Picker>

            <Button title="ADD" onPress={this.toggleModal} />
          </View>
        </Modal>
      </>
    );
  }
}
