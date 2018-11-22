import React, {Component} from "react";
import {View, Text, Image, FlatList, TouchableOpacity, RefreshControl} from "react-native";
import Games from "../constants/games";
import FontAwesome, {Icons} from "react-native-fontawesome";

class Top extends Component{

  constructor(props){
    super(props);
    this.state = {refreshing: false}
  }

  changeState(){
    this.setState({refreshing: !this.state.refreshing})
  }
  render(){
    return(
      <View style = {{flex: 1, backgroundColor: "#1A1919"}}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.changeState.bind(this)}
            />
          }
          style={styles.list}
          data={Games}
          renderItem={({item}) =>
          <TouchableOpacity>
            <View style = {styles.card}>
                <View>
                  <FontAwesome style ={{color: "white", fontSize: 20}}>{Icons.calendar}</FontAwesome>
                </View>

                <View style = {styles.teams}>
                  <View>
                    <Text style = {styles.textTeam}>{item.local}</Text>
                    <View style = {styles.teamColors}></View>
                  </View>

                  <Text style = {styles.textVs}> VS </Text>

                  <View>
                    <Text style = {styles.textTeam}>{item.visit}</Text>
                    <View style = {{paddingTop:4, backgroundColor: "red"}}></View>
                  </View>
                </View>

                <View>
                  <FontAwesome style ={{color: "white"}}>{Icons.chevronRight}</FontAwesome>
                </View>

            </View>
          </TouchableOpacity>
          }
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}


const styles = {
  card: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    padding: 40,
    justifyContent: "space-between"
  },
  teams: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textTeam: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    paddingBottom: 3
  },
  textVs:{
    color: "white",
    fontSize: 15,
    paddingRight: 10,
    paddingLeft: 10
  },
  teamColors: {
    paddingTop: 4,
    backgroundColor: "blue"
  }

}

export default Top;
