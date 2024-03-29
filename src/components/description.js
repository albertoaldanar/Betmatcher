
import React, {Component}from "react";
import {View, Text, TouchableOpacity, Modal, ActivityIndicator, Dimensions, Image, ScrollView, FlatList, AsyncStorage} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import BetModal from "../reusable/betModal";
import MatchARequest from "../reusable/matchARequest";
import UserList1 from "../constants/userList1";
import UserList2 from "../constants/userList2";
import { NavigationActions } from "react-navigation";
import AwesomeAlert from 'react-native-awesome-alerts';
import DescChart from "../reusable/descChart";
import GameInfo from "../reusable/gameInfo";
import LinearGradient from "react-native-linear-gradient";
import Moment from 'moment';
import Url from "../constants/url";
import Suscription from "./suscription";

const mainColor = "#00B073";

class Description extends Component{

  constructor(props){
    super(props);
    this.state = {
      visible: false,
      teamSelected: "",
      betChoice: 0,
      local: false,
      draw: false,
      visit: false,
      index: 0,
      showLightBox: false,
      message: "",
      loading: true,
      showButtons: false,
      currentUser: "",
      requests: [],
      showMakeMatch: false,
      showMakeBet: false,
      currenCoins: 0, currentCoins: 0,
      chartRequests: [], chartLocalBack: [], chartVisitBack: [], chartDrawBack: []
    }
  }

  componentWillMount(){
    let event = this.props.navigation.state.params.par;

    return fetch(`http://${Url}:8000/user_activity?event=${event.data.name}`, {
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
      }
    })
    .then(res => res.json())
    .then(jsonRes => {
      console.log(jsonRes)
      this.setState({chartRequests: jsonRes.requests, chartDrawBack: jsonRes.matches_draw, chartLocalBack: jsonRes.matches_local, chartVisitBack: jsonRes.matches_visit})
    }).catch(error => {
      console.log(error);
    })
  }

    //This method sets the currentUser to the state
  async componentDidMount(){

      this._isMounted = true;

      const usernameGet = await AsyncStorage.getItem('username');
        if (usernameGet) {
          this.setState({ currentUser: usernameGet});
        } else {
          this.setState({ currentUser: false });
      }

      const getCoins = await AsyncStorage.getItem('coins');
      this.setState({ currenCoins: getCoins});
  }

  sendNotificationToUser(message){
    if(message.length > 0){
      console.log("No message returned")
    }
  }

