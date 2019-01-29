import React, {Component} from "react";
import {Text, View, TouchableOpacity, ScrollView} from "react-native";
import Requests from "../constants/requests";
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";

class TopRequests extends Component{

  topRequests(){
    return Requests.map((r, index) => {
      return(
        <TouchableOpacity key = {index} >
          <Card>
            <View style = {{flexDirection:"row", paddingLeft: 5, marginBottom: 7, marginTop: 7}}>
              <Text style = {styles.desc}>{r.local}</Text>
              <Text style = {[styles.desc, {fontStyle :"oblique", fontWeight: "300"}]}>VS.</Text>
              <Text style = {styles.desc}>{r.visit}</Text>
            </View>

            <View style = {{flexDirection: "row", padding: 10, paddingBottom: 0, justifyContent: "space-between"}}>
              <Text style = {styles.user}>{r.user}</Text>
              <Text style = {[styles.game, {paddingRight: 10 , fontWeight: "bold", color: "#DAA520", fontSize: 14}]}>{r.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
              <Text style = {[styles.user, {paddingRight: 10}]}>{r.lay}</Text>
              <FontAwesome style ={styles.chevron}>{Icons.chevronRight}</FontAwesome>
            </View>
          </Card>
        </TouchableOpacity>
      );
    })
  }

  render(){
    return(
      <View style = {styles.container}>
        <ScrollView>
          {this.topRequests()}
          {this.topRequests()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  game: {
    color:"#ffff",
    fontSize: 12,
    fontWeight: "600",
    paddingRight: 5,
  },
  user: {
    color:"#00B073",
    fontSize: 13,
    fontWeight: "600",
    fontStyle: "oblique",
    paddingRight: 15
  },
  chevron: {
    color: "#00B073",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "400"
  },
  desc: {
    color:"#ffff",
    fontSize: 14,
    fontWeight: "700",
    paddingRight: 5
  },
};


export default TopRequests;
