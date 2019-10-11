import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView , ActivityIndicator, AsyncStorage, RefreshControl} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import Url from "../constants/url";
import Header from "../reusable/header";
import Leagues from "./leagues";
import ImageSlider from 'react-native-image-slider';
import LinearGradient from "react-native-linear-gradient";
import Lgs from "../constants/leagues";
import Card from "../reusable/card";
import Requests from "../constants/requests";
import Carousell from "../reusable/carousel";
import MatchDirect from "../reusable/matchDirect";
import GameCard from "../reusable/gameCard";
import Menu from "../reusable/menu";
import SideMenu from "react-native-side-menu";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { NavigationActions, NavigationEvents } from 'react-navigation';
import Wating from "../reusable/wating";
import Modal from "react-native-modal";
import AnimateNumber from 'react-native-countup';

const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

class Home extends Component{

   _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      showSidebar: false,
      leaguesModal: false,
      leagues: [],
      topRequests: [],
      topTradedEvents: [[[]]],
      data: "",
      showModal: true,
      sports: [], refreshing: false, currentUser: "", coins: 0,
      requestModal: false, requestSelected: {}, isLoadingData: true, banners: [ [], [], [], [] ]
   }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async callHome(){
    this._isMounted = true;

    const usernameGet = await AsyncStorage.getItem('username');
    this.setState({ currentUser: usernameGet, showSidebar: this.state.showSidebar});

    return fetch(`http://${Url}:8000/home_data?current_user=${this.state.currentUser}`)
        .then(res => res.json())
          .then(response => {
            if (this._isMounted){
              this.setState({
                  leagues: response["leagues"],
                  topRequests: response["top_request"],
                  topTradedEvents: response["top_traded"],
                  sports: response["sports"],
                  banners: response["banners"],
                  isLoadingData: false,
                  coins: response.user.profile.coins
              })
            }
          }).then(setTimeout(() => {this.setState({showModal: false})}, 2500))
  }

  componentDidMount(){
    // this.interval = setInterval(() => this.callHome(), 3000);
    return this.callHome()
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  showSidebar(){
    this.setState({showSidebar: true})
  }

  requestModal(){
    this.setState({requestModal: !this.state.requestModal})
  }

  handleLogout(){
    this.setState({showModal: false})

    try {
      AsyncStorage.removeItem("username");
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('coins');
    } catch (error) {
    console.log(error.message);
    }

    const navigateAction = NavigationActions.navigate({
      routeName: "Login"
    })
    this.props.navigation.dispatch(navigateAction);
  }

  sendToConfirmation(user, quote, bet, game, teamSelected, teamsNotSelected){
    const navigateAction = NavigationActions.navigate({
      routeName: "ConfirmBet",
      params: {
                user: user, game: game,
                teamSelected: teamSelected,
                quote: quote, bet: bet,
                teamsNotSelected: teamsNotSelected,
                sentFrom: "Direct",
              }
    });
    this.props.navigation.dispatch(navigateAction);
    this.setState({requestModal: false})
  }

  callNavigation(route, data){
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: {
        par: data, currentUser: this.state.currentUser
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }
  
  topRequests(){
    const requests = this.state.topRequests;
    const requestsToShow = requests.slice(0,5);

    return requestsToShow.map((r, index) => {
      return(
        <TouchableOpacity key = {index} onPress = {() => this.setState({requestSelected: r, requestModal: true, showSidebar: false})}>
            <Card style = {{padding: 10}}>
              <View style = {{flexDirection:"row", paddingLeft: 5, marginBottom: 7, marginTop: 7}}>
                <Text style = {[styles.desc, {color:"#DCDCDC", fontWeight: "300", fontStyle: "oblique"}]}>{r.event.local.name}</Text>
                <Text style = {[styles.desc, {fontStyle :"oblique", fontWeight: "300", color: "#DCDCDC"}]}>VS.</Text>
                <Text style = {[styles.desc, {color:"#DCDCDC", fontWeight: "300", fontStyle: "oblique"}]}>{r.event.visit.name}</Text>
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


  topEvent(){
    const {topTradedEvents} = this.state;
      console.log(topTradedEvents[0])
      if (topTradedEvents.length > 0){
        return(
            <TouchableOpacity onPress = {this.callNavigation.bind(this, "Description", topTradedEvents[0])} style= {{ margin: 3, marginRight: 3, borderRadius: 3}}>
                <Image
                  style={styles.image}
                  source ={{uri: topTradedEvents[0].data.img}}
                />

                <View style = {{position: "absolute", top: 15, left: 5}}>
                      <View style = {{flexDirection:"row", marginBottom: 7}}>
                        <Text style = {[styles.league, {marginRight: 5}]}>{topTradedEvents[0].data.sport.name}</Text>
                        <FontAwesome style = {{color: "#ffff", fontSize: 8, fontWeight: "400", marginTop: 3}}>{Icons.chevronRight}</FontAwesome>
                        <Text style = {[styles.league, {marginLeft: 5}]}>{topTradedEvents[0].data.league.name}</Text>
                      </View>
                      
                      <View style = {{flexDirection:"row"}}>
                        <Text style = {styles.desc}>{topTradedEvents[0].local.name}</Text>
                        <Text style = {[styles.desc, {fontStyle :"oblique", fontWeight: "300"}]}>VS.</Text>
                        <Text style = {styles.desc}>{topTradedEvents[0].visit.name}</Text>
                      </View>
                </View>

                <View style = {{position: "absolute", right: 5, bottom: 5,}}>
                      <View style = {{flexDirection:"row", paddingTop: 10}}>
                        <Text style = {{color: "#F5F5F5", fontWeight: "bold"}}>Traded</Text>
                        <Text style = {[styles.game, { fontWeight: "300", fontSize: 15, color: "#DAA520", marginLeft: 6}]}>{topTradedEvents[0].data.traded} £</Text>
                      </View>
                </View>
            </TouchableOpacity>
        );
      } else {return null}
  }

  topEventsDetials(){
      const {topTradedEvents} = this.state;
      const evnetsToShow = topTradedEvents.slice(0,5);

      const topEventRemoved = topTradedEvents.slice(1);
      console.log(topEventRemoved);

      return topEventRemoved.map((event, index) => {
        if (topTradedEvents.length > 0){
          return(
            <TouchableOpacity key = {index} onPress = {this.callNavigation.bind(this, "Description", event)}>
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
        }
      })
  }


  leaguesScroll(){
    return this.state.leagues.map(item => {
        return(
          <TouchableOpacity onPress = {this.callNavigation.bind(this, "FilteredEvents", item.name)}>
            <Image
              style={[styles.image, {width: Dimensions.get("window").width * 0.3, borderRadius: 5, marginRight: 15, height: 200}]}
              source ={{uri: item.img}}
            />
                <Text style={styles.tit}>
                    { item.name }
                </Text>
          </TouchableOpacity>
        );
    })
  }

    loading(){

      const {banners} = this.state;

      const images = [
        banners[0].img,
        banners[1].img,
        banners[2].img,
        banners[3].img
      ];

      const header = [banners[0].title, banners[1].title, banners[2].title, banners[3].title];

      const msg = [
        banners[0].message,
        banners[1].message,
        banners[2].message,
        banners[3].message
      ]

      if(this.state.isLoadingData){
        return(
           <ActivityIndicator size="large" color="white" style= {{alignSelf:"center", position: "absolute", marginTop: 150, justifyContent: "center"}}/>
        );
      } else {
        return(
          <View>
            <View style = {styles.images}>
                  <ImageSlider
                      images= {images}
                      autoPlayWithInterval={3000}
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
                </View>
                {this.topEvent()}
                {this.topEventsDetials()}
              </View>

              <View style = {{marginTop: 15, marginBottom: 15}}>
                <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
                  <Text style = {[styles.title, {margin:0}]}> Top leagues </Text>
                  <TouchableOpacity onPress = {this.callNavigation.bind(this, "AllLeagues", this.state.leagues)}>
                    <Text style = {{color: "#00B073", fontSize: 12, margin: 19}}> View all <FontAwesome>{Icons.chevronRight}</FontAwesome> </Text>
                  </TouchableOpacity>
                </View>


                <ScrollView
                  horizontal
                  keyboardShouldPersistTaps={true}
                  style = {{height: 200, marginRight: 7, marginLeft: 7}}
                >
                  {this.leaguesScroll()}
                </ScrollView>

              </View>

              <View>
                <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
                  <Text style = {styles.title}> Unmatched bets </Text>
                  <TouchableOpacity onPress = {this.callNavigation.bind(this, "TopRequests",  this.state.topRequests)}>
                    <Text style = {{color: "#00B073", fontSize: 12, margin: 19}}> View more <FontAwesome>{Icons.chevronRight}</FontAwesome> </Text>
                  </TouchableOpacity>
                </View>
                {this.topRequests()}
              </View>
            </View>
        );
      }
    }

  render(){
    const {requestSelected, currentUser} = this.state;
    console.log(this.state.requestSelected);
    console.log(this.state.coins);

    const menu =  <Menu
                    leagues= {Lgs}
                    coins = {this.state.coins}
                    sports = {this.state.sports}
                    handleLogout = {this.handleLogout.bind(this)}
                    filteredEvents = {this.callNavigation.bind(this)}
                    closeModal = {() => this.setState({showSidebar: false})}
                  />

    return(
      <SideMenu
        isOpen ={this.state.showSidebar}
        menu = {menu}
      >

        <NavigationEvents
          onDidFocus={payload => this.callHome()}
        />

        <View style = {{flex: 1, backgroundColor: "black"}}>
          <Header title = "Betmatcher" showSidebar = {this.showSidebar.bind(this)} hasSidebar = {true}/>
          <ScrollView
          >
            <StatusBar hidden = {true}/>
            
            {this.loading()}
          </ScrollView>

          <Modal
            isVisible = {this.state.requestModal}
            >
              <MatchDirect
                  closeModal = {this.requestModal.bind(this)}
                  directBet = {requestSelected}
                  currentUser = {currentUser}
                  sendToConfirmation = {this.sendToConfirmation.bind(this)}
              />
          </Modal>

        </View>
      </SideMenu>
    );
  }
}

const styles = {
  images: {
    borderRadius: 5,
    width: Dimensions.get("window").width * 0.98,
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
    fontFamily: "Avenir"
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
    fontStyle: "oblique",
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
  },
  imgContainer: {
      borderRadius: 5,
      width: sliderWidth * 0.35,
      height: itemHeight * 0.2,
      opacity: 0.55
    },
  tit: {
      color: "#ffff",
      fontSize: 15,
      fontWeight: "600",
      position: "absolute",
      top: 5,
      left: 2
    },
  it:{
      margin: 20,
      marginLeft: 0,
      marginBottom: 20,
      marginTop: 10
    },
  topCard: {
    backgroundColor: "red"
  },
  image: {
    width: Dimensions.get("window").width* 0.98,
    height: 330,
    opacity: 0.4,
    marginRight: 3,
    borderRadius: 3
  },
  league: {
    color: "#00B073",
    fontWeight: "bold",
    fontSize: 11
  },
}

export default Home;
