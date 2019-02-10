import React, {Component} from "react";
import {View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from 'react-native-check-box'
import Details from "../constants/eventsDetails";
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'

class Friends extends Component{
  constructor(props){
    super(props);
    this.state = {
      showLightBox: true,
      users: 14
    }

  }

  render(){

    const data = [ 50, 10, 40, 95, 85, 91, 35, 53, 24, 50, ];
    const data2 = [ 40, 80, 91, 86, 99, 35, 53, 54, 110, ];
    const contentInset = { top: 20, bottom: 20, left: 10 }
    return(
      <View>
        <View style={styles.chart}>
                <YAxis
                    data={ data }
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}$` }
                />
                    <LineChart
                        style={{ flex: 1}}
                        data={ data }
                        svg={{ stroke: '#00B073' }}
                        contentInset={ contentInset }
                    >
                        <Grid/>
                    </LineChart>

                  <LineChart
                      style={{ flex: 1, marginLeft: -300}}
                      data={ data2 }
                      numberOfTicks={ 0 }
                      svg={{ stroke: 'blue' }}
                      contentInset={ contentInset }
                  >
                      <Grid/>
                  </LineChart>

                  <LineChart
                      style={{ flex: 1, marginLeft: -500}}
                      data={ data2 }
                      numberOfTicks={ 0 }
                      svg={{ stroke: 'gray' }}
                      contentInset={ contentInset }
                  >
                      <Grid/>
                  </LineChart>
            </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "black",
    flex: 1
  },
  chart: {
    height: 200,
    width: Dimensions.get("window").width,
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#161616",
    padding: 25,
    borderRadius: 5,
    margin: 20,
    elevation: 5,
    shdowColor: "gray"
  }

}


export default Friends;
