import React from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
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
    selectedItem:{}, 
    show2:false
  };

  onChangeEnd = (event, selectedDate) => {
   
    const currentDate = selectedDate || this.state.end_date;
    var month = currentDate.getUTCMonth() + 1; //months from 1-12
    var day = currentDate.getUTCDate();
    var year = currentDate.getUTCFullYear();

    const newdate = year + "-"+(month<10?"0":"") + month + "-" +(day<10?"0":"")+ day;
    console.log(newdate);
    this.setState({selectedItemDate:newdate, show2:false})
    
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
          kind={item.kind}
          /* cleanFromScreen={id => this.cleanFromScreen(id)} */
          deleteItem = {this.props.deleteItem}
          leftButtonPressed={() => console.log("left button pressed")}
          deleteButtonPressed={() =>
            this.props.deleteItem(item.id)
          }
       
          editButtonPressed={() => this.setState({ isModalVisible: true ,selectedItemId:item.id, selectedItemAmount:item.amount,  selectedItemDate:item.end_date})}
        />
      );
    });
  }
  closeModal = () => {
    this.setState({ isModalVisible: false});
  };
  toggleModal = () => {
    this.setState({ isModalVisible: false });
    this.props.editItem(this.state.selectedItemId,{ end_date:this.state.selectedItemDate, amount:this.state.selectedItemAmount})
  };
  render() {
    return (
      <>
        <Modal isVisible={this.state.isModalVisible}
         backdropColor="white"
         backdropOpacity={1}
        >
          <View style={{ flex: 1 }}>
        
            <View>
              <Text>End date: {this.state.selectedItemDate}</Text>
              <View style={{width: 150, marginTop:10, marginBottom:10}} >
        <Button onPress={()=>this.setState({show2:true})} title="Select date" /></View>
      </View>
      {this.state.show2 && (
            <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode='date'
          display="default"
          onChange={this.onChangeEnd}
        />)}
            {/* <TextInput
              style={{ height: 40 }}
              onChangeText={selectedItemDate => this.setState({ selectedItemDate })}
              value={this.state.selectedItemDate}
            /> */}
            <Text>Amount:</Text>
            <TextInput
              style={{ height: 40, color:'black' }}
              onChangeText={selectedItemAmount => this.setState({ selectedItemAmount })}
              value={`${this.state.selectedItemAmount}`}
            />
            
            <Button title="Update" onPress={this.toggleModal} />
            <Button title="CANCEL" onPress={this.closeModal} />
          </View>
        </Modal>
        <ScrollView>{this.renderItems()}</ScrollView>
      </>
    );
  }
}

export default ListNew;
