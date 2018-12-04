import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Modal, Dimensions, StatusBar, ScrollView} from "react-native";
import LinearGradient from "react-native-linear-gradient"
import FontAwesome, {Icons} from "react-native-fontawesome";
import Leagues from "./leagues";
import BMButton from "../reusable/bmButton"
import Header from "../reusable/header";
import ImageSlider from 'react-native-image-slider';


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
    ]

    const header = ["BET . MATCH . WIN", "Bet against other people", "The new way to bet"];

    const msg = ["Bet in the best leagues in the world", "Bet agains randoms and your friends in the world in your favorite sport events", "Bet from anywhere against anyone"]

    return(
      <View style = {{flex: 1, backgroundColor: "#1A1919"}}>
        <Header/>
        <ScrollView>
        <StatusBar hidden = {true}/>


        <View style = {styles.images}>
          <ImageSlider
              images= {images}
              autoPlayWithInterval={2500}
              customSlide={({ index, item, style, width }) => (
                <View key={index}>
                  <Image source = {{uri: item}} style = {style}/>

                  <View style = {styles.messageContainer}>
                    <Text style = {styles.title}> {header[index]} </Text>
                    <Text style = {styles.secondText}> {msg[index]} </Text>
                    <TouchableOpacity style = {styles.button}>
                      <Text style = {styles.buttonText}>BET NOW</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
          />
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
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  images: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.35,
    alignSelf: "center",
    borderRadius: 5,
  },
  title: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 17,
    margin: 10,
    marginBottom: 30
  },
  secondText: {
    color: "#ffff",
    fontWeight: "500",
    fontSize: 15,
    margin: 10,
  },
  button: {
    backgroundColor: "#00B073",
    padding: 8,
    borderRadius: 5,
    width: Dimensions.get("window").width * 0.3,
    margin: 10
  },
  buttonText: {
    color: "#ffff",
    fontSize: 17,
    alignSelf: "center",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    position: "absolute",
    marginTop: 10
  }
}

export default Home;
