import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Slider, Image, TextInput, Dimensions, Modal, Alert} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SwipeCards from 'react-native-swipe-cards';
import Carousel from "react-native-snap-carousel";
import LinearGradient from "react-native-linear-gradient";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import FriendsModal from "./friendsModal"

const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

class BetModal extends Component{

  constructor(props){
    super(props);
    this.state = {
      bet: 50,
      cUserCoins: 3460,
      values: [50, 3460],
      finalValue: [],
      infoBox: false,
      showFriends: false,
      opponent: "",
      publicBet: false
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

  // componentWillMount(){
  //     var position = this.props.team.position;
  //     let quote = this.props.teamsNotSelected[1].quotes[position];

  //     var bet = this.props.list2.map(u => {
  //       quote > 0 ? Math.round(u.bet - ((quote / 100) * u.bet)) : u.bet;
  //     })
  //     this.setState({ finalValue: [{user: this.props.list2, bet: quote}] })
  // }

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



  userList(list, quote){

    return list.map((u, index) => {
      var bet = quote > 0 ? Math.round(u.bet - ((quote / 100) * u.bet)) : u.bet;
      return(
        <TouchableOpacity  key = {index} onPress = {this.props.confirm.bind(this, "ConfirmBet", u, quote, bet)}>
          <View style = {styles.tableStyle}>
            <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
              <View style= {{flexDirection:"row"}}>
                <Image
                  source = {{uri: u.image}}
                  style = {styles.image}
                />
                <Text style = {{ marginTop: 10, color: "#ffff", fontSize: 13, fontWeight: "300"}}>{u.user}</Text>
              </View>
              <FontAwesome style = {{color:"gray", marginTop: 32, marginRight: 5}}>{Icons.chevronRight}</FontAwesome>
            </View>

            <View style = {{alignSelf:"center", flexDirection:"row"}}>
              <Text style = {{color: "#DAA520", alignSelf:"center", fontSize: 16, marginRight: 40}}> {bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
              <Text style = {{color: "gray", fontSize: 16}}> {quote} % {quote > 0 ? <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome> : <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>}</Text>
            </View>
          </View>

        </TouchableOpacity>
      );
    })
  }



  gameType(game, position){
    let {bet} = this.state;
    const {teamsNotSelected} = this.props;

   if(game.sport == "Soccer"){
      return(
          <View style = {{marginTop: 35}}>
            <View style = {{flexDirection:"row", justifyContent:"space-between", padding: 10, borderBottomColor: "gray", borderBottomWidth:0.5, borderTopColor: "gray", borderTopWidth:0.5}}>
              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginLeft: 5, borderBottomWidth: 1, borderBottomColor: "gray"}}> IF MATCH</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, marginTop: 22, fontSize: 15, padding: 8 }}>{teamsNotSelected[0].name} </Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, marginTop: 22, fontSize: 15, padding: 8 }}>{teamsNotSelected[1].name} </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400"}}>QUOTES</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>
                  {teamsNotSelected[0].quotes[position] } %  {teamsNotSelected[0].quotes[position] > 0 ? <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome>: <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>}
                </Text>

                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8}}>
                  {teamsNotSelected[1].quotes[position]} %  {teamsNotSelected[1].quotes[position] > 0 ? <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome>: <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>}
                </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5}}>YOU CAN WIN</Text>
                <Text style = {{color: "#DAA520", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>{ Math.round((teamsNotSelected[0].quotes[position] / 100) * bet + (bet * 2) )} <FontAwesome> {Icons.bitcoin} </FontAwesome> </Text>
                <Text style = {{color: "#DAA520", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>{ Math.round((teamsNotSelected[1].quotes[position] / 100) * bet + (bet * 2) )} <FontAwesome> {Icons.bitcoin} </FontAwesome> </Text>
              </View>

            </View>
          </View>
      );
    } else {
      return(
        <View style = {{marginTop: 35}}>
            <View style = {{flexDirection:"row", justifyContent:"space-between", padding: 10, borderBottomColor: "gray", borderBottomWidth:0.5, borderTopColor: "gray", borderTopWidth:0.5}}>
              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5, alignSelf:"center"}}>OPPONENT</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, marginTop: 22, fontSize: 15, padding: 8 }}>{teamsNotSelected[0].name} </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5}}>QUOTE</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>
                  {teamsNotSelected[0].quotes } %  {teamsNotSelected[0].quotes > 0 ? <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome>: <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>}
                </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5}}>YOU CAN WIN</Text>
                <Text style = {{color: "#DAA520", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>{ Math.round((teamsNotSelected[0].quotes / 100) * bet + (bet * 2) )} <FontAwesome> {Icons.bitcoin} </FontAwesome> </Text>
              </View>

            </View>
        </View>
      );
    }
  }

  renderSegmentedController(){
    const { choice, game, teamsNotSelected } = this.props;
    var values = [teamsNotSelected[0].name, teamsNotSelected[1].name];

    if(choice == 1 && game.sport == "Soccer"){
      return(
        <SegmentedControlTab
          values={values}
          tabTextStyle = {{color: "#00B073", fontWeight: "400", fontSize: 15}}
          tabStyle = {{borderColor: "#00B073", backgroundColor: "transparent"}}
          selectedIndex={this.props.index}
          activeTabStyle = {{backgroundColor: "#00B073"}}
          onTabPress= {this.props.segmentedController}
        />
      );
    } else if(choice == 1 && game.sport != "Soccer"){ return null };
  }

  betChoice(){
    const {choice, game, teamsNotSelected, team} = this.props;
    var position = this.props.team.position;
                //  -- MODAL FOR USER MATCH -- //

    if(this.props.choice == 1){
      if(this.props.index == 0){
          return(
              <View style = {{marginTop: 5 }}>
                <TouchableOpacity onPress = {() => this.setState({infoBox: true})}>
                  <FontAwesome style = {{color: "white", fontSize: 27, alignSelf:"flex-end", margin: 10, marginBottom: 0}}>{Icons.questionCircle}</FontAwesome>
                </TouchableOpacity>

                <View style = {{flexDirection:"row", alignSelf:"center"}}>
                  <Text style = {{color: "gray", fontWeight: "400", margin: 5, marginTop: 0}}>Users that bet for</Text>
                  <Text style = {{color: "#00B073", fontWeight: "400", margin: 5, marginTop: 0}}>{teamsNotSelected[0].name}</Text>
                </View>
                {this.userList(this.props.list1, teamsNotSelected[0].quotes[position] || teamsNotSelected[0].quotes)}
              </View>
          );
      } else {
          return(
              <View style = {{marginTop: 5 }}>
                <TouchableOpacity onPress = {() => this.setState({infoBox: true})}>
                  <FontAwesome style = {{color: "white", fontSize: 27, alignSelf:"flex-end", margin: 10, marginBottom: 0}}>{Icons.questionCircle}</FontAwesome>
                </TouchableOpacity>

                <View style = {{flexDirection:"row", alignSelf:"center"}}>
                  <Text style = {{color: "gray", fontWeight: "400", margin: 5, marginTop: 0}}>Users that bet for</Text>
                  <Text style = {{color: "#00B073", fontWeight: "400", margin: 5, marginTop: 0}}>{teamsNotSelected[1].name}</Text>
                </View>
                {this.userList(this.props.list2, teamsNotSelected[1].quotes[position])}
              </View>
          );
        }

                //  -- MODAL FOR LAY BET -- //

    } else if(this.props.choice == 2) {
          return(
            <View>
              <View style = {{padding: 20, paddingTop: 10}}>
                <View style = {{flexDirection:"row", alignSelf: "center", marginTop: 5, marginBottom:20}}>
                  <Text style = {styles.layBet}>Set your bet for: </Text>
                  <Text style = {[styles.layBet, {marginLeft: 5, color: "#00B073", fontSize: 17}]}>{this.props.team.name}</Text>
                </View>

                <Text style = {{alignSelf: "center", color: "#DAA520", fontSize: 25, marginTop: 5, fontWeight: "300"}}>{this.state.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>

                <Slider
                  step= {10}
                  style ={{marginLeft: 15, marginRight: 15, marginTop: 15}}
                  maximumValue={this.state.cUserCoins}
                  minimumValue = {50}
                  thumbTintColor = "#00B073"
                  minimumTrackTintColor = "#00B073"
                  onValueChange={this.setCoins.bind(this)}
                  value={this.state.bet}
                  thumbStyle ={{color: "#00B073"}}
                />
              <TouchableOpacity style = {{marginTop: 35, alignSelf:"center"}} onPress = {this.friendsModal.bind(this)}>
                <Text style = {{color: "gray", fontSize: 15, fontWeight: "400"}}> SEND THIS BET TO: </Text>
              </TouchableOpacity>

              <View style = {{marginTop: 18, flexDirection:"row", justifyContent:"space-around"}}>
                <TouchableOpacity style= {this.state.publicBet ? styles.choiceButtonSelected : styles.choiceButton} onPress = {() => this.setState({publicBet: true, opponent: ""})}>
                  <Text style = {{color:"white", marginRight: 3, alignSelf:"center", fontSize: 16}}>Public   <FontAwesome>{Icons.users}</FontAwesome></Text>
                </TouchableOpacity>

                <Text style = {{color: "gray", fontSize: 15, marginTop: 7}}> or </Text>

                <TouchableOpacity style= {this.state.opponent == "" ? styles.choiceButton : styles.choiceButtonSelected} onPress = {() => this.setState({showFriends: true, publicBet: false})}>
                  <Text style = {{color:"white", marginRight: 3, alignSelf:"center", fontSize: 16}}> {this.state.opponent || "Betfriend"}  <FontAwesome>{Icons.user}</FontAwesome></Text>
                </TouchableOpacity>
              </View>

              </View>

              {this.gameType(game, position)}

            </View>
          );
    }
  }

  render(){
      let button;

      if(this.props.choice == 2){
        button =  <TouchableOpacity
                    style = {this.state.opponent != "" || this.state.publicBet ? styles.buttonContainer : styles.buttonDisableContainer}
                    disabled = {this.state.opponent != "" || this.state.publicBet ? false : true}
                    onPress = {this.alerts.bind(this)}
                    >
                    <Text style = {[styles.layBet, {fontSize: 19}]}> Place bet</Text>
                  </TouchableOpacity>
      }

    return(
         <LinearGradient  style = {{flex: 1}} start={{x: 0, y: 0}} end={{x: 4 , y: 1}} colors = {[ "black", "gray"]}>
          <View style ={{marginBottom: 7}}>
            <View style = {styles.info}>
              <TouchableOpacity style = {styles.closeModal} onPress  = {this.props.visible}>
                <Text style = {{color: "#00B073", fontSize: 17}}>
                  Close
                </Text>
              </TouchableOpacity>
              <Text style = {{color: "#DAA520", marginTop: 12, marginRight: 19}}> {this.state.cUserCoins} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
            </View>
          </View>

          <View>
            {this.renderSegmentedController()}
          </View>

          <ScrollView>
            {this.betChoice()}
          </ScrollView>

          <Modal
            visible = {this.state.showFriends}
            animationType = "slide"
          >
            <FriendsModal hideShow = {this.friendsModal.bind(this)} opponent = {this.state.opponent} selectOpponent = {this.selectOpponent.bind(this)}/>
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
    borderBottomWidth: 0.3,
    borderBottomColor: "gray",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
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
    marginRight: 15,
    marginLeft: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
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
    borderRadius: 5, padding: 12,
    paddingLeft: 15, paddingRight: 15,
    borderColor:"gray", borderWidth: 0.3
  },
  choiceButtonSelected: {
    borderRadius: 5, padding: 12,
    paddingLeft: 15, paddingRight: 15,
    borderColor:"gray", borderWidth: 0.3,
    backgroundColor: "#00B073"
  }
};

export default BetModal;
