import React from "react";
import {
  ScrollView,
  UIManager,
  LayoutAnimation,
  Text,
  Button,
  View, 
  TextInput
} from "react-native";
import Item from "./Item";
import Modal from "react-native-modal";

class ListNew extends React.Component {
  state = {
    swiping: true,
    isModalVisible: false,
    selectedItem:{}
  };

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  

  renderItems() {
    return this.props.data.map(item => {
      return (
        <Item
          key={item.id}
          swipingCheck={swiping => this.setState({ swiping })}
          item={item}
          id={item.id}
          /* cleanFromScreen={id => this.cleanFromScreen(id)} */
          deleteItem = {this.props.deleteItem}
          leftButtonPressed={() => console.log("left button pressed")}
          deleteButtonPressed={() =>
            this.props.deleteItem(item.id)
          }
       
          editButtonPressed={() => this.setState({ isModalVisible: true ,selectedItemId:item.id, selectedItemCategory:item.category, selectedItemTitle:item.title,selectedItemDescription:item.description,selectedItemAmount:item.amount, selectedItemCurrency:item.currency, selectedItemDate:item.date})}
        />
      );
    });
  }
  toggleModal = () => {
    this.setState({ isModalVisible: false });
    this.props.editItem(this.state.selectedItemId,{category:this.state.selectedItemCategory,title:this.state.selectedItemTitle, description:this.state.selectedItemDescription, date:this.state.selectedItemDate, amount:this.state.selectedItemAmount, currency:this.state.selectedItemCurrency})
  };
  render() {
    return (
      <>
        <Modal isVisible={this.state.isModalVisible}
         backdropColor="white"
         backdropOpacity={1}
        >
          <View style={{ flex: 1 }}>
          <Text>Category:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={selectedItemCategory => this.setState({ selectedItemCategory })}
              value={this.state.selectedItemCategory}
            />
            <Text>Title:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={selectedItemTitle => this.setState({ selectedItemTitle })}
              value={this.state.selectedItemTitle}
            />
            <Text>Description:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={selectedItemDescription => this.setState({ selectedItemDescription })}
              value={this.state.selectedItemDescription}
            />
            <Text>Date:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={selectedItemDate => this.setState({ selectedItemDate })}
              value={this.state.selectedItemDate}
            />
            <Text>Amount:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={selectedItemAmount => this.setState({ selectedItemAmount })}
              value={this.state.selectedItemAmount}
            />
            <Text>Currency:</Text>
            <TextInput
              style={{ height: 40 }}
              onChangeText={selectedItemCurrency => this.setState({ selectedItemCurrency })}
              value={this.state.selectedItemCurrency}
            />
            <Button title="Update" onPress={this.toggleModal} />
          </View>
        </Modal>
        <ScrollView>{this.renderItems()}</ScrollView>
      </>
    );
  }
}

export default ListNew;
