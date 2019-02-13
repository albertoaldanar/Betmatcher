import React, {Component} from "react";
import {View, Text, FlatList, ScrollView, Image, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import LinearGradient from "react-native-linear-gradient";
import Lgs from "../constants/leagues";

class Menu extends Component {

  renderSport(){
    return Lgs.map(item => {
      return(
        <View>
          <TouchableOpacity style = {{flexDirection:"row", justifyContent: "space-between"}}onPress = {this.props.open}>
            <Text style = {styles.sport}> <Image source= {{uri: item.image}} style = {{width: 21, height: 21}}/> {item.name} </Text>
            <Text style = {{marginTop: 7, color: "gray"}}> {item.count} <FontAwesome>{Icons.chevronRight}</FontAwesome> </Text>
          </TouchableOpacity>
        </View>
      );
    })

  }

  render(){
    return(
      <View style = {styles.container}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "black", "gray"]}>
            <View style = {styles.userContainer}>
              <Image
                source = {{uri: "https://yena.co.uk/wp-content/uploads/2018/01/profile-circle.png"}}
                style = {{width: 80, height: 80, marginBottom: 20, marginLeft: 5}}
              />

              <View>
                <Text style= {{color:"#00B073", marginBottom: 10, fontSize: 20, fontWeight: "400"}}>albertoaldanar</Text>
                <Text style= {{color:"#DCDCDC", marginBottom: 10, fontSize: 12, fontWeight: "400", fontStyle: "oblique"}}>Mexico <FontAwesome>{Icons.flag}</FontAwesome></Text>
                <Text style= {{color:"#DAA520"}}>14,567 <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
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
              </View>

            <Text style  ={[styles.categorie, {marginTop: 12}]}> Account </Text>
              <View style ={{marginLeft: 8}}>
                <Text style = {styles.sport}><FontAwesome>{Icons.signOut}</FontAwesome> Logout</Text>
              </View>
          </View>
          </ScrollView>
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
    justifyContent: "space-between"
  }
}

export default Menu;



