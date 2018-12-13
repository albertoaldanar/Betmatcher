import React, {Component} from "react";
import {View, Text, Image, TextInput, TouchableOpacity, Dimensions, StatusBar, ScrollView} from "react-native";
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import Header from "../reusable/header";
import User from "../constants/user";
import FontAwesome, {Icons} from "react-native-fontawesome";
import LinearGradient from "react-native-linear-gradient";
import PieChart from 'react-native-pie-chart';


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

    const chart_wh = 250
    const series = [15,1,2]
    const sliceColor = ['#00B073','#1FBED5','#DC143C']

    return(
      <View style = {{flex: 1, backgroundColor: "black"}}>

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

            <View style = {{paddingBottom: 20}}>
              <Image style={styles.imageStyle} source={{uri: User.image}}/>
              <Text style = {styles.username}> {User.userName} </Text>

              <View style = {{display: "flex", flexDirection: "row", justifyContent: "space-around", marginBottom: 2}}>
                <Text style = {[styles.username, {fontSize: 15, fontWeight:"300"}]}>
                  {User.country} <FontAwesome style = {{color: "#ffff", fontSize: 23}}>{Icons.flag}</FontAwesome>
                </Text>

                <Text style = {[styles.username, {fontSize: 15, fontWeight:"300"}]}>
                  {User.coins}  <FontAwesome style = {{color: "#ffff", fontSize: 23}}>{Icons.bitcoin}</FontAwesome>
                </Text>
              </View>

            </View>
            </LinearGradient>
          </View>



        <View style = {styles.stats}>
          <View>
            <Text style = {styles.text}> Won </Text>
            <Text style = {[styles.count, {color: "#00B073"}]}>{User.won}</Text>
          </View>

          <View>
            <Text style = {styles.text}> Draw </Text>
            <Text style = {[styles.count, {color: "#1FBED5"}]}>{User.draw}</Text>
          </View>

          <View>
            <Text style = {styles.text}> Lost </Text>
            <Text style = {[styles.count, {color: "#DC143C"}]}>{User.lost}</Text>
          </View>
        </View>

          <PieChart
            chart_wh={Dimensions.get('window').width * 0.65}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.95}
            coverFill={'black'}
            doughnut= {true}
            style ={{
              alignSelf: "center",
              marginTop: 7,
              shadowColor: '#696969',
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 3,
              shadowRadius: 6,
              elevation: 4,
            }}
          />

          <View style = {styles.percent}>
            <Text style = {[styles.number, {fontSize: 15}]}>TOTAL BETS: </Text>
            <Text style = {styles.number}> 4 </Text>
            <Text style = {styles.total}> Efficency 65 %</Text>
          </View>

      </View>
    );
  }
}

const styles = {
  imageStyle:{
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    alignSelf: "center"
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
    marginTop: 25,
  },
  text: {
    fontSize: 17,
    color: "#ffff",
    fontWeight: "500",
    alignSelf: "center"
  },
  icon: {
    paddingBottom: 10,
    fontSize: 30,
    marginLeft: 5
  },
  count: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 8,
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
