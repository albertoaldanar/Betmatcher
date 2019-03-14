import React, {Component} from "react";
import {View, Text, Image, TextInput, TouchableOpacity, Dimensions, StatusBar, ScrollView} from "react-native";
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import Header from "../reusable/header";
import User from "../constants/user";
import FontAwesome, {Icons} from "react-native-fontawesome";
import LinearGradient from "react-native-linear-gradient";
import ProfileCharts from "../reusable/profileCharts";
import {
  LineChart,
  BarChart,
  ProgressChart,
  PieChart,
  ContributionGraph
} from 'react-native-chart-kit'
import {Pages} from "react-native-pages";


class Profile extends Component{

  renderFriends(){
    const navigateAction = NavigationActions.navigate({
      routeName: "Friends"
    })
    this.props.navigation.dispatch(navigateAction);
  }

  render(){

    const data = [
      { name: 'Won', number: 3, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Draw', number: 1, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Lost', number: 0, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
    ];
    const data2 = [0.4, 0.6, 0.8]
    const chart_wh = 250
    const series = [9,2,1]
    const sliceColor = ['#00B073','#1FBED5','#DC143C']

    return(
      <View style = {{flex: 1, backgroundColor: "#161616"}}>

        <StatusBar hidden = {true}/>
          <View style = {{backgroundColor: "#00B073"}}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "#1A1919", "gray",]}>
            <View style = {styles.bar}>
                <TouchableOpacity>
                  <FontAwesome style = {{color: "#ffff", fontSize: 20, marginLeft: 20}}>{Icons.cogs}</FontAwesome>
                </TouchableOpacity>

                <TouchableOpacity onPress = {this.renderFriends.bind(this)}>
                  <FontAwesome style = {{color: "#ffff", fontSize: 20,  marginRight: 20}}>{Icons.users}</FontAwesome>
                </TouchableOpacity>
            </View>

            <View style = {{paddingBottom: 10}}>
              <Image style={styles.imageStyle} source={{uri: User.image}}/>
              <Text style = {styles.username}> {User.userName} </Text>

              <Text style = {[styles.username, {fontSize: 14, fontWeight:"300", marginBottom: 10, marginTop: 4, color: "gray" }]}>
                <FontAwesome>{Icons.mapMarker}</FontAwesome> {User.country}
              </Text>

              <Text style = {[styles.username, {fontSize: 19, fontWeight:"300", color: "#DAA520", marginBottom: 10}]}>
                {User.coins}  <FontAwesome style = {{color: "#DAA520"}}>{Icons.bitcoin}</FontAwesome>
              </Text>
            </View>
          </LinearGradient>
        </View>

          <View style = {styles.stats}>
            <View style = {{marginLeft: 10}}>
              <Text style = {styles.count}>{User.won}</Text>
              <Text style = {styles.text}> Won </Text>
            </View>

            <View>
              <Text style = {styles.count}>{User.draw}</Text>
              <Text style = {styles.text}> Draw </Text>
            </View>

            <View style = {{marginRight: 10}}>
              <Text style = {styles.count}>{User.lost}</Text>
              <Text style = {styles.text}> Lost </Text>
            </View>
          </View>
      </View>
    );
  }
}

const styles = {
  imageStyle:{
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    alignSelf: "center"
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 14,
    paddingBottom: 10,
    marginBottom: 11
  },
  text: {
    fontSize: 13,
    color: "gray",
    fontWeight: "500",
    alignSelf: "center"
  },
  icon: {
    paddingBottom: 10,
    fontSize: 30,
    marginLeft: 5
  },
  count: {
    color: "#00B073",
    fontWeight: "400",
    fontSize: 17,
    marginBottom: 8,
    marginLeft: 15,
    fontStyle: "oblique"
  },
  username: {
    color: "white",
    fontSize: 19,
    fontWeight: "500",
    alignSelf: "center",
    marginTop: 8,
    paddingBottom: 5
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  total: {
    color: "black",
    fontWeight: "400",
    fontSize: 20,
    alignSelf: "center",
    fontStyle: "oblique",
    backgroundColor: "#DCDCDC",
    padding: 5,
  },
  percent: {
    marginTop: -175,
    alignSelf: "center"
  },
  number: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    paddingBottom: 12
  }
}

export default Profile;
