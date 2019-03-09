import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Slider, Image, TextInput} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SwipeCards from 'react-native-swipe-cards';

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

  userList(list, quote){
    return list.map((u, index) => {

      const bet = quote > 0 ? Math.round(u.bet - ((quote / 100) * u.bet)) : u.bet
      return(
        <TouchableOpacity  key = {index} onPress = {this.props.confirm.bind(this, "ConfirmBet", u, quote, bet)}>
          <View style = {styles.tableStyle}>
            <View style = {{flexDirection: "row"}}>
              <Image
                source = {{uri: u.image}}
                style = {styles.image}
              />
              <View style = {{marginTop: 5}}>
                <Text style = {{color: "#DAA520", paddingBottom: 9, fontSize: 16}}> {bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
                <Text style = {{color: "#00B073", paddingBottom: 9, fontSize: 15}}> {u.user}</Text>
                <Text style = {{color: "white", fontSize: 15, borderColor:"white", borderRadius: 5, borderWidth:0.5, textAlign:"center"}}> {quote} %</Text>
              </View>
            </View>
            <FontAwesome style = {{color:"gray", marginTop: 27, marginRight: 5}}>{Icons.chevronRight}</FontAwesome>
          </View>

        </TouchableOpacity>
      );
    })
  }

  gameType(game, position){
    const {teamsNotSelected} = this.props;
    var colorA = teamsNotSelected[0].quotes[position] > 0 ? "#00B073" : "red";
    var colorB = teamsNotSelected[1].quotes[position] > 0 ? "#00B073" : "red";

   if(game.sport == "Soccer"){
      return(
        <View style = {{marginTop: 45}}>
          <View style = {{flexDirection:"row", justifyContent:"space-between", borderWidth: 0.4, borderColor: "gray"}}>
            <Text style = {{color: "#ffff", fontWeight: "400", fontStyle:"oblique", marginLeft: 5}}>IF YOU MATCH</Text>
            <Text style = {{color: "#ffff", fontWeight: "400", fontStyle:"oblique"}}>QUOTES</Text>
            <Text style = {{color: "#ffff", fontWeight: "400", fontStyle:"oblique", marginRight: 5}}>YOU CAN WIN</Text>
          </View>


        </View>
      );
    } else {
      return(
        <View style = {{marginTop: 45}}>
          <Text style = {{color: "#ffff"}}>If match against {teamsNotSelected[0].name}</Text>
          <Text style = {{color: "#ffff"}}>If match against {teamsNotSelected[0].quotes} %</Text>
        </View>
      );
    }
  }

  renderSegmentedController(){
    const { choice, game, teamsNotSelected } = this.props;
    var values = [teamsNotSelected[0].name, teamsNotSelected[1].name];

    if(choice == 1 && game.sport == "Soccer"){
      return(
        <SegmentedControlTab
          values={values}
          tabTextStyle = {{color: "#00B073", fontWeight: "400", fontSize: 15}}
          tabStyle = {{borderColor: "#00B073", backgroundColor: "black"}}
          selectedIndex={this.props.index}
          activeTabStyle = {{backgroundColor: "#00B073"}}
          onTabPress= {this.props.segmentedController}
        />
      );
    } else if(choice == 1 && game.sport != "Soccer"){ return null };
  }

  betChoice(){
    const {choice, game, teamsNotSelected, team} = this.props;
    var position = this.props.team.position;
                //  -- MODAL FOR USER MATCH -- //

    if(this.props.choice == 1){
      if(this.props.index == 0){
          return(
              <ScrollView>
                {this.userList(this.props.list1, teamsNotSelected[0].quotes[team.position] || teamsNotSelected[0].quotes)}
              </ScrollView>
          );
      } else {
          return(
            <ScrollView>
              {this.userList(this.props.list2, teamsNotSelected[1].quotes[team.position])}
            </ScrollView>

          );
        }

                //  -- MODAL FOR LAY BET -- //

    } else if(this.props.choice == 2) {
          return(
            <View>
              <View style = {{backgroundColor: "#161616", padding: 20}}>
                <View style = {{flexDirection:"row", alignSelf: "center", marginTop: 15, marginBottom:20}}>
                  <Text style = {styles.layBet}>Set your bet for: </Text>
                  <Text style = {[styles.layBet, {fontWeight:"bold", marginLeft: 5, color: "#00B073"}]}>{this.props.team.name}</Text>
                </View>

                <TextInput
                  placeholder = "Amount"
                  style = {{color: "white", height: 40, textAlign: "center", borderColor:"gray", borderWidth: 0.5, marginBottom: 15}}
                />
                <Slider
                  step= {10}
                  style ={{marginLeft: 30, marginRight: 30}}
                  maximumValue={this.state.cUserCoins}
                  thumbTintColor = "#00B073"
                  minimumTrackTintColor = "#00B073"
                  onValueChange={this.setCoins.bind(this)}
                  value={this.state.bet}
                  thumbStyle ={{color: "#00B073"}}
                />

                <Text style = {{alignSelf: "center", color: "#DAA520", fontSize: 15, marginTop: 5}}> {this.state.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
              </View>
              {this.gameType(game, position)}
            </View>
          );
    }
  }

  render(){
      let button;

      if(this.props.choice == 2){
        button =  <TouchableOpacity style = {styles.buttonContainer}>
                    <Text style = {styles.layBet}> Place bet</Text>
                  </TouchableOpacity>
      }

    return(
      <View style = {{flex: 1, backgroundColor: "black"}}>

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

        {this.betChoice()}

        {button}
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
    padding: 50,
  },
  tableStyle: {
    flexDirection:"row",
    justifyContent: "space-between",
    marginBottom: 3,
    padding: 10,
    backgroundColor: "#161616"
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
  },
  country: {
    color: "#ffff",
    fontWeight: "300",
    fontSize: 13,
    fontStyle: "oblique",
    paddingBottom: 9
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 25,
    marginTop: 12,
    marginLeft: 5
  },
  layBet: {
    alignSelf: "center",
    color: "white",
    fontWeight:"400",
    fontSize: 18
  },
  buttonContainer: {
    backgroundColor: "#00B073",
    padding: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  descriptionCard: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: "gray",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#161616"
  }
};

export default BetModal;
