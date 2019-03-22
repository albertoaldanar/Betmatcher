import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import FusionCharts from "react-native-fusioncharts";
import PureChart from 'react-native-pure-chart';

export default class Try extends Component {
   constructor(props) {
      super(props);

      this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      ios: require("./assets/fusioncharts.html")
      });
   }

   render() {
  let sampleData = [
    {
      seriesName: 'series1',
      data: [
        {x: '2018-02-01', y: 30},
        {x: '2018-02-02', y: 200},
        {x: '2018-02-03', y: 170},
        {x: '2018-02-04', y: 250},
        {x: '2018-02-05', y: 10}
      ],
      color: '#297AB1'
    },
    {
      seriesName: 'series2',
      data: [
        {x: '2018-02-01', y: 20},
        {x: '2018-02-02', y: 100},
        {x: '2018-02-03', y: 140},
        {x: '2018-02-04', y: 550},
        {x: '2018-02-05', y: 40}
      ],
      color: 'yellow'
    },
    {
      seriesName: 'series2',
      data: [
        {x: '2018-02-01', y: 10},
        {x: '2018-02-02', y: 120},
        {x: '2018-02-03', y: 160},
        {x: '2018-02-04', y: 490},
        {x: '2018-02-05', y: 20}
      ],
      color: 'red'
    }
  ]

      return (
        <PureChart data={sampleData} type={'line'} width={200} height={200} backgroundColor="transparent" linesColor = "white"/>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 10
   },
   heading: {
      fontSize: 20,
      textAlign: "center",
      marginBottom: 10
   },
   chartContainer: {
      height: 200
   }
});

