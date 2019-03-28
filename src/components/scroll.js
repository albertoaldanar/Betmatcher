import React, {Component} from "react";
import {ScrollView, Text, View, Image, TouchableOpacity} from "react-native";
import MaterialTabs from "react-native-material-tabs";
import { Dropdown } from 'react-native-material-dropdown';

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

          <View style = {{marginTop: 50}}>
            <Dropdown
              label='Send this bet to:'
              baseColor ="gray"
              containerStyle = {{margin: 40}}
              data={data}
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
