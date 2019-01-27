import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Slider} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import SegmentedControlTab from 'react-native-segmented-control-tab';

class BetModal extends Component{

  constructor(props){
    super(props);
    this.state = {
      bet: 0,
      cUserCoins: 3460
    }
  }

  setCoins(value){
    this.setState({bet: value})
  }

  userList(list){
    return list.map((u, index) => {
      return(
        <TouchableOpacity key = {index} onPress = {this.props.confirm.bind(this, "ConfirmBet", u)}>
          <View style = {styles.tableStyle}>
            <Text style = {[styles.userTab , {color: "#00B073"}]}>{u.user}</Text>
            <Text style = {[styles.userTab, {color: "#DAA520"}]}>{u.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
            <FontAwesome style = {styles.userTab}>{Icons.chevronRight}</FontAwesome>
          </View>
        </TouchableOpacity>
      );
    })
  }

  renderSegmentedController(){
    const {choice, game, teamsNotSelected} = this.props;
    if(choice == 1 && game.sport == "Soccer"){
      return(
        <SegmentedControlTab
          values={this.props.teamsNotSelected}
          tabTextStyle = {{color: "#00B073", fontWeight: "400", fontSize: 15}}
          tabStyle = {{borderColor: "#00B073", backgroundColor: "white"}}
          selectedIndex={this.props.index}
          activeTabStyle = {{backgroundColor: "#00B073"}}
          onTabPress={this.props.segmentedController}
        />
      );
    } else if(choice == 1 && game.sport != "Soccer"){
        return null;
      }
  }

  betChoice(){
    if(this.props.choice == 1){
      if(this.props.index == 0){
        return(
            <View>
              <Text style = {{alignSelf: "center", marginBottom: 10}}>Users who bet for {this.props.teamsNotSelected[0]}</Text>
              {this.userList(this.props.list1)}
            </View>
        );
      } else {
          return(
            <View>
              <Text style = {{alignSelf: "center", marginBottom: 10}}>Users who bet for {this.props.teamsNotSelected[1]}</Text>
              {this.userList(this.props.list2)}
            </View>

          );
        }
    } else if(this.props.choice == 2) {
          return(
            <View style = {{ felx: 1, backgroundColor: "#ffff"}}>
              <Slider
                step= {1}
                maximumValue={this.state.cUserCoins}
                thumbTintColor = "#00B073"
                maximumTrackImage = "#00B073"
                onValueChange={this.setCoins.bind(this)}
                value={this.state.bet}
              />
              <Text style = {{alignSelf: "center"}}>{this.state.bet}</Text>
            </View>
          );
    }
  }

  render(){
    return(
      <View style = {{flex: 1, backgroundColor: "white"}}>

        <TouchableOpacity style = {styles.closeModal} onPress  = {this.props.visible}>
          <Text style = {{color: "#00B073", fontSize: 17}}>
            X
          </Text>
        </TouchableOpacity>
        <Text style = {styles.choose}>Team selected: {this.props.team}</Text>

        <View style = {{paddingBottom: 20}}>
          {this.renderSegmentedController()}
        </View>

        <ScrollView>
          {this.betChoice()}
        </ScrollView>
      </View>
    );
  }
}

const styles ={
  title: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
    marginTop: 5
  },
  choose: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
    marginBottom: 10,
    color: "#00B073"
  },
  closeModal: {
    marginTop: 20,
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 13
  },
  tables: {
    flexDirection: "row",
    padding: 10,
    justifyContent:"space-between",
    margin: 15
  },
  userTab: {
    padding: 20,
  },
  tableStyle: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    justifyContent: "space-between",
    marginBottom: 10
  }
};

export default BetModal;
