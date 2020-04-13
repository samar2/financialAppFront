import React from "react";
import { Text, Button, View , TextInput, Picker} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";

export default class AddExpense extends React.Component {
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
    kind:"", 
    date:"", 
    show:false, 
    show2:false

  };
 dateDiff(startingDate, endingDate) {
    var startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
    console.log(startDate);
    if (!endingDate) {
        endingDate = new Date().toISOString().substr(0, 10);    // need date in YYYY-MM-DD format
    }
    var endDate = new Date(endingDate);
    console.log(endDate)
    if (startDate > endDate) {
        var swap = startDate;
        startDate = endDate;
        endDate = swap;
    }
    var startYear = startDate.getFullYear();
    var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var yearDiff = endDate.getFullYear() - startYear;
    var monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    var dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
        if (monthDiff > 0) {
            monthDiff--;
        } else {
            yearDiff--;
            monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
    }
    const days = (dayDiff>0)?1:0
    const months = yearDiff*12 + monthDiff +days ;
    //console.log(months)
    return months;
}
  closeModal = () => {
    this.setState({ isModalVisible: false , title:"", description:"", start_date:"", currency:"", amount:"",end_date:"",category:"", kind:""});
  };

  toggleModal = () => {
     const a=  this.state.amount/this.dateDiff(this.state.start_date,this.state.end_date);
    this.props.addItem({title:this.state.title,description:this.state.description, start_date:this.state.start_date, end_date:this.state.end_date, amount:a, currency:this.state.currency, type:"goal saving", kind:'recurring', category:this.state.category})
    this.setState({ isModalVisible: false , title:"", description:"", start_date:"", currency:"", amount:"",end_date:"",category:"", kind:""});
  };
  onChange = (event, selectedDate) => {
   
    const currentDate = selectedDate || this.state.start_date;
    var month = currentDate.getUTCMonth() + 1; //months from 1-12
    var day = currentDate.getUTCDate();
    var year = currentDate.getUTCFullYear();

    const newdate = year + "-"+(month<10?"0":"") + month + "-" +(day<10?"0":"")+ day;
    console.log(newdate);
    this.setState({start_date:newdate, show:false})
    
  };
  onChangeEnd = (event, selectedDate) => {
   
    const currentDate = selectedDate || this.state.end_date;
    var month = currentDate.getUTCMonth() + 1; //months from 1-12
    var day = currentDate.getUTCDate();
    var year = currentDate.getUTCFullYear();

    const newdate = year + "-"+(month<10?"0":"") + month + "-" +(day<10?"0":"")+ day;
    console.log(newdate);
    this.setState({end_date:newdate, show2:false})
    
  };
  render() {
    return (
      <>
        <Button
          title="ADD GOAL"
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
             <View>
              <Text>Start date: {this.state.start_date}</Text>
              <View style={{width: 150, marginTop:10, marginBottom:10}} >
        <Button onPress={()=>this.setState({show:true})} title="Select date" /></View>
      </View>
      {this.state.show && (
            <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode='date'
          display="default"
          onChange={this.onChange}
        />)}
        <View>
              <Text>End date: {this.state.end_date}</Text>
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
           
           

            <Button title="ADD" onPress={this.toggleModal} />
            <Button title="CANCEL" onPress={this.closeModal} />
          </View>
        </Modal>
      </>
    );
  }
}
