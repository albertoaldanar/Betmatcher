import React, {Component} from "react";
import {View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import User from "../constants/user";
import Url from "../constants/url";
import LinearGradient from "react-native-linear-gradient"

class UserSearch extends Component{

  constructor(props){
    super(props);
    this.state= {
      user: "",
      users: []
    }
  }

  onChangeInput = (state) => (event,value) => {
    this.setState({
      [state]:event
    });
    this.liveSearch(event)
  }

  liveSearch(user){
      return fetch(`http://${Url}:8000/user_live?user=${user}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        }
      })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes)
        this.setState({users: jsonRes.users})
      })
      .catch(error => console.log(error));
  }

  createFriendRequest(user){
      return fetch(`http://${Url}:8000/create_request/`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
          current_user: this.props.currentUser, receiver: user.username
        })
      })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes)
        if(jsonRes.bfrequest){
          return Alert.alert(
            "Request sent!",
            `Wait for ${user.username} to accept`,
            [
              {text: 'Continue', onPress: this.props.closeModal},
            ],
            {cancelable: false},
          );
        }
      })
      .catch(error => alert(error));
  }

  userList(){
      const {users} = this.state;

      return users.map((item, index) => {
        return(
          <View key = {index}>
            <View style = {styles.tableStyle}>
              <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                <View style= {{flexDirection:"row"}}>
                  <Image
                    source = {{uri: User.image}}
                    style = {styles.image}
                  />
                  <View>
                    <Text style = {{ marginTop: 10, color: "#ffff", fontSize: 15, fontWeight: "300", color: "white"}}>{item.username}</Text>
                    <Text style = {{ marginTop: 5, color: "gray", fontSize: 12, fontWeight: "300", color: "gray"}}> <FontAwesome>{Icons.mapMarker}</FontAwesome> Spain </Text>
                  </View>
                </View>
                <TouchableOpacity onPress = {this.createFriendRequest.bind(this, item)}>
                  <FontAwesome style = {{color: "gray", alignItems: "center", padding: 10, fontSize: 20}}>{Icons.userPlus}</FontAwesome>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })
  }

  render(){
    const {user} = this.state;

    return(
      <LinearGradient style = {{ borderRadius: 5, flex: 1, borderRadius: 8,}} start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "#161616", "gray"]}>
        <TouchableOpacity style = {{position: "absolute", left: 10, top: 10, marginBottom: 10}} onPress= {this.props.closeModal}>
          <Text style = {{color:"#ffff", fontSize: 17}}> X </Text>
        </TouchableOpacity>

        <TextInput
            style={{height: 26, borderBottomColor: 'white', borderBottomWidth: 0.3, margin: 25, color: "white", marginTop: 40, borderRadius: 5}}
            placeholder = "Search user"
            placeholderTextColor = "gray"
            onChangeText = {this.onChangeInput("user")}
            value = {this.state.user}
            autoCapitalize = 'none'
            autoCorrect= {false}
        />

        <ScrollView>
          {this.userList()}
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = {
  tableStyle: {
    marginBottom: 5,
    padding: 15,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginRight: 15,
    marginBottom: 10
  }
}

export default UserSearch;
