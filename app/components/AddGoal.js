import React from "react";
import { Text, Button, View, TextInput } from "react-native";
import Modal from "react-native-modal";

export default class AddGoal extends React.Component {
  state = {
    isModalVisible: false,
    title: "",
    category: "",
    description: "",
    date: "",
    amount: "",
    currency: ""
  };

  toggleModal = () => {
    this.props.addItem({
      title: this.state.title,
      category: this.state.category,
      description: this.state.description,
      date: this.state.date,
      amount: this.state.amount,
      currency: this.state.currency,
      type: "income"
    });
    this.setState({
      isModalVisible: false,
      title: "",
      description: "",
      date: "",
      currency: "",
      amount: ""
    });
  };
  render() {
    return (
      <>
        <Button
          title="Goal Savings"
          onPress={() => this.setState({ isModalVisible: true })}
        ></Button>
        <Modal
          isVisible={this.state.isModalVisible}
          backdropColor="white"
          backdropOpacity={1}
        >
          <View style={{ flex: 1 }}>
            <Text>Set Your Goal:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={category => this.setState({ category })}
              value={this.state.category}
            />
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
            <Text>Start Date:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={date => this.setState({ date })}
              value={this.state.date}
            />
            <Text>End Date:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={date => this.setState({ date })}
              value={this.state.date}
            />
            <Text>Amount:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={amount => this.setState({ amount })}
              value={this.state.amount}
            />
            <Text>Currency:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={currency => this.setState({ currency })}
              value={this.state.currency}
            />
            <Button title="ADD" onPress={this.toggleModal} />
          </View>
        </Modal>
      </>
    );
  }
}
