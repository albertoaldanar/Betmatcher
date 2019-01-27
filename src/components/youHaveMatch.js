import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";

class YouHaveMatch extends Component{
  render(){
    return(
      <View style = {styles.container}>
        <View>
          <Text style = {styles.matchTitle}>You have a match!</Text>
        </View>

        <TouchableOpacity style = {styles.buttonCointainer} onPress = {this.props.sendToMatches}>
          <Text style = {styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#161616"
  },
  matchTitle: {
    color:"#00B073",
    fontWeight: "300",
    fontStyle: "oblique",
    fontSize: 30,
    alignSelf: "center",
    marginTop: 35,
  },
  buttonCointainer: {
    backgroundColor: "#00B073",
    padding: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 17
  }
}

export default YouHaveMatch;
