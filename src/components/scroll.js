import React, {Component} from "react";
import {ScrollView, Text, View, Image, TouchableOpacity} from "react-native";
import MaterialTabs from "react-native-material-tabs"

class Scroll extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 0
    }
  }

  render(){
    return(
        <View style = {{flex: 1, backgroundColor: "#161616"}}>
          <View style = {{marginTop: 40}}>
            <MaterialTabs
              items={['Match', "Unmatched", "Finished"]}
              indicatorColor ="#00B073"
              activeTextColor ="white"
              inactiveTextColor ="gray"
              barColor ="transparent"
              selectedIndex={this.state.selectedTab}
              onChange={index => this.setState({ selectedTab: index })}
            />
          </View>
        </View>
    );
  }
}

const styles = {
    image: {
      width: 45,
      height: 45,
      marginRight: 15,
      marginLeft: 6,
      marginBottom:10,
      alignSelf:"center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
}

export default Scroll;
