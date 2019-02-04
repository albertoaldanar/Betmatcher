import React, {Component}from "react";
import {View, Text, TouchableOpacity, Modal, ActivityIndicator} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import BetModal from "../reusable/betModal";
import UserList1 from "../constants/userList1";
import UserList2 from "../constants/userList2";
import {NavigationActions} from "react-navigation";
import AwesomeAlert from 'react-native-awesome-alerts';

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
      showButtons: false
    }
  }

  sendToConfirmation(route, user){
    let game = this.props.navigation.state.params.par;
    const options = [game.local, game.visit, "Draw"]
    const teamsNotSelected = options.filter(x => x!= this.state.teamSelected);

    var index = this.state.index == 1 ? teamsNotSelected[1] : teamsNotSelected[0];

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: {
                user: user,
                game: game,
                teamSelected: this.state.teamSelected,
                teamsNotSelected: index
              }
    });
    this.props.navigation.dispatch(navigateAction);
    this.setState({visible: false})
  }

  renderUsersToMatch(){
    return fetch("http://192.168.0.3:3000/api/variable")
      .then(res => res.json())
        .then(response => {
          this.setState({
            message:` ${response.data} users to match`,
            loading: false,
            showButtons: true
          })
        })
      this.setState({loading: false})
  }

  onSelectTeam(team){
    const {showLightBox} = this.state;
    this.setState({ teamSelected: team, showLightBox: true})
    this.birghtColor(team);
    this.renderUsersToMatch();
  }

  handleSegmentedController(index){
    this.setState({ index })
  }

  birghtColor(team){
    let game = this.props.navigation.state.params.par;
    switch(team){
        case game.local:
          return this.setState({local: true, draw: false, visit: false})
          break;

        case "Draw":
          return this.setState({local: false, draw: true, visit: false})
          break;

        case game.visit:
          return this.setState({local: false, draw: false, visit: true})
          break;
    }
  }

  showModal(){
    this.setState({visible: !this.state.visible, showLightBox: false, teamSelected: ""})
  }

  renderButton(){
    let game = this.props.navigation.state.params.par;
    const {teamSelected, local, visit, draw} = this.state;
      if(game.sport == "Soccer"){
        return(
          <View>
            <TouchableOpacity style = {local ? styles.buttonSelected : styles.button} onPress ={this.onSelectTeam.bind(this, game.local)}>
              <Text style = {styles.t}>{game.local}</Text>
            </TouchableOpacity>

            <TouchableOpacity style = { draw ? styles.buttonSelected : styles.button} onPress ={this.onSelectTeam.bind(this, "Draw")}>
              <Text style = {styles.t}>Draw</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {visit ? styles.buttonSelected : styles.button} onPress ={this.onSelectTeam.bind(this, game.visit)}>
              <Text style = {styles.t}>{game.visit}</Text>
            </TouchableOpacity>
          </View>
        );
      } else{
          return(
            <View>
              <TouchableOpacity style = {local ? styles.buttonSelected : styles.button} onPress ={this.onSelectTeam.bind(this, game.local)}>
                <Text style = {styles.t}>{game.local}</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {visit ? styles.buttonSelected : styles.button} onPress ={this.onSelectTeam.bind(this, game.visit)}>
                <Text style = {styles.t}>{game.visit}</Text>
              </TouchableOpacity>
            </View>
          );
        }
  }

  render(){
    const {betChoice, teamSelected, showLightBox} = this.state;
    let game = this.props.navigation.state.params.par;
    const options = [game.local, game.visit, "Draw"]
    const teamsNotSelected = options.filter(x => x!= teamSelected);

    return(
      <View style = {styles.container}>

        <View style = {styles.space}>
            <Text style = {styles.title}>Game information</Text>
            <View style = {styles.card}>
              <FontAwesome style = {styles.icon}>{Icons.circle}</FontAwesome>

              <View>
                <Text style = {styles.text}>{game.league}</Text>
                <Text style = {[styles.text, {fontWeight: "300", fontSize: 11, fontStyle: "oblique"}]}>{game.time}</Text>

                <View style = {styles.game}>
                  <Text style = {styles.word}>{game.local}</Text>
                  <Text style = {[styles.word, {fontStyle: "oblique"}]}>VS.</Text>
                  <Text style = {styles.word}>{game.visit}</Text>
                </View>
              </View>
            </View>
        </View>

        <View style = {[styles.space, {marginRight: 15, marginLeft: 15}]}>
          {this.renderButton()}
        </View>

        <Modal
            transparent = {false}
            visible = {this.state.visible}
            animationType = "Fade"
        >

          <BetModal
            teamsNotSelected = {teamsNotSelected}
            choice = {betChoice} team = {teamSelected} index = {this.state.index}
            list1 = {UserList1}
            list2 = {UserList2}
            game = {game}
            segmentedController = {this.handleSegmentedController.bind(this)}
            visible = {this.showModal.bind(this)}
            confirm = {this.sendToConfirmation.bind(this)}
          />
        </Modal>

        <AwesomeAlert
          show={showLightBox}
          showProgress={this.state.loading}
          progressColor= "#00B073"
          title= {this.state.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={this.state.showButtons}
          showConfirmButton={this.state.showButtons}
          cancelText="Match a user"
          confirmText="Make new bet"
          confirmButtonColor="#DAA520"
          onCancelPressed={() => {
            this.setState({visible: true, betChoice: 1, showLightBox: false})
          }}
          onConfirmPressed={() => {
            this.setState({visible: true, betChoice: 2, showLightBox: false})
          }}
          titleStyle = {{color: "#00B073", fontStyle:"oblique", fontWeight:"bold", fontSize: 20}}
          cancelButtonColor =  "#00B073"
          contentContainerStyle = {{padding: 25, borderRadius: 5}}
          cancelButtonTextStyle = {{fontSize: 15}}
          confirmButtonTextStyle = {{fontSize: 15}}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "black",
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
    padding: 20
  },
  text: {
    color: "#ffff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6
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
  betOptions: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center"
  },
  button: {
    backgroundColor: "#161616",
    marginBottom: 20,
    justifyContent: "space-around",
    padding: 15,
    marginLeft:20,
    marginRight: 20,
    paddingRight: 90,
    paddingLeft: 90,
    borderRadius: 25,
    shadowColor: 'black',
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 1,
    elevation: 1,
  },
  buttonSelected: {
    backgroundColor: "#00B073",
    marginBottom: 20,
    justifyContent: "space-around",
    padding: 15,
    marginLeft:20,
    marginRight: 20,
    paddingRight: 90,
    paddingLeft: 90,
    borderRadius: 25,
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
    marginBottom: 40
  },
  t: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "400"
  }
}


export default Description;
