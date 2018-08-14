import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Modal} from "react-native";
import LinearGradient from "react-native-linear-gradient"
import FontAwesome, {Icons} from "react-native-fontawesome";
import Leagues from "./leagues";
var tennis = require ('../images/tennis.png');

class Sports extends Component{

  constructor(props){
    super(props);
    this.state = {modalShows: false}
  }

  onModalChange(){
    this.setState({modalShows: !this.state.modalShows})
  }

  render(){
    return(
      <View style = {{flex: 1, backgroundColor: "#1A1919"}}>
        <TouchableOpacity onPress = {this.onModalChange.bind(this)}>
          <Image
            style = {{width: 20, height: 20}}
            source = {{uri: "https://www.vectorportal.com/img_novi/tennis-ball-vector-ocal.jpg"}}
          />
        </TouchableOpacity>
        <Modal
            animationType ="slide"
            transparent = {false}
            visible = {this.state.modalShows}
          >
            <Leagues
              closeModal = {this.onModalChange.bind(this)}
            />
        </Modal>
      </View>
    );
  }
}

export default Sports;
