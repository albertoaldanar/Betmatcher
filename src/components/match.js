import React, {Component} from "react";
import {View,Text, TouchableOpacity, Image, ScrollView} from "react-native";
import Header from "../reusable/header";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Matches from "../constants/matches";
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";

class Match extends Component{

  constructor(props){
    super(props);
    this.state = {index: 0}
  }

  handleIndexChange(index){
    this.setState({index})
  }

  renderMatches(){
    return Matches.map(m => {
      if(m.size !=0 && this.state.index == 0){
        return (
            <View style = {{marginTop: 10}}>
              <Card style = {styles.card}>
                <View style = {styles.spaceBetween}>
                  <Text style = {[styles.topItem, {fontStyle: "oblique"}]}>{m.league}</Text>
                  <Text style = {[styles.topItem, {color: "gold"}]}>{m.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
                </View>

                <View style = {[styles.spaceBetween, {margin: 10}]}>

                  <View style = {styles.spaceAround}>
                    <View style ={styles.space}>
                      <Text style = {styles.lay}>{m.local}</Text>
                      <Text style = {styles.user}>{m.user1}</Text>
                    </View>

                    <View style ={styles.space}>
                      <Text style = {styles.lay}> Draw </Text>
                    </View>

                    <View style ={styles.space}>
                      <Text style = {styles.lay}>{m.visit}</Text>
                      <Text style = {styles.user}>{m.user2}</Text>
                    </View>
                  </View>

                  <TouchableOpacity>
                    <FontAwesome style = {[styles.icon, {color: "#00B073"}]}>{Icons.comment}</FontAwesome>
                  </TouchableOpacity>
                </View>

                <View style = {styles.hourScore}>
                  <Text style = {styles.hour}>{m.time}</Text>
                </View>
              </Card>
            </View>
        );
      } else {
        return(
          <Text style = {{color:"#ffff"}}> Unmatched</Text>
        );
      }
    });
  }

  render(){
    return(
      <View style = {styles.container}>
        <Header/>
        <SegmentedControlTab
            values={['Match ', 'Unmatched', "Finished"]}
            tabsContainerStyle = {styles.segmentedController}
            tabTextStyle = {{color: "#00B073", fontWeight: "400", fontSize: 15}}
            tabStyle = {{borderColor: "#00B073", backgroundColor: "black"}}
            selectedIndex={this.state.index}
            activeTabStyle = {{backgroundColor: "#00B073"}}
            onTabPress={this.handleIndexChange.bind(this)}
        />
        <ScrollView>
          <View style = {styles.card}>
            {this.renderMatches()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "black",
    flex: 1
  },
  segmentedController: {
    borderBottomWidth: 0
  },
  topItem: {
    color: "gray",
    fontSize: 12,
    padding: 5
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  icon: {
    fontSize: 35,
    color: "gray",
    paddingTop: 20
  },
  spaceAround: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  lay: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 15,
    paddingRight: 10
  },
  user: {
    color: "#00B073",
    fontSize: 15,
    fontWeight: "600",
  },
  space: {
    flexDirection: "row",
    paddingBottom: 10
  },
  hourScore: {
    borderTopWidth: 1,
    borderTopColor: "gray",
    padding: 5
  },
  hour: {
    color:"gray",
    fontSize: 12,
    fontStyle:"oblique",
    padding: 5
  }
}

export default Match;
