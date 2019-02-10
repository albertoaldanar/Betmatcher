import React, {Component} from "react";
import {View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from 'react-native-check-box'
import Details from "../constants/eventsDetails";
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";


class Friends extends Component{
  constructor(props){
    super(props);
    this.state = {
      showLightBox: true,
      users: 14
    }

  }

  render(){

    return(
      <View>
        <Text>ffff</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "black",
    flex: 1
  },
  card: {
    backgroundColor: "#161616",
    padding: 25,
    borderRadius: 5,
    margin: 20,
    elevation: 5,
    shdowColor: "gray"
  }

}


export default Friends;
