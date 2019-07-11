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
      publicBet: false,
      infoModal: false,
      betfriends: [],
      fq: qts[0],
      sq: qts[1]
    }
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

  setCoins(value){
    this.setState({bet: value})
  }

  friendsModal(){
    this.setState({showFriends: !this.state.showFriends})
  }

  selectOpponent(value){
    this.setState({ opponent: value, showFriends: false })
  }


  multiSliderValuesChange = (values) => {
      this.setState({
          values
      });
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
      return Alert.alert("Can´t send bet", `You don´t have ${this.state.bet} coins, sorry :( `, [{text: 'Continue', onPress: this.props.sendToMatchFromLay}])
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
    let {bet} = this.state;
    const {teamsNotSelected} = this.props;

   if(game.data.sport.name == "Soccer"){
      return(
          <View style = {{marginTop: 35}}>
            <View style = {{flexDirection:"row", justifyContent:"space-between", padding: 10, borderBottomColor: "gray", borderBottomWidth:0.5, borderTopColor: "gray", borderTopWidth:0.5}}>
              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginLeft: 5, borderBottomWidth: 1, borderBottomColor: "gray", fontStyle: "oblique"}}> IF MATCH</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, marginTop: 22, fontSize: 15, padding: 8 }}>{teamsNotSelected[0].name} </Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, marginTop: 22, fontSize: 15, padding: 8 }}>{teamsNotSelected[1].name} </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400", fontStyle: "oblique"}}>QUOTES</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>
                  {teamsNotSelected[0].quotes[position] } %  {teamsNotSelected[0].quotes[position] > 0 ? <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome>: <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>}
                </Text>

                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8}}>
                  {teamsNotSelected[1].quotes[position]} %  {teamsNotSelected[1].quotes[position] > 0 ? <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome>: <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>}
                </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5, fontStyle: "oblique"}}>YOU CAN WIN</Text>
                <Text style = {{color: "#DAA520", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>{ Math.round((teamsNotSelected[0].quotes[position] / 100) * bet + (bet * 2) )}  <FontAwesome> {Icons.database} </FontAwesome> </Text>
                <Text style = {{color: "#DAA520", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>{ Math.round((teamsNotSelected[1].quotes[position] / 100) * bet + (bet * 2) )}  <FontAwesome> {Icons.database} </FontAwesome> </Text>
              </View>

            </View>
          </View>
      );
    } else {
      return(
        <View style = {{marginTop: 35}}>
            <View style = {{flexDirection:"row", justifyContent:"space-between", padding: 10, borderBottomColor: "gray", borderBottomWidth:0.5, borderTopColor: "gray", borderTopWidth:0.5}}>
              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5, alignSelf:"center", fontStyle: "oblique"}}>OPPONENT</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, marginTop: 22, fontSize: 15, padding: 8 }}>{teamsNotSelected[0].name} </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5, fontStyle: "oblique"}}>QUOTE</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>
                  {teamsNotSelected[0].quotes } %  {teamsNotSelected[0].quotes > 0 ? <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome>: <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>}
                </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5, fontStyle: "oblique"}}>YOU CAN WIN</Text>
                <Text style = {{color: "#DAA520", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>{ Math.round((teamsNotSelected[0].quotes / 100) * bet + (bet * 2) )}  <FontAwesome> {Icons.database} </FontAwesome> </Text>
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
                <View style = {{flexDirection:"row", alignSelf: "center", marginTop: 5, marginBottom:20}}>
                  <Text style = {styles.layBet}>Set your bet for: </Text>
                  <Text style = {[styles.layBet, {marginLeft: 5, color: "#00B073", fontSize: 17}]}>{this.props.team.name}</Text>
                </View>

                <Text style = {{alignSelf: "center", color: "#DAA520", fontSize: 25, marginTop: 5, fontWeight: "300"}}>{this.state.bet}  <FontAwesome>{Icons.database}</FontAwesome></Text>

                <Slider
                  step= {10}
                  style ={{marginLeft: 15, marginRight: 15, marginTop: 15}}
                  maximumValue={Number(coins)}
                  minimumValue = {50}
                  thumbTintColor = "#00B073"
                  minimumTrackTintColor = "#00B073"
                  onValueChange={this.setCoins.bind(this)}
                  value={this.state.bet}
                  thumbStyle ={{color: "#00B073"}}
                />
              </View>

              {this.gameType(game, position)}

              <Text style = {{color: "gray", fontSize: 11, marginTop: 30, alignSelf: "center"}}> SEND THIS BET TO: </Text>

              <View style = {{marginTop: 20, flexDirection:"row", justifyContent:"space-around"}}>
                <TouchableOpacity style= {this.state.publicBet ? styles.choiceButtonSelected : styles.choiceButton} onPress = {() => this.setState({publicBet: true, opponent: ""})}>
                  <Text style = {{color:"white", marginRight: 3, alignSelf:"center", fontSize: 13}}>Public bet  <FontAwesome>{Icons.users}</FontAwesome></Text>
                </TouchableOpacity>

                <Text style = {{color: "gray", fontSize: 15, marginTop: 7}}> or </Text>

                <TouchableOpacity style= {this.state.opponent == "" ? styles.choiceButton : styles.choiceButtonSelected} onPress = {this.getFriends.bind(this)}>
                  <Text style = {{color:"white", marginRight: 3, alignSelf:"center", fontSize: 13}}> {this.state.opponent || "Betfriend"}  <FontAwesome>{Icons.user}</FontAwesome></Text>
                </TouchableOpacity>
              </View>
            </View>
        );
  }

  render(){
      console.log(this.state.fq, this.state.sq)
      let button;
        button = this.props.coins > 50 ? <TouchableOpacity
                    style = {this.state.opponent != "" || this.state.publicBet ? styles.buttonContainer : styles.buttonDisableContainer}
                    disabled = {this.state.opponent != "" || this.state.publicBet ? false : true}
                    onPress = {this.postRequest.bind(this)}
                    >
                    <Text style = {[styles.layBet, {fontSize: 19}]}> Place bet</Text>
                  </TouchableOpacity> : <Text style = {[styles.buttonDisableContainer, {fontSize: 15, backgroundColor: "transparent", color: "white", bottom: 14, textAlign: "center"}]}> You need at least 50 coins to make a bet :(</Text>

    return(
         <LinearGradient  style = {{flex: 1}} start={{x: 0, y: 0}} end={{x: 4 , y: 1}} colors = {[ "black", "gray"]}>
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


          <Modal
            style={{ flex: 1, position: "relative" }}
            isVisible={this.state.infoModal}
            backdropOpacity = {0.9}
          >
          {this.dataAnalysis()}

          </Modal>

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
  }
};

export default BetModal;
