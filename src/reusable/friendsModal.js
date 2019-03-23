import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";

class FriendsModal extends Component{
  render(){
    return(
      <View style = {styles.container}>
        <TouchableOpacity onPress= {this.props.hideShow}>
          <Text style= {{color: "#ffff", alignSelf:"center"}}>Freinds</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1,
    backgroundColor: "#161616"
  }
}

export default FriendsModal;
