import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Slider, Image, TextInput, Dimensions, Alert} from "react-native";
import MaterialTabs from "react-native-material-tabs";
import FontAwesome, {Icons} from "react-native-fontawesome";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import LinearGradient from "react-native-linear-gradient";
import Url from "../constants/url";
import UserCard from "../reusable/userCard";
import Modal from "react-native-modal";
import NumberFormat from 'react-number-format';

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
      friendAnalysis: null,
      showInstructions: false
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
                          {teamsNotSelected[0].quotes[position] || teamsNotSelected[0].quotes} % 
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


                    <TouchableOpacity onPress = {() => this.setState({showInstructions: true})}>
                       <Text style = {{color: "gray", margin: 10, marginBottom: 4, fontSize: 12, alignSelf:"center"}}>
                          HOW IT WORKS?
                       </Text>

                      <View style = {{alignSelf:"center"}}>
                        <FontAwesome style = {{color: "white", fontSize: 20, alignSelf:"center", paddingTop: 7}}>{Icons.questionCircle}</FontAwesome>
                      </View>
                    </TouchableOpacity>
                </View>

                <ScrollView style = {{height: Dimensions.get("window").height * 0.7}}>
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
                          {teamsNotSelected[1].quotes[position]} % 
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


                    <TouchableOpacity onPress = {() => this.setState({showInstructions: true})}>
                       <Text style = {{color: "gray", margin: 10, marginBottom: 4, fontSize: 12, alignSelf:"center"}}>
                          HOW IT WORKS?
                       </Text>

                      <View style = {{alignSelf:"center"}}>
                        <FontAwesome style = {{color: "white", fontSize: 20, alignSelf:"center", paddingTop: 7}}>{Icons.questionCircle}</FontAwesome>
                      </View>
                    </TouchableOpacity>
                </View>
                
                <ScrollView style = {{height: Dimensions.get("window").height * 0.7 }}> 
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
          <TouchableOpacity  key = {index} onPress = {this.props.confirm.bind(this, "ConfirmBet", u, finalQuote, u.amount)} style = {{marginBottom: 20, backgroundColor:"#161616", marginLeft: 10, marginRight: 10, borderRadius: 6}}>
              <View style = {{flexDirection: "row", justifyContent:"space-between", padding: 10, borderBottomColor: "gray", borderBottomWidth: 0.3}}>
                <View style= {{flexDirection:"row"}}>
                  <Image
                    source = {{uri: "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png"}}
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
                  <View style = {{justifyContent:"center", borderRightColor: "gray", borderRightWidth: 0.3, paddingRight: Dimensions.get("window").width * 0.22}}>
                    <Text style ={styles.description}>Bet</Text>

                    <NumberFormat
                      value={u.amount}
                      displayType={'text'}
                      thousandSeparator={true}
                      renderText= {value => <Text style = {{fontWeight:"400", fontSize: 13, color: "#DAA520", alignSelf:"center", marginTop: 10, textAlign:"center"}}> {value} <FontAwesome>{Icons.database}</FontAwesome></Text>}
                    />
                  </View> 

                  <View style = {{justifyContent:"center"}}>
                    <Text style ={styles.description}>Quote</Text>
                    <Text style = {{ marginTop: 5, color: "#ffff", fontSize: 13, fontWeight: "300", alignSelf:"center", textAlign: "center", marginTop: 10}}>
                      {finalQuote} % { finalQuote > 0 ? <FontAwesome style = {{color:"#00B073"}}>{Icons.sortUp}</FontAwesome> : finalQuote == 0 ? <FontAwesome style = {{color: "#1E90FF"}}>{Icons.sort}</FontAwesome> : <FontAwesome style = {{color:"red"}}>{Icons.sortDown}</FontAwesome>}
                    </Text>
                  </View>

              </View>

              {
                    finalQuote > 0 ? 
                    <Text style = {{textAlign:"center", fontWeight: "300", fontStyle: "oblique", color: "gray", paddingTop: 10, paddingBottom: 10, fontSize: 12}}> {u.back_user.username} has to bet {finalQuote} % more than you </Text> :
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
    const {coins, game, teamsNotSelected, team, index} = this.props;
    const {friendAnalysis, profile, userSelected} = this.state;

    var position = this.props.team.position;

    const instructionQuote = index == 0 ? teamsNotSelected[0].quotes[position] || teamsNotSelected[0].quotes : teamsNotSelected[1].quotes[position]

    const positiveInstructionQuote = instructionQuote < 0 ? instructionQuote * -1 : instructionQuote;
    
    const message = instructionQuote > 0 ? `It means your opponent should bet around ${positiveInstructionQuote}% more than you for a fair bet` : positiveInstructionQuote == 0 ? `It means both users should bet the same amount because bet is SUPER equal` : `It means you should bet around ${positiveInstructionQuote}% more than your opponent for a fair bet.`

    return(
      <View style = {{flex:1, backgroundColor:"black"}}>
        <View style ={{marginTop: 7}}>
          <View style = {styles.info}>
            <TouchableOpacity style = {styles.closeModal} onPress  = {this.props.visible}>
                  <Text style = {{color: "#00B073", fontSize: 21}}>
                    X
                  </Text>
            </TouchableOpacity>
            <NumberFormat
                value={coins}
                displayType={'text'}
                thousandSeparator={true}
                renderText= {value => <Text style = {{color: "#DAA520", marginTop: 12, marginRight: 19}}> {value} <FontAwesome>{Icons.database}</FontAwesome></Text>}
            /> 
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

        <Modal
            style={{ flex: 1}}
            isVisible={this.state.showInstructions}
            backdropOpacity = {0.87}
        >
          <View style = {{flex: 1}}>
              
            <TouchableOpacity style = {{margin: 7}} onPress = {() => this.setState({showInstructions: false})}>
              <Text style = {{color: "#ffff", fontSize: 21}}>X</Text>
            </TouchableOpacity>

            <Text style = {{alignSelf: "center", textAlign: "center", margin: 20, color: "white", fontSize: 20, marginBottom: 3, fontWeight: "600"}}>1) Betmatcher´s base quote for this match is {instructionQuote}%. </Text>
            <Text style = {{alignSelf: "center", textAlign: "center", margin: 20, color: "gray", fontSize: 17, fontStyle: "oblique", marginTop: 10}}>- {message}</Text>

            <Text style = {{alignSelf: "center", textAlign: "center", margin: 20, color: "white", fontSize: 20, fontWeight: "600"}}>2) Every user sets ITS OWN QUOTE, analyse which bet fits better for your.</Text>
            <Text style = {{alignSelf: "center", textAlign: "center", margin: 20, fontSize: 20, color: "white", fontSize: 20, fontWeight: "600"}}>3) Pick smart :)</Text>

            <TouchableOpacity style = {{backgroundColor: "#00B073", padding: 10, margin: 10, marginTop: 50, borderRadius: 5}} onPress = {() => this.setState({showInstructions: false})}>
              <Text style = {{color: "white", alignSelf: "center", textAlign: "center"}}>Got it <FontAwesome>{Icons.thumbsUp}</FontAwesome></Text>
            </TouchableOpacity>
          </View>
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

