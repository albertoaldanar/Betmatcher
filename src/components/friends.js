import React, {Component} from "react";
import {View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, Image, Animated, PanResponder,} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from 'react-native-check-box'
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";
import { YAxis, Grid } from 'react-native-svg-charts';
import SwipeCards from 'react-native-swipe-cards';
import { Pages } from 'react-native-pages';
import UserList1 from "../constants/userList1";
import Carousel from 'react-native-snap-carousel';
import Login from "./login";

const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

class Friends extends Component{
  constructor(props){
    super(props);

    const position = new Animated.ValueXY();
    const cardsPanResponder = PanResponder.create( {
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: ( event, gestureState ) => {
        this.state
          .cardsPan
          .setValue(
            { x: gestureState.dx, y: this.state.cardsPan.y }
           );
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: ( event, gestureState ) => {
          Animated.timing( this.state.cardsPan, {
            toValue: 0,
            duration: 300,
          } ).start();
    // will be used to interpolate values in each view
          Animated.timing( this.state.cardsStackedAnim, {
            toValue: 1,
            duration: 300,
          } ).start( () => {
      // reset cardsStackedAnim's value to 0 when animation ends
          this.state.cardsStackedAnim.setValue( 0 );
      // increment card position when animation ends
          this.setState({
            currentIndex: this.state.currentIndex + 1,
          });
      });
      }
  });

    this.state = {
      showLightBox: true,
      users: 14,
      cardsPan: position,
      panResponder: cardsPanResponder,
      cardsStackedAnim: new Animated.Value( 0 ),
      currentIndex: 0,
    }
  }

    userList({item}, index){
      return(
        <View style = {styles.card}>
          <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
            <View style = {{flexDirection:"row"}}>
              <Image
                source = {{uri: item.image}}
                style = {styles.image}
              />
              <View style = {{marginLeft: 15, marginBottom: 10}}>
                <Text style = {{ marginTop: 10, color: "#00B073", fontSize: 17}}>{item.user}</Text>
                <Text style = {{color: "gray", fontSize: 13, marginTop: 4}}> <FontAwesome>{Icons.mapMarker}</FontAwesome> {item.country} </Text>
              </View>
            </View>

            <Text style = {{color: "white", fontSize: 14, marginTop: 10, marginLeft: 15}}> +19 % <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome> </Text>
          </View>


            <Text style = {{color: "#DAA520", fontSize: 19, marginTop: 15, alignSelf:"center"}}> {item.bet}  <FontAwesome>{Icons.bitcoin}</FontAwesome> </Text>

          <TouchableOpacity style = {{backgroundColor: "#00B073", padding: 10, marginTop: 30, borderRadius: 5}}>
            <Text style = {{color: "white", fontSize: 14, alignSelf:"center"}}> VIEW BET </Text>
          </TouchableOpacity>
        </View>
      );
  }

  render(){

    return(
      <View style = {styles.container}>
        <Login/>
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
    margin: 15,
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
