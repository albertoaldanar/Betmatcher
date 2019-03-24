import React, {Component} from "react";
import {View,Text, TouchableOpacity, Image, ScrollView, Modal} from "react-native";
import Header from "../reusable/header";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Matches from "../constants/matches";
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";
import Chat from "../reusable/chat";
import LinearGradient from "react-native-linear-gradient";

class Match extends Component{

  constructor(props){
    super(props);
    this.state = {index: this.props.navigation.state.params.index || 0, chat: false}
  }

  handleIndexChange(index){
    this.setState({index})
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
                    <Text style = {[styles.topItem, {color: "gold"}]}>{m.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
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

                    <TouchableOpacity onPress = {this.renderChat.bind(this)}>
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
            <Text style = {styles.emptyMessage}> No Unmatched Bets</Text>
          </View>
        );
        break;

      case 2:
        return(
          <View>
            <Text style = {styles.emptyMessage}> No Finished Bets</Text>
          </View>
        );
        break;
    }
  }

  render(){
    return(
      <View style = {styles.container}>
        <Header title = "Matches"/>
        <SegmentedControlTab
            values={['Match ', 'Unmatched', "Finished"]}
            tabsContainerStyle = {styles.segmentedController}
            tabTextStyle = {{color: "#00B073", fontWeight: "400", fontSize: 15}}
            tabStyle = {{borderColor: "#00B073", backgroundColor: "transparent"}}
            selectedIndex={this.state.index}
            activeTabStyle = {{backgroundColor: "#00B073"}}
            onTabPress={this.handleIndexChange.bind(this)}
        />
        <ScrollView>
          <View>
            {this.choseView()}
          </View>
        </ScrollView>

        <Modal
          visible = {this.state.chat}
          animationType = "slide"
        >
          <Chat closeModal = {this.renderChat.bind(this)}/>
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
