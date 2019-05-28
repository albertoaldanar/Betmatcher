import React, {Component} from "react";
import {ScrollView, Text, View, Image, TouchableOpacity, Switch} from "react-native";
import MaterialTabs from "react-native-material-tabs";
import { Dropdown } from 'react-native-material-dropdown';
import FontAwesome, {Icons} from "react-native-fontawesome";

class Scroll extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 0,
      public: true
    }
  }

  render(){

    return(
        <View style = {{flex: 1, backgroundColor: "#161616"}}>

          <View style = {{alignSelf: "center"}}>
                <View style = {{flexDirection:"row"}}>
                    <Text style = {{color:"white", marginRight: 10, marginTop: 7}}>Public bet <FontAwesome>{Icons.users}</FontAwesome> </Text>
                    <Switch
                      onValueChange= {() => this.setState({public: !this.state.public})}
                      value = {this.state.public}
                      trackColor={{true: 'red', false: 'grey'}}
                    />
                    <Text  style = {{color:"white", marginLeft: 10, marginTop: 7}}>Betfriend <FontAwesome>{Icons.user}</FontAwesome></Text>
                </View>
          </View>
        </View>
    );
  }
}

const styles = {
    image: {
      width: 45,
      height: 45,
      marginRight: 15,
      marginLeft: 6,
      marginBottom:10,
      alignSelf:"center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
}

export default Scroll;
