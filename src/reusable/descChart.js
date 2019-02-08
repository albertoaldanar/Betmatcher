import React, {Component} from "react";
import {View, Text, TouchableOpacity, Dimensions} from "react-native";
import PieChart from 'react-native-pie-chart';
import LinearGradient from "react-native-linear-gradient";

class DescChart extends Component {
  render(){

    const series = [9,2,1];
    const sliceColor = ['#00B073','#1FBED5','#DC143C'];

    return(
      <View>
          <PieChart
            chart_wh={Dimensions.get('window').width * 0.50}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.95}
            coverFill={'black'}
            doughnut= {true}
            style ={{
              alignSelf: "center",
              marginTop: 7,
              shadowColor: '#696969',
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 3,
              shadowRadius: 6,
              elevation: 4,
            }}
          />
      </View>
    );
  }
}

export default DescChart
