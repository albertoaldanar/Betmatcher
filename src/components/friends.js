import React, {Component} from "react";
import {View, Text, Dimensions, TouchableOpacity, ScrollView, Image, Alert} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome, {Icons} from "react-native-fontawesome";
import { YAxis, Grid } from 'react-native-svg-charts';
import UserList1 from "../constants/userList1";
import MaterialTabs from "react-native-material-tabs";
import SquareGrid from "react-native-square-grid";

const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

class Friends extends Component{
  constructor(props){
    super(props);

    this.state = {
      index: 0,
      betfriends: [],
      friendRequests: []
    }
  }

  componentDidMount(){
    return this.getData()
  }

  getData(){
      let currentUser = this.props.navigation.state.params.currentUser;
      this._isMounted = true;

      return fetch(`http://192.168.0.5:8000/betfriends_data?current_user=${currentUser}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        }
      })
      .then(res => res.json())
      .then(jsonRes => {
        if(this._isMounted){
          this.setState({
            betfriends: jsonRes.betfriends,
            friendRequests: jsonRes.friend_requests,
            index: 0
          })
        }
      })
      .catch(error => console.log(error));
  }

  createFriends(bfrequest){
      let currentUser = this.props.navigation.state.params.currentUser;

      return fetch(`http://192.168.0.5:8000/create_friendship/`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
          friend_request: bfrequest.id, current_user: currentUser
        })
      })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes)
        if(jsonRes.friendship){
          return Alert.alert(
            "OK!",
            `Now you can bet against ${bfrequest.sent_by.username}`,
            [
              {text: 'Continue', onPress: this.getData.bind(this)},
            ],
            {cancelable: false},
          );
        }
      })
      .catch(error => alert(error));
  }

  handleIndexChange(index){
    this.setState({index})
  }

  choseView(){
    const {index, betfriends, friendRequests} = this.state;

    switch(index){
      case 0:
        return this.betfriendList(UserList1)
        break;

      case 1:
        return this.requestsList(friendRequests)
        break;
    }
  }

  betfriendList(data){
      return data.map((item, index) => {
        return(
          <View key = {index}>
            <View style = {styles.tableStyle}>
              <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                <View style= {{flexDirection:"row"}}>
                  <Image
                    source = {{uri: item.image}}
                    style = {styles.image}
                  />
                  <View>
                    <Text style = {{ marginTop: 10, color: "#ffff", fontSize: 15, fontWeight: "300", color: "white"}}>{item.user}</Text>
                    <Text style = {{ marginTop: 5, color: "gray", fontSize: 12, fontWeight: "300", color: "gray"}}> <FontAwesome>{Icons.mapMarker}</FontAwesome> {item.country} </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <FontAwesome style = {{color: "gray", alignItems: "center", padding: 10, fontSize: 20}}>{Icons.eye}</FontAwesome>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })
  }

  requestsList(data){
        return data.map((item, index) => {
          return(
            <View key = {index}>
              <View style = {styles.tableStyle}>
                <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                  <View style= {{flexDirection:"row"}}>
                    <Image
                      source = {{uri: item.image}}
                      style = {styles.image}
                    />
                    <View>
                      <Text style = {{ marginTop: 10, color: "#ffff", fontSize: 15, fontWeight: "300", color: "white"}}>{item.sent_by.username}</Text>
                      <Text style = {{ marginTop: 5, color: "gray", fontSize: 12, fontWeight: "300", color: "gray"}}> <FontAwesome>{Icons.mapMarker}</FontAwesome> {item.sent_by.profile.country} </Text>
                    </View>
                  </View>

                  <View style = {{position: "absolute", right: 5, flexDirection: "row", top: 10}}>
                    <TouchableOpacity style = {{padding: 5, borderRadius: 5, backgroundColor: "#00B073", alignSelf: "center"}} onPress = {this.createFriends.bind(this, item)}>
                      <Text style= {{alignSelf: "center", color: "white"}}>Accept</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{padding: 5, borderRadius: 5, backgroundColor: "red", alignSelf: "center", marginLeft: 4}}>
                      <Text style= {{alignSelf: "center", color: "white"}}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })
  }

  render(){
    console.log(this.state.betfriends, this.state.friendRequests);
    var addButton= this.state.index == 0 ?
          <TouchableOpacity style = {styles.addButton}>
              <FontAwesome style = {{color: "white", alignItems: "center", padding: 10, fontSize: 20}}>{Icons.userPlus}</FontAwesome>
          </TouchableOpacity> :
          null

    return(
      <LinearGradient style= {{flex: 1}} start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "#161616", "gray"]}>
          <MaterialTabs
                items={['Betfriends', "Friend requests"]}
                indicatorColor ="#00B073"
                activeTextColor ="white"
                textStyle= {{fontSize: 12.5}}
                inactiveTextColor ="gray"
                barColor ="transparent"
                selectedIndex={this.state.index}
                onChange={index => this.setState({ index })}
          />
          <ScrollView style = {{marginTop: 10}}>
            {this.choseView()}
          </ScrollView>

          {addButton}
      </LinearGradient>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#161616",
    flex: 1
  },
  chart: {
    height: 200,
    width: Dimensions.get("window").width,
    flexDirection: "row",
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 5
  },
  user: {
    color: "#00B073",
    fontSize: 21,
    marginTop: 8
  },
  descript: {
    flexDirection:"row",
    justifyContent:"space-around"
  },
  explanation: {
    color: "gray",
    fontWeight: "400",
    marginBottom: 7
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginRight: 15,
    marginBottom: 10
  },
  tableStyle: {
    marginBottom: 5,
    padding: 15,
  },
  text: {
    color:"white", marginTop: 8,
    alignSelf: "center"
  },
  item: {
    flex: 1,
    alignSelf: "stretch",
    padding: 16
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  addButton: {
    padding: 10, borderRadius: 50, backgroundColor: "rgba(72, 221, 79, 0.5)" , position: "absolute", bottom: 30, right: 15,
    shadowOffset:{  width: 1,  height: 0.7,  },
    shadowColor: '#DCDCDC',
    shadowOpacity: 0.7,
  }
}


export default Friends;
