import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Slider, Image, TextInput, Dimensions, Alert} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import LinearGradient from "react-native-linear-gradient";
import FriendsModal from "./friendsModal"
import Modal from "react-native-modal";
import MaterialTabs from "react-native-material-tabs";
import Url from "../constants/url";
import User from "../constants/user";
import NumericInput from 'react-native-numeric-input'



const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

class BetModal extends Component{

  constructor(props){
    const qts = props.game.data.sport.name == "Soccer" ? [props.teamsNotSelected[0].quotes[props.team.position], props.teamsNotSelected[1].quotes[props.team.position]] : [props.teamsNotSelected[0].quotes, null];

    super(props);
    this.state = {
      bet: 50,
      values: [50, 3460],
      finalValue: [],
      showFriends: false,
      opponent: "",
      publicBet: true,
      infoModal: false,
      betfriends: [],
      fq: qts[0],
      sq: qts[1]
    }
  }


  changeBetAmount(sign){
    if(sign== "Plus"){
      this.setState({bet: this.state.bet += 1 })
    } else {
      this.setState({bet: this.state.bet -= 1 })
    }
  }

  customizeQuotes(quote, sign){
    if(quote == "fq" && sign == "+"){
      this.setState({fq: this.state.fq += 1})
    } else if(quote == "fq" && sign == "-"){
      this.setState({fq: this.state.fq -= 1})
    } else if(quote == "sq" && sign == "+"){
      this.setState({sq: this.state.sq += 1})
    } else {this.setState({sq: this.state.sq -= 1})}
  } 

