import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Slider, Image, TextInput, Dimensions, Alert} from "react-native";
import MaterialTabs from "react-native-material-tabs";
import FontAwesome, {Icons} from "react-native-fontawesome";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import LinearGradient from "react-native-linear-gradient";

const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

class MatchARequest extends Component{

  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  //Segmented controller for team(s)NotSelected
  renderSegmentedController(){
    const { game, teamsNotSelected } = this.props;
    var values = [ `Bets for ${teamsNotSelected[0].name}`, `Bets for ${teamsNotSelected[1].name}`];

    if(game.data.sport.name == "Soccer"){
      return(
        <View style = {{paddingBottom: 15, paddingTop: 10}}>
          <MaterialTabs
              items={values}
              indicatorColor ="#00B073"
              activeTextColor ="white"
              inactiveTextColor ="gray"
              textStyle= {{fontSize: 12}}
              barColor ="transparent"
              selectedIndex={this.props.index}
              onChange={this.props.segmentedController}
          />
      </View>

      );
    } else if(game.data.sport.name != "Soccer"){
          return(
            <View style = {{paddingBottom: 15, marginTop:10}}>
              <MaterialTabs
                  items={[`Bets for ${teamsNotSelected[0].name}`]}
                  indicatorColor ="#00B073"
                  activeTextColor ="white"
                  inactiveTextColor ="gray"
                  textStyle= {{fontSize: 12}}
                  barColor ="transparent"
                  selectedIndex={this.props.index}
                  onChange={this.props.segmentedController}
              />
            </View>
          );
     };
  }

  // Order requests by team
  betChoice(){
    const {game, teamsNotSelected, team, index} = this.props;
    var position = this.props.team.position;
                //  -- MODAL FOR USER MATCH -- //
    if(index == 0){
          return(
              <View style = {{marginTop: 15 }}>

                <View style = {{flexDirection:"row", justifyContent:"space-between", marginBottom: 15, borderBottomColor: "gray", borderBottomWidth: 0.3, paddingBottom: 9, borderTopColor: "gray", borderTopWidth: 0.3}}>
                    <View>
                       <Text style = {{color: "gray", margin: 10, marginBottom: 4, fontSize: 12, alignSelf:"center"}}>
                          QUOTE
                       </Text>
                        <Text style = {{color: "white", margin: 10, marginBottom: 4, fontSize: 12, alignSelf:"center"}}>
                          {teamsNotSelected[0].quotes[position] || teamsNotSelected[0].quotes}% {teamsNotSelected[0].quotes || teamsNotSelected[0].quotes[position] > 0 ? <FontAwesome style = {{color:"#00B073"}}>{Icons.sortUp}</FontAwesome> : <FontAwesome style = {{color:"red"}}>{Icons.sortDown}</FontAwesome>}
                       </Text>
                    </View>

                    <View>
                        <Text style = {{color: "gray", margin: 10, marginBottom: 4, fontSize: 12, alignSelf:"center"}}>
                          YOUR TEAM
                        </Text>
                        <Text style = {{color: "#00B073", margin: 10, marginBottom: 4, fontSize: 14, alignSelf:"center"}}>
                          {team.name}
                        </Text>
                    </View>


                    <TouchableOpacity>
                       <Text style = {{color: "gray", margin: 10, marginBottom: 4, fontSize: 12, alignSelf:"center"}}>
                          HOW IT WORKS?
                       </Text>

                      <View style = {{alignSelf:"center"}}>
                        <FontAwesome style = {{color: "white", fontSize: 20, alignSelf:"center", paddingTop: 7}}>{Icons.questionCircle}</FontAwesome>
                      </View>
                    </TouchableOpacity>
                </View>
                {this.userList(teamsNotSelected[0].name, teamsNotSelected[0].quotes[position] || teamsNotSelected[0].quotes)}
              </View>
          );
      } else {
          return(
              <View style = {{marginTop: 15 }}>

                <View style = {{flexDirection:"row", justifyContent:"space-between", marginBottom: 15, borderBottomColor: "gray", borderBottomWidth: 0.3, paddingBottom: 9, borderTopColor: "gray", borderTopWidth: 0.3}}>
                    <View>
                       <Text style = {{color: "gray", margin: 10, marginBottom: 4, fontSize: 12, alignSelf:"center"}}>
                          QUOTE
                       </Text>
                        <Text style = {{color: "white", margin: 10, marginBottom: 4, fontSize: 12, alignSelf:"center"}}>
                          {teamsNotSelected[1].quotes[position]}% { teamsNotSelected[1].quotes[position] > 0 ? <FontAwesome style = {{color:"#00B073"}}>{Icons.sortUp}</FontAwesome> : <FontAwesome style = {{color:"red"}}>{Icons.sortDown}</FontAwesome>}
                       </Text>
                    </View>

                    <View>
                        <Text style = {{color: "gray", margin: 10, marginBottom: 4, fontSize: 12, alignSelf:"center"}}>
                          YOUR TEAM
                        </Text>
                        <Text style = {{color: "#00B073", margin: 10, marginBottom: 4, fontSize: 14, alignSelf:"center"}}>
                          {team.name}
                        </Text>
                    </View>


                    <TouchableOpacity>
                       <Text style = {{color: "gray", margin: 10, marginBottom: 4, fontSize: 12, alignSelf:"center"}}>
                          HOW IT WORKS?
                       </Text>

                      <View style = {{alignSelf:"center"}}>
                        <FontAwesome style = {{color: "white", fontSize: 20, alignSelf:"center", paddingTop: 7}}>{Icons.questionCircle}</FontAwesome>
                      </View>
                    </TouchableOpacity>
                </View>

                {this.userList(teamsNotSelected[1].name, teamsNotSelected[0].quotes[position] || teamsNotSelected[0].quotes)}
              </View>
          );
        }
    }

  // Show users that you can match
  userList(team, quote){
    return this.props.requests.map((u, index) => {
      var bet = quote > 0 ? Math.round(u.amount - ((quote / 100) * u.amount)) : u.amount;

      if(team == u.back_team){
        return(
          <TouchableOpacity key = {index} onPress = {this.props.confirm.bind(this, "ConfirmBet", u, quote, bet)}>
            <View style = {styles.tableStyle}>
              <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                <View style= {{flexDirection:"row"}}>
                  <Image
                    source = {{uri: u.image}}
                    style = {styles.image}
                  />

                  <View>
                    <Text style = {{ marginTop: 5, color: "#ffff", fontSize: 13, fontWeight: "300"}}>{u.back_user.username}</Text>
                    <Text style = {{color: "#DAA520", fontSize: 16, marginTop: 10}}> {u.amount}  <FontAwesome>{Icons.database}</FontAwesome></Text>
                  </View>
                </View>
                <FontAwesome style = {{color:"gray", marginTop: 30, marginRight: 5}}>{Icons.chevronRight}</FontAwesome>
              </View>
            </View>

          </TouchableOpacity>
        );
      } else {
        return null
      }
    })
  }

  render(){
    console.log(this.props.requests);
    return(
      <LinearGradient  style = {{flex: 1}} start={{x: 0, y: 0}} end={{x: 4 , y: 1}} colors = {[ "black", "gray"]}>
        {this.renderSegmentedController()}
        {this.betChoice()}
      </LinearGradient>
    );
  }
}

const styles ={
  image: {
    width: 45,
    height: 45,
    marginRight: 22,
    marginLeft: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    alignSelf:"center"
  },
}

export default MatchARequest;
