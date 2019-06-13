import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Modal, Dimensions, StatusBar, ScrollView , ActivityIndicator, AsyncStorage} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import Games from "../constants/games";
import Header from "../reusable/header";
import Leagues from "./leagues";
import ImageSlider from 'react-native-image-slider';
import LinearGradient from "react-native-linear-gradient";
import Lgs from "../constants/leagues";
import Card from "../reusable/card";
import Requests from "../constants/requests";
import Carousell from "../reusable/carousel";
import GameCard from "../reusable/gameCard";
import Menu from "../reusable/menu";
import SideMenu from "react-native-side-menu";
import { NavigationActions } from 'react-navigation';

class Home extends Component{

   _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      showSidebar: false,
      leaguesModal: false,
      leagues: [],
      topRequests: [],
      topTradedEvents: [],
      data: "",
      showModal: true,
      sports: []
   }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount(){
    this._isMounted = true;

    return fetch("http://localhost:8000/home_data")
        .then(res => res.json())
          .then(response => {
            if (this._isMounted){
              this.setState({
                  leagues: response["leagues"],
                  topRequests: response["top_request"],
                  topTradedEvents: response["top_traded"],
                  sports: response["sports"]
              })
            }
          }).then(setTimeout(() => {this.setState({showModal: false})}, 3000))


  }

  showSidebar(){
    this.setState({showSidebar: true})
  }

  handleLogout(){
    this.setState({showModal: true})

    try {
     AsyncStorage.removeItem("username");
     AsyncStorage.removeItem('token');
    } catch (error) {
    console.log(error.message);
    }

    setTimeout(()=> {
      const navigateAction = NavigationActions.navigate({
        routeName: "Login"
      })
      this.props.navigation.dispatch(navigateAction);
    }, 3000)

  }


  sendToDescription(game){
    const navigateAction = NavigationActions.navigate({
      routeName: "Description",
      params: {par: game}
    })
    this.props.navigation.dispatch(navigateAction);
  }

  topRequests(){
    const requests = this.state.topRequests;

    return requests.map((r, index) => {
      return(
        <TouchableOpacity key = {index}>
            <Card style = {{padding: 10}}>
              <View style = {{flexDirection:"row", paddingLeft: 5, marginBottom: 7, marginTop: 7}}>
                <Text style = {styles.desc}>{r.event.local.name}</Text>
                <Text style = {[styles.desc, {fontStyle :"oblique", fontWeight: "300"}]}>VS.</Text>
                <Text style = {styles.desc}>{r.event.visit.name}</Text>
              </View>

              <View style = {{flexDirection: "row", padding: 10, paddingBottom: 0, justifyContent: "space-between"}}>
                <View>
                  <Text style = {styles.exp}>User</Text>
                  <Text style = {[styles.game, {alignSelf: "center", paddingBottom: 10, fontWeight: "bold", fontSize: 14}]}>{r.back_user.username}</Text>
                </View>

                <View>
                  <Text style = {styles.exp}>Bet</Text>
                  <Text style = {[styles.game, {alignSelf: "center", paddingBottom: 10 , color: "#DAA520"}]}>{r.amount} £</Text>
                </View>

                <View>
                  <Text style = {styles.exp}>For</Text>
                  <Text style = {[styles.game, {alignSelf: "center", paddingBottom: 10}]}>{r.back_team}</Text>
                </View>

                <FontAwesome style ={styles.chevron}>{Icons.chevronRight}</FontAwesome>
              </View>
            </Card>
        </TouchableOpacity>
      );
    })
  }

  topEventDetials(){
      const {topTradedEvents} = this.state;
      return topTradedEvents.map((event, index) => {
        if (topTradedEvents.length > 0){
          return(
            <TouchableOpacity key = {index} onPress = {this.sendToDescription.bind(this, event)}>
                <Card style = {{padding: 10}}>
                  <View style = {{flexDirection:"row", paddingLeft: 5, marginBottom: 7, marginTop: 7}}>
                    <Text style = {styles.desc}>{event.local.name}</Text>
                    <Text style = {[styles.desc, {fontStyle :"oblique", fontWeight: "300"}]}>VS.</Text>
                    <Text style = {styles.desc}>{event.visit.name}</Text>
                  </View>

                  <View style = {{flexDirection: "row", padding: 10, paddingBottom: 0, justifyContent: "space-between"}}>
                    <View>
                      <Text style = {styles.exp}>Traded</Text>
                      <Text style = {[styles.game, {alignSelf: "center", paddingBottom: 10, fontWeight: "bold", fontSize: 14, color: "#DAA520"}]}>{event.data.traded} £</Text>
                    </View>

                    <View>
                      <Text style = {styles.exp}>Matches</Text>
                      <Text style = {[styles.game, {alignSelf: "center", paddingBottom: 10}]}>{event.data.matched_bets}</Text>
                    </View>

                    <View>
                      <Text style = {styles.exp}>Unmatched</Text>
                      <Text style = {[styles.game, {alignSelf: "center", paddingBottom: 10}]}>{event.data.unmatched_bets}</Text>
                    </View>

                    <FontAwesome style ={styles.chevron}>{Icons.chevronRight}</FontAwesome>
                  </View>
                </Card>
            </TouchableOpacity>
          );
        } else {
          return(
            <Card style = {{padding: 50}}>
              <Text>gergergerg</Text>
            </Card>
          )
        }
      })
  }

  render(){

    console.log(Dimensions.get("window").width);
    console.log(this.state.showModal)
    const menu =  <Menu
                    leagues= {Lgs}
                    sports = {this.state.sports}
                    handleLogout = {this.handleLogout.bind(this)}
                  />

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
        <Modal
          visible = {this.state.showModal}
        >
          <View style = {{flex: 1, backgroundColor: "#161616"}}>
            <Text style = {{marginTop: 100, color: "white", textAlign: "center", fontSize: 20}}>Welcome to Betmatcher</Text>
          </View>
        </Modal>
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
              <Text style = {styles.title}> Top traded events </Text>
              <TouchableOpacity>
                <Text style = {{color: "#00B073", fontSize: 12, margin: 19}}> View more <FontAwesome>{Icons.chevronRight}</FontAwesome> </Text>
              </TouchableOpacity>
            </View>
            {this.topEventDetials()}
          </View>

          <View style = {{marginTop: 15, marginBottom: 15}}>
            <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
              <Text style = {[styles.title, {marginBottom: 0}]}> Top leagues </Text>
              <TouchableOpacity>
                <Text style = {{color: "#00B073", fontSize: 12, margin: 19}}> View more <FontAwesome>{Icons.chevronRight}</FontAwesome> </Text>
              </TouchableOpacity>
            </View>

            <Carousell opacity = {0.55} leagues = {this.state.leagues}/>
          </View>

          <View>
            <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
              <Text style = {styles.title}> Unmatched bets </Text>
              <TouchableOpacity>
                <Text style = {{color: "#00B073", fontSize: 12, margin: 19}}> View more <FontAwesome>{Icons.chevronRight}</FontAwesome> </Text>
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
