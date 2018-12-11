import React, {Component} from "react";
import {Text, View} from "react-native";

class TopRequests extends Component{
  render(){
    return(
      <View>
        <Text>All requests</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#1A1919"
  }
};


export default TopRequests;
