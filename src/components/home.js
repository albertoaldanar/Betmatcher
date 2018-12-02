import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Modal, Dimensions} from "react-native";
import LinearGradient from "react-native-linear-gradient"
import FontAwesome, {Icons} from "react-native-fontawesome";
import Leagues from "./leagues";
import BMButton from "../reusable/bmButton"
import Header from "../reusable/header";
import ImageSlider from 'react-native-image-slider';

var tennis = require ('../images/tennis.png');

class Home extends Component{

  constructor(props){
    super(props);
    this.state = {modalShows: false}
  }

  onModalChange(){
    this.setState({modalShows: !this.state.modalShows})
  }

  render(){


    const images = [
        'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bbb5a131251589.56488ec072087.png',
        'https://i.imgur.com/31G5r5w.jpg?1',
        "https://ep01.epimg.net/deportes/imagenes/2017/03/10/actualidad/1489164710_500738_1489165158_noticia_normal.jpg"
    ];

    return(
      <View style = {{flex: 1, backgroundColor: "#1A1919"}}>
        <Header/>

        <View style = {styles.images}>
          <ImageSlider
              style = {styles.images}
              images= {images}
              autoPlayWithInterval={2500}
          />
        </View>

        <View style = {{margin: 10, marginTop: -220}}>
          <Text style = {styles.title}> Bet agains other people</Text>
          <Text style = {styles.secondText}> Bet agains your friends and randoms around the world in your favorite sport events </Text>
          <TouchableOpacity style = {styles.button}>
            <Text style = {styles.buttonText}> BET NOW </Text>
          </TouchableOpacity>
        </View>

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

const styles = {
  images: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.35,
    alignSelf: "center",
    borderRadius: 5
  },
  title: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 25,
    justifyContent: "flex-start",
    marginBottom: 13
  },
  secondText: {
    color: "#ffff",
    fontWeight: "500",
    fontSize: 18,
    justifyContent: "flex-start",
    marginBottom: 20
  },
  button: {
    backgroundColor: "#00B073",
    padding: 8,
    borderRadius: 5,
    width: Dimensions.get("window").width * 0.3
  },
  buttonText: {
    color: "#ffff",
    fontSize: 17,
    alignSelf: "center"
  }
}

export default Home;
