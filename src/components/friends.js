import React, {Component} from "react";
import {View, Text, Dimensions, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from 'react-native-check-box'
import Details from "../constants/eventsDetails";
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";
import AwesomeAlert from 'react-native-awesome-alerts';
import PieChart from 'react-native-pie-chart';

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
    const series = [9,2,1];
    const sliceColor = ['#00B073','#1FBED5','#DC143C'];

    return(
      <View style = {styles.container}>
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

const styles = {
  container: {
    backgroundColor: "black",
    flex: 1
  }

}


export default Friends;
