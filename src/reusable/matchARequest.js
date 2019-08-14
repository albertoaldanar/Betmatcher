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
                          BASE QUOTE
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

                <ScrollView style = {{height: Dimensions.get("window").height }}>
                  {this.userList(teamsNotSelected[0].name, position )}
                </ScrollView>
              </View>
          );
      } else {
          return(
              <View style = {{marginTop: 15 }}>

                <View style = {{flexDirection:"row", justifyContent:"space-between", marginBottom: 15, borderBottomColor: "gray", borderBottomWidth: 0.3, paddingBottom: 9, borderTopColor: "gray", borderTopWidth: 0.3}}>
                    <View>
                       <Text style = {{color: "gray", margin: 10, marginBottom: 4, fontSize: 12, alignSelf:"center"}}>
                          BASE QUOTE
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
                
                <ScrollView style = {{height: Dimensions.get("window").height }}> 
                  {this.userList(teamsNotSelected[1].name,  position)}
                </ScrollView>
              </View>
          );
        }
    }


  userList(team,  position){
    return this.props.requests.map((u, index) => {

      const currentQuote = position == u.fq_position ? u.fq : u.sq;

      var bet = currentQuote > 0 ? Math.round(u.amount - ((currentQuote / 100) * u.amount)) : u.amount;

      const finalQuote = currentQuote * - 1;


      console.log(currentQuote, bet, u.amount);

      if(team == u.back_team){
        return(
          <TouchableOpacity  key = {index} onPress = {this.props.confirm.bind(this, "ConfirmBet", u, finalQuote, bet)} style = {{marginBottom: 20, backgroundColor:"#161616", marginLeft: 10, marginRight: 10, borderRadius: 6}}>
              <View style = {{flexDirection: "row", justifyContent:"space-between", padding: 10, borderBottomColor: "gray", borderBottomWidth: 0.3}}>
                <View style= {{flexDirection:"row"}}>
                  <Image
                    source = {{uri: "https://yena.co.uk/wp-content/uploads/2018/01/profile-circle.png"}}
                    style = {styles.image}
                  />
                  
                  <View style = {{justifyContent: "center"}}>
                    <Text style = {{ marginTop: 2, color: "#ffff", fontSize: 13, fontWeight: "300", marginRight: 15}}>{u.back_user.username}</Text>
                    <Text style = {{ marginTop: 5, color: "gray", fontSize: 10, fontWeight: "300", fontStyle: "oblique", marginTop: 4}}>{u.back_user.profile.country} <FontAwesome>{Icons.mapMarker}</FontAwesome></Text>
                  </View>
                </View>

                <FontAwesome style = {{color:"gray", fontWeight:"300", marginRight: 5, marginTop: 9}}>{Icons.chevronRight}</FontAwesome>
              </View>

              <View style = {{flexDirection: "row", justifyContent:"space-around", paddingTop: 19, paddingBottom: 19, borderBottomColor: "gray", borderBottomWidth: 0.3}} >
                  <View style = {{justifyContent:"center", borderRightColor: "gray", borderRightWidth: 0.3, paddingRight: 40}}>
                    <Text style ={styles.description}>Bet</Text>
                    <Text style = {{fontWeight:"400", fontSize: 13, color: "#DAA520", alignSelf:"center", marginTop: 10}}>{u.amount} <FontAwesome> {Icons.database} </FontAwesome> </Text>
                  </View> 

                  <View style = {{justifyContent:"center", borderRightColor: "gray", borderRightWidth: 0.3, paddingRight: 40}}>
                    <Text style ={styles.description}>Quote</Text>
                    <Text style = {{ marginTop: 5, color: "#ffff", fontSize: 13, fontWeight: "300", alignSelf:"center", alignSelf:"center", marginTop: 10}}>
                      {finalQuote} % { finalQuote > 0 ? <FontAwesome style = {{color:"#00B073"}}>{Icons.sortUp}</FontAwesome> : finalQuote == 0 ? <FontAwesome style = {{color: "#1E90FF"}}>{Icons.sort}</FontAwesome> : <FontAwesome style = {{color:"red"}}>{Icons.sortDown}</FontAwesome>}
                    </Text>
                  </View>

                  <View style = {{justifyContent:"center"}}>
                    <Text style ={styles.description}>Quote</Text>
                    <Text style = {{ marginTop: 5, color: "#ffff", fontSize: 13, fontWeight: "300", alignSelf:"center", alignSelf:"center", marginTop: 10}}>{finalQuote} % { finalQuote > 0 ? <FontAwesome style = {{color:"#00B073"}}>{Icons.sortUp}</FontAwesome> : <FontAwesome style = {{color:"red"}}>{Icons.sortDown}</FontAwesome>}</Text>
                  </View>
              </View>

              {
                    finalQuote > 0 ? 
                    <Text style = {{textAlign:"center", fontWeight: "300", fontStyle: "oblique", color: "gray", paddingTop: 10, paddingBottom: 10, fontSize: 12}}> {u.back_user.username} has to bet {finalQuote} % than you </Text> :
                    finalQuote == 0 ? 
                    <Text style = {{textAlign:"center", fontWeight: "300", fontStyle: "oblique", color: "gray", paddingTop: 10, paddingBottom: 10, fontSize: 12}}> {u.back_user.username} and you, will bet the same amount </Text> :
                    <Text style = {{textAlign:"center", fontWeight: "300", fontStyle: "oblique", color: "gray", paddingTop: 10, paddingBottom: 10, fontSize: 12}}> {u.back_user.username} will bet {finalQuote * -1} % less than you </Text> 
              }
          </TouchableOpacity>
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
      <View style = {{flex:1, backgroundColor:"black"}}>
        <View style ={{marginTop: 7}}>
          <View style = {styles.info}>
            <TouchableOpacity style = {styles.closeModal} onPress  = {this.props.visible}>
                  <Text style = {{color: "#00B073", fontSize: 21}}>
                    X
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

      </View>
    );
  }
}

const styles ={
  image: {
    width: 35,
    height: 35,
    marginRight: 8,
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
  description: {
      color: "gray",
      fontWeight: "300"
  }
}

export default MatchARequest;

