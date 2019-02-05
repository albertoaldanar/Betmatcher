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
            <FontAwesome style = {[styles.userTab, {color:"white"}]}>{Icons.chevronRight}</FontAwesome>
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
          tabStyle = {{borderColor: "#00B073", backgroundColor: "#161616"}}
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
              {this.userList(this.props.list1)}
            </View>
        );
      } else {
          return(
            <View>
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
      <View style = {{flex: 1, backgroundColor: "#161616"}}>

        <View style ={{marginBottom: 15}}>
          <View style = {styles.info}>
            <TouchableOpacity style = {styles.closeModal} onPress  = {this.props.visible}>
              <Text style = {{color: "#00B073", fontSize: 17}}>
                Close
              </Text>
            </TouchableOpacity>
            <Text style = {{color: "#DAA520", marginTop: 12, marginRight: 19}}> 50440 <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
          </View>
        </View>

        <View>
          {this.renderSegmentedController()}
        </View>

        <ScrollView>
          <View style = {{marginTop: 10}}>
            {this.betChoice()}
          </View>
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
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "center",
    marginBottom: 5,
    color: "#00B073"
  },
  closeModal: {
    marginTop: 12,
    marginLeft: 16,
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
    backgroundColor:"black",
    justifyContent: "space-between",
    marginBottom: 15,
    borderRadius: 5
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  teamsDescription: {
    alignSelf: "center",
    marginTop: 15
  },
  teamsText: {
    color: "#00B073",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 13,
  }
};

export default BetModal;
