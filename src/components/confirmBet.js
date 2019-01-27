import React, {Component} from "react";
import {View, Text, TouchableOpacity, Modal} from "react-native";
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
            <Text style = {styles.title}>Game information</Text>
            <View style = {styles.card}>
              <FontAwesome style = {styles.icon}>{Icons.circle}</FontAwesome>

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

        <View style = {{marginTop: 35}}>
          <Text style = {styles.title}>Bet confirmation</Text>

          <View style = {styles.betInfo}>
            <View style = {styles.singleUser}>
              <View style = {styles.info}>
                  <Text style = {styles.userName}>You</Text>
                  <Text style = {[styles.secondText, {fontWeight: "bold"}]}>{teamSelected}</Text>
                  <Text style = {styles.secondText}>Bet: {user.bet}</Text>
                  <Text style = {[styles.secondText, {marginBottom: 8}]}>AD: 21</Text>
              </View>

              <Text style = {{marginTop: 12, color: "#DAA520"}}>TOTAL: {user.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
            </View>

            <Text style = {styles.vs}>VS.</Text>

            <View style = {[styles.singleUser, {backgroundColor: "#161616"}]}>
              <View style = {styles.info}>
                  <Text style = {styles.userName}>{user.user}</Text>
                  <Text style = {[styles.secondText, {fontWeight: "bold"}]}>{teamsNotSelected}</Text>
                  <Text style = {styles.secondText}>Bet: {user.bet}</Text>
                  <Text style = {[styles.secondText, {marginBottom: 8}]}>AD: 0</Text>
              </View>

              <Text style = {{marginTop: 12, color: "#DAA520"}}>TOTAL: {user.bet + 21} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style = {styles.buttonMatch} onPress = {this.postMatch.bind(this)}>
          <Text style = {{color: "#ffff", alignSelf:"center"}}>MATCH THIS BET</Text>
        </TouchableOpacity>

        <Modal
          animationType = "Fade"
          visible = {this.state.visible}
        >
          <YouHaveMatch
            postMatch = {this.postMatch.bind(this)}
            sendToMatches = {this.sendToMatches.bind(this)}
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
    padding: 20,
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
    paddingLeft: -5
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
  singleUser: {
    backgroundColor: "black",
    flexDirection: "column",
    padding: 27,
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 1,
    elevation: 1,
  },
  userName: {
    color: "#00B073",
    fontWeight: "400",
    fontSize: 18,
    marginBottom: 5,
    alignSelf:"center"
  },
  vs: {
    fontWeight: "300",
     fontSize: 10,
     color:"#ffff",
     fontStyle: "oblique",
     marginTop: 70
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
