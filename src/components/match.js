import React, {Component} from "react";
import {View,Text, TouchableOpacity, Image, ScrollView, AsyncStorage} from "react-native";
import Header from "../reusable/header";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Matches from "../constants/matches";
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";
import Chat from "../reusable/chat";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import MaterialTabs from "react-native-material-tabs";

class Match extends Component{

  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {index: 0, chat: false, modal: false, matches: [], unmatched: [], finished: [], token: "", currentUser: ""}
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount(){
    this._isMounted = true;

    const usernameGet = await AsyncStorage.getItem('username');
        if (usernameGet) {
          this.setState({ currentUser: usernameGet});
        } else {
          this.setState({ currentUser: false });
    }

    const tokenGet = await AsyncStorage.getItem('token');
        if (tokenGet) {
          this.setState({ token: tokenGet});
        } else {
          this.setState({ token: false });
    }

    const {data} = this.state;

      return fetch("http://localhost:8000/matches/", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": `Token ${this.state.token}`
        }
      })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes)
      })
      .catch(error => console.log(error));
  }

  handleIndexChange(index){
    this.setState({index})
  }

  toggleModal(){
    this.setState({modal: !this.state.modal})
  }

  renderChat(){
    this.setState({chat: !this.state.chat})
  }

  renderMatches(){
    return Matches.map(m => {
        return (
              <View style= {{marginTop: 7}}>
                <Card style = {[styles.card, {backgroundColor: "transparent", borderColor: "gray", borderWidth: 0.3} ]}>
                  <View style = {styles.spaceBetween}>
                    <Text style = {[styles.topItem, {fontStyle: "oblique"}]}>{m.league}</Text>
                    <Text style = {[styles.topItem, {color: "gold"}]}>{m.bet}  <FontAwesome>{Icons.database}</FontAwesome></Text>
                  </View>

                  <View style = {[styles.spaceBetween, {margin: 10}]}>

                    <View style = {styles.spaceAround}>
                      <View style ={styles.space}>
                        <Text style = {styles.lay}>{m.local}</Text>
                        <Text style = {styles.user}>{m.user1}</Text>
                      </View>

                      <View style ={styles.space}>
                        <Text style = {styles.lay}> Draw </Text>
                      </View>

                      <View style ={styles.space}>
                        <Text style = {styles.lay}>{m.visit}</Text>
                        <Text style = {styles.user}>{m.user2}</Text>
                      </View>
                    </View>

                    <TouchableOpacity onPress = {this.toggleModal.bind(this)}>
                      <FontAwesome style = {[styles.icon, {color: "#00B073"}]}>{Icons.comments}</FontAwesome>
                    </TouchableOpacity>
                  </View>

                  <View style = {styles.hourScore}>
                    <Text style = {styles.hour}>{m.time}</Text>
                  </View>
                </Card>
              </View>
        );
    });
  }

  choseView(){
    const {index} = this.state;

    switch(index){
      case 0:
        return this.renderMatches()
        break;

      case 1:
        return(
          <View>
           <Text style = {styles.emptyMessage}>No Unmatched bets</Text>
          </View>
        );
        break;

      case 2:
        return(
          <View>
            <TouchableOpacity onPress = {this.displayData.bind(this)}>
              <Text style = {styles.emptyMessage}>No Finished bets</Text>
            </TouchableOpacity>
            <Text style = {styles.emptyMessage}>{this.state.currentUser}</Text>
          </View>
        );
        break;
    }
  }

  render(){
    console.log(this.state.data, this.state.currentUser);
    return(
      <View style = {styles.container}>
        <View style = {{marginTop: 25}}>
          <View style = {{marginBottom: 12}}>
            <MaterialTabs
                items={['Matches', "Unmatched", "Finished"]}
                indicatorColor ="#00B073"
                activeTextColor ="white"
                textStyle= {{fontSize: 12.5}}
                inactiveTextColor ="gray"
                barColor ="transparent"
                selectedIndex={this.state.index}
                onChange={index => this.setState({ index })}
            />
          </View>
        </View>
        <ScrollView>
          <View>
            {this.choseView()}
          </View>
        </ScrollView>

            <Modal
              style={{ flex: 1, position: "relative" }}
              isVisible={this.state.modal}
              backdropOpacity = {0.85}
            >
              <Text style = {styles.expText}>You have to bet more becuase freigeriguergegieirugerug</Text>

              <TouchableOpacity style = {{backgroundColor:"#00B073", padding: 10, borderRadius: 5, margin: 50}} onPress={this.toggleModal.bind(this)}>
                <Text style = {{color: "white", fontSize: 17, alignSelf:"center",}}>Got it  <FontAwesome>{Icons.thumbsUp}</FontAwesome></Text>
              </TouchableOpacity>
            </Modal>

      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "black",
    flex: 1
  },
  segmentedController: {
    borderBottomWidth: 0
  },
  topItem: {
    color: "gray",
    fontSize: 12,
    padding: 5
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  icon: {
    fontSize: 35,
    color: "gray",
    paddingTop: 20
  },
  spaceAround: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  lay: {
    color: "#ffff",
    fontWeight: "700",
    fontSize: 15,
    paddingRight: 10
  },
  user: {
    color: "#00B073",
    fontSize: 15,
    fontWeight: "300",
  },
  space: {
    flexDirection: "row",
    paddingBottom: 10
  },
  hourScore: {
    borderTopWidth: 1,
    borderTopColor: "gray",
    padding: 5
  },
  hour: {
    color:"gray",
    fontSize: 12,
    fontStyle:"oblique",
    padding: 5
  },
  emptyMessage: {
    color: "#ffff",
    fontSize: 16,
    alignSelf: "center",
    marginTop: 20
  }
}

export default Match;
