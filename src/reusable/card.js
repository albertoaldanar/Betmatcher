import React from "react";
import {View, Text} from "react-native";

const Card = (props) => {
  return(
    <View style = {styles.card}>
      {props.children}
    </View>
  );
}

const styles= {
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
    }
}

export default Card;
