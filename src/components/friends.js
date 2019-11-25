import React, {Component} from "react";
import {View, Text, Dimensions, TouchableOpacity, ScrollView, Image, Alert, Switch} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome, {Icons} from "react-native-fontawesome";
import { YAxis, Grid } from 'react-native-svg-charts';
import UserList1 from "../constants/userList1";
import MaterialTabs from "react-native-material-tabs";
import SquareGrid from "react-native-square-grid";
import UserSearch from "../reusable/userSearch";
import Card from "../reusable/card";
import MatchDirect from "../reusable/matchDirect";
import UserCard from "../reusable/userCard";
import Modal from "react-native-modal";
import User from "../constants/user";
import Url from "../constants/url";
import { NavigationActions } from "react-navigation";
import OneSignal from 'react-native-onesignal';
import NumberFormat from 'react-number-format';

const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

class Friends extends Component{
  constructor(props){
    super(props);

    this.state = {
      index: 0,
      betfriends: [],
      receivedRequests: [],
      sentRequests: [],
      searchModal: false,
      userCard: false,
      userSelected: {},
      profile: [],
      friendAnalysis: null,
      requestsIndex: true,
      directBets: [],
      directBetModal: false,
      selectedBet: {},
      requestAnalysis: null, fromSearch: false
    }
  }

  componentDidMount(){
    return this.getData()
  }

  navigateToProfile(){
    this.setState({searchModal: false})

    const navigateAction = NavigationActions.navigate({
      routeName: "Profile",
    });
    this.props.navigation.dispatch(navigateAction);
    
  }

  sendToConfirmation(user, quote, bet, game, teamSelected, teamsNotSelected){
    // let game = this.props.navigation.state.params.par;
    // const gameType = game.sport == "Soccer" ? game.draw : "Draw"
    // const options = [game.local, game.visit, gameType];
    // const teamsNotSelected = options.filter(x => x.name!= this.state.teamSelected.name);
    // var index = this.state.index == 1 ? teamsNotSelected[1] : teamsNotSelected[0];

    const navigateAction = NavigationActions.navigate({
      routeName: "ConfirmBet",
      params: {
                user: user, game: game,
                teamSelected: teamSelected,
                quote: quote, bet: bet,
                teamsNotSelected: teamsNotSelected,
                sentFrom: "Direct",
              }
    });
    this.props.navigation.dispatch(navigateAction);
    this.setState({directBetModal: false})
  }

