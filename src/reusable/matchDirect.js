import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome, {Icons} from "react-native-fontawesome";

class MatchDirect extends Component{

  constructor(props){
    super(props);
    this.state = {
      teamOpponentSeleted: "",
      first: false,
      second: false,
      quoteSelected: null
    }
  }

  onSelectTeam(team, quote, position){
    this.setState({teamOpponentSeleted: team, quoteSelected: quote })
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

  renderButtons(){
      const {directBet} = this.props;
      const {first, second} = this.state;
      // const gameType = directBet.event.sport.name == "Soccer" ? directBet.event.draw.name : null;

      const options = [directBet.event.local.name, directBet.event.visit.name, "Draw"];
      const teamsNotSelected = options.filter(x => x!= directBet.back_team);

      if(directBet.event.sport.name == "Soccer"){
        return(
          <View>
            <TouchableOpacity style = {first ? styles.buttonSelected : styles.button} onPress = {this.onSelectTeam.bind(this, teamsNotSelected[0], directBet.fq , 1)}>
              <Text style = {styles.t}>{teamsNotSelected[0]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {second? styles.buttonSelected : styles.button} onPress = {this.onSelectTeam.bind(this, teamsNotSelected[1], directBet.sq, 2)}>
              <Text style = {styles.t}>{teamsNotSelected[1]}</Text>
            </TouchableOpacity>
          </View>
        );
      } else {return null}
  }

  render(){

    const {directBet} = this.props;
    console.log(this.state.teamOpponentSeleted);

    return(
      <LinearGradient  style = {{flex: 1, borderRadius: 5}} start={{x: 0, y: 0}} end={{x: 4 , y: 1}} colors = {[ "black", "gray"]}>

        <View style = {{marginTop: 30, marginBottom: 10}}>
          <Text style = {{color: "#DAA520", alignSelf: "center", fontSize: 18}}>{directBet.amount} <FontAwesome> {Icons.database} </FontAwesome></Text>
          <Text style = {{color: "white", alignSelf: "center", fontSize: 14}}>{this.state.quoteSelected} <FontAwesome> {Icons.database} </FontAwesome></Text>
        </View>

        <View style = {{display: "flex", flexDirection: "row", marginBottom: 30, justifyContent: "space-around"}}>
            <View>
                <Text style = {[styles.word, {fontSize: 15, alignSelf: "center", fontWeight: "bold"}]}>{directBet.back_user.username}</Text>
                <Text style = {[styles.word, {fontSize: 12, color: "gray", marginTop: 8, alignSelf: "center"}]}>{directBet.back_team}</Text>
            </View>


            <Text style = {[styles.word, {fontStyle: "oblique", fontSize: 14, marginTop: 3}]}>VS.</Text>

            <View>
                <Text style = {[styles.word, {fontSize: 15, alignSelf: "center"}]}>You</Text>
                {<Text style= {{alignSelf: "center", color: "gray", fontSize: 12, marginTop: 9}}> {this.state.teamOpponentSeleted} </Text>|| <FontAwesome style= {{alignSelf: "center", color: "gray", fontSize: 12, marginTop: 9}}> {Icons.hourglassStart}</FontAwesome>}
            </View>
        </View>

        <Text style = {[styles.title, {marginBottom: 20}]}>Select a team</Text>

        <View>
          {this.renderButtons()}
        </View>


        <TouchableOpacity onPress = {this.props.closeModal} style = {styles.continueButton}>
          <Text style= {{color: "white", alignSelf: "center", fontSize: 16}}>CONTINUE</Text>
        </TouchableOpacity>
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
}

export default MatchDirect;
