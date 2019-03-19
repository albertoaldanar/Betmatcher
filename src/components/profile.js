import React, {Component} from "react";
import {View, Text, Image, TextInput, TouchableOpacity, Dimensions, StatusBar, ScrollView} from "react-native";
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import Header from "../reusable/header";
import User from "../constants/user";
import FontAwesome, {Icons} from "react-native-fontawesome";
import LinearGradient from "react-native-linear-gradient";
import ProfileCharts from "../reusable/profileCharts";
import {
  LineChart,
  BarChart,
  ProgressChart,
  PieChart,
  ContributionGraph
} from 'react-native-chart-kit'
import {Pages} from "react-native-pages";


class Profile extends Component{

  renderFriends(){
    const navigateAction = NavigationActions.navigate({
      routeName: "Friends"
    })
    this.props.navigation.dispatch(navigateAction);
  }

  render(){

    const data = [
      { name: 'Won', number: 3, color: '#00B073', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Draw', number: 1, color: '#DCDCDC', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Lost', number: 1, color: '#DC143C', legendFontColor: '#7F7F7F', legendFontSize: 15 }
    ];
    const data2 = [0.4, 0.6, 0.8]
    const chart_wh = 250
    const series = [9,2,1]
    const sliceColor = ['#00B073','#1FBED5','#DC143C']

    return(
      <View style = {{flex: 1, backgroundColor: "black"}}>

        <StatusBar hidden = {true}/>
          <View style = {{backgroundColor: "#00B073"}}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "#161616", "gray"]}>
            <View style = {styles.bar}>
                <TouchableOpacity>
                  <FontAwesome style = {{color: "#ffff", fontSize: 20, marginLeft: 20}}>{Icons.cogs}</FontAwesome>
                </TouchableOpacity>

                <TouchableOpacity onPress = {this.renderFriends.bind(this)}>
                  <FontAwesome style = {{color: "#ffff", fontSize: 20,  marginRight: 20}}>{Icons.users}</FontAwesome>
                </TouchableOpacity>
            </View>

            <View style = {{paddingBottom: 10}}>

              <View style = {{flexDirection:"row", margin: 20}}>
                <Image style={styles.imageStyle} source={{uri: User.image}}/>

                <View>
                  <Text style = {[styles.username, {alignSelf:"flex-start", fontWeight:"300"}]}> {User.userName} </Text>
                  <Text style = {[styles.username, {fontSize: 14, fontWeight:"300", marginBottom: 10, marginTop: 5, color: "gray", alignSelf:"flex-start", marginLeft:5}]}>
                    <FontAwesome>{Icons.mapMarker}</FontAwesome> {User.country}
                  </Text>
                </View>
              </View>

          <View style = {styles.stats}>
            <View>
              <Text style = {styles.count}>{User.won}</Text>
              <Text style = {styles.text}> Won </Text>
            </View>

            <View>
              <Text style = {styles.count}>{User.draw}</Text>
              <Text style = {styles.text}> Draw </Text>
            </View>

            <View>
              <Text style = {styles.count}>{User.lost}</Text>
              <Text style = {styles.text}> Lost </Text>
            </View>

          </View>
            </View>
          </LinearGradient>
        </View>

            <View style = {{justifyContent:"space-between", flexDirection:"row", marginBottom: 25, marginTop:20}}>
                <View style = {{marginLeft: 16}}>
                  <Text style = {[styles.username, {fontSize: 13, fontWeight:"300", color: "gray", marginBottom: 5}]}>
                    Amount
                  </Text>
                  <Text style = {[styles.username, {fontSize: 14, fontWeight:"300", color: "#DAA520", marginBottom: 7, marginTop: 3}]}>
                    {User.coins}  <FontAwesome style = {{color: "#DAA520"}}>{Icons.bitcoin}</FontAwesome>
                  </Text>
                </View>

                <View style = {{marginRight: 16}}>
                  <Text style = {[styles.username, {fontSize: 13, fontWeight:"300", color: "gray", marginBottom: 5}]}>
                    World ranking
                  </Text>
                  <Text style = {[styles.username, {fontSize: 14, fontWeight:"300", color: "#DAA520", marginBottom: 7, marginTop: 3}]}>
                    12892 º
                  </Text>
                </View>


                <View style = {{marginRight: 16}}>
                  <Text style = {[styles.username, {fontSize: 13, fontWeight:"300", color: "gray", marginBottom: 5}]}>
                    Efficiency
                  </Text>
                  <Text style = {[styles.username, {fontSize: 14, fontWeight:"300", color: "#DAA520", marginBottom: 7, marginTop: 3}]}>
                    67.7 %
                  </Text>
                </View>
              </View>

          <Pages>
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
              width={Dimensions.get('window').width} // from react-native
              height={250}
              chartConfig={{
                backgroundColor: '#161616',
                decimalPlaces: 0, // optional, defaults to 2dp
                 color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
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
              width={Dimensions.get('window').width} // from react-native
              height={250}
              chartConfig={{
                backgroundColor: 'transparent',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />

            <PieChart
              data={data}
              width={Dimensions.get("window").width}
              height={220}
              chartConfig={{
                backgroundColor: 'transparent',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,

                elevation: 12,
              }}
              accessor="number"
              backgroundColor="transparent"
              paddingLeft="15"
            />

          </Pages>
      </View>
    );
  }
}

const styles = {
  imageStyle:{
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    marginRight: 10
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 14,
    paddingBottom: 10,
    marginBottom: 11
  },
  text: {
    fontSize: 13,
    color: "gray",
    fontWeight: "500",
    alignSelf: "center"
  },
  icon: {
    paddingBottom: 10,
    fontSize: 30,
    marginLeft: 5
  },
  count: {
    color: "#00B073",
    fontWeight: "400",
    fontSize: 17,
    marginBottom: 8,
    marginLeft: 15,
    fontStyle: "oblique"
  },
  username: {
    color: "white",
    fontSize: 19,
    fontWeight: "500",
    alignSelf: "center",
    marginTop: 8,
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  total: {
    color: "black",
    fontWeight: "400",
    fontSize: 20,
    alignSelf: "center",
    fontStyle: "oblique",
    backgroundColor: "#DCDCDC",
    padding: 5,
  },
  percent: {
    marginTop: -175,
    alignSelf: "center"
  },
  number: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    paddingBottom: 12
  }
}

export default Profile;
