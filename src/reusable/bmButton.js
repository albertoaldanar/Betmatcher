import React from "react";
import {View, Text, TouchableOpacity} from "react-native";

const BMButton = (props) => {
  return(
    <View style = {styles.button}>
      <TouchableOpacity>
        <Text style = {styles.text}>{props.children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "400",
    padding: 10
  },
  button: {
    backgroundColor: "#00B073",
    borderRadius: 5
  }
}

export default BMButton;
