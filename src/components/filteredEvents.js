import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import GameCard from "../reusable/gameCard";
import {NavigationActions} from "react-navigation";

class FilteredEvents extends Component{

  constructor(props){
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount(){

    let league = this.props.navigation.state.params.league;
    this._isMounted = true;

    return fetch(`http://localhost:8000/events?league=${league}`, {
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
      }
    })
    .then(res => res.json())
    .then(jsonRes => {
        if(this._isMounted && jsonRes.results){
          this.setState({events: jsonRes.results})
        }
    })
    .catch(error => console.log(error));
  }

  render(){
    const {events} = this.state;
    console.log(this.state.events)

    return(
      <View style = {{flex: 1, backgroundColor: "black"}}>
          <ScrollView>
            <GameCard data= {events} route = "Description" nav = {this.props.navigation.dispatch}/>
          </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "black"
  }
}
export default FilteredEvents;



