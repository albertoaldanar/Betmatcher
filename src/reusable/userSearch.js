import React, {Component} from "react";
import {View, Text, ScrollView, TouchableOpacity} from "react-native";

class UserSearch extends Component{
  render(){
    return(
      <View style = {{backgroundColor: "#161616", flex: 1}}>
        <TouchableOpacity style = {{position: "absolute", left: 10, top: 10}} onPress= {this.props.closeModal}>
          <Text style = {{color:"#ffff"}}> X </Text>
        </TouchableOpacity>
        <Text style = {{color: "#ffff"}}>USER SEARCH</Text>
      </View>
    );
  }
}


export default UserSearch;
