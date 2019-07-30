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
import { NavigationActions } from 'react-navigation';
import Wating from "../reusable/wating";
import Modal from "react-native-modal";

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
      topTradedEvents: [],
      data: "",
      showModal: true,
      sports: [], refreshing: false, currentUser: "",
      requestModal: false, requestSelected: {}, isLoadingData: true
   }
   this.filteredEvents = this.filteredEvents.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async callHome(){
    this._isMounted = true;

    const usernameGet = await AsyncStorage.getItem('username');
    this.setState({ currentUser: usernameGet, showSidebar: false});

    return fetch(`http://${Url}:8000/home_data?current_user=${this.state.currentUser}`)
        .then(res => res.json())
          .then(response => {
            if (this._isMounted){
              this.setState({
                  leagues: response["leagues"],
                  topRequests: response["top_request"],
                  topTradedEvents: response["top_traded"],
                  sports: response["sports"],
                  isLoadingData: false,

              })
            }
          }).then(setTimeout(() => {this.setState({showModal: false})}, 2500))
  }

  componentDidMount(){
    return this.callHome()
  }

  showSidebar(){
    this.setState({showSidebar: true})
  }

  requestModal(){
    this.setState({requestModal: !this.state.requestModal})
  }

  handleLogout(){
    this.setState({showModal: true})

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

  filteredEvents(league){
    const navigateAction = NavigationActions.navigate({
      routeName: "filteredEvents",
      params: {
        league: league
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

  topEventDetials(){
      const {topTradedEvents} = this.state;
      const evnetsToShow = topTradedEvents.slice(0,5);
      return topTradedEvents.map((event, index) => {
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
        } else {
          return(
            <Card style = {{padding: 50}}>
              <Text>gergergerg</Text>
            </Card>
          )
        }
      })
  }

    renderItem ({item, index}, parallaxProps) {
        return (
              <TouchableOpacity>
                <ParallaxImage
                    source={{ uri: item.img }}
                    containerStyle={styles.imgContainer}
                    style={styles.image}
                    index = {2}
                    parallaxFactor={0.6}
                    showSpinner = {true}
                    spinnerColor = {"#00B073"}
                    {...parallaxProps}
                />
                <Text style={styles.tit} numberOfLines={2}>
                    { item.name }
                </Text>
              </TouchableOpacity>
        );
    }

    loading(){
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
                </View>
                {this.topEventDetials()}
              </View>

              <View style = {{marginTop: 15, marginBottom: 15}}>
                <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
                  <Text style = {[styles.title, {margin:0}]}> Top leagues </Text>
                  <TouchableOpacity onPress = {this.callNavigation.bind(this, "AllLeagues", this.state.leagues)}>
                    <Text style = {{color: "#00B073", fontSize: 12, margin: 19}}> View all <FontAwesome>{Icons.chevronRight}</FontAwesome> </Text>
                  </TouchableOpacity>
                </View>

                <Carousel
                        data={this.state.leagues}
                        renderItem={this.renderItem}
                        ref={'carousel'}
                        hasParallaxImages={true}
                        style={{opacity: 0.4}}
                        sliderWidth={sliderWidth}
                        itemWidth={sliderWidth* 0.36}
                        itemHeight={itemHeight}
                        firstItem= {1}
                />
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

    const menu =  <Menu
                    leagues= {Lgs}
                    sports = {this.state.sports}
                    handleLogout = {this.handleLogout.bind(this)}
                    filteredEvents = {this.callNavigation.bind(this)}
                  />

    return(
      <SideMenu
        isOpen ={this.state.showSidebar}
        menu = {menu}
      >
        <View style = {{flex: 1, backgroundColor: "black"}}>
          <Header title = "Betmatcher" showSidebar = {this.showSidebar.bind(this)}/>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.callHome.bind(this)}
              />
            }
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
    }
}

export default Home;