  getFriends(){
      this._isMounted = true;

      return fetch(`http://${Url}:8000/betfriends_data?current_user=${this.props.currentUser}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        }
      })
      .then(res => res.json())
      .then(jsonRes => {
        if(this._isMounted){
          this.setState({
            betfriends: jsonRes.betfriends,
            showFriends: true,
            publicBet: false
          })
        }
      })
      .catch(error => console.log(error));
  }

  dataAnalysis(){
      const {choice, game, teamsNotSelected, team} = this.props;
      var position = this.props.team.position;

      if(game.sport == "Soccer"){
        return(
          <View>
            <View style = {{flexDirection:"row"}}>
              <Text style = {{color: "white"}}>Your team</Text>
              <Text style = {{color: "#00B073"}}>{team.name}</Text>
              <Text style = {{color: "white"}}> has {teamsNotSelected[0].quotes[position] || teamsNotSelected[1].quotes[position] < 0 ? "advantage" : "disadvantage"} over  {teamsNotSelected[0].name || teamsNotSelected[1].name} </Text>
            </View>

            <Text style = {styles.expText}>
               So you have to bet {teamsNotSelected[0].quotes[position] || teamsNotSelected[1].quotes[position]}% {teamsNotSelected[0].quotes[position] || teamsNotSelected[1].quotes[position] < 0 ? "more" : "less"}
            </Text>

            <TouchableOpacity style = {{backgroundColor:"#00B073", padding: 10, borderRadius: 5, margin: 50}} onPress={() => this.setState({infoModal: false})}>
              <Text style = {{color: "white", fontSize: 17, alignSelf:"center",}}>Got it  <FontAwesome>{Icons.thumbsUp}</FontAwesome></Text>
            </TouchableOpacity>
          </View>
        );
      } else {
          return(
            <View>
              <View style = {{flexDirection:"row"}}>
                <Text style = {{color: "white"}}>Your team</Text>
                <Text style = {{color: "#00B073"}}> {team.name}</Text>
                <Text style = {{color: "white"}}> has {teamsNotSelected[0].quotes < 0 ? "advantage" : "disadvantage"} over  {teamsNotSelected[0].name} </Text>
              </View>

              <Text style = {styles.expText}>
                 So you have to bet {teamsNotSelected[0].quotes > 0 ? teamsNotSelected[0].quotes : (teamsNotSelected[0].quotes * -1) }% {teamsNotSelected[0].quotes < 0 ? "more" : "less"}
              </Text>

              <TouchableOpacity style = {{backgroundColor:"#00B073", padding: 10, borderRadius: 5, margin: 50}} onPress={() => this.setState({infoModal: false})}>
                <Text style = {{color: "white", fontSize: 17, alignSelf:"center",}}>Got it  <FontAwesome>{Icons.thumbsUp}</FontAwesome></Text>
              </TouchableOpacity>
            </View>
          );
      }
  }

  friendsModal(){
    if(this.state.betfriends.length < 1 || this.state.opponent == ""){
      this.setState({showFriends: !this.state.showFriends, publicBet: true})
    } else {
      this.setState({showFriends: !this.state.showFriends})
    }
    
  }

  selectOpponent(value){
    this.setState({ opponent: value, showFriends: false })
  }


  alerts(){
      const title = this.state.publicBet ? "Your bet has been placed!" : `Your bet has been sent`
      const message = this.state.publicBet ? "Wait for someone to match your bet, if no one matches you get your coins back" : `Wait for ${this.state.opponent} to accept bet`

      Alert.alert(
          title,
          message,
        [
          {text: 'Continue', onPress: this.props.sendToMatchFromLay},
        ],
        {cancelable: false},
      );
  }

  postRequest(){
    let {currentUser, game, team, coins, teamsNotSelected} = this.props;
    const {opponent, fq, sq, bet, publicBet} = this.state;

    if(this.state.bet > coins){
      return Alert.alert("Can´t send bet", `You don´t have ${this.state.bet} coins, sorry :( `, [{text: 'Continue', onPress: () => console.log("Request not possible")}])
    } else {
        return fetch(`http://${Url}:8000/post_request/`, {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-type": "application/json"
          },
          body: JSON.stringify({
            back_user: currentUser, event: game.data.name,
            back_team: team.name, amount: bet,
            is_public: publicBet, opponent: opponent, fq: fq, sq: sq,
            fq_position: teamsNotSelected[0].position, sq_position: teamsNotSelected[1].position || null
          })
        })
        .then(res => res.json())
        .then(jsonRes => {
           return this.alerts()
        })
        .catch(error => console.log(error));
    }
  }

  gameType(game, position){
    let {bet, fq, sq} = this.state;
    const {teamsNotSelected} = this.props;

   if(game.data.sport.name == "Soccer"){
      return(
          <ScrollView 
            horizontal
            style = {{marginTop: 35, marginRight: 10, marginLeft: 10}}
          >
            <View style = {styles.tradeCard}>
              <View style = {{ flexDirection:"row"}}>
                  <View>
                      <View style = {{flexDirection:"row", marginTop: 5, marginLeft: 10, marginBottom: 15}}>
                          <Text style = {{color: "white"}}>If match against</Text>
                          <Text style = {{color: "#00B073"}}>  {teamsNotSelected[0].name.toUpperCase()}</Text>
                      </View>

                      <View style = {{marginTop: 10, marginLeft: 10,}}>
                            <Text style = {{color: "gray", fontStyle: "oblique", marginBottom: 10}}>Opponent will bet: </Text>

                            <View style = {{width: Dimensions.get("window").width * 0.2, borderRadius: 5, flexDirection:"row",}}>
     
                                { fq > 0 ? 
                                  <FontAwesome style = {{color: "white", fontSize: 20, marginTop: 6, marginRight: 4, color: "#00B073"}}>{Icons.sortUp}</FontAwesome> :
                                  <FontAwesome style = {{color: "white", fontSize: 20, marginTop: 6, marginRight: 4, color: "#b30000", marginTop: -3}}>{Icons.sortDown}</FontAwesome>
                                }
                                <Text style = {fq > 0 ? styles.positiveQuote : styles.negativeQuote}> {fq} % </Text>
        

                              <View style = {{flexDirection: "row"}}>
                                <TouchableOpacity style = {{padding: 4, borderColor:"gray", borderWidth: 0.3, paddingTop: 1, paddingBottom: 1, marginRight: 3, borderRadius: 5}}
                                  onPress = {this.customizeQuotes.bind(this, "fq", "-")}
                                >
                                    <Text style = {{color: "#00B073", fontSize: 20}}> - </Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                  style = {{padding: 4, borderColor:"gray", borderWidth: 0.3, paddingTop: 1, paddingBottom: 1, borderRadius: 5}}
                                   onPress = {this.customizeQuotes.bind(this, "fq", "+")}
                                >
                                    <Text style = {{color: "#00B073", fontSize: 20}}> + </Text>
                                </TouchableOpacity>
                              </View>
                            </View>

                            <Text style = {{color: "gray", fontStyle: "oblique", marginTop: 10}}> {fq > 0 ? "more" : "less"} than you </Text>
                      </View>

                      <View style = {{marginTop: 25, marginLeft: 2, borderTopColor: "gray", borderTopWidth: 0.3}}>  
                          <Text style = {{color:"#DAA520",  marginTop: 10}}>RETURN { Math.round((fq / 100) * bet + (bet * 2) )} <FontAwesome>{Icons.database}</FontAwesome></Text>
                      </View>
                  </View>
              </View>
            </View>


            <View style = {styles.tradeCard}>
              <View style = {{ flexDirection:"row"}}>
                  <View>
                      <View style = {{flexDirection:"row", marginTop: 5, marginLeft: 10, marginBottom: 15}}>
                          <Text style = {{color: "white"}}>If match against</Text>
                          <Text style = {{color: "#00B073"}}>  {teamsNotSelected[1].name.toUpperCase()}</Text>
                      </View>

                      <View style = {{marginTop: 10, marginLeft: 10,}}>
                            <Text style = {{color: "gray", fontStyle: "oblique", marginBottom: 10}}>Opponent will bet: </Text>

                            <View style = {{width: Dimensions.get("window").width * 0.2, borderRadius: 5, flexDirection:"row",}}>
     
                                { sq > 0 ? 
                                  <FontAwesome style = {{color: "white", fontSize: 20, marginTop: 6, marginRight: 4, color: "#00B073"}}>{Icons.sortUp}</FontAwesome> :
                                  <FontAwesome style = {{color: "white", fontSize: 20, marginTop: 6, marginRight: 4, color: "#b30000", marginTop:-3}}>{Icons.sortDown}</FontAwesome>
                                }
                                <Text style = {sq > 0 ? styles.positiveQuote : styles.negativeQuote}> {sq} % </Text>
        

                              <View style = {{flexDirection: "row"}}>
                                <TouchableOpacity 
                                  style = {{padding: 4, borderColor:"gray", borderWidth: 0.3, paddingTop: 1, paddingBottom: 1, marginRight: 3, borderRadius: 5}}
                                   onPress = {this.customizeQuotes.bind(this, "sq", "-")}
                                >
                                    <Text style = {{color: "#00B073", fontSize: 20}}> - </Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                  style = {{padding: 4, borderColor:"gray", borderWidth: 0.3, paddingTop: 1, paddingBottom: 1, borderRadius: 5}}
                                   onPress = {this.customizeQuotes.bind(this, "sq", "+")}
                                >
                                    <Text style = {{color: "#00B073", fontSize: 20}}> + </Text>
                                </TouchableOpacity>
                              </View>
                            </View>

                            <Text style = {{color: "gray", fontStyle: "oblique", marginTop: 10}}> {sq > 0 ? "more" : "less"} than you </Text>
                      </View>

                      <View style = {{marginTop: 25, marginLeft: 2, borderTopColor: "gray", borderTopWidth: 0.3}}>  
                          <Text style = {{color:"#DAA520",  marginTop: 10}}>RETURN { Math.round((sq / 100) * bet + (bet * 2) )} <FontAwesome>{Icons.database}</FontAwesome></Text>
                      </View>
                  </View>
              </View>
            </View>
          </ScrollView>
      );
    } else {
      return(
        <View style = {{marginTop: 35}}>
            <View style = {[styles.tradeCard, {padding: 8}]}>
              <View style = {{ flexDirection:"row"}}>
                  <View>
                      <View style = {{flexDirection:"row", marginTop: 5, marginLeft: 10, marginBottom: 15}}>
                          <Text style = {{color: "white"}}>When match against</Text>
                          <Text style = {{color: "#00B073"}}>  {teamsNotSelected[0].name.toUpperCase()}</Text>
                      </View>

                      <View style = {{marginTop: 10, marginLeft: 10,}}>
                            <Text style = {{color: "gray", fontStyle: "oblique", marginBottom: 10}}>Opponent will bet: </Text>

                            <View style = {{width: Dimensions.get("window").width * 0.2, borderRadius: 5, flexDirection:"row",}}>
     
                                { fq > 0 ? 
                                  <FontAwesome style = {{color: "white", fontSize: 20, marginTop: 6, marginRight: 4, color: "#00B073"}}>{Icons.sortUp}</FontAwesome> :
                                  <FontAwesome style = {{color: "white", fontSize: 20, marginTop: 6, marginRight: 4, color: "#b30000", marginTop: -3}}>{Icons.sortDown}</FontAwesome>
                                }
                                <Text style = {fq > 0 ? styles.positiveQuote : styles.negativeQuote}> {fq} % </Text>
        

                              <View style = {{flexDirection: "row"}}>
                                <TouchableOpacity style = {{padding: 4, borderColor:"gray", borderWidth: 0.3, paddingTop: 1, paddingBottom: 1, marginRight: 3, borderRadius: 5}}
                                  onPress = {this.customizeQuotes.bind(this, "fq", "-")}
                                >
                                    <Text style = {{color: "#00B073", fontSize: 20}}> - </Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                  style = {{padding: 4, borderColor:"gray", borderWidth: 0.3, paddingTop: 1, paddingBottom: 1, borderRadius: 5}}
                                   onPress = {this.customizeQuotes.bind(this, "fq", "+")}
                                >
                                    <Text style = {{color: "#00B073", fontSize: 20}}> + </Text>
                                </TouchableOpacity>
                              </View>
                            </View>

                            <Text style = {{color: "gray", fontStyle: "oblique", marginTop: 10}}> {fq > 0 ? "more" : "less"} than you </Text>
                      </View>

                      <View style = {{marginTop: 25, marginLeft: 2, borderTopColor: "gray", borderTopWidth: 0.3}}>  
                          <Text style = {{color:"#DAA520",  marginTop: 10}}>RETURN { Math.round((fq / 100) * bet + (bet * 2) )} <FontAwesome>{Icons.database}</FontAwesome></Text>
                      </View>
                  </View>
              </View>
            </View>
        </View>
      );
    }
  }


  betFilter(){
    const {choice, game, teamsNotSelected, team, coins} = this.props;
    var position = this.props.team.position;

        return(
            <View>
              <View style = {{padding: 20, paddingTop: 10}}>
                <View style = {{flexDirection:"row", marginTop: 5, marginBottom:20}}>
                  <Text style = {[styles.layBet, {fontSize: 17, fontWeight: "300"}]}>Bet for </Text>
                  <Text style = {[styles.layBet, {marginLeft: 5, color: "#00B073", fontSize: 17, fontWeight: "300"}]}>{this.props.team.name.toUpperCase()}</Text>
                </View>

                <View style = {{flexDirection:"row"}}>
                  <Text style= {{fontWeight: "300", color: "#DAA520", marginTop: 18, fontSize: 20}}> £</Text>
                  <TextInput
                      style={{height: 40, borderBottomColor: "gray", borderWidth: 0.3, color: "#DAA520", width: Dimensions.get("window").width * 0.3, marginLeft: 10, fontWeight: "300", fontSize: 20}}
                      keyboardType='numeric'
                      textAlign={'center'}
                      value = {this.state.bet}
                      placeholder = {this.state.bet.toString()}
                      placeholderTextColor= "#DAA520"
                      onChangeText = {(number) => this.setState({bet: number})} 
                  />
                  <View style = {{justifyContent: "space-around", marginTop: 8, marginLeft: 15, flexDirection:"row"}}>
                        <TouchableOpacity 
                          style = {{padding: 2, borderColor:"gray", borderWidth: 0.3, paddingTop: 1, paddingBottom: 1, marginRight: 3, borderRadius: 5}}
                          onPress = {this.changeBetAmount.bind(this)}
                        >
                            <Text style = {{color: "#00B073", fontSize: 20}}> - </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style = {{padding: 2, borderColor:"gray", borderWidth: 0.3, paddingTop: 1, paddingBottom: 1, borderRadius: 5}}
                          onPress = {this.changeBetAmount.bind(this, "Plus")}
                         >
                            <Text style = {{color: "#00B073", fontSize: 20}}> + </Text>
                        </TouchableOpacity>
                  </View>
                </View>
              </View>

               <Text style = {{color: "gray", fontStyle: "oblique", fontWeight:"400", marginBottom: -25, marginTop: 10, marginLeft: 17}}>QUOTES</Text>
              {this.gameType(game, position)}

            </View>
        );
  }

  render(){
      console.log(this.state.fq, this.state.sq)
      console.log(this.state.bet);
      let button;
        button = this.props.coins >= 50 ? <TouchableOpacity
                    style = {styles.buttonContainer}
                    onPress = {this.postRequest.bind(this)}
                    >
                    <Text style = {[styles.layBet, {fontSize: 19}]}> Place bet</Text>
                  </TouchableOpacity> : <Text style = {[styles.buttonDisableContainer, {fontSize: 15, backgroundColor: "transparent", color: "white", bottom: 14, textAlign: "center"}]}> You need at least 50 coins to make a bet :(</Text>

    return(
         <View style = {{flex: 1, backgroundColor: "#161616"}}>
          <View style ={{marginBottom: 7}}>
            <View style = {styles.info}>
              <TouchableOpacity style = {styles.closeModal} onPress  = {this.props.visible}>
                <Text style = {{color: "#00B073", fontSize: 21}}>
                  X
                </Text>
              </TouchableOpacity>
              <Text style = {{color: "#DAA520", marginTop: 12, marginRight: 19}}> {this.props.coins}  <FontAwesome>{Icons.database}</FontAwesome></Text>
            </View>
          </View>
    
          {this.betFilter()}
          
           <Text style = {{color: "gray", fontStyle: "oblique", fontWeight:"400", marginTop: 15, marginLeft: 17}}>SEND THIS BET TO:</Text>
          <Modal
            style={{ flex: 1}}
            isVisible={this.state.showFriends}
            backdropOpacity = {0.95}
          >
            <FriendsModal
                hideShow = {this.friendsModal.bind(this)} opponent = {this.state.opponent}
                selectOpponent = {this.selectOpponent.bind(this)} betfriends = {this.state.betfriends}
                currentUser = {this.props.currentUser}
            />
          </Modal>

          <View style = {{flexDirection:"row", justifyContent: "space-around", marginTop: 25}}>
            <TouchableOpacity 
              style = {this.state.publicBet ? styles.choiceButtonSelected : styles.choiceButton}
              onPress = {() => this.setState({publicBet: true, opponent: ""})}
            >
                <Text style = {{color: "white"}}>Public Bet <FontAwesome>{Icons.users}</FontAwesome></Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style = {this.state.publicBet ? styles.choiceButton : styles.choiceButtonSelected}
                onPress = {this.getFriends.bind(this)}
            >
                <Text style = {{color: "white"}}>{this.state.opponent || "Betfriend"} <FontAwesome>{Icons.user}</FontAwesome></Text>
            </TouchableOpacity>
          </View>

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
    marginBottom: 5,
    padding: 15,
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 7
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
  },
  buttonDisableContainer: {
    backgroundColor: "gray",
    padding: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  card: {
    selfAlign: "center",
    marginTop: 100,
    padding: 15,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: "#161616",
    margin: 15,
    borderRadius: 7,
    borderColor:"gray",
    borderWidth:0.3
  },
  choiceButton: {
    borderRadius: 5, padding: 10,
    borderColor:"gray", borderWidth: 0.3,
  },
  choiceButtonSelected: {
    borderRadius: 5, padding: 10,
    borderColor:"gray", borderWidth: 0.3,
    backgroundColor: "#00B073",
  },
  expText: {
    fontSize: 20, color: "#ffff",
    textAlign: "center",
  },
  tradeCard: {
    margin: 10,  
    shadowColor: "black",
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: "black",
    padding: 25, borderRadius: 5,
  },
  positiveQuote: {
    color: "white", marginRight: 16, marginTop: 4, color: "#00B073" 
  },
  negativeQuote: {
    color: "white", marginRight: 16, marginTop: 4, color: "#ff4d4d" 
  }
};

export default BetModal;
