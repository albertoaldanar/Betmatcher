import React, {Component} from "react";
import {View, Text, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import * as shape from "d3-shape";
import PureChart from 'react-native-pure-chart';
import LinearGradient from "react-native-linear-gradient";
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'

class DescChart extends Component {

  drawChart(data, content){
    if(this.props.game.sport =="Soccer"){
      return(
        <View style= {{height: 200, width: 200, flexDirection:"row"}}>
          <YAxis
            data={ data  }
            contentInset={ content }
            svg={{
              fill: 'grey',
              fontSize: 10,
              marginLeft: 5
            }}
            numberOfTicks={ 10 }
            formatLabel={ value => `${value}$` }
          />
          <Text style = {styles.title}>Draw</Text>
          <LineChart
            style={{ flex: 1, marginLeft: 16, marginRight: 16 }}
            data={ data }
            svg={{ stroke: 'gray' }}
            contentInset={ content }
          >
            <Grid/>
          </LineChart>
        </View>
      );
    } else return null;
  }

  render(){
    const data = [ 50, 10, 40, 95, 85, 91, 35, 53, 24, 50, ];
    const data2 = [ 40, 80, 91, 86, 99, 35, 53, 54, 110, ];
    const data3 = [ 10, 90, 112, 91, 55, 99, 35, 53, 11, 153, ];
    const contentInset = { top: 20, bottom: 20, left: 10 }


    return(
      <ScrollView horizontal>
        <View style={styles.container}>
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

                  <Text style = {styles.title}>{this.props.game.local}</Text>
                    <LineChart
                        style={{ flex: 1, marginLeft: 16, marginRight: 20}}
                        data={ data }
                        svg={{ stroke: '#00B073' }}
                        contentInset={ contentInset }
                    >
                        <Grid/>
                    </LineChart>

                  {this.drawChart(data3, contentInset)}

                  <YAxis
                    data={ data2  }
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                        marginLeft: 5
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}$` }
                />
                  <Text style = {styles.title}>{this.props.game.visit}</Text>
                  <LineChart
                      style={{ flex: 1, marginLeft: 16 }}
                      data={ data2 }
                      svg={{ stroke: 'blue' }}
                      contentInset={ contentInset }
                  >
                      <Grid/>
                  </LineChart>
            </View>
        </ScrollView>
    );
  }
}
const styles ={
  container: {
    height: 200,
    width: Dimensions.get("window").width +230,
    flexDirection: "row",
  },
  title: {
    color:"#ffff",
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 10,
    marginRight: -35
  }
}
export default DescChart
