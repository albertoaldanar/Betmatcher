import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Image} from "react-native";
import Card from "./card";
import { addNavigationHelpers, StackNavigator, createBottomTabNavigator, NavigationActions, TabBarBottom  } from 'react-navigation';
import FontAwesome, {Icons} from "react-native-fontawesome";
class GameCard extends Component{

  constructor(props){
    super(props);
  }

  getRoute(params, route){
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: {par: params}
    });
    this.props.nav(navigateAction);
  }

  renderGameInfo(){
    return this.props.data.map((d, index) => {
      return(
        <TouchableOpacity key = {index} onPress = { () => {this.getRoute(d, this.props.route)}}>
          <Card>
              <View style = {styles.desc}>
                <Text style = {styles.league}>{d.league}</Text>
                <Text style = {styles.hour}>{d.time}</Text>
              </View>

              <View style = {styles.match}>
                <Image source = {{uri: d.image}} style = {{width: 45, height: 45, marginRight: 15}}/>

                <View style = {{paddingRight: 90}}>
                  <Text style = {styles.text}>{d.local}</Text>
                  <Text style = {[styles.text, {fontSize: 9, fontStyle: "oblique", fontWeight: "400"}]}>VS.</Text>
                  <Text style = {styles.text}>{d.visit}</Text>
                </View>

                <FontAwesome style= {styles.chevron}>{Icons.chevronRight}</FontAwesome>
              </View>
          </Card>
        </TouchableOpacity>
      );
    })
  }

  render(){
    return(
      <View>
        {this.renderGameInfo()}
      </View>
    );
  }
}

const styles = {
   text: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    paddingBottom: 5
  },
  league: {
    color: "#00B073",
    fontWeight: "bold",
    fontSize: 11
  },
  match: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  desc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  hour: {
    fontWeight: "300",
    fontSize: 11,
    color: "gray",
    fontStyle: "oblique"
  },
  chevron: {
    color: "#00B073",
    fontSize: 20,
    marginTop: 20,
    fontWeight: "400"
  }
};
export default GameCard;
