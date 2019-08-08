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
      users: [],
      list: []
    }
  }

  onChangeInput = (state) => (event,value) => {
    this.setState({
      [state]:event
    });
    this.liveSearch(event)
  }

  liveSearch(user){
      return fetch(`http://${Url}:8000/user_live?user=${user}&current_user=${this.props.currentUser}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        }
      })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes);
        if(user == ""){
          this.setState({ users: [] })
        } else {
          this.setState({users: jsonRes.users})
        }
        
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
      const {myFriends} = this.props;
      var merged = [].concat.apply([], myFriends);

          return users.forEach((e1,i) => merged.map(e2 =>{
              console.log(e1.username, e2)
              const res = e1.username == e2 ? true : false

              console.log(res)
            })
          )
  }

  render(){
    const {user} = this.state;
    var merged = [].concat.apply([], this.props.myFriends);


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
