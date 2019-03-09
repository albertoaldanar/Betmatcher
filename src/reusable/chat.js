import React, {Component} from "react";
import {View, Text, TextInput, Dimensions, TouchableOpacity} from "react-native";

class Chat extends Component{
  render(){
    return(
      <View style = {styles.container}>
        <TouchableOpacity onPress = {this.props.closeModal}>
          <Text style = {{color: "white"}}>Close</Text>
        </TouchableOpacity>

        <TextInput
          style= {styles.input}
          placeholder = "Chat with your opponent"
        />
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#161616",
    flex: 1
  },
  input: {
    position: "absolute",
    bottom: 10,
    borderWidth: 0.5,
    borderColor: "white",
    color: "white",
    height: 30,
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 5,
    textAlign: "center",
    alignSelf:"center"
  }
}
export default Chat;
