import React, {Component} from "react";
import {View, Text, TouchableOpacity, Modal, Image, LayoutAnimation, AsyncStorage, Alert} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {NavigationActions} from "react-navigation";
import YouHaveMatch from "./youHaveMatch";
import LinearGradient from "react-native-linear-gradient";
import Url from "../constants/url";
import Moment from "moment";
import NumberFormat from 'react-number-format';
import OneSignal from 'react-native-onesignal';

class ConfirmBet extends Component{

  constructor(props){
    super(props);
    this.state = {
      visible: false,
      currentUser: "",
      currentCoins: 0,
      userCard: false,
      userSelected: {},
      profile: [],
      friendAnalysis: null, userID: null
    }
  }

  async componentDidMount(){
      this._isMounted = true;

      const usernameGet = await AsyncStorage.getItem('username');
        if (usernameGet) {
          this.setState({ currentUser: usernameGet});
        } else {
          this.setState({ currentUser: false });
      }

      const userIDGET = await AsyncStorage.getItem('userID');
      this.setState({ userID: userIDGET });


      const getCoins = await AsyncStorage.getItem('coins');
      this.setState({ currentCoins: Number(getCoins)});
  }

  getUser(user){

      return fetch(`http://${Url}:8000/user_info?user=${user}&current_user=${this.state.currentUser}`, {
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

  analyseQuotes(myQuote){
    const {user, game, teamSelected, teamsNotSelected, quote, bet} = this.props.navigation.state.params;
    var finalQuote = quote < 0 ? quote * -1 : quote;
    var ADQuote = Math.round((finalQuote / 100) * user.amount);
    // Refactorizar esto
    const AD = quote > 0 ? [0, ADQuote] : [ADQuote, 0];

    let betDeal = AD[0] == 0 ? bet - AD[1] : bet;

    const result = myQuote == "total" ? ((betDeal * 2) + (AD[0] + AD[1])) : betDeal + AD[0];


    return result;
  }

  sendNotificationToOpponent(){
         const {user, game, teamSelected, teamsNotSelected, quote, bet, sentFrom} = this.props.navigation.state.params;

         const deviceForNotification = user.back_user.profile.notification_token;
         const notificationMessage = `You have a match for ${event.local.name} vs ${event.visit.name}`;

         return fetch(`https://onesignal.com/api/v1/notifications/`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
              "app_id": "59f7fce2-a8c6-49ef-846e-bd95e45bf8b7",
              "include_player_ids": ["958aea8a-8029-4953-8f5d-6acfed19373e"],
              "headings": {"en": "You have a Match!"},
              // "data": {"foo": "bar"},
              "contents": {"en": notificationMessage}

            })
        });
  }

  postMatch(){
    // let {currentUser, game, team} = this.props;
    const {user, game, teamSelected, teamsNotSelected, quote, bet, sentFrom} = this.props.navigation.state.params;
    let event = sentFrom == "Direct" ? game : game.data;

    const total = this.analyseQuotes("total");
    const layAmount = this.analyseQuotes("myTotal");

    var totalAmount = user.amount * (quote / 100);

    return fetch(`http://${Url}:8000/post_match/`, {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
      },
      body: JSON.stringify({
        back_user: user.back_user.username, back_team: teamsNotSelected || "Draw",
        lay_user: this.state.currentUser, lay_team: teamSelected,
        amount: total, event: event.name, request: user.id, quote: totalAmount,
        traded: layAmount
      })
    })
    .then(res => res.json())
    .then(jsonRes => {
      console.log(jsonRes)
      if(jsonRes.match){
         this.setState({visible: !this.state.visible});
      }
    })
    .catch(error => console.log(error));

