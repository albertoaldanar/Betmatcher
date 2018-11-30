import React, {Component} from "react";
import {View, Text, Image, TextInput, TouchableOpacity, Dimensions} from "react-native";
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import Header from "../reusable/header";
import User from "../constants/user";
import FontAwesome, {Icons} from "react-native-fontawesome";

class Profile extends Component{

  render(){
    const stats = [1, 5, 4];

    return(
      <View style = {{flex: 1, backgroundColor: "#1A1919"}}>
        <View style = {{backgroundColor: "#7DDECC", paddingBottom: 50}}>
          <View style = {styles.bar}>
            <TouchableOpacity>
              <FontAwesome style = {{color: "#ffff", fontSize: 20, marginLeft: 13}}>{Icons.cogs}</FontAwesome>
            </TouchableOpacity>

            <TouchableOpacity>
              <FontAwesome style = {{color: "#ffff", fontSize: 20,  marginRight: 13}}>{Icons.users}</FontAwesome>
            </TouchableOpacity>
          </View>

          <View style = {styles.userInfo}>
            <Image style={styles.imageStyle} source={{uri: User.image}}/>
            <Text style = {styles.username}> {User.userName} </Text>
            <Text style = {[styles.username, {fontSize: 15, fontWeight:"400"}]}>{User.country}</Text>
            <Text style = {[styles.username, {fontSize: 15, fontWeight:"bold"}]}> {User.coins} </Text>
          </View>
        </View>

        <View style = {styles.stats}>
          <View>
            <Text style = {styles.text}> Won </Text>
            <Text style = {styles.count}>{User.won}</Text>
          </View>

          <View>
            <Text style = {styles.text}> Draw </Text>
            <Text style = {styles.count}>{User.draw}</Text>
          </View>

          <View>
            <Text style = {styles.text}> Lost </Text>
            <Text style = {styles.count}>{User.lost}</Text>
          </View>
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
    marginTop: -30,
    backgroundColor: "black",
    borderBottomWidth: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    padding: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 17,
    color: "#ffff",
    fontWeight: "300",
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
    marginLeft: 15
  },
  username: {
    color: "white",
    fontSize: 25,
    fontWeight: "500",
    alignSelf: "center",
    margin: 5,
    marginTop: 8
  },
  userInfo: {
    marginTop: 5
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40
  }
}

export default Profile;
