import React, {Component} from "react";
import {View, Text} from "react-native";

const Menu = () => {
  return(
    <View style = {styles.container}>
      <Text style  ={{color: "#ffff"}}>SideBar</Text>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: "white",
    flex: 1
  }
}

export default Menu;
