import React, {Component} from "react";
import {View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert, Dimensions} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import User from "../constants/user";
import Url from "../constants/url";
import LinearGradient from "react-native-linear-gradient";


class UserSearch extends Component{

  constructor(props){
    super(props);
    this.state= {
      user: "",
      userResponse: "",
      list: [],
      showUser: false
    }
  }

  onChangeInput = (state) => (event, value) => {
    this.setState({
      [state]:event
    });
  }

  showUser(){
    this.setState({showUser: true})
  }

  createFriendRequest(user){
      return fetch(`http://${Url}:8000/create_request/`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
          sent_by: this.props.currentUser, receiver: user
        })
      })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes)
        if(jsonRes.bfrequest){
          this.props.getUser(this.props.userSelected.username, false, true) 
        }
      })
      .catch(error => alert(error));
  }


  responseType(){
    const {userSelected, profile} = this.props;

    if(this.props.userSelected =="Not Found"){
      return(
        <Text style= {{color: "white", alignSelf: "center", marginTop: 35, fontSize: 20}}>User not found :(</Text>
      );
    } else {
        if(this.props.fromSearch){
          return(
            <View>
              <View style = {{ margin: 20, marginBottom: 15, marginTop: 50, alignItems: "center"}}>
                    <Image style={styles.imageStyle} source={{uri: "https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png"}}/>

                    <View>
                      <Text style = {[styles.username, {fontWeight:"300"}]}> {userSelected.username} </Text>
                      <Text style = {[styles.username, {fontSize: 14, fontWeight:"300", marginBottom: 10, marginTop: 7, color: "gray", }]}>
                          <FontAwesome>{Icons.mapMarker}</FontAwesome> {profile.country}
                      </Text>
                    </View>
              </View>
              
              <View style = {{borderTopColor: "gray", borderTopWidth: 0.3, paddingTop: 15, marginLeft: 35, marginRight: 35}}>
                {this.userCard()}
              </View>
            </View>
          );
        } else {return null}
      }
  }


  userCard(){
    const {isFriend, isRequested, userSelected, currentUser} = this.props;
    const {user} = this.state;

    if(isFriend){
      return(
          <View style = {{alignSelf:"center"}}>
            <Text style= {{fontSize: 13, color: "#00B073", alignSelf: "center", marginTop: 10, paddingBottom: 23}}> <FontAwesome> {Icons.check} </FontAwesome> Friends</Text>
          </View>
      );
    } else if(isFriend == false && isRequested){
        return(
          <View style = {{alignSelf:"center"}}>
            <Text style= {{fontSize: 13, color: "#00B073", alignSelf: "center", marginTop: 10, paddingBottom: 23}}> <FontAwesome> {Icons.hourglassStart} </FontAwesome> Wating for acceptance</Text>
            <Text style= {{fontSize: 12, color: "gray", alignSelf: "center", marginTop: 5, fontWeight: "400", textAlign: "center"}}> You can see this betfriend request in your request tab</Text>
          </View>
        );
    } else if(isFriend == false && isRequested == false && userSelected.username == currentUser){
        return(
           <TouchableOpacity 
                style = {{margin: 15, backgroundColor: "#00B073", borderRadius: 5, marginTop: 10, alignSelf: "center", padding: 15, paddingTop: 8, paddingBottom: 8, marginBottom: 24}}
                onPress = {this.props.backToProfile}
            >
                <Text style= {{fontSize: 17, color: "white", alignSelf: "center"}}> <FontAwesome> {Icons.eye} </FontAwesome> See profile</Text>
            </TouchableOpacity> 
        )
    } else if(isFriend == false && isRequested == false && userSelected.username != currentUser){
        return( 
            <TouchableOpacity 
                style = {{margin: 15, backgroundColor: "#00B073", borderRadius: 5, marginTop: 10, alignSelf: "center", padding: 15, paddingTop: 8, paddingBottom: 8, marginBottom: 24}}
                onPress = {this.createFriendRequest.bind(this, userSelected.username)}
            >
                <Text style= {{fontSize: 17, color: "white", alignSelf: "center"}}> <FontAwesome> {Icons.userPlus} </FontAwesome> Add as friend</Text>
            </TouchableOpacity>
        )
    }
  }


  render(){
    const {user} = this.state;
    const {isFriend, isRequested, userSelected, profile, fromSearch} = this.props;

    console.log(isRequested, isFriend, userSelected, fromSearch);

    return(
      <View style = {{flex: 1, borderRadius: 8, backgroundColor: "#161616"}}>
        <TouchableOpacity style = {{position: "absolute", left: 10, top: 10, marginBottom: 10}} onPress= {this.props.closeModal}>
          <Text style = {{color:"#ffff", fontSize: 17}}> X </Text>
        </TouchableOpacity>

        <TextInput
            style={{height: 45, borderBottomColor: 'white', borderBottomWidth: 0.3, margin: 25, color: "white", marginTop: 40, borderRadius: 5}}
            placeholder = "Type username"
            placeholderTextColor = "gray"
            onChangeText = {this.onChangeInput("user")}
            value = {this.state.user}
            autoCapitalize = 'none'
            returnKeyType='done'
            autoCorrect= {false}
        />
        
        {this.responseType()}

        <TouchableOpacity
           onPress = {this.props.getUser.bind(this, user, false, true)} style = {this.state.user ? styles.buttonActive : styles.buttonDisabled}
           disabled = {this.state.user == "" ? true : false}
          >
          <Text style = {{alignSelf: "center", color: "white"}}>Search user</Text>
        </TouchableOpacity>


      </View>
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
  },
  card: {
    margin: 10, 
    padding: 15,
    backgroundColor: "black",
    borderRadius: 5, 
    marginTop: 50
  },
  imageStyle:{
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    marginBottom: 10
  },
  username: {
    color: "white",
    fontSize: 19,
    fontWeight: "500",
    alignSelf: "center",
    marginTop: 8,
  },
}

export default UserSearch;
