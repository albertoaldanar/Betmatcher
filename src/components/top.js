import React, {Component} from "react";
import {View, Text, Image, FlatList, TouchableOpacity, RefreshControl, ScrollView} from "react-native";
import Games from "../constants/games";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {NavigationActions} from "react-navigation";
import Header from "../reusable/header";

class Top extends Component{

  constructor(props){
    super(props);
    this.state = {refreshing: false}
  }

  gameDetails(game){
    const navigateAction = NavigationActions.navigate({
      routeName: "Description",
      params: {game: game}
    });

    this.props.navigation.dispatch(navigateAction);
  }

  showTopGames(){
    return Games.map( (g) => {
      return(
        <TouchableOpacity onPress = {this.gameDetails.bind(this, g)}>
          <View style = {styles.card}>
            <View style = {styles.desc}>
              <Text style = {styles.league}>{g.league}</Text>
                <Text style = {styles.hour}>{g.time}</Text>
              </View>

              <View style = {styles.match}>
                <FontAwesome style= {[styles.chevron, {color: "gray", fontSize: 35, marginBottom: 15}]}>{Icons.circle}</FontAwesome>

                <View style = {{paddingRight: 90}}>
                  <Text style = {styles.text}>{g.local}</Text>
                  <Text style = {[styles.text, {fontSize: 9, fontStyle: "oblique", fontWeight: "400"}]}>VS.</Text>
                  <Text style = {styles.text}>{g.visit}</Text>
                </View>

                <FontAwesome style= {styles.chevron}>{Icons.chevronRight}</FontAwesome>
              </View>
          </View>
        </TouchableOpacity>
      );
    })
  }

  render(){
    console.log(Games)
    return(
      <View style = {{flex: 1, backgroundColor: "#161616"}}>
          <Header/>
          <ScrollView>
            {this.showTopGames()}
          </ScrollView>
      </View>
    );
  }
}

const styles = {
  card: {
    padding: 7,
    margin: 7,
    backgroundColor: "#1A1919",
    borderRadius: 3,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 0.3,
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    paddingBottom: 5
  },
  league: {
    color: "#7DDECC",
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
    color: "#7DDECC",
    fontSize: 20,
    marginTop: 20,
    fontWeight: "400"
  }
}

export default Top;
