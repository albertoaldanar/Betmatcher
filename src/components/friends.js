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
import Scroll from "./scroll";
import SegmentedControlTab from "react-native-segmented-control-tab";

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
      index: 0
    }
  }

  handleIndexChange(index){
    this.setState({index})
  }

  selectView(){
    switch(this.state.index){
        case 0:
          return this.userList(UserList1)
          break;

        case 1:
          return null
          break;
    }
  }

    userList(item){
      return item.map((u, index) => {
        return(
          <View key = {index}>
            <View style = {styles.tableStyle}>
              <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                <View style= {{flexDirection:"row"}}>
                  <Image
                    source = {{uri: u.image}}
                    style = {styles.image}
                  />
                  <Text style = {{ marginTop: 10, color: "#ffff", fontSize: 13, fontWeight: "300"}}>{u.user}</Text>
                </View>

                <TouchableOpacity>
                  <FontAwesome style = {{color: "#00B073", alignItems: "center", paddingTop: 10, fontSize: 20}}>{Icons.share}</FontAwesome>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })
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
  tableStyle: {
    marginBottom: 5,
    padding: 15,
  },
}


export default Friends;
