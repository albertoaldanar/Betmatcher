import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import GameCard from "../reusable/gameCard";
import {NavigationActions} from "react-navigation";
import Url from "../constants/url";

class FilteredEvents extends Component{

  constructor(props){
    super(props);
    this.state = {
      events: [],
      hello: "",
      name: "alberto"
    }
  }

  componentDidMount(){

    let league = this.props.navigation.state.params.par;
    this._isMounted = true;

    return fetch(`http://${Url}:8000/events?league=${league}`, {
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
    const {par} = this.props.navigation.state.params; 
    return(
      <View style = {{flex: 1, backgroundColor: "black"}}>
          {par.length > 0  ?
            <ScrollView>
              <GameCard data= {events} route = "Description" nav = {this.props.navigation.dispatch}/>
            </ScrollView> : 

            <Text style = {{color: "#ffff", fontWeight: "300", fontSize: 18, marginTop: 100}}> No current events for this league</Text>
          }
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



