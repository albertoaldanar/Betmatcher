import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Modal, Dimensions, StatusBar, ScrollView , ActivityIndicator} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import Games from "../constants/games";
import Header from "../reusable/header";
import ImageSlider from 'react-native-image-slider';
import LinearGradient from "react-native-linear-gradient";
import Card from "../reusable/card";
import Requests from "../constants/requests";
import Details from "../constants/eventsDetails";
import Carousell from "../reusable/carousel";
import GameCard from "../reusable/gameCard";
import Menu from "../reusable/menu";
import SideMenu from "react-native-side-menu";
import { NavigationActions } from 'react-navigation';

class Home extends Component{

  constructor(props){
    super(props);
    this.state = {showSidebar: false}
  }

  showSidebar(){
    this.setState({showSidebar: true})
  }

  getRoute(){
    const navigateAction = NavigationActions.navigate({
      routeName: "TopRequests"
    })
    this.props.navigation.dispatch(navigateAction);
  }

  renderLeagues(){
    return Images.map(i => {
      return(
        <View>
          <TouchableOpacity>
            <Image
              source = {{uri: i.image}}
              opacity = {0.45}
              style = {styles.categories}
            />
            <Text style = {{color: "#ffff", position: "absolute", top: 15, left: 15, fontWeight :"600" }}>{i.text}</Text>
          </TouchableOpacity>
        </View>
      );
    })
  }

  topRequests(){
    return Requests.map((r, index) => {
      return(
        <TouchableOpacity key = {index} >
          <Card>
            <View style = {{flexDirection:"row", paddingLeft: 5, marginBottom: 7, marginTop: 7}}>
              <Text style = {styles.desc}>{r.local}</Text>
              <Text style = {[styles.desc, {fontStyle :"oblique", fontWeight: "300"}]}>VS.</Text>
              <Text style = {styles.desc}>{r.visit}</Text>
            </View>

            <View style = {{flexDirection: "row", padding: 10, paddingBottom: 0, justifyContent: "space-between"}}>
              <Text style = {styles.user}>{r.user}</Text>
              <Text style = {[styles.game, {paddingRight: 10 , fontWeight: "bold", color: "#DAA520", fontSize: 14}]}>{r.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
              <Text style = {[styles.user, {paddingRight: 10}]}>{r.lay}</Text>
              <FontAwesome style ={styles.chevron}>{Icons.chevronRight}</FontAwesome>
            </View>
          </Card>
        </TouchableOpacity>
      );
    })
  }

  topEventDetials(){
    return Details.map((d, index) => {
      return(
        <TouchableOpacity key = {index}>
            <Card style = {{padding: 10}}>
              <View style = {{flexDirection:"row", paddingLeft: 5, marginBottom: 7, marginTop: 7}}>
                <Text style = {styles.desc}>{d.local}</Text>
                <Text style = {[styles.desc, {fontStyle :"oblique", fontWeight: "300"}]}>VS.</Text>
                <Text style = {styles.desc}>{d.visit}</Text>
              </View>

              <View style = {{flexDirection: "row", padding: 10, paddingBottom: 0, justifyContent: "space-between"}}>
                <View>
                  <Text style = {styles.exp}>Traded</Text>
                  <Text style = {[styles.game, {alignSelf: "center", paddingBottom: 10, fontWeight: "bold", fontSize: 14, color: "#DAA520"}]}>{d.traded} $</Text>
                </View>

                <View>
                  <Text style = {styles.exp}>Matches</Text>
                  <Text style = {[styles.game, {alignSelf: "center", paddingBottom: 10}]}>{d.matches}</Text>
                </View>

                <View>
                  <Text style = {styles.exp}>Unmatched</Text>
                  <Text style = {[styles.game, {alignSelf: "center", paddingBottom: 10}]}>{d.unmatchedBets}</Text>
                </View>

                <FontAwesome style ={styles.chevron}>{Icons.chevronRight}</FontAwesome>
              </View>
            </Card>
        </TouchableOpacity>
      );
    })
  }

  render(){

    console.log(Dimensions.get("window").width);
    const menu = <Menu/>

    const images = [
      "https://i.pinimg.com/originals/00/a5/78/00a5788ecd98460b6e832ba1d6e70715.jpg",
      'https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F488987%2Ftwo-young-men-shaking-hands-and-smiling-deal-shake-friends.jpg&w=700&op=resize',
      'https://images5.alphacoders.com/353/thumb-1920-353068.jpg'
    ];

    const header = ["Best leagues in the world", "Bet against other people", "Amazing feautures"];

    const msg = [
      "Bet in a way you never did before in the best leagues in the world",
      "Bet against your friends and random people around the world in your favorite sport events",
      "Betmatcher has amazing tools for bettors: Live results, chat with oppnent, stats and more"
    ]

    return(
      <SideMenu
        isOpen ={this.state.showSidebar}
        menu = {menu}
      >
        <View style = {{flex: 1, backgroundColor: "black"}}>
          <Header title = "Betmatcher" showSidebar = {this.showSidebar.bind(this)}/>
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

          <View>
            <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
              <Text style = {styles.title}> Users top events </Text>
              <TouchableOpacity>
                <Text style = {{color: "#00B073", fontSize: 12, margin: 19}}> See more <FontAwesome>{Icons.chevronRight}</FontAwesome> </Text>
              </TouchableOpacity>
            </View>
            {this.topEventDetials()}
          </View>

          <View style = {{marginTop: 15, marginBottom: 15}}>
            <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
              <Text style = {[styles.title, {marginBottom: 0}]}> Top leagues </Text>
              <TouchableOpacity>
                <Text style = {{color: "#00B073", fontSize: 12, margin: 19}}> More leagues <FontAwesome>{Icons.chevronRight}</FontAwesome> </Text>
              </TouchableOpacity>
            </View>

            <Carousell opacity = {0.55}/>
          </View>

          <View>
            <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
              <Text style = {styles.title}> Unmatched bets </Text>
              <TouchableOpacity onPress = {this.getRoute()}>
                <Text style = {{color: "#00B073", fontSize: 12, margin: 19}}> See more <FontAwesome>{Icons.chevronRight}</FontAwesome> </Text>
              </TouchableOpacity>
            </View>
            {this.topRequests()}
          </View>

          </ScrollView>
        </View>
      </SideMenu>
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
    borderRadius: 6

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
    color: "#F5F5F5",
    fontSize: 25,
    margin: 10,
    fontWeight: "600",
    fontStyle: "oblique"
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
    paddingRight: 5,
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
    fontSize: 14,
    fontWeight: "700",
    paddingRight: 5
  },
  categories: {
    width: 150,
    height: 130,
    borderRadius: 5,
  },
  exp: {
    color: "#00B073",
    fontSize: 15,
    fontStyle: "oblique",
    paddingBottom: 10
  }
}

export default Home;