     this.setState({visible: !this.state.visible})
  }

  sendToMatches(){

         const {user, game, teamSelected, teamsNotSelected, quote, bet, sentFrom} = this.props.navigation.state.params;

         let event = sentFrom == "Direct" ? game : game.data;

         const deviceForNotification = user.back_user.profile.notification_token;
         const notificationMessage = `You have a match for ${event.local.name} vs ${event.visit.name}`;


        const navigateAction = NavigationActions.navigate({
                routeName: "Match",
                params: {refreshing: true}
        });

        this.props.navigation.dispatch(navigateAction);

        return fetch(`https://onesignal.com/api/v1/notifications/`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
              "app_id": "59f7fce2-a8c6-49ef-846e-bd95e45bf8b7",
              "include_player_ids": ["7eb78884-104d-43c4-9ec3-5d78a3e6e425"],
              "headings": {"en": "You have a Match!"},
              "contents": {"en": notificationMessage}

            })
        });
  }

  isMatchable(){
    const myTotal = this.analyseQuotes("myTotal");
    const {coins} = this.props.navigation.state.params;

    if(coins < myTotal){
      return(
        <View style = {[styles.buttonMatch, {backgroundColor: "transparent", bottom: 15}]}>
          <Text style = {{color: "#ffff", alignSelf:"center"}}> You need more coins to match this bet, sorry :(</Text>
        </View>
      );
    } else {
      return(
        <TouchableOpacity style = {styles.buttonMatch} onPress = {this.postMatch.bind(this)}>
          <Text style = {{color: "#ffff", alignSelf:"center"}}>MATCH THIS BET</Text>
        </TouchableOpacity>
      )
    }
  }

  render(){
    const {user, game, teamSelected, teamsNotSelected, quote, bet, sentFrom} = this.props.navigation.state.params;
    console.log("ID:", this.state.userID);

    var finalQuote = quote < 0 ? quote * -1 : quote;
    var ADQuote = Math.round((finalQuote / 100) * user.amount);
    // Refactorizar esto
    const AD = quote > 0 ? [0, ADQuote] : [ADQuote, 0];

    let event = sentFrom == "Direct" ? game : game.data;

    betDeal = AD[0] == 0 ? bet - AD[1] : bet;


    const total = this.analyseQuotes("total");
    const layAmount = this.analyseQuotes("myTotal");

    var totalAmount = user.amount * (quote / 100);

    console.log(total, layAmount, totalAmount);

    return(
      <LinearGradient style= {{flex: 1}} start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "#161616", "gray"]}>
        <View style = {styles.space}>
            <View style = {styles.card}>
              <Image source= {{uri: event.sport.img}} style = {{width: 60, height: 60, marginTop:5, marginRight: 10}}/>

              <View>
                <Text style = {styles.text}>{event.league.name}</Text>
                <Text style = {[styles.text, {fontWeight: "300", fontSize: 11, fontStyle: "oblique" , marginBottom: 5}]}>{Moment(event.date).endOf("day").fromNow()}</Text>
                <View style = {{flexDirection: "row"}}>
                  <Text style = {styles.word}>{game.local.name}</Text>
                  <Text style = {[styles.word, {fontStyle: "oblique"}]}>VS.</Text>
                  <Text style = {styles.word}>{game.visit.name}</Text>
                </View>
              </View>
            </View>
        </View>

        <View style = {{marginTop: 8}}>
          <Text style = {styles.title}>Bet confirmation</Text>

          <View style = {styles.betInfo}>
            <View style = {[styles.singleUser, {backgroundColor: "#161616"}]}>
              <View style = {styles.info}>
                  <Text style = {styles.userName}>You</Text>
                  <Text style = {[styles.secondText, {fontWeight: "bold", fontSize: 15, textAlign: "left"}]}>{teamSelected}</Text>
                  <Text style = {styles.secondText}>Bet: {betDeal}</Text>
                  <Text style = {[styles.secondText, {marginBottom: 8}]}>AD: {AD[0]}</Text>
              </View>

              <Text style = {{marginTop: 12, color: "#DAA520"}}>TOTAL: {betDeal + AD[0]}  <FontAwesome>{Icons.database}</FontAwesome></Text>
            </View>

            <Text style = {styles.vs}>VS.</Text>

            <View style = {[styles.singleUser, {backgroundColor: "transparent"}]}>
              <View style = {styles.info}>
                  <Text style = {styles.userName}>{user.back_user.username}</Text>
                  <Text style = {[styles.secondText, {fontWeight: "bold", fontSize: 15, textAlign: "left"}]}>{teamsNotSelected || "Draw"}</Text>
                  <Text style = {[styles.secondText, {textAlign: "left"}]}>Bet: {betDeal}</Text>
                  <Text style = {[styles.secondText, {marginBottom: 8, textAlign: "left"}]}>AD: {AD[1]}</Text>
              </View>

              <Text style = {{marginTop: 12, color: "#DAA520"}}>TOTAL: {betDeal + AD[1]}  <FontAwesome>{Icons.database}</FontAwesome></Text>
            </View>
          </View>
        </View>

        <Text style = {{marginTop: 40, alignSelf: "center", color: "gray", fontStyle: "oblique"}}>Betmatcher will charge 2% of commission to winner</Text>

        {this.isMatchable()}

        <Modal
          animationType = "slide"
          visible = {this.state.visible}
        >

          <YouHaveMatch
            postMatch = {this.postMatch.bind(this)}
            sendToMatches = {this.sendToMatches.bind(this)}
            user = {user}
            total = {this.analyseQuotes("total")}
            teamSelected = {teamSelected}
            teamsNotSelected = {teamsNotSelected}
          />
        </Modal>
      </LinearGradient>
    );
  }
}

const styles ={
  container: {
    flex: 1,
    backgroundColor: "#161616",
  },
  title: {
    color:"#ffff",
    fontSize: 15,
    fontWeight: "700",
    margin: 10,
    color: "#00B073"
  },
  icon: {
    fontSize: 60,
    color: "gray",
    marginLeft: 5,
    marginRight: 15
  },
  card: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    paddingTop: 8,
    paddingBottom: 8,
  },
   text: {
    color: "#ffff",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 7,
  },
  secondText: {
    color: "#ffff",
    fontSize: 15,
    fontWeight: "300",
    marginTop: 13,
    textAlign: "right",
    paddingBottom: 5
  },
  game: {
    flexDirection:"row",
  },
  word: {
    color: "white",
    marginRight: 10,
    fontSize:15,
    fontWeight: "bold"
  },
  betInfo:{
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  singleUser: {
    flexDirection: "column",
    padding: 20,
    borderRadius: 3,
  },
  userName: {
    color: "#00B073",
    fontWeight: "500",
    fontSize: 21,
    marginBottom: 5,
    alignSelf:"center"
  },
  vs: {
    fontWeight: "300",
     fontSize: 10,
     color:"#ffff",
     fontStyle: "oblique",
     marginTop: 70,
     fontSize: 15
  },
  info: {
    alignSelf: "flex-start",
    paddingLeft: -10,
    borderBottomWidth: 2,
    borderBottomColor: "gray"
  },
  buttonMatch: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#00B073",
    padding: 15,
  }
}

export default ConfirmBet;
