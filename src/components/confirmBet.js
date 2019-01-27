import React, {Component} from "react";
import {View, Text} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

class ConfirmBet extends Component{
  render(){
    const {user, game, teamSelected, teamsNotSelected} = this.props.navigation.state.params;

    return(
      <View style = {styles.container}>
        <View style = {styles.space}>
            <Text style = {styles.title}>Game information</Text>
            <View style = {styles.card}>
              <FontAwesome style = {styles.icon}>{Icons.circle}</FontAwesome>

              <View>
                <Text style = {styles.text}>{game.league}</Text>
                <Text style = {[styles.text, {fontWeight: "300", fontSize: 11, fontStyle: "oblique"}]}>{game.time}</Text>

                <View style = {styles.game}>
                  <Text style = {styles.word}>{game.local}</Text>
                  <Text style = {[styles.word, {fontStyle: "oblique"}]}>VS.</Text>
                  <Text style = {styles.word}>{game.visit}</Text>
                </View>
              </View>
            </View>
        </View>

        <View style = {{marginTop: 10}}>
          <Text style = {styles.title}>Bet confirmation</Text>

          <View style = {styles.betInfo}>
            <View style = {styles.singleUser}>
              <Text style = {styles.userName}>You</Text>
              <Text style = {styles.secondText}>{teamSelected}</Text>
            </View>
            <View style = {styles.singleUser}>
              <Text style = {styles.userName}>{user}</Text>
              <Text style = {styles.secondText}>{teamsNotSelected}</Text>
            </View>
          </View>

        </View>
      </View>
    );
  }
}

const styles ={
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    color:"#ffff",
    fontSize: 15,
    fontWeight: "700",
    margin: 10,
    color: "#00B073"
  },
  icon: {
    fontSize: 60,
    color: "gray",
    marginLeft: 5,
    marginRight: 15
  },
  card: {
    display: "flex",
    flexDirection: "row",
    padding: 20
  },
   text: {
    color: "#ffff",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 7,
  },
  secondText: {
    color: "#ffff",
    fontSize: 12,
    fontWeight: "300",
    marginTop: 7,
    alignSelf: "center"
  },
  game: {
    flexDirection:"row",
  },
  word: {
    color: "white",
    marginRight: 10,
    fontSize:15,
    fontWeight: "bold"
  },
  betInfo:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  singleUser: {
    backgroundColor: "#161616",
    flexDirection: "column",
    marginTop: 20,
    padding: 15,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 1,
    elevation: 1,
  },
  userName: {
    color: "#00B073",
    fontWeight: "300",
    fontSize: 15
  }
}

export default ConfirmBet;
