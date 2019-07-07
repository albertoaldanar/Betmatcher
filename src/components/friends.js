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
import UserCard from "../reusable/userCard";
import Modal from "react-native-modal";
import User from "../constants/user";
import Url from "../constants/url";


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
      directBets: {}
    }
  }

  componentDidMount(){
    return this.getData()
  }

  cardModal(){
    this.setState({userCard: !this.state.userCard})
  }
  searchModal(){
    this.setState({searchModal: !this.state.searchModal})
  }

  getUser(user){
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
          this.setState({userSelected: jsonRes.user, userCard: !this.state.userCard, profile: jsonRes.user.profile, friendAnalysis: jsonRes.result})
        }
      })
      .catch(error => console.log(error));
  }

  deleteRequest(bfrequest){
      return fetch(`http://${Url}:8000/decline_request`, {
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
        this.getData(1)
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

    switch(index){
      case 0:
        return this.betfriendList(betfriends || [])
        break;

      case 1:
        if(requestsIndex){
          return this.requestsList(receivedRequests || [])
        } else {
          return this.requestsList(sentRequests || [])
        }
        break;

      case 2:
        return this.directBetCard(directBets || [])
        break;
    }
  }

  betfriendList(data){
      let currentUser = this.props.navigation.state.params.currentUser;

      return data.map((item, index) => {
        const users = [item.user_a.username, item.user_b.username];
        const friend = users.filter(user => user!= currentUser);

        return(
          <View key = {index}>
            <View style = {styles.tableStyle}>
              <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                <View style= {{flexDirection:"row"}}>
                  <Image
                    source = {{uri: User.image}}
                    style = {styles.image}
                  />
                  <View>
                    <Text style = {{ marginTop: 10, color: "#ffff", fontSize: 15, fontWeight: "300", color: "white"}}>{friend}</Text>
                    <Text style = {{ marginTop: 5, color: "gray", fontSize: 12, fontWeight: "300", color: "gray"}}> <FontAwesome>{Icons.mapMarker}</FontAwesome> {item.user_b.profile.country} </Text>
                  </View>
                </View>
                <TouchableOpacity onPress ={this.getUser.bind(this, friend)}>
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
                      source = {{uri: item.image}}
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
        <View style = {{margin: 5, padding: 5}}>
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

             <Text style = {{color: "#DAA520", fontSize: 13, fontWeight: "600"}}>{db.amount} £</Text>
            </View>
        </View>
      );
    })
  }

  render(){
    const {userSelected, profile, friendAnalysis, index} = this.state;
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
      <LinearGradient style= {{flex: 1}} start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "#161616", "gray"]}>
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
          { index == 1 ?
            <View style = {{flexDirection: "row", justifyContent: "space-around", marginTop: 30}}>
              <Text style = {{color: "white"}}> Sent </Text>
              <Switch
                style={{alignSelf: "center"}}
                onValueChange = {()=> this.setState({requestsIndex: !this.state.requestsIndex})}
                value = {this.state.requestsIndex}
                trackColor = {{false: "transparent", true: "transparent"}}
              />
              <Text style = {{color: "white"}}> Received </Text>
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
              profile = {profile} isFriend ={friendAnalysis}
            />
          </Modal>

          <Modal
              style={{ flex: 1, position: "relative" , margin: 50, marginLeft: 25, marginRight: 25}}
              isVisible={this.state.searchModal}
              backdropOpacity = {0.45}
          >
            <UserSearch
              closeModal = {this.searchModal.bind(this)}
              getUser = {this.getUser.bind(this)} currentUser = {currentUser}
              myFriends = {myFirends} bfrequests = {this.state.friendRequests}
            />
          </Modal>

          {addButton}
      </LinearGradient>
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
}


export default Friends;
