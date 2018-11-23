import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Modal} from "react-native";
import LinearGradient from "react-native-linear-gradient"
import FontAwesome, {Icons} from "react-native-fontawesome";
import Leagues from "./leagues";
import Carousel from "react-native-snap-carousel";

var tennis = require ('../images/tennis.png');

class Home extends Component{

  constructor(props){
    super(props);
    this.state = {modalShows: false, entries: ["s", "b", "c"]}
  }

  onModalChange(){
    this.setState({modalShows: !this.state.modalShows})
  }

  carouselItem(){
    return(
      <View>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
      </View>
    );
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

        <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.entries}
            renderItem={this.carouselItem.bind(this)}
            sliderWidth={40}
            itemWidth={40}
        />
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

export default Home;
