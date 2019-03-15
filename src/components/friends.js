import React, {Component} from "react";
import {View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, Image} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from 'react-native-check-box'
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";
import { YAxis, Grid } from 'react-native-svg-charts';
import SwipeCards from 'react-native-swipe-cards';
import { Pages } from 'react-native-pages';
import UserList1 from "../constants/userList1";

class Friends extends Component{
  constructor(props){
    super(props);
    this.state = {
      showLightBox: true,
      users: 14
    }
  }

    userList(){
      return(
        <View>
          <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
            <View style = {{flexDirection:"row"}}>
              <Image
                source = {{uri: "https://www.scripturaengage.com/wp-content/uploads/2017/03/Profile-Picture-Gert-Cools-Circle.png"}}
                style = {styles.image}
              />
              <View style = {{marginLeft: 15, marginBottom: 10}}>
                <Text style = {{ marginTop: 10, color: "#00B073", fontSize: 17}}>albertoaldanar</Text>
                <Text style = {{color: "gray", fontSize: 13, marginTop: 4}}> <FontAwesome>{Icons.mapMarker}</FontAwesome> Mexico </Text>
              </View>
            </View>

            <Text style = {{color: "white", fontSize: 14, marginTop: 10, marginLeft: 15}}> +19 % <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome> </Text>
          </View>


            <Text style = {{color: "#DAA520", fontSize: 19, marginTop: 15, alignSelf:"center"}}> 1950 <FontAwesome>{Icons.bitcoin}</FontAwesome> </Text>

          <TouchableOpacity style = {{backgroundColor: "#00B073", padding: 10, marginTop: 30}}>
            <Text style = {{color: "white", fontSize: 14, alignSelf:"center"}}> View bet </Text>
          </TouchableOpacity>
        </View>
      );
  }

  render(){

    return(
      <View style = {styles.container}>
        <View style = {styles.card}>
          {this.userList()}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#161616",
    flex: 1
  },
  chart: {
    height: 200,
    width: Dimensions.get("window").width,
    flexDirection: "row",
  },
  card: {
    selfAlign: "center",
    marginTop: 200,
    padding: 15,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: "black",
    margin: 20,
    borderRadius: 7,
    borderColor:"gray",
    borderWidth:0.3
  },
  noMoreCardsText: {
    fontSize: 22,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 5
  },
  user: {
    color: "#00B073",
    fontSize: 21,
    marginTop: 8
  },
  descript: {
    flexDirection:"row",
    justifyContent:"space-around"
  },
  explanation: {
    color: "gray",
    fontWeight: "400",
    marginBottom: 10
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 5,
    marginLeft: 6
  },
}


export default Friends;
