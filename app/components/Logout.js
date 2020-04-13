import React from "react";
import {AsyncStorage} from "react-native";

export default class Logout extends React.Component {

    async componentDidMount(){
        await AsyncStorage.removeItem('access_token'); 
        this.props.isLoggedOut()
    }
    render(){
        return(<></>)
    }
}
