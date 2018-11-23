import React, {Component}from "react";
import {View, Text} from "react-native";

class Description extends Component{
  render(){
    let game = this.props.navigation.state.params.game
    return(
      <View style = {styles.container}>

        <View style = {styles.desc}>
          <Text style = {styles.text}> {game.local} </Text>
          <Text style = {styles.text}> VS. </Text>
          <Text style = {styles.text}> {game.visit} </Text>
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
  desc: {
    alignSelf: "center",
    padding: 5
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "400"
  }
}


export default Description;
