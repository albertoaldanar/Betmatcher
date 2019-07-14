import React, {Component} from "react";
import {Text, View, TouchableOpacity, ScrollView, Modal} from "react-native";
import Requests from "../constants/requests";
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";
import MatchDirect from "../reusable/matchDirect";
import { NavigationActions } from "react-navigation";

class TopRequests extends Component{

  constructor(props){
    super(props);
    this.state = {requestModal: false, requestSelected: ""}
  }

  requestModal(){
    this.setState({requestModal: !this.state.requestModal});
  }

  sendToConfirmation(user, quote, bet, game, teamSelected, teamsNotSelected){
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
    this.setState({requestModal: false})
  }

  topRequests(){
    const {par} = this.props.navigation.state.params;

    return par.map((r, index) => {
      return(
        <TouchableOpacity key = {index} onPress = {() => this.setState({requestSelected: r, requestModal: true})}>
            <Card style = {{padding: 10}}>
              <View style = {{flexDirection:"row", paddingLeft: 5, marginBottom: 7, marginTop: 7}}>
                <Text style = {[styles.desc, {color:"#DCDCDC", fontWeight: "300", fontStyle: "oblique"}]}>{r.event.local.name}</Text>
                <Text style = {[styles.desc, {fontStyle :"oblique", fontWeight: "300", color: "#DCDCDC"}]}>VS.</Text>
                <Text style = {[styles.desc, {color:"#DCDCDC", fontWeight: "300", fontStyle: "oblique"}]}>{r.event.visit.name}</Text>
              </View>

              <View style = {{flexDirection: "row", padding: 10, paddingBottom: 0, justifyContent: "space-between"}}>
                <View>
                  <Text style = {styles.exp}>User</Text>
                  <Text style = {[styles.game, {alignSelf: "center", paddingBottom: 10, fontWeight: "bold", fontSize: 14}]}>{r.back_user.username}</Text>
                </View>

                <View>
                  <Text style = {styles.exp}>Bet</Text>
                  <Text style = {[styles.game, {alignSelf: "center", paddingBottom: 10 , color: "#DAA520"}]}>{r.amount} £</Text>
                </View>

                <View>
                  <Text style = {styles.exp}>For</Text>
                  <Text style = {[styles.game, {alignSelf: "center", paddingBottom: 10}]}>{r.back_team}</Text>
                </View>

                <FontAwesome style ={styles.chevron}>{Icons.chevronRight}</FontAwesome>
              </View>
            </Card>
        </TouchableOpacity>
      );
    })
  }

  render(){
    const {currentUser, par} = this.props.navigation.state.params;
    return(
      <View style = {styles.container}>
        <ScrollView>
          {this.topRequests()}
        </ScrollView>
        <Modal
            visible = {this.state.requestModal}
            animationType = "slide"
            >
              <MatchDirect
                  closeModal = {this.requestModal.bind(this)}
                  directBet = {this.state.requestSelected}
                  currentUser = {currentUser}
                  sendToConfirmation = {this.sendToConfirmation.bind(this)}
              />
        </Modal>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  game: {
    color:"#ffff",
    fontSize: 12,
    fontWeight: "600",
    paddingRight: 5
  },
  user: {
    color:"#00B073",
    fontSize: 13,
    fontWeight: "600",
    fontStyle: "oblique",
    paddingRight: 15
  },
  chevron: {
    color: "#00B073",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "400"
  },
  desc: {
    color:"#ffff",
    fontSize: 14,
    fontWeight: "700",
    paddingRight: 5
  },
  exp: {
    color: "#00B073",
    fontSize: 15,
    fontStyle: "oblique",
    paddingBottom: 10
  }
};


export default TopRequests;
