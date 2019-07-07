import React, {Component} from "react";
import {View,Text, TouchableOpacity, Image, ScrollView, AsyncStorage, Dimensions, RefreshControl} from "react-native";
import Header from "../reusable/header";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Matches from "../constants/matches";
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";
import Chat from "../reusable/chat";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import MaterialTabs from "react-native-material-tabs";
import Url from "../constants/url";
import UserCard from "../reusable/userCard";
import Moment from "moment";

class Match extends Component{

  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      index: 0, chat: false, modal: false,
       matches: [], unmatched: [], finished: [],
       token: "", currentUser: "", userCard: false,
       friendAnalysis: [], userSelected: "", profile: [],
       refreshing: false, positionSelected: ""
     }

     // this.resultAnalysis = this.resultAnalysis.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getMatches(){
    this._isMounted = true;

    const usernameGet = await AsyncStorage.getItem('username');
        if (usernameGet) {
          this.setState({ currentUser: usernameGet});
        } else {
          this.setState({ currentUser: false });
    }

    const tokenGet = await AsyncStorage.getItem('token');
        if (tokenGet) {
          this.setState({ token: tokenGet});
        } else {
          this.setState({ token: false });
    }

      return fetch(`http://${Url}:8000/matches/`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": `Token ${this.state.token}`
        }
      })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes)
          this.setState({
            unmatchedBets: jsonRes.unmatched_bets,
            matchedBets: jsonRes.matched_bets,
            finishedBets: jsonRes.finished_bets,
            refreshing: false
          })
      })
      .catch(error => console.log(error));
  }

  componentDidMount(){
      return this.getMatches()
  }

  handleIndexChange(index){
    this.setState({index})
  }

  toggleModal(){
    this.setState({modal: !this.state.modal})
  }

  userCard(){
    this.setState({userCard: !this.state.userCard})
  }

  resultDisplay(item){
    const {currentUser} = this.state;
    if(currentUser == item.winner){
      return(
        <Text style = {{color: "#00B073", fontStyle: "oblique", fontWeight: "400"}} > <FontAwesome>{Icons.check}</FontAwesome>  WON</Text>
      );
    } else if(currentUser == item.looser){
      return(
        <Text style = {{color: "#D24D57", fontStyle: "oblique", fontWeight: "400"}} > <FontAwesome>{Icons.timesCircle}</FontAwesome>  LOST</Text>
      );
    } else {
      return(
        <Text style = {{color: "white", fontStyle: "oblique", fontWeight: "400"}} > <FontAwesome>{Icons.circle}</FontAwesome>  DRAW</Text>
      );
    }
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

  renderMatches(data){
    return data.map(item => {
      const order = this.state.currentUser == item.back_user.username ? [["You", item.back_team], [item.lay_user.username, item.lay_team]] : [["You", item.lay_team], [item.back_user.username, item.back_team]]
      console.log(item);

        return (
          <View style = {{marginTop: 7}}>
          <Card style = {[styles.card, {backgroundColor: "transparent", borderColor: "gray", borderWidth: 0.3} ]}>

              <View style = {{justifyContent: "space-between", flexDirection:"row"}}>
                <View>
                    <View style = {{flexDirection: "row"}}>
                      <Text style = {[styles.league, {marginRight: 5}]}>{item.event.sport.name}</Text>
                      <FontAwesome style = {{color: "#ffff", fontSize: 8, fontWeight: "400", marginTop: 3}}>{Icons.chevronRight}</FontAwesome>
                      <Text style = {[styles.league, {marginLeft: 5}]}>{item.event.league.name}</Text>
                    </View>
                    <View style = {[styles.game, {marginTop: 4}]}>
                      <Text style = {styles.word}>{item.event.local.name}</Text>
                      <Text style = {[styles.word, {fontStyle: "oblique", fontSize: 10, marginTop: 3}]}>VS.</Text>
                      <Text style = {styles.word}>{item.event.visit.name}</Text>
                    </View>
                </View>

                <TouchableOpacity style = {{marginRight: 6, marginBottom: 10}}>
                  <FontAwesome style = {{fontSize: 30, color: "#00B073"}}>{Icons.comments}</FontAwesome>
                </TouchableOpacity>
              </View>

              <View style = {{display: "flex", flexDirection: "row", marginTop: 20, marginBottom: 15, justifyContent: "space-around"}}>
                    <View>
                      <Text style = {[styles.word, {fontSize: 15, alignSelf: "center", fontWeight: "bold"}]}>{order[0][0]}</Text>
                      <Text style = {[styles.word, {fontSize: 12, color: "gray", marginTop: 8, alignSelf: "center"}]}>{order[0][1]}</Text>
                    </View>


                    <Text style = {[styles.word, {fontStyle: "oblique", fontSize: 14, marginTop: 3}]}>VS.</Text>

                    <View>
                      <TouchableOpacity style = {{borderBottomWidth: 0.5, borderBottomColor: "white"}} onPress= {this.getUser.bind(this, order[1][0])}>
                        <Text style = {[styles.word, {fontSize: 15, alignSelf: "center"}]}>{order[1][0]}</Text>
                      </TouchableOpacity>
                      <Text style = {[styles.word, {fontSize: 12, color: "gray", marginTop: 8, alignSelf: "center"}]}>{order[1][1]}</Text>
                    </View>
              </View>

              <View style = {{borderTopWidth: 0.3, borderTopColor: "#DCDCDC", marginLeft: 6, marginRight: 6}}>
                <View style =  {{flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 5}}>

                  {item.event.is_finished || item.event.in_play ?
                      <Text style = {{color: "gray", fontSize: 16, fontWeight: "600", alignSelf: "center"}}>{item.event.score_local} - {item.event.score_visit}</Text>
                      : null
                  }

                  {item.event.in_play ?
                    <View style = {{flexDirection: "row"}}>
                      <Text style = {{color: "#D24D57", fontSize: 13, fontWeight: "600"}}> LIVE </Text>
                      <Image style={{width: 15, height: 15}} source={{uri: "https://images-na.ssl-images-amazon.com/images/I/41bOFc-Yt8L.png"}}/>
                    </View> : item.event.is_finished ? this.resultDisplay(item) :
                      <Text style = {{color: "gray", fontStyle: "oblique", fontWeight: "400", fontSize: 12}}> <FontAwesome>{Icons.calendar}</FontAwesome>  {Moment(item.event.date).endOf("day").fromNow()}</Text>
                  }
                  <View style = {{flexDirection: "row"}}>
                    <Text style = {{color: "gray", fontSize: 13, fontWeight: "600"}}> AMOUNT: </Text>
                    <Text style = {{color: "#DAA520", fontSize: 13, fontWeight: "600"}}>{item.amount} £</Text>
                  </View>
                </View>
              </View>
          </Card>
        </View>
        );
    });
  }


  unmatchedBets(data){
    return data.map(item => {
      const userOrder = item.event.local.name == item.back_team ? [item.back_user.username, "Wating"] : ["Wating", item.back_user.username];

      let requesType = item.is_public  ?
         <FontAwesome style= {{alignSelf: "center", color: "white", fontSize: 20}}> {Icons.hourglassStart}</FontAwesome>
        :   <View>
                <TouchableOpacity style = {{borderBottomWidth: 0.5, borderBottomColor: "white"}} onPress= {this.getUser.bind(this, item.opponent)}>
                    <Text style = {[styles.word, {fontSize: 15, alignSelf: "center"}]}>{item.opponent}</Text>
                </TouchableOpacity>
              <FontAwesome style= {{alignSelf: "center", color: "gray", fontSize: 12, marginTop: 9}}> {Icons.hourglassStart}</FontAwesome>
            </View>

      return(
        <View style = {{marginTop: 7}}>
          <Card style = {[styles.card, {backgroundColor: "transparent", borderColor: "gray", borderWidth: 0.3} ]}>

              <View style = {{flexDirection: "row"}}>
                <Text style = {[styles.league, {marginRight: 5}]}>{item.event.sport.name}</Text>
                <FontAwesome style = {{color: "#ffff", fontSize: 8, fontWeight: "400", marginTop: 3}}>{Icons.chevronRight}</FontAwesome>
                <Text style = {[styles.league, {marginLeft: 5}]}>{item.event.league.name}</Text>
              </View>

              <View style = {[styles.game, {marginTop: 4}]}>
                  <Text style = {styles.word}>{item.event.local.name}</Text>
                  <Text style = {[styles.word, {fontStyle: "oblique", fontSize: 10, marginTop: 3}]}>VS.</Text>
                  <Text style = {styles.word}>{item.event.visit.name}</Text>
              </View>

              <View style = {{display: "flex", justifyContent: "space-around", flexDirection: "row", marginTop: 20, marginBottom: 15}}>
                <View>
                  <Text style = {[styles.word, {fontSize: 15, alignSelf: "center"}]}>You</Text>
                  <Text style = {[styles.word, {fontSize: 12, color: "gray", marginTop: 8, alignSelf: "center"}]}>{item.back_team}</Text>
                </View>


                <Text style = {[styles.word, {fontStyle: "oblique", fontSize: 14, marginTop: 3}]}>VS.</Text>

                <View>
                  {requesType}
                </View>

              </View>

              <View style = {{borderTopWidth: 0.3, borderTopColor: "#DCDCDC", marginLeft: 6, marginRight: 6}}>
                <View style =  {{flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 5}}>
                  <Text style = {{color: "gray", fontStyle: "oblique", fontWeight: "400", fontSize: 12}}> <FontAwesome>{Icons.calendar}</FontAwesome>  {Moment(item.event.date).endOf("day").fromNow()}</Text>
                  {item.is_public  ? <Text style = {{color: "#00B073", fontSize: 13, fontWeight: "400", fontStyle: "oblique"}}> Public bet </Text> : <Text style = {{color: "#00B073", fontSize: 13, fontWeight: "600"}}> Private bet </Text>}
                  <View style = {{flexDirection: "row"}}>
                    <Text style = {{color: "gray", fontSize: 13, fontWeight: "600"}}> BET: </Text>
                    <Text style = {{color: "#DAA520", fontSize: 13, fontWeight: "600"}}>{item.amount} £</Text>
                  </View>
                </View>
              </View>
          </Card>
        </View>
      );
    })
  }

  choseView(){
    const {index, unmatchedBets, matchedBets, finishedBets} = this.state;

    switch(index){
      case 0:
        return this.renderMatches(matchedBets || [])
        break;

      case 1:
        return this.unmatchedBets(unmatchedBets || [])
        break;

      case 2:
        return this.renderMatches(finishedBets || [])
        break;
    }
  }

  render(){
    console.log(this.state.unmatchedBets);
    const {userSelected, profile, friendAnalysis} = this.state;
    console.log(this.state.positionSelected)

    return(
      <View style = {styles.container}>
        <View style = {{marginTop: 25}}>
          <View style = {{marginBottom: 12}}>
            <MaterialTabs
                items={['Matches', "Unmatched", "Finished"]}
                indicatorColor ="#00B073"
                activeTextColor ="white"
                textStyle= {{fontSize: 12.5}}
                inactiveTextColor ="gray"
                barColor ="transparent"
                selectedIndex={this.state.index}
                onChange={index => this.setState({ index })}
            />
          </View>
        </View>
        <ScrollView
          refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.getMatches.bind(this)}
              />
          }
        >
          <View>
            {this.choseView()}
          </View>
        </ScrollView>

        <Modal
              style={{ flex: 1, position: "relative" , margin: 50, marginLeft: 25, marginRight: 25}}
              isVisible={this.state.userCard}
              backdropOpacity = {0.45}
        >
            <UserCard
              closeModal = {this.userCard.bind(this)} userSelected = {userSelected}
              profile = {profile} isFriend ={friendAnalysis}
            />
        </Modal>

        <Modal
          style={{ flex: 1, position: "relative" }}
          isVisible={this.state.modal}
          backdropOpacity = {0.85}
        >
              <Text style = {styles.expText}>You have to bet more becuase freigeriguergegieirugerug</Text>

              <TouchableOpacity style = {{backgroundColor:"#00B073", padding: 10, borderRadius: 5, margin: 50}} onPress={this.toggleModal.bind(this)}>
                <Text style = {{color: "white", fontSize: 17, alignSelf:"center",}}>Got it  <FontAwesome>{Icons.thumbsUp}</FontAwesome></Text>
              </TouchableOpacity>
        </Modal>

      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "black",
    flex: 1
  },
  segmentedController: {
    borderBottomWidth: 0
  },
  topItem: {
    color: "gray",
    fontSize: 12,
    padding: 5
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  icon: {
    fontSize: 35,
    color: "gray",
    paddingTop: 20
  },
  spaceAround: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  lay: {
    color: "#ffff",
    fontWeight: "700",
    fontSize: 15,
    paddingRight: 10
  },
  user: {
    color: "#00B073",
    fontSize: 15,
    fontWeight: "300",
  },
  space: {
    flexDirection: "row",
    paddingBottom: 10
  },
  hourScore: {
    borderTopWidth: 1,
    borderTopColor: "gray",
    padding: 5
  },
  hour: {
    color:"gray",
    fontSize: 12,
    fontStyle:"oblique",
    padding: 5
  },
  emptyMessage: {
    color: "#ffff",
    fontSize: 16,
    alignSelf: "center",
    marginTop: 20
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    paddingBottom: 5
  },
  imageStyle:{
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    marginRight: 10
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

export default Match;
