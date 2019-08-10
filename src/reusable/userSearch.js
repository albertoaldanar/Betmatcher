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
      userResponse: "",
      list: []
    }
  }

  onChangeInput = (state) => (event,value) => {
    this.setState({
      [state]:event
    });
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
          this.setState({ userResponse: "" })
        } else {
          this.setState({userResponse: jsonRes.user})
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

  userCard(){
      const {userResponse} = this.state;
      const {myFriends} = this.props;
      var merged = [].concat.apply([], myFriends);

      //     return users.forEach((e1,i) => merged.map(e2 =>{
      //         console.log(e1.username, e2)
      //         if(e1.username== e2){
      //             console.log(true)
      //         } else {
      //             console.log(false)
      //         }
      //       })
      //     )
      return(
        <View>
          <Text style = {{color: "#ffff"}}> {userResponse.username}</Text>
        </View>
      );
  }

  render(){
    const {user} = this.state;
    // var merged = [].concat.apply([], this.props.myFriends);
    console.log(this.state.userResponse);

    return(
      <LinearGradient style = {{ borderRadius: 5, flex: 1, borderRadius: 8,}} start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "#161616", "gray"]}>
        <TouchableOpacity style = {{position: "absolute", left: 10, top: 10, marginBottom: 10}} onPress= {this.props.closeModal}>
          <Text style = {{color:"#ffff", fontSize: 17}}> X </Text>
        </TouchableOpacity>

        <TextInput
            style={{height: 26, borderBottomColor: 'white', borderBottomWidth: 0.3, margin: 25, color: "white", marginTop: 40, borderRadius: 5}}
            placeholder = "Type username"
            placeholderTextColor = "gray"
            onChangeText = {this.onChangeInput("user")}
            value = {this.state.user}
            autoCapitalize = 'none'
            returnKeyType='done'
            autoCorrect= {false}
        />

        <ScrollView>
          {this.userCard()}
        </ScrollView>

        <TouchableOpacity
           onPress = {this.liveSearch.bind(this, this.state.user)} style = {this.state.user ? styles.buttonActive : styles.buttonDisabled}
           disabled = {this.state.user == "" ? true : false}
          >
          <Text style = {{alignSelf: "center", color: "white"}}>Buscar usuario</Text>
        </TouchableOpacity>

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
  },
  buttonDisabled: {
    position:"absolute", bottom: 0, left: 0, right: 0, backgroundColor: "gray", padding: 10
  },
  buttonActive: {
    position:"absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#00B073", padding: 10
  }
}

export default UserSearch;
