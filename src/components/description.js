import React, {Component}from "react";
import {View, Text} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

class Description extends Component{
  render(){
    let game = this.props.navigation.state.params.game;

    return(
      <View style = {styles.container}>
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
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#161616",
  },
  title: {
    color:"#ffff",
    fontSize: 15,
    fontWeight: "700",
    margin: 10,
    marginBottom: 5
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
    marginBottom: 6
  },
  game: {
    flexDirection:"row",
  },
  word: {
    color: "#ffff",
    marginRight: 15,
    fontSize:15,
    fontWeight: "bold"
  }
}


export default Description;
