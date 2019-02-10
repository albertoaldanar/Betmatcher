import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Slider, Image} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SwipeCards from 'react-native-swipe-cards';

class BetModal extends Component{

  constructor(props){
    super(props);
    this.state = {
      bet: 0,
      cUserCoins: 3460
    }
  }

  setCoins(value){
    this.setState({bet: value})
  }

  onSwipeNext(card) {
    alert("Nope")
  }

  cardDesing(cardData){
    return(
        <View style = {styles.tableStyle}>
            <Image
              source = {{uri: cardData.image}}
              style = {{width: 40, height: 40, padding: 10, marginRight: 10, marginBottom: 15}}
            />
            <View>
              <Text style = {[styles.userTab , {color: "#00B073"}]}>{cardData.user}</Text>
              <Text style = {[styles.userTab, {color: "#DAA520"}]}>{cardData.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
            </View>
        </View>
    );
  }

  userList(list){
    return list.map((u, index) => {
      return(
        <TouchableOpacity  key = {index} onPress = {this.props.confirm.bind(this, "ConfirmBet", u)}>
          <View style = {styles.tableStyle}>
            <View style = {{flexDirection: "row"}}>
              <Image
                source = {{uri: u.image}}
                style = {styles.image}
              />
              <View style = {{marginTop: 5}}>
                <Text style = {{color: "white", paddingBottom: 9, fontSize: 15}}>{u.user}</Text>
                <Text style = {{color: "#DAA520", paddingBottom: 9}}>{u.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
                <Text style = {styles.country}>{u.country} <FontAwesome>{Icons.flag}</FontAwesome></Text>
              </View>
            </View>

            <FontAwesome style = {{color:"#00B073", marginTop: 27, marginRight: 5}}>{Icons.chevronRight}</FontAwesome>
          </View>

        </TouchableOpacity>
      );
    })
  }

  userCard(list){
    console.log("User1", list[1])
      return(
        <SwipeCards
            cards={list}
            renderCard={(cardData) =>
              {this.cardDesing(cardData)}
            }
            renderNoMoreCards={() =>
                <Text style = {{color: "white"}}>No more cards</Text>
            }
            handleYup={() => console.log("jerfe")}
            handleNope={this.onSwipeNext.bind(this)}
        />
      );
  }

  renderSegmentedController(){
    const {choice, game, teamsNotSelected} = this.props;
    if(choice == 1 && game.sport == "Soccer"){
      return(
        <SegmentedControlTab
          values={this.props.teamsNotSelected}
          tabTextStyle = {{color: "#00B073", fontWeight: "400", fontSize: 15}}
          tabStyle = {{borderColor: "#00B073", backgroundColor: "#161616"}}
          selectedIndex={this.props.index}
          activeTabStyle = {{backgroundColor: "#00B073"}}
          onTabPress={this.props.segmentedController}
        />
      );
    } else if(choice == 1 && game.sport != "Soccer"){
        return null;
      }
  }

  betChoice(){
    if(this.props.choice == 1){
      if(this.props.index == 0){
        return(
            <View>
              {this.userList(this.props.list1)}
            </View>
        );
      } else {
          return(
            <View>
              {this.userList(this.props.list2)}
            </View>

          );
        }
    } else if(this.props.choice == 2) {
          return(
            <View style = {{ felx: 1, backgroundColor: "#ffff"}}>
              <Slider
                step= {1}
                maximumValue={this.state.cUserCoins}
                thumbTintColor = "#00B073"
                maximumTrackImage = "#00B073"
                onValueChange={this.setCoins.bind(this)}
                value={this.state.bet}
              />
              <Text style = {{alignSelf: "center"}}>{this.state.bet}</Text>
            </View>
          );
    }
  }

  render(){
    return(
      <View style = {{flex: 1, backgroundColor: "black"}}>

        <View style ={{marginBottom: 15}}>
          <View style = {styles.info}>
            <TouchableOpacity style = {styles.closeModal} onPress  = {this.props.visible}>
              <Text style = {{color: "#00B073", fontSize: 17}}>
                Close
              </Text>
            </TouchableOpacity>
            <Text style = {{color: "#DAA520", marginTop: 12, marginRight: 19}}> 50440 <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
          </View>
        </View>

        <View>
          {this.renderSegmentedController()}
        </View>

        <ScrollView>
          <View style = {{marginTop: 10}}>
            {this.betChoice()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles ={
  title: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
    marginTop: 5
  },
  choose: {
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "center",
    marginBottom: 5,
    color: "#00B073"
  },
  closeModal: {
    marginTop: 12,
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 13
  },
  tables: {
    flexDirection: "row",
    padding: 10,
    justifyContent:"space-between",
    margin: 15
  },
  userTab: {
    padding: 50,
  },
  tableStyle: {
    flexDirection:"row",
    justifyContent: "space-between",
    marginBottom: 3,
    padding: 10,
    backgroundColor: "#161616"
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  teamsDescription: {
    alignSelf: "center",
    marginTop: 15
  },
  teamsText: {
    color: "#00B073",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 13,
  },
  country: {
    color: "gray",
    fontWeight: "300",
    fontSize: 13,
    fontStyle: "oblique",
    paddingBottom: 9
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 25,
    marginTop: 15,
    marginLeft: 5
  }
};

export default BetModal;
