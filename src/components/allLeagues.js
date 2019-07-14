import React, {Component} from "react";
import {View, Text, Image, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {NavigationActions} from "react-navigation";

class AllLeagues extends Component{

  filteredEvents(league){
    const navigateAction = NavigationActions.navigate({
      routeName: "FilteredEvents",
      params: {
        par: league
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
              <Text style= {styles.league}>{item.name} <FontAwesome>{Icons.chevronRight}</FontAwesome></Text>
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
    marginBottom: 10,
    opacity: 0.4, borderRadius: 10
  },
  league: {
    color: "white",
    position: "absolute", right: 10,
    bottom: 10, height: 20, borderRadius: 5,
    marginTop: 5,
  }
}
export default AllLeagues;
