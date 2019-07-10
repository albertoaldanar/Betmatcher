import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Slider, Image, TextInput, Dimensions, Alert} from "react-native";
import MaterialTabs from "react-native-material-tabs";
import FontAwesome, {Icons} from "react-native-fontawesome";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import LinearGradient from "react-native-linear-gradient";
import Url from "../constants/url";
import UserCard from "../reusable/userCard";
import Modal from "react-native-modal";

const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

class MatchARequest extends Component{

  constructor(props){
    super(props);
    this.state = {
      list: [],
      cUserCoins: 3504,
      userSelected: "",
      userCard: false,
      profile: [],
      friendAnalysis: null
    }
  }

  getUser(user){
      return fetch(`http://${Url}:8000/user_info?user=${user}&current_user=${this.props.currentUser}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        }
      })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes)
          this.setState({userSelected: jsonRes.user, userCard: !this.state.userCard, profile: jsonRes.user.profile, friendAnalysis: jsonRes.result})
      })
      .catch(error => console.log(error));
  }

  userCard(){
    this.setState({userCard: !this.state.userCard})
  }

  //Segmented controller for team(s)NotSelected
  renderSegmentedController(){
    const { game, teamsNotSelected, team } = this.props;
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
              onChange={this.props.segmentedController.bind(this)}
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
                  onChange={this.props.segmentedController.bind(this)}
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
                {this.userList(teamsNotSelected[0].name, position )}
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

                {this.userList(teamsNotSelected[1].name,  position)}
              </View>
          );
        }
    }

  // Show users that you can match
  userList(team,  position){
    return this.props.requests.map((u, index) => {

      const currentQuote = position == u.fq_position ? u.fq : u.sq;

      var bet = currentQuote > 0 ? Math.round(u.amount - ((currentQuote / 100) * u.amount)) : u.amount;

      console.log(currentQuote);

      if(team == u.back_team){
        return(
          <View>
            <View style = {styles.tableStyle}>
              <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                <View style= {{flexDirection:"row"}}>
                  <Image
                    source = {{uri: u.image}}
                    style = {styles.image}
                  />

                  <TouchableOpacity onPress = {this.getUser.bind(this, u.back_user.username)}>
                    <Text style = {{ marginTop: 5, color: "#ffff", fontSize: 13, fontWeight: "300"}}>{u.back_user.username}</Text>
                    <Text style = {{ marginTop: 5, color: "#ffff", fontSize: 13, fontWeight: "300"}}>{currentQuote}</Text>
                    <Text style = {{color: "#DAA520", fontSize: 16, marginTop: 10}}> {u.amount}  <FontAwesome>{Icons.database}</FontAwesome></Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity key = {index} onPress = {this.props.confirm.bind(this, "ConfirmBet", u, currentQuote, bet)}>
                  <FontAwesome style = {{color:"gray", marginTop: 30, marginRight: 5}}>{Icons.chevronRight}</FontAwesome>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        );
      } else {
        return null
      }
    })
  }

  render(){
    const {coins} = this.props;
    const {friendAnalysis, profile, userSelected} = this.state;
    console.log(this.props.requests);

    return(
      <LinearGradient  style = {{flex: 1}} start={{x: 0, y: 0}} end={{x: 4 , y: 1}} colors = {[ "black", "gray"]}>
        <View style ={{marginTop: 7}}>
          <View style = {styles.info}>
            <TouchableOpacity style = {styles.closeModal} onPress  = {this.props.visible}>
                  <Text style = {{color: "#00B073", fontSize: 17}}>
                    Close
                  </Text>
            </TouchableOpacity>
            <Text style = {{color: "#DAA520", marginTop: 12, marginRight: 19}}> {coins}  <FontAwesome>{Icons.database}</FontAwesome></Text>
          </View>
        </View>
        {this.renderSegmentedController()}
        {this.betChoice()}

        <Modal
            style={{ flex: 1, position: "relative" , margin: 50, marginLeft: 25, marginRight: 25}}
            isVisible={this.state.userCard}
            backdropOpacity = {0.45}
        >
            <UserCard
              closeModal = {this.userCard.bind(this)}
              isFriend ={friendAnalysis} profile = {profile} userSelected = {userSelected}
              addButton = {false}
            />
        </Modal>

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
  info: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 7
  },
  closeModal: {
    marginTop: 12,
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 13
  },
}

export default MatchARequest;

