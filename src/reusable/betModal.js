import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";

class BetModal extends Component{

  betChoice(){
    if(this.props.choice == 1){
        return(
          <View style = {{ felx: 1, backgroundColor: "#ffff" }}>
            <Text>Team selected =  {this.props.team}</Text>
              <TouchableOpacity style = {{alignSelf: "center", marginTop: 20}} onPress  = {this.props.visible} >
                <Text >
                  X
                </Text>
              </TouchableOpacity>
          </View>
        );
      } else if(this.props.choice == 2) {
          return(
            <View style = {{ felx: 1, backgroundColor: "#ffff" }}>
              <Text> How much you want to bet to {this.props.team}</Text>
              <TouchableOpacity style = {{alignSelf: "center", marginTop: 20}} onPress = {this.props.visible}>
                <Text >
                  X
                </Text>
              </TouchableOpacity>
            </View>
          );
    }
  }

  render(){
    return(
      <View>
        {this.betChoice()}
      </View>
    );
  }
}

export default BetModal;
