import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Slider, Image, TextInput} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SwipeCards from 'react-native-swipe-cards';
import Carousell from "./carousel";
import LinearGradient from "react-native-linear-gradient";

class BetModal extends Component{

  constructor(props){
    super(props);
    this.state = {
      bet: 250,
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
                <Text style = {{color: "white", fontSize: 15, borderColor:"white"}}> {quote} %</Text>
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
    const quoteA  = teamsNotSelected[0].quotes[position] > 0  ?  <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome> :  <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>
    const quoteB  = teamsNotSelected[1].quotes[position] > 0  ?  <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome> :  <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>

   if(game.sport == "Soccer"){
      return(
          <View style = {{marginTop: 45}}>
            <View style = {{flexDirection:"row", justifyContent:"space-between", padding: 10, paddingBottom: 20, borderBottomWidth: 0.4, borderBottomColor: "gray", borderTopWidth: 0.4, borderTopColor: "gray"}}>
              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginLeft: 5, borderBottomWidth: 1, borderBottomColor: "gray"}}>MATCH</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, marginTop: 22, fontSize: 15, padding: 8 }}>{teamsNotSelected[0].name} </Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, marginTop: 22, fontSize: 15, padding: 8 }}>{teamsNotSelected[1].name} </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400"}}>QUOTES</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>{teamsNotSelected[0].quotes[position]} %  {quoteA}</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8}}>{teamsNotSelected[1].quotes[position]} %  {quoteB}</Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5}}>YOU CAN WIN</Text>
                <Text style = {{color: "#DAA520", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>{this.state.bet} <FontAwesome> {Icons.bitcoin} </FontAwesome> </Text>
                <Text style = {{color: "#DAA520", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>{this.state.bet} <FontAwesome> {Icons.bitcoin} </FontAwesome> </Text>
              </View>

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
          tabStyle = {{borderColor: "#00B073", backgroundColor: "transparent"}}
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
              <View style = {{padding: 20, paddingTop: 10}}>
                <View style = {{flexDirection:"row", alignSelf: "center", marginTop: 5, marginBottom:20}}>
                  <Text style = {styles.layBet}>Set your bet for: </Text>
                  <Text style = {[styles.layBet, {marginLeft: 5, color: "#00B073", fontSize: 17}]}>{this.props.team.name}</Text>
                </View>

                <Text style = {{alignSelf: "center", color: "#DAA520", fontSize: 25, marginTop: 5, fontWeight: "300"}}>{this.state.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>

                <Slider
                  step= {10}
                  style ={{marginLeft: 15, marginRight: 15, marginTop: 15}}
                  maximumValue={this.state.cUserCoins}
                  thumbTintColor = "#00B073"
                  minimumTrackTintColor = "#00B073"
                  onValueChange={this.setCoins.bind(this)}
                  value={this.state.bet}
                  thumbStyle ={{color: "#00B073"}}
                />
                <View style = {{flexDirection:"row", justifyContent:"space-between", marginTop: 15}}>
                  <TouchableOpacity style = {{backgroundColor: "#00B073", padding: 5, borderRadius: 5, marginLeft: 5}} onPress = {this.setCoins.bind(this, 50)}>
                    <Text style = {{color: "white"}}> Min bet </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style = {{backgroundColor: "#DAA520", padding: 5, borderRadius: 5, marginRight: 5}}  onPress = {this.setCoins.bind(this, this.state.cUserCoins)}>
                    <Text style = {{color: "white"}}> All in </Text>
                  </TouchableOpacity>
                </View>
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
                    <Text style = {[styles.layBet, {fontSize: 19}]}> Place bet</Text>
                  </TouchableOpacity>
      }

    return(
         <LinearGradient  style = {{flex: 1}} start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "black", "gray"]}>
          <View style ={{marginBottom: 15}}>
            <View style = {styles.info}>
              <TouchableOpacity style = {styles.closeModal} onPress  = {this.props.visible}>
                <Text style = {{color: "#00B073", fontSize: 17}}>
                  Close
                </Text>
              </TouchableOpacity>
              <Text style = {{color: "#DAA520", marginTop: 12, marginRight: 19}}> {this.state.cUserCoins} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
            </View>
          </View>

          <View>
            {this.renderSegmentedController()}
          </View>

          {this.betChoice()}

          {button}
          </LinearGradient>


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
    borderBottomWidth: 0.3,
    borderBottomColor: "gray"
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
    width: 60,
    height: 60,
    marginRight: 25,
    marginTop: 12,
    marginLeft: 5
  },
  layBet: {
    alignSelf: "center",
    color: "white",
    fontWeight:"400",
    fontSize: 15
  },
  buttonContainer: {
    backgroundColor: "#00B073",
    padding: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
};

export default BetModal;
