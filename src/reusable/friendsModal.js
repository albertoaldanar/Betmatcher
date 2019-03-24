import React, {Component} from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import UserList2 from "../constants/userList2";
import FontAwesome, {Icons} from "react-native-fontawesome";
import LinearGradient from "react-native-linear-gradient";

class FriendsModal extends Component{

  constructor(props){
    super(props);
  }

  renderFriendList(){
    return UserList2.map((u, index) => {
      return(
        <View>
          <View key = {index}>
            <View style = {styles.tableStyle}>
              <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                <View style= {{flexDirection:"row"}}>
                  <Image
                    source = {{uri: u.image}}
                    style = {styles.image}
                  />
                  <Text style = {{ marginTop: 10, color: "#ffff", fontSize: 13, fontWeight: "300"}}>{u.user}</Text>
                </View>

                <TouchableOpacity onPress = {this.props.selectOpponent.bind(this, u.user)}>
                  <FontAwesome style = {{color: "#00B073", alignItems: "center", paddingTop: 10, fontSize: 20}}>{Icons.share}</FontAwesome>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    })
  }

  render(){
      let button;

      if(this.props.opponent != ""){
        button =  <TouchableOpacity style = {{position: "absolute", bottom: 0, padding: 15, backgroundColor: "#00B073", left: 0, right: 0}} onPress = {this.props.hideShow}>
                    <View style = {{flexDirection: "row", alignSelf:"center"}}>
                      <Text style = {{color: "white", alignSelf: "center", fontSize: 17, fontWeight: "300"}}> Send bet to: </Text>
                      <Text style = {{color: "white", alignSelf: "center", fontSize: 17, fontStyle: "oblique", fontWeight: "600"}}> {this.props.opponent}</Text>
                    </View>
                  </TouchableOpacity>
      }

    return(
      <LinearGradient  style = {{flex: 1}} start={{x: 0, y: 0}} end={{x: 4 , y: 1}} colors = {[ "black", "gray"]}>
          <TouchableOpacity onPress= {this.props.hideShow}>
            <Text style= {{color: "#00B073", margin: 5, marginLeft: 10, fontWeight: "600"}}>Close</Text>
          </TouchableOpacity>
          <Text style = {styles.title}>Pick a betfriend to send bet</Text>
          <ScrollView>
            {this.renderFriendList()}
          </ScrollView>
      </LinearGradient>
    );
  }
}


const styles = {
  container: {
    flex: 1,
    backgroundColor: "#161616"
  },
  title: {
    color: "white",
    alignSelf: "center",
    fontSize: 16,
    fontWeight:"400",
    marginTop: 17,
    marginBottom: 20,
    fontStyle:"oblique"
  },
  tableStyle: {
    marginBottom: 5,
    padding: 15,
  },
  image: {
    width: 45,
    height: 45,
    marginRight: 15,
    marginLeft: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
}

export default FriendsModal;
