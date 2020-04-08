import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    Profile: { screen: Profile },
    Settings: { screen: Settings }
  },
  {
    initialRouteName: "Home",
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: props => <Sidebar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer }
  },
  {
    initialRouteName: "Drawer"
  }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

state = {
  routes: [
    {
      name: "Home",
      icon: "ios-home"
    },
    {
      name: "Profile",
      icon: "ios-contact"
    },
    {
      name: "Settings",
      icon: "ios-settings"
    }
  ]
};
