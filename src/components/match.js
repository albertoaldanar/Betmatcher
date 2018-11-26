import React, {Component} from "react";
import {View,Text} from "react-native";
import Header from "../reusable/header";

class Match extends Component{
  render(){
    return(
      <View>
        <Header/>
        <Text> Match View</Text>
      </View>
    );
  }
}


export default Match;
