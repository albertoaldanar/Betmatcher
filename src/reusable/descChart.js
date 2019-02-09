import React, {Component} from "react";
import {View, Text, TouchableOpacity, Dimensions} from "react-native";
import * as shape from "d3-shape";
import { BarChart, Grid, AreaChart } from 'react-native-svg-charts';

import LinearGradient from "react-native-linear-gradient";

class DescChart extends Component {
  render(){

    const fill = "#00B073"
    const data   = [ 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80 ]

    return(
      <View>
        <BarChart
          style={{ height: 200 }}
          data={ data }
          svg={{fill }}
          contentInset={{ top: 30, bottom: 30 }}
        >
          <Grid/>
        </BarChart>
      </View>
    );
  }
}
const styles ={
  title: {
    color:"#ffff",
    fontSize: 15,
    fontWeight: "700",
    margin: 5,
    color: "#00B073"
  }
}
export default DescChart