  declineBet(bet){
      return fetch(`http://${Url}:8000/decline_bet/`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          declined_id: bet.id
        })
      })
      .then(res => res.json())
      .then(jsonRes => {
        if(jsonRes == "Updated"){
          return this.getData();
        }
      })
      .catch(error => console.log(error));
  }



  declineBetAlert(bet){
      console.log(bet);

      Alert.alert(
          "Decline bet?",
          "Are you sure you want to decline this bet ?",
        [
          {text: 'Yes', onPress: this.declineBet.bind(this, bet)},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
        ],
        {cancelable: true},
      );
  }


  directBetModal(){
    this.setState({directBetModal: !this.state.directBetModal})
  }

  cardModal(){
    this.setState({userCard: false})
  }

  receivedOrSent(){
    this.setState({requestsIndex: !this.state.requestsIndex})
  }

  searchModal(){
    this.setState({
        searchModal: !this.state.searchModal, profile: [], 
        requestAnalysis: null, fromSearch: false, userSelected: {},
        friendAnalysis: null
    })
  }

  selectBet(value){
    this.setState({selectedBet: value, directBetModal: !this.state.searchModal})
  }

  getUser(user, card, fromSearch){
      let currentUser = this.props.navigation.state.params.currentUser;
      this._isMounted = true;

      return fetch(`http://${Url}:8000/user_info?user=${user}&current_user=${currentUser}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        }
      })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes)
        if(this._isMounted){
          this.setState({userSelected: jsonRes.user, userCard: card, profile: jsonRes.user.profile, friendAnalysis: jsonRes.friendship, requestAnalysis: jsonRes.requested, fromSearch: fromSearch})
        }
      })
      .catch(error => console.log(error));
  }

  deleteRequest(bfrequest){
      return fetch(`http://${Url}:8000/decline_request/`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          friend_request: bfrequest.id
        })
      })
      .then(res => res.json())
      .then(jsonRes => {
        this.getData()
      })
      .catch(error => console.log(error));
  }

  getData(){
      let currentUser = this.props.navigation.state.params.currentUser;
      this._isMounted = true;

      return fetch(`http://${Url}:8000/betfriends_data?current_user=${currentUser}`, {
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
            receivedRequests: jsonRes.received_requests,
            sentRequests: jsonRes.sent_requests,
            directBets: jsonRes.direct_bets
          })
        }
      })
      .catch(error => console.log(error));
  }

  createFriends(bfrequest){
      let currentUser = this.props.navigation.state.params.currentUser;

      return fetch(`http://${Url}:8000/create_friendship/`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
          friend_request: bfrequest.id, current_user: currentUser
        })
      })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes)
        if(jsonRes.friendship){
          return Alert.alert(
            "OK!",
            `Now you can bet against ${bfrequest.sent_by.username}`,
            [
              {text: 'Continue', onPress: this.getData.bind(this, 0)},
            ],
            {cancelable: false},
          );
        }
      })
      .catch(error => alert(error));
  }

  handleIndexChange(index){
    this.setState({index})
  }

  choseView(){
    const {index, betfriends, receivedRequests, requestsIndex, sentRequests, directBets} = this.state;

    const betfriendsOrMessage = betfriends.length > 0 ? this.betfriendList(betfriends || []) : <Text style = {{color: "gray", marginTop: 35, alignSelf: "center", fontSize: 18}}> You have no betfriends</Text>
    const directBetsOrMessage = directBets.length > 0 ? this.directBetCard(directBets || []) : <Text style = {{color: "gray", marginTop: 35, alignSelf: "center", fontSize: 18}}> You don´t have direct bets requests</Text>
    const receivedOrMessage = receivedRequests.length > 0 ? this.requestsList(receivedRequests || []) : <Text style = {{color: "gray", marginTop: 35, alignSelf: "center", fontSize: 18}}> You haven´t received any betfriend request</Text>
    const sentOrMessage = sentRequests.length > 0 ? this.requestsList(sentRequests || []) : <Text style = {{color: "gray", marginTop: 35, alignSelf: "center", fontSize: 18}}> You haven´t sent any friend request</Text>

    switch(index){
      case 0:
        return betfriendsOrMessage
        break;

      case 1:
        if(requestsIndex){
          return receivedOrMessage
        } else {
          return sentOrMessage
        }
        break;

      case 2:
        return directBetsOrMessage
        break;
    }
  }

  betfriendList(data){
      let currentUser = this.props.navigation.state.params.currentUser;

      return data.map((item, index) => {
        const users = [item.user_a.username, item.user_b.username];
        const friend = users.filter(user => user!= currentUser);
        
        const country = item.user_a.username == currentUser ? item.user_b.profile.country : item.user_a.profile.country;

        return(
          <View key = {index}>
            <View style = {styles.tableStyle}>
              <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                <View style= {{flexDirection:"row"}}>
                  <Image
                    source = {{uri: "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png"}}
                    style = {styles.image}
                  />
                  <View>
                    <Text style = {{ marginTop: 10, color: "#ffff", fontSize: 15, fontWeight: "300", color: "white"}}>{friend}</Text>
                    <Text style = {{ marginTop: 5, color: "gray", fontSize: 12, fontWeight: "300", color: "gray"}}> <FontAwesome>{Icons.mapMarker}</FontAwesome> {country} </Text>
                  </View>
                </View>
                <TouchableOpacity onPress ={this.getUser.bind(this, friend, true, false)}>
                  <FontAwesome style = {{color: "gray", alignItems: "center", padding: 10, fontSize: 20}}>{Icons.eye}</FontAwesome>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })
  }

  requestsList(data){
        return data.map((item, index) => {
   
          return(
            <View key = {index}>
              <View style = {styles.tableStyle}>
                <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                  <View style= {{flexDirection:"row"}}>
                    <Image
                      source = {{uri: "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png"}}
                      style = {styles.image}
                    />
                    <View>
                      <Text style = {{ marginTop: 10, color: "#ffff", fontSize: 15, fontWeight: "300", color: "white"}}>{ this.state.requestsIndex ? item.sent_by.username : item.received_by.username}</Text>
                      <Text style = {{ marginTop: 5, color: "gray", fontSize: 12, fontWeight: "300", color: "gray"}}> <FontAwesome>{Icons.mapMarker}</FontAwesome> {this.state.requestsIndex ? item.sent_by.profile.country : item.received_by.profile.country} </Text>
                    </View>
                  </View>
                  {this.state.requestsIndex ?
                    <View style = {{position: "absolute", right: 5, flexDirection: "row", top: 10}}>
        
                      <TouchableOpacity style = {{padding: 5, borderRadius: 5, backgroundColor: "#00B073", alignSelf: "center"}} onPress = {this.createFriends.bind(this, item)}>
                        <Text style= {{alignSelf: "center", color: "white"}}>Accept</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style = {{padding: 5, borderRadius: 5, backgroundColor: "red", alignSelf: "center", marginLeft: 4}} onPress = {this.deleteRequest.bind(this, item)}>
                        <Text style= {{alignSelf: "center", color: "white"}}>Decline</Text>
                      </TouchableOpacity>
                    </View> :

                    <View style = {{position: "absolute", right: 5, flexDirection: "row", top: 10}}>
                      <View style = {{padding: 5, borderRadius: 5, backgroundColor: "transparent", alignSelf: "center", marginLeft: 4}}>
                        <FontAwesome style= {{alignSelf: "center", color: "white", fontSize: 20}}> {Icons.hourglassStart}</FontAwesome>
                      </View >
                    </View>
                  }

                </View>
              </View>
            </View>
          );
        })
  }

  directBetCard(data){
    const {directBets} = this.state;

    return directBets.map(db => {
      return(
        <View style = {{margin: 10, marginBottom: 20, paddingBottom: 20, borderBottomWidth:0.3, borderBottomColor: "gray", paddingLeft: 15, paddingRight: 15}}>
            <View style = {{flexDirection: "row", justifyContent: "space-between"}}>

              <View>
                <View style = {{flexDirection: "row"}}>
                  <Text style = {[styles.league, {marginRight: 5}]}>{db.event.sport.name}</Text>
                  <FontAwesome style = {{color: "#ffff", fontSize: 8, fontWeight: "400", marginTop: 3}}>{Icons.chevronRight}</FontAwesome>
                  <Text style = {[styles.league, {marginLeft: 5}]}>{db.event.league.name}</Text>
                </View>

                <View style = {[styles.game, {marginTop: 4}]}>
                    <Text style = {styles.word}>{db.event.local.name}</Text>
                    <Text style = {[styles.word, {fontStyle: "oblique", fontSize: 10, marginTop: 3}]}>VS.</Text>
                    <Text style = {styles.word}>{db.event.visit.name}</Text>
                </View>
              </View>

               <NumberFormat
                  value={db.amount}
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText= {value => <Text style = {{color: "#DAA520", fontSize: 13}}> {value}  <FontAwesome>{Icons.database}</FontAwesome></Text>}
                /> 
            </View>


            <View style = {{flexDirection: "row", justifyContent:"space-between", padding: 10, paddingLeft: 0, marginTop: 10, marginBottom: 10}}>
                <View style= {{flexDirection:"row"}}>
                  <Image
                    source = {{uri: "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png"}}
                    style = {styles.image}
                  />
                  
                  <View style = {{flexDirection:"row", paddingTop: 15}}>
                    <Text style = {{ marginTop: 2, color: "#ffff", fontSize: 15, fontWeight: "300"}}>{db.back_user.username} for </Text>
                    <Text style = {{ marginTop: 5, color: "#00B073", fontSize: 13, fontWeight: "300", fontStyle: "oblique", marginTop: 4}}>{db.back_team.toUpperCase()}</Text>
                  </View>
                </View>
            </View>

            <View style = {{justifyContent:"center", flexDirection:"row", marginTop: 10}}>
              <TouchableOpacity onPress = {this.selectBet.bind(this, db)} style = {{ borderRadius: 5, padding: 5, borderRadius: 5, borderColor:"#00B073", borderWidth:0.3, paddingLeft: 25, paddingRight: 30}}>
                <Text style = {{color: "#00B073", alignSelf: "center"}}>See bet  <FontAwesome style = {{fontSize: 19}}>{Icons.eye}</FontAwesome></Text>
              </TouchableOpacity>

              <TouchableOpacity onPress = {this.declineBetAlert.bind(this, db)} style = {{borderRadius: 5, padding: 5, borderRadius: 5, borderWidth:0.3, borderColor: "#D24D57", marginLeft: 10, paddingLeft: 25, paddingRight: 30}}>
                <Text style = {{color: "#D24D57", alignSelf: "center"}}> Decline  <FontAwesome style = {{fontSize: 19}}>{Icons.times}</FontAwesome></Text>
              </TouchableOpacity>
            </View>
        </View>
      );
    })
  }



  sendNotificationToOpponent(){
         // const {user, game, teamSelected, teamsNotSelected, quote, bet, sentFrom} = this.props.navigation.state.params;

         // const deviceForNotification = user.back_user.profile.notification_token;
         // const notificationMessage = "You have a match for {event.local.name} vs {event.visit.name}";

         return fetch(`https://onesignal.com/api/v1/notifications/`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
              "app_id": "59f7fce2-a8c6-49ef-846e-bd95e45bf8b7",
              "include_player_ids": ["bbd54913-1bbd-4d65-a917-ed1bab83b82f"],
              "headings": {"en": "You have a Match!"},
              "contents": {"en": "You have a match"}
            })
        });
  }


  render(){
    const {userSelected, profile, friendAnalysis, index, requestAnalysis, fromSearch, requestsIndex} = this.state;
    let currentUser = this.props.navigation.state.params.currentUser;
    console.log(this.state.directBets)

    const myFirends = this.state.betfriends.map(item => {
      const us = [item.user_a.username, item.user_b.username];
      const friends = us.filter(user => user!= currentUser);

      return friends

    });

    var addButton= this.state.index == 0 ?
          <TouchableOpacity style = {styles.addButton} onPress= {()=> this.setState({searchModal: true})}>
              <FontAwesome style = {{color: "white", alignItems: "center", padding: 10, fontSize: 20}}>{Icons.userPlus}</FontAwesome>
          </TouchableOpacity> :
          null

    var modalButton= this.state.friendAnalysis ?
              null : <TouchableOpacity style = {{margin: 15, backgroundColor: "#00B073", borderRadius: 5, marginTop: 10, alignSelf: "center", padding: 15, paddingTop: 8, paddingBottom: 8, marginBottom: 24}}>
                <Text style= {{fontSize: 17, color: "white", alignSelf: "center"}}> <FontAwesome> {Icons.userPlus} </FontAwesome> Add as friend</Text>
              </TouchableOpacity>


    return(
      <View style= {{flex: 1, backgroundColor: "#161616"}} >
          <MaterialTabs
                items={['Betfriends', "Requests", "Direct bets"]}
                indicatorColor ="#00B073"
                activeTextColor ="white"
                textStyle= {{fontSize: 12.5}}
                inactiveTextColor ="gray"
                barColor ="transparent"
                selectedIndex={this.state.index}
                onChange={index => this.setState({ index })}
          />

          <TouchableOpacity onPress = {this.sendNotificationToOpponent.bind(this)}>
            <Text style = {{color: "white"}}>SEND NOTIF</Text>
          </TouchableOpacity>

          { index == 1 ?
            <View style = {{flexDirection: "row", justifyContent: "space-around", marginTop: 30}}>
              <TouchableOpacity onPress= {this.receivedOrSent.bind(this)} style = {requestsIndex ? styles.activeButton : styles.offButton}>
                <Text style = {requestsIndex ? styles.activeText : styles.offText}>Received <FontAwesome style = {{fontSize: 19}}>{Icons.bell}</FontAwesome></Text>
              </TouchableOpacity>

              <TouchableOpacity onPress= {this.receivedOrSent.bind(this)} style = {requestsIndex ? styles.offButton : styles.activeButton}>
                <Text style = {requestsIndex ? styles.offText : styles.activeText}> Sent  <FontAwesome style = {{fontSize: 19}}>{Icons.paperPlane}</FontAwesome></Text>
              </TouchableOpacity>
            </View> :
            null
          }
          <ScrollView style = {{marginTop: 10}}>
            {this.choseView()}
          </ScrollView>

          <Modal
              style={{ flex: 1, position: "relative" , margin: 20}}
              isVisible={this.state.userCard}
              backdropOpacity = {0.65}
          >
            <UserCard
              closeModal = {this.cardModal.bind(this)} userSelected = {userSelected}
              profile = {profile} isFriend ={friendAnalysis} friendList= {true} 
            />
          </Modal>

          <Modal
              style={{ flex: 1, position: "relative" , margin: 50, marginLeft: 25, marginRight: 25}}
              isVisible={this.state.searchModal}
              backdropOpacity = {0.45}
          >
            <UserSearch
              closeModal = {this.searchModal.bind(this)} isFriend = {friendAnalysis} isRequested = {requestAnalysis}
              userSelected = {userSelected} profile = {profile}
              getUser = {this.getUser.bind(this)} currentUser = {currentUser} 
              fromSearch = {fromSearch}
              backToProfile = {this.navigateToProfile.bind(this)}
            />
          </Modal>

          <Modal
              style={{ flex: 1, margin: 0}}
              isVisible={this.state.directBetModal}
              backdropOpacity = {0.45}
              animationInTiming = {500}
          >
            <MatchDirect
              closeModal = {this.directBetModal.bind(this)}
              directBet = {this.state.selectedBet}
              currentUser = {currentUser}
              sendToConfirmation = {this.sendToConfirmation.bind(this)}
            />
          </Modal>

          {addButton}
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#161616",
    flex: 1
  },
  chart: {
    height: 200,
    width: Dimensions.get("window").width,
    flexDirection: "row",
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 5
  },
  user: {
    color: "#00B073",
    fontSize: 21,
    marginTop: 8
  },
  descript: {
    flexDirection:"row",
    justifyContent:"space-around"
  },
  explanation: {
    color: "gray",
    fontWeight: "400",
    marginBottom: 7
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginRight: 15,
    marginBottom: 10
  },
  tableStyle: {
    marginBottom: 5,
    padding: 15,
  },
  text: {
    color:"white", marginTop: 8,
    alignSelf: "center"
  },
  item: {
    flex: 1,
    alignSelf: "stretch",
    padding: 16
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  addButton: {
    padding: 10, borderRadius: 50, backgroundColor: "rgba(72, 221, 79, 0.5)" , position: "absolute", bottom: 30, right: 15,
    shadowOffset:{  width: 1,  height: 0.7,  },
    shadowColor: '#DCDCDC',
    shadowOpacity: 0.7,
  },
  league: {
    color: "#00B073",
    fontWeight: "bold",
    fontSize: 11
  },
  game: {
    flexDirection:"row"
  },
  word: {
    color: "white",
    marginRight: 6,
    fontSize: 13,
    fontWeight: "400"
  },
  image: {
    width: 55,
    height: 55,
    marginRight: 8,
  },
  activeButton: {
    borderRadius: 5, padding: 5, borderRadius: 5, 
    borderColor:"#00B073", borderWidth:0.3, backgroundColor: "#00B073",
    paddingLeft: 25, paddingRight: 30
  },
  offButton: {
    borderRadius: 5, padding: 5, borderRadius: 5, 
    borderColor:"white", borderWidth:0.3,
    paddingLeft: 25, paddingRight: 30
  },

  activeText: {
    color: "white", alignSelf: "center"
  },

  offText: {
    color: "gray", alignSelf: "center"
  }
}


export default Friends;
