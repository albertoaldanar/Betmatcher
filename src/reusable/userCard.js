import React, {Component} from "react";
import {View, Text, TouchableOpacity, Image, Dimensions, Alert} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import LinearGradient from "react-native-linear-gradient";
import User from "../constants/user";

class UserCard extends Component{


  sendFriendRequest(){
    const {userSelected} = this.props;
    return fetch(`http://${Url}:8000/create_request/`, {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
      },
      body: JSON.stringify({
        sent_by: this.props.currentUser,
        receiver: this.props.userSelected.username
      })
    })
    .then(res => res.json())
    .then(jsonRes => {
          this.props.getUser(this.props.userSelected.username)

          return fetch(`https://onesignal.com/api/v1/notifications/`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
              "app_id": "59f7fce2-a8c6-49ef-846e-bd95e45bf8b7",
              "include_player_ids": [this.props.userSelected.profile.notification_token],
              "headings": {"en": `You have a betfriend request`},
              "contents": {"en": `${this.props.currentUser} sent you a friend request`}
            })
          });
    })
    .catch(error => console.log(error))
  }


  render(){

    const {isFriend, profile, userSelected, currentUser, isWating} = this.props
    console.log(userSelected, isFriend, isWating);

    var modalButton = isFriend ?
                        <Text style= {{fontSize: 13, color: "#00B073", alignSelf: "center", marginTop: 10, paddingBottom: 23}}> <FontAwesome> {Icons.check} </FontAwesome> Friends</Text>
                        :
                        isWating ? 
                          <Text style= {{fontSize: 13, color: "gray", alignSelf: "center", marginTop: 10, paddingBottom: 23}}> <FontAwesome> {Icons.hourglassStart} </FontAwesome> Wating for acceptance  </Text>
                        :
                          <TouchableOpacity 
                            style = {{margin: 15, backgroundColor: "#00B073", borderRadius: 5, marginTop: 10, alignSelf: "center", padding: 15, paddingTop: 8, paddingBottom: 8, marginBottom: 24}}
                            onPress= {this.sendFriendRequest.bind(this)}
                          >
                            <Text style= {{fontSize: 17, color: "white", alignSelf: "center"}}> <FontAwesome> {Icons.userPlus} </FontAwesome> Add as friend</Text>
                          </TouchableOpacity>
    

    return(
      <LinearGradient style = {{margin: 20, borderRadius: 5, marginLeft: 5, marginRight: 5}} start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "#161616", "gray"]}>
                <TouchableOpacity onPress= {this.props.closeModal} style = {{margin: 10}}>
                  <Text style= {{fontSize: 18, color: "white"}}>X</Text>
                </TouchableOpacity>

                  <View style = {{flexDirection:"row", margin: 20, marginBottom: 15, marginTop: 12}}>
                    <Image style={styles.imageStyle} source={{uri: "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png"}}/>

                    <View>
                      <Text style = {[styles.username, {alignSelf:"flex-start", fontWeight:"300"}]}> {userSelected.username} </Text>
                      <Text style = {[styles.username, {fontSize: 14, fontWeight:"300", marginBottom: 10, marginTop: 7, color: "gray", alignSelf:"flex-start", marginLeft:5}]}>
                        <FontAwesome>{Icons.mapMarker}</FontAwesome> {profile.country}
                      </Text>
                    </View>
                  </View>

                <View style = {styles.stats}>
                  <View>
                    <Text style = {styles.count}>{profile.won}</Text>
                    <Text style = {styles.textB}> Won </Text>
                  </View>

                  <View>
                    <Text style = {styles.count}>{profile.draw}</Text>
                    <Text style = {styles.textB}> Draw </Text>
                  </View>

                  <View>
                    <Text style = {styles.count}>{profile.lost}</Text>
                    <Text style = {styles.textB}> Lost </Text>
                  </View>
                </View>

                {modalButton}
          </LinearGradient>
    );
  }
}

const styles = {
  count: {
    color: "#00B073",
    fontWeight: "400",
    fontSize: 17,
    marginBottom: 8,
    marginLeft: 15,
    fontStyle: "oblique"
  },
  textB: {
    fontSize: 13,
    color: "gray",
    fontWeight: "500",
    alignSelf: "center"
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingBottom: 10,
    marginBottom: 8
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginRight: 15,
    marginBottom: 10
  },
  username: {
    color: "white",
    fontSize: 19,
    fontWeight: "500",
    alignSelf: "center",
    marginTop: 8,
  },
  imageStyle:{
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    marginRight: 10
  },

}


export default UserCard;
