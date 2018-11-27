import React from "react";
import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

const Header = () => {
  return(
    <View style = {styles.container}>
      <TouchableOpacity>
        <FontAwesome style ={styles.listIcon}>{Icons.list}</FontAwesome>
      </TouchableOpacity>
      <Text style = {styles.title}>Betmatcher</Text>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    padding: 20,
  },
  title: {
    color: "#7DDECC",
    paddingTop: 10,
    fontSize: 15
  },
  listIcon: {
    color: "#7DDECC",
    fontSize: 16,
    paddingRight: 20,
    paddingTop: 10
  }
}

export default Header;
