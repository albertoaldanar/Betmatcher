import React, {Component} from "react";
import {View, Text, TouchableOpacity, Dimensions} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome, {Icons} from "react-native-fontawesome";

class MatchDirect extends Component{

  constructor(props){
    const options = [props.directBet.event.local.name, props.directBet.event.visit.name, "Draw"];
    const teamsNotSelected = options.filter(x => x!= props.directBet.back_team);
    const data = props.directBet.event.sport.name == "Soccer" ? ["", null] : [teamsNotSelected[0], props.directBet.fq];

    super(props);
    this.state = {
      teamOpponentSelected: data[0],
      first: false,
      second: false,
      quoteSelected: data[1]
    }
  }

  onSelectTeam(team, quote, position){
    this.setState({teamOpponentSelected: team, quoteSelected: quote })
    this.birghtColor(position)
  }

  birghtColor(position){
    switch(position){
        case 1:
          return this.setState({first: true, second: false})
          break;

        case 2:
          return this.setState({first: false, second: true})
          break;
    }
  }

  switchView(){
    const {directBet} = this.props;
    var sport = this.props.directBet.event.sport;
    const {quoteSelected, teamOpponentSelected, first, second} = this.state;

    const options = [directBet.event.local.name, directBet.event.visit.name, "Draw"];
    const teamsNotSelected = options.filter(x => x!= directBet.back_team);

    if(sport.name == "Soccer"){
      return(
          <View>
            <Text style = {[styles.title, {marginBottom: 15}]}>Select a team</Text>
            <View>
                <TouchableOpacity style = {first ? styles.buttonSelected : styles.button} onPress = {this.onSelectTeam.bind(this, teamsNotSelected[0], directBet.fq , 1)}>
                  <Text style = {styles.t}>{teamsNotSelected[0]}</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {second? styles.buttonSelected : styles.button} onPress = {this.onSelectTeam.bind(this, teamsNotSelected[1], directBet.sq, 2)}>
                  <Text style = {styles.t}>{teamsNotSelected[1]}</Text>
                </TouchableOpacity>
            </View>
          </View>
      );
    } else {return null}
  }

  render(){

    const {directBet} = this.props;
    const {quoteSelected, teamOpponentSelected} = this.state;
    var bet = quoteSelected > 0 ? Math.round(directBet.amount - ((quoteSelected / 100) * directBet.amount)) : directBet.amount;

    return(
      <LinearGradient  style = {{flex: 1, margin: 0}} start={{x: 0, y: 0}} end={{x: 4 , y: 1}} colors = {[ "black", "gray"]}>

        <TouchableOpacity
            style = {{position: "absolute", left: 6, top: 6, marginBottom: 40}}
            onPress = {this.props.closeModal}
        >
          <Text style= {{color: "#00B073", fontSize: 19}}>X</Text>
        </TouchableOpacity>

        <View style = {directBet.event.sport.name =="Soccer" ? {marginTop: 60} : {marginTop: 100}}>
          <View style = {{display: "flex", flexDirection: "row", marginBottom: 30, justifyContent: "space-around"}}>
              <View>
                  <Text style = {[styles.word, {fontSize: 18, alignSelf: "center"}]}>{directBet.back_user.username}</Text>
                  <Text style = {[styles.word, {fontSize: 15, color: "gray", marginTop: 8, alignSelf: "center"}]}>{directBet.back_team}</Text>
              </View>


              <Text style = {[styles.word, {fontStyle: "oblique", fontSize: 14, marginTop: 3}]}>VS.</Text>

              <View>
                  <Text style = {[styles.word, {fontSize: 18, alignSelf: "center"}]}>You</Text>
                  {this.state.teamOpponentSelected ?
                    <Text style= {{alignSelf: "center", color: "gray", fontSize: 15, marginTop: 9}}> {this.state.teamOpponentSelected} </Text> :
                    <FontAwesome style= {{alignSelf: "center", color: "gray", fontSize: 15, marginTop: 9}}> {Icons.hourglassStart}</FontAwesome>
                  }
              </View>
          </View>
        </View>

        <View style = {directBet.event.sport.name =="Soccer" ? {marginTop: 10, marginBottom: 15}: {marginTop: 30, marginBottom: 10}}>
            <Text style = {{color: "#DAA520", alignSelf: "center", fontSize: 18}}>{directBet.amount} £</Text>
            <Text style = {{color: "#00B073", alignSelf: "center", fontSize: 13, marginTop: 10}}>+ {this.state.quoteSelected} %</Text>
        </View>

        {this.switchView()}

        {directBet.event.sport.name == "Soccer" ?
          <TouchableOpacity
                  style = {this.state.teamOpponentSelected != "" ? styles.buttonContainer : styles.buttonDisableContainer}
                  disabled = {this.state.teamOpponentSelected != "" ? false : true}
                  onPress = {this.props.sendToConfirmation.bind(this, directBet, quoteSelected , bet, directBet.event, teamOpponentSelected, directBet.back_team )}
            >
              <Text style= {{color: "white", alignSelf: "center", fontSize: 16}}>CONTINUE</Text>
          </TouchableOpacity> :
          <TouchableOpacity
              style = {styles.buttonContainer }
              onPress = {this.props.sendToConfirmation.bind(this, directBet, quoteSelected , bet, directBet.event, teamOpponentSelected, directBet.back_team)}
            >
              <Text style= {{color: "white", alignSelf: "center", fontSize: 16}}>CONTINUE</Text>
          </TouchableOpacity>
        }

      </LinearGradient>

    );
  }
}

const styles= {
  continueButton: {
    position: "absolute", bottom: 0,
    left: 0, right: 0, backgroundColor: "#00B073",
    padding: 12, borderRadius: 5,
  },
  t: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "400"
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
  word: {
    color: "white",
    marginRight: 6,
    fontSize: 13,
    fontWeight: "400"
  },
  title: {
    color:"#ffff",
    fontSize: 15,
    fontWeight: "600",
    margin: 5,
    color: "#00B073",
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
    backgroundColor: "#DCDCDC",
    padding: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  matchContainer: {
    width: Dimensions.get("window").width, height: 150,
    position: 'absolute',
    top: 0,left: 0,
    right: 0, bottom: 0,
    justifyContent: "center",
    backgroundColor: "red",
  }
}

export default MatchDirect;
