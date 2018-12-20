import React, {Component}from "react";
import {View, Text, TouchableOpacity, Modal} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

class Description extends Component{

  constructor(props){
    super(props);
    this.state = {
      visible: false,
      teamSelected: ""
    }
  }

  showModal(team){
    this.setState({ visible: !this.state.visible, teamSelected: team })
  }

  renderButton(options){
    return options.map(x => {
      return(
        <TouchableOpacity style = {styles.button} onPress ={this.showModal.bind(this, x)}>
          <Text style = {{color: "white", alignSelf: "center", fontSize: 15, fontWeight: "400"}}>{x}</Text>
        </TouchableOpacity>
      );
    })
  }

  render(){

    let game = this.props.navigation.state.params.par;
    const options = [game.local, "Draw", game.visit]

    return(
      <View style = {styles.container}>
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

        <View style = {{marginLeft: 15, marginRight: 15}}>
          {this.renderButton(options)}
        </View>

        <Modal
            animationType = "slide"
            transparent = {false}
            visible = {this.state.visible}
        >
          <View style = {{ felx: 1, backgroundColor: "#ffff" }}>
            <Text>Team selected =  {this.state.teamSelected}</Text>
            <TouchableOpacity onPress  = {() => this.setState({visible: false})} >
              <Text>
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
    marginBottom: 5,
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
    backgroundColor: "#00B073",
    marginTop: 30,
    marginBottom: 30,
    justifyContent: "space-around",
    padding: 15,
    paddingRight: 70,
    paddingLeft: 70,
    borderRadius: 3,

  }
}


export default Description;
