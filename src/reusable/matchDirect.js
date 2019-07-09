import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";

class MatchDirect extends Component{
  render(){
    const {directBet} = this.props;
    return(
      <LinearGradient  style = {{flex: 1, borderRadius: 5}} start={{x: 0, y: 0}} end={{x: 4 , y: 1}} colors = {[ "black", "gray"]}>
        <Text style = {{color: "white"}}>{directBet.amount}</Text>
        <TouchableOpacity onPress = {this.props.closeModal} style = {styles.button}>
          <Text style= {{color: "white", alignSelf: "center", fontSize: 16}}>CONTINUE</Text>
        </TouchableOpacity>
      </LinearGradient>

    );
  }
}


const styles= {
  button: {
    position: "absolute", bottom: 0,
    left: 0, right: 0, backgroundColor: "#00B073",
    padding: 12, borderRadius: 5
  }
}

export default MatchDirect;
