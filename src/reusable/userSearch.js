import React, {Component} from "react";
import {View, Text, ScrollView, TouchableOpacity, TextInput} from "react-native";

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
  }

  liveSearch(user){
      return fetch(`http://192.168.0.5:8000/user_live?user=${this.state.user}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        }
      })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes)
      })
      .catch(error => console.log(error));
  }

  render(){
    const {user} = this.state;

    return(
      <View style = {{backgroundColor: "transparent", flex: 1, borderRadius: 8, borderWidth: 0.5, borderColor: "gray"}}>
        <TouchableOpacity style = {{position: "absolute", left: 10, top: 10}} onPress= {this.props.closeModal}>
          <Text style = {{color:"#ffff", fontSize: 17}}> X </Text>
        </TouchableOpacity>

        <TextInput
            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, margin: 25, color: "white", marginTop: 40}}
            placeholder = "Search user"
            placeholderTextColor = "gray"
            onChangeText = {this.onChangeInput("user")}
            value = {this.state.user}
            autoCapitalize = 'none'
        />

        <Text style = {{alignSelf: "center", color: "#ffff"}}>{this.state.user}</Text>


        <TouchableOpacity style = {{position: "absolute", left: 10, top: 10}} onPress= {this.liveSearch.bind(this)}>
          <Text style = {{color:"#ffff", fontSize: 17}}> Search </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default UserSearch;
