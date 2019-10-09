import React, {Component} from "react";
import {View, Text, Image, FlatList, TouchableOpacity, RefreshControl, ScrollView, ActivityIndicator} from "react-native";
import Games from "../constants/games";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {NavigationActions, withNavigationFocus, NavigationEvents} from "react-navigation";
import Header from "../reusable/header";
import Menu from "../reusable/menu";
import SideMenu from "react-native-side-menu";
import GameCard from "../reusable/gameCard";
import Lgs from "../constants/leagues";
import Url from "../constants/url";
import Card from "../reusable/card";
import Moment from 'moment';

class Top extends Component{

  constructor(props){
    super(props);
    this.state = {isOpen: false, events: {}, sports: [], refreshing: false}
  }

  componentWillMount(){
    return this.callEvents()
  }

  // componentWillFocus(){
  //   return this.callEvents()
  // }

  // componentWillBlur(){
  //   return this.callEvents()
  // }

  // componentDidFocus(){
  //   return this.callEvents()
  // }

  // componentDidBlur(){
  //   return this.callEvents()
  // }

  sendToDescription(event){
    const navigateAction = NavigationActions.navigate({
      routeName: "Description",
      params: {
        par: event
      }
    })
    this.props.navigation.dispatch(navigateAction);
  }

  renderGameInfo(){
    // var topEvents = this.props.data
    if (this.state.events.length > 0){
      return this.state.events.map((d, index) => {
        return(
          <TouchableOpacity key = {index} onPress = {this.sendToDescription.bind(this, d)}>
            <Card>
                <View style = {styles.desc}>
                  <Text style = {styles.league}>{d.data.league.name}</Text>
                  <Text style = {styles.hour}>{Moment(d.data.date).format("MMM Do YY")}</Text>
                </View>

                <View style = {styles.match}>
                  <Image source = {{uri: d.data.sport.img}} style = {{width: 45, height: 45, marginRight: 15}}/>

                  <View style = {{paddingRight: 90}}>
                    <Text style = {styles.text}>{d.local.name}</Text>
                    <Text style = {[styles.text, {fontSize: 9, fontStyle: "oblique", fontWeight: "400"}]}>VS.</Text>
                    <Text style = {styles.text}>{d.visit.name}</Text>
                  </View>

                  <FontAwesome style= {styles.chevron}>{Icons.chevronRight}</FontAwesome>
                </View>
            </Card>
          </TouchableOpacity>
        );
      })
    }else {
      return(
        <View style = {{marginTop: 300, alignSelf: "center"}}>
          <ActivityIndicator size="large" color="white"/>
        </View>
      );
    }
  }

  callEvents(){
    return fetch(`http://${Url}:8000/top_events`)
        .then(res => res.json())
          .then(response => {
            this.setState({
                events: response["top_events"],
                sports: response["sports"]
            })
          }).then(this.setState({refreshing: false}))
  }

  onPressButton(){
    this.setState({isOpen: true});
  }

  render(){
    console.log(this.state.events)
    const {isOpen, events, sports} = this.state;

    return(
        <View style = {{flex: 1, backgroundColor: "black"}}>

          <NavigationEvents
            onDidFocus={payload => this.callEvents()}
          />

          <Header title = "Weekley Top" hasSidebar = {false}/>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.callEvents.bind(this)}
              />
            }
          >
            {this.renderGameInfo()}
          </ScrollView>
        </View>
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
