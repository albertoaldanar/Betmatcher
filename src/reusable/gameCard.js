import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator} from "react-native";
import Card from "./card";
import { addNavigationHelpers, StackNavigator, createBottomTabNavigator, NavigationActions, TabBarBottom  } from 'react-navigation';
import FontAwesome, {Icons} from "react-native-fontawesome";
import Moment from 'moment';

class GameCard extends Component{

  _isMounted = false;

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getRoute(params, route){
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: {par: params}
    });
    this.props.nav(navigateAction);
  }

  renderGameInfo(){
    var topEvents = this.props.data
    if (this._isMounted){
      return topEvents.map((d, index) => {
        return(
          <TouchableOpacity key = {index} onPress = { () => {this.getRoute(d, this.props.route)}}>
            <Card>
                <View style = {styles.desc}>
                  <Text style = {styles.league}>{d.data.league.name}</Text>
                  <Text style = {styles.hour}>{Moment(d.data.date).format("MMM Do YY")}</Text>
                </View>

                <View style = {styles.match}>
                  <Image source = {{uri: d.data.sport.img}} style = {{width: 45, height: 45, marginRight: 15}}/>

                  <View style = {{paddingRight: 90}}>
                    <Text style = {styles.text}>{d.local.name}</Text>
                    <Text style = {[styles.text, {fontSize: 9, fontStyle: "oblique", fontWeight: "400"}]}>VS.</Text>
                    <Text style = {styles.text}>{d.visit.name}</Text>
                  </View>

                  <FontAwesome style= {styles.chevron}>{Icons.chevronRight}</FontAwesome>
                </View>
            </Card>
          </TouchableOpacity>
        );
      })
    }else {
      return(
        <View style = {{marginTop: 300, alignSelf: "center"}}>
          <ActivityIndicator size="large" color="white"/>
        </View>
      );
    }
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
