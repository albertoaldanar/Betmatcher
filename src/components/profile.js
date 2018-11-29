import React, {Component} from "react";
import {View, Text, Image, TextInput, TouchableOpacity, Dimensions} from "react-native";
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import Header from "../reusable/header";
import User from "../constants/user";
import PieChart from 'react-native-pie-chart';
import FontAwesome, {Icons} from "react-native-fontawesome";

class Profile extends Component{

  render(){
    const stats = [1, 5, 4];

    return(
        <View style = {{flex:1, backgroundColor: "#1A1919"}}>
          <Header/>
            <Image style={styles.imageStyle} source={{uri: User.image}}/>
            <Text style = {styles.username}> {User.userName} </Text>

            <View style = {styles.stats}>
              <View>
                <FontAwesome style = {[styles.icon, {color: "green"}]}>{Icons.circle}</FontAwesome>
                <Text style = {styles.text}> Won </Text>
                <Text style = {styles.count}>{User.won}</Text>
              </View>
              <View>
                <FontAwesome style = {[styles.icon, {color: "blue"}]}>{Icons.circle}</FontAwesome>
                <Text style = {styles.text}> Draw </Text>
                <Text style = {styles.count}>{User.draw}</Text>
              </View>
              <View>
                <FontAwesome style = {[styles.icon, {color: "red"}]}>{Icons.circle}</FontAwesome>
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
    marginTop: 10,
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    alignSelf: "center"
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20
  },
  text: {
    fontSize: 15,
    color: "#ffff",
    fontWeight: "400",
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
    fontSize: 12,
    marginTop: 8,
    marginLeft: 15
  },
  username: {
    color: "white",
    size: 20,
    fontWeight: "700",
    alignSelf: "center",
    margin: 10
  }
}

export default Profile;
