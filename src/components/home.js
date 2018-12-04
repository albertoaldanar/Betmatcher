import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Modal, Dimensions, StatusBar, ScrollView} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import Games from "../constants/games";
import Leagues from "./leagues";
import BMButton from "../reusable/bmButton"
import Header from "../reusable/header";
import ImageSlider from 'react-native-image-slider';
import LinearGradient from "react-native-linear-gradient";
import Card from "../reusable/card";
import Requests from "../constants/requests";

class Home extends Component{

  constructor(props){
    super(props);
    this.state = {modalShows: false}
  }

  onModalChange(){
    this.setState({modalShows: !this.state.modalShows})
  }

  topRequests(){
    return Requests.map(r => {
      return(
        <TouchableOpacity>
          <Card>
            <View style = {{flexDirection:"row", paddingLeft: 5}}>
              <Text style = {styles.desc}>{r.local}</Text>
              <Text style = {[styles.desc, {fontStyle :"oblique", fontWeight: "300"}]}>VS.</Text>
              <Text style = {styles.desc}>{r.visit}</Text>
            </View>

            <View style = {{flexDirection: "row", padding: 10, paddingBottom: 0, justifyContent: "space-between"}}>
              <Text style = {styles.user}>{r.user}</Text>
              <Text style = {[styles.game, {paddingRight: 10}]}>{r.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
              <Text style = {[styles.user, {paddingRight: 10}]}>{r.lay}</Text>
              <FontAwesome style ={styles.chevron}>{Icons.chevronRight}</FontAwesome>
            </View>
          </Card>
        </TouchableOpacity>
      );
    })
  }

  render(){

    const images = [
      "https://i.pinimg.com/originals/00/a5/78/00a5788ecd98460b6e832ba1d6e70715.jpg",
      'https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F488987%2Ftwo-young-men-shaking-hands-and-smiling-deal-shake-friends.jpg&w=700&op=resize',
      'https://images5.alphacoders.com/353/thumb-1920-353068.jpg'
    ]

    const header = ["Bet against other people", "Bet against other people", "Amazing feautures"];

    const msg = [
      "Bet in a way you never did before in the best leagues in the world",
      "Bet against your friends and random people around the world in your favorite sport events",
      "Betmatcher has amazing tools for bettors: Live results, chat with oppnent, stats and more"
    ]

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
                    <Image source = {{uri: item}} style = {style} opacity = {0.35}/>

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

        <Text style = {styles.title}> Top bets to match </Text>

        <View>
          {this.topRequests()}
        </View>

        <Text style = {styles.title}> Top leagues </Text>

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
    borderRadius: 5,
    width: Dimensions.get("window").width * 0.92,
    height: Dimensions.get("window").height * 0.35,
    alignSelf: "center",
    margin: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,

  },
  title: {
    color: "#ffff",
    fontWeight: "500",
    fontSize: 24,
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
  },
  title: {
    color: "#ffff",
    fontSize: 20,
    margin: 10,
    fontWeight: "600"
  },
  directCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
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
    fontSize: 12,
    fontWeight: "600",
    paddingRight: 5
  }
}

export default Home;
