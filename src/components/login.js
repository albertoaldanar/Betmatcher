import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, Image, Dimensions, AsyncStorage} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import {NavigationActions} from "react-navigation";

class Login extends Component{

  constructor(props){
    super(props);
    this.state= {
      username: "",
      email: "",
      password: "",
      password_confirmation:"",
      isSignup: false,
      loginUsername: "",
      loginPassword: ""
    }
  }

  userSignup(){
    const {username, password, password_confirmation, email} = this.state;

      return fetch("http://localhost:8000/users/signup/", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({"username": username, "email": email, "password": password, "password_confirmation": password_confirmation})
      })
      .then(res => res.json())
      .then(jsonRes => {
        try {
          AsyncStorage.setItem('token', jsonRes.jwt);
        } catch (error) {
        // Error retrieving data
          console.log(error.message);
          this.sendToHome.bind(this);
        }
      })
      .catch(error => console.log(error));


  }

  userLogin(){
    const {loginPassword, loginUsername} = this.state;

      return fetch("http://localhost:8000/users/login/", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({"username": loginUsername, "password": loginPassword})
      })
      .then(res => res.json())
      .then(jsonRes => {
        try {
          AsyncStorage.setItem('token', jsonRes.jwt);
          AsyncStorage.setItem('username', jsonRes.user.username);
        } catch (error) {
        // Error retrieving data
          console.log(error.message);
        }
      })
      .catch(error => console.log(error));
  }



  sendToHome(){
    const navigateAction = NavigationActions.navigate({
      routeName: "MainScreen"
    });

    this.props.navigation.dispatch(navigateAction);
  }

  onChangeInput = (state) => (event,value) => {
    this.setState({
      [state]:event
    });
  }

  registrationForm(){
    const {email, password_confirmation, password, username, loginUsername, loginPassword} = this.state;
    if(this.state.isSignup){
      return(
        <View style = {styles.inputs}>
          <TextInput
            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, marginBottom: 25, color: "white"}}
            placeholder = "Username"
            placeholderTextColor = "gray"
            autoCapitalize = 'none'
            onChangeText ={this.onChangeInput('username')}
            value = {username}
          />

          <TextInput
            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, color:"white", color: "white", marginBottom: 25,}}
            placeholder = "Email"
            placeholderTextColor = "gray"
            autoCapitalize = 'none'
            onChangeText ={this.onChangeInput('email')}
            value = {email}
          />
          <TextInput
            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, color:"white", color: "white", marginBottom: 25 }}
            placeholder = "Password"
            placeholderTextColor = "gray"
            secureTextEntry={true}
            autoCapitalize = 'none'
            onChangeText ={this.onChangeInput('password')}
            value = {password}
          />
          <TextInput
            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, color:"white", color: "white"}}
            placeholder = "Password confirmation"
            placeholderTextColor = "gray"
            secureTextEntry={true}
            autoCapitalize = 'none'
            onChangeText ={this.onChangeInput('password_confirmation')}
            value = {password_confirmation}
          />

          <View style = {{marginLeft: 15, marginRight: 15, marginTop: 55}}>
            <TouchableOpacity style = {{backgroundColor: "#00B073", paddingTop: 10, paddingBottom: 10}} onPress= {this.userSignup.bind(this)}>
              <Text style = {{textAlign: "center", color: "white", fontWeight: "300", fontSize: 16}}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style = {{ position: "absolute", bottom: 15, flexDirection: "row", alignSelf:"center"}}>
            <Text style= {{fontWeight: "300", color: "#DCDCDC"}}>Do yoy have an acount? </Text>
            <TouchableOpacity onPress= {() => this.setState({isSignup: false, username: "", password: ""})}>
              <Text style= {{fontWeight: "600", color: "#00B073"}}> Sign in </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else{
      return(
        <View style = {styles.inputs}>
          <TextInput
            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, marginBottom: 25, color: "white"}}
            placeholder = "Username"
            placeholderTextColor = "gray"
            autoCapitalize = 'none'
            onChangeText ={this.onChangeInput('loginUsername')}
            value = {loginUsername}
          />
          <TextInput
            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, color:"white", color: "white"}}
            placeholder = "Password"
            placeholderTextColor = "gray"
            secureTextEntry={true}
            autoCapitalize = 'none'
            onChangeText ={this.onChangeInput('loginPassword')}
            value = {loginPassword}
          />

          <View style = {{marginLeft: 15, marginRight: 15, marginTop: 55}}>
            <TouchableOpacity style = {{backgroundColor: "#00B073", paddingTop: 10, paddingBottom: 10}} onPress = {this.userLogin.bind(this)}>
              <Text style = {{textAlign: "center", color: "white", fontWeight: "300", fontSize: 16}}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {{marginTop: 12}}>
              <Text style = {{alignSelf:"center", color:"gray"}}>Forgot your password ?</Text>
            </TouchableOpacity>
          </View>

          <View style = {{ position: "absolute", bottom: 15, flexDirection: "row", alignSelf:"center"}}>
            <Text style= {{fontWeight: "300", color: "#DCDCDC"}}>Dont have an acount? </Text>
            <TouchableOpacity onPress= {() => this.setState({isSignup: true, username: "", password: ""})}>
              <Text style= {{fontWeight: "600", color: "#00B073"}}> Sign up </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  render(){
    console.log(this.state.username, this.state.email);

    return(
      <LinearGradient style = {{flex: 1}} start={{x: 1, y: 1}} end={{x: 4 , y: 0}} colors = {[ "#161616", "gray"]}>

        <Image source = {require('../images/smkt.png')} style = {{width: Dimensions.get("window").width * 0.6, height: 50, alignSelf: "center", marginTop: 55}}/>

        {this.registrationForm()}

      </LinearGradient>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#161616"
  },
  inputs: {
    justifyContent: 'center',
    margin: 15,
    marginLeft: 30,
    marginRight: 30,
    position: 'absolute',
    top: 0,left: 0,
    right: 0, bottom: 0,
  }
}

export default Login
