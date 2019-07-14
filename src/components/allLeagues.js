import React, {Component} from "react";
import {View, Text, Image, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {NavigationActions} from "react-navigation";

class AllLeagues extends Component{

  constructor(props){
    supre(props);
    this.state = {leagueSelected: ""}
  }

  filteredEvents(league){
    this.setState({league: league});

    const navigateAction = NavigationActions.navigate({
      routeName: "FilteredEvents",
      params: {
        league: league
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  renderLeagues(){
    const {par} = this.props.navigation.state.params;

    return par.map((item) => {
       return(
            <TouchableOpacity onPress = {this.filteredEvents.bind(this, item.name)}>
              <Image
                style={styles.image}
                source ={{uri: item.img}}
              />

              <View style = {styles.league}>
                <Text style= {{color: "#00B073", position: "absolute", lef: 5, top: 5}}>{item.name}</Text>
              </View>
            </TouchableOpacity>
        );
    })
  }

  render(){
    return(
      <ScrollView style = {{flex: 1, backgroundColor: "#161616"}}>
        {this.renderLeagues()}
      </ScrollView>
    );
  }
}

const styles = {
  image: {
    width: Dimensions.get("window").width,
    height: 150,
    margin: 10,
    opacity: 0.7
  },
  league: {
    backgroundColor: "#ffff",
    padding: 5, borderRadius: 5,
    position: "absolute", left: 10,
    top: 10, width: 10, height: 10
  }
}
export default AllLeagues;
