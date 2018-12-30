import React, {Component}from "react";
import {View, Text, TouchableOpacity, Modal} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

const mainColor = "#00B073";

class Description extends Component{

  constructor(props){
    super(props);
    this.state = {
      visible: false,
      teamSelected: ""
    }
  }

  onSelectTeam(team){
    this.setState({ teamSelected: team })
  }

  renderButton(options){
    return options.map(x => {
        return(
          <TouchableOpacity style = {styles.button} onPress ={this.onSelectTeam.bind(this, x)}>
            <Text style = {{color: mainColor, alignSelf: "center", fontSize: 15, fontWeight: "400"}}>{x}</Text>
          </TouchableOpacity>
        );
    })
  }

  backOrLay(){
    const {teamSelected} = this.state;
    if(teamSelected){
      return(
        <View style = {styles.backLay}>
          <TouchableOpacity style = {{backgroundColor: "#F08080", padding: 15}} onPress = {() => this.setState({visible: true})}>
            <Text style = {{color: "#ffff"}}>14 users to match</Text>
          </TouchableOpacity>

          <Text style = {{color: mainColor, marginTop: 12, fontSize: 15}}> or </Text>

          <TouchableOpacity style = {{backgroundColor: "#ADD8E6", padding: 15}}>
            <Text style = {{color: "#ffff"}}> Make new bet</Text>
          </TouchableOpacity>
        </View>
      );
    } else return null
  }

  render(){

    let game = this.props.navigation.state.params.par;
    const options = [game.local, "Draw", game.visit]

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
          {this.renderButton(options)}
        </View>

        <View style = {styles.space}>
          {this.backOrLay()}
        </View>

        <Modal
            animationType = "slide"
            transparent = {false}
            visible = {this.state.visible}
            presentationStyle = "pageSheet"
        >
          <View style = {{ felx: 1, backgroundColor: "#ffff" }}>
            <Text>Team selected =  {this.state.teamSelected}</Text>
            <TouchableOpacity style = {{alignSelf: "center", marginTop: 20}} onPress  = {() => this.setState({visible: false})} >
              <Text >
                X
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
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
    backgroundColor: "black",
    marginBottom: 20,
    justifyContent: "space-around",
    padding: 15,
    paddingRight: 70,
    paddingLeft: 70,
    borderRadius: 3,
    shadowColor: '#696969',
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 1,
    elevation: 1,
  },
  backLay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  space: {
    marginBottom: 30
  }
}


export default Description;
