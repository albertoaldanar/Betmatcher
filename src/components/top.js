import React, {Component} from "react";
import {View, Text, Image, FlatList, TouchableOpacity, RefreshControl, ScrollView} from "react-native";
import Games from "../constants/games";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {NavigationActions} from "react-navigation";
import Header from "../reusable/header";
import Menu from "../reusable/menu";
import SideMenu from "react-native-side-menu";
import GameCard from "../reusable/gameCard";
import Lgs from "../constants/leagues";

class Top extends Component{

  constructor(props){
    super(props);
    this.state = {isOpen: false}
  }

  onPressButton(){
    this.setState({isOpen: true});
  }

  render(){
    const {isOpen} = this.state;
    const menu = <Menu leagues ={Lgs}/>

    return(
      <SideMenu
        isOpen ={isOpen}
        menu = {menu}
      >
        <View style = {{flex: 1, backgroundColor: "black"}}>
          <Header title = "Weekley Top" showSidebar = {this.onPressButton.bind(this)}/>
          <ScrollView>
            <GameCard data= {Games} route = "Description" nav = {this.props.navigation.dispatch}/>
          </ScrollView>
        </View>
      </SideMenu>
    );
  }
}

const styles = {
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    paddingBottom: 5
  },
  league: {
    color: "#00B073",
    fontWeight: "bold",
    fontSize: 11
  },
  match: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  desc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
     marginBottom: 12
  },
  hour: {
    fontWeight: "300",
    fontSize: 11,
    color: "gray",
    fontStyle: "oblique"
  },
  chevron: {
    color: "#00B073",
    fontSize: 20,
    marginTop: 20,
    fontWeight: "400"
  }
}

export default Top;
