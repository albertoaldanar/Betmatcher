import React, {Component} from "react";
import {View,Text, TouchableOpacity} from "react-native";
import Header from "../reusable/header";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Matches from "../constants/matches";

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
      return (
        <TouchableOpacity>
          <Text style = {{color: "#ffff"}}>{m.local}</Text>
        </TouchableOpacity>
      );
    });
  }

  render(){
    return(
      <View style = {styles.container}>
        <Header/>
        <SegmentedControlTab
            values={['Match ', 'Wating', "Finished"]}
            tabsContainerStyle = {styles.segmentedController}
            tabTextStyle = {{color: "#7DDECC", fontWeight: "400", fontSize: 15}}
            tabStyle = {{borderColor: "#7DDECC", backgroundColor: "#1A1919"}}
            selectedIndex={this.state.index}
            activeTabStyle = {{backgroundColor: "#7DDECC"}}
            onTabPress={this.handleIndexChange.bind(this)}
            />
        {this.renderMatches()}
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#1A1919",
    flex: 1
  },
  segmentedController: {
    borderBottomWidth: 0
  },
  button: {

  }
}

export default Match;
