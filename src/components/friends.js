import React, {Component} from "react";
import {View, Text, Dimensions} from "react-native";
import LinearGradient from "react-native-linear-gradient";

class Friends extends Component{
  render(){
    return(

        <View style = {{flex: 1, backgroundColor:"#1A1919"}}>
          <LinearGradient colors = {["#1A1919", "red"]}>
            <Text>Friends List</Text>
          </LinearGradient>
        </View>
    );
  }
}


export default Friends;
