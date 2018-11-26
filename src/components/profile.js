import React, {Component} from "react";
import {View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import Header from "../reusable/header";


class Profile extends Component{

  constructor(props){
    super(props);
    this.state = {email: "", password: "", token: {}}
  }

  onChangeEmail(text){
    this.setState({email: text})
  }

  onChangePassword(text){
    this.setState({password: text})
  }

  // sendToHome(admin){
  //   if(admin){
  //     const navigateAction = NavigationActions.navigate({
  //     routeName: "HomeAdmin"
  //     })
  //     this.props.navigation.dispatch(navigateAction);
  //   } else {

  //     const navigateAction = NavigationActions.navigate({
  //     routeName: "HomeVendor"
  //     })
  //     this.props.navigation.dispatch(navigateAction);
  //   }

  // }

  login(){
    fetch("http://localhost:3000/api/user_token/", {
        method: 'POST',
        body: JSON.stringify({"auth": {"email": this.state.email, "password": this.state.password}}),
        headers:{
          "Accept": "application/json",
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => alert(e))
      .then(response => console.log(response));
  }

  catchUser(token){
    fetch("http://localhost:3000/api/user_type", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        'Authorization': token.jwt,
      }
    }).then(res => res.json())
      .then(response => {
      this.sendToHome(response)
    })
    .catch(e => console.log(e))
  }

  render(){
    return(
      <View>
        <Header/>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText= {(text) => this.onChangeEmail(text)}
          value = {this.state.email}
          autoCapitalize = 'none'
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText= {(text) => this.onChangePassword(text)}
          value = {this.state.password}
          autoCapitalize = 'none'
        />

        <TouchableOpacity
          style = {{backgroundColor: "red", padding: 20}}
          onPress ={this.catchUser.bind(this)}>
          <Text style = {{color: "white"}}>POST</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Profile;
