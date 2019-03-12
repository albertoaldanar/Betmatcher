import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import GameCard from "../reusable/gameCard";
import {NavigationActions} from "react-navigation";

class SelectedGames extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style = {styles.container}>
        <Text>Hola</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "black"
  }
}
export default SelectedGames;



