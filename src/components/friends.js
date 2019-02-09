import React, {Component} from "react";
import {View, Text, Dimensions, TouchableOpacity, FlatList} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from 'react-native-check-box'
import Details from "../constants/eventsDetails";
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";
import AwesomeAlert from 'react-native-awesome-alerts';
import PieChart from 'react-native-pie-chart';
import AutoScrolling from "react-native-auto-scrolling"

class Friends extends Component{
  constructor(props){
    super(props);
    this.state = {
      showLightBox: true,
      users: 14
    }
    this.mapArray = this.mapArray.bind(this);
  }

  changeState(){
    this.setState({showLightBox: !this.state.showLightBox})
  }

  mapArray(arr){
    return arr.map(x => {
      return (
        <View style = {{display: "flex", flexDirection:"row"}}>
          <Text style= {{color: "white", marginRight: 10}}> {x} </Text>
        </View>
      );
    })
  }

  render(){
    var myArray = "hello"
    var pep = "HELLOOO"

    return(
      <View style = {styles.container}>
          <AutoScrolling style={styles.scrolling2} endPaddingWidth={200} delay= {1000} duration ={6000}>
            <Text style = {{color: "white"}}> "Traded"                                "chettooo"</Text>
          </AutoScrolling>

          <AutoScrolling style={styles.scrolling2} endPaddingWidth={200} delay= {1000} duration ={6000}>
            <Text style = {{color: "white"}}> 55                               5999</Text>
          </AutoScrolling>
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