sendToConfirmation( route, user, quote, bet ){
    let game = this.props.navigation.state.params.par;
    const gameType = game.sport == "Soccer" ? game.draw : "Draw"
    const options = [game.local, game.visit, gameType];
    const teamsNotSelected = options.filter(x => x.name!= this.state.teamSelected.name);

    var index = this.state.index == 1 ? teamsNotSelected[1].name : teamsNotSelected[0].name;

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: {
                user: user,
                game: game,
                teamSelected: this.state.teamSelected.name,
                teamsNotSelected: index,
                quote: quote,
                bet: bet,
                sentFrom: "Public",
                coins: this.state.currentCoins
              }
    });
    this.props.navigation.dispatch(navigateAction);
    this.setState({showMakeMatch: false})
  }

  //Gets possible matches
  renderUsersToMatch(team){
    let game = this.props.navigation.state.params.par;

    const back_team = encodeURIComponent(team.name);
    const back_user = encodeURIComponent(this.state.currentUser);
    const event = encodeURIComponent(game.data.name);

    return fetch(`http://${Url}:8000/users_to_match?back_user=${back_user}&back_team=${back_team}&event=${event}`, {
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
      }
    })
    .then(res => res.json())
    .then(jsonRes => {
      console.log(jsonRes)
      this.setState({
                message: `${jsonRes.reqs.length} users to match`,
                loading: false,
                requests: jsonRes.reqs,
                currentCoins: jsonRes.user.profile.coins,
      });

    })
    .catch(error => console.log(error));
  }

  //Handle team selection
  onSelectTeam(team){
    const {showLightBox} = this.state;
    this.setState({ teamSelected: team, showLightBox: true })
    this.birghtColor(team);
    this.renderUsersToMatch(team);
  }

  handleSegmentedController(index){
    this.setState({ index })
    this.renderUsersToMatch(this.state.teamSelected);
  }

  sendToMatchFromLay(){
    this.setState({showMakeBet: false})
    const navigateAction = NavigationActions.navigate({
      routeName: "Match"
    });
    this.props.navigation.dispatch(navigateAction);
  }

  birghtColor(team){
    let game = this.props.navigation.state.params.par;
    switch(team.name){
        case game.local.name:
          return this.setState({local: true, draw: false, visit: false})
          break;

        case "Draw":
          return this.setState({local: false, draw: true, visit: false})
          break;

        case game.visit.name:
          return this.setState({local: false, draw: false, visit: true})
          break;
    }
  }

  makeBet(){
    this.setState({
          showMakeBet: !this.state.showMakeBet,
          showLightBox: false,
          teamSelected: ""
    })
  }

  makeMatch(){
    this.setState({
          showMakeMatch: !this.state.showMakeMatch,
          showLightBox: false,
          teamSelected: ""
    })
  }

  renderButton(){
    let game = this.props.navigation.state.params.par;
    const {teamSelected, local, visit, draw} = this.state;
      if(game.data.sport.name == "Soccer"){
        return(
          <View>
            <TouchableOpacity style = {local ? styles.buttonSelected : styles.button} onPress ={this.onSelectTeam.bind(this, game.local)}>
              <Text style = {styles.t}>{game.local.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity style = { draw ? styles.buttonSelected : styles.button} onPress ={this.onSelectTeam.bind(this, game.draw)}>
              <Text style = {styles.t}>{game.draw.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {visit ? styles.buttonSelected : styles.button} onPress ={this.onSelectTeam.bind(this, game.visit)}>
              <Text style = {styles.t}>{game.visit.name}</Text>
            </TouchableOpacity>
          </View>
        );
      } else{
          return(
            <View>
              <TouchableOpacity style = {local ? styles.buttonSelected : styles.button} onPress ={this.onSelectTeam.bind(this, game.local)}>
                <Text style = {styles.t}>{game.local.name}</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {visit ? styles.buttonSelected : styles.button} onPress ={this.onSelectTeam.bind(this, game.visit)}>
                <Text style = {styles.t}>{game.visit.name}</Text>
              </TouchableOpacity>
            </View>
          );
        }
  }

  render(){
    const {betChoice, teamSelected, showLightBox, teamSelectedObj, chartRequests, chartVisitBack, chartLocalBack, chartDrawBack} = this.state;
    let game = this.props.navigation.state.params.par;
    let reqs = this.state.requests.length > 0 ? [true, "Users that bet against your team"] : [false, "No users to match, but can make bet"];

    const gameType = game.data.sport.name == "Soccer" ? game.draw : "Draw"
    const options = [game.local, game.visit, gameType];
    const teamsNotSelected = options.filter(x => x.name!= teamSelected.name);

    var layLocal = chartRequests.filter(request => request.back_team == game.local.name);
    var layDraw = chartRequests.filter(request => request.back_team == "Draw");
    var layVisit = chartRequests.filter(request => request.back_team == game.visit.name);


    console.log(this.state.currentCoins);

    var highestBet = this.state.chartRequests.map(x => x.amount);

    var myIndex = this.state.index == 1 ? teamsNotSelected[1] : teamsNotSelected[0];

    return(
      <LinearGradient  style = {{flex: 1}} start={{x: 0, y: 0}} end={{x: 4 , y: 1}} colors = {[ "black", "gray"]}>
        <GameInfo data= {game} local = {layLocal.length + chartLocalBack.length} draw = {layDraw.length + chartDrawBack.length} visit = {layVisit.length + chartVisitBack.length} highestBet = {Math.max(...highestBet)}/>

        <ScrollView>
        <View style = {styles.space}>
            <View style = {styles.card}>
              <Image source = {{uri: game.data.sport.img}} style = {{width: 60, height: 60, marginRight: 15}}/>

              <View>
                <Text style = {styles.text}>{game.data.league.name}</Text>
                <Text style = {[styles.text, {fontWeight: "300", fontSize: 11, fontStyle: "oblique"}]}>{Moment(game.data.date).format("MMM Do YY")}</Text>

                <View style = {styles.game}>
                  <Text style = {styles.word}>{game.local.name}</Text>
                  <Text style = {[styles.word, {fontStyle: "oblique"}]}>VS.</Text>
                  <Text style = {styles.word}>{game.visit.name}</Text>
                </View>
              </View>
            </View>
        </View>

        <Text style = {[styles.title, {marginBottom: 20}]}>Select a team</Text>

        <View style = {[styles.space, {marginRight: 15, marginLeft: 15}]}>
          {this.renderButton()}
        </View>

        <Text style = {[styles.title, {marginBottom:15}]}>User recent activity</Text>

        <DescChart
          game = {game}
          layLocal = {layLocal} layVisit = {layVisit} layDraw = {layDraw}
          backLocal = {chartLocalBack} backVisit = {chartVisitBack} backDraw = {chartDrawBack}
        />

        <Modal
            transparent = {false}
            visible = {this.state.showMakeBet}
            animationType ="fade"
        >
          <BetModal
            teamsNotSelected = {teamsNotSelected}
            team = {teamSelected}
            game = {game}
            currentUser = {this.state.currentUser}
            visible = {this.makeBet.bind(this)}
            sendToMatchFromLay = {this.sendToMatchFromLay.bind(this)}
            coins = {this.state.currentCoins}
          />
        </Modal>


        <Modal
            transparent = {false}
            visible = {this.state.showMakeMatch}
            animationType ="fade"
        >
          <MatchARequest
            currentUser = {this.state.currentUser}
            teamsNotSelected = {teamsNotSelected}
            team = {teamSelected} index = {this.state.index}
            rivalChoice = {myIndex} game = {game}
            segmentedController = {this.handleSegmentedController.bind(this)}
            visible = {this.makeMatch.bind(this)}
            confirm = {this.sendToConfirmation.bind(this)}
            requests = {this.state.requests}
            renderUsersToMatch = {this.renderUsersToMatch.bind(this)}
            coins = {this.state.currentCoins}
          />
        </Modal>

        <AwesomeAlert
          show={showLightBox}
          showProgress={this.state.loading}
          progressColor= "#00B073"
          title= {this.state.message}
          message = {reqs[1]}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={reqs[0]}
          showConfirmButton={true}
          cancelText="Match a user"
          confirmText="Make new bet"
          confirmButtonColor="#1E90FF"
          onCancelPressed={() => {
            this.setState({showMakeMatch: true, showLightBox: false})
          }}
          onConfirmPressed={() => {
            this.setState({showMakeBet: true, showLightBox: false})
          }}
          titleStyle = {{color: "white", fontWeight:"600", fontSize: 20}}
          cancelButtonColor =  "#00B073"
          contentContainerStyle = {{padding: 5, paddingBottom: 35, paddingTop: 35, borderRadius: 5,
            backgroundColor: "black",
            shadowColor: 'gray',
            shadowOffset: { width: 2, height: 3 },
            shadowOpacity: 4,
            elevation: 3
          }}
          cancelButtonTextStyle = {{fontSize: 15}}
          confirmButtonTextStyle = {{fontSize: 15}}
        />
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = {
  title: {
    color:"#ffff",
    fontSize: 15,
    fontWeight: "600",
    margin: 5,
    color: "#00B073",
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
    padding: 10,
    paddingBottom: 16
  },
  text: {
    color: "#ffff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6
  },
  game: {
    flexDirection:"row"
  },
  word: {
    color: "white",
    marginRight: 10,
    fontSize: 15,
    fontWeight: "500"
  },
  betOptions: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center"
  },
  button: {
    marginBottom: 20,
    justifyContent: "space-around",
    borderColor:"white",
    borderWidth:0.3,
    padding: 10,
    marginLeft:20,
    marginRight: 20,
  },
  buttonSelected: {
    backgroundColor: "#00B073",
    marginBottom: 20,
    justifyContent: "space-around",
    padding: 10,
    marginLeft:20,
    marginRight: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 1,
    elevation: 1,
  },
  textButtonSelected: {
    color: "#ffff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6
  },
  backLay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  space: {
    marginBottom: 10,
    marginTop: 7
  },
  t: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "400"
  },
  desc: {
    color: "#00B073",
    fontSize : 15,
    fontWeight:"400",
    marginBottom: 10,
    fontStyle:"oblique"
  },
  number: {
    color:"white",
    fontSize: 10,
    textAlign: "center",
    fontWeight:"bold"
  },
  infoCards: {
    backgroundColor: "#161616",
    padding: 25,
    borderRadius: 5,
    margin: 20,
    elevation: 5,
    shdowColor: "gray"
  },
  card2: {
    backgroundColor: "black",
    padding: 25,
    borderRadius: 5,
    margin: 20,
    elevation: 5,
    shdowColor: "gray"
  }
}


export default Description;
