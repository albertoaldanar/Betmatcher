import React, {Component} from "react";
import {View, Text, Image, TextInput, TouchableOpacity, Dimensions} from "react-native";
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import Header from "../reusable/header";
import User from "../constants/user";
import PieChart from 'react-native-pie-chart';

class Profile extends Component{

  render(){
    const stats = [1, 5, 4];

    return(
        <View style = {{flex:1, backgroundColor: "#1A1919", alignItems: "center"}}>
          <Header/>
          <Image style={styles.imageStyle} source={{uri: User.image}}/>

          <PieChart
            chart_wh={100}
            series={stats}
            sliceColor={["#00FA9A", "#87CEEB", "#DC143C"]}
            doughnut={true}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
        </View>
    );
  }
}

const styles = {
  imageStyle:{
    marginTop: 10,
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    alignSelf: "center"
  },
}

export default Profile;
