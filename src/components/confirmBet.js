import React, {Component} from "react";
import {View, Text, TouchableOpacity, Modal, Image} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {NavigationActions} from "react-navigation";
import YouHaveMatch from "./youHaveMatch";

class ConfirmBet extends Component{

  constructor(props){
    super(props);
    this.state = {
      visible: false
    }
  }

  postMatch(){
    this.setState({visible: !this.state.visible})
  }

  sendToMatches(){
    const navigateAction = NavigationActions.navigate({
      routeName: "Match",
      params: {}
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render(){
    const {user, game, teamSelected, teamsNotSelected} = this.props.navigation.state.params;

    return(
      <View style = {styles.container}>
        <View style = {styles.space}>
            <View style = {styles.card}>
              <Image source= {{uri: game.image}} style = {{width: 60, height: 60, marginTop:5, marginRight: 10}}/>

              <View>
                <Text style = {styles.text}>{game.league}</Text>
                <Text style = {[styles.text, {fontWeight: "300", fontSize: 11, fontStyle: "oblique" , marginBottom: 5}]}>{game.time}</Text>

                <View style = {styles.game}>
                  <Text style = {styles.word}>{game.local}</Text>
                  <Text style = {[styles.word, {fontStyle: "oblique"}]}>VS.</Text>
                  <Text style = {styles.word}>{game.visit}</Text>
                </View>
              </View>
            </View>
        </View>

          <View style = {{marginTop: 20}}>
            <View style = {styles.confirmCard}>
                <View style = {{flexDirection: "row", marginLeft: 10, marginBottom: 7}}>
                  <Image style = {styles.image} source = {{uri: "https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"}}/>
                  <Text style = {styles.user}>albertoaaldana</Text>
                </View>

                <View style = {styles.descript}>
                  <View>
                    <Text style = {styles.explanation}>Bet</Text>
                    <Text style = {[styles.explanation, {borderBottomWidth: 1, borderBottomColor: "white", marginBottom: 13}]}>Sport adv</Text>
                    <Text style = {styles.explanation}>TOTAL</Text>
                  </View>

                  <View>
                    <Text style = {[styles.explanation, {color: "#DAA520"}]}>1,450 $</Text>
                    <Text style = {[styles.explanation, {color: "#DAA520",  marginBottom: 13}]}>122 $</Text>
                    <Text style = {[styles.explanation, {color: "#DAA520"}]}>1,672 $</Text>
                  </View>
                </View>
            </View>

            <Text style = {{fontStyle: "oblique", color: "white", justifyContent:"space-around", marginTop: 10, marginBottom: 10, marginLeft: 160}}>.VS</Text>

            <View style = {styles.confirmCard}>
                <View style = {{flexDirection: "row", marginLeft: 10, marginBottom: 7}}>
                  <Image style = {styles.image} source = {{uri: "https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"}}/>
                  <Text style = {styles.user}>pepeorget3</Text>
                </View>

                <View style = {styles.descript}>
                  <View>
                    <Text style = {styles.explanation}>Bet</Text>
                    <Text style = {[styles.explanation, {borderBottomWidth: 1, borderBottomColor: "white", marginBottom: 13}]}>Sport adv</Text>
                    <Text style = {styles.explanation}>TOTAL</Text>
                  </View>

                  <View>
                    <Text style = {[styles.explanation, {color: "#DAA520"}]}>1,450 $</Text>
                    <Text style = {[styles.explanation, {color: "#DAA520",  marginBottom: 13}]}>0 $</Text>
                    <Text style = {[styles.explanation, {color: "#DAA520"}]}>1,450 $</Text>
                  </View>
                </View>
            </View>
          </View>

        <TouchableOpacity style = {styles.buttonMatch} onPress = {this.postMatch.bind(this)}>
          <Text style = {{color: "#ffff", alignSelf:"center"}}>MATCH THIS BET</Text>
        </TouchableOpacity>

        <Modal
          animationType = "slide"
          visible = {this.state.visible}
        >
          <YouHaveMatch
            postMatch = {this.postMatch.bind(this)}
            sendToMatches = {this.sendToMatches.bind(this)}
            user = {user}
            teamSelected = {teamSelected}
            teamsNotSelected = {teamsNotSelected}
          />
        </Modal>
      </View>
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
    marginTop: 10,
    textAlign: "left",
    paddingLeft: -5,
    paddingBottom: 15
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
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
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 5
  },
  confirmCard: {
    backgroundColor: "black",
    paddingTop: 10,
    paddingBottom: 10
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
    marginBottom: 10
  }
}

export default ConfirmBet;
