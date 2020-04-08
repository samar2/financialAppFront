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
    this.props.AddGoal({
      goalname: this.state.goalname,
      description: this.state.description,
      stardate: this.state.date,
      enddate: this.state.date,
      amount: this.state.amount,
      currency: this.state.currency,
      type: "goal"
    });
    this.setState({
      isModalVisible: false,
      goalname: "",
      description: "",
      stardate: "",
      enddate: "",
      amount: "",
      currency: ""
    });
  };
  render() {
    return (
      <>
        <Button
          title="ADD Goal"
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
            <Text>Goal Name:</Text>
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
