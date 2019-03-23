import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, Image, Dimensions} from "react-native";
import LinearGradient from "react-native-linear-gradient";

class Login extends Component{
  render(){
    return(
     <LinearGradient style = {{flex: 1}} start={{x: 1, y: 1}} end={{x: 4 , y: 0}} colors = {[ "#161616", "gray"]}>

        <Image source = {require('../images/smkt.png')} style = {{width: Dimensions.get("window").width * 0.6, height: 50, alignSelf: "center", marginTop: 55}}/>

        <View style = {styles.inputs}>
          <TextInput
            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, marginBottom: 25, color: "white"}}
            placeholder = "Username"
            placeholderTextColor = "gray"
            autoCapitalize = 'none'
          />
          <TextInput
            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, color:"white", color: "white"}}
            placeholder = "Password"
            placeholderTextColor = "gray"
            secureTextEntry={true}
            autoCapitalize = 'none'
          />

          <View style = {{marginLeft: 15, marginRight: 15, marginTop: 55}}>
            <TouchableOpacity style = {{backgroundColor: "#00B073", paddingTop: 10, paddingBottom: 10}}>
              <Text style = {{textAlign: "center", color: "white", fontWeight: "300", fontSize: 16}}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {{marginTop: 12}}>
              <Text style = {{alignSelf:"center", color:"gray"}}>Forgot your password ?</Text>
            </TouchableOpacity>
          </View>

          <View style = {{ position: "absolute", bottom: 15, flexDirection: "row", alignSelf:"center"}}>
            <Text style= {{fontWeight: "300", color: "#DCDCDC"}}>Dont have an acount? </Text>
            <TouchableOpacity>
              <Text style= {{fontWeight: "600", color: "#00B073"}}> Sign up </Text>
            </TouchableOpacity>
          </View>
        </View>

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
