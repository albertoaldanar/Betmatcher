import React, {Component} from "react";
import {View, Text, Dimensions} from  "react-native";
import {Pages} from "react-native-pages";
import {
  LineChart,
  BarChart,
  ContributionGraph
} from 'react-native-chart-kit'

class ProfileCharts extends Component{
  render(){
    return(
      <View>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [{
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }]
            }}
            width={100}
            height={280}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: '#161616',
              backgroundGradientTo: '#161616',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginTop: 30
            }}
          />

          <BarChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [{
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }]
            }}
            width={100 }
            height={280}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: '#161616',
              backgroundGradientTo: '#161616',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginTop: 30
            }}
          />
        </View>
    );
  }
}

export default ProfileCharts;
