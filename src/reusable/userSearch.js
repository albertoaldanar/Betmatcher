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

  onChangeInput = (state) => (event,value) => {
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
        <Text style= {{color: "white", alignSelf: "center", marginTop: 35}}>User not found :(</Text>
      );
    } else {
        if(this.props.fromSearch){
          return(
              <View style = {{flexDirection:"row", margin: 20, marginBottom: 15, marginTop: 50}}>
                    <Image style={styles.imageStyle} source={{uri: User.image}}/>

                    <View>
                      <Text style = {[styles.username, {alignSelf:"flex-start", fontWeight:"300"}]}> {userSelected.username} </Text>
                      <Text style = {[styles.username, {fontSize: 14, fontWeight:"300", marginBottom: 10, marginTop: 7, color: "gray", alignSelf:"flex-start", marginLeft:5}]}>
                          <FontAwesome>{Icons.mapMarker}</FontAwesome> {profile.country}
                      </Text>
                    </View>
                    {this.userCard()}
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
          <View>
            <Text style= {{fontSize: 13, color: "#00B073", alignSelf: "center", marginTop: 10, paddingBottom: 23}}> <FontAwesome> {Icons.check} </FontAwesome> Friends</Text>
          </View>
      );
    } else if(isFriend == false && isRequested){
        return(
          <View>
            <Text style= {{fontSize: 13, color: "#00B073", alignSelf: "center", marginTop: 10, paddingBottom: 23}}> <FontAwesome> {Icons.hourglassStart} </FontAwesome> Wating</Text>
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
        
        {this.responseType()}

        <TouchableOpacity
           onPress = {this.props.getUser.bind(this, user, false, true)} style = {this.state.user ? styles.buttonActive : styles.buttonDisabled}
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
  },
  card: {
    margin: 10, 
    padding: 15,
    backgroundColor: "black",
    borderRadius: 5, 
    marginTop: 50
  },
  imageStyle:{
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    marginRight: 10
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
