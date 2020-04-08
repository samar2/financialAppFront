import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import Home from '../screens/Home'
import Detail from '../screens/Detail'
import Settings from '../screens/Settings'
import Profile from '../screens/Profile'
import MenuTab from '../../app/components/MenuTab'
import Login from "../../app/components/LogIn";
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Dashboard'

  switch (routeName) {
    case 'Dashboard':
      return 'Dashboard'
    case 'Profile':
      return 'Profile'
  }
}

class MainTabNavigator extends React.Component {
  state = {
    incomes:[],
    expenses:[],
    data: [
      {
        id: 1,
        category: "Salary",
        title: "Work 1",
        description: "something",
        amount: 500,
        currency: "$",
        date: "01/03/2020",
        type: "income"
      },
      {
        id: 2,
        category: "Salary",
        title: "Work 2",
        description: "something",
        amount: 300,
        currency: "$",
        date: "01/03/2020",
        type: "income"
      },
      {
        id: 3,
        category: "Salary",
        title: "Work 13",
        description: "something",
        amount: 250,
        currency: "$",
        date: "01/03/2020",
        type: "income"
      },
      {
        id: 4,
        category: "Extra",
        description: "something",
        title: "Freelance",
        amount: 700,
        currency: "$",
        date: "11/03/2020",
        type: "income"
      },
      {
        id: 5,
        category: "Fun",
        description: "something",
        title: "Lottery",
        amount: 10,
        currency: "$",
        date: "07/03/2020",
        type: "income"
      },
      {
        id: 6,
        category: "Extra",
        description: "something",
        title: "Sold TV",
        amount: 140,
        currency: "$",
        date: "12/03/2020",
        type: "income"
      },
      {
        id: 7,
        category: "Extra",
        description: "something",
        title: "gift",
        amount: 50,
        currency: "$",
        date: "17/03/2020",
        type: "income"
      },
      {
        id: 8,
        category: "Utilities",
        description: "monthly bill",
        title: "Gas",
        amount: 50,
        currency: "$",
        date: "18/03/2020",
        type: "expense"
      },
      {
        id: 8,
        category: "Loans",
        description: "taken from bank",
        title: "House",
        amount: 300,
        currency: "$",
        date: "18/03/2020",
        type: "expense"
      }
    ]
  };
  deleteItem = id => {
    const data = this.state.data.filter(item => {
      return item.id !== id;
    });
    this.setState({ data });
  };
  addItem = props => {
    const data = [...this.state.data];
    const id = data[data.length - 1].id + 1;
    const item = {
      id: id,
      category: props.category,
      description: props.description,
      title: props.title,
      amount: props.amount,
      currency: props.currency,
      date: props.date,
      type: props.type
    };
    data.push(item);
    this.setState({ data });
  };
  editItem = (id, props) => {
    const data = this.state.data.map(item => {
      // if this is the contact we need to change, update it. This will apply to exactly
      // one contact
      if (item.id === id) {
        const newItem = {
          id: item.id,
          category: props.category || item.category,
          description: props.description || item.description,
          title: props.title || item.title,
          amount: props.amount || item.amount,
          currency: props.currency || item.currency,
          date: props.date || item.date,
          type: props.type || item.type
        };
        return newItem;
      }
      // otherwise, don't change the transaction at all
      else {
        return item;
      }
    });
    this.setState({ data });
  };

  render(){
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#e1eab8',
        style: {
          backgroundColor: '#86ad00'
        }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName
          if (route.name == 'Dashboard') {
            iconName = 'ios-home'
          } else if (route.name == 'Profile') {
            iconName = 'ios-person'
          }
          return <Ionicons name={iconName} color={color} size={size} />
        }
      })}>
      <Tab.Screen name='Dashboard' component={(props)=><MenuTab
      data={this.state.data}
      deleteItem={this.deleteItem}
  addItem={this.addItem}
  editItem={this.editItem}
      />} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
    }
}

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#86ad00'
          
          },
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTintColor: '#e1eab8',
          headerBackTitleVisible: false
        }}
        headerMode='float'>
        <Stack.Screen
          name='Dashboard'
          component={MainTabNavigator}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route)
          })}
        />
        <Stack.Screen
          name='Detail'
          component={Detail}
          options={({ route }) => ({
            title: route.params.item.name
          })}
        />
        <Stack.Screen
          name='Settings'
          component={Settings}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator
