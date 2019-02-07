import React, {Component} from "react";
import {View, Text, Dimensions, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from 'react-native-check-box'
import Details from "../constants/eventsDetails";
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";
import AwesomeAlert from 'react-native-awesome-alerts';
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class Friends extends Component{
  constructor(props){
    super(props);
    this.state = {
      showLightBox: true,
      users: 14
    }
  }

  changeState(){
    this.setState({showLightBox: !this.state.showLightBox})
  }

  render(){
    const data  = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

    return(
      <View style = {styles.container}>
        <AreaChart
                style={{ height: 200 }}
                data={ data }
                contentInset={{ top: 30, bottom: 30 }}
                curve={ shape.curveNatural }
                svg={{ fill: '#00B073' }}
            >
                <Grid/>
            </AreaChart>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "black",
    flex: 1
  }

}


export default Friends;
