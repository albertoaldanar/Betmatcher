import React from "react";
import {View, Text, ScrollView} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

const Header = () => {
  return(
    <View style = {styles.container} >
      <FontAwesome style ={{color: "#7DDECC", fontSize: 10, paddingRight: 20}}>{Icons.list}</FontAwesome>
      <Text style = {{color: "#7DDECC"}}>Betmatcher</Text>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    padding: 40
  }
}

export default Header;
