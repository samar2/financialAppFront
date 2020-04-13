import * as React from "react";
import {AsyncStorage} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/Home";
import Detail from "../screens/Detail";
import Settings from "../screens/Settings";
import Goals from "../screens/Goals";
import Categories from "../screens/Categories";
import MenuTab from "../../app/components/MenuTab";
import Logout from "../../app/components/Logout";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || "Dashboard";

  switch (routeName) {
    case "Dashboard":
      return "Dashboard";
    case "Goals":
      return "Goals";
  }
}

class MainTabNavigator extends React.Component {
  state = {
    incomes: [],
    expenses: [],
    transactions:[],
    currencies:[],
    categories:[],
    data: [
      {
        id: 1,
        category: "Salary",
        title: "Work 1",
        description: "something",
        amount: 500,
        currency: "$",
        date: "01/03/2020",
        type: "income",
      },
      {
        id: 2,
        category: "Salary",
        title: "Work 2",
        description: "something",
        amount: 300,
        currency: "$",
        date: "01/03/2020",
        type: "income",
      },
      {
        id: 3,
        category: "Salary",
        title: "Work 13",
        description: "something",
        amount: 250,
        currency: "$",
        date: "01/03/2020",
        type: "income",
      },
      {
        id: 4,
        category: "Extra",
        description: "something",
        title: "Freelance",
        amount: 700,
        currency: "$",
        date: "11/03/2020",
        type: "income",
      },
      {
        id: 5,
        category: "Fun",
        description: "something",
        title: "Lottery",
        amount: 10,
        currency: "$",
        date: "07/03/2020",
        type: "income",
      },
      {
        id: 6,
        category: "Extra",
        description: "something",
        title: "Sold TV",
        amount: 140,
        currency: "$",
        date: "12/03/2020",
        type: "income",
      },
      {
        id: 7,
        category: "Extra",
        description: "something",
        title: "gift",
        amount: 50,
        currency: "$",
        date: "17/03/2020",
        type: "income",
      },
      {
        id: 8,
        category: "Utilities",
        description: "monthly bill",
        title: "Gas",
        amount: 50,
        currency: "$",
        date: "18/03/2020",
        type: "expense",
      },
      {
        id: 8,
        category: "Loans",
        description: "taken from bank",
        title: "House",
        amount: 300,
        currency: "$",
        date: "18/03/2020",
        type: "expense",
      },
    ],
  };
  addCategory = (category)=>
  {
    const categories = [...this.state.categories];
    categories.push(category);
    this.setState({categories})
  }
  deleteItem = async(id) => {
    console.log(id);
    const response = await fetch(`http://192.168.1.105:8000/api/transactions/${id}`,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const result = await response.json();
    console.log(result);
    if(result.status ==="success"){
      const transactions = this.state.transactions.filter((item) => {
        return item.id !== id;
      });
      this.setState({ transactions });
    }
    
  };
  addItem = async(props) => {
    const data = [...this.state.data];
    const id = data[data.length - 1].id + 1;
    const item = {
      id: id,
      category: parseInt(props.category),
      description: props.description,
      title: props.title,
      amount:parseFloat( props.amount),
      currency: parseInt(props.currency),
      start_date: props.start_date,
      end_date: props.end_date,
      type: props.type,
      kind: props.kind,
      user_id:11

    };
    console.log(item)
    const body = new FormData();
    body.append("user_id",item.user_id);
    body.append("categories_id",item.category);
    body.append("title",item.title);
    body.append("description",item.description);
    body.append("amount",item.amount);
    body.append("start_date",item.start_date);
    body.append("end_date",item.end_date);
    body.append("type",item.type);
    body.append("kind",item.kind);
    body.append("interval","none");
    body.append("currencies_id",item.currency);
    const response = await fetch('http://192.168.1.105:8000/api/transactions',{
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
    if(result.status==="success"){
      const response2 = await fetch(`http://192.168.1.105:8000/api/categories/${result.transaction.categories_id}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
         
          'Accept': 'application/json'
        }});
        const result2 = await response2.json();
        console.log(result2);
        const response3 = await fetch(`http://192.168.1.105:8000/api/currencies/${result.transaction.currencies_id}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
         
          'Accept': 'application/json'
        }});
        const result3 = await response3.json();
        console.log(result3);
    const transactions = [...this.state.transactions];
    const transaction= result.transaction;
    transaction.category= result2.category;
    transaction.currency = result3.currency;
    transactions.push(transaction)
    this.setState({transactions});
    }
  };
  editItem = async(id, props) => {
    console.log(id)
    console.log(props)
    const body = new FormData();
    body.append("user_id",11);
    body.append("end_date",props.end_date);
    body.append("amount",props.amount);
    const response = await fetch(`http://192.168.1.105:8000/api/transactions/${id}`,{
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
     const transactions = this.state.transactions.map((item) => {
      // if this is the transaction we need to change, update it. This will apply to exactly
      // one transaction
      if (item.id === id) {
        const newItem = result.transaction;
        newItem.category= item.category;
        newItem.currency = item.currency;
        return newItem;
      }
      // otherwise, don't change the transaction at all
      else {
        return item;
      }
    });
    this.setState({ transactions }); 
  };
  async componentDidMount(){
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);
    const response = await fetch('http://192.168.1.105:8000/api/transactions',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const result = await response.json();
   // console.log(result);
    const response2 = await fetch('http://192.168.1.105:8000/api/currencies',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const result2 = await response2.json();
    const response3 = await fetch('http://192.168.1.105:8000/api/categories',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const result3 = await response3.json();
   // console.log(result3.category)
    this.setState({transactions:result.transaction, currencies:result2.currencies, categories:result3.category});
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "white",
          style: {
            backgroundColor: "#74b37a",
          },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name == "Dashboard") {
              iconName = "ios-home";
            } else if (route.name == "Goals") {
              iconName = "ios-cash";
            }
            else if (route.name == "Logout") {
              iconName = "ios-close-circle";
            } else if (route.name == "Categories") {
              iconName = "ios-pricetags";
            }
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={(props) => (
            <MenuTab
              data={this.state.data}
              deleteItem={this.deleteItem}
              addItem={this.addItem}
              editItem={this.editItem}
              transactions={this.state.transactions}
              currencies={this.state.currencies}
              categories={this.state.categories}
            />
          )}
        />
        <Tab.Screen
          name="Categories"
          component={(props) => (
            <Categories
              addCategory={this.addCategory}
              categories={this.state.categories}
            />
          )}
        />
        <Tab.Screen name="Goals" component={Goals} />
        <Tab.Screen name="Logout" component={(props)=>(
          <Logout
          isLoggedOut={this.props.isLoggedOut}
          />
        
        )}
        />
       
        </Tab.Navigator>
    );
  }
}

function MainStackNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: "#74b37a",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTintColor: "white",
          headerBackTitleVisible: false,
        }}
        headerMode="float"
      >
        <Stack.Screen
          name="Dashboard"
          component={()=><MainTabNavigator isLoggedOut={props.isLoggedOut}/>}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={({ route }) => ({
            title: route.params.item.name,
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: "Settings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
