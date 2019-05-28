import React, {Component} from "react";
import {View, Text, FlatList, ScrollView, Image, TouchableOpacity, Modal} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import LinearGradient from "react-native-linear-gradient";
import Leagues from "../components/leagues";
import { NavigationActions } from 'react-navigation';

class Menu extends Component {

  constructor(props){
    super(props);
    this.state= {
      leaguesModal: false,
      leagueSelected: ""
    }
  }

  selectLeagues(leagues){
    this.setState({leagueSelected: leagues})
    this.closeOpenLeagues();
  }

  closeOpenLeagues(){
    this.setState({leaguesModal: !this.state.leaguesModal})
  }

  renderSport(){
    return this.props.leagues.map((item, index) => {
      return(
        <View>
          <TouchableOpacity key = {index} style = {{flexDirection:"row", justifyContent: "space-between"}} onPress = {this.selectLeagues.bind(this, item)}>
            <Text style = {styles.sport}> <Image source= {{uri: item.image}} style = {{width: 21, height: 21}}/> {item.name} </Text>
            <Text style = {{marginTop: 7, color: "gray"}}> {item.count} <FontAwesome>{Icons.chevronRight}</FontAwesome> </Text>
          </TouchableOpacity>
        </View>
      );
    })
  }

  render(){
    console.log(this.state.leagueSelected);
    return(
      <View style = {styles.container}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "black", "gray"]}>
            <View style = {styles.userContainer}>
              <Image
                source = {{uri: "https://yena.co.uk/wp-content/uploads/2018/01/profile-circle.png"}}
                style = {{width: 80, height: 80, marginBottom: 20, marginLeft: 5}}
              />

              <View>
                <Text style= {{color:"#00B073", marginBottom: 10, fontSize: 20, fontWeight: "400"}}>jackwilson</Text>
                <Text style= {{color:"#DCDCDC", marginBottom: 10, fontSize: 12, fontWeight: "400", fontStyle: "oblique"}}>England <FontAwesome>{Icons.flag}</FontAwesome></Text>
                <Text style= {{color:"#DAA520"}}>14,567  £</Text>
              </View>
            </View>
          </LinearGradient>

        <ScrollView>
          <View style = {{margin: 15, marginTop:10}}>
            <Text style  ={styles.categorie}> Sports </Text>

            {this.renderSport()}

            <Text style  ={[styles.categorie, {marginTop: 12}]}> Options </Text>
              <View style ={{marginLeft: 8}}>
                <Text style = {styles.sport}> How to bet?</Text>
                <Text style = {styles.sport}> Change your coins</Text>
                <Text style = {styles.sport}><FontAwesome>{Icons.comments}</FontAwesome> Live chat</Text>
              </View>

            <Text style  ={[styles.categorie, {marginTop: 12}]}> Account </Text>
              <View style ={{marginLeft: 8}}>
                <Text style = {styles.sport}><FontAwesome>{Icons.signOut}</FontAwesome> Logout</Text>
              </View>
          </View>
          </ScrollView>

          <Modal visible = {this.state.leaguesModal} animationType ="slide">
            <Leagues close = {this.closeOpenLeagues.bind(this)} league = {this.state.leagueSelected}/>
          </Modal>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#DCDCDC",
    flex: 1
  },
  categorie: {
    color: "#00B073",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5
  },
  sport: {
    color: "black",
    marginBottom: 15,
    marginLeft: 12,
    fontSize: 19
  },
  userContainer: {
    padding: 20,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 35,
    flexDirection: "row",
    justifyContent: "space-around"
  }
}

export default Menu;



